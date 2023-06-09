const postcssPresetEnv = require(`postcss-preset-env`);
const cssimport = require(`postcss-import`);
const postcssOKLabFunction = require('@csstools/postcss-oklab-function');
const postcssCascadeLayers = require('@csstools/postcss-cascade-layers');
const postcssLogical = require('postcss-logical');
const cssnano = require(`cssnano`);

const processors = [
  cssimport(),
  postcssPresetEnv({
    stage: 0,
    features: {
      'nesting-rules': true,
    },
    browsers: [`IE 8`],
  }),
  postcssOKLabFunction({
    preserve: true,
    enableProgressiveCustomProperties: true,
  }),
  postcssCascadeLayers(),
  postcssLogical({
    preserve: true,
  }),
  cssnano({
    autoprefixer: {
      remove: false,
      grid: true,
    }
  }),
];

module.exports = {
  plugins: processors,
}
