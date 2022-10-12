import classNames from "classnames";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { borderColor } from "../styles/common.styles";

export type HeroProps = {
  children?: ReactNode | undefined;
  image?: StaticImageData;
};

type ParentComposition = {
  Sibling: typeof Sibling;
};

const Hero: React.FC<HeroProps> & ParentComposition = ({ image, children }) => {
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
              "transition-[opacity] motion-reduce:transition-none duration-300 ease-linear",
            )}
            blurDataURL={image.blurDataURL}
            placeholder="blur"
            objectFit="cover"
            objectPosition="center"
            layout="fill"
          />
          <div className={"absolute top-0 left-0 w-full h-full text-white "}>
            <div className="flex flex-col justify-end w-full h-full max-w-screen-lg px-4 pb-12 md:pb-16 mx-auto">
              {children}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className={"w-full h-full text-black dark:text-white"}>
          <div className="flex flex-col justify-end w-full h-full max-w-screen-lg px-4 pb-12 md:pb-16 mx-auto">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export type SiblingProps = {
  children?: ReactNode | undefined;
};

const Sibling: React.FC<SiblingProps> = ({ children }) => {
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

Hero.Sibling = Sibling;

export default Hero;
