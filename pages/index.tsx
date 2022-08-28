import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPathsContext,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../lib/utils/blogPostsApi";

export async function getStaticProps(_ctx: GetStaticPathsContext) {
  const posts = await getAllPosts();
  return { props: { posts: posts } };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
        {posts.map(({ slug, frontmatter }) => (
          <Link href={`/posts/${slug}`} key={slug}>
            <a className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">{frontmatter.title}</h3>
              <p className="mt-4 text-xl">{frontmatter.date}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
