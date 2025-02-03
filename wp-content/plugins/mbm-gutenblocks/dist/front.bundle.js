import { store, getContext, getElement } from '@wordpress/interactivity';

const serializedValueSeparator = ',';

const { state: state$1, actions: actions$1 } = store("amplifyQueryFilter", {
  context: {
  },

  state: {
    get selectedCount() {
      const context = getContext();

      return context.formValues.length;
    },

    get isPluralCount() {
      getContext();
      return state$1.selectedCount !== 1;
    },

    get selectedCountLabel() {
      const context = getContext();
      return state$1.isPluralCount 
        ? context.taxonomy?.pluralName 
        : context.taxonomy?.singularName;
    },

    get filterLabel() {
      const context = getContext();
      const selectedCount = state$1.selectedCount;

      if (selectedCount < 1) {
        return `Select ${context.taxonomy?.singularName} filters`;
      }

      const tagName = state$1.isPluralCount
        ? context.taxonomy?.pluralName
        : context.taxonomy?.singularName;

      return `${selectedCount} ${tagName} selected`;
    },
  },

  actions: {
    onInit: () => {
      const context = getContext();
      console.log(`[QueryTaxFilter] init. Context at init:`, context);
      
      actions$1.updateSerializedFormValues();
    },

    onFilterChange: (event) => {
      const catSlug = event?.target?.name;
      const isChecked = event?.target?.checked;

      const context = getContext();
      
      let {formValues: newFormValues} = context;
      if (isChecked) {
        if (!newFormValues.includes(catSlug)) {
          newFormValues = [...newFormValues, catSlug];
        }
      } else {
        newFormValues = newFormValues.filter((slug) => slug !== catSlug);
      }
      context.formValues = newFormValues;

      actions$1.updateSerializedFormValues();
    },

    updateSerializedFormValues: () => {
      const context = getContext();
      let serializedValue = null;
      if (Array.isArray(context.formValues) && context.formValues.length > 0) {
        serializedValue = context.formValues.join(serializedValueSeparator);
      }

      context.serializedFormValues[context.queryParamKey] = serializedValue;
    },
    
    onToggleOpen: (event) => {
      const context = getContext();
      // console.log(`[TaxFltr onToggleOpen ${getContext().queryParamKey}] responding`)
      context.isOpen = !context.isOpen;
    },

    onClickOutside: (event) => {
      const context = getContext();
      // console.log(`[TaxFltr onClickOutside ${getContext().queryParamKey}] responding`)
      if (context.isOpen !== true) {
        // Dropdown is already collapsed, just ignore this.
        return;
      }
      
      // Dropdown is open, and we have a click. Let's see if it's on a child 
      // of the root element for this component.
      const { ref: rootElement } = getElement();
      const eventTarget = event.target;
      
      if (!(eventTarget instanceof HTMLElement)) {
        // ...not sure how this would even occur, but... let's just ignore 
        // clicks in this case.
        return;
      }
      
      // Only close if the click target was outside of our component.
      const isChildClickTarget = rootElement.contains(eventTarget);
      if (isChildClickTarget === false) {
        context.isOpen = false;
      }
    },
  },
});

function navWithQueryParams(
  serializedFormValues,
  searchStartValue = window.location.search,
) {
  const queryParams = new URLSearchParams(searchStartValue);
  Object.keys(serializedFormValues).forEach((queryParamKey) => {
    const queryParamValue = serializedFormValues[queryParamKey];

    if (queryParamValue === null) {
      queryParams.delete(queryParamKey);
    } else {
      queryParams.set(queryParamKey, queryParamValue);
    }
  });

  const queryString = queryParams.toString().length > 0
    ? `?${queryParams.toString()}`
    : ``;
  
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryString}`;
  console.log(`Refreshing to URL: ${newUrl}`);
  window.location.href = newUrl;
}

store("amplifyQueryFilter", {
  context: {
    queryId: null,
    serializedFormValues: {},
    initFormValues: {},
  },

  state: {
  },

  actions: {
    onClear: () => {
      console.log(`[onClear] Clearing form filters...`);

      const context = getContext();

      if (context.queryId) {
        const emptyFormValues = {};

        console.log(`Clearing all filters for query ${context['queryId']} with empty values:`, emptyFormValues);

        navWithQueryParams(emptyFormValues, '');
      }
    },

    onReset: () => {
      console.log(`[onReset] Resetting!`);

      const context = getContext();

      if (context.queryId) {
        console.log(`Resetting filter changes for query ${context['queryId']} with values:`, context.initFormValues);

        navWithQueryParams(context.initFormValues);
      }
    },
      
    onSubmit: () => {
      console.log(`[onSubmit] Submit button clicked!`);

      const context = getContext();

      if (context.queryId) {
        console.log(`Filtering query ${context['queryId']} with values:`, context.serializedFormValues);

        navWithQueryParams(context.serializedFormValues);
      }
    },
  },
});

var $schema$2 = "https://schemas.wp.org/trunk/block.json";
var apiVersion$2 = 3;
var title$2 = "Tabs";
var description$2 = "Arrange your content using versatile and imaginative tab designs, collapsible sections, and customizable styling choices.";
var name$2 = "mbm/tab-layout";
var category$2 = "design";
var supports$2 = {
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
var amplify$2 = {
	viewNamespace: "mbm/tabLayout"
};
var editorScript$2 = "mbm-gutenblocks/editor/script";
var editorStyle$2 = "mbm-gutenblocks/editor/style";
var style$2 = "mbm-gutenblocks/front/style";
var blockDef$2 = {
	$schema: $schema$2,
	apiVersion: apiVersion$2,
	title: title$2,
	description: description$2,
	name: name$2,
	category: category$2,
	supports: supports$2,
	amplify: amplify$2,
	editorScript: editorScript$2,
	editorStyle: editorStyle$2,
	style: style$2
};

const { state, actions } = store(blockDef$2.amplify.viewNamespace, {
  state: {
    get selectedIndex() {
      const context = getContext();
      return context.selectedIndex;
    },
  },
  
  actions: {
    setSelectedIndex: (newSelectedIndex) => {
      const context = getContext();
      context.selectedIndex = newSelectedIndex;
    },
  },

  callbacks: {
    init: () => {
      const context = getContext();
      console.log(`[TabLayout#init] context:`, context);
    },
  },
});

var $schema$1 = "https://schemas.wp.org/trunk/block.json";
var apiVersion$1 = 3;
var title$1 = "Tab Button";
var description$1 = "Create interactive tab buttons to navigate and showcase different content sections.";
var name$1 = "mbm/tab-button";
var category$1 = "design";
var parent$1 = [
	"mbm/tab-buttons"
];
var supports$1 = {
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
var amplify$1 = {
	viewNamespace: "mbm/tabLayout/tabButton"
};
var editorScript$1 = "mbm-gutenblocks/editor/script";
var editorStyle$1 = "mbm-gutenblocks/editor/style";
var style$1 = "mbm-gutenblocks/front/style";
var blockDef$1 = {
	$schema: $schema$1,
	apiVersion: apiVersion$1,
	title: title$1,
	description: description$1,
	name: name$1,
	category: category$1,
	parent: parent$1,
	supports: supports$1,
	amplify: amplify$1,
	editorScript: editorScript$1,
	editorStyle: editorStyle$1,
	style: style$1
};

store(blockDef$1.amplify.viewNamespace, {
  state: {
    get isSelected() {
      const context = getContext();
      if (!Number.isInteger(context.index)) {
        return false;
      }

      return state.selectedIndex === context.index;
    },
  },

  actions: {
    onClick: (event) => {
      const context = getContext();
      actions.setSelectedIndex(context.index);
      console.log(`[TabButton#onClick] tabLayoutState.selectedIndex:`, state.selectedIndex);
    },
  },

  callbacks: {
    init: () => {
      const context = getContext();
      console.log(`[TabButton#init] context:`, context);
      const {ref} = getElement();
      console.log(`[TabButton#init] element content:`, ref.innerText);
      context.index = Array.from(ref?.parentElement?.children).indexOf(ref);
      console.log(
        `[TabButton#init] button index:`, 
        context.index,
      );
      console.log(`[TabButton#init] tabLayoutState.selectedIndex:`, state.selectedIndex);
    },
  },
});

var $schema = "https://schemas.wp.org/trunk/block.json";
var apiVersion = 3;
var title = "Tab Content Pane";
var description = "Display unique content within each tab, allowing for structured information presentation.";
var name = "mbm/tab-content-pane";
var category = "design";
var parent = [
	"mbm/tab-contents"
];
var supports = {
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
var blockDef = {
	$schema: $schema,
	apiVersion: apiVersion,
	title: title,
	description: description,
	name: name,
	category: category,
	parent: parent,
	supports: supports,
	amplify: amplify,
	editorScript: editorScript,
	editorStyle: editorStyle,
	style: style
};

store(blockDef.amplify.viewNamespace, {
  state: {
    get isSelected() {
      const context = getContext();
      if (!Number.isInteger(context.index)) {
        return false;
      }

      return state.selectedIndex === context.index;
    },
  },

  actions: {
  },

  callbacks: {
    init: () => {
      const context = getContext();
      console.log(`[TabContentPane#init] context:`, context);
      const {ref} = getElement();
      console.log(`[TabContentPane#init] element content:`, ref.innerText);
      context.index = Array.from(ref?.parentElement?.children).indexOf(ref);
      console.log(
        `[TabContentPane#init] button index:`, 
        context.index,
      );
      console.log(`[TabContentPane#init] tabLayoutState.selectedIndex:`, state.selectedIndex);
    },
  },
});

// import { initAlpine } from './alpine';


console.log(`[mbm-gutenblocks] front.js loaded`);
//# sourceMappingURL=front.bundle.js.map
