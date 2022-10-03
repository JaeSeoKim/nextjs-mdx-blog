import classNames from "classnames";
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useId,
  useRef,
} from "react";
import { author, github } from "../blog.config";
import { borderColor } from "../styles/common.styles";
import Header from "./Header";

export type LayoutContextType = {
  layoutRef: RefObject<HTMLDivElement>;
  layoutId: string;
};

export const LayoutContext = createContext<LayoutContextType>(
  null as unknown as LayoutContextType,
);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  return context;
};

export type LayoutProps = PropsWithChildren<{}>;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const layoutId = useId();
  return (
    <LayoutContext.Provider
      value={{
        layoutRef,
        layoutId,
      }}
    >
      <div
        id={layoutId}
        ref={layoutRef}
        className={classNames(
          "relative min-h-screen max-h-screen overflow-y-auto overflow-x-hidden",
          "flex flex-col",
          "text-black dark:text-white",
        )}
      >
        <Header />
        <main className="flex flex-col grow">{children}</main>
        <footer
          className={classNames(
            "flex w-full items-center justify-center mt-4",
            "border-t",
            borderColor,
          )}
        >
          <a
            className="flex items-center justify-center gap-2 py-4 text-sm"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright ©{author}
          </a>
        </footer>
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
