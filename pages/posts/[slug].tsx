import React, { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getPostBySlug, getAllPosts } from "../../lib/utils/blogPostsApi";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import markdownComponents from "../../components/markdownComponents";
import Layout from "../../components/Layout";
import TOC from "../../components/TOC";

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const {
    code,
    frontmatter: { date, tags, title, image },
    toc,
  } = post;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout
      hero={{
        image,
        children: (
          <>
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-sm font-light mt-4">{date}</p>
          </>
        ),
      }}
    >
      <TOC data={toc}>
        <div className="max-w-screen-md px-4 mx-auto">
          <article
            className={
              "prose prose-sm md:prose-base lg:prose-lg dark:prose-invert w-full max-w-none"
            }
          >
            <Component components={markdownComponents} />
          </article>
        </div>
      </TOC>
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
