import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, Transition } from "framer-motion";
import classNames from "classnames";
import usePrefersReducedMotion from "../lib/hooks/usePrefersReducedMotion";

export type NavProps = {};

const Header: React.FC<NavProps> = () => {
  const headerRef = useRef<HTMLElement>(null);
  const prevWindowScrollY = useRef(0);
  const shouldReduceMotion = usePrefersReducedMotion();
  console.log(shouldReduceMotion);
  const [animation, setAnimation] = useState<"visible" | "hidden">("visible");

  const transition: Transition = {
    type: "tween",
    duration: shouldReduceMotion ? 0 : 0.3,
  };

  useEffect(() => {
    const scrollHandler = (_event: Event) => {
      const $header = headerRef.current;
      if (!$header) return;

      const headerHeight = $header.offsetHeight;

      let isScrollToUp = false;
      if (prevWindowScrollY.current > window.scrollY) isScrollToUp = true;

      if (window.scrollY < headerHeight) {
        setAnimation("visible");
      } else {
        if (isScrollToUp) setAnimation("visible");
        else setAnimation("hidden");
      }

      prevWindowScrollY.current = window.scrollY;
    };

    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <motion.header
        ref={headerRef}
        animate={animation}
        variants={{
          visible: {
            y: 0,
          },
          hidden: {
            y: "-100%",
          },
        }}
        transition={transition}
        className={classNames(
          "sticky top-0 left-0 z-10",
          "flex justify-center w-full",
          "border-b border-neutral-900/10 dark:border-neutral-50/[0.06]",
          "bg-white/95 dark:bg-neutral-900/95",
          "backdrop-blur supports-backdrop-blur:bg-white/60 supports-backdrop-blur:dark:bg-neutral-900/60"
        )}
      >
        <div className="flex items-center justify-between w-full max-w-screen-xl h-14 mx-4 xl:mx-auto">
          <h1 className="flex text-lg drop-shadow dark:shadow-neutral-900">
            <Link href="/">
              <a>
                <span className="font-bold">JaeSeoKim&apos;s</span> Blog
              </a>
            </Link>
          </h1>
          <button>🔍</button>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
