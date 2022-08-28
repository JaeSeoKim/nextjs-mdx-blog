import Link from "next/link";
import React from "react";

export type NavProps = {};

const Header: React.FC<NavProps> = () => {
  return (
    <header className="sticky top-0 left-0 z-10 flex justify-center w-full border-b border-neutral-900/10 dark:border-neutral-50/[0.06] bg-white/95 dark:bg-neutral-900/95 backdrop-blur supports-backdrop-blur:bg-white/60 supports-backdrop-blur:dark:bg-neutral-900/60 shadow dark:shadow-neutral-800">
      <div className="flex items-center justify-between w-full max-w-screen-xl h-14 mx-4 xl:mx-auto">
        <h1 className="flex text-lg drop-shadow dark:shadow-neutral-900">
          <Link href="/">
            <a>
              <span className="font-bold">JaeSeoKim&apos;s</span> Blog
            </a>
          </Link>
        </h1>
        <button>🔍</button>
      </div>
    </header>
  );
};

export default Header;
