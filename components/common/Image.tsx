import React, {
  DetailedHTMLProps,
  ImgHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import { default as NextImage, StaticImageData } from "next/image";
import mediumZoom from "medium-zoom";

const Image: React.FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({ ..._props }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;
    const zoom = mediumZoom(imageRef.current);

    return () => {
      zoom.detach();
    };
  });

  const { src, width, height, blurDataURL, placeholder, alt, ...props } =
    _props as React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > &
      StaticImageData;

  if (!width || !height || !blurDataURL) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    );
  }
  return (
    <NextImage
      ref={imageRef}
      src={src!}
      alt={alt}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurDataURL}
      layout="responsive"
      {...props}
    />
  );
};

export default Image;
