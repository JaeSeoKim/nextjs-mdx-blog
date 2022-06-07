import { Plugin } from "esbuild";
import { getPlaiceholder, IGetPlaiceholderOptions } from "plaiceholder";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { ROOT } from "../utils/blogPostsApi";

export type ImageDataType = {
  src: string;
  height: number;
  width: number;
  blurDataURL: string;
};

export interface PlaiceholderOption extends IGetPlaiceholderOptions {}

export default function plaiceholderPlugin(
  options?: PlaiceholderOption
): Plugin {
  if (!options) options = {};
  if (!options.size) options.size = 4;
  if (!options.publicDir) options.publicDir = "./";

  return {
    name: "plaiceholder",
    setup(build) {
      build.onLoad(
        {
          filter: /\.(avif|webp|png|jpeg|gif|svg)/,
        },
        async function handleLoad(args) {
          const { dir, name, ext } = path.parse(args.path);
          const relativePath = path.relative(ROOT, args.path);
          const imageData = await getPlaiceholder(`/${relativePath}`, options);

          const { publicPath, outdir } = build.initialOptions;
          const fileBuffer = fs.readFileSync(args.path);
          const hash = crypto
            .createHash("SHA1")
            .update(fileBuffer)
            .digest("base64url")
            .substring(0, 8);

          const outFileName = `${name}-${hash}${ext}`;
          const outPath = `${outdir}/${outFileName}`;
          const publicFilePath = path.join(publicPath!, outFileName);
          if (!fs.existsSync(outPath)) {
            fs.writeFileSync(outPath, fileBuffer);
          }

          build.esbuild.analyzeMetafile;

          return {
            contents: `
export const blurhash = ${JSON.stringify(imageData.blurhash)}
export const css = ${JSON.stringify(imageData.css)}
export const svg = ${JSON.stringify(imageData.svg)}
export const base64 = ${JSON.stringify(imageData.base64)}

export default {
  src: ${JSON.stringify(publicFilePath)},
  width: ${JSON.stringify(imageData.img.width)},
  height: ${JSON.stringify(imageData.img.height)}
}
`,
            resolveDir: dir,
            watchFiles: [args.path],
          };
        }
      );
    },
  };
}
