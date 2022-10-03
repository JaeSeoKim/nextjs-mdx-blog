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
  gradient: {
    light: { from: "rgb(131, 234, 241, 0.8)", to: "rgb(99, 164, 255, 0.8)" },
    dark: { from: "rgb(255, 121, 198, 0.8)", to: "rgb(189, 147, 249, 0.8)" },
  },
  items: [
    {
      label: "about",
      href: "/about",
    },
  ],
};

export type headerType = {
  title: ReactElement;
  gradient: {
    light: gradientType;
    dark: gradientType;
  };
  items: headerItem[];
};

export type gradientType = {
  from: string;
  to: string;
};

export type headerItem = {
  label: string;
  href: LinkProps["href"];
};
