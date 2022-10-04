import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import classNames from "classnames";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { header } from "../../blog.config";
import MenuIcon from "./MenuIcon";
import SideBar, { SIDEBAR_ID } from "./Sidebar";
import { borderColor, hoverBgColor } from "../../styles/common.styles";
import SearchIcon from "./SearchIcon";
import { useKBar } from "kbar";
import DarkModeButton from "./DarkModeButton";
import { useTheme } from "next-themes";
import { useLayoutContext } from "../Layout";

export type HeaderProps = {
  isScrollTopTransparent?: boolean;
};
export type NavState = "opened" | "closing" | "closed";

const Header: React.FC<HeaderProps> = ({ isScrollTopTransparent }) => {
  const headerRef = useRef<HTMLElement>(null);
  const { layoutId } = useLayoutContext();
  const prevLayoutscrollTop = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const [isScollTop, setIsScrollTop] = useState(true);
  const [visualState, setVisualState] = useState<"visible" | "hidden">(
    "visible",
  );
  const [navState, setNavState] = useState<NavState>("closed");
  const headerStyleType: "transparent" | "gradient" = (() => {
    if (isScrollTopTransparent && !(navState !== "closed") && isScollTop) {
      return "transparent";
    }
    return "gradient";
  })();
  const { query } = useKBar();

  useEffect(() => {
    const $layout = document.getElementById(layoutId);
    if (!$layout) return;

    const scrollHandler = (_event: Event) => {
      const $header = headerRef.current;
      if (!$header) return;

      let isScrollToUp = false;
      const headerHeight = $header.offsetHeight;
      const scrollTop = $layout.scrollTop;

      if (prevLayoutscrollTop.current > scrollTop) isScrollToUp = true;
      prevLayoutscrollTop.current = scrollTop;
      if (scrollTop < headerHeight) {
        setIsScrollTop(true);
        setVisualState("visible");
      } else {
        setIsScrollTop(false);
        if (isScrollToUp) setVisualState("visible");
        else setVisualState("hidden");
      }
    };

    $layout.addEventListener("scroll", scrollHandler);
    return () => {
      $layout.removeEventListener("scroll", scrollHandler);
    };
  }, [layoutId]);

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
        className={"fixed top-0 left-0 z-10 w-full"}
      >
        <motion.div
          animate={[headerStyleType, `${theme}-${headerStyleType}`]}
          variants={{
            ["transparent"]: {
              backgroundImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(255,255,255,0))",
            },
            ["light-gradient"]: {
              backgroundImage: `linear-gradient(to right, ${header.gradient.light.from}, ${header.gradient.light.to})`,
            },
            ["dark-gradient"]: {
              backgroundImage: `linear-gradient(to right, ${header.gradient.dark.from}, ${header.gradient.dark.to})`,
            },
          }}
          transition={{
            type: "tween",
            duration: shouldReduceMotion ? 0 : 0.15,
          }}
          className={classNames("flex justify-center w-full text-white", {
            [`backdrop-blur border-b ${borderColor}`]:
              headerStyleType === "gradient",
          })}
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
                  className={"w-6 h-6 stroke-white"}
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
                    <a className={"mr-4 hover:opacity-75"}>{item.label}</a>
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
        </motion.div>
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
