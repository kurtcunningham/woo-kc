import sass from 'rollup-plugin-sass';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import externalGlobals from "rollup-plugin-external-globals";
import json from '@rollup/plugin-json';
// import terser from '@rollup/plugin-terser';
import bourbon from 'bourbon';
import path from 'path';


const defaultSassConfig = {
  output: true,

  options: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

const THEME_JSON_FILE = 'theme.json.mjs';
const THEME_JSON_PATH = path.resolve(`./src/${THEME_JSON_FILE}`);



export default [
  // FRONT ***********************************
  // WP Interactivity API-compatible front view module.
  {
    external: [
      '@wordpress/interactivity',
    ],
    input: "src/front.js",
    output: {
      file: 'front.bundle.js',
      format: "es",
      sourcemap: true,

      // Removes the hash from the asset filename
      // This prevents the `assets/output-123hash.css` build artifacts from rollup-plugin-css
      // https://github.com/thgh/rollup-plugin-scss?tab=readme-ov-file#usage
      assetFileNames: '[name][extname]'

      // Option file compression.
      // plugins: [terser()],
    },
    plugins: [
      sass({
        ...defaultSassConfig,

        output: 'style.css',
      }),
    ]
  },

  // THEME ***********************************
  // Theme JSON generation.
  {
    input: `src/${THEME_JSON_FILE}`,
    // Retain this output. If we don't direct to a file, Rollup will print the
    // results to stdout. During the generateBundle hook, we'll remove this file
    // from the output bundle to prevent an unintential script copy artifact.
    output: {
      file: THEME_JSON_FILE,
      // format: 'cjs',
    },
    plugins: [
      {
        name: 'ThemeJSON',
        load() {
          this.addWatchFile(THEME_JSON_PATH);
        },
        async generateBundle(outputOptions, bundle) {
          console.log(`Running JSON plugin`)

          const entry = Object.values(bundle).find((chunk) => chunk.isEntry);
          const b64moduleData = "data:text/javascript;base64," + btoa(entry.code);
          const themeModule = await import(b64moduleData);

          const themeJson = JSON.stringify(
            themeModule?.default, 
            null, 
            // Indent with 2 spaces. Removing this option prints the JSON in 
            // a compact style.
            2
          );

          this.emitFile({
            type: 'asset',
            fileName: 'theme.json',
            source: themeJson,
          });

          delete bundle[THEME_JSON_FILE];
        }
      }
    ]
  },

  // EDITOR ***********************************
  // Gutenberg editor compatible blocks and general styles.
  {
    input: "src/editor.js",
    output: {
      file: 'editor.bundle.js',
      format: "cjs",
      sourcemap: true,
      // plugins: [terser()],
    },
    plugins: [
      sass({
        ...defaultSassConfig,

        output: 'editor.css',
      }),
      
      json(),
      nodeResolve({
        extensions: ['.js', '.jsx']
      }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-react'],
        extensions: ['.js', '.jsx']
      }),
      commonjs(),
      externalGlobals({
        '@wordpress/blocks': 'wp.blocks',
        '@wordpress/block-editor': 'wp.blockEditor',
        '@wordpress/components': 'wp.components',
        '@wordpress/compose': 'wp.compose',
        '@wordpress/core-data': 'wp.coreData',
        '@wordpress/data': 'wp.data',
        '@wordpress/dom-ready': 'wp.domReady',
        '@wordpress/element': 'wp.element',
        '@wordpress/hooks': 'wp.hooks',
        '@wordpress/i18n': 'wp.i18n',
      }),
      replace({
        preventAssignment: false,
        'process.env.NODE_ENV': '"development"'
      })
    ]
  },
];
