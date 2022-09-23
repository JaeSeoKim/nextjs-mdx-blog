import classNames from "classnames";
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPathsContext,
} from "next";
import Link from "next/link";
import Hero from "../components/Profile";
import { getAllPosts } from "../lib/utils/blogPostsApi";
import { borderColor } from "../styles/common.styles";

export async function getStaticProps(_ctx: GetStaticPathsContext) {
  const posts = await getAllPosts();
  return { props: { posts: posts } };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <>
      <Hero />
      <div className="flex flex-1 flex-col items-center justify-center max-w-screen-md w-full mx-auto px-4">
        {posts.map(({ slug, frontmatter }, index) => (
          <Link href={`/posts/${slug}`} key={slug}>
            <a
              className={classNames(
                "w-full rounded-xl p-6 text-left",
                "border",
                borderColor,
                { "mt-6": index !== 0 },
              )}
            >
              <h3 className="text-2xl font-bold">{frontmatter.title}</h3>
              <p className="mt-4 text-xl">{frontmatter.date}</p>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
