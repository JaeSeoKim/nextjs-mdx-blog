import classNames from "classnames";
import { LinkProps } from "next/link";
import { ReactElement } from "react";

export const author: string = "JaeSeoKim";
export const github: string = "https://github.com/JaeSeoKim";
export const header: headerType = {
  title: (
    <>
      <span className="font-bold">{author}&apos;s</span> Blog
    </>
  ),
  className: classNames(
    "backdrop-blur",
    "bg-gradient-to-r",
    "from-[#83eaf1]/60 to-[#63a4ff]/60",
    "dark:from-[#ff79c6]/60 dark:to-[#bd93f9]/60",
  ),
  items: [
    {
      label: "about",
      href: "/about",
    },
    {
      label: "about",
      href: "/about",
    },
    {
      label: "about",
      href: "/about",
    },
  ],
};

export type headerType = {
  title: ReactElement;
  className: string;
  items: headerItem[];
};

export type headerItem = {
  label: string;
  href: LinkProps["href"];
};
