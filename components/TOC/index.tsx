import classNames from "classnames";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { header } from "../../blog.config";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { TOCItem } from "../../lib/plugins/rehypeTOC";
import styles from "./TOC.module.scss";

export type TOCProps = {
  data: TOCItem[];
  children?: React.ReactNode | undefined;
};

const HEADERSIZE_OFFSET = 56;

const TOC: React.FC<TOCProps> = ({ data, children }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const shouldReduceMotion = useReducedMotion();
  const [currentId, setCurrentId] = useState<string | undefined>();

  useEffect(() => {
    const handler = () => {
      const headers = data
        .map(item => document.getElementById(item.id))
        .filter(Boolean) as HTMLElement[];

      const target = headers.find((header, index, headers) => {
        const { top } = header.getBoundingClientRect();
        if (index === headers.length - 1) {
          return top < HEADERSIZE_OFFSET;
        }
        const { top: nextHeaderTop } =
          headers[index + 1].getBoundingClientRect();

        if (nextHeaderTop > HEADERSIZE_OFFSET && top < HEADERSIZE_OFFSET)
          return true;
      });
      setCurrentId(target?.id);
    };

    window.document.addEventListener("scroll", handler);
    return () => {
      window.document.removeEventListener("scroll", handler);
    };
  }, [data]);

  return (
    <div className="w-full max-w-screen-md xl:max-w-screen-xl px-4 mx-auto">
      <div
        className={classNames(
          "hidden xl:flex flex-col sticky top-14 float-right max-w-[14rem] w-full",
        )}
      >
        <div className="my-2">
          <div className="inline relative py-1">
            <span
              className="absolute hidden dark:block -left-1 -right-1 -bottom-0 h-2 skew-y-1"
              style={{
                backgroundImage: `linear-gradient(to right, ${header.gradient.dark.to}, ${header.gradient.dark.from})`,
              }}
              aria-hidden="true"
            />
            <span
              className="absolute block dark:hidden -left-1 -right-1 -bottom-0 h-2 skew-y-1"
              style={{
                backgroundImage: `linear-gradient(to right, ${header.gradient.light.to}, ${header.gradient.light.from})`,
              }}
              aria-hidden="true"
            />
            <span className="relative text-xl font-extrabold">
              Table Of Contents
            </span>
          </div>
        </div>
        <div
          className={classNames(
            "flex flex-col max-h-[80vh] mt-2 overflow-y-auto",
            styles.scrollbar,
          )}
        >
          {data.map(item => (
            <Link href={`#${item.id}`} key={`toc-${item.id}`}>
              <a className={"relative mt-1 pl-2 group"}>
                {item.id === currentId && (
                  <motion.span
                    aria-label="hidden"
                    layoutId="toc-active"
                    transition={{
                      layout: {
                        duration: shouldReduceMotion ? 0 : 0.3,
                      },
                    }}
                    className="absolute left-0 top-0 bottom-0 w-[4px] rounded-full"
                    style={{
                      backgroundImage: isDarkMode
                        ? `linear-gradient(to bottom, ${header.gradient.dark.to}, ${header.gradient.dark.from})`
                        : `linear-gradient(to bottom, ${header.gradient.light.to}, ${header.gradient.light.from})`,
                    }}
                  />
                )}
                <span
                  className={classNames(
                    "text-base transition-opacity motion-reduce:transition-none duration-150 opacity-75 group-hover:opacity-100",
                    {
                      ["opacity-100"]: item.id === currentId,
                    },
                  )}
                  style={{
                    marginLeft: `calc(${item.rank - 1} * 0.5rem)`,
                  }}
                >
                  {item.content}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default TOC;
