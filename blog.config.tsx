import { LinkProps } from "next/link";
import { IGetPlaiceholderOptions } from "plaiceholder";
import { ReactElement } from "react";

export const author: string = "JaeSeoKim";
export const github: string = "JaeSeoKim";

export const images: ImagesType = {
  homeHeroImage: "_content/emile-perron-xrVDYZRGdw4-unsplash.jpg",
  profileImage: "_content/profile.png",
  options: {
    removeAlpha: false,
    size: 60,
  },
};

export const header: headerType = {
  title: (
    <>
      <span className="font-bold">{author}&apos;s</span> Blog
    </>
  ),
  gradient: {
    light: { from: "rgba(99, 164, 255, 0.6)", to: "rgba(77, 215, 224, 0.6)" },
    dark: { from: "rgba(255, 121, 198, 0.6)", to: "rgba(189, 147, 249, 0.6)" },
  },
  items: [
    {
      label: "about",
      href: "/about",
    },
  ],
};

export type ImagesType = {
  homeHeroImage: string;
  profileImage: string;
  options: Omit<IGetPlaiceholderOptions, "dir">;
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
