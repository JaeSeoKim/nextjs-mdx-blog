import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useId, useState } from "react";
import { IoTriangle } from "react-icons/io5";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { TOCItem } from "../../lib/plugins/rehypeTOC";
import { borderColor } from "../../styles/common.styles";
import Underline from "./Underline";

export type MobileTOCProps = {
  data: TOCItem[];
};

const MobileTOC: React.FC<MobileTOCProps> = ({ data }) => {
  const id = useId();
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames(
        "flex flex-col xl:hidden mb-4 rounded-lg border p-2",
        borderColor,
      )}
    >
      <div
        aria-expanded={isOpen}
        aria-controls={id}
        className={classNames(
          "flex items-center cursor-pointer select-none p-2",
          {
            [`border-b ${borderColor}`]: isOpen,
          },
        )}
        onClick={() => setIsOpen(p => !p)}
      >
        <motion.span
          aria-hidden="true"
          className="inline-flex items-center mr-3"
          animate={isOpen ? "open" : "close"}
          initial={isOpen ? "open" : "close"}
          transition={{
            ease: "easeInOut",
            duration: shouldReduceMotion ? 0 : 0.15,
          }}
          variants={{
            open: {
              rotate: "180deg",
            },
            close: {
              rotate: "90deg",
            },
          }}
        >
          <IoTriangle className="inline" />
        </motion.span>
        <span className="relative">
          <Underline />
          <span className="relative font-bold">Table Of Contents</span>
        </span>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={id}
            key={"details"}
            className={"flex flex-col"}
            transition={{
              ease: "easeInOut",
              duration: shouldReduceMotion ? 0 : 0.15,
            }}
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
          >
            {data.map(item => (
              <Link
                href={`#${item.id}`}
                key={`toc-${item.id}`}
                className={
                  "relative mt-1 pl-2 transition-opacity motion-reduce:transition-none duration-150 opacity-75 hover:opacity-100"
                }
              >
                <span
                  className={"text-base"}
                  style={{
                    marginLeft: `calc(${item.rank - 1} * 0.5rem)`,
                  }}
                >
                  {item.content}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileTOC;
