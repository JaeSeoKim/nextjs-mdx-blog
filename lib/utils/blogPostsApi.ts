import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import { remarkMdxImages } from "../plugins/remarkMdxImages";
import remarkA11yEmoji from "@fec/remark-a11y-emoji/dist/remark-a11y-emoji.umd";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import theme from "shiki/themes/one-dark-pro.json";
import { remarkCodeHike } from "@code-hike/mdx";
import { StaticImageData } from "next/image";
import getStaticImageDataWithPlaciceholder from "./getStaticImageDataWithPlaciceholder";
import rehypeTOC, { RehypeTOCOptionsType } from "../plugins/rehypeTOC";

export const ROOT = process.cwd();
export const POSTS_PATH = path.join(process.cwd(), "_content/posts");
export const POSTS_GLOB =
  "**/[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]*.{md,mdx}";
export const DATE_REGEX = /[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/;

export type PostFrontMatterType = {
  title: string;
  date: string;
  tags: string[];
  image?: StaticImageData;
};

export async function getAllPosts() {
  const paths = glob.sync(POSTS_GLOB, {
    cwd: POSTS_PATH,
  });
  return await Promise.all(
    paths.map(async filePath => {
      const rawData = fs.readFileSync(path.join(POSTS_PATH, filePath));

      const date = filePath.match(DATE_REGEX)![0];
      const matterData = matter(rawData).data;

      return {
        frontMatter: {
          ...matterData,
          date: date,
        } as PostFrontMatterType,
        slug: filePath.replace(/\.mdx?$/, ""),
      };
    }),
  );
}

export async function getPostBySlug(slug: string) {
  const remarkPlugins = [
    remarkGfm,
    remarkA11yEmoji,
    remarkMdxImages,
    [
      remarkCodeHike,
      {
        theme,
        lineNumbers: true,
        showCopyButton: true,
        skipLanguages: [],
        autoImport: false,
      },
    ],
  ];

  const TOCRef: RehypeTOCOptionsType["ref"] = {
    current: [],
  };

  const rehypelugins = [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "append",
        content: {
          type: "text",
        },
        properties: { ariaHidden: true, tabIndex: -1, class: "no-prose" },
      },
    ],
    [
      rehypeTOC,
      {
        ref: TOCRef,
      },
    ],
  ];

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "esbuild.exe",
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild",
    );
  }

  const filepath = (() => {
    const _path = path.join(POSTS_PATH, `${slug}.mdx`);
    if (fs.existsSync(_path)) {
      return _path;
    }
    return path.join(POSTS_PATH, `${slug}.md`);
  })();

  const { matter, frontmatter, ...post } = await bundleMDX<PostFrontMatterType>(
    {
      file: filepath,
      cwd: path.dirname(filepath),
      esbuildOptions(options) {
        options.bundle = true;
        options.minify = true;
        options.format = "iife";
        options.plugins = [...(options.plugins ?? [])];
        options.loader = {
          ...(options.loader ?? {}),
          ".ts": "ts",
          ".tsx": "tsx",
          ".js": "js",
          ".jsx": "jsx",
          ".avif": "file",
          ".webp": "file",
          ".png": "file",
          ".jpeg": "file",
          ".gif": "file",
          ".svg": "file",
        };
        options.publicPath = "/_next/static/media/";
        options.outdir = path.join(ROOT, ".next/static/media");
        options.write = true;
        return options;
      },
      mdxOptions(options, frontmatter) {
        // this is the recommended way to add custom remark/rehype plugins:
        // The syntax might look weird, but it protects you in case we add/remove
        // plugins in the future.
        // @ts-ignore
        options.remarkPlugins = [
          ...(options.remarkPlugins ?? []),
          ...remarkPlugins,
        ];
        // @ts-ignore
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          ...rehypelugins,
        ];
        return options;
      },
    },
  );

  if (frontmatter.image) {
    frontmatter.image = await getStaticImageDataWithPlaciceholder(
      path.join(POSTS_PATH, frontmatter.image as unknown as string),
      {
        removeAlpha: true,
        size: 32,
      },
    );
  }
  frontmatter.date = filepath.match(DATE_REGEX)![0];

  return {
    ...post,
    frontmatter,
    toc: TOCRef.current,
  };
}
