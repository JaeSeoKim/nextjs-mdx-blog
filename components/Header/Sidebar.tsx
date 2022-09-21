import classNames from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { NavState } from ".";
import { navBarItem } from "../../blog.config";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { blurBg, borderColor, hoverBgColor } from "../../styles/common.styles";
import DarkModeButton from "./DarkModeButton";

export const SIDEBAR_ID = "header-sidebar";

export type SidebarProps = {
  items: navBarItem[];
  state: NavState;
  setState: React.Dispatch<React.SetStateAction<NavState>>;
};

const Sidebar: React.FC<SidebarProps> = ({ items, state, setState }) => {
  const shouldReducedMotion = useReducedMotion();
  return (
    <div
      className={classNames(
        "absolute top-0 left-0 -z-[1]",
        "md:hidden flex w-full min-h-screen max-h-screen",
      )}
    >
      <motion.nav
        id={SIDEBAR_ID}
        animate={state !== "opened" ? "close" : "open"}
        initial={{
          x: "-100%",
        }}
        variants={{
          open: {
            x: 0,
          },
          close: {
            x: "-100%",
          },
        }}
        transition={{
          type: "tween",
          duration: shouldReducedMotion ? 0 : 0.3,
        }}
        onAnimationComplete={() => {
          if (state === "closing") {
            setState("closed");
          }
        }}
        className={classNames(
          "flex flex-col grow-[3] mt-14",
          "border",
          borderColor,
          "backdrop-blur",
          blurBg,
        )}
      >
        <div className="flex flex-col w-full overflow-y-auto">
          <div
            className={classNames(
              "flex justify-center",
              "border-b",
              borderColor,
            )}
          >
            <DarkModeButton />
          </div>
          {items.map((item, index) => (
            <Link
              key={`sidebar-nav-item-${index}-${item.label}-${item.href}`}
              href={item.href}
              passHref
            >
              <a
                className={classNames(
                  "p-4",
                  "text-xl font-semibold",
                  hoverBgColor,
                  "border-b",
                  borderColor,
                )}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </motion.nav>
      <div
        className="flex grow-[2]"
        role="button"
        aria-label="close sidebar"
        onClick={() => setState("closing")}
      />
    </div>
  );
};

export default Sidebar;
