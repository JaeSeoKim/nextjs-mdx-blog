import { LinkProps } from "next/link";
import { ReactElement } from "react";

export const author: string = "jaeseokim";
export const navbar: navbarType = {
  title: (
    <>
      <span className="font-bold">{author}&apos;s</span> Blog
    </>
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

type navbarType = {
  title: ReactElement;
  items: navBarItem[];
};

type navBarItem = {
  label: string;
  href: LinkProps["href"];
};
