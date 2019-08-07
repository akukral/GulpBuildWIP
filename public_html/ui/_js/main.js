// import app from './modules/app';
import lazySizes from 'lazysizes';

import fontLoader from './modules/fontLoader';
import Dialog from './modules/dialog';
import Details from './modules/details';
import nav from './modules/nav';

lazySizes.cfg.init = false;

if ('loading' in HTMLImageElement.prototype) {
  console.log("Browser supports `loading`..");
  const lazy = document.querySelectorAll(`[class*='lazy']`);
  for (let item of lazy){
    item.classList.remove(`lazyload`);
    item.classList.add(`lazyloaded`);
  }
  // lazySizes.cfg.lazyClass = 'lazy';
} else {
  // Fetch and apply a polyfill/JavaScript library
  console.log("Browser does not support `loading`..");
  // for lazy-loading instead.
  lazySizes.cfg.init = true;
}

// app();
fontLoader();

// init modals
const modals = Array.from(document.querySelectorAll(`[data-modal]`));
for(let win of modals ){
  new Dialog(win)
}

// init details
const details = Array.from(document.querySelectorAll(`details`));
for(let detail of details ){
  new Details(detail)
}

// remove no-js body class proving js is loaded and everything has run
document.body.classList.remove(`no-js`);
