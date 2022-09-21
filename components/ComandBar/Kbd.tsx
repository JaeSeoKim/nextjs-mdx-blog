import classNames from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { borderColor } from "../../styles/common.styles";

export type KbdProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
>;

const Kbd: React.FC<KbdProps> = ({ className, onClick, ...props }) => {
  return (
    <kbd
      {...props}
      className={classNames(
        "px-1 font-mono text-base font-semibold rounded border",
        borderColor,
        className,
      )}
    />
  );
};

export default Kbd;
