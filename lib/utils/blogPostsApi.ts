import fs from "fs";
import glob from "glob";
import matter from "gray-matter";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import { remarkMdxImages } from "../plugins/remarkMdxImages";
import remarkHeadingId from "remark-heading-id";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

export const ROOT = process.cwd();
export const POSTS_PATH = path.join(process.cwd(), "_content/posts");
export const POSTS_GLOB =
  "**/[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]*.{md,mdx}";

export interface PostFrontMatterType {
  title: string;
  date: string;
  tags: string[];
  draft: boolean;
}

export async function getAllPosts() {
  const paths = glob.sync(POSTS_GLOB, {
    cwd: POSTS_PATH,
  });
  return paths.map(filePath => {
    const rawData = fs.readFileSync(path.join(POSTS_PATH, filePath));

    const dateRegex = /[0-9][0-9][0-9][0-9]-[0-1][0-9]-[0-3][0-9]/;
    const date = filePath.match(dateRegex)![0];

    return {
      frontmatter: {
        ...matter(rawData).data,
        date: date,
      } as PostFrontMatterType,
      slug: filePath.replace(/\.mdx?$/, ""),
    };
  });
}

export async function getPostBySlug(slug: string) {
  const remarkPlugins = [remarkGfm, remarkMdxImages, remarkHeadingId];
  const rehypelugins = [rehypeHighlight, rehypeSlug];

  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      ROOT,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  const filepath = (() => {
    const _path = path.join(POSTS_PATH, `${slug}.mdx`);
    if (fs.existsSync(_path)) {
      return _path;
    }
    return path.join(POSTS_PATH, `${slug}.md`);
  })();

  const post = await bundleMDX<PostFrontMatterType>({
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
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...remarkPlugins,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...rehypelugins,
      ];
      return options;
    },
  });
  return post;
}
