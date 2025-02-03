/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

const variations = [
  {
    name: "text-field",
    title: __("Text", "display-a-meta-field-as-block"),
    description: __("Display a text field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "text",
  },
  {
    name: "textarea-field",
    title: __("Textarea", "display-a-meta-field-as-block"),
    description: __(
      "Display a textarea field.",
      "display-a-meta-field-as-block"
    ),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "textarea",
  },
  {
    name: "image-field",
    title: __("Image", "display-a-meta-field-as-block"),
    description: __("Display a image field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "image",
  },
  {
    name: "link-field",
    title: __("Link", "display-a-meta-field-as-block"),
    description: __("Display a link field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "link",
  },
  {
    name: "select-field",
    title: __("Select", "display-a-meta-field-as-block"),
    description: __("Display a select field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "select",
  },
  {
    name: "true_false-field",
    title: __("True/false", "display-a-meta-field-as-block"),
    description: __(
      "Display a true/false field.",
      "display-a-meta-field-as-block"
    ),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "true_false",
  },
  {
    name: "wysiwyg-field",
    title: __("Editor", "display-a-meta-field-as-block"),
    description: __(
      "Display a wysiwyg field.",
      "display-a-meta-field-as-block"
    ),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "wysiwyg",
  },
  {
    name: "relationship-field",
    title: __("Relationship", "display-a-meta-field-as-block"),
    description: __(
      "Display a relationship field.",
      "display-a-meta-field-as-block"
    ),
    scope: [],
    isActive: (attributes) =>
      attributes?.fieldSettings?.type === "relationship",
  },
  {
    name: "post_object-field",
    title: __("Post Object", "display-a-meta-field-as-block"),
    description: __(
      "Display a post object field.",
      "display-a-meta-field-as-block"
    ),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "post_object",
  },
  {
    name: "number-field",
    title: __("Number", "display-a-meta-field-as-block"),
    description: __("Display a number field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "number",
  },
  {
    name: "email-field",
    title: __("Email", "display-a-meta-field-as-block"),
    description: __("Display an email field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "email",
  },
  {
    name: "url-field",
    title: __("URL", "display-a-meta-field-as-block"),
    description: __("Display a URL field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "url",
  },
  {
    name: "oembed-field",
    title: __("Embed", "display-a-meta-field-as-block"),
    description: __("Display an embed field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "oembed",
  },
  {
    name: "page_link-field",
    title: __("Page link", "display-a-meta-field-as-block"),
    description: __(
      "Display a page link field.",
      "display-a-meta-field-as-block"
    ),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "page_link",
  },
  {
    name: "file-field",
    title: __("File", "display-a-meta-field-as-block"),
    description: __("Display a file field.", "display-a-meta-field-as-block"),
    scope: [],
    isActive: (attributes) => attributes?.fieldSettings?.type === "file",
  },
];

export default variations;
