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
import { Section, Widget, VideoGuide, YouTubeVideo } from "../components";
import { DataContext, isPremium } from "../utils";

const WidgetPro = () => {
  const { data: { videos = {} } = {} } = useContext(DataContext);

  let proTitle = "Save your time with MFB Pro";
  let promoTextBefore = (
    <>
      <p>
        The free version of MFB already supports most real-world use cases, and
        with custom hooks, you can display anything with ease. However, if you
        don’t want to write custom hooks, we offer a Pro version of MFB with
        advanced features that can significantly save you time in developing
        your sites.
      </p>
    </>
  );
  let promoTextAfter = (
    <>
      <p>
        <strong>
          If you want to upgrade to the Pro version, click on the{" "}
          <span style={{ color: "#d20962" }}>Upgrade</span> item on the top
          menu. If you don't like it over the next 14 days, we'll happily refund
          100% of your money. No questions asked.
        </strong>
      </p>
      <p>
        <strong>
          If you don't want to upgrade, it's total fine. With custom hooks, you
          can do whatever you want with the free version.
        </strong>
      </p>
      <p>
        <strong>
          To learn more about the MFB Pro, please check out the{" "}
          <a
            href="https://metafieldblock.com/pro?utm_source=Plugin+Dashboard&utm_campaign=Setting+Page&utm_medium=link&utm_content=MFB+Pro"
            target="_blank"
          >
            website
          </a>
          . You can create a playground site to test it for free at{" "}
          <a href="https://try.metafieldblock.com" target="_blank">
            https://try.metafieldblock.com
          </a>
          .
        </strong>
      </p>
    </>
  );
  if (isPremium) {
    proTitle = "Thank you for choosing MFB Pro";
    promoTextAfter = null;
    promoTextBefore = null;
  }
  return (
    <Widget isHeaderHidden={true} isFullRow={true} className="widget-welcome">
      <h1>{proTitle} - A page builder fits inside a single block</h1>
      <div className="welcome__description">
        {promoTextBefore}
        <p>
          MFB Pro transforms your ACF complex field types into container blocks,
          which work similarly to core container blocks. This eliminates the
          need for creating ACF custom blocks or writing custom code for
          displaying ACF complex fields. Below is a video tutorial on how to use
          MFB Pro to build a post template without coding.
        </p>
        <div className="video-tutorials">
          <YouTubeVideo
            id="5VePClgZmlQ"
            title="How to build a post template to display movie stars using MFB Pro"
          />
        </div>
        <h2>The main features of MFB Pro</h2>
        <p>
          Most of advanced features in the Pro version are for ACF fields. The
          following are the main features in the Pro version:
        </p>
        <h3>Display setting fields</h3>
        <p>
          This feature allows you to display global setting fields (fields are
          registered with{" "}
          <a
            href="https://developer.wordpress.org/reference/hooks/register_setting/"
            target="_blank"
          >
            register_setting
          </a>
          ) similar to custom fields from posts, terms or users. It supports all
          fields whose values can be retrieved by the core API function (
          <a
            href="https://developer.wordpress.org/reference/functions/get_option/"
            target="_blank"
          >
            get_option
          </a>
          ) and are strings or can be converted to strings. It also works with
          ACF option fields.
        </p>
        <VideoGuide name="settingFields" videos={videos} />
        <h3>
          Display ACF Relationship, or Post Object fields as Query Loop blocks
        </h3>
        <p>
          In the free version, query fields can only be rendered as a list of
          post links. In the Pro version, there is a setting called{" "}
          <code>Display as a query loop</code>. By enabling this toggle, the
          field will be rendered as a core query loop block that has all the
          features come with it. You can also add other MFBs inside this nested
          query loop block, and it will display the fields that are related to
          that nested query loop. This feature is especially useful when you
          need to display multiple pieces of information from a related post
          type into the current post type.
        </p>
        <VideoGuide name="queryFields" videos={videos} />
        <h3>
          Display ACF advanced layout fields such as Group, Repeater, and
          Flexible content.
        </h3>
        <p>
          With this feature, MFB turns into a page builder. You won't need to
          use the ACF Block API to register your custom blocks. Simply by
          inserting MFB into the editor and inputting the field name, the MFB
          will become a container block and all sub fields will become sub
          blocks. The new Sub Field Block (SFB) will be included in this Pro
          version. The block structure is determined based on the ACF field
          structure, and you can modify the structure by moving SFBs or adding
          new SFB or adjusting the field paths for each sub-block. You can also
          mix sub-blocks with core blocks or third-party blocks to build complex
          layouts. The Group, Repeater, or Flexible content field can also be
          nested in each other with unlimited nested levels. And similar to the
          core/group block, the <code>group</code> variations of SFB also has
          four different display layouts: group, row, stack, and grid.
        </p>
        <VideoGuide name="repeaterFields" videos={videos} />
        <VideoGuide name="groupFields" videos={videos} />
        <VideoGuide name="flexibleFields" videos={videos} />

        <h3>Display an ACF Image field as a core/image block</h3>
        <p>
          By enabling this feature, the image field will be rendered as a
          core/image block with all the features from the core/image block.
        </p>
        <VideoGuide name="imageFields" videos={videos} />
        <h3>Display an ACF Gallery field</h3>
        <p>
          Display an ACF Gallery field as a gallery that supports lightbox,
          masonry layout, etc.
        </p>
        <VideoGuide name="galleryFields" videos={videos} />
        <h3>Display an ACF Link field as a core/button block</h3>
        <p>
          By enabling this feature, the link field will be rendered as a
          core/button block with all the features from the core/button block.
        </p>
        <VideoGuide name="linkFields" videos={videos} />
        <h3>
          Display an ACF URL field as a button block, an image block or a link
        </h3>
        <p>
          By enabling this feature, the URL field can be rendered as a
          core/button block or a link with custom label, or an image if its
          value is an image URL.
        </p>
        <VideoGuide name="urlFields" videos={videos} />
        <h3>Display an ACF Email/File field as a button block or a link</h3>
        <p>
          In the Pro version, these two field types Email, and File can be
          rendered a core/button block or a link.
        </p>
        <VideoGuide name="emailFileFields" videos={videos} />
        <h3>Display an ACF File field as a video block</h3>
        <p>The ACF File field type can also be displayed as a video block.</p>
        <VideoGuide name="fileVideoFields" videos={videos} />
        <h3>
          Add settings to input custom text values for the ACF True/false field
        </h3>
        <p>
          To display a true/false value, we usually have to use an user-friendly
          text value for it. In the Pro version, there will be settings right in
          the block inspector setting for you to input those texts.
        </p>
        <VideoGuide name="booleanFields" videos={videos} />
        <h3>Display fields from a specific item (post, term, user).</h3>
        <p>
          This feature allows you to display custom fields from any post, term
          or user.
        </p>
        <VideoGuide name="otherItemFields" videos={videos} />
        <VideoGuide name="sampleItemFields" videos={videos} />
        <h3>
          Load field information and display sample content when{" "}
          <code>post_id</code> is not available
        </h3>
        <p>
          When working with MFB in the Site Editor, you may not be able to get
          the <code>post_id</code> and <code>post_type</code> from the context.
          In that case, you can choose a meta type that is not <code>auto</code>{" "}
          and input a sample id for the block. This will allow the block to
          access the field information from the sample id and use all the
          advanced features for the field.
        </p>
        <h2>New block attributes for the MFB Pro</h2>
        <ul>
          <li>
            <code>metaType</code>(string): It can be an empty value or one of
            'post', 'term', 'user' or 'option'. Default is an empty value. If
            the value is empty, the object type of the field will be determined
            by the current context. If the value is 'option', the block will
            display setting fields and the value of <code>fieldType</code>{" "}
            attribute can be one of 'option' or 'acf'.
          </li>
          <li>
            <code>isCustomSource</code>(boolean): If this value is true, then
            the block will display field from an item (post, term, user) that
            has the ID is from the <code>objectId</code> attribute below.
          </li>
          <li>
            <code>objectId</code>(integer): This value is used for two different
            use cases. The first is when we need to display fields from a
            specific item (when the <code>isCustomSource</code> value is true).
            The second is when we need a sample object for the block to query
            sample data in the editor, for examle when we are adding MFBs in the
            Site Editor where we are not able to get the object id. This sample
            data is only for displaying in the editor, the real value on the
            frontend will be determined by the current context.
          </li>
        </ul>
        <h2>The new Sub Field Block (SFB)</h2>
        <p>
          This block will only be available as a descendent block of MFB. It can
          be a container block or simple dynamic block depends on the field type
          of the sub field that is stored in the field path attribute. MFB and
          SFB have similar attributes and block support features. Some different
          between them are follows:
        </p>
        <h3>Block attributes</h3>
        <ul>
          <li>
            <code>fieldPath</code>(array): This is the most important attribute
            of SFB. The block queries its value based on this path. Here is an
            example of its value:{" "}
            <code>
              ['root_field_name', 'sub_group_field', 'sub_field_name']
            </code>
            . If a SFB is nested inside a repeater field, then the root name of
            it (the first value of the array) will be the name of the repeater
            not the real root name from the MFB.
          </li>
          <li>
            SFB does not have following attributes: <code>fieldType</code>,{" "}
            <code>fieldName</code>, <code>metaType</code>,{" "}
            <code>isCustomSource</code>, <code>objectId</code>
          </li>
        </ul>
        <h3>Block support features</h3>
        <ul>
          <li>
            <strong>layout</strong>: You can set a layout for <code>group</code>{" "}
            variations of SFB. There four types of layouts: group, row, stack,
            and grid.
          </li>
        </ul>
        {promoTextAfter && (
          <>
            <hr />
            {promoTextAfter}
          </>
        )}
      </div>
    </Widget>
  );
};

export const ProContent = () => {
  return (
    <Section>
      <WidgetPro />
    </Section>
  );
};
