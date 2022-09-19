import classNames from "classnames";

export const bg = "bg-white dark:bg-neutral-900";

export const blurBg = classNames(
  "bg-white/90 dark:bg-neutral-900/90",
  "supports-backdrop-blur:bg-white/60 supports-backdrop-blur:dark:bg-neutral-900/60",
);

export const borderColor =
  "border-neutral-900/10 dark:border-neutral-50/[0.06]";

export const hoverBgColor =
  "transition-colors motion-reduce:transition-none duration-100 ease-in-out hover:bg-neutral-900/10 hover:dark:bg-neutral-100/10";
