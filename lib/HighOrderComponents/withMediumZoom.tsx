import { CSSProperties, ElementType, useRef, useState } from "react";
import { useLayoutContext } from "../../components/Layout";
import usePrefersReducedMotion from "../hooks/useReducedMotion";

type withMediumZoomOptionType<C extends ElementType> = {
  as?: C;
  zoomPercentage?: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
  animationDuration?: number;
};

export default function withMediumZoom<C extends ElementType, _Props>(
  Component: React.FC<_Props>,
  options?: withMediumZoomOptionType<C>,
) {
  const {
    as = "span",
    zoomPercentage = 90,
    backgroundOpacity = 0.9,
    backgroundColor = "white",
  } = options || {};

  const MediumZoom: React.FC<_Props> = ({ ...props }) => {
    const { layoutRef } = useLayoutContext();
    const Container = as;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpened, setIsOpened] = useState(false);
    const shouldReduceMotion = usePrefersReducedMotion();

    const animationDuration = shouldReduceMotion
      ? 0
      : options?.animationDuration || 300;

    const handleImageZoom = () => {
      const $layout = layoutRef.current;
      if (!$layout || !containerRef.current || isOpened) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      let clientHeight = containerRect.height;
      let clientWidth = containerRect.width;

      const wPrim = ($layout.offsetWidth - containerRect.width) / 2;
      const hPrim = ($layout.offsetHeight - containerRect.height) / 2;
      const cL = containerRect.left;
      const cT = containerRect.top;

      const zoomPerc = zoomPercentage / 100;
      if (
        (($layout.offsetHeight * zoomPerc) / clientHeight) * clientWidth >=
        $layout.offsetWidth
      ) {
        containerRef.current.style.transform = `translate(${wPrim - cL}px,${
          hPrim - cT
        }px) scale(${($layout.offsetWidth * zoomPerc) / clientWidth})`;
      } else {
        containerRef.current.style.transform = `translate(${wPrim - cL}px,${
          hPrim - cT
        }px) scale(${($layout.offsetHeight * zoomPerc) / clientHeight})`;
      }

      $layout.addEventListener("scroll", closeWrapper, { once: true });

      setIsOpened(true);
    };

    const closeWrapper = () => {
      if (!containerRef.current) return;

      containerRef.current.style.transform = `scale(1)`;
      setIsOpened(false);
    };

    const styles: CSSProperties = {
      border: 0,
      margin: "0 auto 0 auto",
      padding: 0,
      boxSizing: "border-box",
      maxWidth: "100%",
      position: "relative",
      transition: `transform ${animationDuration}ms`,
      display: "block",
      width: "max-content",
      height: "max-content",
      zIndex: isOpened ? 50 : 0,
      overflow: "hidden",
      backgroundColor: "transparent",
      cursor: isOpened ? "zoom-out" : "zoom-in",
    };

    return (
      <>
        {isOpened ? (
          <Container
            style={{
              backgroundColor: backgroundColor,
              opacity: backgroundOpacity,
              position: "fixed",
              zIndex: 40,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              cursor: "zoom-out",
            }}
            onClick={closeWrapper}
          />
        ) : null}
        <Container
          style={styles}
          ref={containerRef}
          onClick={handleImageZoom}
          className="hover:will-change-transform"
        >
          <Component {...props} onClick={isOpened ? closeWrapper : undefined} />
        </Container>
      </>
    );
  };

  return MediumZoom;
}
