import classNames from "classnames";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image, { StaticImageData } from "next/future/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { borderColor } from "../styles/common.styles";
import defaultImage from "../_content/default-hero-image.png";
import { useLayoutContext } from "./Layout";

export type HeroProps = {
  children?: ReactNode | undefined;
} & (
  | {
      image: StaticImageData;
      imageAlt: string;
    }
  | { image?: undefined; imageAlt?: undefined }
);

const Hero: React.FC<HeroProps> = ({ image, imageAlt, children }) => {
  const { layoutRef } = useLayoutContext();
  const targetRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const opacity = useMotionValue(1);
  const brightness = useMotionTemplate`brightness(${opacity})`;

  useEffect(() => {
    const $layout = layoutRef.current;
    if (!$layout) return;

    const handler = () => {
      const $target = targetRef.current;
      if (!$target) return;

      const targetHeight = $target.offsetHeight;

      if (targetHeight < $layout.scrollTop) {
        return opacity.set(0);
      }
      return opacity.set(1 - $layout.scrollTop / targetHeight);
    };

    handler();
    $layout.addEventListener("scroll", handler);
    return () => {
      $layout.removeEventListener("scroll", handler);
    };
  }, [layoutRef, opacity]);

  return (
    <div className="z-0 sticky top-0 left-0 w-full overflow-hidden">
      <motion.div
        ref={targetRef}
        className={"relative top-0 left-0 h-80 md:h-96"}
        style={{
          willChange: "filter",
          filter: brightness,
          WebkitFilter: brightness,
          msFilter: brightness,
        }}
      >
        <div
          className={classNames(
            "brightness-75 w-full h-full transition-[filter,transform] motion-reduce:transition-none duration-300 ease-linear",
            isImageLoaded ? "scale-100 blur-0" : "scale-110 blur-sm",
          )}
          style={{
            willChange: "transform,filter",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image?.blurDataURL || defaultImage.blurDataURL}
            alt={imageAlt || "hero background image"}
            className={"absolute top-0 left-0 w-full h-full object-cover"}
          />
          <Image
            src={image?.src || defaultImage.src}
            alt={imageAlt || "hero background image"}
            className={classNames(
              "object-cover transition-[opacity] motion-reduce:transition-none duration-300 ease-linear",
              isImageLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoadingComplete={() => setIsImageLoaded(true)}
            fill
          />
        </div>
        <div
          className={classNames(
            "absolute top-0 left-0 w-full h-full text-white",
          )}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export type HeroSiblingProps = {
  children?: ReactNode | undefined;
};

export const HeroSibling: React.FC<HeroSiblingProps> = ({ children }) => {
  return (
    <div
      className={classNames(
        "z-[1] pt-4 bg-white dark:bg-neutral-900",
        "border-t",
        borderColor,
      )}
    >
      {children}
    </div>
  );
};

export default Hero;
