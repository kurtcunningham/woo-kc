/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { useContext } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { Section, Widget, VideoGuide } from "../components";
import { DataContext } from "../utils";

const WidgetWelcome = () => {
  const { data: { videos = {} } = {} } = useContext(DataContext);

  return (
    <Widget isHeaderHidden={true} isFullRow={true} className="widget-welcome">
      <h1>Welcome to Meta Field Block (MFB)</h1>
      <div className="welcome__description">
        <h2>
          This single-block plugin helps you display your custom fields in
          WordPress Gutenberg effortlessly.
        </h2>
        <p>
          You can display custom fields for posts, terms, or users that are
          registered through the core API functions (
          <a
            href="https://developer.wordpress.org/reference/functions/register_meta/"
            target="_blank"
          >
            register_meta
          </a>
          ,{" "}
          <a
            href="https://developer.wordpress.org/reference/functions/register_post_meta/"
            target="_blank"
          >
            register_post_meta
          </a>
          , or{" "}
          <a
            href="https://developer.wordpress.org/reference/functions/register_term_meta/"
            target="_blank"
          >
            register_term_meta
          </a>
          ) or custom fields from any meta field framework. It supports all
          fields whose values can be retrieved by the core API functions (
          <a
            href="https://developer.wordpress.org/reference/functions/get_post_meta/"
            target="_blank"
          >
            get_post_meta
          </a>
          ,{" "}
          <a
            href="https://developer.wordpress.org/reference/functions/get_term_meta/"
            target="_blank"
          >
            get_term_meta
          </a>
          ,{" "}
          <a
            href="https://developer.wordpress.org/reference/functions/get_user_meta/"
            target="_blank"
          >
            get_user_meta
          </a>
          ) and are strings or can be converted to strings. To display the field
          values in the Block Editor, they have to be accessible via the REST
          API or have the field type set to <code>dynamic</code>.
        </p>
        <p>
          This plugin also supports displaying custom fields created by the{" "}
          <a href="https://www.advancedcustomfields.com/" target="_blank">
            Advanced Custom Fields
          </a>{" "}
          plugin explicitly. It supports all{" "}
          <a
            href="https://www.advancedcustomfields.com/resources/#field-types"
            target="_blank"
          >
            ACF field types
          </a>{" "}
          whose values are strings or can be converted to strings. Some other
          complex fields such as Image, Link, Page Link, True False, Checkbox,
          Select, Radio, Button Group, Taxonomy, User, Post Object and
          Relationship field types are also supported in basic formats.
        </p>
        <p>
          An edge-case where this block is really helpful is when you need to
          get the correct <code>post_id</code> in your shortcode when you use it
          in a Query Loop. In that case, you can choose the field type as
          <code>dynamic</code> and input your shortcode in the field name. The
          block will show it correctly on both the front end and the editor.
        </p>
        <h2>Block attributes and block support features</h2>
        <p>
          This block is built using only native Gutenberg features. The details
          of block metadata are as follows:
        </p>
        <h3>Block attributes</h3>
        <ul>
          <li>
            <code>fieldType</code>(string): It can be one of <code>meta</code>,{" "}
            <code>dynamic</code>, <code>rest_field</code>, or <code>acf</code>.
            Default is <code>meta</code>.
          </li>
          <li>
            <code>fieldName</code>(string): This is for inputting the name of
            your field. If your fields are registered with the{" "}
            <code>show in REST</code>
            option enabled, their names will appear below the input control for
            easy copying and pasting.
          </li>
          <li>
            <code>fieldSettings</code>(object): The value of this attribute will
            be generated automatically when you input fieldType and fieldName.
          </li>
          <li>
            <code>hideEmpty</code>(boolean): This setting allows you to hide the
            block if its value is empty. Default is false.
          </li>
          <li>
            <code>emptyMessage</code>(string): This text will be shown if the
            value is empty
          </li>
          <li>
            <code>prefix</code>(string): The text that will be shown before the
            field value.
          </li>
          <li>
            <code>suffix</code>(string): The text that will be shown after the
            field value.
          </li>
          <li>
            <code>labelAsPrefix</code>(boolean): If enabled, the field label
            will be used as prefix automatically. It’s only for ACF fields.
          </li>
          <li>
            <code>displayLayout</code>(string): It can be an empty value or
            <code>inline-block</code>, <code>block</code>. Default is empty
            value. This setting allows you to choose a basic layout for value,
            prefix and suffix.
          </li>
          <li>
            <code>tagName</code>(string): It can be one of the common HTML tags
            such as div, h1, …, h6, p, span, header, footer, section. Default is
            div.
          </li>
          <li>
            <code>textAlign</code>(string): It is similar to the core text align
            attribute.
          </li>
          <li>
            <code>showOutline</code>(boolean): If enabled, the block in the
            editor will be shown with a border. This setting won’t affect the
            front end.
          </li>
        </ul>
        <h3>Block support features</h3>
        <ul>
          <li>
            <strong>Typography:</strong> font family, font size, line height,
            font weight, font style, letter spacing, text transform, and text
            decoration.
          </li>
          <li>
            <strong>Spacing:</strong> margin, padding, and block spacing.
          </li>
          <li>
            <strong>Color:</strong> text, background, and link.
          </li>
          <li>
            <strong>Border</strong> and <strong>radius</strong>.
          </li>
          <li>
            <strong>Align:</strong> full and wide.
          </li>
        </ul>

        <h2>How to use it?</h2>
        <p>
          Similar to the core blocks, you can either use it by inserting it
          directly in the Editor or inputting it in a template file.
        </p>
        <VideoGuide name="basicFields" videos={videos} />
        <VideoGuide name="siteEditorFields" videos={videos} />
        <h3>How to use it in a template file:</h3>
        <pre>
          {`<!-- wp:mfb/meta-field-block {"fieldType":"acf","fieldName":"image_field"} /-->`}
        </pre>
        <h3>How to display the value in the Block Editor</h3>
        <p>
          Since version 1.2.3, you could use <code>dynamic</code> field type to
          display private fields in the editor. The changes made by the hook
          <code>meta_field_block_get_block_content</code> can also be seen both
          on the front end and the editor with this field type.
        </p>
        <p>
          To display the value of a custom field in the Block Editor, you need
          to make your custom field accessible through the REST API. By doing
          this, the field name will also show up in the list of suggested names
          below the input field name control. To achieve this, you need to
          register your custom field with the <code>show_in_rest</code> option
          enabled. It can be either a boolean value or an array, depending on
          the data type of the custom field. For example:
          <pre>
            {`register_meta(
  'post',
  'post_meta_string',
  array(
    'show_in_rest' => true,
    'type'         => 'string',
    'default'      => 'The default string value',
    'single'       => true,
  )
);`}
          </pre>
        </p>
        <p>
          For ACF fields, you need to enable the <code>Show in REST API</code>{" "}
          setting in the <code>Settings → Group Settings</code> section in the
          edit field group screen.
        </p>
        <img
          alt="ACF REST API enabled"
          src="https://metafieldblock.com/docs/acf-rest-api-enabled.png"
        />
        <h2>How to extend it with custom hooks?</h2>
        <p>
          For developers, this block provides hook APIs that allow you to
          display complex fields or change the output of your fields with your
          custom HTML output easily. You can also use this block as a
          placeholder to{" "}
          <a
            href="https://wordpress.org/support/topic/how-to-use-mfb-to-display-dynamic-fields/"
            target="_blank"
          >
            display any kind of content
          </a>
          , not just real custom fields, with <code>$object_id</code> (post_id,
          term_id, user_id) and <code>$object_type</code> (post, term, user) as
          context parameters. This feature is very helpful if you want to
          display some custom dynamic content quickly using PHP code but you
          don't want to register your own custom blocks. Here are the details of
          hooks that you can use to extend it with custom PHP code:
        </p>
        <ul>
          <li>
            <code>meta_field_block_get_block_content</code>: This hook allows
            you to filter the block content before it is rendered. Here is a
            simple example of how to use it:
            <pre>
              {`add_filter( 'meta_field_block_get_block_content', function ( $block_content, $attributes, $block, $object_id, $object_type ) {
  $field_name = $attributes['fieldName'] ?? '';

  // Replace your_field_name with your unique name.
  if ( 'your_field_name' === $field_name ) {
    // Do whatever you want here.
    $block_content = 'new content';
  }

  return $block_content;
}, 10, 5);`}
            </pre>
          </li>
          <li>
            <code>meta_field_block_get_acf_field</code>: This hook allows you to
            filter the ACF field value before it is rendered. Here is a simple
            example of how to use it:
            <pre>
              {`add_filter( 'meta_field_block_get_acf_field', function ( $field_value, $object_id, $field, $raw_value, $object_type ) {
  $field_name = $field['name'] ?? '';

  // Replace your_field_name with your unique name.
  if ( 'your_field_name' === $field_name ) {
    // Do whatever you want here.
    $field_value = 'new content';
  }

  return $field_value;
}, 10, 5);`}
            </pre>
          </li>
          <li>
            <code>meta_field_block_kses_allowed_html</code>: By default, the
            <code>block_content</code> will be sanitized for allowed HTML tags,
            the default value for allowed HTML tags is{" "}
            <code>$allowedposttags</code>. This hook allows you to filter the
            allowed HTML tags for the block content.
          </li>
        </ul>
        <p>
          To learn more about the features of this plugin and how to extend it,
          please check out the{" "}
          <a
            href="https://metafieldblock.com?utm_source=Plugin+Dashboard&utm_campaign=Setting+Page&utm_medium=link&utm_content=Website"
            target="_blank"
          >
            website
          </a>{" "}
          and
          <a
            href="https://wordpress.org/plugins/display-a-meta-field-as-block/#description"
            target="_blank"
          >
            plugin description
          </a>{" "}
          for details.
        </p>
      </div>
    </Widget>
  );
};

export const GettingStarted = () => {
  return (
    <Section>
      <WidgetWelcome />
    </Section>
  );
};
