import { CH } from "@code-hike/mdx/components";
import WithImageFigureCaption from "../lib/HighOrderComponents/withImageFigureCaption";
import Image from "./Image";

const markdownComponents: import("mdx/types").MDXComponents = {
  img: WithImageFigureCaption(Image),
  CH,
};

export default markdownComponents;
