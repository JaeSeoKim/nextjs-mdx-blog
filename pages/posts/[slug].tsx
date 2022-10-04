import React, { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getPostBySlug, getAllPosts } from "../../lib/utils/blogPostsApi";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import markdownComponents from "../../components/markdownComponents";
import classNames from "classnames";
import Layout from "../../components/Layout";

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const {
    code,
    frontmatter: { date, tags, title, image },
  } = post;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout
      hero={{
        image,
        children: (
          <div
            className={classNames(
              "flex flex-col justify-end w-full h-full max-w-screen-lg px-4 pb-12 md:pb-16 mx-auto",
            )}
          >
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-sm font-light mt-4">{date}</p>
          </div>
        ),
      }}
    >
      <div className="max-w-screen-md px-2 mx-auto">
        <article
          className={
            "prose prose-sm md:prose-base lg:prose-lg dark:prose-invert w-full max-w-none"
          }
        >
          <Component components={markdownComponents} />
        </article>
      </div>
    </Layout>
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
