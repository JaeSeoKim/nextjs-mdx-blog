import classNames from "classnames";
import { PropsWithChildren } from "react";
import { author, github } from "../blog.config";
import { borderColor } from "../styles/common.styles";
import Header from "./Header";
import Hero, { HeroProps } from "./Hero";

export type LayoutProps = PropsWithChildren<{
  hero?: HeroProps;
}>;

const Layout: React.FC<LayoutProps> = ({ hero, children }) => {
  return (
    <div
      className={classNames(
        "flex flex-col min-h-screen",
        "text-black dark:text-white",
      )}
    >
      <Header isScrollTopTransparent={!!hero?.image} />
      <main className="flex flex-col grow">
        {hero ? (
          <>
            <Hero {...hero} />
            <Hero.Sibling>{children}</Hero.Sibling>
          </>
        ) : (
          children
        )}
      </main>
      <footer
        className={classNames(
          "flex w-full items-center justify-center mt-4",
          "border-t",
          borderColor,
        )}
      >
        <a
          className="flex items-center justify-center gap-2 py-4 text-sm"
          href={github}
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ©{author}
        </a>
      </footer>
    </div>
  );
};

export default Layout;
