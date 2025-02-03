const customTemplates = [
  {
    name: "blank",
    postTypes: [
      "page",
      "post"
    ],
    title: "Blank"
  },
  {
    name: "page-feature",
    postTypes: [
      "page"
    ],
    title: "Pages: Feature"
  },
  {
    name: "page-splash",
    postTypes: [
      "page"
    ],
    title: "Pages: Splash"
  },
  {
    name: "404",
    postTypes: [
      "page"
    ],
    title: "404"
  },
];

const templateParts = [
  {
    area: "header",
    name: "header",
    title: "Header"
  },
  {
    area: "footer",
    name: "footer",
    title: "Footer"
  },
];

const colorPalette = [
  // Primary palette
  {
    color: "#262F38",
    name: "Primary - One",
    slug: "primary-1",
  },
  {
    color: "#D2DBE4",
    name: "Primary - Two",
    slug: "primary-2",
  },

  // Secondary palette
  {
    color: "#1F2831",
    name: "Secondary - One",
    slug: "secondary-1",
  },
  {
    color: "#00080F",
    name: "Secondary - Two",
    slug: "secondary-2",
  },
  {
    color: "#FFFFFF",
    name: "Secondary - Three",
    slug: "secondary-3",
  },

  // Monochrome palette
  {
    color: "#A2B0BD",
    name: "Shade - One",
    slug: "shade-1"
  },
  {
    color: "#B5C0CA",
    name: "Shade - Two",
    slug: "shade-2",
  },
  {
    color: "#D1D8DE",
    name: "Shade - Three",
    slug: "shade-3",
  },
  {
    color: "#ECEFF2",
    name: "Shade - Four",
    slug: "shade-4",
  },
];

const createFontSize = (size, slug, name, fluid = false) => {
  return {
    fluid,
    size,
    slug,
    name,
  };
}

const fontSizes = {
  ultra: (name, fluid) => createFontSize("10rem", "ultra", name, fluid),
  giga: (name, fluid) => createFontSize("7.5rem", "giga", name, fluid),
  mega: (name, fluid) => createFontSize("5.625rem", "mega", name, fluid),
  alpha: (name, fluid) => createFontSize("4.188rem", "alpha", name, fluid),
  bravo: (name, fluid) => createFontSize("3.188rem", "bravo", name, fluid),
  charlie: (name, fluid) => createFontSize("2.375rem", "charlie", name, fluid),
  delta: (name, fluid) => createFontSize("1.75rem", "delta", name, fluid),
  echo: (name, fluid) => createFontSize("1.313rem", "echo", name, fluid),
  foxtrot: (name, fluid) => createFontSize("1rem", "foxtrot", name, fluid),
  golf: (name, fluid) => createFontSize("0.875rem", "golf", name, fluid),
}

const paragraphFontSizes = [
  {
    ...fontSizes.golf("Body Small", {min: "0.563rem", max: "0.875rem"}),
  },
  {
    ...fontSizes.foxtrot("Body Default", {min: "0.875rem", max: "1rem"}),
  },
  {
    ...fontSizes.echo("Body Large", {min: "1rem", max: "1.313rem"}),
  },
  {
    ...fontSizes.delta("Body Extra Large", {min: "1.313rem", max: "1.75rem"}),
  },
];

const paragraphTypography = {
	customFontSize: true,
	lineHeight: true,
	letterSpacing: true,
  fluid: true,
  fontSizes: paragraphFontSizes,
  fontStyle: true,
  fontWeight: true
};

const headingFontSizes = [
  {
    ...fontSizes.ultra("Display Heading XXLg", {min: "5.625rem", max: "10rem"}),
  },
  {
    ...fontSizes.giga("Display Heading XLg", {min: "4.188rem", max: "7.5rem"}),
  },
  {
    ...fontSizes.mega("Display Heading Lg", {min: "3.188rem", max: "5.625rem"}),
  },
  {
    ...fontSizes.alpha("Heading H1", {min: "2.375rem", max: "4.188rem"}),
  },
  {
    ...fontSizes.bravo("Heading H2", {min: "1.75rem", max: "3.188rem"}),
  },
  {
    ...fontSizes.charlie("Heading H3", {min: "1.313rem", max: "2.375rem"}),
  },
  {
    ...fontSizes.delta("Heading H4", {min: "1rem", max: "1.75rem"}),
  },
  {
    ...fontSizes.echo("Heading H5", {min: "1rem", max: "1.313rem"}),
  },
  {
    ...fontSizes.foxtrot("Heading H6", {min: "0.875rem", max: "1rem"}),
  },
];

const headingTypography = {
  customFontSize: true,
  fluid: true,
  fontSizes: headingFontSizes,
  fontStyle: true,
  fontWeight: true,
  letterSpacing: false,
	lineHeight: true,

  // WARN: this doesn't seem to be a recognized property
  // https://developer.wordpress.org/themes/global-settings-and-styles/settings/typography/#enabling-and-disabling-typography-options
  // customLineHeight: true,
};

const settings = {
  appearanceTools: true,
  blocks: {
    "core/button": {
      typography: {
        customFontSize: false,
        fontSizes: paragraphFontSizes,
        fontWeight: true,
      }
    },
    "core/heading": {
      spacing: {
        padding: false,
        margin: true
      },
      typography: headingTypography,
    },
    "core/list": {
      typography: {
        customFontSize: false,
        fontSizes: paragraphFontSizes,
        fontWeight: true,
      }
    },
    "core/navigation": {
      typography: {
        customFontSize: false,
        fontSizes: paragraphFontSizes,
        fontWeight: true,
      }
    },
    "core/navigation-link": {
      typography: {
        customFontSize: false,
        fontSizes: paragraphFontSizes,
        fontWeight: true,
      }
    },
    "core/paragraph": {
      spacing: {
        padding: false,
        margin: true
      },
      typography: paragraphTypography
    },
    "core/post-author-name": {
      typography: paragraphTypography
    },
    "core/post-content": {
      typography: paragraphTypography
    },
    "core/post-date": {
      typography: paragraphTypography,
    },
    "core/post-excerpt": {
      typography: paragraphTypography,
    },
    "core/post-terms": {
      typography: paragraphTypography,
    },
    "core/post-title": {
      typography: headingTypography,
    },
    "core/query-title": {
      typography: headingTypography,
    },
    "core/quote": {
      typography: headingTypography,
    }
  },
  color: {
    defaultGradients: false,
    defaultPalette: false,
    gradients: [],
    palette: colorPalette,
  },
  layout: {
    contentSize: "768px",
    wideSize: "1600px",
  },
  spacing: {
    blockGap: null,
    margin: true,
    padding: true,
    /*
      If you defined only one of either spacingScale or spacingSizes for your presets, set defaultSpacingSizes to false.

      From: https://make.wordpress.org/core/2024/06/19/theme-json-version-3/
    */
    defaultSpacingSizes: false,
    spacingScale: {
      operator: "*",
      increment: 2,
      steps: 7,
      mediumStep: 32,
      unit: "px"
    },
    units: ["px","em","rem"],
  },
  typography: {
    customFontSize: false,
    dropCap: true,
    lineHeight: false,
    fluid: true,
    // defaultFontSizes: false,
    defaultFontSizes: true,
    fontSizes: [
      {
        ...fontSizes.giga("Display Heading XLg", {
          min: "3.188rem",
          max: "7.5rem"
        }),
      },
      {
        ...fontSizes.mega("Display Heading Lg", {
          min: "2.375rem",
          max: "5.625rem"
        }),
      },
      {
        ...fontSizes.alpha("Heading H1", {
          min: "2rem",
          max: "4.188rem"
        }),
      },
      {
        ...fontSizes.bravo("Heading H2", {
          min: "1.75rem",
          max: "3.188rem"
        }),
      },
      {
        ...fontSizes.charlie("Heading H3", {
          min: "1.75rem",
          max: "2.375rem"
        }),
      },
      {
        ...fontSizes.delta("Heading H4 / Body Extra Large", {
          min: "1.313rem",
          max: "1.75rem"
        }),
      },
      {
        ...fontSizes.echo("Heading H5 / Body Large"),
      },
      {
        ...fontSizes.foxtrot("Heading H6 / Body Default"),
      },
      {
        ...fontSizes.golf("Body Small"),
      },
    ],
    fontStyle: false,
    fontWeight: true
  },
  useRootPaddingAwareAlignments: true
};

const standardMargin = {
  top: "0px",
  bottom: "12px"
};

const headerStyle = (fontSizeSlug) => {
  return {
    spacing: {
      margin: standardMargin,
    },
    typography: {
      fontSize: `var(--wp--preset--font-size--${fontSizeSlug})`,
      fontWeight: "700",
      // WARN: this may not work as intended.
      // https://developer.wordpress.org/themes/global-settings-and-styles/settings/typography/#enabling-and-disabling-typography-options
      // https://fullsiteediting.com/lessons/theme-json-typography-font-styles/#h-line-height
      lineHeight: "1.15",
    },
  };
}

const styles = {
  blocks: {
    "core/button": {
      spacing: {
        padding: {
          top: "1rem",
          right: "2rem",
          bottom: "1rem",
          left: "2rem"
        }
      },
      typography: {
        fontSize: "var(--wp--preset--font-size--foxtrot)"
      }
    },
    "core/heading": {
      spacing: {
        margin: standardMargin
      },
      typography: {
        lineHeight: "1.15"
      }
    },
    "core/list": {
      typography: {
        lineHeight: 1.5
      },
      elements: {
        link: {
          typography: {
            fontWeight: "400"
          }
        }
      },
      spacing: {
        margin: standardMargin
      }
    },
    "core/navigation-link": {
      typography: {
        lineHeight: 1.5
      }
    },
    "core/paragraph": {
      spacing: {
        margin: standardMargin
      },
      typography: {
        lineHeight: 1.5
      },
      elements: {
        link: {
          typography: {
            fontWeight: "400"
          }
        }
      }
    },
    "core/post-title": {
      typography: {
        lineHeight: 1.15
      },
    },
    "core/quote": {
      elements: {
        p: {
          typography: {
            lineHeight: "1.15"
          }
        },
        cite: {
          typography: {
            fontSize: "var(--wp--preset--font-size--foxtrot)"
          }
        }
      }
    }
  },
  color: {},
  elements: {
    h1: headerStyle('alpha'),
    h2: headerStyle('bravo'),
    h3: headerStyle('charlie'),
    h4: headerStyle('delta'),
    h5: headerStyle('echo'),
    h6: headerStyle('foxtrot'),
  },
  spacing: {
    padding: {
      top: "0px",
      right: "clamp(16px, 2vw, 32px)",
      bottom: "0px",
      left: "clamp(16px, 2vw, 32px)"
    }
  },
  typography: {
    fontSize: "var(--wp--preset--font-size--foxtrot)"
  }
};

const theme = {
  $schema: "https://schemas.wp.org/trunk/theme.json",
  version: 3,
  settings,
  styles,
  templateParts,
  customTemplates,
};

export default theme;
