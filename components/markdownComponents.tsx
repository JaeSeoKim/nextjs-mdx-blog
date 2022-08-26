import { CH } from "@code-hike/mdx/components";
import WithMediumZoom from "../lib/HighOrderComponents/WithMediumZoom";
import WithImageFigureCaption from "../lib/HighOrderComponents/WithImageFigureCaption";
import Image from "./Image";

const markdownComponents: import("mdx/types").MDXComponents = {
  img: WithImageFigureCaption(
    WithMediumZoom(Image, {
      backgroundColor: "black",
      backgroundOpacity: 0.9,
    })
  ),
  CH,
};

export default markdownComponents;
