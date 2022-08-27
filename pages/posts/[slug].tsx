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
    <div className="flex flex-col items-center">
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <article
        className={
          "prose prose-sky prose-sm md:prose-base lg:prose-lg dark:prose-invert"
        }
      >
        <Component components={markdownComponents} />
      </article>
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
