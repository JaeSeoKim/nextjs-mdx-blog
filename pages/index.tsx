import classNames from "classnames";
import type {
  NextPage,
  InferGetStaticPropsType,
  GetStaticPathsContext,
} from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import Profile from "../components/Profile";
import { getAllPosts } from "../lib/utils/blogPostsApi";
import getStaticImageDataWithPlaciceholder from "../lib/utils/getStaticImageDataWithPlaciceholder";
import { borderColor } from "../styles/common.styles";
import { images } from "../blog.config";
import path from "path";

export async function getStaticProps(_ctx: GetStaticPathsContext) {
  const posts = await getAllPosts();
  const heroImage = await getStaticImageDataWithPlaciceholder(
    path.join(process.cwd(), images.homeHeroImage),
    images.options,
  );
  const profileImage = await getStaticImageDataWithPlaciceholder(
    path.join(process.cwd(), images.profileImage),
    images.options,
  );
  return {
    props: {
      posts: posts,
      hero: {
        image: heroImage,
      },
      profileImage,
    },
  };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  hero,
  profileImage,
}) => {
  return (
    <Layout
      profileImage={profileImage}
      hero={{
        image: hero.image,
        children: (
          <>
            <h1 className="text-xl md:text-2xl font-bold drop-shadow-md">
              JaeSeoKim의 개발 블로그
            </h1>
            <span className="text-sm md:text-base mt-2 md:mt-4 drop-shadow-md">
              어제의 나보다 더 성장 하기 위해 기록합니다.
            </span>
          </>
        ),
      }}
    >
      <Profile />
      <div className="flex flex-1 flex-col items-center justify-center max-w-screen-md w-full mx-auto px-4">
        {posts.map(({ slug, frontMatter }, index) => (
          <Link
            href={`/posts/${slug}`}
            key={slug}
            className={classNames(
              "w-full rounded-xl p-6 text-left",
              "border",
              borderColor,
              { "mt-6": index !== 0 },
            )}
          >
            <h3 className="text-2xl font-bold">{frontMatter.title}</h3>
            <p className="mt-4 text-xl">{frontMatter.date}</p>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
