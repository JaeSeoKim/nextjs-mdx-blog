import "../styles/globals.scss";
import "@code-hike/mdx/dist/index.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
