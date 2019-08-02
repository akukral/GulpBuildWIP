// import app from './modules/app';
import lazySizes from 'lazysizes';

import fontLoader from './modules/fontLoader';
import Dialog from './modules/dialog';
import Details from './modules/details';
import nav from './modules/nav';

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
