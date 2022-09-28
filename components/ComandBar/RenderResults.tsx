import classNames from "classnames";
import { useMatches, KBarResults, useKBar } from "kbar";
import { borderColor, subTextColor } from "../../styles/common.styles";
import Kbd from "./Kbd";

const RenderResults: React.FC = () => {
  const { query } = useKBar();
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return (
            <div
              className={classNames(
                "px-1 md:px-2 py-2 text-lg",
                subTextColor,
                "border-t",
                borderColor,
              )}
            >
              {item}
            </div>
          );
        }
        return (
          <div
            className={classNames(
              "flex items-center",
              "py-4 px-2 md:px-4",
              "transition-colors motion-reduce:transition-none duration-100 ease-in-out",
              {
                "bg-neutral-900/10 dark:bg-neutral-100/10": active,
              },
            )}
          >
            <div className="flex flex-col w-full">
              <div className="flex items-center">
                {item.icon && <div className="mr-2">{item.icon}</div>}
                <div className="text-lg w-full">{item.name}</div>
              </div>
              {item.subtitle && (
                <div className={classNames("text-xs", subTextColor)}>
                  {item.subtitle}
                </div>
              )}
            </div>
            {item.shortcut?.map((shortcut, index) => (
              <Kbd
                key={`${item.name}-shourcut-${shortcut}-${index}`}
                className={classNames({
                  ["mr-1"]: index + 1 !== item.shortcut!.length,
                })}
              >
                {shortcut}
              </Kbd>
            ))}
          </div>
        );
      }}
    />
  );
};

export default RenderResults;
