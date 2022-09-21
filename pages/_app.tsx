import "../styles/globals.scss";
import "@code-hike/mdx/dist/index.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Layout from "../components/Layout";
import { Action, KBarProvider } from "kbar";
import ComandBar from "../components/ComandBar";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { navbar } from "../blog.config";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const actions = useMemo(
    () => [
      {
        id: "홈",
        name: "홈",
        subtitle: "이것은 홈이지롱...!",
        shortcut: ["홈"],
        keywords: "back",
        perform: () => router.push("/"),
      },
      {
        id: "blog",
        name: "Blog",
        shortcut: ["b"],
        keywords: "writing words",
        perform: () => router.push("blog"),
      },
      {
        id: "contact",
        name: "Contact",
        shortcut: ["c"],
        keywords: "email",
        perform: () => (window.location.pathname = "contact"),
      },
      ...navbar.items.map(function (item, index): Action {
        return {
          id: `kbar-nav-item-${item.label}-${item.href}-${index}`,
          name: item.label,
          section: "Navigation",
          perform: () => router.push(item.href),
        };
      }),
    ],
    [router],
  );

  return (
    <>
      <ThemeProvider attribute="class" enableSystem={false}>
        <KBarProvider
          actions={actions}
          options={{
            enableHistory: true,
          }}
        >
          <ComandBar />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </KBarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
