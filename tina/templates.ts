import type { TinaField } from "tinacms";
export function blog_postFields() {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "datetime",
      name: "date",
      label: "Publish Date",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "image",
      name: "img",
      label: "Featured Image",
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
    },
    {
      type: "string",
      name: "layout",
      label: "Layout",
    },
  ] as TinaField[];
}
