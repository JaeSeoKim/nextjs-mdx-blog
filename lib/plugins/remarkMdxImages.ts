/**
 * Base Source from https://github.com/remcohaszing/remark-mdx-images/blob/main/src/index.ts
 *
 * @license MIT ©ksoichiro
 */

import { MDXJSEsm, MDXJsxTextElement } from "hast-util-to-estree";
import { Image } from "mdast";
import { Plugin } from "unified";
import { Parent } from "unist";
import { visit } from "unist-util-visit";
import path from "path";
import sharp from "sharp";
import { imageSize } from "image-size";

export interface RemarkMdxImagesOptions {
  /**
   * By default imports are resolved relative to the markdown file. This matches default markdown
   * behaviour. If this is set to false, this behaviour is removed and URLs are no longer processed.
   * This allows to import images from `node_modules`. If this is disabled, local images can still
   * be imported by prepending the path with `./`.
   *
   * @default true
   */
  resolve?: boolean;
}

const urlPattern = /^(https?:)?\//;
const relativePathPattern = /\.\.?\//;

const optimizeImage = async (src: string, options = { size: 4 }) => {
  const sizeMin = 4;
  const sizeMax = 64;

  const isSizeValid = sizeMin <= options.size && options.size <= sizeMax;
  !isSizeValid &&
    console.error(
      ["Please enter a `size` value between", sizeMin, "and", sizeMax].join(" ")
    );

  const { height, width } = imageSize(src);

  const size = isSizeValid ? options.size : 4;

  const pipeline = sharp(src).resize(size, size, {
    fit: "inside",
  });

  const { data, info } = await pipeline
    .clone()
    .normalise()
    .modulate({ saturation: 1.2, brightness: 1 })
    .toBuffer({ resolveWithObject: true });

  return {
    base64: `data:image/${info.format};base64,${data.toString("base64")}`,
    size: {
      width: width,
      height: height,
    },
  };
};

/**
 * A Remark plugin for converting Markdown images to MDX images using imports for the image source.
 */
export const remarkMdxImages: Plugin<[RemarkMdxImagesOptions?]> =
  ({ resolve = true } = {}) =>
  async (ast, file, next) => {
    const imports: Omit<MDXJSEsm, "value">[] = [];
    const imported = new Map<string, string>();
    const visitImage: Promise<any>[] = [];

    visit<Image>(
      // @ts-ignore
      ast,
      "image",
      (node, index, parent) => {
        visitImage.push(
          (async () => {
            let { alt = null, title, url } = node;
            let image: Buffer | string = url;

            if (urlPattern.test(url)) {
              return;
            }

            if (!relativePathPattern.test(url) && resolve) {
              image = `./${url}`;
            }

            image = path.join(file.dirname!, image);

            let name = imported.get(url);
            if (!name) {
              name = `__${imported.size}_${url.replace(/\W/g, "_")}__`;

              imports.push({
                type: "mdxjsEsm",
                data: {
                  estree: {
                    type: "Program",
                    sourceType: "module",
                    body: [
                      {
                        type: "ImportDeclaration",
                        source: {
                          type: "Literal",
                          value: url,
                          raw: JSON.stringify(url),
                        },
                        specifiers: [
                          {
                            type: "ImportDefaultSpecifier",
                            local: { type: "Identifier", name },
                          },
                        ],
                      },
                    ],
                  },
                },
              });
              imported.set(url, name);
            }
            const imageData = await optimizeImage(image);

            const textElement: MDXJsxTextElement = {
              type: "mdxJsxTextElement",
              name: "img",
              children: [],
              attributes: [
                { type: "mdxJsxAttribute", name: "alt", value: alt },
                {
                  type: "mdxJsxAttribute",
                  name: "width",
                  value: imageData.size.width,
                },
                {
                  type: "mdxJsxAttribute",
                  name: "height",
                  value: imageData.size.height,
                },
                {
                  type: "mdxJsxAttribute",
                  name: "blurDataURL",
                  value: imageData.base64,
                },
                {
                  type: "mdxJsxAttribute",
                  name: "src",
                  value: {
                    type: "mdxJsxAttributeValueExpression",
                    value: name,
                    data: {
                      estree: {
                        type: "Program",
                        sourceType: "module",
                        comments: [],
                        body: [
                          {
                            type: "ExpressionStatement",
                            expression: { type: "Identifier", name },
                          },
                        ],
                      },
                    },
                  },
                },
              ],
            };
            if (title) {
              textElement.attributes.push({
                type: "mdxJsxAttribute",
                name: "title",
                value: title,
              });
            }
            (parent as Parent).children.splice(index!, 1, textElement);
          })()
        );
      }
    );
    await Promise.all(visitImage);
    (ast as Parent).children.unshift(...imports);
    next();
  };
