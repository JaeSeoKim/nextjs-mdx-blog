import React, { ComponentProps } from "react";
import { motion, SVGMotionProps, Transition, Variants } from "framer-motion";
import useReducedMotion from "../../lib/hooks/useReducedMotion";

export type MenuIconProps = Omit<SVGMotionProps<SVGSVGElement>, "css"> & {
  isOpen: boolean;
};

const MenuIcon: React.FC<MenuIconProps> = ({ isOpen, ...props }) => {
  const shouldReducedMotion = useReducedMotion();

  const paths: Variants[] = [
    {
      closed: { d: "M4 6L20 6" },
      open: { d: "M4 4L20 20" },
    },
    {
      closed: { d: "M4 12L20 12", opacity: 1 },
      open: { d: "M12 12L12 12", opacity: 0 },
    },
    {
      closed: { d: "M4 18L20 18" },
      open: { d: "M4 20L20 4" },
    },
  ];

  const transition: Transition = {
    type: "tween",
    duration: shouldReducedMotion ? 0 : 0.3,
  };

  return (
    <motion.svg
      stroke="inherit"
      width="1rem"
      height="1rem"
      {...props}
      transition={transition}
      animate={isOpen ? "open" : "closed"}
      viewBox="0 0 23 23"
    >
      {paths.map((path, index) => (
        <motion.path
          variants={path}
          transition={transition}
          key={index}
          fill="transparent"
          stroke="inherit"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}
    </motion.svg>
  );
};

export default MenuIcon;
