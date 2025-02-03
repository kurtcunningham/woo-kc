import scss from 'rollup-plugin-scss';
import sass from 'rollup-plugin-sass';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import externalGlobals from "rollup-plugin-external-globals";
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import bourbon from 'bourbon';
import svgr from '@svgr/rollup';

const defaultSassConfig = {
  // Watch in both the styles and blocks folders
  // Without this config, the watch won't pick up on changes to included 
  // partials.
  // watch: ['src/styles', 'src/blocks'],
  output: true,

  options: {
    silenceDeprecations: ['legacy-js-api'],
  },
};


export default [
  // FRONT ***********************************
  // WP Interactivity API-compatible front view module.
  {
    external: [
      '@wordpress/interactivity',
    ],
    input: "src/front.js",
    output: {
      file: 'assets/built/front.bundle.js',
      format: "es",
      sourcemap: true,

      // Removes the hash from the asset filename
      // This prevents the `assets/output-123hash.css` build artifacts from rollup-plugin-css
      // https://github.com/thgh/rollup-plugin-scss?tab=readme-ov-file#usage
      assetFileNames: '[name][extname]'
    },
    plugins: [
      sass({
        ...defaultSassConfig
      }),

      // scss({
      //   ...defaultScssConfig,
      //   // Literal asset filename, bypasses the automated filenaming transformations
      //   fileName: 'front.bundle.css',
      //   includePaths: [
      //     'node_modules/',
      //     bourbon.includePaths
      //   ],
      // }),
    ]
  },

  // EDITOR ***********************************
  // Gutenberg editor compatible blocks and general styles.
  {
    input: "src/editor.js",
    output: {
      file: 'assets/built/editor.bundle.js',
      // format: "cjs",
      format: "iife",
      sourcemap: true,
      // plugins: [terser()],
    },
    plugins: [
      sass({
        ...defaultSassConfig
      }),

      // scss({
      //   ...defaultScssConfig,
      //   // Literal asset filename, bypasses the automated filenaming transformations
      //   fileName: 'editor.bundle.css',
      // }),

      json(),
      svgr(),
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
        '@wordpress/date': 'wp.date',
        '@wordpress/edit-post': 'wp.editPost',
        '@wordpress/element': 'wp.element',
        '@wordpress/hooks': 'wp.hooks',
        '@wordpress/i18n': 'wp.i18n',
        '@wordpress/plugins': 'wp.plugins',
        'react': 'wp.element',
      }),
      replace({
        preventAssignment: false,
        'process.env.NODE_ENV': '"development"'
      })
    ]
  },
];
