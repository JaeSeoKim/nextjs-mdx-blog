import classNames from "classnames";
import { useTheme } from "next-themes";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { motion, AnimatePresence, Variants } from "framer-motion";
import useReducedMotion from "../../lib/hooks/useReducedMotion";
import { hoverBgColor } from "../../styles/common.styles";

export type DarkModeButtonProps = {
  className?: string;
};

const DarkModeButton: React.FC<DarkModeButtonProps> = ({
  className,
  ...props
}) => {
  const { theme, setTheme } = useTheme();
  const shouldReducedMotion = useReducedMotion();
  const isLight = theme === "light";

  const variants: Variants = {
    enter: { opacity: 0, scale: 0, rotate: -180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 180 },
  };

  return (
    <button
      role="button"
      className={classNames(
        "inline-flex items-center",
        "m-2 p-2",
        "text-xl font-semibold",
        "rounded-full",
        hoverBgColor,
        className,
      )}
      {...props}
      onClick={() => setTheme(isLight ? "dark" : "light")}
    >
      <AnimatePresence mode="wait">
        <motion.span
          className="w-6 h-6 p-[2px]"
          key={isLight ? "dark" : "light"}
          variants={variants}
          initial="enter"
          animate="animate"
          exit="exit"
          transition={{
            type: "tween",
            duration: shouldReducedMotion ? 0 : 0.3,
          }}
        >
          {isLight ? <BsMoonStarsFill /> : <BsSunFill />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default DarkModeButton;
