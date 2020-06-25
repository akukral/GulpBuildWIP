// import app from './modules/app';
import lazySizes from 'lazysizes';
import quicklink from 'quicklink/dist/quicklink.umd';
import debounce from 'debounce';

import fontLoader from './modules/fontLoader';
import Dialog from './modules/dialog';
import Details from './modules/details';
import Carousel from './modules/carousel';
import Tabs from './modules/tabs';
import nav from './modules/nav';
import themePicker from './modules/theme';

quicklink.listen();

// Load in fonts, all font files myst be in the same directory. loads like js/css files, no file extention name needed.
// loads in woff eot and ttf files automatically if they are all in the same  directory.
// Fallbacks for short name is local and conversly. Back up name for both is 'font1', 'font2', etc
fontLoader([{
    shortName: `Neue`,
    localName: `HelveticaNeue-Roman`,
    path: `/ui/webfonts/helvetica/helveticaneue-roman-webfont`
  },
  {
    shortName: `NeueBold`,
    localName: `HelveticaNeue-Bold`,
    path: `/ui/webfonts/helvetica/helveticaneue-bold-webfont`
  }
]);

nav();

lazySizes.cfg.init = false;

// check if native lazy loading is available
if ('loading' in HTMLImageElement.prototype) {
  // console.log("Browser supports `loading`..");
  const lazy = document.querySelectorAll(`[class*='lazy']`);
  for (let item of lazy) {
    item.classList.remove(`lazyload`);
    item.classList.add(`lazyloaded`);
  }
} else {
  // Fetch and apply a polyfill/JavaScript library
  // console.log("Browser does not support `loading`..");
  // for lazy-loading instead.
  lazySizes.cfg.init = true;
}

// init modals
const modals = Array.from(document.querySelectorAll(`[data-modal]`));
for (let win of modals) {
  new Dialog({
    button: win
  });
  // console.log(win);
}

// init details
const details = Array.from(document.querySelectorAll(`details`));
for (let detail of details) {
  new Details({
    container: detail
  })
}
// init tabs
const tabset = Array.from(document.querySelectorAll(`.Tabbed`));
for (let tab of tabset) {
  new Tabs({
    container: tab
  })
}

// init Carousel
const carousels = document.querySelectorAll(`.Carousel`);
for (let carousel of carousels) {
  // console.log(carousel.querySelector(`.Carousel__slide`))
  let newCarousel = new Carousel();
  newCarousel.init({
    id: carousel,
    slidenav: true,
    animate: true,
    startAnimated: false,
  });
}

const media = '(prefers-reduced-motion: reduce)';
const pref = window.matchMedia(media);
// console.log("reduced motion=",pref)
if (pref.media !== media && !pref.matches) {
  // do stuff without animations
  // console.log('prefers reduced motion');
}

// Night mode theme picker
themePicker(`.Theme__picker input[type="checkbox"]`);

// window.resize callback function
function getVerticalHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  console.log(vh);
}

window.onresize = debounce(getVerticalHeight, 200);

getVerticalHeight();

// remove no-js body class proving JS is loaded and everything before this in this script has run and not errored out.
document.body.classList.remove(`no-js`);
