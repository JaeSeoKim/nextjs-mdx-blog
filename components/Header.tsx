import Link from "next/link";
import React from "react";

export type NavProps = {};

const Header: React.FC<NavProps> = () => {
  return (
    <header className="sticky top-0 left-0 z-10 flex justify-center w-full bg-white dark:bg-neutral-900 bg-opacity-20 backdrop-blur-lg shadow dark:shadow-neutral-800">
      <div className="flex items-center justify-between w-full max-w-screen-xl h-14 mx-6 xl:mx-auto">
        <h1 className="flex text-xl drop-shadow">
          <Link href="/">
            <a>JaeSeoKim&apos;s Blog</a>
          </Link>
        </h1>
        <button>🔍</button>
      </div>
    </header>
  );
};

export default Header;
