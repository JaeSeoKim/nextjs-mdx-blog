import classNames from "classnames";
import { PropsWithChildren } from "react";
import { author, github } from "../blog.config";
import { borderColor } from "../styles/common.styles";
import Header from "./Header";

export type LayoutProps = PropsWithChildren<{}>;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={classNames(
        "relative flex flex-col min-h-screen max-h-screen overflow-y-auto overflow-x-hidden",
        "text-black dark:text-white",
        "layout-glow",
      )}
    >
      <Header />
      <main className="flex flex-col grow">{children}</main>
      <footer
        className={classNames(
          "flex w-full items-center justify-center mt-4",
          "border-t",
          borderColor,
        )}
      >
        <a
          className="flex items-center justify-center gap-2 py-4 text-base"
          href={github}
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright ©{author} {new Date().getFullYear()}
        </a>
      </footer>
    </div>
  );
};

export default Layout;
