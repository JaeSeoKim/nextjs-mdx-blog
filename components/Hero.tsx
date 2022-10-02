import classNames from "classnames";
import Image, { StaticImageData } from "next/future/image";
import { ReactNode, useState } from "react";
import defaultImage from "../_content/default-hero-image.png";

export type HeroProps = {
  image?: StaticImageData;
  imageAlt?: string;
  children?: ReactNode | undefined;
};

const Hero: React.FC<HeroProps> = ({ image, imageAlt, children }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="z-0 sticky top-0 left-0 w-full overflow-hidden">
      <div className={"relative top-0 left-0 h-80 md:h-96"}>
        <Image
          src={image?.src || defaultImage.src}
          blurDataURL={image?.blurDataURL || defaultImage.blurDataURL}
          placeholder="blur"
          alt={imageAlt || "hero background image"}
          className={classNames(
            "object-cover brightness-75 transition-[filter,transform] motion-reduce:transition-none duration-700 ease-in-out",
            isImageLoaded ? "blur-0 scale-100" : "blur-2xl scale-110",
          )}
          onLoadingComplete={() => setIsImageLoaded(true)}
          fill
        />
        <div
          className={classNames(
            "absolute top-0 left-0 w-full h-full text-white",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export type HeroSiblingProps = {
  children?: ReactNode | undefined;
};

export const HeroSibling: React.FC<HeroSiblingProps> = ({ children }) => {
  return (
    <div className="z-[1] pt-4 bg-white dark:bg-neutral-900">{children}</div>
  );
};

export default Hero;
