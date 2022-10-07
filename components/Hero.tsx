import classNames from "classnames";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image, { StaticImageData } from "next/future/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { borderColor } from "../styles/common.styles";

export type HeroProps = {
  children?: ReactNode | undefined;
  image?: StaticImageData;
};

const Hero: React.FC<HeroProps> = ({ image, children }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const opacity = useMotionValue(1);
  const brightness = useMotionTemplate`brightness(${opacity})`;

  useEffect(() => {
    if (!image) return;

    const handler = () => {
      const $target = targetRef.current;
      if (!$target) return;

      const targetHeight = $target.offsetHeight;

      if (targetHeight < window.scrollY) {
        return opacity.set(0.5);
      }
      return opacity.set(1 - window.scrollY / targetHeight / 2);
    };

    handler();
    window.addEventListener("scroll", handler);
    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [image, opacity]);

  return (
    <div
      className={classNames(
        "z-0 w-full",
        !!image ? "sticky top-0 left-0 overflow-hidden" : "h-80 md:h-96",
      )}
    >
      {image ? (
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
          <Image
            src={image.src}
            alt=""
            className={classNames(
              "object-cover transition-[opacity] motion-reduce:transition-none duration-300 ease-linear",
            )}
            blurDataURL={image.blurDataURL}
            placeholder="blur"
            fill
          />
          <div className={"absolute top-0 left-0 w-full h-full text-white"}>
            {children}
          </div>
        </motion.div>
      ) : (
        <div className={"w-full h-full text-black dark:text-white"}>
          {children}
        </div>
      )}
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
        "z-[1] transform-gpu pt-8 bg-white dark:bg-neutral-900",
        "border-t",
        borderColor,
      )}
    >
      {children}
    </div>
  );
};

export default Hero;
