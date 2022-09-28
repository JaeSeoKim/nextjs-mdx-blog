import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import classNames from "classnames";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { header } from "../../blog.config";
import MenuIcon from "./MenuIcon";
import SideBar, { SIDEBAR_ID } from "./Sidebar";
import {
  blurBg,
  borderColor,
  hoverBgColor,
  hoverSubTextColor,
} from "../../styles/common.styles";
import SearchIcon from "./SearchIcon";
import { useKBar } from "kbar";
import DarkModeButton from "./DarkModeButton";

export type HeaderProps = {};
export type NavState = "opened" | "closing" | "closed";

const Header: React.FC<HeaderProps> = () => {
  const headerRef = useRef<HTMLElement>(null);
  const prevLayoutScrollTop = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [isScollTop, setIsScrollTop] = useState(true);
  const [visualState, setVisualState] = useState<"visible" | "hidden">(
    "visible",
  );
  const [navState, setNavState] = useState<NavState>("closed");
  const { query } = useKBar();

  useEffect(() => {
    const $layout = document.getElementById("layout");
    if (!$layout) return;

    const scrollHandler = (_event: Event) => {
      const $header = headerRef.current;
      if (!$header) return;

      const headerHeight = $header.offsetHeight;

      let isScrollToUp = false;
      if (prevLayoutScrollTop.current > $layout.scrollTop) isScrollToUp = true;

      if ($layout.scrollTop < headerHeight) {
        setIsScrollTop(true);
        setVisualState("visible");
      } else {
        setIsScrollTop(false);
        if (isScrollToUp) setVisualState("visible");
        else setVisualState("hidden");
      }

      prevLayoutScrollTop.current = $layout.scrollTop;
    };

    $layout.addEventListener("scroll", scrollHandler);

    return () => {
      $layout.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <>
      <motion.header
        ref={headerRef}
        animate={navState !== "closed" ? "visible" : visualState}
        variants={{
          visible: {
            y: 0,
          },
          hidden: {
            y: "-100%",
          },
        }}
        transition={{
          type: "tween",
          duration: shouldReduceMotion ? 0 : 0.3,
        }}
        className={"sticky top-0 left-0 z-10"}
      >
        <div
          className={classNames(
            "transition-all motion-reduce:transition-none flex justify-center w-full",
            {
              "bg-transparent bg-gradient-to-b from-light/30 to-light/0 dark:from-black/30 dark:to-black/0":
                navState === "closed" && isScollTop,
              "border-b": navState !== "closed" || !isScollTop,
              [borderColor]: navState !== "closed" || !isScollTop,
              [header.className]: navState !== "closed" || !isScollTop,
            },
          )}
        >
          <div className="flex items-center justify-between w-full max-w-screen-xl h-14 px-4 mx-auto">
            <div className="flex md:hidden">
              <button
                type="button"
                aria-label="show menu"
                aria-expanded={navState === "opened"}
                aria-controls={SIDEBAR_ID}
                onClick={() =>
                  setNavState(p => (p === "opened" ? "closing" : "opened"))
                }
                className={classNames("-m-2 p-2 rounded-full", hoverBgColor)}
              >
                <MenuIcon
                  className={"w-6 h-6 stroke-black dark:stroke-white"}
                  isOpen={navState === "opened"}
                />
              </button>
            </div>
            <h1 className="flex text-lg drop-shadow dark:shadow-neutral-900">
              <Link href="/">
                <a>{header.title}</a>
              </Link>
            </h1>
            <div className="flex items-center">
              <nav className="hidden md:flex items-center">
                {header.items.map((item, index) => (
                  <Link
                    href={item.href}
                    key={`r-nav-item-${index}-${item.label}-${item.href}`}
                  >
                    <a className={classNames("mr-4", hoverSubTextColor)}>
                      {item.label}
                    </a>
                  </Link>
                ))}
                <DarkModeButton className="-ml-2" />
              </nav>
              <button
                type="button"
                aria-label="search post"
                className={classNames("-m-2 p-2 rounded-full", hoverBgColor)}
                onClick={() => query.toggle()}
              >
                <SearchIcon className="w-6 h-6 p-[2px]" />
              </button>
            </div>
          </div>
        </div>
        {navState !== "closed" && (
          <SideBar
            state={navState}
            setState={setNavState}
            items={header.items}
          />
        )}
      </motion.header>
    </>
  );
};

export default Header;
