import React, { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getPostBySlug, getAllPosts } from "../../lib/utils/blogPostsApi";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import markdownComponents from "../../components/markdownComponents";
import Layout from "../../components/Layout";
import getStaticImageDataWithPlaciceholder from "../../lib/utils/getStaticImageDataWithPlaciceholder";
import { images } from "../../blog.config";
import path from "path";

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{
  slug: string;
}>) {
  const { slug } = params!;
  const post = await getPostBySlug(slug);

  const profileImage = await getStaticImageDataWithPlaciceholder(
    path.join(process.cwd(), images.profileImage),
    images.options,
  );

  return {
    props: {
      post,
      profileImage,
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

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  profileImage,
}) => {
  const {
    code,
    frontmatter: { date, tags, title, image },
    toc,
  } = post;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <Layout
      profileImage={profileImage}
      hero={{
        image,
        children: (
          <>
            <h1 className="text-4xl font-bold drop-shadow-hero">{title}</h1>
            <p className="text-sm font-light mt-4 drop-shadow-hero">{date}</p>
          </>
        ),
      }}
      toc={toc}
    >
      <article
        className={
          "prose prose-base lg:prose-lg dark:prose-invert w-full max-w-none"
        }
      >
        <Component components={markdownComponents} />
      </article>
    </Layout>
  );
};

export default Post;
