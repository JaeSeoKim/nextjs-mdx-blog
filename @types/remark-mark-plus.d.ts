declare module "remark-mark-plus" {
  export default function remarkHeadingId():
    | void
    | import("unified").Transformer<import("mdast").Root, import("mdast").Root>;
  export type Root = import("mdast").Root;
}
