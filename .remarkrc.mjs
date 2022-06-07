import remarkFrontmatter from "remark-frontmatter";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkPresetPrettier from "remark-preset-prettier";
import remarkLintFileExtension from "remark-lint-file-extension";
import remarkGfm from "remark-gfm";
import remarkMDX from "remark-mdx";

const plugins = [
  remarkFrontmatter,
  remarkMDX,
  remarkGfm,
  remarkPresetLintConsistent,
  remarkPresetLintMarkdownStyleGuide,
  remarkPresetLintRecommended,
  remarkPresetPrettier,
  [remarkLintFileExtension, false],
];

export default {
  plugins,
};
