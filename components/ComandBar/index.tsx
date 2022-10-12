import classNames from "classnames";
import { KBarPortal, KBarPositioner, useKBar } from "kbar";
import { KBarSearch } from "./KBarSearch";
import { blurBg, borderColor } from "../../styles/common.styles";
import SearchIcon from "../Header/SearchIcon";
import RenderResults from "./RenderResults";
import Kbd from "./Kbd";
import { KBarAnimator } from "./KBarAnimator";

const ComandBar: React.FC = () => {
  return (
    <KBarPortal>
      <KBarPositioner
        className={classNames(
          "z-50",
          "backdrop-blur",
          "bg-white/60 dark:bg-neutral-900/60",
          "supports-backdrop-blur:bg-white/30 supports-backdrop-blur:dark:bg-neutral-900/30",
        )}
      >
        <KBarAnimator>
          <div
            className={classNames(
              "flex flex-col",
              "w-[calc(100vw_-_16px)] md:w-[40rem]",
              blurBg,
              "border",
              borderColor,
              "rounded-xl",
            )}
          >
            <div
              className={classNames(
                "flex items-center py-4 px-2 md:px-4",
                "border-b",
                borderColor,
              )}
            >
              <SearchIcon className="w-8 h-8 p-1" />
              <KBarSearch className="appearance-none w-full md:text-xl outline-none mx-2 md:mx-4 bg-transparent" />
              <Kbd>ESC</Kbd>
            </div>
            <RenderResults />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default ComandBar;
