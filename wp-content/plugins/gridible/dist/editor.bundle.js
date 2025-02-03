(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _extends$3() {
    return _extends$3 = Object.assign ? Object.assign.bind() : function (n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends$3.apply(null, arguments);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o,
      r,
      i = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (e.includes(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var classnames$1 = {exports: {}};

  /*!
  	Copyright (c) 2018 Jed Watson.
  	Licensed under the MIT License (MIT), see
  	http://jedwatson.github.io/classnames
  */

  (function (module) {
  	/* global define */

  	(function () {

  	  var hasOwn = {}.hasOwnProperty;
  	  function classNames() {
  	    var classes = '';
  	    for (var i = 0; i < arguments.length; i++) {
  	      var arg = arguments[i];
  	      if (arg) {
  	        classes = appendClass(classes, parseValue(arg));
  	      }
  	    }
  	    return classes;
  	  }
  	  function parseValue(arg) {
  	    if (typeof arg === 'string' || typeof arg === 'number') {
  	      return arg;
  	    }
  	    if (typeof arg !== 'object') {
  	      return '';
  	    }
  	    if (Array.isArray(arg)) {
  	      return classNames.apply(null, arg);
  	    }
  	    if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
  	      return arg.toString();
  	    }
  	    var classes = '';
  	    for (var key in arg) {
  	      if (hasOwn.call(arg, key) && arg[key]) {
  	        classes = appendClass(classes, key);
  	      }
  	    }
  	    return classes;
  	  }
  	  function appendClass(value, newClass) {
  	    if (!newClass) {
  	      return value;
  	    }
  	    if (value) {
  	      return value + ' ' + newClass;
  	    }
  	    return value + newClass;
  	  }
  	  if (module.exports) {
  	    classNames.default = classNames;
  	    module.exports = classNames;
  	  } else {
  	    window.classNames = classNames;
  	  }
  	})(); 
  } (classnames$1));

  var classnamesExports = classnames$1.exports;
  var classnames = /*@__PURE__*/getDefaultExportFromCjs(classnamesExports);

  var ariaLabelParser = function ariaLabelParser(props) {
    if (props.attributes && props.attributes.ariaLabel) {
      return {
        'aria-label': props.attributes.ariaLabel
      };
    }
    return {};
  };
  var AriaLabelPanel = function AriaLabelPanel(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    return /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.TextControl, {
      label: wp.i18n.__('ARIA Label'),
      value: attributes.ariaLabel,
      onChange: function onChange(value) {
        return setAttributes({
          ariaLabel: value
        });
      }
    }));
  };

  /**
   * Based on the edit control functionality in the Gutenberg Group block:
   * packages/block-library/src/group/edit.js
   *
   * This implementation has been altered to change the default tag
   * (section -> div), with slightly modified helper text.
   */





  /**
   * Render inspector controls for the Group block.
   *
   * @param {Object}   props                 Component props.
   * @param {string}   props.tagName         The HTML tag name.
   * @param {Function} props.onSelectTagName onChange function for the SelectControl.
   *
   * @return {JSX.Element}                The control group.
   */
  function TagSelectionControls(_ref) {
    var tagName = _ref.tagName,
      onSelectTagName = _ref.onSelectTagName;
    var htmlElementMessages = {
      section: wp.i18n.__("The <section> element should represent a standalone portion of the document that can't be better represented by another element."),
      header: wp.i18n.__('The <header> element should represent introductory content, typically a group of introductory or navigational aids.'),
      main: wp.i18n.__('The <main> element should be used for the primary content of your document only. '),
      article: wp.i18n.__('The <article> element should represent a self-contained, syndicatable portion of the document.'),
      aside: wp.i18n.__("The <aside> element should represent a portion of a document whose content is only indirectly related to the document's main content."),
      footer: wp.i18n.__('The <footer> element should represent a footer for its nearest sectioning element (e.g.: <section>, <article>, <main> etc.).'),
      div: wp.i18n.__('The <div> element has no semantic meaning, and is useful for organizing content with altering the page semantics.')
    };
    return /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      __nextHasNoMarginBottom: true,
      label: wp.i18n.__('HTML element'),
      options: [{
        label: wp.i18n.__('Default (<section>)'),
        value: 'section'
      }, {
        label: '<header>',
        value: 'header'
      }, {
        label: '<main>',
        value: 'main'
      }, {
        label: '<article>',
        value: 'article'
      }, {
        label: '<aside>',
        value: 'aside'
      }, {
        label: '<footer>',
        value: 'footer'
      }, {
        label: '<div>',
        value: 'div'
      }],
      value: tagName,
      onChange: onSelectTagName,
      help: htmlElementMessages[tagName]
    });
  }

  function usePreviewDevice() {
    var previewDevice = wp.data.useSelect(function (select) {
      return select('core/editor').getDeviceType();
    }, []);
    var _useDispatch = wp.data.useDispatch('core/editor'),
      setPreviewDevice = _useDispatch.setDeviceType;
    return [previewDevice, setPreviewDevice];
  }

  /**
   * WordPress dependencies
   */

  var DesktopIcon = function DesktopIcon() {
    return /*#__PURE__*/React.createElement(wp.components.SVG, {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      "aria-hidden": "true",
      focusable: "false"
    }, /*#__PURE__*/React.createElement(wp.components.Path, {
      d: "M20.5 16h-.7V8c0-1.1-.9-2-2-2H6.2c-1.1 0-2 .9-2 2v8h-.7c-.8 0-1.5.7-1.5 1.5h20c0-.8-.7-1.5-1.5-1.5zM5.7 8c0-.3.2-.5.5-.5h11.6c.3 0 .5.2.5.5v7.6H5.7V8z"
    }));
  };
  var TabletIcon = function TabletIcon() {
    return /*#__PURE__*/React.createElement(wp.components.SVG, {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      "aria-hidden": "true",
      focusable: "false"
    }, /*#__PURE__*/React.createElement(wp.components.Path, {
      d: "M17 4H7c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v12zm-7.5-.5h4V16h-4v1.5z"
    }));
  };
  var MobileIcon = function MobileIcon() {
    return /*#__PURE__*/React.createElement(wp.components.SVG, {
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      "aria-hidden": "true",
      focusable: "false"
    }, /*#__PURE__*/React.createElement(wp.components.Path, {
      d: "M15 4H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H9c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5v12zm-4.5-.5h2V16h-2v1.5z"
    }));
  };

  /**
   * WordPress dependencies
   */

  [0, 1, 2, 4, 8, 12, 16, 24, 32, 48, 64, 128].map(function (intValue) {
    var valueStr = intValue.toString();
    return {
      value: valueStr,
      label: valueStr
    };
  });
  var BREAKPOINT_DESKTOP = 'Desktop';
  var BREAKPOINT_TABLET = 'Tablet';
  var BREAKPOINT_MOBILE = 'Mobile';
  var getLayouts = function getLayouts() {
    return [{
      value: BREAKPOINT_DESKTOP,
      label: wp.i18n.__('Desktop', 'layout-grid'),
      icon: DesktopIcon,
      viewportDesc: 'Desktop',
      slug: 'large',
      cssModifier: 'lg'
    }, {
      value: BREAKPOINT_TABLET,
      label: wp.i18n.__('Tablet', 'layout-grid'),
      icon: TabletIcon,
      viewportDesc: 'Tablet',
      slug: 'medium',
      cssModifier: 'md'
    }, {
      value: BREAKPOINT_MOBILE,
      label: wp.i18n.__('Mobile', 'layout-grid'),
      icon: MobileIcon,
      viewportDesc: 'Mobile',
      slug: 'small',
      cssModifier: 'sm'
    }];
  };
  var VISIBILITY_OPTIONS = [{
    viewportDesc: 'Mobile',
    slug: 'small',
    cssModifier: 'sm'
  }, {
    viewportDesc: 'Tablet',
    slug: 'medium',
    cssModifier: 'md'
  }, {
    viewportDesc: 'Desktop',
    slug: 'large',
    cssModifier: 'lg'
  }];

  var VISIBILITY_ATTRIBUTE = VISIBILITY_OPTIONS.reduce(function (bundle, currentOption) {
    // Default to true visibility.
    bundle[currentOption.slug] = true;
    return bundle;
  }, {});
  function vizOptionSlugToCssClass(vizOptionSlug) {
    var matchingOption = VISIBILITY_OPTIONS.find(function (option) {
      return option.slug === vizOptionSlug;
    });
    if (!matchingOption) {
      return null;
    }
    return "gridible-hidden--".concat(matchingOption.cssModifier);
  }
  function vizOptionBreakpoint(vizOptionDevice) {
    var matchingOption = VISIBILITY_OPTIONS.find(function (option) {
      return option.viewportDesc === vizOptionDevice;
    });
    if (!matchingOption) {
      return null;
    }
    return matchingOption.viewportDesc;
  }
  function vizOptionsToCssClasses() {
    var vizOptionsBundle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return VISIBILITY_OPTIONS.map(function (vizOption) {
      var slug = vizOption.slug;
      if (vizOptionsBundle[slug] === false) {
        return vizOptionSlugToCssClass(slug);
      }
      return null;
    }).filter(function (cssClass) {
      return typeof cssClass === 'string';
    });
  }
  var VisibilityWarning = function VisibilityWarning() {
    return /*#__PURE__*/React.createElement("p", {
      className: "block-editor-hooks__layout-controls-helptext"
    }, "Determine when this block should be shown, based on the viewport size.");
  };
  function VisibilityPanel(_ref) {
    var _ref$visibilityBundle = _ref.visibilityBundle,
      visibilityBundle = _ref$visibilityBundle === void 0 ? {} : _ref$visibilityBundle,
      setAttributes = _ref.setAttributes,
      _ref$visibiltyAttribu = _ref.visibiltyAttributeKey,
      visibiltyAttributeKey = _ref$visibiltyAttribu === void 0 ? 'visibility' : _ref$visibiltyAttribu;
    var _usePreviewDevice = usePreviewDevice(),
      _usePreviewDevice2 = _slicedToArray(_usePreviewDevice, 1),
      activeBreakpoint = _usePreviewDevice2[0];
    var vizValues = getLayouts().map(function (vizOption) {
      var vizValue = typeof visibilityBundle[vizOption.slug] === 'boolean'
      // Use the value if it's defined
      ? visibilityBundle[vizOption.slug]
      // Otherwise, default to true (visible)
      : true;
      return _objectSpread2(_objectSpread2({}, vizOption), {}, {
        value: vizValue
      });
    });
    var isActiveBreakpoint = vizOptionBreakpoint(activeBreakpoint);
    var vizControl = vizValues.filter(function (vizValue) {
      return vizValue.viewportDesc == isActiveBreakpoint;
    });

    // console.log(`visibilityBundle:`, visibilityBundle)

    var activeControl = vizControl.map(function (vizOption) {
      return /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
        key: vizOption.slug,
        label: vizOption.value ? "Block is: Visible at breakpoint." : "Block is: Hidden at breakpoint.",
        checked: vizOption.value,
        onChange: function onChange(newValue) {
          var newVizValues = _objectSpread2(_objectSpread2({}, visibilityBundle), {}, _defineProperty({}, vizOption.slug, newValue));
          // console.log(`Setting attribute '${visibiltyAttributeKey}' to:`, newVizValues)
          setAttributes(_defineProperty({}, visibiltyAttributeKey, newVizValues));
        },
        className: "gridible-toggle--full-width"
      });
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.components.BaseControl, {
      label: "Visibility"
    }, activeControl, /*#__PURE__*/React.createElement(VisibilityWarning, null)));
  }

  function ResponsiveControlsPanel(_ref) {
    var title = _ref.title,
      children = _ref.children;
    var _usePreviewDevice = usePreviewDevice(),
      _usePreviewDevice2 = _slicedToArray(_usePreviewDevice, 2),
      previewDevice = _usePreviewDevice2[0],
      setPreviewDevice = _usePreviewDevice2[1];
    var isMobile = wp.compose.useViewportMatch('small', '<');
    if (isMobile) {
      return null;
    }
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__(title),
      initialOpen: true
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.MenuGroup, {
      className: "components-button-group"
    }, /*#__PURE__*/React.createElement(wp.components.MenuItemsChoice, {
      value: previewDevice,
      onSelect: function onSelect(mode) {
        setPreviewDevice(mode);
      },
      choices: getLayouts(),
      icon: true
    }))), children);
  }

  var $schema$6 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$6 = 3;
  var name$6 = "gridible/container";
  var version = "1.2.0";
  var title$6 = "Gridible Container";
  var category$6 = "design";
  var description$6 = "Restrict the max width of all child blocks to create beautiful responsive designs.";
  var keywords$3 = [
  	"container",
  	"wrapper",
  	"grid"
  ];
  var supports$5 = {
  	__experimentalOnEnter: true,
  	__experimentalOnMerge: true,
  	__experimentalSettings: true,
  	align: [
  		"wide",
  		"full"
  	],
  	anchor: true,
  	ariaLabel: true,
  	html: false,
  	background: {
  		backgroundImage: true,
  		backgroundSize: true,
  		__experimentalDefaultControls: {
  			backgroundImage: true
  		}
  	},
  	color: {
  		gradients: true,
  		__experimentalDefaultControls: {
  			background: true
  		}
  	},
  	dimensions: {
  		minHeight: true
  	},
  	__experimentalBorder: {
  		color: true,
  		radius: true,
  		style: true,
  		width: true,
  		__experimentalDefaultControls: {
  			color: true,
  			radius: true,
  			style: true,
  			width: true
  		}
  	},
  	spacing: {
  		margin: false,
  		padding: [
  			"top",
  			"bottom"
  		],
  		blockGap: false,
  		__experimentalDefaultControls: {
  			padding: true,
  			blockGap: true
  		}
  	},
  	layout: {
  		allowSizingOnChildren: true
  	}
  };
  var editorScript$6 = "gridible-blocks/editor/script";
  var editorStyle$6 = "gridible-blocks/editor/style";
  var style$6 = "gridible-blocks/front/style";
  var blockDef$5 = {
  	$schema: $schema$6,
  	apiVersion: apiVersion$6,
  	name: name$6,
  	version: version,
  	title: title$6,
  	category: category$6,
  	description: description$6,
  	keywords: keywords$3,
  	supports: supports$5,
  	editorScript: editorScript$6,
  	editorStyle: editorStyle$6,
  	style: style$6
  };

  var icon$1 = function icon() {
    return /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17 5C18.0938 5 19 5.90625 19 7V17C19 18.125 18.0938 19 17 19H7C5.875 19 5 18.125 5 17V7C5 5.90625 5.875 5 7 5H17ZM17 6.5H7C6.71875 6.5 6.5 6.75 6.5 7V17C6.5 17.2813 6.71875 17.5 7 17.5H17C17.25 17.5 17.5 17.2813 17.5 17V7C17.5 6.75 17.25 6.5 17 6.5Z"
    }));
  };
  var Container = function Container(props) {
    var _props$attributes = props.attributes,
      visibility = _props$attributes.visibility,
      TagName = _props$attributes.tagName;
    var _props$isEdit = props.isEdit,
      isEdit = _props$isEdit === void 0 ? false : _props$isEdit;
    var vizClasses = vizOptionsToCssClasses(visibility);
    var classes = classnames(props.className,
    // Allow this to be set conditionally via block supports.
    // 'has-global-padding',
    vizClasses);
    var blockProps = {
      className: classes
    };
    if (isEdit === true) {
      blockProps = wp.blockEditor.useBlockProps(blockProps);
    } else {
      blockProps = wp.blockEditor.useBlockProps.save(blockProps);
    }
    return /*#__PURE__*/React.createElement(TagName, _extends$3({}, ariaLabelParser(props), blockProps), props.children);
  };
  var edit$2 = function edit(props) {
    var _props$attributes2 = props.attributes;
      _props$attributes2.visibility;
      var tagName = _props$attributes2.tagName;
    var setAttributes = props.setAttributes;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(ResponsiveControlsPanel, {
      title: wp.i18n.__('Visibility')
    }, /*#__PURE__*/React.createElement(VisibilityPanel, {
      visibilityBundle: props.attributes.visibility,
      setAttributes: props.setAttributes
    }))), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, {
      group: "advanced"
    }, /*#__PURE__*/React.createElement(TagSelectionControls, {
      tagName: tagName,
      onSelectTagName: function onSelectTagName(tagName) {
        return setAttributes({
          tagName: tagName
        });
      }
    }), /*#__PURE__*/React.createElement(AriaLabelPanel, props)), /*#__PURE__*/React.createElement(Container, _extends$3({}, props, {
      isEdit: true
    }), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, null)));
  };
  var save$2 = function save(props) {
    return /*#__PURE__*/React.createElement(Container, _extends$3({}, props, {
      isEdit: false
    }), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks.Content, null));
  };
  wp.blocks.registerBlockType(blockDef$5, {
    icon: icon$1,
    edit: edit$2,
    save: save$2,
    attributes: {
      align: {
        type: 'string',
        "default": 'full'
      },
      style: {
        type: 'object',
        "default": {
          spacing: {
            padding: {
              top: 'var:preset|spacing|30',
              bottom: 'var:preset|spacing|30'
            }
          }
        }
      },
      tagName: {
        type: 'string',
        "default": 'section'
      },
      visibility: {
        type: 'object',
        "default": VISIBILITY_ATTRIBUTE
      }
    }
  });

  var slugs = {
    container: 'gridible/grid-container',
    column: 'gridible/grid-column'
  };

  var alignmentOptions = [{
    label: 'Default',
    value: 'normal'
  }, {
    label: 'Top',
    value: 'start'
  }, {
    label: 'Center',
    value: 'center'
  }, {
    label: 'Bottom',
    value: 'end'
  }];
  var flowOptions = [{
    label: 'Standard',
    value: 'standard'
  }, {
    label: 'Column',
    value: 'column'
  }, {
    label: 'Reverse Column',
    value: 'reverse-column'
  }, {
    label: 'Reverse Row',
    value: 'reverse-row'
  }];
  var FlowAlignmentPanel = function FlowAlignmentPanel(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var alignAll = attributes.alignAll,
      alignMd = attributes.alignMd,
      alignLg = attributes.alignLg,
      flowAll = attributes.flowAll,
      flowMd = attributes.flowMd,
      flowLg = attributes.flowLg;
    var _usePreviewDevice = usePreviewDevice(),
      _usePreviewDevice2 = _slicedToArray(_usePreviewDevice, 1),
      activeBreakpoint = _usePreviewDevice2[0];
    var breakpointMobile = activeBreakpoint == BREAKPOINT_MOBILE;
    var breakpointTablet = activeBreakpoint == BREAKPOINT_TABLET;
    var breakpointDesktop = activeBreakpoint == BREAKPOINT_DESKTOP;
    return /*#__PURE__*/React.createElement(React.Fragment, null, breakpointMobile && /*#__PURE__*/React.createElement("div", {
      className: "gridible-fieldset__group"
    }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Alignment",
      value: alignAll,
      options: alignmentOptions,
      onChange: function onChange(value) {
        return setAttributes({
          alignAll: value
        });
      }
    }), /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Flow Direction",
      value: flowAll,
      options: flowOptions,
      onChange: function onChange(value) {
        return setAttributes({
          flowAll: value
        });
      }
    })), breakpointTablet && /*#__PURE__*/React.createElement("div", {
      className: "gridible-fieldset__group"
    }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Alignment",
      value: alignMd,
      options: alignmentOptions,
      onChange: function onChange(value) {
        return setAttributes({
          alignMd: value
        });
      }
    }), /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Flow Direction",
      value: flowMd,
      options: flowOptions,
      onChange: function onChange(value) {
        return setAttributes({
          flowMd: value
        });
      }
    })), breakpointDesktop && /*#__PURE__*/React.createElement("div", {
      className: "gridible-fieldset__group"
    }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Alignment",
      value: alignLg,
      options: alignmentOptions,
      onChange: function onChange(value) {
        return setAttributes({
          alignLg: value
        });
      }
    }), /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Flow Direction",
      value: flowLg,
      options: flowOptions,
      onChange: function onChange(value) {
        return setAttributes({
          flowLg: value
        });
      }
    })));
  };

  var classPrefix = "gridible-";

  function prefixClassName(className) {
    var prefix = classPrefix;
    return prefix + className;
  }

  var $schema$5 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$5 = 3;
  var title$5 = "Gridible Layout";
  var name$5 = "gridible/grid-container";
  var description$5 = "Display content in multiple columns and rows while also controlling individual breakpoint settings.";
  var category$5 = "design";
  var keywords$2 = [
  	"grid",
  	"layout",
  	"columns"
  ];
  var supports$4 = {
  	align: [
  		"wide",
  		"full"
  	],
  	anchor: true,
  	color: {
  		gradients: true,
  		__experimentalDefaultControls: {
  			background: true
  		}
  	},
  	spacing: {
  		margin: true,
  		padding: [
  			"top",
  			"bottom"
  		],
  		blockGap: false,
  		__experimentalDefaultControls: {
  			margin: true,
  			padding: true,
  			blockGap: false
  		}
  	}
  };
  var editorScript$5 = "gridible-blocks/editor/script";
  var editorStyle$5 = "gridible-blocks/editor/style";
  var style$5 = "gridible-blocks/front/style";
  var blockDef$4 = {
  	$schema: $schema$5,
  	apiVersion: apiVersion$5,
  	title: title$5,
  	name: name$5,
  	description: description$5,
  	category: category$5,
  	keywords: keywords$2,
  	supports: supports$4,
  	editorScript: editorScript$5,
  	editorStyle: editorStyle$5,
  	style: style$5
  };

  var DEFAULT_CSS_IMPL_STYLE = 'flex';
  var DivWrapper$1 = function DivWrapper(props) {
    var _props$attributes = props.attributes,
      alignAll = _props$attributes.alignAll,
      alignMd = _props$attributes.alignMd,
      alignLg = _props$attributes.alignLg,
      flowAll = _props$attributes.flowAll,
      flowMd = _props$attributes.flowMd,
      flowLg = _props$attributes.flowLg,
      visibility = _props$attributes.visibility,
      cssImplStyle = _props$attributes.cssImplStyle;
    var _props$isEdit = props.isEdit,
      isEdit = _props$isEdit === void 0 ? false : _props$isEdit;
    var vizClasses = vizOptionsToCssClasses(visibility);
    var classNamePrefix = prefixClassName('row');
    var classes = classnames(classNamePrefix, "".concat(classNamePrefix, "--").concat(cssImplStyle), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, props.className, !!props.className), "".concat(classNamePrefix, "__all-").concat(alignAll), alignAll), "".concat(classNamePrefix, "__md-").concat(alignMd), alignMd), "".concat(classNamePrefix, "__lg-").concat(alignLg), alignLg), "".concat(classNamePrefix, "__all-").concat(flowAll), flowAll), "".concat(classNamePrefix, "__md-").concat(flowMd), flowMd), "".concat(classNamePrefix, "__lg-").concat(flowLg), flowLg), vizClasses);
    var blockProps = {
      className: classes
    };
    if (isEdit === true) {
      blockProps = wp.blockEditor.useBlockProps(blockProps);
    } else {
      blockProps = wp.blockEditor.useBlockProps.save(blockProps);
    }
    return /*#__PURE__*/React.createElement("div", blockProps, props.children);
  };
  var template = [[slugs.column, {}]];
  var iconLayout = function iconLayout() {
    return /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewport: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M18 5c1.094 0 2 .906 2 2v10c0 1.125-.906 2-2 2H6c-1.125 0-2-.875-2-2V7c0-1.094.875-2 2-2h12zm0 1.5H6c-.281 0-.5.25-.5.5v2h13V7a.54.54 0 0 0-.5-.5zm-12 11h2.5v-7h-3V17c0 .281.219.5.5.5zm4 0h8c.25 0 .5-.219.5-.5v-6.5H10v7z"
    }));
  };
  var edit$1 = function edit(props) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(ResponsiveControlsPanel, {
      title: wp.i18n.__('Layout')
    }, /*#__PURE__*/React.createElement(FlowAlignmentPanel, {
      attributes: props.attributes,
      setAttributes: props.setAttributes
    }), /*#__PURE__*/React.createElement(VisibilityPanel, {
      visibilityBundle: props.attributes.visibility,
      setAttributes: props.setAttributes
    }))), /*#__PURE__*/React.createElement(DivWrapper$1, _extends$3({}, props, {
      isEdit: true
    }), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: template,
      allowedBlocks: [slugs.column],
      templateLock: false
    })));
  };
  var save$1 = function save(props) {
    return /*#__PURE__*/React.createElement(DivWrapper$1, _extends$3({}, props, {
      isEdit: false
    }), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks.Content, null));
  };
  wp.blocks.registerBlockType(blockDef$4, {
    icon: iconLayout,
    edit: edit$1,
    save: save$1,
    attributes: {
      cssImplStyle: {
        type: 'string',
        "default": DEFAULT_CSS_IMPL_STYLE
      },
      alignAll: {
        type: 'string',
        "default": 'start'
      },
      alignMd: {
        type: 'string',
        "default": 'start'
      },
      alignLg: {
        type: 'string',
        "default": 'start'
      },
      flowAll: {
        type: 'string',
        "default": 'standard'
      },
      flowMd: {
        type: 'string',
        "default": 'standard'
      },
      flowLg: {
        type: 'string',
        "default": 'standard'
      },
      visibility: {
        type: 'object',
        "default": VISIBILITY_ATTRIBUTE
      }
    }
  });

  function buildAttributeConfig(_ref) {
    var _ref$defaultSize = _ref.defaultSize,
      defaultSize = _ref$defaultSize === void 0 ? 6 : _ref$defaultSize,
      _ref$defaultOffset = _ref.defaultOffset,
      defaultOffset = _ref$defaultOffset === void 0 ? 0 : _ref$defaultOffset,
      _ref$includeOffset = _ref.includeOffset,
      includeOffset = _ref$includeOffset === void 0 ? false : _ref$includeOffset;
    var baseResponsiveAttributes = {
      allSize: {
        type: 'number',
        "default": defaultSize
      },
      mdSize: {
        type: 'number',
        "default": defaultSize
      },
      lgSize: {
        type: 'number',
        "default": defaultSize
      }
    };
    var offsetAttributes = {
      allOffset: {
        type: 'number',
        "default": defaultOffset
      },
      mdOffset: {
        type: 'number',
        "default": defaultOffset
      },
      lgOffset: {
        type: 'number',
        "default": defaultOffset
      }
    };
    return _objectSpread2(_objectSpread2({}, baseResponsiveAttributes), includeOffset ? offsetAttributes : {});
  }
  function createColumnClassNames(_ref2) {
    var allSize = _ref2.allSize,
      allOffset = _ref2.allOffset,
      mdSize = _ref2.mdSize,
      mdOffset = _ref2.mdOffset,
      lgSize = _ref2.lgSize,
      lgOffset = _ref2.lgOffset,
      _ref2$classNamePrefix = _ref2.classNamePrefix,
      classNamePrefix = _ref2$classNamePrefix === void 0 ? prefixClassName('') : _ref2$classNamePrefix;
    var classes = classnames(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, prefixClassName('col'), true), "".concat(classNamePrefix, "col__").concat(allSize), true), "".concat(classNamePrefix, "offset__").concat(allOffset), allOffset && allOffset > 0), "".concat(classNamePrefix, "col__md-").concat(mdSize), mdSize), "".concat(classNamePrefix, "offset__md-").concat(mdOffset), mdOffset && mdOffset > 0), "".concat(classNamePrefix, "col__lg-").concat(lgSize), lgSize), "".concat(classNamePrefix, "offset__lg-").concat(lgOffset), lgOffset && lgOffset > 0));
    return classes;
  }
  function TwelveColumnControl(_ref3) {
    var label = _ref3.label,
      value = _ref3.value,
      onChange = _ref3.onChange;
    return /*#__PURE__*/React.createElement(wp.components.RangeControl, {
      label: wp.i18n.__(label),
      value: value,
      onChange: onChange,
      min: 1,
      max: 12
    });
  }
  function WidthOffsetControls(_ref4) {
    var size = _ref4.size,
      offset = _ref4.offset;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TwelveColumnControl, {
      label: "Column Span",
      value: size.value,
      onChange: size.onChange
    }), offset && /*#__PURE__*/React.createElement(wp.components.RangeControl, {
      label: wp.i18n.__('Column Offset'),
      value: offset.value,
      onChange: offset.onChange,
      min: 0,
      max: 11
    }));
  }
  function ResponsiveLayoutSettingsPanel(_ref6) {
    var responsiveForms = _ref6.responsiveForms;
    return /*#__PURE__*/React.createElement(React.Fragment, null, responsiveForms);
  }
  function ResponsiveColWidthOffsetLayoutSettingsPanel(_ref7) {
    var attributes = _ref7.attributes,
      setAttributes = _ref7.setAttributes;
    var _usePreviewDevice = usePreviewDevice(),
      _usePreviewDevice2 = _slicedToArray(_usePreviewDevice, 1),
      activeBreakpoint = _usePreviewDevice2[0];
    var breakpointMobile = activeBreakpoint == BREAKPOINT_MOBILE;
    var breakpointTablet = activeBreakpoint == BREAKPOINT_TABLET;
    var breakpointDesktop = activeBreakpoint == BREAKPOINT_DESKTOP;
    function AttributesWidthOffsetControls(_ref8) {
      var sizeValueKey = _ref8.sizeValueKey,
        offsetValueKey = _ref8.offsetValueKey;
      return /*#__PURE__*/React.createElement(WidthOffsetControls, {
        size: {
          value: attributes[sizeValueKey],
          onChange: function onChange(value) {
            return setAttributes(_defineProperty({}, sizeValueKey, value));
          }
        },
        offset: {
          value: attributes[offsetValueKey],
          onChange: function onChange(value) {
            return setAttributes(_defineProperty({}, offsetValueKey, value));
          }
        }
      });
    }
    var responsiveForms = /*#__PURE__*/React.createElement(React.Fragment, null, breakpointMobile && /*#__PURE__*/React.createElement(wp.components.BaseControl, null, /*#__PURE__*/React.createElement(AttributesWidthOffsetControls, {
      sizeValueKey: "allSize",
      offsetValueKey: "allOffset"
    })), breakpointTablet && /*#__PURE__*/React.createElement(wp.components.BaseControl, null, /*#__PURE__*/React.createElement(AttributesWidthOffsetControls, {
      sizeValueKey: "mdSize",
      offsetValueKey: "mdOffset"
    })), breakpointDesktop && /*#__PURE__*/React.createElement(wp.components.BaseControl, null, /*#__PURE__*/React.createElement(AttributesWidthOffsetControls, {
      sizeValueKey: "lgSize",
      offsetValueKey: "lgOffset"
    })));
    return /*#__PURE__*/React.createElement(ResponsiveLayoutSettingsPanel, {
      responsiveForms: responsiveForms
    });
  }

  var $schema$4 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$4 = 3;
  var title$4 = "Gridible Column";
  var name$4 = "gridible/grid-column";
  var description$4 = "Holds content, but in a pretty grid format.";
  var category$4 = "design";
  var keywords$1 = [
  	"grid",
  	"column"
  ];
  var parent$1 = [
  	"gridible/grid-container"
  ];
  var editorScript$4 = "gridible-blocks/editor/script";
  var editorStyle$4 = "gridible-blocks/editor/style";
  var style$4 = "gridible-blocks/front/style";
  var blockDef$3 = {
  	$schema: $schema$4,
  	apiVersion: apiVersion$4,
  	title: title$4,
  	name: name$4,
  	description: description$4,
  	category: category$4,
  	keywords: keywords$1,
  	parent: parent$1,
  	editorScript: editorScript$4,
  	editorStyle: editorStyle$4,
  	style: style$4
  };

  var iconColumn = function iconColumn() {
    return /*#__PURE__*/React.createElement("svg", {
      width: "24",
      height: "24",
      viewport: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 8.071C5 7.212 5.613 6.5 6.4 6.5h11.2c.766 0 1.4.712 1.4 1.571v7.857c0 .884-.634 1.571-1.4 1.571H6.4c-.788 0-1.4-.687-1.4-1.571V8.071zm9.8 8.25h2.8c.175 0 .35-.172.35-.393V8.071c0-.196-.175-.393-.35-.393h-2.8v8.643zm-1.05-8.643h-3.5v8.643h3.5V7.679zM9.2 16.321V7.679H6.4c-.197 0-.35.196-.35.393v7.857c0 .221.153.393.35.393h2.8z"
    }));
  };
  var DivWrapper = function DivWrapper(props) {
    var visibility = props.attributes.visibility;
    var _props$isEdit = props.isEdit,
      isEdit = _props$isEdit === void 0 ? false : _props$isEdit;
    var classes = null;
    if (isEdit) {
      // Don't add column size classes, or the resulting render with have
      // duplicate nested column sizes, which ruins the editor layout.
      classes = classnames(_defineProperty({}, 'editor-col', isEdit));
    } else {
      // Rendering for persistence, add column size classes.
      classes = createColumnClassNames(props.attributes);
    }
    var vizClasses = vizOptionsToCssClasses(visibility);

    // Add custom class name and (responsive) visibility classes.
    classes = classnames(classes, _defineProperty({}, props.className, !!props.className), vizClasses);
    var blockProps = {
      className: classes
    };
    if (isEdit === true) {
      blockProps = wp.blockEditor.useBlockProps(blockProps);
    } else {
      blockProps = wp.blockEditor.useBlockProps.save(blockProps);
    }
    return /*#__PURE__*/React.createElement("div", blockProps, props.children);
  };
  var EditComponent = function EditComponent(props) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(ResponsiveControlsPanel, {
      title: wp.i18n.__('Columns & Visibility')
    }, /*#__PURE__*/React.createElement(ResponsiveColWidthOffsetLayoutSettingsPanel, {
      attributes: props.attributes,
      setAttributes: props.setAttributes,
      includeOffset: true
    }), /*#__PURE__*/React.createElement(VisibilityPanel, {
      visibilityBundle: props.attributes.visibility,
      setAttributes: props.setAttributes
    }))), /*#__PURE__*/React.createElement(DivWrapper, _extends$3({}, props, {
      isEdit: true
    }), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      templateLock: false
    })));
  };
  var SaveComponent = function SaveComponent(props) {
    return /*#__PURE__*/React.createElement(DivWrapper, props, /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks.Content, null));
  };
  var withGridClasses = wp.compose.createHigherOrderComponent(function (BlockListBlock) {
    return function (props) {
      if (props.name !== slugs.column) {
        return /*#__PURE__*/React.createElement(BlockListBlock, props);
      }
      var visibility = props.attributes.visibility;
      var vizClasses = vizOptionsToCssClasses(visibility);
      var classes = classnames('editor', createColumnClassNames(_objectSpread2(_objectSpread2({}, props.attributes), {}, {
        classNamePrefix: ''
      })), vizClasses);
      return /*#__PURE__*/React.createElement(BlockListBlock, _extends$3({}, props, {
        className: classes
      }));
    };
  }, 'withGridClasses');
  wp.hooks.addFilter('editor.BlockListBlock', "".concat(slugs.column, "/editor-block-grid-cols"), withGridClasses);
  wp.blocks.registerBlockType(blockDef$3, {
    icon: iconColumn,
    edit: EditComponent,
    save: SaveComponent,
    attributes: _objectSpread2(_objectSpread2({}, buildAttributeConfig({
      includeOffset: true
    })), {}, {
      visibility: {
        type: 'object',
        "default": VISIBILITY_ATTRIBUTE
      }
    })
  });

  var MIN_SPACER_SIZE = 0;

  function DimensionInput(_ref) {
    var _ref2;
    var label = _ref.label,
      onChange = _ref.onChange,
      isResizing = _ref.isResizing,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value;
    var inputId = wp.compose.useInstanceId(wp.components.__experimentalUnitControl, 'block-spacer-height-input');
    var spacingSizes = wp.blockEditor.useSettings('spacing.spacingSizes');
    // In most contexts the spacer size cannot meaningfully be set to a
    // percentage, since this is relative to the parent container. This
    // unit is disabled from the UI.
    var availableUnitSettings = (_ref2 = wp.blockEditor.useSettings('spacing.units') || undefined) === null || _ref2 === void 0 ? void 0 : _ref2.filter(function (availableUnit) {
      return availableUnit !== '%';
    });
    var units = wp.components.__experimentalUseCustomUnits({
      availableUnits: availableUnitSettings || ['px', 'em', 'rem', 'vw', 'vh'],
      defaultValues: {
        px: 100,
        em: 10,
        rem: 10,
        vw: 10,
        vh: 25
      }
    });
    var handleOnChange = function handleOnChange(unprocessedValue) {
      onChange(unprocessedValue.all);
    };

    // Force the unit to update to `px` when the Spacer is being resized.
    var _parseQuantityAndUnit = wp.components.__experimentalParseQuantityAndUnitFromRawValue(value),
      _parseQuantityAndUnit2 = _slicedToArray(_parseQuantityAndUnit, 2),
      parsedQuantity = _parseQuantityAndUnit2[0],
      parsedUnit = _parseQuantityAndUnit2[1];
    var computedValue = wp.blockEditor.isValueSpacingPreset(value) ? value : [parsedQuantity, isResizing ? 'px' : parsedUnit].join('');
    return /*#__PURE__*/React.createElement(React.Fragment, null, (!spacingSizes || (spacingSizes === null || spacingSizes === void 0 ? void 0 : spacingSizes.length) === 0) && /*#__PURE__*/React.createElement(wp.components.BaseControl, {
      label: label,
      id: inputId
    }, /*#__PURE__*/React.createElement(wp.components.__experimentalUnitControl, {
      id: inputId,
      isResetValueOnUnitChange: true,
      min: MIN_SPACER_SIZE,
      onChange: handleOnChange,
      style: {
        maxWidth: 80
      },
      value: computedValue,
      units: units
    })), (spacingSizes === null || spacingSizes === void 0 ? void 0 : spacingSizes.length) > 0 && /*#__PURE__*/React.createElement(wp.primitives.View, {
      className: "tools-panel-item-spacing"
    }, /*#__PURE__*/React.createElement(wp.blockEditor.__experimentalSpacingSizesControl, {
      values: {
        all: computedValue
      },
      onChange: handleOnChange,
      label: label,
      sides: ['all'],
      units: units,
      allowReset: false,
      splitOnAxis: false,
      showSideInLabel: false
    })));
  }
  var SpacerControls = function SpacerControls(props) {
    props.attributes.visibility;
    var setAttributes = props.setAttributes,
      orientation = props.orientation,
      height = props.height,
      width = props.width,
      isResizing = props.isResizing;
    return /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('Settings')
    }, orientation === 'horizontal' && /*#__PURE__*/React.createElement(DimensionInput, {
      label: wp.i18n.__('Width'),
      value: width,
      onChange: function onChange(nextWidth) {
        return setAttributes({
          width: nextWidth
        });
      },
      isResizing: isResizing
    }), orientation !== 'horizontal' && /*#__PURE__*/React.createElement(DimensionInput, {
      label: wp.i18n.__('Height'),
      value: height,
      onChange: function onChange(nextHeight) {
        return setAttributes({
          height: nextHeight
        });
      },
      isResizing: isResizing
    })), /*#__PURE__*/React.createElement(ResponsiveControlsPanel, {
      title: wp.i18n.__('Visibility')
    }, /*#__PURE__*/React.createElement(VisibilityPanel, {
      visibilityBundle: props.attributes.visibility,
      setAttributes: props.setAttributes
    })));
  };

  var $schema$3 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$3 = 3;
  var title$3 = "Gridible Offset";
  var name$3 = "gridible/responsive-spacer";
  var description$3 = "You gotta keep 'em separated. Control spacing between elements based on breakpoints.";
  var category$3 = "design";
  var keywords = [
  	"spacer",
  	"offset"
  ];
  var usesContext = [
  	"orientation"
  ];
  var supports$3 = {
  	anchor: true,
  	spacing: {
  		margin: [
  			"top",
  			"bottom"
  		],
  		__experimentalDefaultControls: {
  			margin: true
  		}
  	}
  };
  var editorScript$3 = "gridible-blocks/editor/script";
  var editorStyle$3 = "gridible-blocks/editor/style";
  var style$3 = "gridible-blocks/front/style";
  var blockDef$2 = {
  	$schema: $schema$3,
  	apiVersion: apiVersion$3,
  	title: title$3,
  	name: name$3,
  	description: description$3,
  	category: category$3,
  	keywords: keywords,
  	usesContext: usesContext,
  	supports: supports$3,
  	editorScript: editorScript$3,
  	editorStyle: editorStyle$3,
  	style: style$3
  };

  var _excluded$1 = ["orientation", "onResizeStart", "onResize", "onResizeStop", "isSelected", "isResizing", "setIsResizing", "visibility"];
  var icon = function icon() {
    return /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20.5 5.525c0 .284-.258.525-.562.525H4.063c-.328 0-.562-.241-.562-.525 0-.306.234-.525.563-.525h15.875c.305 0 .563.219.563.525zm-5.664 4.725c-.234.219-.586.219-.797 0l-1.477-1.378v6.234l1.477-1.378c.211-.219.563-.219.797 0a.49.49 0 0 1 0 .722l-2.437 2.275c-.234.219-.586.219-.797 0L9.164 14.45c-.234-.197-.234-.525 0-.722.211-.219.563-.219.797 0l1.477 1.378V8.872L9.961 10.25c-.234.219-.586.219-.797 0-.234-.197-.234-.525 0-.722l2.438-2.275c.211-.219.563-.219.797 0l2.438 2.275a.49.49 0 0 1 0 .722zM4.063 19c-.328 0-.562-.241-.562-.525 0-.306.234-.525.563-.525h15.875c.305 0 .563.219.563.525 0 .284-.258.525-.562.525H4.063z"
    }));
  };
  var ResizableSpacer = function ResizableSpacer(_ref) {
    var orientation = _ref.orientation,
      _onResizeStart = _ref.onResizeStart,
      _onResize = _ref.onResize,
      _onResizeStop = _ref.onResizeStop,
      isSelected = _ref.isSelected,
      isResizing = _ref.isResizing,
      setIsResizing = _ref.setIsResizing;
      _ref.visibility;
      var props = _objectWithoutProperties(_ref, _excluded$1);
    var getCurrentSize = function getCurrentSize(elt) {
      return orientation === 'horizontal' ? elt.clientWidth : elt.clientHeight;
    };
    var getNextVal = function getNextVal(elt) {
      return "".concat(getCurrentSize(elt), "px");
    };
    return /*#__PURE__*/React.createElement(wp.components.ResizableBox, _extends$3({
      className: classnames('block-library-spacer__resize-container', {
        'resize-horizontal': orientation === 'horizontal',
        'is-resizing': isResizing,
        'is-selected': isSelected
      }),
      onResizeStart: function onResizeStart(_event, _direction, elt) {
        var nextVal = getNextVal(elt);
        _onResizeStart(nextVal);
        _onResize(nextVal);
      },
      onResize: function onResize(_event, _direction, elt) {
        _onResize(getNextVal(elt));
        if (!isResizing) {
          setIsResizing(true);
        }
      },
      onResizeStop: function onResizeStop(_event, _direction, elt) {
        var nextVal = getCurrentSize(elt);
        _onResizeStop("".concat(nextVal, "px"));
        setIsResizing(false);
      },
      __experimentalShowTooltip: true,
      __experimentalTooltipProps: {
        axis: orientation === 'horizontal' ? 'x' : 'y',
        position: 'corner',
        isVisible: isResizing
      },
      showHandle: isSelected
    }, props));
  };
  var edit = function edit(props) {
    var attributes = props.attributes,
      isSelected = props.isSelected,
      setAttributes = props.setAttributes,
      toggleSelection = props.toggleSelection,
      context = props.context,
      parentLayout = props.__unstableParentLayout,
      className = props.className;
    var visibility = props.attributes.visibility;
    var vizClasses = vizOptionsToCssClasses(visibility);
    var disableCustomSpacingSizes = wp.data.useSelect(function (select) {
      var editorSettings = select(wp.blockEditor.store).getSettings();
      return editorSettings === null || editorSettings === void 0 ? void 0 : editorSettings.disableCustomSpacingSizes;
    });
    var orientation = context.orientation;
    var _ref2 = parentLayout || {},
      parentOrientation = _ref2.orientation,
      type = _ref2.type;
    // Check if the spacer is inside a flex container.
    var isFlexLayout = type === 'flex';
    // If the spacer is inside a flex container, it should either inherit the orientation
    // of the parent or use the flex default orientation.
    var inheritedOrientation = !parentOrientation && isFlexLayout ? 'horizontal' : parentOrientation || orientation;
    var height = attributes.height,
      width = attributes.width,
      _attributes$style = attributes.style,
      blockStyle = _attributes$style === void 0 ? {} : _attributes$style;
    var _blockStyle$layout = blockStyle.layout,
      layout = _blockStyle$layout === void 0 ? {} : _blockStyle$layout;
    var selfStretch = layout.selfStretch,
      flexSize = layout.flexSize;
    var spacingSizes = wp.blockEditor.useSettings('spacing.spacingSizes');
    var _useState = wp.element.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isResizing = _useState2[0],
      setIsResizing = _useState2[1];
    var _useState3 = wp.element.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      temporaryHeight = _useState4[0],
      setTemporaryHeight = _useState4[1];
    var _useState5 = wp.element.useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      temporaryWidth = _useState6[0],
      setTemporaryWidth = _useState6[1];
    var onResizeStart = function onResizeStart() {
      return toggleSelection(false);
    };
    var onResizeStop = function onResizeStop() {
      return toggleSelection(true);
    };
    var handleOnVerticalResizeStop = function handleOnVerticalResizeStop(newHeight) {
      onResizeStop();
      if (isFlexLayout) {
        setAttributes({
          style: _objectSpread2(_objectSpread2({}, blockStyle), {}, {
            layout: _objectSpread2(_objectSpread2({}, layout), {}, {
              flexSize: newHeight,
              selfStretch: 'fixed'
            })
          })
        });
      }
      setAttributes({
        height: newHeight
      });
      setTemporaryHeight(null);
    };
    var handleOnHorizontalResizeStop = function handleOnHorizontalResizeStop(newWidth) {
      onResizeStop();
      if (isFlexLayout) {
        setAttributes({
          style: _objectSpread2(_objectSpread2({}, blockStyle), {}, {
            layout: _objectSpread2(_objectSpread2({}, layout), {}, {
              flexSize: newWidth,
              selfStretch: 'fixed'
            })
          })
        });
      }
      setAttributes({
        width: newWidth
      });
      setTemporaryWidth(null);
    };
    var getHeightForVerticalBlocks = function getHeightForVerticalBlocks() {
      if (isFlexLayout) {
        return undefined;
      }
      return temporaryHeight || wp.blockEditor.getSpacingPresetCssVar(height) || undefined;
    };
    var getWidthForHorizontalBlocks = function getWidthForHorizontalBlocks() {
      if (isFlexLayout) {
        return undefined;
      }
      return temporaryWidth || wp.blockEditor.getSpacingPresetCssVar(width) || undefined;
    };
    var sizeConditionalOnOrientation = inheritedOrientation === 'horizontal' ? temporaryWidth || flexSize : temporaryHeight || flexSize;
    var style = {
      height: inheritedOrientation === 'horizontal' ? 24 : getHeightForVerticalBlocks(),
      width: inheritedOrientation === 'horizontal' ? getWidthForHorizontalBlocks() : undefined,
      // In vertical flex containers, the spacer shrinks to nothing without a minimum width.
      minWidth: inheritedOrientation === 'vertical' && isFlexLayout ? 48 : undefined,
      // Add flex-basis so temporary sizes are respected.
      flexBasis: isFlexLayout ? sizeConditionalOnOrientation : undefined,
      // Remove flex-grow when resizing.
      flexGrow: isFlexLayout && isResizing ? 0 : undefined
    };
    var resizableBoxWithOrientation = function resizableBoxWithOrientation(blockOrientation) {
      if (blockOrientation === 'horizontal') {
        return /*#__PURE__*/React.createElement(ResizableSpacer, {
          minWidth: 0,
          enable: {
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false
          },
          orientation: blockOrientation,
          onResizeStart: onResizeStart,
          onResize: setTemporaryWidth,
          onResizeStop: handleOnHorizontalResizeStop,
          isSelected: isSelected,
          isResizing: isResizing,
          setIsResizing: setIsResizing
        });
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ResizableSpacer, {
        minHeight: 0,
        enable: {
          top: false,
          right: false,
          bottom: true,
          left: false,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false
        },
        orientation: blockOrientation,
        onResizeStart: onResizeStart,
        onResize: setTemporaryHeight,
        onResizeStop: handleOnVerticalResizeStop,
        isSelected: isSelected,
        isResizing: isResizing,
        setIsResizing: setIsResizing
      }));
    };
    wp.element.useEffect(function () {
      if (isFlexLayout && selfStretch !== 'fill' && selfStretch !== 'fit' && !flexSize) {
        if (inheritedOrientation === 'horizontal') {
          // If spacer is moving from a vertical container to a horizontal container,
          // it might not have width but have height instead.
          var newSize = wp.blockEditor.getCustomValueFromPreset(width, spacingSizes) || wp.blockEditor.getCustomValueFromPreset(height, spacingSizes) || '100px';
          setAttributes({
            width: '0px',
            style: _objectSpread2(_objectSpread2({}, blockStyle), {}, {
              layout: _objectSpread2(_objectSpread2({}, layout), {}, {
                flexSize: newSize,
                selfStretch: 'fixed'
              })
            })
          });
        } else {
          var _newSize = wp.blockEditor.getCustomValueFromPreset(height, spacingSizes) || wp.blockEditor.getCustomValueFromPreset(width, spacingSizes) || '100px';
          setAttributes({
            height: '0px',
            style: _objectSpread2(_objectSpread2({}, blockStyle), {}, {
              layout: _objectSpread2(_objectSpread2({}, layout), {}, {
                flexSize: _newSize,
                selfStretch: 'fixed'
              })
            })
          });
        }
      } else if (isFlexLayout && (selfStretch === 'fill' || selfStretch === 'fit')) {
        if (inheritedOrientation === 'horizontal') {
          setAttributes({
            width: undefined
          });
        } else {
          setAttributes({
            height: undefined
          });
        }
      } else if (!isFlexLayout && (selfStretch || flexSize)) {
        if (inheritedOrientation === 'horizontal') {
          setAttributes({
            width: flexSize
          });
        } else {
          setAttributes({
            height: flexSize
          });
        }
        setAttributes({
          style: _objectSpread2(_objectSpread2({}, blockStyle), {}, {
            layout: _objectSpread2(_objectSpread2({}, layout), {}, {
              flexSize: undefined,
              selfStretch: undefined
            })
          })
        });
      }
    }, [blockStyle, flexSize, height, inheritedOrientation, isFlexLayout, layout, selfStretch, setAttributes, spacingSizes, width]);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.primitives.View, wp.blockEditor.useBlockProps({
      style: style,
      className: classnames(className, vizClasses, {
        'custom-sizes-disabled': disableCustomSpacingSizes
      })
    }), resizableBoxWithOrientation(inheritedOrientation)), !isFlexLayout && /*#__PURE__*/React.createElement(SpacerControls, _extends$3({}, props, {
      setAttributes: setAttributes,
      height: temporaryHeight || height,
      width: temporaryWidth || width,
      orientation: inheritedOrientation,
      isResizing: isResizing
    })));
  };
  var save = function save(props) {
    props.attributes;
      props.className;
    var _props$attributes = props.attributes,
      height = _props$attributes.height,
      width = _props$attributes.width,
      style = _props$attributes.style,
      visibility = _props$attributes.visibility;
    var _ref3 = style || {},
      _ref3$layout = _ref3.layout,
      _ref3$layout2 = _ref3$layout === void 0 ? {} : _ref3$layout,
      selfStretch = _ref3$layout2.selfStretch;
    // If selfStretch is set to 'fill' or 'fit', don't set default height.
    var finalHeight = selfStretch === 'fill' || selfStretch === 'fit' ? undefined : height;
    var vizClasses = vizOptionsToCssClasses(visibility);
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps.save({
      className: classnames(vizClasses),
      style: {
        height: wp.blockEditor.getSpacingPresetCssVar(finalHeight),
        width: wp.blockEditor.getSpacingPresetCssVar(width)
      },
      'aria-hidden': true
    }));
  };
  wp.blocks.registerBlockType(blockDef$2, {
    icon: icon,
    edit: edit,
    save: save,
    attributes: {
      height: {
        type: "string",
        "default": "100px"
      },
      width: {
        type: "string"
      },
      visibility: {
        type: 'object',
        "default": VISIBILITY_ATTRIBUTE
      }
    }
  });

  var $schema$2 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$2 = 3;
  var title$2 = "Carousel Slide";
  var name$2 = "gridible/static-carousel-slide";
  var parent = [
  	"gridible/static-carousel-container"
  ];
  var description$2 = "Add images, text, or content to be featured in your carousel.";
  var category$2 = "design";
  var attributes$2 = {
  };
  var supports$2 = {
  	anchor: true,
  	align: true,
  	ariaLabel: false,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: false,
  		text: false
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: true
  	},
  	layout: true,
  	multiple: true,
  	reusable: true,
  	position: {
  		sticky: false
  	},
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: false
  	},
  	typography: false,
  	interactivity: true,
  	__experimentalBorder: {
  		color: true,
  		radius: true,
  		style: true,
  		width: true,
  		__experimentalDefaultControls: {
  			color: true,
  			radius: true,
  			style: true,
  			width: true
  		}
  	}
  };
  var editorScript$2 = "gridible-blocks/editor/script";
  var editorStyle$2 = "gridible-blocks/editor/style";
  var style$2 = "gridible-blocks/front/style";
  var slideBlockDef = {
  	$schema: $schema$2,
  	apiVersion: apiVersion$2,
  	title: title$2,
  	name: name$2,
  	parent: parent,
  	description: description$2,
  	category: category$2,
  	attributes: attributes$2,
  	supports: supports$2,
  	editorScript: editorScript$2,
  	editorStyle: editorStyle$2,
  	style: style$2
  };

  var _path$2;
  function _extends$2() { return _extends$2 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$2.apply(null, arguments); }

  var SvgIcon$2 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$2({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path$2 || (_path$2 = /*#__PURE__*/wp.element.createElement("path", {
      fillRule: "evenodd",
      d: "M11.11 19q-.173 0-.338-.032a1.76 1.76 0 0 1-1.439-1.718V6.75c0-.965.797-1.75 1.778-1.75h7.111C19.202 5 20 5.785 20 6.75v10.5c0 .965-.797 1.75-1.778 1.75zM6.668 6.969V17.03a.66.66 0 0 0 .666.657A.66.66 0 0 0 8 17.03V6.97a.66.66 0 0 0-.667-.657.66.66 0 0 0-.666.657M4 8.28v7.438a.66.66 0 0 0 .667.656.66.66 0 0 0 .666-.656V8.28a.66.66 0 0 0-.666-.656.66.66 0 0 0-.667.656m7.086-2.156a.567.567 0 0 0-.572.563v10.62c0 .31.256.562.572.562h7.234a.567.567 0 0 0 .572-.562V6.688a.567.567 0 0 0-.572-.563z",
      clipRule: "evenodd"
    })));
  };

  function Edit$1(_ref) {
    var clientId = _ref.clientId;
    var innerBlockCount = wp.data.useSelect(function (select) {
      var innerBlocks = select('core/block-editor').getBlocks(clientId);
      return innerBlocks.length;
    }, [clientId]);
    var isSlideEmpty = innerBlockCount === 0;
    var blockProps = wp.blockEditor.useInnerBlocksProps(wp.blockEditor.useBlockProps(), {
      renderAppender: function renderAppender() {
        if (isSlideEmpty) {
          return /*#__PURE__*/React.createElement(wp.blockEditor.ButtonBlockAppender, {
            rootClientId: clientId
          });
        }
        return /*#__PURE__*/React.createElement(wp.blockEditor.DefaultBlockAppender, {
          rootClientId: clientId
        });
      }
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null), /*#__PURE__*/React.createElement("li", blockProps));
  }

  function Save$1(_ref) {
    _ref.attributes;
    var blockProps = wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save({
      className: "swiper-slide"
    }));
    return /*#__PURE__*/React.createElement("li", blockProps);
  }

  wp.blocks.registerBlockType(slideBlockDef, {
    icon: SvgIcon$2,
    edit: Edit$1,
    save: Save$1
  });

  var $schema$1 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$1 = 3;
  var title$1 = "Carousel Query";
  var name$1 = "gridible/query-carousel-container";
  var description$1 = "Showcase post content in a sleek, swipe-friendly slider, perfect for highlighting blog posts, news posts, and more.";
  var category$1 = "design";
  var attributes$1 = {
  	carouselType: {
  		type: "string",
  		"default": "query"
  	}
  };
  var allowedBlocks$1 = [
  	"core/post-template"
  ];
  var providesContext$1 = {
  	"gridible/carouselType": "carouselType"
  };
  var supports$1 = {
  	anchor: true,
  	align: true,
  	ariaLabel: false,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: false,
  		text: false
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: false
  	},
  	layout: true,
  	multiple: true,
  	reusable: true,
  	position: false,
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: false
  	},
  	typography: false,
  	interactivity: true
  };
  var editorScript$1 = "gridible-blocks/editor/script";
  var editorStyle$1 = "gridible-blocks/editor/style";
  var style$1 = "gridible-blocks/front/style";
  var blockDef$1 = {
  	$schema: $schema$1,
  	apiVersion: apiVersion$1,
  	title: title$1,
  	name: name$1,
  	description: description$1,
  	category: category$1,
  	attributes: attributes$1,
  	allowedBlocks: allowedBlocks$1,
  	providesContext: providesContext$1,
  	supports: supports$1,
  	editorScript: editorScript$1,
  	editorStyle: editorStyle$1,
  	style: style$1
  };

  var _path$1, _path2;
  function _extends$1() { return _extends$1 = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends$1.apply(null, arguments); }

  var SvgIcon$1 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$1({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path$1 || (_path$1 = /*#__PURE__*/wp.element.createElement("path", {
      fillRule: "evenodd",
      d: "M9.333 6.75c0-.965.798-1.75 1.778-1.75h7.111C19.202 5 20 5.785 20 6.75v10.5c0 .965-.797 1.75-1.778 1.75h-7.11c-.981 0-1.779-.785-1.779-1.75zm7.364 6.383c.733 0 1.328-.62 1.328-1.383 0-.764-.594-1.383-1.328-1.383q-.258.001-.483.094l-.303-.807c.244-.1.51-.154.786-.154 1.193 0 2.16 1.007 2.16 2.25S17.89 14 16.697 14c-1.001 0-1.842-.71-2.087-1.671l-.302-.927-.005.002c-.147-.597-.668-1.037-1.286-1.037-.733 0-1.328.62-1.328 1.383 0 .764.595 1.383 1.328 1.383q.259-.002.485-.095l.304.807a2.1 2.1 0 0 1-.789.155c-1.193 0-2.16-1.007-2.16-2.25s.967-2.25 2.16-2.25c.97 0 1.79.666 2.063 1.582l.002-.001.32.984.005.015.004.016c.148.597.668 1.037 1.286 1.037",
      clipRule: "evenodd"
    })), _path2 || (_path2 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M6.667 17.031V6.97a.66.66 0 0 1 .666-.657A.66.66 0 0 1 8 6.97V17.03a.66.66 0 0 1-.667.657.66.66 0 0 1-.666-.657M4 15.719V8.28a.66.66 0 0 1 .667-.656.66.66 0 0 1 .666.656v7.438a.66.66 0 0 1-.666.656.66.66 0 0 1-.667-.656"
    })));
  };

  function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

  var l = {};
  function s(e) {
    return T(e);
  }
  function T(e) {
    return e instanceof Map;
  }
  function u(e) {
    return j(e);
  }
  function j(e) {
    return e instanceof Set;
  }
  function o(e) {
    return !!e && e.constructor === Object;
  }
  function y(e) {
    return Object.keys(e);
  }
  function M(e, b, ...f) {
    let i = l;
    for (let c of [e, b, ...f]) {
      if (!o(c)) throw new TypeError("Expected all arguments to be object literals.");
      let r = {
          ...i
        },
        p = y(c);
      for (let a of p) {
        let n = r[a],
          t = c[a];
        if (n !== t) {
          if (o(n) && o(t)) {
            r[a] = M(n, t);
            continue;
          }
          if (Array.isArray(n) && Array.isArray(t)) {
            r[a] = [...new Set([...n, ...t])];
            continue;
          }
          if (s(n) && s(t)) {
            r[a] = new Map([...n, ...t]);
            continue;
          }
          if (u(n) && u(t)) {
            r[a] = new Set([...n, ...t]);
            continue;
          }
          r[a] = t;
        }
      }
      i = r;
    }
    return i;
  }

  var breakpointsToBreakpointKeysMap = {
    'Mobile': 0,
    'Tablet': 600,
    'Desktop': 1080
  };
  var slidesInViewOptions = [1, 2, 3, 4, 6, 12].map(function (slides) {
    return {
      label: slides,
      value: slides
    };
  });
  function getBreakpointValue(swiperConfig, breakpoint, key) {
    var breakpointKey = breakpointsToBreakpointKeysMap[breakpoint];
    return swiperConfig.breakpoints[breakpointKey][key];
  }
  function createBreakpointValue(breakpoint, key, value) {
    var breakpointKey = breakpointsToBreakpointKeysMap[breakpoint];
    return {
      breakpoints: _defineProperty({}, breakpointKey, _defineProperty({}, key, value))
    };
  }
  function SlideLayoutControls(_ref) {
    var swiperConfig = _ref.swiperConfig,
      setSwiperConfig = _ref.setSwiperConfig,
      visibilityBundle = _ref.visibilityBundle,
      setAttributes = _ref.setAttributes;
    var _usePreviewDevice = usePreviewDevice(),
      _usePreviewDevice2 = _slicedToArray(_usePreviewDevice, 1),
      previewDevice = _usePreviewDevice2[0];
    return /*#__PURE__*/React.createElement(ResponsiveControlsPanel, {
      title: "Slide Layout"
    }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Slides In View",
      value: getBreakpointValue(swiperConfig, previewDevice, 'slidesPerView'),
      options: slidesInViewOptions,
      onChange: function onChange(value) {
        var newBreakpointValue = createBreakpointValue(previewDevice, 'slidesPerView', value);
        setSwiperConfig(newBreakpointValue);
      }
    }), /*#__PURE__*/React.createElement(VisibilityPanel, {
      visibilityBundle: visibilityBundle,
      setAttributes: setAttributes
    }));
  }
  function ToolsPanelGroup(_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/React.createElement("div", {
      className: "gridible-tools-panel__group"
    }, children);
  }
  function ToolsPanelHeading(_ref3) {
    var title = _ref3.title;
    return /*#__PURE__*/React.createElement(wp.components.__experimentalHeading, {
      level: 3,
      upperCase: true,
      style: {
        marginBottom: '0'
      }
    }, wp.i18n.__(title));
  }
  function PaginationControls(_ref4) {
    var _swiperConfig$paginat, _swiperConfig$paginat2, _swiperConfig$paginat3;
    var swiperConfig = _ref4.swiperConfig,
      setSwiperConfig = _ref4.setSwiperConfig;
    return /*#__PURE__*/React.createElement(ToolsPanelGroup, null, /*#__PURE__*/React.createElement(ToolsPanelHeading, {
      title: "Slide Pagination"
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      checked: (_swiperConfig$paginat = swiperConfig.pagination) === null || _swiperConfig$paginat === void 0 ? void 0 : _swiperConfig$paginat.enabled,
      onChange: function onChange(value) {
        setSwiperConfig({
          pagination: {
            enabled: value
          }
        });
      },
      label: !!((_swiperConfig$paginat2 = swiperConfig.pagination) !== null && _swiperConfig$paginat2 !== void 0 && _swiperConfig$paginat2.enabled) ? 'Slide pagination is visible.' : 'Slide pagination is hidden.',
      className: "gridible-toggle--full-width"
    }), /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Pagination Style",
      value: (_swiperConfig$paginat3 = swiperConfig.pagination) === null || _swiperConfig$paginat3 === void 0 ? void 0 : _swiperConfig$paginat3.type,
      options: [{
        label: 'Bullets',
        value: 'bullets'
      }, {
        label: 'Fraction',
        value: 'fraction'
      }
      // { label: 'Progress', value: 'progress' },
      ],
      onChange: function onChange(value) {
        setSwiperConfig({
          pagination: {
            type: value
          }
        });
      }
    }));
  }
  function NavigationControls(_ref5) {
    var _swiperConfig$navigat, _swiperConfig$navigat2;
    var swiperConfig = _ref5.swiperConfig,
      setSwiperConfig = _ref5.setSwiperConfig;
    return /*#__PURE__*/React.createElement(ToolsPanelGroup, null, /*#__PURE__*/React.createElement(ToolsPanelHeading, {
      title: "Slide Navigation"
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      checked: (_swiperConfig$navigat = swiperConfig.navigation) === null || _swiperConfig$navigat === void 0 ? void 0 : _swiperConfig$navigat.enabled,
      onChange: function onChange(value) {
        setSwiperConfig({
          navigation: {
            enabled: value
          }
        });
      },
      label: !!((_swiperConfig$navigat2 = swiperConfig.navigation) !== null && _swiperConfig$navigat2 !== void 0 && _swiperConfig$navigat2.enabled) ? 'Slide navigation is visible.' : 'Slide navigation is hidden.',
      className: "gridible-toggle--full-width"
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      checked: swiperConfig.allowTouchMove,
      onChange: function onChange(value) {
        setSwiperConfig({
          allowTouchMove: value
        });
      },
      label: !!swiperConfig.allowTouchMove ? 'Swipe navigation is enabled.' : 'Swipe navigation is disabled.',
      className: "gridible-toggle--full-width"
    }));
  }
  function LoopControls(_ref6) {
    var swiperConfig = _ref6.swiperConfig,
      setSwiperConfig = _ref6.setSwiperConfig;
    return /*#__PURE__*/React.createElement(ToolsPanelGroup, null, /*#__PURE__*/React.createElement(ToolsPanelHeading, {
      title: "Loop"
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      checked: swiperConfig.loop,
      onChange: function onChange(value) {
        setSwiperConfig({
          loop: value
        });
      },
      label: !!swiperConfig.loop ? 'Slides will loop indefinitely.' : 'Slides will not loop.',
      className: "gridible-toggle--full-width"
    }));
  }
  function AdaptiveHeightControls(_ref7) {
    var swiperConfig = _ref7.swiperConfig,
      setSwiperConfig = _ref7.setSwiperConfig;
    return /*#__PURE__*/React.createElement(ToolsPanelGroup, null, /*#__PURE__*/React.createElement(ToolsPanelHeading, {
      title: "Adaptive Height"
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      checked: swiperConfig.autoHeight,
      onChange: function onChange(value) {
        setSwiperConfig({
          autoHeight: value
        });
      },
      label: !!swiperConfig.autoHeight ? 'Carousel height dynamic.' : 'Carousel height not dynamic.',
      className: "gridible-toggle--full-width"
    }));
  }
  function AutoplayControls(_ref8) {
    var _swiperConfig$autopla;
    var swiperConfig = _ref8.swiperConfig,
      setSwiperConfig = _ref8.setSwiperConfig;
    return /*#__PURE__*/React.createElement(ToolsPanelGroup, null, /*#__PURE__*/React.createElement(ToolsPanelHeading, {
      title: "Autoplay"
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      checked: !!swiperConfig.autoplay,
      onChange: function onChange(value) {
        if (!value) {
          setSwiperConfig({
            autoplay: false
          });
          return;
        }
        setSwiperConfig({
          autoplay: {
            delay: 5000
          }
        });
      },
      label: !!swiperConfig.autoplay ? 'Slides will move automatically.' : 'Slides will not move automatically.',
      className: "gridible-toggle--full-width"
    }), !!swiperConfig.autoplay && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ToolsPanelHeading, {
      title: "Slide Speed"
    }), /*#__PURE__*/React.createElement(wp.components.TextControl, {
      value: (_swiperConfig$autopla = swiperConfig.autoplay) === null || _swiperConfig$autopla === void 0 ? void 0 : _swiperConfig$autopla.delay,
      onChange: function onChange(value) {
        setSwiperConfig({
          autoplay: {
            delay: value
          }
        });
      },
      type: "number",
      step: "500",
      min: "500",
      max: "10000"
    })));
  }

  function Edit(_ref) {
    var _swiperConfig$navigat;
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      clientId = _ref.clientId;
    var _attributes$tagName = attributes.tagName,
      Tag = _attributes$tagName === void 0 ? 'div' : _attributes$tagName,
      swiperConfig = attributes.swiperConfig,
      carouselType = attributes.carouselType,
      visibility = attributes.visibility;
    var isNavigationToolsPanelEnabled = ((_swiperConfig$navigat = swiperConfig.navigation) === null || _swiperConfig$navigat === void 0 ? void 0 : _swiperConfig$navigat.enabled) === true || swiperConfig.allowTouchMove === true;
    var isStaticCarousel = carouselType === 'static';
    var slides = {
      mobile: swiperConfig.breakpoints[breakpointsToBreakpointKeysMap['Mobile']].slidesPerView,
      tablet: swiperConfig.breakpoints[breakpointsToBreakpointKeysMap['Tablet']].slidesPerView,
      desktop: swiperConfig.breakpoints[breakpointsToBreakpointKeysMap['Desktop']].slidesPerView
    };
    var baseClassName = "wp-block-gridible-".concat(carouselType, "-carousel-container");
    var className = clsx(vizOptionsToCssClasses(visibility), _defineProperty(_defineProperty(_defineProperty({}, "".concat(baseClassName, "--slides-mobile-").concat(slides.mobile), true), "".concat(baseClassName, "--slides-tablet-").concat(slides.tablet), true), "".concat(baseClassName, "--slides-desktop-").concat(slides.desktop), true));
    // console.debug('[Edit] className:', className, 'visibility:', visibility);

    var outerBlockProps = wp.blockEditor.useBlockProps({
      className: className
    });
    var innerBlockPropsArgs = isStaticCarousel ? {
      templateLock: false,
      templateInsertUpdatesSelection: true,
      orientation: 'horizontal',
      allowedBlocks: [slideBlockDef.name],
      renderAppender: function renderAppender() {
        return /*#__PURE__*/React.createElement(wp.blockEditor.ButtonBlockAppender, {
          rootClientId: clientId
        });
      },
      defaultBlock: {
        name: slideBlockDef.name,
        attributes: {}
      },
      directInsert: true
    } : {
      templateLock: false,
      templateInsertUpdatesSelection: false,
      orientation: 'horizontal',
      allowedBlocks: ['core/post-template'],
      renderAppender: function renderAppender() {
        return null;
      },
      directInsert: false
    };
    var innerBlockProps = wp.blockEditor.useInnerBlocksProps(outerBlockProps, innerBlockPropsArgs);

    // Custom SVG Icon
    var AddSlideIcon = /*#__PURE__*/React.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "24",
      height: "24",
      fill: "currentColor"
    }, /*#__PURE__*/React.createElement("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M11.1109 19C10.9951 19 10.8818 18.989 10.772 18.9681C9.9531 18.812 9.33315 18.1012 9.33315 17.25V6.75C9.33315 5.78477 10.1304 5 11.1109 5H18.222C19.2026 5 20 5.78477 20 6.75V17.25C20 18.2152 19.2028 19 18.2222 19H11.1109ZM6.66667 6.96875V17.0313C6.66667 17.3949 6.96389 17.6875 7.33333 17.6875C7.70278 17.6875 8 17.3949 8 17.0313V6.96875C8 6.60508 7.70278 6.3125 7.33333 6.3125C6.96389 6.3125 6.66667 6.60508 6.66667 6.96875ZM4 8.28125V15.7187C4 16.0824 4.29722 16.375 4.66667 16.375C5.03611 16.375 5.33333 16.0824 5.33333 15.7187V8.28125C5.33333 7.91758 5.03611 7.625 4.66667 7.625C4.29722 7.625 4 7.91758 4 8.28125ZM11.0859 6.125C10.7703 6.125 10.5145 6.37684 10.5145 6.6875V17.3075C10.5145 17.6182 10.7703 17.87 11.0859 17.87H18.3202C18.6358 17.87 18.8917 17.6182 18.8917 17.3075V6.6875C18.8917 6.37684 18.6358 6.125 18.3202 6.125H11.0859Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14.9463 9.34615V11.6538H17.2539C17.4414 11.6538 17.6001 11.8125 17.6001 12C17.6001 12.2019 17.4414 12.3462 17.2539 12.3462H14.9463V14.6538C14.9463 14.8558 14.7876 15 14.6001 15C14.3982 15 14.2539 14.8558 14.2539 14.6538V12.3462H11.9463C11.7443 12.3462 11.6001 12.2019 11.6001 12C11.6001 11.8125 11.7443 11.6538 11.9463 11.6538H14.2539V9.34615C14.2539 9.15865 14.3982 9 14.6001 9C14.7876 9 14.9463 9.15865 14.9463 9.34615Z"
    }));
    var addSlide = function addSlide() {
      var newSlideBlock = wp.blocks.createBlock(slideBlockDef.name, {});
      wp.data.dispatch('core/block-editor').insertBlocks(newSlideBlock,
      // Leave insertion index undefined, and the block will be added at 
      // the end of the block list.
      undefined,
      // Attaching to this container.
      clientId);
    };

    // console.debug('[Edit] attributes:', attributes);
    // console.debug('[Edit] swiperConfig:', swiperConfig);

    var setSwiperConfig = function setSwiperConfig(newConfig) {
      setAttributes({
        swiperConfig: M(swiperConfig, newConfig)
      });
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Tag, innerBlockProps), isStaticCarousel && /*#__PURE__*/React.createElement(wp.blockEditor.BlockControls, null, /*#__PURE__*/React.createElement(wp.components.ToolbarGroup, null, /*#__PURE__*/React.createElement(wp.components.ToolbarButton, {
      icon: AddSlideIcon,
      label: "+ Add Slide",
      onClick: addSlide
    }))), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(SlideLayoutControls, {
      swiperConfig: swiperConfig,
      setSwiperConfig: setSwiperConfig,
      visibilityBundle: attributes.visibility,
      setAttributes: setAttributes
    }), /*#__PURE__*/React.createElement(wp.components.__experimentalToolsPanel, {
      label: wp.i18n.__('Carousel Settings'),
      resetAll: function resetAll() {
        return setSwiperConfig({
          navigation: {
            enabled: false
          }
        });
      },
      className: "gridible-tools-panel",
      dropdownMenuProps: {
        // WARN: these values seem rather brittle.
        // Based on the values used by the stock Query block:
        // https://github.com/WordPress/gutenberg/blob/d0a190b65cebe27652e1a4d8d38a714d624e54ad/packages/block-library/src/utils/hooks.js#L92
        popoverProps: {
          placement: 'left-start',
          // For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
          offset: 259
        }
      }
    }, /*#__PURE__*/React.createElement(wp.components.__experimentalToolsPanelItem, {
      hasValue: function hasValue() {
        var _swiperConfig$paginat;
        return !!((_swiperConfig$paginat = swiperConfig.pagination) !== null && _swiperConfig$paginat !== void 0 && _swiperConfig$paginat.enabled);
      },
      label: wp.i18n.__('Slide Pagination'),
      onSelect: function onSelect() {
        return setSwiperConfig({
          pagination: {
            enabled: true
          }
        });
      },
      onDeselect: function onDeselect() {
        return setSwiperConfig({
          pagination: {
            enabled: false
          }
        });
      }
    }, /*#__PURE__*/React.createElement(PaginationControls, {
      swiperConfig: swiperConfig,
      setSwiperConfig: setSwiperConfig
    })), /*#__PURE__*/React.createElement(wp.components.__experimentalToolsPanelItem, {
      hasValue: function hasValue() {
        return isNavigationToolsPanelEnabled;
      },
      label: wp.i18n.__('Slide Navigation'),
      onSelect: function onSelect() {
        return setSwiperConfig({
          allowTouchMove: true,
          navigation: {
            enabled: true
          }
        });
      },
      onDeselect: function onDeselect() {
        return setSwiperConfig({
          allowTouchMove: false,
          navigation: {
            enabled: false
          }
        });
      }
    }, /*#__PURE__*/React.createElement(NavigationControls, {
      swiperConfig: swiperConfig,
      setSwiperConfig: setSwiperConfig
    })), /*#__PURE__*/React.createElement(wp.components.__experimentalToolsPanelItem, {
      hasValue: function hasValue() {
        return !!swiperConfig.loop;
      },
      label: wp.i18n.__('Loop'),
      onSelect: function onSelect() {
        return setSwiperConfig({
          loop: true
        });
      },
      onDeselect: function onDeselect() {
        return setSwiperConfig({
          loop: false
        });
      }
    }, /*#__PURE__*/React.createElement(LoopControls, {
      swiperConfig: swiperConfig,
      setSwiperConfig: setSwiperConfig
    })), /*#__PURE__*/React.createElement(wp.components.__experimentalToolsPanelItem, {
      hasValue: function hasValue() {
        return !!swiperConfig.autoHeight;
      },
      label: wp.i18n.__('Adaptive Height'),
      onSelect: function onSelect() {
        return setSwiperConfig({
          autoHeight: true
        });
      },
      onDeselect: function onDeselect() {
        return setSwiperConfig({
          autoHeight: false
        });
      }
    }, /*#__PURE__*/React.createElement(AdaptiveHeightControls, {
      swiperConfig: swiperConfig,
      setSwiperConfig: setSwiperConfig
    })), /*#__PURE__*/React.createElement(wp.components.__experimentalToolsPanelItem, {
      hasValue: function hasValue() {
        return !!swiperConfig.autoplay;
      },
      label: wp.i18n.__('Autoplay'),
      onSelect: function onSelect() {
        return setSwiperConfig({
          autoplay: {
            delay: 5000
          }
        });
      },
      onDeselect: function onDeselect() {
        return setSwiperConfig({
          autoplay: false
        });
      }
    }, /*#__PURE__*/React.createElement(AutoplayControls, {
      swiperConfig: swiperConfig,
      setSwiperConfig: setSwiperConfig
    })))));
  }

  var _excluded = ["tagName", "blockProps", "swiperConfig"];
  function Carousel(_ref) {
    var _swiperConfig$navigat, _swiperConfig$paginat;
    var Tag = _ref.tagName,
      blockProps = _ref.blockProps,
      swiperConfig = _ref.swiperConfig,
      restProps = _objectWithoutProperties(_ref, _excluded);
    var children = (blockProps === null || blockProps === void 0 ? void 0 : blockProps.children) !== undefined ? blockProps.children : restProps.children;
    var hasNavigation = ((_swiperConfig$navigat = swiperConfig.navigation) === null || _swiperConfig$navigat === void 0 ? void 0 : _swiperConfig$navigat.enabled) === true;
    var hasPagination = ((_swiperConfig$paginat = swiperConfig.pagination) === null || _swiperConfig$paginat === void 0 ? void 0 : _swiperConfig$paginat.enabled) === true;
    return /*#__PURE__*/React.createElement(Tag, _extends$3({}, blockProps, {
      "data-wp-interactive": "{ \"namespace\": \"gridibleCarousel\" }",
      "data-wp-init": "callbacks.init",
      "data-wp-context": JSON.stringify({
        swiperConfig: swiperConfig
      })
    }), children, hasNavigation && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      "class": "swiper-button-next"
    }), /*#__PURE__*/React.createElement("div", {
      "class": "swiper-button-prev"
    })), hasPagination && /*#__PURE__*/React.createElement("div", {
      "class": "swiper-pagination"
    }));
  }
  function Save(_ref2) {
    var _swiperConfig$paginat2, _swiperConfig$paginat3;
    var attributes = _ref2.attributes;
    var _attributes$tagName = attributes.tagName,
      tagName = _attributes$tagName === void 0 ? 'div' : _attributes$tagName,
      _attributes$carouselT = attributes.carouselType,
      carouselType = _attributes$carouselT === void 0 ? 'static' : _attributes$carouselT,
      swiperConfig = attributes.swiperConfig,
      visibility = attributes.visibility;
    var isStaticCarousel = carouselType === 'static';
    var isQueryCarousel = carouselType === 'query';
    var baseClassName = "wp-block-gridible-".concat(carouselType, "-carousel-container");
    var className = clsx(vizOptionsToCssClasses(visibility), "swiper", _defineProperty({}, "".concat(baseClassName, "--pagination-style-").concat(swiperConfig === null || swiperConfig === void 0 || (_swiperConfig$paginat2 = swiperConfig.pagination) === null || _swiperConfig$paginat2 === void 0 ? void 0 : _swiperConfig$paginat2.type), !!(swiperConfig !== null && swiperConfig !== void 0 && (_swiperConfig$paginat3 = swiperConfig.pagination) !== null && _swiperConfig$paginat3 !== void 0 && _swiperConfig$paginat3.type)));
    var outerBlockProps = wp.blockEditor.useBlockProps.save({
      className: className
    });
    if (isStaticCarousel) {
      var innerBlockProps = wp.blockEditor.useInnerBlocksProps.save({
        className: "swiper-wrapper"
      });
      return /*#__PURE__*/React.createElement(Carousel, {
        tagName: tagName,
        blockProps: outerBlockProps,
        swiperConfig: swiperConfig
      }, /*#__PURE__*/React.createElement("ul", innerBlockProps));
    } else if (isQueryCarousel) {
      var _innerBlockProps = wp.blockEditor.useInnerBlocksProps.save(outerBlockProps);
      return /*#__PURE__*/React.createElement(Carousel, {
        tagName: tagName,
        blockProps: _innerBlockProps,
        swiperConfig: swiperConfig
      });
    }

    // ...should not reach this point.
    return null;
  }

  var swiperBaseConfig = {
    slidesPerView: 1,
    spaceBetween: 32,
    autoHeight: true,
    loop: false,
    autoplay: false,
    allowTouchMove: true,
    navigation: {
      enabled: false,
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      enabled: true,
      type: 'bullets',
      el: ".swiper-pagination",
      clickable: true
    },
    // Responsive breakpoints
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      600: {
        slidesPerView: 2
      },
      1080: {
        slidesPerView: 3
      }
    }
  };
  function buildAttributes(carouselType) {
    var attributes = {
      carouselType: {
        type: "string",
        "default": carouselType
      },
      swiperConfigVersion: {
        type: 'string',
        "default": '1.0'
      },
      swiperConfig: {
        type: 'object',
        "default": swiperBaseConfig
      },
      tagName: {
        type: 'string',
        "default": 'div'
      },
      visibility: {
        type: 'object',
        "default": VISIBILITY_ATTRIBUTE
      }
    };
    return attributes;
  }

  wp.blocks.registerBlockType(blockDef$1, {
    icon: SvgIcon$1,
    edit: Edit,
    save: Save,
    attributes: buildAttributes('query')
  });

  var $schema = "https://schemas.wp.org/trunk/block.json";
  var apiVersion = 3;
  var title = "Carousel";
  var name = "gridible/static-carousel-container";
  var description = "Showcase images, text, or multimedia in a sleek, swipe-friendly slider, perfect for highlighting galleries, featured content, or promotions.";
  var category = "design";
  var allowedBlocks = [
  	"gridible/static-carousel-slide"
  ];
  var attributes = {
  	carouselType: {
  		type: "string",
  		"default": "static"
  	}
  };
  var providesContext = {
  	"gridible/carouselType": "carouselType"
  };
  var supports = {
  	anchor: true,
  	align: true,
  	ariaLabel: false,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: false,
  		text: false
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: false
  	},
  	layout: true,
  	multiple: true,
  	reusable: true,
  	position: false,
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: false
  	},
  	typography: false,
  	interactivity: true
  };
  var editorScript = "gridible-blocks/editor/script";
  var editorStyle = "gridible-blocks/editor/style";
  var style = "gridible-blocks/front/style";
  var blockDef = {
  	$schema: $schema,
  	apiVersion: apiVersion,
  	title: title,
  	name: name,
  	description: description,
  	category: category,
  	allowedBlocks: allowedBlocks,
  	attributes: attributes,
  	providesContext: providesContext,
  	supports: supports,
  	editorScript: editorScript,
  	editorStyle: editorStyle,
  	style: style
  };

  var _path;
  function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

  var SvgIcon = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _path || (_path = /*#__PURE__*/wp.element.createElement("path", {
      d: "M11.111 5c-.98 0-1.778.785-1.778 1.75v10.5c0 .965.798 1.75 1.778 1.75h7.111c.98 0 1.778-.785 1.778-1.75V6.75C20 5.785 19.203 5 18.222 5zM6.667 6.969V17.03a.66.66 0 0 0 .666.657A.66.66 0 0 0 8 17.03V6.97a.66.66 0 0 0-.667-.657.66.66 0 0 0-.666.657M4 8.28v7.438a.66.66 0 0 0 .667.656.66.66 0 0 0 .666-.656V8.28a.66.66 0 0 0-.666-.656.66.66 0 0 0-.667.656"
    })));
  };

  wp.blocks.registerBlockType(blockDef, {
    icon: SvgIcon,
    edit: Edit,
    save: Save,
    attributes: buildAttributes('static')
  });

  /**
   * Gutenberg Blocks
   *
   * All blocks related JavaScript files should be imported here.
   * You can create a new block folder in this dir and include code
   * for that block here as well.
   *
   * All blocks should be included here since this is the file that
   * Webpack is compiling as the input file.
   */

  console.log("[gridible] editor.js loaded");

})();
//# sourceMappingURL=editor.bundle.js.map
