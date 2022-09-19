import classNames from "classnames";
import { useMatches, KBarResults } from "kbar";

const RenderResults: React.FC = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) => {
        if (typeof item === "string") {
          return <div>{item}</div>;
        }
        return (
          <div
            className={classNames(
              "p-2 md:p-4 md:text-lg",
              "transition-colors motion-reduce:transition-none duration-100 ease-in-out",
              {
                "bg-neutral-900/10 dark:bg-neutral-100/10": active,
              },
            )}
          >
            {item.name}
          </div>
        );
      }}
    />
  );
};

export default RenderResults;
