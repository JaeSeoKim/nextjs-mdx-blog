import classNames from "classnames";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  useKBar,
} from "kbar";
import { blurBg, borderColor } from "../../styles/common.styles";
import SearchIcon from "../Header/SearchIcon";
import RenderResults from "./RenderResults";

const ComandBar: React.FC = () => {
  const { query } = useKBar();

  return (
    <KBarPortal>
      <KBarPositioner
        className={classNames(
          "z-50",
          "backdrop-blur",
          "bg-white/60 dark:bg-neutral-900/6",
          "supports-backdrop-blur:bg-white/30 supports-backdrop-blur:dark:bg-neutral-900/30",
        )}
      >
        <KBarAnimator>
          <div
            className={classNames(
              "flex flex-col",
              "w-[85vw] md:w-[36rem] max-h-[60vh] overflow-hidden overflow-y-auto",
              blurBg,
              "border",
              borderColor,
              "rounded-xl",
            )}
          >
            <div
              className={classNames(
                "flex items-center p-2 md:p-4",
                "border-b",
                borderColor,
              )}
            >
              <SearchIcon className="w-8 h-8 p-1" />
              <KBarSearch className="appearance-none w-full md:text-xl outline-none mx-2 md:mx-4 bg-transparent" />
              <kbd
                role="button"
                className={classNames(
                  "px-1 text-sm md:text-base font-semibold rounded border",
                  borderColor,
                  "cursor-pointer",
                )}
                onClick={() => query.toggle()}
              >
                ESC
              </kbd>
            </div>
            <RenderResults />
          </div>
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
};

export default ComandBar;
