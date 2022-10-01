import React, { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getPostBySlug, getAllPosts } from "../../lib/utils/blogPostsApi";
import { GetStaticPropsContext, InferGetStaticPropsType, NextPage } from "next";
import markdownComponents from "../../components/markdownComponents";
import Hero from "../../components/Hero";
import classNames from "classnames";
import { IoIosArrowDown } from "react-icons/io";

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const {
    code,
    frontmatter: { date, tags, title, image, imageAlt },
  } = post;
  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <>
      {image && (
        <Hero
          image={image}
          imageAlt={imageAlt || ""}
          className="h-screen md:h-96"
        >
          <div
            className={classNames(
              "flex flex-col justify-center w-full h-full max-w-screen-lg mx-auto text-white",
              "px-4 pt-64",
            )}
          >
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="text-sm font-light mt-4">{date}</p>
          </div>
          <div className="absolute bottom-4 left-0 flex md:hidden justify-center w-full">
            <button
              onClick={() =>
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                })
              }
              className="w-8 h-8 transition-transform motion-reduce:transition-none hover:translate-y-1 hover:opacity-80 "
            >
              <IoIosArrowDown className="w-full h-full drop-shadow-md" />
            </button>
          </div>
        </Hero>
      )}
      <div className="z-[1] bg-white dark:bg-neutral-900 mt-4">
        <div className="max-w-screen-md px-2 mx-auto">
          <article
            className={
              "prose prose-sm md:prose-base lg:prose-lg dark:prose-invert w-full max-w-none"
            }
          >
            <Component components={markdownComponents} />
          </article>
        </div>
      </div>
    </>
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
