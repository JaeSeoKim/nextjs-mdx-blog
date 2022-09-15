import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { motion, Transition } from "framer-motion";
import cls from "classnames";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { navbar } from "../../blog.config";
import MenuIcon from "./MenuIcon";

export type NavProps = {};

const Header: React.FC<NavProps> = () => {
  const headerRef = useRef<HTMLElement>(null);
  const prevWindowScrollY = useRef(0);
  const navId = useId();
  const shouldReduceMotion = useReducedMotion();
  const [animation, setAnimation] = useState<"visible" | "hidden">("visible");
  const [isNavOpen, setIsNavOpen] = useState<"opened" | "closing" | "closed">(
    "closed"
  );

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
    <motion.header
      ref={headerRef}
      animate={isNavOpen !== "closed" ? "visible" : animation}
      variants={{
        visible: {
          y: 0,
        },
        hidden: {
          y: "-100%",
        },
      }}
      transition={transition}
      className={cls(
        "sticky top-0 left-0 z-10",
        "bg-white/95 dark:bg-neutral-900/95",
        "backdrop-blur supports-backdrop-blur:bg-white/60 supports-backdrop-blur:dark:bg-neutral-900/60",
        "border-b border-neutral-900/10 dark:border-neutral-50/[0.06]"
      )}
    >
      <div className={cls("flex justify-center w-full")}>
        <div className="flex items-center justify-between w-full max-w-screen-xl h-14 mx-4 xl:mx-auto">
          <div className="flex md:hidden">
            <button
              className=""
              aria-label="show menu"
              aria-expanded={isNavOpen === "opened"}
              aria-controls={navId}
            >
              <MenuIcon
                className="w-6 h-6 stroke-black dark:stroke-white"
                isOpen={isNavOpen === "opened"}
                onClick={() =>
                  setIsNavOpen(p => (p === "opened" ? "closing" : "opened"))
                }
              />
            </button>
          </div>
          <h1 className="flex text-lg drop-shadow dark:shadow-neutral-900">
            <Link href="/">
              <a>{navbar.title}</a>
            </Link>
          </h1>
          <div className="flex">
            <nav className="hidden md:flex">
              {navbar.items.map((item, index) => (
                <Link
                  href={item.href}
                  key={`l-nav-item-${index}-${item.label}-${item.href}`}
                >
                  <a className="mr-4">{item.label}</a>
                </Link>
              ))}
            </nav>
            <button>🔍</button>
          </div>
        </div>
      </div>
      <motion.nav
        id={navId}
        style={{ display: "flex" }}
        initial={{
          height: 0,
        }}
        variants={{
          open: {
            height: "auto",
          },
          closed: {
            height: 0,
          },
        }}
        animate={isNavOpen === "opened" ? "open" : "closed"}
        transition={{
          type: "tween",
          duration: shouldReduceMotion ? 0 : 0.3,
        }}
        onAnimationComplete={() => {
          if (isNavOpen === "closing") {
            setIsNavOpen("closed");
          }
        }}
        className={cls("md:!hidden flex-col overflow-hidden")}
      >
        {navbar.items.map((item, index) => (
          <Link
            href={item.href}
            key={`b-nav-item-${index}-${item.label}-${item.href}`}
          >
            <a className="mr-4">{item.label}</a>
          </Link>
        ))}
      </motion.nav>
    </motion.header>
  );
};

export default Header;
