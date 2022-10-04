import "../styles/globals.scss";
import "@code-hike/mdx/dist/index.css";
import type { AppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { Action, KBarProvider } from "kbar";
import ComandBar from "../components/ComandBar";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { header } from "../blog.config";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const actions = useMemo(
    () => [
      {
        id: "home",
        name: "home",
        shortcut: ["h"],
        perform: () => router.push("/"),
      },
      {
        id: "posts",
        name: "posts",
        shortcut: ["p"],
        perform: () => router.push("/posts"),
      },
      {
        id: `theme-dark`,
        name: "dark mode",
        icon: <BsMoonStarsFill className="w-5 h-5" />,
        shortcut: ["d"],
        section: "Themes",
        perform: () => setTheme("dark"),
      },
      {
        id: `theme-light`,
        name: "light mode",
        icon: <BsSunFill className="w-5 h-5" />,
        shortcut: ["l"],
        section: "Themes",
        perform: () => setTheme("light"),
      },
      ...header.items.map(function (item, index): Action {
        return {
          id: `kbar-nav-item-${item.label}-${item.href}-${index}`,
          name: item.label,
          section: "Navigation",
          perform: () => router.push(item.href),
        };
      }),
    ],
    [router, setTheme],
  );

  return (
    <>
      <KBarProvider
        actions={actions}
        options={{
          enableHistory: true,
        }}
      >
        <ComandBar />
        <Component {...pageProps} />
      </KBarProvider>
    </>
  );
}

function withTheme(Component: React.ElementType) {
  const App = ({ ...props }) => {
    return (
      <ThemeProvider attribute="class" enableSystem={false}>
        <Component {...props} />
      </ThemeProvider>
    );
  };

  return App;
}

export default withTheme(MyApp);
