import React, { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getPostBySlug, getAllPosts } from "../../lib/utils/blogPostsApi";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import markdownComponents from "../../components/markdownComponents";

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { code, frontmatter } = post;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-screen-md px-2 sm:px-0">
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        <article
          className={
            "prose prose-sm md:prose-base lg:prose-lg dark:prose-invert w-full max-w-none"
          }
        >
          <Component components={markdownComponents} />
        </article>
      </div>
    </div>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{
  slug: string;
}>) {
  const { slug } = params!;
  const post = await getPostBySlug(slug);
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
