import { StaticImageData } from "next/image";
import path from "path";
import { getPlaiceholder, IGetPlaiceholderOptions } from "plaiceholder";
import fs from "fs";

export type IgetStaticImageDataWithPlaciceholder = (
  src: string,
  options?: Omit<IGetPlaiceholderOptions, "dir">,
) => Promise<StaticImageData>;

const ROOT = process.cwd();
const NEXT_PULICPATH = "/_next/static/media/";
const NEXT_OUTDIR = path.join(ROOT, ".next/static/media");

const getStaticImageDataWithPlaciceholder: IgetStaticImageDataWithPlaciceholder =
  async (src, options = {}) => {
    src = path.join(process.cwd(), src);
    const fileBuffer = fs.readFileSync(src);
    const { name, ext } = path.parse(src);
    const {
      base64,
      img: { width, height },
    } = await getPlaiceholder(fileBuffer, options);
    const outputFileName = `${name}.${fileBuffer
      .toString("base64url")
      .substring(0, 8)}${ext}`;
    fs.mkdirSync(NEXT_OUTDIR, { recursive: true });
    fs.writeFileSync(path.join(NEXT_OUTDIR, outputFileName), fileBuffer);
    return {
      src: path.join(NEXT_PULICPATH, outputFileName),
      width,
      height,
      blurDataURL: base64,
    };
  };

export default getStaticImageDataWithPlaciceholder;
