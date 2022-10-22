import classNames from "classnames";
import { StaticImageData } from "next/image";
import { createContext, PropsWithChildren, useContext } from "react";
import { author, github } from "../blog.config";
import { TOCItem } from "../lib/plugins/rehypeTOC";
import { borderColor } from "../styles/common.styles";
import Header from "./Header";
import Hero, { HeroProps } from "./Hero";
import TOC from "./TOC";

export type LayoutContextType = {
  profileImage: StaticImageData;
};
export const LayoutContext = createContext<LayoutContextType>(
  null as unknown as LayoutContextType,
);
export const useLayoutContext = () => useContext(LayoutContext);

export type LayoutProps = PropsWithChildren<{
  profileImage: StaticImageData;
  hero?: HeroProps;
  toc?: TOCItem[] | undefined;
}>;

const Layout: React.FC<LayoutProps> = ({
  hero,
  toc,
  children,
  profileImage,
}) => {
  return (
    <LayoutContext.Provider
      value={{
        profileImage,
      }}
    >
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
              <Hero.Sibling>
                <TOC data={toc}>{children}</TOC>
              </Hero.Sibling>
            </>
          ) : (
            <TOC data={toc}>{children}</TOC>
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
    </LayoutContext.Provider>
  );
};

export default Layout;
