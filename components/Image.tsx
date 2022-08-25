import React, { DetailedHTMLProps, ImgHTMLAttributes } from "react";
import NextImage, { StaticImageData } from "next/image";

export type ImageProps = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const Image: React.FC<ImageProps> = ({ ..._props }) => {
  const { src, width, height, blurDataURL, placeholder, alt, title, ...props } =
    _props as React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > &
      StaticImageData;

  if (!width || !height || !blurDataURL) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        title={title}
        {...props}
      />
    );
  }
  return (
    <NextImage
      src={src!}
      alt={alt}
      width={width}
      height={height}
      layout={"intrinsic"}
      placeholder="blur"
      blurDataURL={blurDataURL}
      {...props}
    />
  );
};

export default Image;
