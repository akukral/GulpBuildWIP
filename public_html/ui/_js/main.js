// import app from './modules/app';
import lazySizes from 'lazysizes';

import fontLoader from './modules/fontLoader';
import Dialog from './modules/dialog';
import Details from './modules/details';
import Carousel from './modules/carousel';
import Tabs from './modules/tabs';
import nav from './modules/nav';

fontLoader([
  {
    shortName:`Neue`,
    localName:`HelveticaNeue-Roman`,
    path: `/ui/webfonts/helvetica/helveticaneue-roman-webfont`
  },
  {
    shortName:`NeueBold`,
    localName:`HelveticaNeue-Bold`,
    path: `/ui/webfonts/helvetica/helveticaneue-bold-webfont`
  }
]);
nav();

lazySizes.cfg.init = false;

// check if native lazy loading is available
if ('loading' in HTMLImageElement.prototype) {
  // console.log("Browser supports `loading`..");
  const lazy = document.querySelectorAll(`[class*='lazy']`);
  for (let item of lazy){
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
for(let win of modals ){
  new Dialog({button:win});
  // console.log(win);
}

// init details
const details = Array.from(document.querySelectorAll(`details`));
for(let detail of details ){
  new Details({container:detail})
}
// init tabs
const tabset = Array.from(document.querySelectorAll(`.Tabbed`));
for(let tab of tabset ){
  new Tabs({container:tab})
}

// init Carousel
const carousels = document.querySelectorAll(`.Carousel`);
for(let carousel of carousels){
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
  // do animationless stuff
  console.log('prefers reduced motion');
}

const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches;
const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

console.log('isDarkMode='+isDarkMode, 'isLightMode='+isLightMode, 'isNotSpecified='+isNotSpecified, 'hasNoSupport='+hasNoSupport)

// const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
// const currentTheme = localStorage.getItem('theme');

// if (currentTheme) {
//     document.documentElement.setAttribute('data-theme', currentTheme);

//     if (currentTheme === 'dark') {
//         toggleSwitch.checked = true;
//     }
// }

// function switchTheme(e) {
//     if (e.target.checked) {
//         document.documentElement.setAttribute('data-theme', 'dark');
//         localStorage.setItem('theme', 'dark');
//     }
//     else {        document.documentElement.setAttribute('data-theme', 'light');
//           localStorage.setItem('theme', 'light');
//     }
// }

// toggleSwitch.addEventListener('change', switchTheme, false);


// remove no-js body class proving JS is loaded and everything before this in this script has run.
document.body.classList.remove(`no-js`);
