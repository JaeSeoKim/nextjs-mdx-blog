import classNames from "classnames";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  NextScript,
  Head,
} from "next/document";
import { bg } from "../styles/common.styles";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <script>{`
            var customViewportCorrectionVariable = 'vh';

            function setViewportProperty(doc) {
              var prevClientHeight;
              var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );
              function handleResize() {
                var clientHeight = doc.clientHeight;
                if (clientHeight === prevClientHeight) return;
                requestAnimationFrame(function updateViewportHeight(){
                  doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
                  prevClientHeight = clientHeight;
                });
              }
              handleResize();
              return handleResize;
            }
            window.addEventListener('resize', setViewportProperty(document.documentElement));
          `}</script>
        </Head>
        <body className={classNames("relative", bg)}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
