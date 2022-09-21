import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import classNames from "classnames";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { navbar } from "../../blog.config";
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
  const prevWindowScrollY = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [animation, setAnimation] = useState<"visible" | "hidden">("visible");
  const [navState, setNavState] = useState<NavState>("closed");
  const { query } = useKBar();

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
        animate={navState !== "closed" ? "visible" : animation}
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
            "flex justify-center w-full",
            "backdrop-blur",
            blurBg,
            "border-b",
            borderColor,
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
                <a>{navbar.title}</a>
              </Link>
            </h1>
            <div className="flex items-center">
              <nav className="hidden md:flex items-center">
                {navbar.items.map((item, index) => (
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
            items={navbar.items}
          />
        )}
      </motion.header>
    </>
  );
};

export default Header;
