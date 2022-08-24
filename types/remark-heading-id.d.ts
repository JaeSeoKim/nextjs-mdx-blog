declare module "remark-heading-id" {
  export default function remarkHeadingId():
    | void
    | import("unified").Transformer<import("mdast").Root, import("mdast").Root>;
  export type Root = import("mdast").Root;
}
