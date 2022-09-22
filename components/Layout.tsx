import classNames from "classnames";
import Image from "next/image";
import { PropsWithChildren } from "react";
import Header from "./Header";

export type LayoutProps = PropsWithChildren<{}>;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className={classNames(
        "relative flex flex-col min-h-screen max-h-screen",
        "text-black dark:text-white",
        "layout-glow",
      )}
    >
      <Header />
      <main className="flex flex-col grow">{children}</main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Layout;
