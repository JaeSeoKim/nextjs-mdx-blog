import classNames from "classnames";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { MutableRefObject, ReactNode, useEffect, useRef } from "react";

export type HeroProps = {
  image: StaticImageData;
  imageAlt: string;
  className: string;
  children?: ReactNode | undefined;
};

const Hero: React.FC<HeroProps> = ({
  image,
  imageAlt,
  className,
  children,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, y => {
    const $target = targetRef.current;
    if (!$target) return 1;
    if (y < $target.offsetHeight) return 1 - y / $target.offsetHeight;
    return 0;
  });

  return (
    <div className="z-0 sticky top-0 left-0 w-full overflow-hidden -mt-14">
      <motion.div
        ref={targetRef}
        className={classNames("relative top-0 left-0", className)}
        style={{
          opacity: opacity,
        }}
      >
        <Image
          src={image.src}
          blurDataURL={image.blurDataURL}
          placeholder="blur"
          layout="fill"
          alt={imageAlt}
          className="object-cover object-bottom brightness-75"
        />
        <div className={classNames("absolute top-0 left-0 w-full", className)}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
