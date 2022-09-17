import classNames from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { NavState } from ".";
import { navBarItem } from "../../blog.config";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import DarkModeButton from "./DarkModeButton";

export type SidebarProps = {
  id: string;
  items: navBarItem[];
  state: NavState;
  setState: React.Dispatch<React.SetStateAction<NavState>>;
};

const Sidebar: React.FC<SidebarProps> = ({ id, items, state, setState }) => {
  const shouldReducedMotion = useReducedMotion();
  return (
    <div
      className={classNames(
        "absolute top-0 left-0 -z-[1]",
        "md:hidden flex w-full min-h-screen max-h-screen",
      )}
    >
      <motion.nav
        id={id}
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
          "flex flex-grow-[3] pt-14",
          "border border-neutral-900/10 dark:border-neutral-50/[0.06]",
          "bg-white/90 dark:bg-neutral-900/90",
          "backdrop-blur supports-backdrop-blur:bg-white/60 supports-backdrop-blur:dark:bg-neutral-900/60",
        )}
      >
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <div
            className={classNames(
              "flex justify-center",
              "border-b border-neutral-900/10 dark:border-neutral-50/[0.06]",
            )}
          >
            <DarkModeButton
              className={classNames(
                "m-2 p-2",
                "text-xl font-semibold",
                "rounded-full hover:bg-neutral-900/10 hover:dark:bg-neutral-100/10",
              )}
            />
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
                  "hover:bg-neutral-900/10 hover:dark:bg-neutral-100/10",
                  "border-b border-neutral-900/10 dark:border-neutral-50/[0.06]",
                )}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      </motion.nav>
      <div
        className="flex flex-grow-[2]"
        role="button"
        aria-label="close sidebar"
        onClick={() => setState("closing")}
      />
    </div>
  );
};

export default Sidebar;
