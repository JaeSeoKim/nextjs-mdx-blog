import WithMediumZoom from "../lib/HighOrderComponents/WithMediumZoom";
import Image from "./common/Image";

const markdownComponents: import("mdx/types").MDXComponents = {
  img: WithMediumZoom(Image, {
    backgroundColor: "black",
    backgroundOpacity: 0.9,
  }),
};

export default markdownComponents;
