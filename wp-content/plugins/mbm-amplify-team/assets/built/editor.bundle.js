(function () {
  'use strict';

  function _extends$6() {
    _extends$6 = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends$6.apply(this, arguments);
  }

  const withGuardedPostMeta = (BaseComponent, customPostType) => {
    return function WithGuardedPostMeta(props) {
      const post = wp.data.select('core/editor').getCurrentPost();

      // Only proceed if post is available.
      if (post == null) {
        return null;
      }
      if (post.type !== customPostType) {
        return null;
      }
      const [meta, updateMeta] = wp.coreData.useEntityProp('postType', post.type, 'meta', post.id);

      // console.debug(`[Sidebar ${customPostType}] meta:`, meta)

      return /*#__PURE__*/React.createElement(BaseComponent, _extends$6({
        post: post,
        meta: meta,
        updateMeta: updateMeta
      }, props));
    };
  };

  /**
   * Custom hook to get a site setting value.
   *
   * @param {string} settingKey The key of the site setting to retrieve.
   * @return {any} The value of the site setting.
   */
  const useSiteSetting = settingKey => {
    const [settingValue] = wp.coreData.useEntityProp('root', 'site', settingKey);
    return settingValue;
  };

  const helperTextStyles = {
    color: '#757575'
  };

  function HelperText({
    children
  }) {
    return /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement("p", {
      className: "inspector-text-control-1__help",
      style: helperTextStyles
    }, children));
  }

  function MetaValueTextControl({
    label,
    valueKey,
    meta,
    updateMeta,
    type = 'text'
  }) {
    return /*#__PURE__*/React.createElement(wp.components.TextControl, {
      label: wp.i18n.__(label),
      value: meta[valueKey] || '',
      type: type,
      onChange: value => {
        updateMeta({
          ...meta,
          [valueKey]: value
        });
      }
    });
  }

  function MetaValueToggleControl({
    label,
    valueKey,
    meta,
    updateMeta
  }) {
    return /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: wp.i18n.__(label),
      checked: meta[valueKey] || false,
      onChange: value => {
        updateMeta({
          ...meta,
          [valueKey]: value
        });
      }
    });
  }

  function PostAvailabilityControls({
    meta,
    updateMeta,
    isTypePostAccessAllowed,
    postTypeLabelPlural
  }) {
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('Post Availability'),
      initialOpen: false
    }, isTypePostAccessAllowed ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MetaValueToggleControl, {
      label: "Allow Post Access",
      valueKey: "amplify_post_access_allowed",
      meta: meta,
      updateMeta: updateMeta
    }), /*#__PURE__*/React.createElement(HelperText, null, "Disabling access to this post will prevent it from being rendered as a standalone page.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HelperText, null, "All ", postTypeLabelPlural, " are currently inaccessible as individual posts due to site settings.")));
  }

  const postType$1 = 'mbmamp_team_career';
  const pluginName$1 = `${postType$1.replaceAll('_', '-')}-sidebar`;
  function Sidebar$2({
    meta,
    updateMeta
  }) {
    console.log('[CareerSidebar] meta:', meta);
    const isTypePostAccessAllowed = useSiteSetting('amplify_team_careers_post_access_allowed') === true;
    console.log('[CareerSidebar] isTypePostAccessAllowed:', isTypePostAccessAllowed);
    return /*#__PURE__*/React.createElement(wp.editor.PluginSidebar, {
      name: pluginName$1,
      title: "Amplify \u2014 Team Member",
      icon: "businessperson"
    }, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('Team Member Details'),
      initialOpen: true
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(MetaValueTextControl, {
      label: "Add Job Posting URL",
      valueKey: "mbmamp_team_career_job_link_url",
      meta: meta,
      updateMeta: updateMeta
    })), /*#__PURE__*/React.createElement(HelperText, null, "Include a direct link to the website where guests can find more information about this career opportunity. This link will be automatically added to the Career Button block.")), /*#__PURE__*/React.createElement(PostAvailabilityControls, {
      meta: meta,
      updateMeta: updateMeta,
      isTypePostAccessAllowed: isTypePostAccessAllowed,
      postTypeLabelPlural: "careers"
    }));
  }
  var Sidebar$3 = withGuardedPostMeta(Sidebar$2, postType$1);

  wp.plugins.registerPlugin(pluginName$1, {
    render: Sidebar$3
  });

  const postType = 'mbmamp_team_member';
  const pluginName = `${postType.replaceAll('_', '-')}-sidebar`;
  function Sidebar({
    meta,
    updateMeta
  }) {
    console.log('[TeamMemberSidebar] meta:', meta);
    const isTypePostAccessAllowed = useSiteSetting('amplify_team_team_post_access_allowed') === true;
    console.log('[TeamMemberSidebar] isTypePostAccessAllowed:', isTypePostAccessAllowed);
    return /*#__PURE__*/React.createElement(wp.editor.PluginSidebar, {
      name: pluginName,
      title: "Amplify \u2014 Team Member",
      icon: "groups"
    }, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('General Information'),
      initialOpen: true
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(MetaValueTextControl, {
      label: "Position/Title",
      valueKey: "mbmamp_team_member_position_name",
      meta: meta,
      updateMeta: updateMeta
    })), /*#__PURE__*/React.createElement(HelperText, null, "The title or position of this team member will be displayed in either a template or template part. It will not be used as a sort or filter option.")), /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('Contact Info'),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(MetaValueTextControl, {
      label: "Contact Email",
      valueKey: "mbmamp_team_member_contact_email",
      type: "email",
      meta: meta,
      updateMeta: updateMeta
    })), /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(MetaValueTextControl, {
      label: "Contact Phone",
      valueKey: "mbmamp_team_member_contact_phone",
      type: "tel",
      meta: meta,
      updateMeta: updateMeta
    })), /*#__PURE__*/React.createElement(HelperText, null, "By adding contact information, users will be able to directly message or connect with this team member. If left blank, these fields will not be displayed.")), /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('Social Links'),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(MetaValueTextControl, {
      label: "LinkedIn URL",
      valueKey: "mbmamp_team_member_social_linkedin_url",
      type: "url",
      meta: meta,
      updateMeta: updateMeta
    })), /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(MetaValueTextControl, {
      label: "X (Twitter) URL",
      valueKey: "mbmamp_team_member_social_xtwitter_url",
      type: "url",
      meta: meta,
      updateMeta: updateMeta
    })), /*#__PURE__*/React.createElement(HelperText, null, "By adding social media links, users will be able to connect with this team member. If left blank, these fields will not be displayed.")), /*#__PURE__*/React.createElement(PostAvailabilityControls, {
      meta: meta,
      updateMeta: updateMeta,
      isTypePostAccessAllowed: isTypePostAccessAllowed,
      postTypeLabelPlural: "team members"
    }));
  }
  var Sidebar$1 = withGuardedPostMeta(Sidebar, postType);

  wp.plugins.registerPlugin(pluginName, {
    render: Sidebar$1
  });

  var _path$5;
  function _extends$5() { _extends$5 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

  var SvgIcon$5 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$5({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path$5 || (_path$5 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4 7.715h16c0-.455-.188-.89-.521-1.212A1.81 1.81 0 0 0 18.222 6H5.778c-.471 0-.923.181-1.257.503-.333.321-.52.757-.521 1.212m0 .857v7.714C4 17.231 4.797 18 5.778 18h12.444c.471 0 .923-.181 1.256-.502.334-.322.521-.757.522-1.212V8.572zm1.778 7.427c0-.79.664-1.427 1.48-1.427h3.261c.82 0 1.481.64 1.481 1.427a.28.28 0 0 1-.088.202.3.3 0 0 1-.209.085H6.075a.3.3 0 0 1-.21-.085.28.28 0 0 1-.087-.202m3.11-5.714c.472 0 .924.181 1.257.503.334.321.521.757.521 1.212s-.187.89-.52 1.212a1.8 1.8 0 0 1-1.258.503c-.472 0-.924-.181-1.257-.503A1.68 1.68 0 0 1 7.11 12c0-.455.187-.89.52-1.212a1.8 1.8 0 0 1 1.258-.503m4.89.43c0-.237.2-.43.444-.43h3.556a.45.45 0 0 1 .292.138.42.42 0 0 1 0 .582.45.45 0 0 1-.292.138h-3.556a.46.46 0 0 1-.313-.126.42.42 0 0 1-.131-.302m0 1.714c0-.236.2-.429.444-.429h3.556a.45.45 0 0 1 .292.137.42.42 0 0 1 0 .583.45.45 0 0 1-.292.137h-3.556a.46.46 0 0 1-.313-.126.42.42 0 0 1-.131-.302m0 1.714c0-.236.2-.428.444-.428h3.556c.244 0 .444.192.444.428s-.2.429-.444.429h-3.556a.45.45 0 0 1-.314-.127.42.42 0 0 1-.13-.302"
    })));
  };

  const BUTTON_BLOCK$2 = 'core/button';
  const VARIATION_NAME$5 = 'amplify-team/career-job-posting-button';
  const attributes$1 = {
    amplifyVariation: VARIATION_NAME$5,
    text: 'Job Posting',
    linkTarget: '_blank',
    metadata: {
      bindings: {
        url: {
          source: "core/post-meta",
          args: {
            key: "mbmamp_team_career_job_link_url"
          }
        }
      }
    }
  };
  wp.blocks.registerBlockVariation(BUTTON_BLOCK$2, {
    name: VARIATION_NAME$5,
    title: 'Career Job Posting Button',
    category: 'mbm-amplify-team',
    icon: SvgIcon$5,
    attributes: attributes$1,
    isActive: ['amplifyVariation']
  });
  wp.hooks.addFilter('blocks.registerBlockType', `${BUTTON_BLOCK$2}/${VARIATION_NAME$5}`, (settings, name) => {
    if (name !== BUTTON_BLOCK$2) {
      return settings;
    }
    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        amplifyVariation: {
          type: 'string',
          default: null
        }
      }
    };
  });

  var _path$4, _path2;
  function _extends$4() { _extends$4 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

  var SvgIcon$4 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$4({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path$4 || (_path$4 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4.667 7.715c.37 0 .666.286.666.642v6c0 .31.063.617.186.903s.303.546.53.765.497.392.793.51c.297.119.615.18.936.18h8.889c.37 0 .666.286.666.643a.65.65 0 0 1-.666.642h-8.89a3.85 3.85 0 0 1-2.67-1.068A3.58 3.58 0 0 1 4 14.358V8.357c0-.357.297-.642.667-.642"
    })), _path2 || (_path2 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M7 7.286h13c0-.341-.153-.668-.424-.909A1.54 1.54 0 0 0 18.556 6H8.444c-.383 0-.75.136-1.021.377A1.22 1.22 0 0 0 7 7.286m0 .643v5.786C7 14.424 7.648 15 8.445 15h10.11c.383 0 .75-.136 1.021-.377.27-.24.423-.567.424-.908V7.929zm1.445 5.57c0-.593.54-1.07 1.202-1.07h2.65c.666 0 1.203.48 1.203 1.07a.2.2 0 0 1-.071.152.26.26 0 0 1-.17.064H8.686a.26.26 0 0 1-.17-.064.2.2 0 0 1-.071-.152m2.527-4.285c.383 0 .75.136 1.021.377.27.24.423.568.423.909s-.152.668-.423.91a1.54 1.54 0 0 1-1.021.376 1.54 1.54 0 0 1-1.022-.377 1.22 1.22 0 0 1-.423-.909c0-.341.152-.668.423-.91a1.54 1.54 0 0 1 1.022-.376m3.973.322c0-.177.162-.322.36-.322h2.89c.09.007.175.043.236.103.062.06.096.138.096.219a.3.3 0 0 1-.096.218.38.38 0 0 1-.236.103h-2.89a.4.4 0 0 1-.254-.094.3.3 0 0 1-.106-.227m0 1.286c0-.177.162-.322.36-.322h2.89c.09.007.175.043.236.103.062.06.096.138.096.219a.3.3 0 0 1-.096.218.38.38 0 0 1-.236.103h-2.89a.4.4 0 0 1-.254-.095.3.3 0 0 1-.106-.226m0 1.285c0-.176.162-.321.36-.321h2.89c.198 0 .36.145.36.321s-.162.322-.36.322h-2.89a.4.4 0 0 1-.255-.095.3.3 0 0 1-.105-.227"
    })));
  };

  const ROOT_BLOCK$2 = 'core/buttons';
  const VARIATION_NAME$4 = 'amplify-team/career-job-posting-buttons';
  wp.blocks.registerBlockVariation(ROOT_BLOCK$2, {
    name: VARIATION_NAME$4,
    title: 'Career Job Posting Buttons',
    category: 'mbm-amplify-team',
    icon: SvgIcon$4,
    attributes: {
      amplifyVariation: VARIATION_NAME$4
    },
    isActive: ['amplifyVariation'],
    innerBlocks: [['core/button', attributes$1]]
  });
  wp.hooks.addFilter('blocks.registerBlockType', `${ROOT_BLOCK$2}/${VARIATION_NAME$4}`, (settings, name) => {
    if (name !== ROOT_BLOCK$2) {
      return settings;
    }
    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        amplifyVariation: {
          type: 'string',
          default: null
        }
      }
    };
  });

  var _path$3;
  function _extends$3() { _extends$3 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

  var SvgIcon$3 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$3({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path$3 || (_path$3 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M6 6.5c-.275 0-.5.225-.5.5v10c0 .275.225.5.5.5h12c.275 0 .5-.225.5-.5V7c0-.275-.225-.5-.5-.5zM4 7c0-1.103.897-2 2-2h12c1.103 0 2 .897 2 2v10c0 1.103-.897 2-2 2H6c-1.103 0-2-.897-2-2zm6 3a2 2 0 1 1 4 0 2 2 0 0 1-4 0m-1.5 5.144c0-1.185.96-2.144 2.144-2.144h2.715c1.185 0 2.144.96 2.144 2.144a.86.86 0 0 1-.856.856h-5.29a.86.86 0 0 1-.857-.856"
    })));
  };

  const BUTTON_BLOCK$1 = 'core/button';
  const VARIATION_NAME$3 = 'amplify-team/team-member-contact-button';
  const KEY_EMAIL = 'mbmamp_team_member_contact_email';
  const KEY_PHONE = 'mbmamp_team_member_contact_phone';
  const prefixes = {
    [KEY_EMAIL]: 'mailto',
    [KEY_PHONE]: 'tel'
  };
  function buildMetadata(metaKey) {
    return {
      bindings: {
        url: {
          source: "amplify-team/team-member-contact-button-url",
          args: {
            key: metaKey,
            prefix: prefixes[metaKey]
          }
        },
        text: {
          source: "core/post-meta",
          args: {
            key: metaKey
          }
        }
      }
    };
  }
  function buildVariation(metaKey) {
    return {
      amplifyVariation: VARIATION_NAME$3,
      metadata: buildMetadata(metaKey),
      contactMetaKey: metaKey
    };
  }
  const emailVarAttributes = buildVariation(KEY_EMAIL);
  const phoneVarAttributes = buildVariation(KEY_PHONE);
  wp.blocks.registerBlockVariation(BUTTON_BLOCK$1, {
    name: VARIATION_NAME$3,
    title: 'Team Member Contact Button',
    category: 'mbm-amplify-team',
    icon: SvgIcon$3,
    attributes: emailVarAttributes,
    isActive: ['amplifyVariation']
  });
  wp.hooks.addFilter('editor.BlockEdit', BUTTON_BLOCK$1, BlockEdit => props => {
    // Skip adding controls if this isn't a Contact Button variation.
    if (props?.name !== BUTTON_BLOCK$1 || props?.attributes?.amplifyVariation !== VARIATION_NAME$3) {
      return /*#__PURE__*/React.createElement(BlockEdit, props);
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Team Member Contact"
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: wp.i18n.__('Contact Field'),
      options: [{
        label: 'Email',
        value: KEY_EMAIL
      }, {
        label: 'Phone',
        value: KEY_PHONE
      }],
      value: props?.attributes?.contactMetaKey,
      onChange: contactMetaKey => {
        props.setAttributes({
          contactMetaKey,
          metadata: buildMetadata(contactMetaKey)
        });
      },
      help: `Select which contact field to reference.`
    })))));
  });
  wp.hooks.addFilter('blocks.registerBlockType', `${BUTTON_BLOCK$1}/${VARIATION_NAME$3}`, (settings, name) => {
    if (name !== BUTTON_BLOCK$1) {
      return settings;
    }
    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        amplifyVariation: {
          type: 'string',
          default: null
        },
        contactMetaKey: {
          type: 'string',
          default: KEY_EMAIL
        }
      }
    };
  });

  var _path$2;
  function _extends$2() { _extends$2 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

  var SvgIcon$2 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$2({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path$2 || (_path$2 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M18.222 7.285H8.444a.44.44 0 0 0-.444.43v6c0 .235.2.428.444.428h1.778c0-.945.797-1.714 1.778-1.714h2.667c.98 0 1.777.769 1.777 1.714h1.778a.44.44 0 0 0 .445-.428v-6c0-.237-.2-.43-.445-.43M8.444 6.001h9.778c.98 0 1.778.769 1.778 1.715v6c0 .454-.188.89-.521 1.211a1.81 1.81 0 0 1-1.257.503H8.444c-.471 0-.923-.182-1.256-.503a1.69 1.69 0 0 1-.521-1.211V7.715C6.667 6.77 7.464 6 8.444 6M4.667 7.715c.37 0 .666.286.666.642v6c0 .31.063.617.186.903s.303.546.53.765.497.392.793.51c.297.119.615.18.936.18h8.889c.37 0 .666.286.666.643a.65.65 0 0 1-.666.642h-8.89a3.85 3.85 0 0 1-2.67-1.068A3.58 3.58 0 0 1 4 14.358V8.357c0-.357.297-.642.667-.642m6.889 2.142a1.7 1.7 0 0 1 .123-.668 1.7 1.7 0 0 1 .382-.57c.166-.164.364-.294.582-.383a1.84 1.84 0 0 1 1.963.383c.165.163.295.357.382.57s.129.44.123.668a1.69 1.69 0 0 1-.535 1.186 1.8 1.8 0 0 1-1.242.488c-.465 0-.91-.175-1.243-.488a1.69 1.69 0 0 1-.535-1.186"
    })));
  };

  const ROOT_BLOCK$1 = 'core/buttons';
  const VARIATION_NAME$2 = 'amplify-team/team-member-contact-buttons';
  wp.blocks.registerBlockVariation(ROOT_BLOCK$1, {
    name: VARIATION_NAME$2,
    title: 'Team Member Contact Buttons',
    category: 'mbm-amplify-team',
    icon: SvgIcon$2,
    attributes: {
      amplifyVariation: VARIATION_NAME$2
    },
    isActive: ['amplifyVariation'],
    innerBlocks: [['core/button', emailVarAttributes], ['core/button', phoneVarAttributes]]
  });
  wp.hooks.addFilter('blocks.registerBlockType', `${ROOT_BLOCK$1}/${VARIATION_NAME$2}`, (settings, name) => {
    if (name !== ROOT_BLOCK$1) {
      return settings;
    }
    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        amplifyVariation: {
          type: 'string',
          default: null
        }
      }
    };
  });

  var _path$1;
  function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

  var SvgIcon$1 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$1({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path$1 || (_path$1 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M11.111 5a.9.9 0 0 0-.628.257.87.87 0 0 0-.261.618v1.75c0 .484.397.875.89.875h1.777a.9.9 0 0 0 .629-.256.87.87 0 0 0 .26-.62V5.876a.87.87 0 0 0-.261-.619.9.9 0 0 0-.629-.256zM9.333 6.75H5.778c-.471 0-.923.185-1.257.513-.333.329-.52.773-.521 1.237v8.75c0 .464.188.909.521 1.237.334.328.786.513 1.257.513h12.444c.471 0 .923-.185 1.257-.513s.52-.773.521-1.237V8.5c0-.464-.188-.908-.521-1.237a1.8 1.8 0 0 0-1.257-.513h-3.555v1.311h3.555c.245 0 .445.197.445.439v8.749c0 .24-.2.438-.445.438H5.778a.45.45 0 0 1-.314-.129.44.44 0 0 1-.131-.31V8.5c0-.24.2-.438.445-.438h3.555zM12 13.312a1.8 1.8 0 0 0 1.284-.497 1.75 1.75 0 0 0 .536-1.253 1.73 1.73 0 0 0-.536-1.252A1.78 1.78 0 0 0 12 9.813c-.464.01-.905.2-1.23.527a1.74 1.74 0 0 0-.506 1.222c0 .457.182.896.506 1.223.325.327.766.516 1.23.527m-.889.876a2.25 2.25 0 0 0-1.572.64 2.18 2.18 0 0 0-.65 1.548c0 .24.2.437.444.437h5.334a.44.44 0 0 0 .444-.437 2.16 2.16 0 0 0-.65-1.548 2.22 2.22 0 0 0-1.572-.64H11.11z"
    })));
  };

  const BUTTON_BLOCK = 'core/paragraph';
  const VARIATION_NAME$1 = 'amplify-team/team-member-position-name';
  const attributes = {
    amplifyVariation: VARIATION_NAME$1,
    metadata: {
      bindings: {
        content: {
          source: "core/post-meta",
          args: {
            key: "mbmamp_team_member_position_name"
          }
        }
      }
    }
  };
  wp.blocks.registerBlockVariation(BUTTON_BLOCK, {
    name: VARIATION_NAME$1,
    title: 'Team Member Position',
    category: 'mbm-amplify-team',
    description: 'Team Member position or title.',
    icon: SvgIcon$1,
    attributes,
    isActive: ['amplifyVariation']
  });
  wp.hooks.addFilter('blocks.registerBlockType', `${BUTTON_BLOCK}/${VARIATION_NAME$1}`, (settings, name) => {
    if (name !== BUTTON_BLOCK) {
      return settings;
    }
    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        amplifyVariation: {
          type: 'string',
          default: null
        }
      }
    };
  });

  var _path;
  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  var SvgIcon = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path || (_path = /*#__PURE__*/wp.element.createElement("path", {
      d: "M6.4 8.75c0-.862.337-1.689.937-2.298.6-.61 1.414-.952 2.263-.952s1.663.342 2.263.952.937 1.436.937 2.298-.337 1.689-.937 2.298c-.6.61-1.414.952-2.263.952a3.18 3.18 0 0 1-2.263-.952A3.28 3.28 0 0 1 6.4 8.75M4 17.746c0-.594.115-1.183.339-1.732.224-.55.552-1.049.966-1.47.414-.42.905-.753 1.446-.98a4.4 4.4 0 0 1 1.706-.345h2.285c.585 0 1.165.117 1.706.344.541.228 1.033.561 1.447.982s.742.92.966 1.469.34 1.138.339 1.732a.75.75 0 0 1-.742.754H4.742a.74.74 0 0 1-.524-.221.76.76 0 0 1-.218-.533m14.821-6.958c.24 0 .473-.074.67-.212s.348-.334.433-.562a1.215 1.215 0 0 0-.323-1.321 1.17 1.17 0 0 0-1.331-.16c-.212.113-.385.29-.495.505s-.154.46-.124.702l-1.155.586a1.17 1.17 0 0 0-1.28-.24 1.2 1.2 0 0 0-.522.441 1.21 1.21 0 0 0 0 1.322c.128.196.31.35.522.441a1.16 1.16 0 0 0 1.28-.24l1.155.585c-.035.28.03.564.18.8.152.238.38.413.647.495.266.082.552.066.808-.045.255-.112.464-.311.589-.564a1.215 1.215 0 0 0-.355-1.501 1.17 1.17 0 0 0-1.517.102l-1.154-.586a1.1 1.1 0 0 0 0-.297l1.155-.586c.211.208.5.335.817.335"
    })));
  };

  const ROOT_BLOCK = 'core/social-links';
  const VARIATION_NAME = 'amplify-team/team-member-social-links';
  wp.blocks.registerBlockVariation(ROOT_BLOCK, {
    name: VARIATION_NAME,
    title: 'Team Member Social Links',
    category: 'mbm-amplify-team',
    icon: SvgIcon,
    attributes: {
      amplifyVariation: VARIATION_NAME
    },
    isActive: ['amplifyVariation'],
    innerBlocks: [['core/social-link', {
      service: 'x',
      url: 'https://placeholder.com/'
    }], ['core/social-link', {
      service: 'linkedin',
      url: 'https://placeholder.com/'
    }]]
  });
  wp.hooks.addFilter('blocks.registerBlockType', `${ROOT_BLOCK}/${VARIATION_NAME}`, (settings, name) => {
    if (name !== ROOT_BLOCK) {
      return settings;
    }
    return {
      ...settings,
      attributes: {
        ...settings.attributes,
        amplifyVariation: {
          type: 'string',
          default: null
        }
      }
    };
  });

  console.log(`[mbm-amp-team] Editor script loaded`);

})();
//# sourceMappingURL=editor.bundle.js.map
