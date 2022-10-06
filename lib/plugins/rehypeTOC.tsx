import { Plugin } from "unified";
import { Root } from "hast";
import { hasProperty } from "hast-util-has-property";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";

export type TOCItem = {
  rank: number;
  id: string;
  content: string;
};

export type RehypeTOCOptionsType = {
  ref: {
    current: TOCItem[];
  };
};

const rehypeTOC: Plugin<[RehypeTOCOptionsType], Root> = ({
  ref,
}: RehypeTOCOptionsType) => {
  return tree => {
    visit(tree, "element", node => {
      const rank = headingRank(node);
      if (rank && node.properties && hasProperty(node, "id")) {
        ref.current.push({
          rank,
          id: node.properties.id! as string,
          content: toString(node),
        });
      }
    });
  };
};

export default rehypeTOC;
