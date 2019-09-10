/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _lazysizes = __webpack_require__(1);

var _lazysizes2 = _interopRequireDefault(_lazysizes);

var _fontLoader = __webpack_require__(2);

var _fontLoader2 = _interopRequireDefault(_fontLoader);

var _dialog = __webpack_require__(3);

var _dialog2 = _interopRequireDefault(_dialog);

var _details = __webpack_require__(4);

var _details2 = _interopRequireDefault(_details);

var _carousel = __webpack_require__(5);

var _carousel2 = _interopRequireDefault(_carousel);

var _nav = __webpack_require__(6);

var _nav2 = _interopRequireDefault(_nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import app from './modules/app';
(0, _fontLoader2.default)();
(0, _nav2.default)();

_lazysizes2.default.cfg.init = false;

// check if native lazy loading is available
if ('loading' in HTMLImageElement.prototype) {
  // console.log("Browser supports `loading`..");
  var lazy = document.querySelectorAll('[class*=\'lazy\']');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lazy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      item.classList.remove('lazyload');
      item.classList.add('lazyloaded');
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
} else {
  // Fetch and apply a polyfill/JavaScript library
  // console.log("Browser does not support `loading`..");
  // for lazy-loading instead.
  _lazysizes2.default.cfg.init = true;
}

// init modals
var modals = Array.from(document.querySelectorAll('[data-modal]'));
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = modals[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var win = _step2.value;

    new _dialog2.default({ button: win });
    // console.log(win);
  }

  // init details
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

var details = Array.from(document.querySelectorAll('details'));
var _iteratorNormalCompletion3 = true;
var _didIteratorError3 = false;
var _iteratorError3 = undefined;

try {
  for (var _iterator3 = details[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
    var detail = _step3.value;

    new _details2.default({ container: detail });
  }

  // init Carousel
} catch (err) {
  _didIteratorError3 = true;
  _iteratorError3 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion3 && _iterator3.return) {
      _iterator3.return();
    }
  } finally {
    if (_didIteratorError3) {
      throw _iteratorError3;
    }
  }
}

var myCarousel = new _carousel2.default();
myCarousel.init({
  id: 'Carousel',
  slidenav: true,
  animate: true,
  startAnimated: false
});

var media = '(prefers-reduced-motion: reduce)';
var pref = window.matchMedia(media);
// console.log("reduced motion=",pref)
if (pref.media !== media && !pref.matches) {
  // do animationless stuff
  console.log('prefers reduced motion');
}

var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
var isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
var isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches;
var hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

console.log('isDarkMode=' + isDarkMode, 'isLightMode=' + isLightMode, 'isNotSpecified=' + isNotSpecified, 'hasNoSupport=' + hasNoSupport);

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
document.body.classList.remove('no-js');

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function(window, factory) {
	var lazySizes = factory(window, window.document);
	window.lazySizes = lazySizes;
	if(typeof module == 'object' && module.exports){
		module.exports = lazySizes;
	}
}(window, function l(window, document) {
	'use strict';
	/*jshint eqnull:true */
	if(!document.getElementsByClassName){return;}

	var lazysizes, lazySizesConfig;

	var docElem = document.documentElement;

	var Date = window.Date;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	var addEventListener = window[_addEventListener];

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	var removeClass = function(ele, cls) {
		var reg;
		if ((reg = hasClass(ele,cls))) {
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').replace(reg, ' '));
		}
	};

	var addRemoveLoadEvents = function(dom, fn, add){
		var action = add ? _addEventListener : 'removeEventListener';
		if(add){
			addRemoveLoadEvents(dom, fn);
		}
		loadEvents.forEach(function(evt){
			dom[action](evt, fn);
		});
	};

	var triggerEvent = function(elem, name, detail, noBubbles, noCancelable){
		var event = document.createEvent('Event');

		if(!detail){
			detail = {};
		}

		detail.instance = lazysizes;

		event.initEvent(name, !noBubbles, !noCancelable);

		event.detail = detail;

		elem.dispatchEvent(event);
		return event;
	};

	var updatePolyfill = function (el, full){
		var polyfill;
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesConfig.pf) ) ){
			if(full && full.src && !el[_getAttribute]('srcset')){
				el.setAttribute('srcset', full.src);
			}
			polyfill({reevaluate: true, elements: [el]});
		} else if(full && full.src){
			el.src = full.src;
		}
	};

	var getCSS = function (elem, style){
		return (getComputedStyle(elem, null) || {})[style];
	};

	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesConfig.minSize && parent && !elem._lazysizesWidth){
			width =  parent.offsetWidth;
			parent = parent.parentNode;
		}

		return width;
	};

	var rAF = (function(){
		var running, waiting;
		var firstFns = [];
		var secondFns = [];
		var fns = firstFns;

		var run = function(){
			var runFns = fns;

			fns = firstFns.length ? secondFns : firstFns;

			running = true;
			waiting = false;

			while(runFns.length){
				runFns.shift()();
			}

			running = false;
		};

		var rafBatch = function(fn, queue){
			if(running && !queue){
				fn.apply(this, arguments);
			} else {
				fns.push(fn);

				if(!waiting){
					waiting = true;
					(document.hidden ? setTimeout : requestAnimationFrame)(run);
				}
			}
		};

		rafBatch._lsFlush = run;

		return rafBatch;
	})();

	var rAFIt = function(fn, simple){
		return simple ?
			function() {
				rAF(fn);
			} :
			function(){
				var that = this;
				var args = arguments;
				rAF(function(){
					fn.apply(that, args);
				});
			}
		;
	};

	var throttle = function(fn){
		var running;
		var lastTime = 0;
		var gDelay = lazySizesConfig.throttleDelay;
		var rICTimeout = lazySizesConfig.ricTimeout;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && rICTimeout > 49 ?
			function(){
				requestIdleCallback(run, {timeout: rICTimeout});

				if(rICTimeout !== lazySizesConfig.ricTimeout){
					rICTimeout = lazySizesConfig.ricTimeout;
				}
			} :
			rAFIt(function(){
				setTimeout(run);
			}, true)
		;

		return function(isPriority){
			var delay;

			if((isPriority = isPriority === true)){
				rICTimeout = 33;
			}

			if(running){
				return;
			}

			running =  true;

			delay = gDelay - (Date.now() - lastTime);

			if(delay < 0){
				delay = 0;
			}

			if(isPriority || delay < 9){
				idleCallback();
			} else {
				setTimeout(idleCallback, delay);
			}
		};
	};

	//based on http://modernjavascript.blogspot.de/2013/08/building-better-debounce.html
	var debounce = function(func) {
		var timeout, timestamp;
		var wait = 99;
		var run = function(){
			timeout = null;
			func();
		};
		var later = function() {
			var last = Date.now() - timestamp;

			if (last < wait) {
				setTimeout(later, wait - last);
			} else {
				(requestIdleCallback || run)(run);
			}
		};

		return function() {
			timestamp = Date.now();

			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
		};
	};

	(function(){
		var prop;

		var lazySizesDefaults = {
			lazyClass: 'lazyload',
			loadedClass: 'lazyloaded',
			loadingClass: 'lazyloading',
			preloadClass: 'lazypreload',
			errorClass: 'lazyerror',
			//strictClass: 'lazystrict',
			autosizesClass: 'lazyautosizes',
			srcAttr: 'data-src',
			srcsetAttr: 'data-srcset',
			sizesAttr: 'data-sizes',
			//preloadAfterLoad: false,
			minSize: 40,
			customMedia: {},
			init: true,
			expFactor: 1.5,
			hFac: 0.8,
			loadMode: 2,
			loadHidden: true,
			ricTimeout: 0,
			throttleDelay: 125,
		};

		lazySizesConfig = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesConfig)){
				lazySizesConfig[prop] = lazySizesDefaults[prop];
			}
		}

		window.lazySizesConfig = lazySizesConfig;

		setTimeout(function(){
			if(lazySizesConfig.init){
				init();
			}
		});
	})();

	var loader = (function(){
		var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;

		var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;

		var regImg = /^img$/i;
		var regIframe = /^iframe$/i;

		var supportScroll = ('onscroll' in window) && !(/(gle|ing)bot/.test(navigator.userAgent));

		var shrinkExpand = 0;
		var currentExpand = 0;

		var isLoading = 0;
		var lowRuns = -1;

		var resetPreloading = function(e){
			isLoading--;
			if(!e || isLoading < 0 || !e.target){
				isLoading = 0;
			}
		};

		var isVisible = function (elem) {
			if (isBodyHidden == null) {
				isBodyHidden = getCSS(document.body, 'visibility') == 'hidden';
			}

			return isBodyHidden || (getCSS(elem.parentNode, 'visibility') != 'hidden' && getCSS(elem, 'visibility') != 'hidden');
		};

		var isNestedVisible = function(elem, elemExpand){
			var outerRect;
			var parent = elem;
			var visible = isVisible(elem);

			eLtop -= elemExpand;
			eLbottom += elemExpand;
			eLleft -= elemExpand;
			eLright += elemExpand;

			while(visible && (parent = parent.offsetParent) && parent != document.body && parent != docElem){
				visible = ((getCSS(parent, 'opacity') || 1) > 0);

				if(visible && getCSS(parent, 'overflow') != 'visible'){
					outerRect = parent.getBoundingClientRect();
					visible = eLright > outerRect.left &&
						eLleft < outerRect.right &&
						eLbottom > outerRect.top - 1 &&
						eLtop < outerRect.bottom + 1
					;
				}
			}

			return visible;
		};

		var checkElements = function() {
			var eLlen, i, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal,
				beforeExpandVal, defaultExpand, preloadExpand, hFac;
			var lazyloadElems = lazysizes.elements;

			if((loadMode = lazySizesConfig.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				defaultExpand = (!lazySizesConfig.expand || lazySizesConfig.expand < 1) ?
					docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
					lazySizesConfig.expand;

				lazysizes._defEx = defaultExpand;

				preloadExpand = defaultExpand * lazySizesConfig.expFactor;
				hFac = lazySizesConfig.hFac;
				isBodyHidden = null;

				if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
					currentExpand = preloadExpand;
					lowRuns = 0;
				} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
					currentExpand = defaultExpand;
				} else {
					currentExpand = shrinkExpand;
				}

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if(beforeExpandVal !== elemExpand){
						eLvW = innerWidth + (elemExpand * hFac);
						elvH = innerHeight + elemExpand;
						elemNegativeExpand = elemExpand * -1;
						beforeExpandVal = elemExpand;
					}

					rect = lazyloadElems[i].getBoundingClientRect();

					if ((eLbottom = rect.bottom) >= elemNegativeExpand &&
						(eLtop = rect.top) <= elvH &&
						(eLright = rect.right) >= elemNegativeExpand * hFac &&
						(eLleft = rect.left) <= eLvW &&
						(eLbottom || eLright || eLleft || eLtop) &&
						(lazySizesConfig.loadHidden || isVisible(lazyloadElems[i])) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesConfig.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesConfig.sizesAttr) != 'auto')))){
						autoLoadElem = preloadElems[0] || lazyloadElems[i];
					}
				}

				if(autoLoadElem && !loadedSomething){
					unveilElement(autoLoadElem);
				}
			}
		};

		var throttledCheckElements = throttle(checkElements);

		var switchLoadingClass = function(e){
			var elem = e.target;

			if (elem._lazyCache) {
				delete elem._lazyCache;
				return;
			}

			resetPreloading(e);
			addClass(elem, lazySizesConfig.loadedClass);
			removeClass(elem, lazySizesConfig.loadingClass);
			addRemoveLoadEvents(elem, rafSwitchLoadingClass);
			triggerEvent(elem, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function(e){
			rafedSwitchLoadingClass({target: e.target});
		};

		var changeIframeSrc = function(elem, src){
			try {
				elem.contentWindow.location.replace(src);
			} catch(e){
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesConfig.srcsetAttr);

			if( (customMedia = lazySizesConfig.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
				source.setAttribute('media', customMedia);
			}

			if(sourceSrcset){
				source.setAttribute('srcset', sourceSrcset);
			}
		};

		var lazyUnveil = rAFIt(function (elem, detail, isAuto, sizes, isImg){
			var src, srcset, parent, isPicture, event, firesLoad;

			if(!(event = triggerEvent(elem, 'lazybeforeunveil', detail)).defaultPrevented){

				if(sizes){
					if(isAuto){
						addClass(elem, lazySizesConfig.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesConfig.srcsetAttr);
				src = elem[_getAttribute](lazySizesConfig.srcAttr);

				if(isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

				event = {target: elem};

				addClass(elem, lazySizesConfig.loadingClass);

				if(firesLoad){
					clearTimeout(resetPreloadingTimer);
					resetPreloadingTimer = setTimeout(resetPreloading, 2500);
					addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
				}

				if(isPicture){
					forEach.call(parent.getElementsByTagName('source'), handleSources);
				}

				if(srcset){
					elem.setAttribute('srcset', srcset);
				} else if(src && !isPicture){
					if(regIframe.test(elem.nodeName)){
						changeIframeSrc(elem, src);
					} else {
						elem.src = src;
					}
				}

				if(isImg && (srcset || isPicture)){
					updatePolyfill(elem, {src: src});
				}
			}

			if(elem._lazyRace){
				delete elem._lazyRace;
			}
			removeClass(elem, lazySizesConfig.lazyClass);

			rAF(function(){
				// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
				var isLoaded = elem.complete && elem.naturalWidth > 1;

				if( !firesLoad || isLoaded){
					if (isLoaded) {
						addClass(elem, 'ls-is-cached');
					}
					switchLoadingClass(event);
					elem._lazyCache = true;
					setTimeout(function(){
						if ('_lazyCache' in elem) {
							delete elem._lazyCache;
						}
					}, 9);
				}
			}, true);
		});

		var unveilElement = function (elem){
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesConfig.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesConfig.errorClass) && hasClass(elem, lazySizesConfig.lazyClass)){return;}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if(isAuto){
				 autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}
			var afterScroll = debounce(function(){
				lazySizesConfig.loadMode = 3;
				throttledCheckElements();
			});

			isCompleted = true;

			lazySizesConfig.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', function(){
				if(lazySizesConfig.loadMode == 3){
					lazySizesConfig.loadMode = 2;
				}
				afterScroll();
			}, true);
		};

		return {
			_: function(){
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesConfig.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesConfig.lazyClass + ' ' + lazySizesConfig.preloadClass);

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend', 'webkitAnimationEnd'].forEach(function(name){
					document[_addEventListener](name, throttledCheckElements, true);
				});

				if((/d$|^c/.test(document.readyState))){
					onload();
				} else {
					addEventListener('load', onload);
					document[_addEventListener]('DOMContentLoaded', throttledCheckElements);
					setTimeout(onload, 20000);
				}

				if(lazysizes.elements.length){
					checkElements();
					rAF._lsFlush();
				} else {
					throttledCheckElements();
				}
			},
			checkElems: throttledCheckElements,
			unveil: unveilElement
		};
	})();


	var autoSizer = (function(){
		var autosizesElems;

		var sizeElement = rAFIt(function(elem, parent, event, width){
			var sources, i, len;
			elem._lazysizesWidth = width;
			width += 'px';

			elem.setAttribute('sizes', width);

			if(regPicture.test(parent.nodeName || '')){
				sources = parent.getElementsByTagName('source');
				for(i = 0, len = sources.length; i < len; i++){
					sources[i].setAttribute('sizes', width);
				}
			}

			if(!event.detail.dataAttr){
				updatePolyfill(elem, event.detail);
			}
		});
		var getSizeElement = function (elem, dataAttr, width){
			var event;
			var parent = elem.parentNode;

			if(parent){
				width = getWidth(elem, parent, width);
				event = triggerEvent(elem, 'lazybeforesizes', {width: width, dataAttr: !!dataAttr});

				if(!event.defaultPrevented){
					width = event.detail.width;

					if(width && width !== elem._lazysizesWidth){
						sizeElement(elem, parent, event, width);
					}
				}
			}
		};

		var updateElementsSizes = function(){
			var i;
			var len = autosizesElems.length;
			if(len){
				i = 0;

				for(; i < len; i++){
					getSizeElement(autosizesElems[i]);
				}
			}
		};

		var debouncedUpdateElementsSizes = debounce(updateElementsSizes);

		return {
			_: function(){
				autosizesElems = document.getElementsByClassName(lazySizesConfig.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	})();

	var init = function(){
		if(!init.i){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	lazysizes = {
		cfg: lazySizesConfig,
		autoSizer: autoSizer,
		loader: loader,
		init: init,
		uP: updatePolyfill,
		aC: addClass,
		rC: removeClass,
		hC: hasClass,
		fire: triggerEvent,
		gW: getWidth,
		rAF: rAF,
	};

	return lazysizes;
}
));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var fontLoader = function fontLoader() {
  function loadFonts() {
    if ("fonts" in document) {
      var font = new FontFace("Neue", "local('HelveticaNeue-Roman'),\n          url('/ui/webfonts/helvetica/helveticaneue-roman-webfont.eot?#iefix') format('embedded-opentype'),\n          url('/ui/webfonts/helvetica/helveticaneue-roman-webfont.woff') format('woff'),\n          url('/ui/webfonts/helvetica/helveticaneue-roman-webfont.ttf') format('truetype')");

      var fontBold = new FontFace("NeueBold", "local('HelveticaNeue-Bold'),\n          url('/ui/webfonts/helvetica/helveticaneue-bold-webfont.eot?#iefix') format('embedded-opentype'),\n          url('/ui/webfonts/helvetica/helveticaneue-bold-webfont.woff') format('woff'),\n          url('/ui/webfonts/helvetica/helveticaneue-bold-webfont.ttf') format('truetype')", {
        weight: "700"
      });

      Promise.all([font.load(), fontBold.load()]).then(function (loadedFonts) {
        // Render them at the same time
        loadedFonts.forEach(function (font) {
          document.fonts.add(font);
        });
      }).catch(function (error) {
        return console.log(error.message);
      });
    }
  }

  if (navigator.connection && navigator.connection.saveData || "matchMedia" in window && window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection && (navigator.connection.effectiveType === "slow-2g" || navigator.connection.effectiveType === "2g")) {
    console.log("looks like you don't want custom typefaces");
  } else {
    loadFonts();
  }
};

exports.default = fontLoader;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dialog = function () {
  function Dialog(settingsObj) {
    _classCallCheck(this, Dialog);

    // constructor(options = {}) {
    // Object.assign(this, {
    //   dialogButton: document.querySelector(`[data-dialog]`),
    //   dialogTarget: document.querySelector(`[data-dialog]`).nextElementSibling,
    // }, options);
    this.settings = settingsObj;

    this.dialogButton = this.settings.button || document.querySelector('[data-dialog]');
    if (!this.dialogButton) return;
    this.dialogTarget = this.settings.target || this.dialogButton.nextElementSibling || document.querySelector('dialog') || document.querySelector('[data-dialog]').nextElementSibling;
    if (!this.dialogTarget) return;
    this.dialogClose = this.settings.close || this.dialogTarget.querySelector('[class*=\'close\'], [class*=\'Close\'], [aria-label*=\'close\']');
    if (!this.dialogClose) return;

    this.curState = false;

    this.init();

    return this;
  }

  _createClass(Dialog, [{
    key: 'init',
    value: function init() {
      this.dialogButton.addEventListener('click', this.toggleDialogVisibility.bind(this));
      this.dialogClose.addEventListener('click', this.toggleDialogVisibility.bind(this));
    }
  }, {
    key: 'toggleDialogVisibility',
    value: function toggleDialogVisibility() {
      // changing the state of the dialog being open defaults to false (not open)
      this.curState = !this.curState;

      // changing the aria states and class of the button and target
      this.dialogButton.setAttribute('aria-expanded', this.curState);
      this.dialogTarget.classList.toggle('Dialog--open');

      if (this.curState) {
        // find all of the focusable elements within the element to trap
        this.focusableElements = Array.prototype.slice.call(this.dialogTarget.querySelectorAll('iframe, iframe *, [tabindex="0"], a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'));

        this.firstFocusableEl = this.focusableElements[0];

        this.lastFocusableEl = this.focusableElements.pop();

        // setting the initial focus to be on the dialog itself
        this.dialogTarget.setAttribute('tabindex', '-1');
        this.dialogTarget.focus();

        this.dialogTarget.setAttribute('open', '');

        // listen for keyboard events namely TAB and ESC keys
        document.addEventListener('keydown', this.keypressHandler.bind(this));
      } else {
        // dealing with an autoplay or currently playing video in the modal if you close it.
        var iframeSrc = this.dialogTarget.querySelector('iframe');
        if (iframeSrc) {
          var src = iframeSrc.src;
          this.dialogTarget.querySelector('iframe').src = '';
          this.dialogTarget.querySelector('iframe').src = src;
        }

        // set the tab index of the dialog
        this.dialogTarget.setAttribute('tabindex', '0');
        this.dialogTarget.removeAttribute('open');

        this.dialogButton.focus();
      }
    }
  }, {
    key: 'keypressHandler',
    value: function keypressHandler(event) {

      var isEscape = false;
      var isTab = false;

      if ('key' in event) {
        isEscape = event.key === 'Escape' || event.key === 'Esc';
        isTab = event.key === 'Tab';
      } else {
        isEscape = event.keyCode === 27;
        isTab = event.keyCode === KEYCODE_TAB;
      }

      if (!isEscape && !isTab) return; //if the keypressed isn't a tab or escape what are we doing here

      if (isEscape && this.curState) {
        // if the state of this dialog is open/true close it and set the focus back to the button that opens it.
        this.toggleDialogVisibility();
        this.dialogButton.focus();
      }

      if (event.shiftKey) /* shift + tab */{
          if (document.activeElement === this.firstFocusableEl) {
            this.lastFocusableEl.focus();
            event.preventDefault();
          }
        } else /* tab */{
          if (document.activeElement === this.lastFocusableEl) {
            this.firstFocusableEl.focus();
            event.preventDefault();
          }
        }
    }
  }]);

  return Dialog;
}();

exports.default = Dialog;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Details = function () {
  function Details(settingsObj) {
    _classCallCheck(this, Details);

    this.settings = settingsObj;

    // set the accordion/detail elements
    this.detailsContainer = this.settings.container || document.querySelector("details");
    if (!this.detailsContainer) return;
    this.detailsButton = this.settings.button || this.detailsContainer.querySelector("summary");
    if (!this.detailsButton) return;
    this.detailsTarget = this.settings.target || this.detailsButton.nextElementSibling || this.detailsContainer.querySelector("summary").nextElementSibling || document.querySelector("Details__content");
    if (!this.detailsTarget) return;

    this.curState = false;

    this.init();

    return this;
  }

  _createClass(Details, [{
    key: "init",
    value: function init() {
      this.detailsButton.addEventListener("click", this.toggleDetailVisibility.bind(this));
      this.detailsButton.addEventListener("keydown", this.keypressHandler.bind(this));
    }
  }, {
    key: "toggleDetailVisibility",
    value: function toggleDetailVisibility(event) {
      event.preventDefault();
      // changing the state of the details being open defaults to false (not open)
      this.curState = !this.curState;

      // changing the aria states and class of the button and target
      this.detailsButton.setAttribute("aria-expanded", this.curState);
      this.detailsContainer.classList.toggle("Details--open");

      // console.log(this.curState);

      if (this.curState) {
        // console.log(`open`);
        this.detailsContainer.setAttribute("open", "open");
      } else {
        this.detailsContainer.removeAttribute("open");
        // console.log(`close`);
      }
      // return this
    }
  }, {
    key: "keypressHandler",
    value: function keypressHandler(event) {
      if (this.detailsButton.hasFocus) {
        // if the toggle button for the detail is focused allow ENTER or SPACEBAR to open the accordion.
        if (event.key === " " || event.key === "Spacebar" || event.keyCode === 0 || event.keyCode === 32) {
          event.preventDefault();
          this.toggleDetailVisibility(event);
          // console.log(`space`)
        }
        if (event.key === "Enter" || event.key === "Return" || event.keyCode === 13) {
          event.preventDefault();
          this.toggleDetailVisibility(event);
          // console.log(`enter`)
        }
      }
      // return this;
    }
  }]);

  return Details;
}();

exports.default = Details;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
!function () {
  var w = window,
      d = w.document;

  function addPolyfill(e) {
    var type = e.type === 'focus' ? 'focusin' : 'focusout';
    var event = new CustomEvent(type, {
      bubbles: true,
      cancelable: false
    });
    event.c1Generated = true;
    e.target.dispatchEvent(event);
  }

  function removePolyfill(e) {
    if (!e.c1Generated) {
      // focus after focusin, so chrome will the first time trigger tow times focusin
      d.removeEventListener('focus', addPolyfill, true);
      d.removeEventListener('blur', addPolyfill, true);
      d.removeEventListener('focusin', removePolyfill, true);
      d.removeEventListener('focusout', removePolyfill, true);
    }
    setTimeout(function () {
      d.removeEventListener('focusin', removePolyfill, true);
      d.removeEventListener('focusout', removePolyfill, true);
    });
  }

  if (w.onfocusin === undefined) {
    d.addEventListener('focus', addPolyfill, true);
    d.addEventListener('blur', addPolyfill, true);
    d.addEventListener('focusin', removePolyfill, true);
    d.addEventListener('focusout', removePolyfill, true);
  }
}();

/*
   Carousel Prototype
   Eric Eggert for W3C
*/

var myCarousel = function myCarousel() {

  // Initial variables
  var carousel = void 0;
  var slides = void 0;
  var index = void 0;
  var slidenav = void 0;
  var settings = void 0;
  var timer = void 0;
  var setFocus = void 0;
  var animationSuspended = void 0;

  // Helper function: Iterates over an array of elements
  function forEachElement(elements, fn) {
    for (var i = 0; i < elements.length; i++) {
      fn(elements[i], i);
    }
  }

  // Helper function: Remove Class
  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  // Helper function: Test if element has a specific class
  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }

  // Initialization for the carousel
  // Argument: set = an object of settings
  // Possible settings:
  // id <string> ID of the carousel wrapper element (required).
  // slidenav <bool> If true, a list of slides is shown.
  // animate <bool> If true, the slides can be animated.
  // startAnimated <bool> If true, the animation begins
  //                        immediately.
  //                      If false, the animation needs
  //                        to be initiated by clicking
  //                        the play button.
  function init(set) {

    // Make settings available to all functions
    settings = set;

    // Select the element and the individual slides
    carousel = document.getElementById(settings.id);
    slides = carousel.querySelectorAll('.Carousel__slide');

    carousel.className = 'Carousel Carousel--active';

    // Create unordered list for controls, and attach click events fo previous and next slide
    var ctrls = document.createElement('ul');

    ctrls.className = 'controls';
    ctrls.innerHTML = '<li>' + '<button type="button" class="Button btn-prev">&laquo;</button>' + '</li>' + '<li>' + '<button type="button" class="Button btn-next">&raquo;</button>' + '</li>';

    ctrls.querySelector('.btn-prev').addEventListener('click', function () {
      prevSlide(true);
    });
    ctrls.querySelector('.btn-next').addEventListener('click', function () {
      nextSlide(true);
    });

    carousel.appendChild(ctrls);

    // If the carousel is animated or a slide navigation is requested in the settings, anoter unordered list that contains those elements is added. (Note that you cannot supress the navigation when it is animated.)
    if (settings.slidenav || settings.animate) {
      slidenav = document.createElement('ul');

      slidenav.className = 'Carousel__slidenav';

      if (settings.animate) {
        var li = document.createElement('li');

        if (settings.startAnimated) {
          li.innerHTML = '<button data-action="stop"><span class="sr-only">Stop Animation </span>￭</button>';
        } else {
          li.innerHTML = '<button data-action="start"><span class="sr-only">Start Animation </span>▶</button>';
        }

        slidenav.appendChild(li);
      }

      if (settings.slidenav) {
        forEachElement(slides, function (el, i) {
          var li = document.createElement('li');
          var klass = i === 0 ? 'class="current" ' : '';
          var kurrent = i === 0 ? ' <span class="sr-only">(Current Item)</span>' : '';

          li.innerHTML = '<button ' + klass + 'data-slide="' + i + '"><span class="sr-only">Item</span> ' + (i + 1) + kurrent + '</button>';
          slidenav.appendChild(li);
        });
      }

      slidenav.addEventListener('click', function (event) {
        var button = event.target;
        if (button.localName === 'button') {
          if (button.getAttribute('data-slide')) {
            stopAnimation();
            setSlides(button.getAttribute('data-slide'), true);
          } else if (button.getAttribute('data-action') === 'stop') {
            stopAnimation();
          } else if (button.getAttribute('data-action') === 'start') {
            startAnimation();
          }
        }
      }, true);

      carousel.className = 'Carousel Carousel--active Carousel--with-slidenav';
      carousel.appendChild(slidenav);
    }

    // Add a live region to announce the slide number when using the previous/next buttons
    var liveregion = document.createElement('div');
    liveregion.setAttribute('aria-live', 'polite');
    liveregion.setAttribute('aria-atomic', 'true');
    liveregion.setAttribute('class', 'liveregion sr-only');
    carousel.appendChild(liveregion);

    // After the slide transitioned, remove the in-transition class, if focus should be set, set the tabindex attribute to -1 and focus the slide.
    slides[0].parentNode.addEventListener('transitionend', function (event) {
      var slide = event.target;
      removeClass(slide, 'in-transition');
      if (hasClass(slide, 'current')) {
        if (setFocus) {
          slide.setAttribute('tabindex', '-1');
          slide.focus();
          setFocus = false;
        }
      }
    });

    // When the mouse enters the carousel, suspend the animation.
    carousel.addEventListener('mouseenter', suspendAnimation);

    // When the mouse leaves the carousel, and the animation is suspended, start the animation.
    carousel.addEventListener('mouseleave', function () {
      if (animationSuspended) {
        startAnimation();
      }
    });

    // When the focus enters the carousel, suspend the animation
    carousel.addEventListener('focusin', function (event) {
      if (!hasClass(event.target, 'slide')) {
        suspendAnimation();
      }
    });

    // When the focus leaves the carousel, and the animation is suspended, start the animation
    carousel.addEventListener('focusout', function (event) {
      if (!hasClass(event.target, 'Carousel__slide') && animationSuspended) {
        startAnimation();
      }
    });

    // Set the index (=current slide) to 0 – the first slide
    index = 0;
    setSlides(index);

    // If the carousel is animated, advance to the
    // next slide after 5s
    if (settings.startAnimated) {
      timer = setTimeout(nextSlide, 5000);
    }
  }

  // Function to set a slide the current slide
  function setSlides(new_current, setFocusHere, transition, announceItemHere) {
    // Focus, transition and announce Item are optional parameters.
    // focus denotes if the focus should be set after the
    // carousel advanced to slide number new_current.
    // transition denotes if the transition is going into the
    // next or previous direction.
    // If announceItem is set to true, the live region’s text is changed (and announced)
    // Here defaults are set:

    setFocus = typeof setFocusHere !== 'undefined' ? setFocusHere : false;
    transition = typeof transition !== 'undefined' ? transition : 'none';
    var announceItem = typeof announceItemHere !== 'undefined' ? announceItemHere : false;

    new_current = parseFloat(new_current);

    var length = slides.length;
    var new_next = new_current + 1;
    var new_prev = new_current - 1;

    // If the next slide number is equal to the length,
    // the next slide should be the first one of the slides.
    // If the previous slide number is less than 0.
    // the previous slide is the last of the slides.
    if (new_next === length) {
      new_next = 0;
    } else if (new_prev < 0) {
      new_prev = length - 1;
    }

    // Reset slide classes
    for (var i = slides.length - 1; i >= 0; i--) {
      slides[i].className = 'slide';
    }

    // Add classes to the previous, next and current slide
    slides[new_next].className = 'next Carousel__slide' + (transition === 'next' ? ' in-transition' : '');
    slides[new_next].setAttribute('aria-hidden', 'true');

    slides[new_prev].className = 'prev Carousel__slide' + (transition === 'prev' ? ' in-transition' : '');
    slides[new_prev].setAttribute('aria-hidden', 'true');

    slides[new_current].className = 'current Carousel__slide';
    slides[new_current].removeAttribute('aria-hidden');

    // Update the text in the live region which is then announced by screen readers.
    if (announceItem) {
      carousel.querySelector('.liveregion').textContent = 'Item ' + (new_current + 1) + ' of ' + slides.length;
    }

    // Update the buttons in the slider navigation to match the currently displayed  item
    if (settings.slidenav) {
      var buttons = carousel.querySelectorAll('.Carousel__slidenav button[data-slide]');
      for (var j = buttons.length - 1; j >= 0; j--) {
        buttons[j].className = '';
        buttons[j].innerHTML = '<span class="sr-only">Item</span> ' + (j + 1);
      }
      buttons[new_current].className = 'current';
      buttons[new_current].innerHTML = '<span class="sr-only">Item</span> ' + (new_current + 1) + ' <span class="sr-only">(Current Item)</span>';
    }

    // Set the global index to the new current value
    index = new_current;
  }

  // Function to advance to the next slide
  function nextSlide(announceItem) {
    announceItem = typeof announceItem !== 'undefined' ? announceItem : false;

    var length = slides.length,
        new_current = index + 1;

    if (new_current === length) {
      new_current = 0;
    }

    // If we advance to the next slide, the previous needs to be
    // visible to the user, so the third parameter is 'prev', not
    // next.
    setSlides(new_current, false, 'prev', announceItem);

    // If the carousel is animated, advance to the next
    // slide after 5s
    if (settings.animate) {
      timer = setTimeout(nextSlide, 5000);
    }
  }

  // Function to advance to the previous slide
  function prevSlide(announceItem) {
    announceItem = typeof announceItem !== 'undefined' ? announceItem : false;

    var length = slides.length,
        new_current = index - 1;

    // If we are already on the first slide, show the last slide instead.
    if (new_current < 0) {
      new_current = length - 1;
    }

    // If we advance to the previous slide, the next needs to be
    // visible to the user, so the third parameter is 'next', not
    // prev.
    setSlides(new_current, false, 'next', announceItem);
  }

  // Function to stop the animation
  function stopAnimation() {
    clearTimeout(timer);
    settings.animate = false;
    animationSuspended = false;
    var _this = carousel.querySelector('[data-action]');
    _this.innerHTML = '<span class="sr-only">Start Animation </span>▶';
    _this.setAttribute('data-action', 'start');
  }

  // Function to start the animation
  function startAnimation() {
    settings.animate = true;
    animationSuspended = false;
    timer = setTimeout(nextSlide, 5000);
    var _this = carousel.querySelector('[data-action]');
    _this.innerHTML = '<span class="sr-only">Stop Animation </span>￭';
    _this.setAttribute('data-action', 'stop');
  }

  // Function to suspend the animation
  function suspendAnimation() {
    if (settings.animate) {
      clearTimeout(timer);
      settings.animate = false;
      animationSuspended = true;
    }
  }

  // Making some functions public
  return {
    init: init,
    next: nextSlide,
    prev: prevSlide,
    goto: setSlides,
    stop: stopAnimation,
    start: startAnimation
  };
};

exports.default = myCarousel;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Nav;
function Nav() {
  var nav = document.querySelectorAll("Nav")[0];
  // const bodyEverything = Array.from(document.querySelectorAll(`body *`));
  // const navEverything = Array.from(document.querySelectorAll(`body .Header, body .Header *`));
  var button = document.getElementsByClassName("Nav__toggle")[0];

  // const everythingButNav = bodyEverything.filter((el) => !navEverything.includes(el));
  // console.log(everythingButNav);

  var curState = false;

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  function keyHandler(e) {

    var focusableEls = Array.from(nav.querySelectorAll("iframe, iframe *, [tabindex=\"0\"], a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type=\"text\"]:not([disabled]), input[type=\"radio\"]:not([disabled]), input[type=\"checkbox\"]:not([disabled]), select:not([disabled])"));
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];

    // console.log(e);
    var isTabPressed = e.key === "Tab" || e.keyCode === 9;
    var isEscape = e.key === "Escape" || e.key === "Esc" || e.keyCode === 27;

    // if (!isTabPressed) {
    //   return;
    // }

    if (e.shiftKey) /* shift + tab */{
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */{
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }

    if (isEscape && curState) {
      toggleNav();
    }
  }

  var toggleNav = function toggleNav() {
    // event.preventDefault();
    curState = !curState;
    if (curState) {
      nav.classList.toggle("Nav--isactive");
      nav.addEventListener("keydown", keyHandler);

      setTimeout(function () {
        nav.classList.toggle("Nav--visible");
      }, 100);
    } else {

      // console.log('button')
      button.focus();

      nav.classList.toggle("Nav--visible");
      nav.removeEventListener("keydown", keyHandler, { passive: true });

      setTimeout(function () {
        nav.classList.toggle("Nav--isactive");
      }, 200);
    }
    button.setAttribute("aria-expanded", curState);
  };

  if (button) {
    button.addEventListener("click", toggleNav);
  }
}

// EOF

/***/ })
/******/ ]);