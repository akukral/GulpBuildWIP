// import app from './modules/app';
import lazySizes from 'lazysizes';
import Quicklink from 'quicklink/dist/quicklink.umd';
import debounce from 'debounce';

import FontLoader from './modules/fontLoader';
import Dialog from './modules/dialog';
import Details from './modules/details';
import Carousel from './modules/carousel';
import Tabs from './modules/tabs';
import Nav from './modules/nav';
import themePicker from './modules/theme';

// window.addEventListener('beforeunload', function () {
//   var documentFade = document.querySelector('body')
//   documentFade.animate({
//       opacity: [1, 0]
//     }, {
//       duration: 200,
//       easing: 'ease-out'
//     });
// });

// import { getPageContent, onLinkNavigate } from './modules/utils';

// onLinkNavigate(async ({ toPath }) => {
//   const content = await getPageContent(toPath);

//   startViewTransition(() => {
//     // This is a pretty heavy-handed way to update page content.
//     // In production, you'd likely be modifying DOM elements directly,
//     // or using a framework.
//     // innerHTML is used here just to keep the DOM update super simple.
//     document.body.innerHTML = content;
//   });
// });


// // A little helper function like this is really handy
// // to handle progressive enhancement.
// function startViewTransition(callback) {
//   if (!document.startViewTransition) {
//     callback();
//     return;
//   }

//   document.startViewTransition(callback);
// }

// import Splide from '@splidejs/splide';


Quicklink.listen();

// Load in fonts, all font files myst be in the same directory. loads like js/css files, no file extention name needed.
// loads in woff eot and ttf files automatically if they are all in the same  directory.
// Fallbacks for short name is local and conversly. Back up name for both is 'font1', 'font2', etc
FontLoader([{
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

Nav();

lazySizes.cfg.init = false;

// check if native lazy loading is available
if ('loading' in HTMLImageElement.prototype) {
  // console.log("Browser supports `loading`..");
  const lazy = document.querySelectorAll(`[class*='lazyload']`);
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

// init Carousels
// new Splide('.splide', {
//   type: 'loop',
//   autoplay: true,
//   reducedMotion: {
//     speed: 0,
//     rewindSpeed: 0,
//     autoplay: 'pause',
//   },
// }).mount();
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
themePicker(`.ThemePicker input[type="checkbox"]`);

// window.resize callback function
function getVerticalHeight() {
  let vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty(`--vh`, `${vh}px`);
  // console.info(vh);
}
window.onresize = debounce(getVerticalHeight, 20);
getVerticalHeight();

const allLinks = Array.from(document.querySelectorAll(`[target="_blank"]`));
allLinks.forEach(el => {
  if (!el.hasAttribute(`rel`)) {
    el.setAttribute(`rel`, `noreferrer`)
  }
});

// function ready(fn) {
//   if (document.readyState !== 'loading') {
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }

// remove no-js body class proving JS is loaded and everything before this in this script has run and not errored out.
document.body.classList.remove(`no-js`);
