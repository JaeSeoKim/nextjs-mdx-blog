import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { author, github, header } from "../../blog.config";

export const config = {
  runtime: "experimental-edge",
};

declare module "react" {
  interface Attributes {
    tw?: string;
  }
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        tw="bg-neutral-50"
      >
        <div
          style={{
            width: 700,
            height: 700,
            top: -150,
            right: -250,
            backgroundImage: `linear-gradient(217deg, ${header.gradient.light.from}, ${header.gradient.light.to})`,
          }}
          tw="absolute rounded-full"
        />
        <div
          style={{
            width: 500,
            height: 500,
            bottom: -150,
            left: -250,
            backgroundImage: `linear-gradient(217deg, ${header.gradient.dark.from}, ${header.gradient.dark.to})`,
          }}
          tw="absolute rounded-full"
        />
        <div
          style={{
            width: 1200 - 60,
            height: 630 - 60,
          }}
          tw="flex flex-col bg-white/50 border border-neutral-200/75 rounded-lg shadow-lg p-6"
        >
          <div tw="flex flex-col w-full flex-1 justify-center items-center">
            <h1 tw="text-6xl">{title}</h1>
          </div>
          <div tw="flex w-full justify-end items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              tw="w-18 h-18 bg-white border border-neutral-200 rounded-full"
              src={`https://github.com/${github}.png`}
              alt=""
            />
            <span tw="mx-4 text-4xl">{author}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "fluent",
    },
  );
}
