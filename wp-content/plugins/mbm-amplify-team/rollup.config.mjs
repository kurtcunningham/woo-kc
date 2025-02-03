import sass from 'rollup-plugin-sass';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import externalGlobals from "rollup-plugin-external-globals";
import json from '@rollup/plugin-json';
// import terser from '@rollup/plugin-terser';
import bourbon from 'bourbon';
import svgr from '@svgr/rollup';


const defaultSassConfig = {
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
      // plugins: [terser()],
    },
    plugins: [
      sass({
        ...defaultSassConfig,
      }),
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
        ...defaultSassConfig,
      }),
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
        '@wordpress/editor': 'wp.editor',
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
