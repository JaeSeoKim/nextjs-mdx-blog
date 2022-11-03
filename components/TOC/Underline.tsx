import classNames from "classnames";
import { header } from "../../blog.config";

export type UnderlineProps = {
  className?: string;
};

const Underline: React.FC<UnderlineProps> = ({ className }) => {
  return (
    <>
      <BaseUnderline className={className} darkMode />
      <BaseUnderline className={className} />
    </>
  );
};

export type BaseUnderlineProps = {
  darkMode?: boolean;
  className?: string;
};

const BaseUnderline: React.FC<BaseUnderlineProps> = ({
  darkMode,
  className,
}) => {
  const colorMode = darkMode ? "dark" : "light";
  return (
    <span
      className={classNames(
        "absolute -left-1 -right-1 -bottom-0 h-2 skew-y-[0.5deg]",
        darkMode ? "hidden dark:block" : "block dark:hidden",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${header.gradient[colorMode].to}, ${header.gradient[colorMode].from})`,
      }}
      aria-hidden="true"
    />
  );
};

export default Underline;
