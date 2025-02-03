(function () {
  'use strict';

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
    return "symbol" == typeof i ? i : String(i);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _extends$j() {
    _extends$j = Object.assign ? Object.assign.bind() : function (target) {
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
    return _extends$j.apply(this, arguments);
  }
  function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError("Cannot destructure " + obj);
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var QUERY_BLOCK_SLUG$3 = 'core/query';
  var DEFAULT_POST_EXCLUSION_METHOD = 'cache-friendly';
  var PostExclusionControls = function PostExclusionControls(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var _attributes$isCurrPos = attributes.isCurrPostExcluded,
      isCurrPostExcluded = _attributes$isCurrPos === void 0 ? false : _attributes$isCurrPos,
      _attributes$postExclu = attributes.postExclusionMethod,
      postExclusionMethod = _attributes$postExclu === void 0 ? DEFAULT_POST_EXCLUSION_METHOD : _attributes$postExclu;
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Excluded Posts"
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: "Exclude Current Post?",
      help: isCurrPostExcluded ? 'Current post is excluded from query results.' : 'Current post could be included in query results.',
      checked: isCurrPostExcluded,
      onChange: function onChange(newValue) {
        setAttributes({
          isCurrPostExcluded: newValue
        });
      }
    })), /*#__PURE__*/React.createElement(wp.components.PanelRow, null, isCurrPostExcluded && /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Post Exclusion Method",
      value: postExclusionMethod,
      options: [{
        label: 'Cache-Friendly',
        value: 'cache-friendly'
      }, {
        label: 'Pagination-Friendly',
        value: 'pagination-friendly'
      }],
      onChange: function onChange(value) {
        return setAttributes({
          postExclusionMethod: value
        });
      },
      help: postExclusionMethod === 'cache-friendly' ? 'The query will run quickly and be cache-friendly, but the post exclusion algorithm will interfere with pagination results, and could result in duplicates.' : 'The query will be significantly slower and site performance will degrade, but the post exclusion algorithm will not interfere with pagination results.'
    })));
  };
  var withExtraControls$4 = function withExtraControls(BlockEdit) {
    return function (props) {
      var name = props.name;
      if (name !== QUERY_BLOCK_SLUG$3) {
        return /*#__PURE__*/React.createElement(BlockEdit, props);
      }
      var conditionalControls = /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(PostExclusionControls, props));

      // Hide controls if we detect a variation. Assume those variations
      // override the queried posts and make the exclude post control unnecessary.
      // if (typeof props.attributes?.namespace === 'string') {
      //   conditionalControls = null;
      // }

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), conditionalControls);
    };
  };
  wp.hooks.addFilter('editor.BlockEdit', QUERY_BLOCK_SLUG$3, withExtraControls$4);
  wp.hooks.addFilter('blocks.registerBlockType', 'mbm/query-loop-exclude-post-query', function (settings, name) {
    if (name !== QUERY_BLOCK_SLUG$3) {
      return settings;
    }
    return _objectSpread2(_objectSpread2({}, settings), {}, {
      attributes: _objectSpread2(_objectSpread2({}, settings.attributes), {}, {
        isCurrPostExcluded: {
          type: 'boolean',
          "default": false
        },
        postExclusionMethod: {
          type: 'string',
          "default": DEFAULT_POST_EXCLUSION_METHOD
        }
      })
    });
  });

  var QUERY_BLOCK_SLUG$2 = 'core/query';
  var VARIATION_NAME$7 = 'mbm/single-post-query';
  var isVariation$3 = function isVariation(props) {
    var namespace = props.attributes.namespace;
    return namespace && namespace === VARIATION_NAME$7;
  };
  var PostSelector = function PostSelector(_ref) {
    var _postType$labels;
    var _ref$selected = _ref.selected,
      selected = _ref$selected === void 0 ? null : _ref$selected,
      _ref$onSelect = _ref.onSelect,
      onSelect = _ref$onSelect === void 0 ? function () {
        return undefined;
      } : _ref$onSelect,
      postTypeSlug = _ref.postTypeSlug;
    var _useState = wp.element.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];
    var postTypes = wp.data.useSelect(function (select) {
      return select('core').getPostTypes();
    });
    var postType = postTypes ? postTypes.find(function (postType) {
      return postType.slug === postTypeSlug;
    }) : null;
    var postTypeSingularName = (postType === null || postType === void 0 || (_postType$labels = postType.labels) === null || _postType$labels === void 0 ? void 0 : _postType$labels.singular_name) || 'Post';
    var postTypePluralName = (postType === null || postType === void 0 ? void 0 : postType.name) || 'Posts';
    var _useSelect = wp.data.useSelect(function (select) {
        var _select = select('core'),
          getEntityRecords = _select.getEntityRecords;

        // Post query args
        var query = {
          status: 'publish',
          per_page: 50,
          search: searchTerm
        };
        return {
          pages: getEntityRecords('postType', postTypeSlug, query)
        };
      }),
      pages = _useSelect.pages;
    var noSelectionValue = 0;
    var options = [];
    if (pages) {
      options.push({
        value: noSelectionValue,
        label: "None selected"
      });
      pages.forEach(function (page) {
        options.push({
          value: page.id,
          label: page.title.rendered
        });
      });
    } else {
      options.push({
        value: noSelectionValue,
        label: 'Loading...',
        disabled: true
      });
    }
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.components.TextControl, {
      label: "Filter ".concat(postTypePluralName),
      value: searchTerm,
      onChange: setSearchTerm
    }), /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Select a ".concat(postTypeSingularName),
      options: options,
      value: selected,
      onChange: function onChange(newId) {
        if (newId === noSelectionValue) {
          onSelect(undefined);
        } else {
          onSelect(newId);
        }
      }
    }));
  };
  var PostSelectionControls$1 = function PostSelectionControls(_ref2) {
    var _query$include, _attributes$query;
    var attributes = _ref2.attributes,
      setAttributes = _ref2.setAttributes;
    var query = attributes.query;
    var selected = (_query$include = query.include) === null || _query$include === void 0 ? void 0 : _query$include.find(function (element) {
      return element !== undefined;
    });
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Post Selection"
    }, /*#__PURE__*/React.createElement(PostSelector, {
      selected: selected,
      postTypeSlug: attributes === null || attributes === void 0 || (_attributes$query = attributes.query) === null || _attributes$query === void 0 ? void 0 : _attributes$query.postType,
      onSelect: function onSelect(newId) {
        var include = newId == null ? null : [newId];
        setAttributes({
          query: _objectSpread2(_objectSpread2({}, query), {}, {
            include: include
          })
        });
      }
    }));
  };
  var withExtraControls$3 = function withExtraControls(BlockEdit) {
    return function (props) {
      return isVariation$3(props) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(PostSelectionControls$1, props))) : /*#__PURE__*/React.createElement(BlockEdit, props);
    };
  };
  wp.hooks.addFilter('editor.BlockEdit', QUERY_BLOCK_SLUG$2, withExtraControls$3);
  wp.blocks.registerBlockVariation(QUERY_BLOCK_SLUG$2, {
    name: VARIATION_NAME$7,
    title: 'Single Post Query',
    description: "This block is deprecated! Please use the Selected Post Query block instead.",
    // description: `Selects a single post or page.`,
    isActive: ['namespace'],
    scope: [],
    attributes: {
      namespace: VARIATION_NAME$7,
      query: {
        perPage: 1,
        postType: 'post',
        inherit: false,
        include: null
      }
    },
    // allowedControls: [],

    innerBlocks: [['core/post-template', {}, [['core/post-title']]]]
  });

  var postTypePluralName = function postTypePluralName(postType) {
    return (postType === null || postType === void 0 ? void 0 : postType.name) || 'Posts';
  };
  var FormTokenPostSelector = function FormTokenPostSelector(_ref) {
    var selected = _ref.selected,
      onSelect = _ref.onSelect,
      postType = _ref.postType;
    var _useState = wp.element.useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      searchTerm = _useState2[0],
      setSearchTerm = _useState2[1];

    // Selected post query args
    var selectedQuery = {
      status: 'publish',
      // No limits on the number of posts selected.
      per_page: -1,
      include: selected,
      // If `include` is empty, then orderby:include will cause an error.
      orderby: selected.length === 0 ? 'date' : 'include'
    };
    var _useEntityRecords = wp.coreData.useEntityRecords('postType', postType.slug, selectedQuery),
      selectedPosts = _useEntityRecords.records;
    if (!Array.isArray(selectedPosts)) {
      selectedPosts = [];
    }

    // Suggestion post query args
    var suggestionsQuery = {
      status: 'publish',
      per_page: 50,
      search: searchTerm,
      exclude: selected
    };
    var _useEntityRecords2 = wp.coreData.useEntityRecords('postType', postType.slug, suggestionsQuery),
      suggestionsPosts = _useEntityRecords2.records;
    if (!Array.isArray(suggestionsPosts)) {
      suggestionsPosts = [];
    }
    var suggestionsPostsTitles = suggestionsPosts.map(function (post) {
      var _post$title;
      return post === null || post === void 0 || (_post$title = post.title) === null || _post$title === void 0 ? void 0 : _post$title.raw;
    });
    var displayTransform = function displayTransform(postIdOrTitle) {
      var displayValue = postIdOrTitle;

      // If we have a post ID, try to find the post title.
      // Otherwise we're assuming it's a title string.
      if (Number.isInteger(postIdOrTitle)) {
        var _post$title2;
        var post = selectedPosts.find(function (post) {
          return post.id === postIdOrTitle;
        });
        displayValue = post === null || post === void 0 || (_post$title2 = post.title) === null || _post$title2 === void 0 ? void 0 : _post$title2.raw;
      }
      return displayValue || 'N/A';
    };
    var onChangeHandler = function onChangeHandler(tokens) {
      // WARN: CNTI identified possible bug here.
      // console.log(`[SelectedPostQuery] tokens:`, tokens, `suggestionsPosts:`, suggestionsPosts, `selectedPosts:`, selectedPosts);

      var newPosts = new Set();
      var _iterator = _createForOfIteratorHelper(tokens),
        _step;
      try {
        var _loop = function _loop() {
          var newPost = _step.value;
          if (Number.isInteger(newPost)) {
            // Already a post ID, directly add to set
            newPosts.add(newPost);
          } else if (typeof newPost === 'string') {
            var normalizeTitle = function normalizeTitle(title) {
              if (typeof title !== 'string') {
                return '';
              }
              return title.trim().toLowerCase();
            };
            var normalizedNewPostTitle = normalizeTitle(newPost);
            var post = suggestionsPosts.find(function (post) {
              var _post$title3, _post$title4;
              var postTitleRaw = normalizeTitle(post === null || post === void 0 || (_post$title3 = post.title) === null || _post$title3 === void 0 ? void 0 : _post$title3.raw);
              var postTitleRendered = normalizeTitle(post === null || post === void 0 || (_post$title4 = post.title) === null || _post$title4 === void 0 ? void 0 : _post$title4.rendered);
              return postTitleRaw === normalizedNewPostTitle || postTitleRendered === normalizedNewPostTitle;
            });
            if (post !== null && post !== void 0 && post.id) {
              newPosts.add(post.id);
            } else {
              console.error("[SelectedPostQuery] Could not find suggested post with title: ".concat(newPost));
            }
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }

        // console.log(`[SelectedPostQuery] newPosts:`, newPosts);
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      onSelect(newPosts);
    };
    var onInputChangeHandler = function onInputChangeHandler(searchInput) {
      setSearchTerm(searchInput);
    };
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.components.FormTokenField, {
      label: "Select ".concat(postTypePluralName(postType), " To Feature"),
      value: selected,
      suggestions: suggestionsPostsTitles,
      displayTransform: displayTransform,
      onChange: onChangeHandler,
      onInputChange: onInputChangeHandler,
      __experimentalShowHowTo: false
    }));
  };
  var PostSelectionControls = function PostSelectionControls(_ref2) {
    var attributes = _ref2.attributes,
      setAttributes = _ref2.setAttributes;
    var query = attributes.query;
    var selected = Array.isArray(query.include) ? query.include : [];
    var randomizeResults = (query === null || query === void 0 ? void 0 : query.randomizeResults) || false;
    var postTypes = wp.data.useSelect(function (select) {
      return select('core').getPostTypes({
        per_page: -1
      });
    });
    var postTypeSlug = query === null || query === void 0 ? void 0 : query.postType;
    var postType = postTypes ? postTypes.find(function (postType) {
      return postType.slug === postTypeSlug;
    }) : null;
    var hasPostType = postType != null;
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Post Selection"
    }, hasPostType && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormTokenPostSelector, {
      selected: selected,
      postType: postType,
      onSelect: function onSelect(newIds) {
        var include = _toConsumableArray(newIds);
        setAttributes({
          query: _objectSpread2(_objectSpread2({}, query), {}, {
            include: include,
            orderby: include.length > 0 ? 'include' : 'date'
          })
        });
      }
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: "Randomize Results",
      help: randomizeResults ? 'Guests will see randomized results.' : "".concat(postTypePluralName(postType), " will be shown in the order selected."),
      checked: randomizeResults,
      onChange: function onChange(randomizeResults) {
        setAttributes({
          query: _objectSpread2(_objectSpread2({}, query), {}, {
            randomizeResults: randomizeResults
          })
        });
      }
    })), !hasPostType && /*#__PURE__*/React.createElement("p", null, "Loading..."));
  };

  var QUERY_BLOCK_SLUG$1 = 'core/query';
  var VARIATION_NAME$6 = 'mbm/selected-post-query';
  var isVariation$2 = function isVariation(props) {
    var namespace = props.attributes.namespace;
    return namespace && namespace === VARIATION_NAME$6;
  };
  var withExtraControls$2 = function withExtraControls(BlockEdit) {
    return function (props) {
      return isVariation$2(props) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(PostSelectionControls, props))) : /*#__PURE__*/React.createElement(BlockEdit, props);
    };
  };
  wp.hooks.addFilter('editor.BlockEdit', QUERY_BLOCK_SLUG$1, withExtraControls$2);
  wp.blocks.registerBlockVariation(QUERY_BLOCK_SLUG$1, {
    name: VARIATION_NAME$6,
    title: 'Selected Post Query',
    description: "Retrieve a select list of posts.",
    isActive: ['namespace'],
    attributes: {
      namespace: VARIATION_NAME$6,
      query: {
        // perPage: 1,
        postType: 'post',
        inherit: false,
        include: [],
        // This must be `date`, not `include`, or the initial rendering fails.
        orderby: 'date',
        randomizeResults: false
      }
    },
    // allowedControls: [],

    innerBlocks: [['core/post-template', {}, [['core/post-title']]]]
  });

  var disallowedTaxonomies = ['nav_menu', 'wp_pattern_category'];
  var TaxonomyControls = function TaxonomyControls(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var taxonomySlug = attributes.taxonomySlug,
      includeChildren = attributes.includeChildren,
      includeParents = attributes.includeParents;

    // Determine the type of entity being edited
    var post = wp.data.useSelect(function (select) {
      return select(wp.editor.store).getCurrentPost();
    }, []);

    // Get all registered taxonomies
    var taxonomies = wp.data.useSelect(function (select) {
      return select(wp.coreData.store).getTaxonomies();
    }, []);
    var isTemplate = (post === null || post === void 0 ? void 0 : post.type) === 'wp_template' && (post === null || post === void 0 ? void 0 : post.template) === undefined;
    var fullSlug = post.slug;
    var slug = fullSlug.replace(/^tag(\-)?/, 'post_tag$1').replace(/^taxonomy\-/, '');
    var isTaxonomyArchive = false;
    var templateTaxonomy = null;

    // If the current post is a template, then determine if the template is for a taxonomy archive.
    if (isTemplate) {
      templateTaxonomy = taxonomies.find(function (taxonomy) {
        // Return true if the current post slug begins with the taxonomy slug.
        return slug.startsWith(taxonomy.slug);
      });
      if (templateTaxonomy) {
        isTaxonomyArchive = true;
        taxonomySlug = templateTaxonomy.slug;
      }
    }

    // Filter the taxonomies to only include those that are not disallowed, 
    // and map them to select options.
    var taxonomyOptions = isTaxonomyArchive ? [templateTaxonomy] : taxonomies;
    taxonomyOptions = taxonomyOptions.filter(function (taxonomy) {
      return !disallowedTaxonomies.includes(taxonomy.slug);
    }).map(function (taxonomy) {
      return {
        label: taxonomy.name,
        value: taxonomy.slug
      };
    });

    // Find the selected taxonomy, and determine if it is hierarchical.
    var selectedTaxonomy = taxonomies.find(function (taxonomy) {
      return taxonomy.slug === taxonomySlug;
    });
    var isHierarchical = (selectedTaxonomy === null || selectedTaxonomy === void 0 ? void 0 : selectedTaxonomy.hierarchical) === true;
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Related Posts Taxonomy"
    }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Taxonomy",
      value: taxonomySlug,
      options: taxonomyOptions,
      onChange: function onChange(value) {
        return setAttributes({
          taxonomySlug: value
        });
      }
    }), isHierarchical && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: "Include Parent Terms",
      help: includeParents ? 'Posts belonging to parent terms will be included in the query.' : "Parent terms will not be included in the query.",
      checked: includeParents,
      onChange: function onChange(value) {
        return setAttributes({
          includeParents: value
        });
      }
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: "Include Child Terms",
      help: includeChildren ? 'Posts belonging to child terms will be included in the query.' : "Child terms will not be included in the query.",
      checked: includeChildren,
      onChange: function onChange(value) {
        return setAttributes({
          includeChildren: value
        });
      }
    })));
  };

  var QUERY_BLOCK_SLUG = 'core/query';
  var VARIATION_NAME$5 = 'amplify/related-posts-query';
  var isVariation$1 = function isVariation(props) {
    var namespace = props.attributes.namespace;
    return namespace && namespace === VARIATION_NAME$5;
  };
  var withExtraControls$1 = function withExtraControls(BlockEdit) {
    return function (props) {
      if (!isVariation$1(props)) return /*#__PURE__*/React.createElement(BlockEdit, props);

      // console.log(`[withExtraControls] attributes:`, props.attributes)
      // console.log(`[withExtraControls] context:`, props.context)

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), props.isSelected && /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(TaxonomyControls, props)));
    };
  };
  wp.hooks.addFilter('editor.BlockEdit', QUERY_BLOCK_SLUG, withExtraControls$1);
  wp.blocks.registerBlockVariation(QUERY_BLOCK_SLUG, {
    name: VARIATION_NAME$5,
    title: 'Related Post Query',
    description: "Retrieve a select list of posts related to the current post. Currently, this block is meant to be used on the single post template and no where else.",
    isActive: ['namespace'],
    attributes: {
      namespace: VARIATION_NAME$5,
      query: {
        postType: 'post',
        inherit: false,
        orderby: 'date'
      },
      // Our own default taxonomy configuration.
      taxonomySlug: 'category',
      includeChildren: true,
      includeParents: true
    },
    // allowedControls: [],

    innerBlocks: [['core/post-template', {}, [['core/post-title']]]]
  });

  var BUTTON_BLOCK$2 = 'core/button';
  var VARIATION_NAME$4 = 'query-filter-reset-button';
  var FORM_ROLE$2 = 'reset';
  wp.blocks.registerBlockVariation(BUTTON_BLOCK$2, {
    name: VARIATION_NAME$4,
    title: 'Query Filter Reset Button',
    attributes: {
      queryFilterForm_role: FORM_ROLE$2,
      text: 'Reset'
    },
    isActive: function isActive(blockAttributes, variationAttributes) {
      return blockAttributes.queryFilterForm_role === FORM_ROLE$2;
    }
  });
  wp.hooks.addFilter('blocks.registerBlockType', "".concat(BUTTON_BLOCK$2, "/").concat(VARIATION_NAME$4), function (settings, name) {
    if (name !== BUTTON_BLOCK$2) {
      return settings;
    }
    return _objectSpread2(_objectSpread2({}, settings), {}, {
      attributes: _objectSpread2(_objectSpread2({}, settings.attributes), {}, {
        queryFilterForm_role: {
          type: 'string',
          "default": ''
        }
      })
    });
  });

  var _path$h, _path2$1;
  function _extends$i() { _extends$i = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$i.apply(this, arguments); }

  var SvgIcon$i = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$i({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$h || (_path$h = /*#__PURE__*/wp.element.createElement("path", {
      d: "M5.303 5C4.584 5 4 5.584 4 6.303c0 .3.103.59.294.822l5.206 6.39v1.994c0 .382.172.741.472.979l2.347 1.862a5.5 5.5 0 0 1-.31-2.163l-1.009-.8V13.25c0-.175-.06-.34-.169-.475L5.72 6.5h12.603l-2.193 3h1.857l1.76-2.41A1.314 1.314 0 0 0 18.685 5z",
      clipRule: "evenodd"
    })), _path2$1 || (_path2$1 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M18.071 16.938H15.93v-.706h2.142zm0-4.47H15.93v-.706h2.142zm-3.214-2.118h4.286c.473 0 .857.421.857.941v1.647c0 .52-.384.941-.857.941h-4.286c-.473 0-.857-.421-.857-.94V11.29c0-.52.384-.941.857-.941m4.286.706h-4.286c-.118 0-.214.105-.214.235v1.647c0 .13.096.236.214.236h4.286c.118 0 .214-.106.214-.236v-1.647c0-.13-.096-.235-.214-.235m-4.286 3.765h4.286c.473 0 .857.42.857.94v1.648c0 .52-.384.941-.857.941h-4.286c-.473 0-.857-.421-.857-.941v-1.647c0-.52.384-.941.857-.941m4.286.705h-4.286c-.118 0-.214.106-.214.236v1.647c0 .13.096.235.214.235h4.286c.118 0 .214-.105.214-.235v-1.647c0-.13-.096-.236-.214-.236"
    })));
  };

  var BUTTON_BLOCK$1 = 'core/button';
  var VARIATION_NAME$3 = 'query-filter-submit-button';
  var FORM_ROLE$1 = 'submit';
  wp.blocks.registerBlockVariation(BUTTON_BLOCK$1, {
    name: VARIATION_NAME$3,
    title: 'Query Filter Submit Button',
    icon: SvgIcon$i,
    attributes: {
      queryFilterForm_role: FORM_ROLE$1,
      amplifyVariation: VARIATION_NAME$3,
      text: 'Submit'
    },
    isActive: ['amplifyVariation', 'queryFilterForm_role']
  });
  wp.hooks.addFilter('blocks.registerBlockType', "".concat(BUTTON_BLOCK$1, "/").concat(VARIATION_NAME$3), function (settings, name) {
    if (name !== BUTTON_BLOCK$1) {
      return settings;
    }
    return _objectSpread2(_objectSpread2({}, settings), {}, {
      attributes: _objectSpread2(_objectSpread2({}, settings.attributes), {}, {
        amplifyVariation: {
          type: 'string',
          "default": null
        },
        queryFilterForm_role: {
          type: 'string',
          "default": ''
        }
      })
    });
  });

  var _path$g, _path2;
  function _extends$h() { _extends$h = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$h.apply(this, arguments); }

  var SvgIcon$h = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$h({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$g || (_path$g = /*#__PURE__*/wp.element.createElement("path", {
      d: "M5.303 5C4.584 5 4 5.584 4 6.303c0 .3.103.59.294.822l5.206 6.39v1.994c0 .382.172.741.472.979l2.347 1.862a5.5 5.5 0 0 1-.31-2.163l-1.009-.8V13.25c0-.175-.06-.34-.169-.475L5.72 6.5h12.603l-2.193 3h1.857l1.76-2.41A1.314 1.314 0 0 0 18.685 5z",
      clipRule: "evenodd"
    })), _path2 || (_path2 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M18.071 16.938H15.93v-.706h2.142zm0-4.47H15.93v-.706h2.142zm-3.214-2.118h4.286c.473 0 .857.421.857.941v1.647c0 .52-.384.941-.857.941h-4.286c-.473 0-.857-.421-.857-.94V11.29c0-.52.384-.941.857-.941m4.286.706h-4.286c-.118 0-.214.105-.214.235v1.647c0 .13.096.236.214.236h4.286c.118 0 .214-.106.214-.236v-1.647c0-.13-.096-.235-.214-.235m-4.286 3.765h4.286c.473 0 .857.42.857.94v1.648c0 .52-.384.941-.857.941h-4.286c-.473 0-.857-.421-.857-.941v-1.647c0-.52.384-.941.857-.941m4.286.705h-4.286c-.118 0-.214.106-.214.236v1.647c0 .13.096.235.214.235h4.286c.118 0 .214-.105.214-.235v-1.647c0-.13-.096-.236-.214-.236"
    })));
  };

  var ROOT_BLOCK = 'core/buttons';
  var VARIATION_NAME$2 = 'query-filter-buttons';
  wp.blocks.registerBlockVariation(ROOT_BLOCK, {
    name: VARIATION_NAME$2,
    title: 'Query Filter Buttons',
    icon: SvgIcon$h,
    attributes: {
      amplifyVariation: VARIATION_NAME$2
    },
    isActive: ['amplifyVariation'],
    innerBlocks: [["core/button", {
      queryFilterForm_role: 'submit',
      amplifyVariation: 'query-filter-submit-button',
      text: 'Submit'
    }]]
  });
  wp.hooks.addFilter('blocks.registerBlockType', "".concat(ROOT_BLOCK, "/").concat(VARIATION_NAME$2), function (settings, name) {
    if (name !== ROOT_BLOCK) {
      return settings;
    }
    return _objectSpread2(_objectSpread2({}, settings), {}, {
      attributes: _objectSpread2(_objectSpread2({}, settings.attributes), {}, {
        amplifyVariation: {
          type: 'string',
          "default": null
        }
      })
    });
  });

  var BUTTON_BLOCK = 'core/button';
  var VARIATION_NAME$1 = 'query-filter-clear-button';
  var FORM_ROLE = 'clear';
  wp.blocks.registerBlockVariation(BUTTON_BLOCK, {
    name: VARIATION_NAME$1,
    title: 'Query Filter Clear Button',
    attributes: {
      queryFilterForm_role: FORM_ROLE,
      text: 'Clear'
    },
    isActive: function isActive(blockAttributes, variationAttributes) {
      return blockAttributes.queryFilterForm_role === FORM_ROLE;
    }
  });
  wp.hooks.addFilter('blocks.registerBlockType', "".concat(BUTTON_BLOCK, "/").concat(VARIATION_NAME$1), function (settings, name) {
    if (name !== BUTTON_BLOCK) {
      return settings;
    }
    return _objectSpread2(_objectSpread2({}, settings), {}, {
      attributes: _objectSpread2(_objectSpread2({}, settings.attributes), {}, {
        queryFilterForm_role: {
          type: 'string',
          "default": ''
        }
      })
    });
  });

  var $schema$c = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$c = 3;
  var title$c = "Accordion";
  var name$c = "mbm/innerblock-accordion";
  var category$c = "design";
  var attributes$6 = {
  	isDefaultOpen: {
  		type: "boolean",
  		"default": false
  	}
  };
  var supports$c = {
  	anchor: true,
  	align: true,
  	ariaLabel: false,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: true
  	},
  	layout: true,
  	multiple: true,
  	reusable: true,
  	position: {
  		sticky: true
  	},
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: true
  	},
  	typography: {
  		fontSize: true,
  		lineHeight: true
  	},
  	interactivity: true
  };
  var editorScript$b = "mbm-gutenblocks/editor/script";
  var editorStyle$b = "mbm-gutenblocks/editor/style";
  var style$b = "mbm-gutenblocks/front/style";
  var blockDef$b = {
  	$schema: $schema$c,
  	apiVersion: apiVersion$c,
  	title: title$c,
  	name: name$c,
  	category: category$c,
  	attributes: attributes$6,
  	supports: supports$c,
  	editorScript: editorScript$b,
  	editorStyle: editorStyle$b,
  	style: style$b
  };

  var $schema$b = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$b = 3;
  var title$b = "Accordion Content";
  var name$b = "mbm/innerblock-accordion-body";
  var category$b = "design";
  var parent$3 = [
  	"mbm/innerblock-accordion"
  ];
  var supports$b = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: true
  	},
  	layout: false,
  	multiple: true,
  	reusable: true,
  	position: {
  		sticky: true
  	},
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: true
  	},
  	typography: {
  		fontSize: true,
  		lineHeight: true
  	},
  	interactivity: true
  };
  var editorScript$a = "mbm-gutenblocks/editor/script";
  var editorStyle$a = "mbm-gutenblocks/editor/style";
  var style$a = "mbm-gutenblocks/front/style";
  var blockDef$a = {
  	$schema: $schema$b,
  	apiVersion: apiVersion$b,
  	title: title$b,
  	name: name$b,
  	category: category$b,
  	parent: parent$3,
  	supports: supports$b,
  	editorScript: editorScript$a,
  	editorStyle: editorStyle$a,
  	style: style$a
  };

  var $schema$a = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$a = 3;
  var title$a = "Accordion Title";
  var name$a = "mbm/innerblock-accordion-title";
  var category$a = "design";
  var parent$2 = [
  	"mbm/innerblock-accordion"
  ];
  var supports$a = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: true
  	},
  	layout: false,
  	multiple: true,
  	reusable: true,
  	position: {
  		sticky: true
  	},
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: true
  	},
  	typography: {
  		fontSize: true,
  		lineHeight: true
  	},
  	interactivity: true
  };
  var editorScript$9 = "mbm-gutenblocks/editor/script";
  var editorStyle$9 = "mbm-gutenblocks/editor/style";
  var style$9 = "mbm-gutenblocks/front/style";
  var blockDef$9 = {
  	$schema: $schema$a,
  	apiVersion: apiVersion$a,
  	title: title$a,
  	name: name$a,
  	category: category$a,
  	parent: parent$2,
  	supports: supports$a,
  	editorScript: editorScript$9,
  	editorStyle: editorStyle$9,
  	style: style$9
  };

  var slugs = {
    body: blockDef$a.name,
    title: blockDef$9.name,
    accordion: blockDef$b.name
  };

  var _path$f;
  function _extends$g() { _extends$g = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$g.apply(this, arguments); }

  var SvgIcon$g = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$g({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      "aria-hidden": "true"
    }, props), _path$f || (_path$f = /*#__PURE__*/wp.element.createElement("path", {
      d: "M18 8H6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2m.5 6c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5zM4 4v1.5h16V4zm0 16h16v-1.5H4z"
    })));
  };

  var editTemplate$5 = [[slugs.title, {}], [slugs.body, {}]];
  function Edit$8(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var isDefaultOpen = attributes.isDefaultOpen;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      initialOpen: true
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: isDefaultOpen ? wp.i18n.__('Initially open') : wp.i18n.__('Initially closed'),
      help: isDefaultOpen ? wp.i18n.__('Accordion is open when page loads.') : wp.i18n.__('Accordion is collapsed when page loads.'),
      checked: isDefaultOpen,
      onChange: function onChange(value) {
        return setAttributes({
          isDefaultOpen: value
        });
      }
    })))), /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps(), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: editTemplate$5,
      templateLock: "all"
    })));
  }
  function Save$8(_ref2) {
    var attributes = _ref2.attributes;
    var isDefaultOpen = attributes.isDefaultOpen;
    var blockProps = wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save({
      'open': isDefaultOpen
    }));
    return /*#__PURE__*/React.createElement("details", blockProps);
  }
  wp.blocks.registerBlockType(blockDef$b, {
    icon: SvgIcon$g,
    edit: Edit$8,
    save: Save$8
  });

  var _path$e;
  function _extends$f() { _extends$f = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$f.apply(this, arguments); }

  var SvgIcon$f = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$f({
      xmlns: "https://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      "aria-hidden": "true"
    }, props), _path$e || (_path$e = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4 20h16v-1.5H4zm0-4.8h16v-1.5H4zm0-6.4v1.5h16V8.8zM16 4H4v1.5h12z"
    })));
  };

  var editTemplate$4 = [['core/paragraph', {
    placeholder: 'Accordion body content...'
  }]];
  function Edit$7() {
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps(), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: editTemplate$4,
      templateLock: false
    }));
  }
  function Save$7() {
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()));
  }
  wp.blocks.registerBlockType(blockDef$a, {
    icon: SvgIcon$f,
    edit: Edit$7,
    save: Save$7
  });

  var _path$d;
  function _extends$e() { _extends$e = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$e.apply(this, arguments); }

  var SvgIcon$e = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$e({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      "aria-hidden": "true"
    }, props), _path$d || (_path$d = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4 14.5h16V16H4zm0 4h9V20H4zM4 4h3q3 0 3 2.583 0 1.337-.76 1.988-.758.652-2.204.652H5.542V12H4zm2.855 4q.796 0 1.18-.343.398-.342.398-1.051 0-.71-.397-1.04-.397-.343-1.217-.343H5.542V8z"
    })));
  };

  var titleBlockClass = "wp-block-mbm-innerblock-accordion-title";
  var iconClass$1 = "".concat(titleBlockClass, "__icon");
  var iconBlockSlug = "outermost/icon-block";
  var editTemplate$3 = [
  // Make H4 by default
  ['core/heading', {
    level: 4,
    placeholder: 'Accordion Title'
  }], [iconBlockSlug, {
    iconName: 'wordpress-plusCircle',
    className: "".concat(iconClass$1, "--open"),
    metadata: {
      name: "Open Icon"
    }
  }], [iconBlockSlug, {
    iconName: 'wordpress-cancelCircleFilled',
    className: "".concat(iconClass$1, "--closed"),
    metadata: {
      name: "Close Icon"
    }
  }]];
  function Edit$6() {
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps(), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: editTemplate$3,
      templateLock: "all"
    }));
  }
  function Save$6() {
    return /*#__PURE__*/React.createElement("summary", wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()));
  }
  wp.blocks.registerBlockType(blockDef$9, {
    icon: SvgIcon$e,
    edit: Edit$6,
    save: Save$6
  });

  var $schema$9 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$9 = 3;
  var title$9 = "Query Result Count";
  var name$9 = "mbm/query-result-count";
  var description$9 = "";
  var category$9 = "design";
  var attributes$5 = {
  };
  var ancestor$4 = [
  	"core/query"
  ];
  var usesContext$3 = [
  	"query",
  	"queryId"
  ];
  var supports$9 = {
  	anchor: true,
  	align: true,
  	ariaLabel: false,
  	className: true,
  	color: {
  		background: false,
  		gradients: false,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: false
  	},
  	layout: false,
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
  	typography: {
  		fontSize: true,
  		lineHeight: true,
  		__experimentalFontFamily: true,
  		__experimentalFontStyle: true,
  		__experimentalFontWeight: true,
  		__experimentalLetterSpacing: true,
  		__experimentalTextTransform: true,
  		__experimentalTextDecoration: true,
  		__experimentalWritingMode: true,
  		__experimentalDefaultControls: {
  			fontSize: true,
  			fontAppearance: true,
  			textTransform: true
  		}
  	},
  	interactivity: true
  };
  var render$3 = "file:./render.php";
  var editorScript$8 = "mbm-gutenblocks/editor/script";
  var editorStyle$8 = "mbm-gutenblocks/editor/style";
  var style$8 = "mbm-gutenblocks/front/style";
  var blockDef$8 = {
  	$schema: $schema$9,
  	apiVersion: apiVersion$9,
  	title: title$9,
  	name: name$9,
  	description: description$9,
  	category: category$9,
  	attributes: attributes$5,
  	ancestor: ancestor$4,
  	usesContext: usesContext$3,
  	supports: supports$9,
  	render: render$3,
  	editorScript: editorScript$8,
  	editorStyle: editorStyle$8,
  	style: style$8
  };

  var _path$c;
  function _extends$d() { _extends$d = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$d.apply(this, arguments); }

  var SvgIcon$d = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$d({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$c || (_path$c = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4.51 5.762A.76.76 0 0 1 5.272 5h1.016a.76.76 0 0 1 .761.762V9.57h.508a.76.76 0 0 1 .762.762.76.76 0 0 1-.762.761h-2.54a.76.76 0 0 1-.76-.761.76.76 0 0 1 .76-.762h.509V6.524h-.254a.76.76 0 0 1-.762-.762m1.99 9.053a.486.486 0 0 0-.762.038l-.355.492a.762.762 0 1 1-1.241-.886l.352-.495a2.012 2.012 0 0 1 3.149-.156c.676.775.66 1.933-.035 2.689l-1.105 1.2h1.054a.76.76 0 0 1 .762.762.76.76 0 0 1-.762.761H4.764a.76.76 0 0 1-.698-.457.77.77 0 0 1 .136-.822l2.286-2.476a.49.49 0 0 0 .009-.65zm4.104-8.545h8.634A.76.76 0 0 1 20 7.03a.76.76 0 0 1-.762.762h-8.634a.76.76 0 0 1-.761-.762.76.76 0 0 1 .761-.761m0 5.078h8.634a.76.76 0 0 1 .762.762.76.76 0 0 1-.762.762h-8.634a.76.76 0 0 1-.761-.762.76.76 0 0 1 .761-.762m0 5.079h8.634a.76.76 0 0 1 .762.762.76.76 0 0 1-.762.762h-8.634a.76.76 0 0 1-.761-.762.76.76 0 0 1 .761-.762"
    })));
  };

  function Component(_ref) {
    var blockProps = _ref.blockProps;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("p", null, "Showing X \u2013 X of X posts")));
  }
  function EditComponent$2(_ref2) {
    _objectDestructuringEmpty(_ref2);
    return /*#__PURE__*/React.createElement(Component, {
      blockProps: wp.blockEditor.useBlockProps()
    });
  }

  // Warning: do not copy this implementation, it is incorrect. This is a 
  // server-side rendered block, and therefore this save implementation is 
  // unnecessary.
  function SaveComponent(_ref3) {
    _objectDestructuringEmpty(_ref3);
    return /*#__PURE__*/React.createElement(Component, {
      blockProps: wp.blockEditor.useBlockProps.save()
    });
  }
  wp.blocks.registerBlockType(blockDef$8, {
    icon: SvgIcon$d,
    edit: EditComponent$2,
    // Warning: this save component isn't necessary, but removing it will
    // cause block validation failures.
    save: SaveComponent
  });

  var $schema$8 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$8 = 3;
  var title$8 = "Query Filter Container";
  var name$8 = "mbm/query-filter-container";
  var description$8 = "Display your query filter form inline";
  var category$8 = "design";
  var attributes$4 = {
  };
  var ancestor$3 = [
  	"core/query"
  ];
  var usesContext$2 = [
  	"query",
  	"queryId"
  ];
  var supports$8 = {
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
  	position: {
  		sticky: false
  	},
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: false
  	},
  	interactivity: true
  };
  var render$2 = "file:./render.php";
  var editorScript$7 = "mbm-gutenblocks/editor/script";
  var editorStyle$7 = "mbm-gutenblocks/editor/style";
  var style$7 = "mbm-gutenblocks/front/style";
  var blockDef$7 = {
  	$schema: $schema$8,
  	apiVersion: apiVersion$8,
  	title: title$8,
  	name: name$8,
  	description: description$8,
  	category: category$8,
  	attributes: attributes$4,
  	ancestor: ancestor$3,
  	usesContext: usesContext$2,
  	supports: supports$8,
  	render: render$2,
  	editorScript: editorScript$7,
  	editorStyle: editorStyle$7,
  	style: style$7
  };

  var _path$b;
  function _extends$c() { _extends$c = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$c.apply(this, arguments); }

  var SvgIcon$c = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$c({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$b || (_path$b = /*#__PURE__*/wp.element.createElement("path", {
      d: "M5.288 6a1.29 1.29 0 0 0-.944 2.166l2.906 3.128v3.937c0 .419.21.813.563 1.044l2.359 1.556a1.019 1.019 0 0 0 1.581-.85v-5.687l2.906-3.128c.222-.238.344-.55.344-.879A1.294 1.294 0 0 0 13.713 6zm3.262 4.49L5.775 7.5h7.45l-2.775 2.99a.75.75 0 0 0-.2.51v5.087l-1.5-.99V11a.75.75 0 0 0-.2-.51m6.2 5.76A.75.75 0 0 0 14 17c0 .416.334.75.75.75h4.5c.416 0 .75-.334.75-.75a.75.75 0 0 0-.75-.75zM14 12c0 .416.334.75.75.75h4.5c.416 0 .75-.334.75-.75a.75.75 0 0 0-.75-.75h-4.5A.75.75 0 0 0 14 12m2.75-5.75A.75.75 0 0 0 16 7c0 .416.334.75.75.75h2.5c.416 0 .75-.334.75-.75a.75.75 0 0 0-.75-.75z"
    })));
  };

  function EditComponent$1(_ref) {
    _objectDestructuringEmpty(_ref);
    var blockProps = wp.blockEditor.useBlockProps();
    var innerBlocksProps = wp.blockEditor.useInnerBlocksProps();
    return /*#__PURE__*/React.createElement("div", blockProps, /*#__PURE__*/React.createElement("div", innerBlocksProps));
  }
  wp.blocks.registerBlockType(blockDef$7, {
    icon: SvgIcon$c,
    edit: EditComponent$1,
    save: function save(props) {
      return /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks.Content, null);
    }
  });

  var coreQueryBlockName = 'core/query';
  var useQueryAttributes = function useQueryAttributes(blockClientId) {
    var queryBlock = wp.data.useSelect(function (select) {
      var _select = select(wp.blockEditor.store),
        getBlockAttributes = _select.getBlockAttributes,
        getBlockName = _select.getBlockName,
        getBlockParents = _select.getBlockParents;
        _select.getBlock;

      // Get tab layout parent of provided block.
      var blockParentIDs = getBlockParents(blockClientId);
      // getBlockParents returns the client IDs of a block's parents in order of
      // root block to closest parent. Revese the array so we're looking at the
      // nearest ancestors first.
      blockParentIDs.reverse();
      var parentQueryBlockId = blockParentIDs.find(function (clientId) {
        return getBlockName(clientId) === coreQueryBlockName;
      });
      var queryAttributes = getBlockAttributes(parentQueryBlockId);
      return {
        parentQueryBlockId: parentQueryBlockId,
        queryAttributes: queryAttributes
      };
    });
    return queryBlock;
  };

  var $schema$7 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$7 = 3;
  var title$7 = "Query Taxonomy Filter";
  var name$7 = "mbm/query-taxonomy-filter";
  var description$7 = "Incorporate a taxonomy into your filter query form to enable users to retrieve specific content.";
  var category$7 = "design";
  var attributes$3 = {
  	selection: {
  		type: "string",
  		"default": "multiple"
  	},
  	taxonomySlug: {
  		type: "string"
  	}
  };
  var ancestor$2 = [
  	"mbm/query-filter-container"
  ];
  var usesContext$1 = [
  	"query",
  	"queryId"
  ];
  var supports$7 = {
  	anchor: true,
  	align: true,
  	ariaLabel: false,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	layout: false,
  	multiple: true,
  	reusable: true,
  	spacing: {
  		padding: true
  	},
  	typography: {
  		fontSize: true,
  		__experimentalFontFamily: true,
  		__experimentalFontWeight: true,
  		__experimentalTextTransform: true
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
  	interactivity: true
  };
  var render$1 = "file:./render.php";
  var editorScript$6 = "mbm-gutenblocks/editor/script";
  var editorStyle$6 = "mbm-gutenblocks/editor/style";
  var style$6 = "mbm-gutenblocks/front/style";
  var blockDef$6 = {
  	$schema: $schema$7,
  	apiVersion: apiVersion$7,
  	title: title$7,
  	name: name$7,
  	description: description$7,
  	category: category$7,
  	attributes: attributes$3,
  	ancestor: ancestor$2,
  	usesContext: usesContext$1,
  	supports: supports$7,
  	render: render$1,
  	editorScript: editorScript$6,
  	editorStyle: editorStyle$6,
  	style: style$6
  };

  var _path$a;
  function _extends$b() { _extends$b = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$b.apply(this, arguments); }

  var SvgIcon$b = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$b({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$a || (_path$a = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4 6.303C4 5.584 4.584 5 5.303 5h13.394a1.304 1.304 0 0 1 1.01 2.125l-5.207 6.39v4.476a1.01 1.01 0 0 1-1.637.79l-2.891-2.293a1.24 1.24 0 0 1-.472-.979v-1.993L4.294 7.125A1.3 1.3 0 0 1 4 6.303m1.719.197 5.112 6.275c.11.134.169.3.169.475v2.137l2 1.588V13.25c0-.172.06-.34.169-.475L18.28 6.5z"
    })));
  };

  var blockClass = "wp-block-mbm-query-taxonomy-filter";
  var iconClass = "".concat(blockClass, "__icon");
  var editTemplate$2 = [['outermost/icon-block', {
    iconName: 'wordpress-plusCircle',
    className: "".concat(iconClass, "--open"),
    metadata: {
      name: "Open Icon"
    }
  }], ['outermost/icon-block', {
    iconName: 'wordpress-cancelCircleFilled',
    className: "".concat(iconClass, "--closed"),
    metadata: {
      name: "Close Icon"
    }
  }]];
  var findTaxonomy = function findTaxonomy(taxonomies, slug) {
    return taxonomies.find(function (tax) {
      return tax.slug === slug;
    });
  };
  function EditComponent(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      context = _ref.context,
      clientId = _ref.clientId;
    var _attributes$taxonomyS = attributes.taxonomySlug,
      taxonomySlug = _attributes$taxonomyS === void 0 ? null : _attributes$taxonomyS;
    // console.log(`[mbm-query-taxonomy-filter] context.query:`, context?.query);

    // Retrieve the post type for the query from the ancestor Query Loop's 
    // provided context.
    var queryAttributes = (context === null || context === void 0 ? void 0 : context.query) || {};
    var queryPostType = queryAttributes === null || queryAttributes === void 0 ? void 0 : queryAttributes.postType;
    var queryBlock = useQueryAttributes(clientId);
    var _useDispatch = wp.data.useDispatch(wp.blockEditor.store),
      updateBlockAttributes = _useDispatch.updateBlockAttributes;
    var termsOperator = 'IN';
    if (taxonomySlug != null) {
      var _queryBlock$queryAttr;
      var blockFilterConfig = (_queryBlock$queryAttr = queryBlock.queryAttributes.query.ampTaxonomies) === null || _queryBlock$queryAttr === void 0 ? void 0 : _queryBlock$queryAttr[taxonomySlug];
      if (blockFilterConfig != null) {
        termsOperator = blockFilterConfig.termsOperator || 'IN';
      }
    }
    var taxonomies = wp.data.useSelect(function (select) {
      return select('core').getTaxonomies({
        // Only fetch taxonomies registered for the post type of the current 
        // query loop.
        type: queryPostType,
        // Ensure all taxonomies are fetched (no results limit).
        per_page: -1,
        context: 'view'
      });
    }, [queryPostType]);
    var selectedTaxonomy = findTaxonomy(taxonomies || [], taxonomySlug);
    var updateQueryBlockConfig = function updateQueryBlockConfig(newTaxonomySlug, updatedConfig) {
      if (newTaxonomySlug == null) {
        return;
      }
      var query = _objectSpread2({}, queryAttributes);
      var ampTaxonomies = _objectSpread2({}, query.ampTaxonomies || {});

      // console.log(`[mbm-query-taxonomy-filter] original ampTaxonomies:`, ampTaxonomies, JSON.stringify(ampTaxonomies, null, 2));

      var taxFilterConfig = ampTaxonomies[taxonomySlug] || {};
      ampTaxonomies[newTaxonomySlug] = _objectSpread2(_objectSpread2({}, taxFilterConfig), updatedConfig);
      query.ampTaxonomies = ampTaxonomies;
      // console.log(`[mbm-query-taxonomy-filter] updated ampTaxonomies:`, ampTaxonomies, JSON.stringify(ampTaxonomies, null, 2));

      updateBlockAttributes(queryBlock.parentQueryBlockId, {
        query: query
      });
    };
    wp.element.useEffect(function () {
      if (selectedTaxonomy == null) {
        if (Array.isArray(taxonomies)) {
          var _taxonomySlug = null;
          if (taxonomies.length > 0) {
            _taxonomySlug = taxonomies[0].slug;
          }
          setAttributes({
            taxonomySlug: _taxonomySlug
          });
          updateQueryBlockConfig(_taxonomySlug, {
            termsOperator: 'IN'
          });
        }
      }
    }, [taxonomies, selectedTaxonomy]);
    var taxonomyOptions = taxonomies != null ? taxonomies.map(function (taxonomy) {
      return {
        label: taxonomy.name,
        value: taxonomy.slug,
        key: taxonomy.slug
      };
    }) : [];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps(), !Array.isArray(taxonomies) && /*#__PURE__*/React.createElement(wp.components.Spinner, null), Array.isArray(taxonomies) && selectedTaxonomy != null ? /*#__PURE__*/React.createElement("p", null, selectedTaxonomy.name, " terms filter.") : /*#__PURE__*/React.createElement("p", null, "No taxonomy is configured for this filter."), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: editTemplate$2,
      templateLock: "all"
    })), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Taxonomy"
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, taxonomyOptions.length > 0 && taxonomySlug != null ? /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Taxonomy",
      value: taxonomySlug,
      options: taxonomyOptions,
      onChange: function onChange(taxonomySlug) {
        // Only altering the taxonomy slug here.
        updateQueryBlockConfig(taxonomySlug, {});
        setAttributes({
          taxonomySlug: taxonomySlug
        });
      }
    }) : /*#__PURE__*/React.createElement("p", null, "No taxonomies could be found for post type '", queryPostType, "'.")), /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Terms Relation",
      value: termsOperator,
      options: [{
        label: 'Or',
        value: 'IN'
      }, {
        label: 'And',
        value: 'AND'
      }],
      onChange: function onChange(termsOperator) {
        return updateQueryBlockConfig(taxonomySlug, {
          termsOperator: termsOperator
        });
      },
      help: termsOperator === 'AND' ? "Only show posts that match all of the terms selected by guests." : "Show posts that match any of the terms selected by guests."
    })))));
  }
  wp.blocks.registerBlockType(blockDef$6, {
    icon: SvgIcon$b,
    edit: EditComponent,
    // This is a dynamic block, but we still need to save the innerblocks 
    // (the selected open/close icons).
    save: function save() {
      return /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks.Content, null);
    }
  });

  var $schema$6 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$6 = 3;
  var title$6 = "Wrapper";
  var name$6 = "mbm/semantic-wrapper";
  var description$6 = "Looking to be more semantic? Look no further. Use this block to insert an HTML5 element into your layout.";
  var category$6 = "layout";
  var keywords$1 = [
  	"semantic",
  	"wrapper"
  ];
  var supports$6 = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	dimensions: {
  		minHeight: true
  	},
  	layout: true,
  	multiple: true,
  	reusable: true,
  	position: {
  		sticky: true
  	},
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: true
  	},
  	typography: {
  		fontSize: true,
  		lineHeight: true
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
  	}
  };
  var editorScript$5 = "mbm-gutenblocks/editor/script";
  var viewScript = "mbm-gutenblocks/front/script";
  var editorStyle$5 = "mbm-gutenblocks/editor/style";
  var style$5 = "mbm-gutenblocks/front/style";
  var blockDef$5 = {
  	$schema: $schema$6,
  	apiVersion: apiVersion$6,
  	title: title$6,
  	name: name$6,
  	description: description$6,
  	category: category$6,
  	keywords: keywords$1,
  	supports: supports$6,
  	editorScript: editorScript$5,
  	viewScript: viewScript,
  	editorStyle: editorStyle$5,
  	style: style$5
  };

  var _path$9;
  function _extends$a() { _extends$a = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$a.apply(this, arguments); }

  var SvgIcon$a = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$a({
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      className: "icon_svg__svg-inline--fa icon_svg__fa-html5 icon_svg__fa-w-12",
      "data-icon": "html5",
      "data-prefix": "fab",
      viewBox: "0 0 384 512"
    }, props), _path$9 || (_path$9 = /*#__PURE__*/wp.element.createElement("path", {
      fill: "currentColor",
      d: "m0 32 34.9 395.8L191.5 480l157.6-52.2L384 32zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1z"
    })));
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var classnames = {exports: {}};

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
  } (classnames));

  var ariaLabelParser = function ariaLabelParser(props) {
    if (props.attributes && props.attributes.ariaLabel) {
      return {
        'aria-label': props.attributes.ariaLabel
      };
    }
    return {};
  };
  var ariaLabelAttribute = {
    ariaLabel: {
      type: 'string',
      "default": undefined
    }
  };
  var AriaLabelPanel = function AriaLabelPanel(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('Accessibility'),
      initialOpen: false
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.TextControl, {
      label: wp.i18n.__('ARIA Label'),
      value: attributes.ariaLabel,
      onChange: function onChange(value) {
        return setAttributes({
          ariaLabel: value
        });
      }
    })));
  };

  var tagTypeOptions = [{
    label: 'Article - <article>',
    value: 'article'
  }, {
    label: 'Aside - <aside>',
    value: 'aside'
  }, {
    label: 'Div - <div>',
    value: 'div'
  }, {
    label: 'Figure - <figure>',
    value: 'figure'
  }, {
    label: 'Footer - <footer>',
    value: 'footer'
  }, {
    label: 'Header - <header>',
    value: 'header'
  }, {
    label: 'List Item - <li>',
    value: 'li'
  }, {
    label: 'Nav - <nav>',
    value: 'nav'
  }, {
    label: 'Ordered List - <ol>',
    value: 'ol'
  }, {
    label: 'Section - <section>',
    value: 'section'
  }, {
    label: 'Unordered List - <ul>',
    value: 'ul'
  }];
  var defaultTagType = 'div';
  var Block = function Block(props) {
    var Tag = props.attributes.tagType;
    var blockProps = wp.blockEditor.useInnerBlocksProps(wp.blockEditor.useBlockProps());
    return /*#__PURE__*/React.createElement(Tag, _extends$j({}, blockProps, ariaLabelParser(props)));
  };
  var Controls = function Controls(props) {
    var tagType = props.attributes.tagType;
    return /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Settings"
    }, /*#__PURE__*/React.createElement(wp.components.PanelRow, null, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Tag Type",
      value: tagType,
      options: tagTypeOptions,
      onChange: function onChange(tagType) {
        return props.setAttributes({
          tagType: tagType
        });
      }
    }))), /*#__PURE__*/React.createElement(AriaLabelPanel, props));
  };
  var edit = function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Controls, {
      attributes: attributes,
      setAttributes: setAttributes
    }), /*#__PURE__*/React.createElement(Block, {
      attributes: attributes
    }));
  };

  var save = function save(props) {
    var Tag = props.attributes.tagType;
    return /*#__PURE__*/React.createElement(Tag, _extends$j({}, wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()), ariaLabelParser(props)));
  };

  wp.blocks.registerBlockType(blockDef$5, {
    icon: SvgIcon$a,
    edit: edit,
    save: save,
    attributes: _objectSpread2({
      tagType: {
        type: 'string',
        "default": defaultTagType
      }
    }, ariaLabelAttribute)
  });

  var $schema$5 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$5 = 3;
  var title$5 = "Tabs";
  var description$5 = "Arrange your content using versatile and imaginative tab designs, collapsible sections, and customizable styling choices.";
  var name$5 = "mbm/tab-layout";
  var category$5 = "design";
  var supports$5 = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		text: false
  	},
  	customClassName: true,
  	layout: false,
  	multiple: true,
  	reusable: true,
  	spacing: {
  		margin: true,
  		padding: true
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
  	interactivity: true
  };
  var amplify$4 = {
  	viewNamespace: "mbm/tabLayout"
  };
  var editorScript$4 = "mbm-gutenblocks/editor/script";
  var editorStyle$4 = "mbm-gutenblocks/editor/style";
  var style$4 = "mbm-gutenblocks/front/style";
  var tabLayoutBlockDef = {
  	$schema: $schema$5,
  	apiVersion: apiVersion$5,
  	title: title$5,
  	description: description$5,
  	name: name$5,
  	category: category$5,
  	supports: supports$5,
  	amplify: amplify$4,
  	editorScript: editorScript$4,
  	editorStyle: editorStyle$4,
  	style: style$4
  };

  var storeName = tabLayoutBlockDef.name;
  var DEFAULT_STATE = {
    tabLayouts: {}
  };
  var DEFAULT_TAB_LAYOUT_STATE = {
    selectedTabIndex: 0
  };
  var actions = {
    setSelectedTabIndex: function setSelectedTabIndex(tabLayoutClientId, selectedTabIndex) {
      return {
        type: 'SET_SELECTED_TAB_INDEX',
        tabLayoutClientId: tabLayoutClientId,
        selectedTabIndex: selectedTabIndex
      };
    }
  };
  var reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    switch (action.type) {
      case 'SET_SELECTED_TAB_INDEX':
        // console.log(`[editor-data] setting tabLayout ${action.tabLayoutClientId} to tab index ${action.selectedTabIndex}`)
        var newState = _objectSpread2({}, state);
        newState.tabLayouts[action.tabLayoutClientId] = {
          selectedTabIndex: action.selectedTabIndex
        };
        return newState;
    }
    return state;
  };
  var selectors = {
    getSelectedTabIndex: function getSelectedTabIndex(state, tabLayoutClientId) {
      var tabLayout = state.tabLayouts[tabLayoutClientId] || DEFAULT_TAB_LAYOUT_STATE;
      return tabLayout.selectedTabIndex;
    }
  };
  var store = wp.data.createReduxStore(storeName, {
    reducer: reducer,
    actions: actions,
    selectors: selectors
  });
  wp.data.register(store);

  var _path$8;
  function _extends$9() { _extends$9 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$9.apply(this, arguments); }

  var SvgIcon$9 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$9({
      width: 24,
      height: 24
    }, props), _path$8 || (_path$8 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M19 14.5H8a.5.5 0 0 1-.5-.5V7c0-.275.225-.5.5-.5h3.672c.131 0 .26.053.353.147l.828.828A3.5 3.5 0 0 0 15.328 8.5H19c.275 0 .5.225.5.5v5c0 .275-.225.5-.5.5M8 16h11c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2h-3.672a2 2 0 0 1-1.415-.584l-.829-.832A2 2 0 0 0 11.67 5H8c-1.103 0-2 .897-2 2v7c0 1.103.897 2 2 2M4.5 7.75A.75.75 0 0 0 3.75 7a.75.75 0 0 0-.75.75v7A4.25 4.25 0 0 0 7.25 19h10c.416 0 .75-.334.75-.75a.75.75 0 0 0-.75-.75h-10a2.75 2.75 0 0 1-2.75-2.75z"
    })));
  };

  var $schema$4 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$4 = 3;
  var title$4 = "Tab Buttons";
  var description$4 = "Enabling you to incorporate and customize individual tab buttons, offering versatility and creativity in structuring your content.";
  var name$4 = "mbm/tab-buttons";
  var category$4 = "design";
  var ancestor$1 = [
  	"mbm/tab-layout"
  ];
  var attributes$2 = {
  	buttonsOrientation: {
  		type: "string",
  		"default": "row"
  	},
  	rowButtonsOverflow: {
  		type: "string",
  		"default": "wrap"
  	}
  };
  var supports$4 = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: false,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	layout: {
  		"default": {
  			type: "flex"
  		}
  	},
  	multiple: true,
  	reusable: true,
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: true,
  		__experimentalDefaultControls: {
  			padding: true,
  			blockGap: true
  		}
  	},
  	__experimentalBorder: {
  		color: true,
  		radius: false,
  		style: true,
  		width: true,
  		__experimentalDefaultControls: {
  			color: true,
  			radius: false,
  			style: true,
  			width: true
  		}
  	},
  	typography: {
  		fontSize: true,
  		lineHeight: true,
  		__experimentalFontFamily: true,
  		__experimentalFontWeight: true,
  		__experimentalFontStyle: true,
  		__experimentalTextTransform: true,
  		__experimentalTextDecoration: true,
  		__experimentalLetterSpacing: true,
  		__experimentalDefaultControls: {
  			fontSize: true
  		}
  	},
  	interactivity: true
  };
  var amplify$3 = {
  	viewNamespace: "mbm/tabLayout/tabButton"
  };
  var editorScript$3 = "mbm-gutenblocks/editor/script";
  var editorStyle$3 = "mbm-gutenblocks/editor/style";
  var style$3 = "mbm-gutenblocks/front/style";
  var blockDef$4 = {
  	$schema: $schema$4,
  	apiVersion: apiVersion$4,
  	title: title$4,
  	description: description$4,
  	name: name$4,
  	category: category$4,
  	ancestor: ancestor$1,
  	attributes: attributes$2,
  	supports: supports$4,
  	amplify: amplify$3,
  	editorScript: editorScript$3,
  	editorStyle: editorStyle$3,
  	style: style$3
  };

  var $schema$3 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$3 = 3;
  var title$3 = "Tab Button";
  var description$3 = "Create interactive tab buttons to navigate and showcase different content sections.";
  var name$3 = "mbm/tab-button";
  var category$3 = "design";
  var parent$1 = [
  	"mbm/tab-buttons"
  ];
  var supports$3 = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: false,
  		link: true,
  		text: true
  	},
  	customClassName: true,
  	layout: false,
  	multiple: true,
  	reusable: true,
  	spacing: {
  		margin: true,
  		padding: true
  	},
  	typography: {
  		fontSize: true,
  		lineHeight: true,
  		__experimentalFontFamily: true,
  		__experimentalFontWeight: true,
  		__experimentalFontStyle: true,
  		__experimentalTextTransform: true,
  		__experimentalTextDecoration: true,
  		__experimentalLetterSpacing: true,
  		__experimentalDefaultControls: {
  			fontSize: true
  		}
  	},
  	interactivity: true
  };
  var amplify$2 = {
  	viewNamespace: "mbm/tabLayout/tabButton"
  };
  var editorScript$2 = "mbm-gutenblocks/editor/script";
  var editorStyle$2 = "mbm-gutenblocks/editor/style";
  var style$2 = "mbm-gutenblocks/front/style";
  var blockDef$3 = {
  	$schema: $schema$3,
  	apiVersion: apiVersion$3,
  	title: title$3,
  	description: description$3,
  	name: name$3,
  	category: category$3,
  	parent: parent$1,
  	supports: supports$3,
  	amplify: amplify$2,
  	editorScript: editorScript$2,
  	editorStyle: editorStyle$2,
  	style: style$2
  };

  var $schema$2 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$2 = 3;
  var title$2 = "Tab Contents";
  var description$2 = "Add versatile content blocks inside tabs for flexible and organized information display.";
  var name$2 = "mbm/tab-contents";
  var category$2 = "design";
  var ancestor = [
  	"mbm/tab-layout"
  ];
  var supports$2 = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: false,
  		text: false
  	},
  	customClassName: true,
  	layout: false,
  	multiple: true,
  	reusable: true,
  	spacing: {
  		margin: true,
  		padding: true
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
  	interactivity: true
  };
  var amplify$1 = {
  	viewNamespace: "mbm/tabLayout/tabButton"
  };
  var editorScript$1 = "mbm-gutenblocks/editor/script";
  var editorStyle$1 = "mbm-gutenblocks/editor/style";
  var style$1 = "mbm-gutenblocks/front/style";
  var blockDef$2 = {
  	$schema: $schema$2,
  	apiVersion: apiVersion$2,
  	title: title$2,
  	description: description$2,
  	name: name$2,
  	category: category$2,
  	ancestor: ancestor,
  	supports: supports$2,
  	amplify: amplify$1,
  	editorScript: editorScript$1,
  	editorStyle: editorStyle$1,
  	style: style$1
  };

  var $schema$1 = "https://schemas.wp.org/trunk/block.json";
  var apiVersion$1 = 3;
  var title$1 = "Tab Content Pane";
  var description$1 = "Display unique content within each tab, allowing for structured information presentation.";
  var name$1 = "mbm/tab-content-pane";
  var category$1 = "design";
  var parent = [
  	"mbm/tab-contents"
  ];
  var supports$1 = {
  	anchor: true,
  	align: true,
  	ariaLabel: true,
  	className: true,
  	color: {
  		background: true,
  		gradients: true,
  		link: false,
  		text: false
  	},
  	customClassName: true,
  	layout: false,
  	multiple: true,
  	reusable: true,
  	spacing: {
  		margin: true,
  		padding: true
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
  	interactivity: true
  };
  var amplify = {
  	viewNamespace: "mbm/tabLayout/tabButton"
  };
  var editorScript = "mbm-gutenblocks/editor/script";
  var editorStyle = "mbm-gutenblocks/editor/style";
  var style = "mbm-gutenblocks/front/style";
  var blockDef$1 = {
  	$schema: $schema$1,
  	apiVersion: apiVersion$1,
  	title: title$1,
  	description: description$1,
  	name: name$1,
  	category: category$1,
  	parent: parent,
  	supports: supports$1,
  	amplify: amplify,
  	editorScript: editorScript,
  	editorStyle: editorStyle,
  	style: style
  };

  var createTabButton = function createTabButton(buttonNumber) {
    return [blockDef$3.name, {}, [['core/paragraph', {
      content: "Tab ".concat(buttonNumber)
    }]]];
  };
  var createTabContentPanes = function createTabContentPanes(tabNumber) {
    return [blockDef$1.name, {}, [['core/paragraph', {
      content: "Content pane ".concat(tabNumber)
    }]]];
  };

  // Start off with a set of three tabs and content panes.
  var editTemplate$1 = [[blockDef$4.name, {}, [createTabButton(1), createTabButton(2), createTabButton(3)]], [blockDef$2.name, {}, [createTabContentPanes(1), createTabContentPanes(2), createTabContentPanes(3)]]];
  function Edit$5() {
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps({
      className: "wp-block-mbm-tab-layout"
    }), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: editTemplate$1,
      templateLock: false
    }));
  }
  function Save$5() {
    var context = {
      selectedIndex: 0
    };
    return /*#__PURE__*/React.createElement("div", _extends$j({}, wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()), {
      "data-wp-interactive": "{ \"namespace\": \"".concat(tabLayoutBlockDef.amplify.viewNamespace, "\" }"),
      "data-wp-init": "callbacks.init",
      "data-wp-context": JSON.stringify(context)
    }));
  }

  wp.blocks.registerBlockType(tabLayoutBlockDef, {
    icon: SvgIcon$9,
    edit: Edit$5,
    save: Save$5
  });

  var _path$7;
  function _extends$8() { _extends$8 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$8.apply(this, arguments); }

  var SvgIcon$8 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$8({
      width: 24,
      height: 24
    }, props), _path$7 || (_path$7 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M6 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2h-4.94l-1.341-1.34a2.25 2.25 0 0 0-1.59-.66zm-.5 2c0-.275.225-.5.5-.5h4.128c.2 0 .39.078.531.219l1.416 1.415c.234.235.553.366.884.366H18c.275 0 .5.225.5.5v8c0 .275-.225.5-.5.5H6a.5.5 0 0 1-.5-.5zm1.75 4.5a.75.75 0 0 0-.75.75v1.5c0 .416.334.75.75.75h1.5c.416 0 .75-.334.75-.75v-1.5a.75.75 0 0 0-.75-.75zm3.25.75v1.5c0 .416.334.75.75.75h1.5c.416 0 .75-.334.75-.75v-1.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75m4.75-.75a.75.75 0 0 0-.75.75v1.5c0 .416.334.75.75.75h1.5c.416 0 .75-.334.75-.75v-1.5a.75.75 0 0 0-.75-.75z"
    })));
  };

  function Edit$4() {
    var blockProps = wp.blockEditor.useBlockProps();
    var combinedBlockProps = wp.blockEditor.useInnerBlocksProps(blockProps, {
      template: [],
      templateLock: false,
      allowedBlocks: [blockDef$3.name]
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", combinedBlockProps));
  }
  function Save$4() {
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()));
  }

  wp.blocks.registerBlockType(blockDef$4, {
    icon: SvgIcon$8,
    edit: Edit$4,
    save: Save$4
  });

  var _path$6;
  function _extends$7() { _extends$7 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$7.apply(this, arguments); }

  var SvgIcon$7 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$7({
      width: 24,
      height: 24
    }, props), _path$6 || (_path$6 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M6 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2h-4.94l-1.341-1.34a2.25 2.25 0 0 0-1.59-.66zm-.5 2c0-.275.225-.5.5-.5h4.128c.2 0 .39.078.531.219l1.416 1.415c.234.235.553.366.884.366H18c.275 0 .5.225.5.5v8c0 .275-.225.5-.5.5H6a.5.5 0 0 1-.5-.5zm5 5.25v1.5c0 .416.334.75.75.75h1.5c.416 0 .75-.334.75-.75v-1.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75"
    })));
  };

  /*
    Two key states here:
      * Whether a block is visible
      * Whether a block is selected
  */

  // WARN: might need to split this up.
  var useTabLayoutContext = function useTabLayoutContext(blockClientId, blockName) {
    var _useDispatch = wp.data.useDispatch(store),
      setSelectedTabIndex = _useDispatch.setSelectedTabIndex;
    var tabLayoutContext = wp.data.useSelect(function (select) {
      var _select = select(wp.blockEditor.store),
        getBlockIndex = _select.getBlockIndex,
        getSelectedBlock = _select.getSelectedBlock,
        getBlockName = _select.getBlockName,
        getBlockParents = _select.getBlockParents,
        getBlock = _select.getBlock;
      var _select2 = select(store),
        getSelectedTabIndex = _select2.getSelectedTabIndex;
      var selectedTabBlock = null;
      var selectedBlock = getSelectedBlock();
      var selectedBlockName = getBlockName(selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.clientId);

      // Get tab layout parent of provided block.
      var blockParentIDs = getBlockParents(blockClientId);
      // getBlockParents returns the client IDs of a block's parents in order of
      // root block to closest parent. Revese the array so we're looking at the
      // nearest ancestors first.
      blockParentIDs.reverse();
      var tabLayoutClientId = blockParentIDs.find(function (clientId) {
        return getBlockName(clientId) === tabLayoutBlockDef.name;
      });
      if (selectedBlockName === blockName) {
        selectedTabBlock = selectedBlock;
      } else if (selectedBlock !== null) {
        var selectedBlockParentIDs = getBlockParents(selectedBlock === null || selectedBlock === void 0 ? void 0 : selectedBlock.clientId);
        // Reverse to search nearest ancestors first.
        selectedBlockParentIDs.reverse();
        var tabParentId = selectedBlockParentIDs.find(function (clientId) {
          return getBlockName(clientId) === blockName;
        });
        if (tabParentId !== undefined) {
          selectedTabBlock = getBlock(tabParentId);
        }
      }
      return {
        isTabSelected: selectedTabBlock !== null,
        selectedTabBlock: selectedTabBlock,
        blockIndex: getBlockIndex(blockClientId),
        selectedTabIndex: getSelectedTabIndex(tabLayoutClientId),
        tabLayoutClientId: tabLayoutClientId
      };
    });
    var isTabSelected = tabLayoutContext.isTabSelected,
      selectedTabBlock = tabLayoutContext.selectedTabBlock,
      blockIndex = tabLayoutContext.blockIndex,
      tabLayoutClientId = tabLayoutContext.tabLayoutClientId;
    wp.element.useEffect(function () {
      if ((selectedTabBlock === null || selectedTabBlock === void 0 ? void 0 : selectedTabBlock.clientId) === blockClientId) {
        console.log("[".concat(blockName, "] ").concat(blockClientId, " is selected. Index: ").concat(blockIndex, "."));
        setSelectedTabIndex(tabLayoutClientId, blockIndex);
        console.log("[".concat(blockName, "] ").concat(blockClientId, " updated selectedTabIndex to ").concat(blockIndex, "."));
      }
    }, [isTabSelected, selectedTabBlock === null || selectedTabBlock === void 0 ? void 0 : selectedTabBlock.clientId, blockIndex]);
    return tabLayoutContext;
  };

  var editTemplate = [['core/paragraph', {
    content: 'Tab Button'
  }]];
  function Edit$3(props) {
    useTabLayoutContext(props.clientId, blockDef$3.name);

    // console.log(`[TabButton] ${props.clientId} is selected:`, isTabSelected)

    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps(), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: editTemplate,
      templateLock: false
    }));
  }
  function Save$3() {
    var context = {
      index: null
    };
    return /*#__PURE__*/React.createElement("div", _extends$j({}, wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()), {
      "data-wp-interactive": "{ \"namespace\": \"".concat(blockDef$3.amplify.viewNamespace, "\" }"),
      "data-wp-init": "callbacks.init",
      "data-wp-on--click": "actions.onClick",
      "data-wp-context": JSON.stringify(context),
      "data-wp-class--wp-block-mbm-tab-button--selected": "state.isSelected"
    }));
  }

  wp.blocks.registerBlockType(blockDef$3, {
    icon: SvgIcon$7,
    edit: Edit$3,
    save: Save$3
  });

  var _path$5;
  function _extends$6() { _extends$6 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

  var SvgIcon$6 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$6({
      width: 24,
      height: 24
    }, props), _path$5 || (_path$5 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M10 15.5h7c.275 0 .5-.225.5-.5V8H16c-.553 0-1-.447-1-1V5.5h-5c-.275 0-.5.225-.5.5v9c0 .275.225.5.5.5m7 1.5h-7c-1.103 0-2-.897-2-2V6c0-1.103.897-2 2-2h5.172a2 2 0 0 1 1.415.584l1.829 1.829A2 2 0 0 1 19 7.828V15c0 1.103-.897 2-2 2M5.75 7c.416 0 .75.334.75.75v8a2.75 2.75 0 0 0 2.75 2.75h6c.416 0 .75.334.75.75s-.334.75-.75.75h-6A4.25 4.25 0 0 1 5 15.75v-8c0-.416.334-.75.75-.75"
    })));
  };

  function Edit$2() {
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useBlockProps(), /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks, {
      template: [],
      templateLock: false,
      allowedBlocks: [blockDef$1.name]
    }));
  }
  function Save$2() {
    return /*#__PURE__*/React.createElement("div", wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()));
  }

  wp.blocks.registerBlockType(blockDef$2, {
    icon: SvgIcon$6,
    edit: Edit$2,
    save: Save$2
  });

  var _path$4;
  function _extends$5() { _extends$5 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

  var SvgIcon$5 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$5({
      width: 24,
      height: 24
    }, props), _path$4 || (_path$4 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M16 18.5c.275 0 .5-.225.5-.5V9H14c-.553 0-1-.447-1-1V5.5H8c-.275 0-.5.225-.5.5v12c0 .275.225.5.5.5zM6 6c0-1.103.897-2 2-2h5.172a2 2 0 0 1 1.415.584l2.829 2.829A2 2 0 0 1 18 8.828V18c0 1.103-.897 2-2 2H8c-1.103 0-2-.897-2-2z"
    })));
  };

  function Edit$1(props) {
    var _useTabLayoutContext = useTabLayoutContext(props.clientId, blockDef$1.name),
      blockIndex = _useTabLayoutContext.blockIndex,
      selectedTabIndex = _useTabLayoutContext.selectedTabIndex;
    var isContentPaneTabSelected = blockIndex === selectedTabIndex;
    console.log("[TabContentPane] selectedTabIndex: ".concat(selectedTabIndex, ". Content pane index: ").concat(blockIndex, ". Is selected: ").concat(isContentPaneTabSelected));
    var blockProps = wp.blockEditor.useInnerBlocksProps(wp.blockEditor.useBlockProps({
      style: {
        display: isContentPaneTabSelected === true ? 'unset' : 'none'
      }
    }));
    return /*#__PURE__*/React.createElement("div", blockProps);
  }
  function Save$1() {
    var context = {
      index: null
    };
    return /*#__PURE__*/React.createElement("div", _extends$j({}, wp.blockEditor.useInnerBlocksProps.save(wp.blockEditor.useBlockProps.save()), {
      "data-wp-interactive": "{ \"namespace\": \"".concat(blockDef$1.amplify.viewNamespace, "\" }"),
      "data-wp-init": "callbacks.init",
      "data-wp-context": JSON.stringify(context),
      "data-wp-class--wp-block-mbm-tab-content-pane--selected": "state.isSelected"
    }));
  }

  wp.blocks.registerBlockType(blockDef$1, {
    icon: SvgIcon$5,
    edit: Edit$1,
    save: Save$1
  });

  var dayjs_min = {exports: {}};

  (function (module, exports) {
  	!function (t, e) {
  	  module.exports = e() ;
  	}(commonjsGlobal, function () {

  	  var t = 1e3,
  	    e = 6e4,
  	    n = 36e5,
  	    r = "millisecond",
  	    i = "second",
  	    s = "minute",
  	    u = "hour",
  	    a = "day",
  	    o = "week",
  	    c = "month",
  	    f = "quarter",
  	    h = "year",
  	    d = "date",
  	    l = "Invalid Date",
  	    $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
  	    y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
  	    M = {
  	      name: "en",
  	      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  	      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  	      ordinal: function (t) {
  	        var e = ["th", "st", "nd", "rd"],
  	          n = t % 100;
  	        return "[" + t + (e[(n - 20) % 10] || e[n] || e[0]) + "]";
  	      }
  	    },
  	    m = function (t, e, n) {
  	      var r = String(t);
  	      return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
  	    },
  	    v = {
  	      s: m,
  	      z: function (t) {
  	        var e = -t.utcOffset(),
  	          n = Math.abs(e),
  	          r = Math.floor(n / 60),
  	          i = n % 60;
  	        return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
  	      },
  	      m: function t(e, n) {
  	        if (e.date() < n.date()) return -t(n, e);
  	        var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
  	          i = e.clone().add(r, c),
  	          s = n - i < 0,
  	          u = e.clone().add(r + (s ? -1 : 1), c);
  	        return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
  	      },
  	      a: function (t) {
  	        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
  	      },
  	      p: function (t) {
  	        return {
  	          M: c,
  	          y: h,
  	          w: o,
  	          d: a,
  	          D: d,
  	          h: u,
  	          m: s,
  	          s: i,
  	          ms: r,
  	          Q: f
  	        }[t] || String(t || "").toLowerCase().replace(/s$/, "");
  	      },
  	      u: function (t) {
  	        return void 0 === t;
  	      }
  	    },
  	    g = "en",
  	    D = {};
  	  D[g] = M;
  	  var p = "$isDayjsObject",
  	    S = function (t) {
  	      return t instanceof _ || !(!t || !t[p]);
  	    },
  	    w = function t(e, n, r) {
  	      var i;
  	      if (!e) return g;
  	      if ("string" == typeof e) {
  	        var s = e.toLowerCase();
  	        D[s] && (i = s), n && (D[s] = n, i = s);
  	        var u = e.split("-");
  	        if (!i && u.length > 1) return t(u[0]);
  	      } else {
  	        var a = e.name;
  	        D[a] = e, i = a;
  	      }
  	      return !r && i && (g = i), i || !r && g;
  	    },
  	    O = function (t, e) {
  	      if (S(t)) return t.clone();
  	      var n = "object" == typeof e ? e : {};
  	      return n.date = t, n.args = arguments, new _(n);
  	    },
  	    b = v;
  	  b.l = w, b.i = S, b.w = function (t, e) {
  	    return O(t, {
  	      locale: e.$L,
  	      utc: e.$u,
  	      x: e.$x,
  	      $offset: e.$offset
  	    });
  	  };
  	  var _ = function () {
  	      function M(t) {
  	        this.$L = w(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[p] = !0;
  	      }
  	      var m = M.prototype;
  	      return m.parse = function (t) {
  	        this.$d = function (t) {
  	          var e = t.date,
  	            n = t.utc;
  	          if (null === e) return new Date(NaN);
  	          if (b.u(e)) return new Date();
  	          if (e instanceof Date) return new Date(e);
  	          if ("string" == typeof e && !/Z$/i.test(e)) {
  	            var r = e.match($);
  	            if (r) {
  	              var i = r[2] - 1 || 0,
  	                s = (r[7] || "0").substring(0, 3);
  	              return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
  	            }
  	          }
  	          return new Date(e);
  	        }(t), this.init();
  	      }, m.init = function () {
  	        var t = this.$d;
  	        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
  	      }, m.$utils = function () {
  	        return b;
  	      }, m.isValid = function () {
  	        return !(this.$d.toString() === l);
  	      }, m.isSame = function (t, e) {
  	        var n = O(t);
  	        return this.startOf(e) <= n && n <= this.endOf(e);
  	      }, m.isAfter = function (t, e) {
  	        return O(t) < this.startOf(e);
  	      }, m.isBefore = function (t, e) {
  	        return this.endOf(e) < O(t);
  	      }, m.$g = function (t, e, n) {
  	        return b.u(t) ? this[e] : this.set(n, t);
  	      }, m.unix = function () {
  	        return Math.floor(this.valueOf() / 1e3);
  	      }, m.valueOf = function () {
  	        return this.$d.getTime();
  	      }, m.startOf = function (t, e) {
  	        var n = this,
  	          r = !!b.u(e) || e,
  	          f = b.p(t),
  	          l = function (t, e) {
  	            var i = b.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
  	            return r ? i : i.endOf(a);
  	          },
  	          $ = function (t, e) {
  	            return b.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n);
  	          },
  	          y = this.$W,
  	          M = this.$M,
  	          m = this.$D,
  	          v = "set" + (this.$u ? "UTC" : "");
  	        switch (f) {
  	          case h:
  	            return r ? l(1, 0) : l(31, 11);
  	          case c:
  	            return r ? l(1, M) : l(0, M + 1);
  	          case o:
  	            var g = this.$locale().weekStart || 0,
  	              D = (y < g ? y + 7 : y) - g;
  	            return l(r ? m - D : m + (6 - D), M);
  	          case a:
  	          case d:
  	            return $(v + "Hours", 0);
  	          case u:
  	            return $(v + "Minutes", 1);
  	          case s:
  	            return $(v + "Seconds", 2);
  	          case i:
  	            return $(v + "Milliseconds", 3);
  	          default:
  	            return this.clone();
  	        }
  	      }, m.endOf = function (t) {
  	        return this.startOf(t, !1);
  	      }, m.$set = function (t, e) {
  	        var n,
  	          o = b.p(t),
  	          f = "set" + (this.$u ? "UTC" : ""),
  	          l = (n = {}, n[a] = f + "Date", n[d] = f + "Date", n[c] = f + "Month", n[h] = f + "FullYear", n[u] = f + "Hours", n[s] = f + "Minutes", n[i] = f + "Seconds", n[r] = f + "Milliseconds", n)[o],
  	          $ = o === a ? this.$D + (e - this.$W) : e;
  	        if (o === c || o === h) {
  	          var y = this.clone().set(d, 1);
  	          y.$d[l]($), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
  	        } else l && this.$d[l]($);
  	        return this.init(), this;
  	      }, m.set = function (t, e) {
  	        return this.clone().$set(t, e);
  	      }, m.get = function (t) {
  	        return this[b.p(t)]();
  	      }, m.add = function (r, f) {
  	        var d,
  	          l = this;
  	        r = Number(r);
  	        var $ = b.p(f),
  	          y = function (t) {
  	            var e = O(l);
  	            return b.w(e.date(e.date() + Math.round(t * r)), l);
  	          };
  	        if ($ === c) return this.set(c, this.$M + r);
  	        if ($ === h) return this.set(h, this.$y + r);
  	        if ($ === a) return y(1);
  	        if ($ === o) return y(7);
  	        var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[$] || 1,
  	          m = this.$d.getTime() + r * M;
  	        return b.w(m, this);
  	      }, m.subtract = function (t, e) {
  	        return this.add(-1 * t, e);
  	      }, m.format = function (t) {
  	        var e = this,
  	          n = this.$locale();
  	        if (!this.isValid()) return n.invalidDate || l;
  	        var r = t || "YYYY-MM-DDTHH:mm:ssZ",
  	          i = b.z(this),
  	          s = this.$H,
  	          u = this.$m,
  	          a = this.$M,
  	          o = n.weekdays,
  	          c = n.months,
  	          f = n.meridiem,
  	          h = function (t, n, i, s) {
  	            return t && (t[n] || t(e, r)) || i[n].slice(0, s);
  	          },
  	          d = function (t) {
  	            return b.s(s % 12 || 12, t, "0");
  	          },
  	          $ = f || function (t, e, n) {
  	            var r = t < 12 ? "AM" : "PM";
  	            return n ? r.toLowerCase() : r;
  	          };
  	        return r.replace(y, function (t, r) {
  	          return r || function (t) {
  	            switch (t) {
  	              case "YY":
  	                return String(e.$y).slice(-2);
  	              case "YYYY":
  	                return b.s(e.$y, 4, "0");
  	              case "M":
  	                return a + 1;
  	              case "MM":
  	                return b.s(a + 1, 2, "0");
  	              case "MMM":
  	                return h(n.monthsShort, a, c, 3);
  	              case "MMMM":
  	                return h(c, a);
  	              case "D":
  	                return e.$D;
  	              case "DD":
  	                return b.s(e.$D, 2, "0");
  	              case "d":
  	                return String(e.$W);
  	              case "dd":
  	                return h(n.weekdaysMin, e.$W, o, 2);
  	              case "ddd":
  	                return h(n.weekdaysShort, e.$W, o, 3);
  	              case "dddd":
  	                return o[e.$W];
  	              case "H":
  	                return String(s);
  	              case "HH":
  	                return b.s(s, 2, "0");
  	              case "h":
  	                return d(1);
  	              case "hh":
  	                return d(2);
  	              case "a":
  	                return $(s, u, !0);
  	              case "A":
  	                return $(s, u, !1);
  	              case "m":
  	                return String(u);
  	              case "mm":
  	                return b.s(u, 2, "0");
  	              case "s":
  	                return String(e.$s);
  	              case "ss":
  	                return b.s(e.$s, 2, "0");
  	              case "SSS":
  	                return b.s(e.$ms, 3, "0");
  	              case "Z":
  	                return i;
  	            }
  	            return null;
  	          }(t) || i.replace(":", "");
  	        });
  	      }, m.utcOffset = function () {
  	        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
  	      }, m.diff = function (r, d, l) {
  	        var $,
  	          y = this,
  	          M = b.p(d),
  	          m = O(r),
  	          v = (m.utcOffset() - this.utcOffset()) * e,
  	          g = this - m,
  	          D = function () {
  	            return b.m(y, m);
  	          };
  	        switch (M) {
  	          case h:
  	            $ = D() / 12;
  	            break;
  	          case c:
  	            $ = D();
  	            break;
  	          case f:
  	            $ = D() / 3;
  	            break;
  	          case o:
  	            $ = (g - v) / 6048e5;
  	            break;
  	          case a:
  	            $ = (g - v) / 864e5;
  	            break;
  	          case u:
  	            $ = g / n;
  	            break;
  	          case s:
  	            $ = g / e;
  	            break;
  	          case i:
  	            $ = g / t;
  	            break;
  	          default:
  	            $ = g;
  	        }
  	        return l ? $ : b.a($);
  	      }, m.daysInMonth = function () {
  	        return this.endOf(c).$D;
  	      }, m.$locale = function () {
  	        return D[this.$L];
  	      }, m.locale = function (t, e) {
  	        if (!t) return this.$L;
  	        var n = this.clone(),
  	          r = w(t, e, !0);
  	        return r && (n.$L = r), n;
  	      }, m.clone = function () {
  	        return b.w(this.$d, this);
  	      }, m.toDate = function () {
  	        return new Date(this.valueOf());
  	      }, m.toJSON = function () {
  	        return this.isValid() ? this.toISOString() : null;
  	      }, m.toISOString = function () {
  	        return this.$d.toISOString();
  	      }, m.toString = function () {
  	        return this.$d.toUTCString();
  	      }, M;
  	    }(),
  	    k = _.prototype;
  	  return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a], ["$M", c], ["$y", h], ["$D", d]].forEach(function (t) {
  	    k[t[1]] = function (e) {
  	      return this.$g(e, t[0], t[1]);
  	    };
  	  }), O.extend = function (t, e) {
  	    return t.$i || (t(e, _, O), t.$i = !0), O;
  	  }, O.locale = w, O.isDayjs = S, O.unix = function (t) {
  	    return O(1e3 * t);
  	  }, O.en = D[g], O.Ls = D, O.p = {}, O;
  	}); 
  } (dayjs_min));

  var dayjs_minExports = dayjs_min.exports;
  var dayjs = /*@__PURE__*/getDefaultExportFromCjs(dayjs_minExports);

  var _g, _defs;
  function _extends$4() { _extends$4 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

  var SvgIcon$4 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$4({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24
    }, props), _g || (_g = /*#__PURE__*/wp.element.createElement("g", {
      clipPath: "url(#icon_svg__a)"
    }, /*#__PURE__*/wp.element.createElement("path", {
      d: "M9.75 4.75A.75.75 0 0 0 9 4a.75.75 0 0 0-.75.75V6H7c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2h-1.25V4.75A.75.75 0 0 0 15 4a.75.75 0 0 0-.75.75V6h-4.5zM6.5 10h11v8c0 .275-.225.5-.5.5H7a.5.5 0 0 1-.5-.5z"
    }))), _defs || (_defs = /*#__PURE__*/wp.element.createElement("defs", null, /*#__PURE__*/wp.element.createElement("clipPath", {
      id: "icon_svg__a"
    }, /*#__PURE__*/wp.element.createElement("path", {
      fill: "#fff",
      d: "M5 4h14v16H5z"
    })))));
  };

  var CORE_BLOCK = 'core/paragraph';
  var VARIATION_NAME = 'amplify-blocks/current-date';
  var attributes$1 = {
    amplifyVariation: VARIATION_NAME,
    metadata: {
      bindings: {
        content: {
          source: "amplify-blocks/data-current-date",
          args: {}
        }
      }
    },
    placeholder: wp.i18n.__('Current Date')
  };
  wp.hooks.addFilter('editor.BlockEdit', CORE_BLOCK, function (BlockEdit) {
    return function (props) {
      var isVariation = props.attributes.amplifyVariation === VARIATION_NAME;
      var now = dayjs();
      return isVariation ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
        title: "Date Format"
      }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
        label: "Date Format",
        value: props.attributes.dateFormat,
        options: [{
          label: now.format('YYYY'),
          value: 'Y'
        }, {
          label: now.format('YY'),
          value: 'y'
        }, {
          label: now.format('MMMM D, YYYY'),
          value: 'F j, Y'
        }, {
          label: now.format('dddd, MMMM D, YYYY'),
          value: 'l, F j, Y'
        }, {
          label: now.format('YYYY-MM-DD'),
          value: 'Y-m-d'
        }, {
          label: now.format('MM/DD/YYYY'),
          value: 'm/d/Y'
        }],
        onChange: function onChange(value) {
          return props.setAttributes({
            dateFormat: value
          });
        }
      }), /*#__PURE__*/React.createElement(wp.components.SelectControl, {
        label: "Copyright Prefix",
        value: props.attributes.copyrightPrefix,
        options: [{
          label: "None",
          value: ''
        }, {
          label: "\xA9",
          value: 'copy_symbol'
        }, {
          label: "Copyright",
          value: 'copyright_text'
        }],
        onChange: function onChange(value) {
          return props.setAttributes({
            copyrightPrefix: value
          });
        }
      })))) : /*#__PURE__*/React.createElement(BlockEdit, props);
    };
  });
  wp.blocks.registerBlockVariation(CORE_BLOCK, {
    name: VARIATION_NAME,
    title: wp.i18n.__('Current Date'),
    keywords: [wp.i18n.__('date'), wp.i18n.__('time'), wp.i18n.__('current')],
    description: wp.i18n.__('Display the current date, in a variety of formats.'),
    icon: SvgIcon$4,
    attributes: attributes$1,
    isActive: ['amplifyVariation']
  });
  wp.hooks.addFilter('blocks.registerBlockType', "".concat(CORE_BLOCK, "/").concat(VARIATION_NAME), function (settings, name) {
    if (name !== CORE_BLOCK) {
      return settings;
    }
    return _objectSpread2(_objectSpread2({}, settings), {}, {
      attributes: _objectSpread2(_objectSpread2({}, settings.attributes), {}, {
        amplifyVariation: {
          type: 'string',
          "default": null
        },
        dateFormat: {
          type: 'string',
          "default": 'Y'
        },
        copyrightPrefix: {
          type: 'string',
          "default": ''
        }
      })
    });
  });
  console.log("[mbm-gutenblocks] CurrentDate block loaded");

  var $schema = "https://schemas.wp.org/trunk/block.json";
  var apiVersion = 3;
  var title = "Post Terms Conditional Container";
  var name = "mbm/post-terms-conditional-container";
  var description = "Hide or show content based on the number of terms attached to a post.";
  var category = "design";
  var keywords = [
  	"terms",
  	"taxonomy",
  	"conditional"
  ];
  var usesContext = [
  	"postId",
  	"postType"
  ];
  var attributes = {
  	minTermsCount: {
  		type: "number",
  		"default": -1
  	},
  	maxTermsCount: {
  		type: "number",
  		"default": -1
  	},
  	tagName: {
  		type: "string",
  		"default": "div"
  	},
  	taxonomySlug: {
  		type: "string",
  		"default": "post_tag"
  	}
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
  		minHeight: true
  	},
  	layout: true,
  	multiple: true,
  	reusable: true,
  	position: {
  		sticky: true
  	},
  	spacing: {
  		margin: true,
  		padding: true,
  		blockGap: true
  	},
  	typography: null,
  	interactivity: true
  };
  var render = "file:./render.php";
  var blockDef = {
  	$schema: $schema,
  	apiVersion: apiVersion,
  	title: title,
  	name: name,
  	description: description,
  	category: category,
  	keywords: keywords,
  	usesContext: usesContext,
  	attributes: attributes,
  	supports: supports,
  	render: render
  };

  function Save() {
    return /*#__PURE__*/React.createElement(wp.blockEditor.InnerBlocks.Content, null);
  }

  var usePostTaxonomies = function usePostTaxonomies(postType) {
    var taxonomies = wp.data.useSelect(function (select) {
      return select('core').getTaxonomies({
        // Only fetch taxonomies registered for the post type.
        type: postType,
        // Ensure all taxonomies are fetched (no results limit).
        per_page: -1,
        context: 'view'
      });
    }, [postType]);
    return taxonomies;
  };

  function EditControls(_ref) {
    var taxonomySlug = _ref.taxonomySlug,
      taxonomies = _ref.taxonomies,
      minTermsCount = _ref.minTermsCount,
      maxTermsCount = _ref.maxTermsCount,
      setAttributes = _ref.setAttributes;
    return /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: wp.i18n.__('Terms'),
      opened: true
    }, /*#__PURE__*/React.createElement(wp.components.SelectControl, {
      label: "Taxonomy",
      value: taxonomySlug,
      options: taxonomies.map(function (taxonomy) {
        return {
          label: taxonomy.name,
          value: taxonomy.slug
        };
      }),
      onChange: function onChange(taxonomySlug) {
        return setAttributes({
          taxonomySlug: taxonomySlug
        });
      }
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: "Require a minimum number of terms",
      checked: minTermsCount !== -1,
      onChange: function onChange(hasMinimum) {
        return setAttributes({
          minTermsCount: hasMinimum ? 0 : -1
        });
      }
    }), minTermsCount !== -1 && /*#__PURE__*/React.createElement(wp.components.__experimentalNumberControl, {
      label: "Minimum number of terms",
      value: minTermsCount,
      shiftStep: 1,
      min: 0,
      onChange: function onChange(value) {
        return setAttributes({
          minTermsCount: parseInt(value, 10)
        });
      }
    }), /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: "Require a maximum number of terms",
      checked: maxTermsCount !== -1,
      onChange: function onChange(hasMaximum) {
        return setAttributes({
          maxTermsCount: hasMaximum ? 0 : -1
        });
      }
    }), maxTermsCount !== -1 && /*#__PURE__*/React.createElement(wp.components.__experimentalNumberControl, {
      label: "Maximum number of terms",
      value: maxTermsCount,
      shiftStep: 1,
      min: 0,
      onChange: function onChange(value) {
        return setAttributes({
          maxTermsCount: parseInt(value, 10)
        });
      }
    })));
  }
  function Edit(_ref2) {
    var context = _ref2.context,
      attributes = _ref2.attributes,
      setAttributes = _ref2.setAttributes;
    var tagName = attributes.tagName,
      taxonomySlug = attributes.taxonomySlug,
      minTermsCount = attributes.minTermsCount,
      maxTermsCount = attributes.maxTermsCount;
    var TagName = tagName;
    var postTaxonomies = usePostTaxonomies(context.postType);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EditControls, {
      setAttributes: setAttributes,
      taxonomySlug: taxonomySlug,
      taxonomies: postTaxonomies || [],
      minTermsCount: minTermsCount,
      maxTermsCount: maxTermsCount
    }), /*#__PURE__*/React.createElement(TagName, wp.blockEditor.useInnerBlocksProps(wp.blockEditor.useBlockProps())));
  }

  var _path$3;
  function _extends$3() { _extends$3 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

  var SvgIcon$3 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$3({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$3 || (_path$3 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4 5.755v5.467c0 .622.245 1.218.684 1.657l6.437 6.435a2.34 2.34 0 0 0 3.31 0l4.883-4.881a2.34 2.34 0 0 0 0-3.31l-6.437-6.436a2.34 2.34 0 0 0-1.657-.683L5.756 4C4.786 4 4 4.786 4 5.755m4.096 1.17a1.17 1.17 0 1 1 0 2.341 1.17 1.17 0 0 1 0-2.34"
    })));
  };

  var _path$2;
  function _extends$2() { _extends$2 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

  var SvgIcon$2 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$2({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$2 || (_path$2 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M11.222 4c.622 0 1.218.245 1.657.684l6.435 6.436a2.34 2.34 0 0 1 0 3.309l-4.881 4.882a2.34 2.34 0 0 1-3.31 0l-6.436-6.436A2.32 2.32 0 0 1 4 11.222V5.755C4 4.786 4.786 4 5.755 4zm-5.467 7.222c0 .154.062.303.172.413l6.436 6.436c.227.227.6.227.826 0l4.882-4.882a.587.587 0 0 0 0-.826l-6.436-6.436a.59.59 0 0 0-.413-.172H5.755zm2.34-4.297a1.17 1.17 0 1 1 0 2.34 1.17 1.17 0 0 1 0-2.34"
    })));
  };

  var termsCount$2 = {
    minTermsCount: 0,
    maxTermsCount: 0
  };
  var NO_TERMS_VARIATION_NAME = 'no_terms';
  var variation$2 = {
    name: NO_TERMS_VARIATION_NAME,
    title: 'No Post Terms Container',
    icon: SvgIcon$2,
    isDefault: false,
    description: 'Conditionally display content if the post has no terms.',
    attributes: _objectSpread2({}, termsCount$2),
    scope: ['block', 'inserter', 'transform'],
    isActive: ['minTermsCount', 'maxTermsCount']
  };

  var _path$1;
  function _extends$1() { _extends$1 = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

  var SvgIcon$1 = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends$1({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path$1 || (_path$1 = /*#__PURE__*/wp.element.createElement("path", {
      d: "M4 5.755v5.467c0 .622.245 1.218.684 1.657l6.437 6.435a2.34 2.34 0 0 0 3.31 0l4.883-4.881a2.34 2.34 0 0 0 0-3.31l-6.437-6.436a2.34 2.34 0 0 0-1.657-.683L5.756 4C4.786 4 4 4.786 4 5.755m4.096 1.17a1.17 1.17 0 1 1 0 2.341 1.17 1.17 0 0 1 0-2.34"
    })));
  };

  var termsCount$1 = {
    minTermsCount: 1,
    maxTermsCount: 1
  };
  var SINGLE_TERM_VARIATION_NAME = 'single_term';
  var variation$1 = {
    name: SINGLE_TERM_VARIATION_NAME,
    title: 'Single Post Term Container',
    icon: SvgIcon$1,
    description: 'Conditionally display content if the post has exactly one term.',
    attributes: _objectSpread2({}, termsCount$1),
    scope: ['block', 'inserter', 'transform'],
    isActive: ['minTermsCount', 'maxTermsCount']
  };

  var _path;
  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  var SvgIcon = function SvgIcon(props) {
    return /*#__PURE__*/wp.element.createElement("svg", _extends({
      xmlns: "http://www.w3.org/2000/svg",
      width: 24,
      height: 24,
      fill: "none"
    }, props), _path || (_path = /*#__PURE__*/wp.element.createElement("path", {
      d: "m15.127 4.254 4.492 4.617a4.91 4.91 0 0 1 0 6.829l-3.937 4.046a.834.834 0 0 1-1.192.007.867.867 0 0 1-.007-1.21l3.933-4.047a3.177 3.177 0 0 0 0-4.418l-4.488-4.617a.867.867 0 0 1 .007-1.211.834.834 0 0 1 1.191.007zM3 11.054v-5.34C3 4.768 3.756 4 4.687 4h5.255c.598 0 1.17.24 1.592.668l5.905 6a2.31 2.31 0 0 1 0 3.232l-4.692 4.767a2.224 2.224 0 0 1-3.181 0l-5.905-6A2.29 2.29 0 0 1 3 11.054M8.062 8c0-.303-.119-.594-.33-.808a1.116 1.116 0 0 0-1.59 0 1.15 1.15 0 0 0 0 1.616 1.116 1.116 0 0 0 1.59 0c.211-.214.33-.505.33-.808"
    })));
  };

  var termsCount = {
    minTermsCount: 2,
    maxTermsCount: -1
  };
  var HAS_TERMS_VARIATION_NAME = 'multiple_terms';
  var variation = {
    name: HAS_TERMS_VARIATION_NAME,
    title: 'Multiple Post Terms Container',
    icon: SvgIcon,
    description: 'Conditionally display content if the post has multiple terms.',
    attributes: _objectSpread2({}, termsCount),
    scope: ['block', 'inserter', 'transform'],
    isActive: ['minTermsCount', 'maxTermsCount']
  };

  wp.blocks.registerBlockType(blockDef, {
    icon: SvgIcon$3,
    edit: Edit,
    save: Save,
    variations: [
    // AnyTermsVariation,
    variation$2, variation$1, variation]
  });

  var CaptionControls = function CaptionControls(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    var isDynamicCaptionVisible = attributes.isDynamicCaptionVisible;
    return /*#__PURE__*/React.createElement(wp.components.PanelBody, {
      title: "Caption Controls"
    }, /*#__PURE__*/React.createElement(wp.components.ToggleControl, {
      label: "Include image caption",
      help: isDynamicCaptionVisible ? 'Caption will be included after image.' : "Caption will not be shown.",
      checked: isDynamicCaptionVisible,
      onChange: function onChange(value) {
        return setAttributes({
          isDynamicCaptionVisible: value
        });
      }
    }));
  };

  var BLOCK_SLUG = 'core/post-featured-image';
  var isVariation = function isVariation(props) {
    return props.name === BLOCK_SLUG;
  };
  var withExtraControls = function withExtraControls(BlockEdit) {
    return function (props) {
      // Ensure that the block is the one we're targeting.
      if (!isVariation(props)) return /*#__PURE__*/React.createElement(BlockEdit, props);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(BlockEdit, props), /*#__PURE__*/React.createElement(wp.blockEditor.InspectorControls, null, /*#__PURE__*/React.createElement(CaptionControls, props)));
    };
  };
  wp.hooks.addFilter('editor.BlockEdit', BLOCK_SLUG, withExtraControls);

  // Add attributes to the block.
  wp.hooks.addFilter('blocks.registerBlockType', BLOCK_SLUG + '/dynamic-caption-attributes', function (settings, name) {
    if (name !== BLOCK_SLUG) {
      return settings;
    }
    return _objectSpread2(_objectSpread2({}, settings), {}, {
      attributes: _objectSpread2(_objectSpread2({}, settings.attributes), {}, {
        isDynamicCaptionVisible: {
          type: 'boolean',
          "default": false
        }
      })
    });
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


  // Simple example for testing out new block supports without other complications.
  // import './blocks/example-06';

  // Styles
  // import './style.scss';
  // import './blocks/carousel/v2/GalleryCarousel/editor.scss';

  console.log("[mbm-gutenblocks] editor.js loaded");

})();
//# sourceMappingURL=editor.bundle.js.map
