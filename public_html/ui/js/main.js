/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public_html/ui/_js/modules/carousel.js":
/*!************************************************!*\
  !*** ./public_html/ui/_js/modules/carousel.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  var carousel;
  var slides;
  var index;
  var slidenav;
  var settings;
  var timer;
  var setFocus;
  var animationSuspended; // Helper function: Iterates over an array of elements

  function forEachElement(elements, fn) {
    for (var i = 0; i < elements.length; i++) {
      fn(elements[i], i);
    }
  } // Helper function: Remove Class


  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  } // Helper function: Test if element has a specific class


  function hasClass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  } // Initialization for the carousel
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
    settings = set; // Select the element and the individual slides

    carousel = settings.id; // console.log(set)

    slides = carousel.querySelectorAll('.Carousel__slide');
    carousel.className = 'Carousel Carousel--active'; // Create unordered list for controls, and attach click events fo previous and next slide

    var ctrls = document.createElement('ul');
    ctrls.className = 'controls';
    ctrls.innerHTML = '<li>' + '<button type="button" class="Button btn-prev">&lsaquo;</button>' + '</li>' + '<li>' + '<button type="button" class="Button btn-next">&rsaquo;</button>' + '</li>';
    ctrls.querySelector('.btn-prev').addEventListener('click', function () {
      prevSlide(true);
    });
    ctrls.querySelector('.btn-next').addEventListener('click', function () {
      nextSlide(true);
    });
    carousel.appendChild(ctrls); // If the carousel is animated or a slide navigation is requested in the settings, anoter unordered list that contains those elements is added. (Note that you cannot supress the navigation when it is animated.)

    if (settings.slidenav || settings.animate) {
      slidenav = document.createElement('ul');
      slidenav.className = 'Carousel__slidenav';

      if (settings.animate) {
        var li = document.createElement('li');

        if (settings.startAnimated) {
          li.innerHTML = '<button data-action="stop" class="Button"><span class="sr-only">Stop Animation </span>￭</button>';
        } else {
          li.innerHTML = '<button data-action="start" class="Button"><span class="sr-only">Start Animation </span>▶</button>';
        }

        slidenav.appendChild(li);
      }

      if (settings.slidenav) {
        forEachElement(slides, function (el, i) {
          var li = document.createElement('li');
          var klass = i === 0 ? 'current' : '';
          var kurrent = i === 0 ? ' <span class="sr-only">(Current Item)</span>' : '';
          li.innerHTML = '<button class="Button ' + klass + '" data-slide="' + i + '"><span class="sr-only">Item</span> ' + (i + 1) + kurrent + '</button>';
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
    } // Add a live region to announce the slide number when using the previous/next buttons


    var liveregion = document.createElement('div');
    liveregion.setAttribute('aria-live', 'polite');
    liveregion.setAttribute('aria-atomic', 'true');
    liveregion.setAttribute('class', 'liveregion sr-only');
    carousel.appendChild(liveregion); // After the slide transitioned, remove the in-transition class, if focus should be set, set the tabindex attribute to -1 and focus the slide.

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
    }); // When the mouse enters the carousel, suspend the animation.

    carousel.addEventListener('mouseenter', suspendAnimation); // When the mouse leaves the carousel, and the animation is suspended, start the animation.

    carousel.addEventListener('mouseleave', function () {
      if (animationSuspended) {
        startAnimation();
      }
    }); // When the focus enters the carousel, suspend the animation

    carousel.addEventListener('focusin', function (event) {
      if (!hasClass(event.target, 'slide')) {
        suspendAnimation();
      }
    }); // When the focus leaves the carousel, and the animation is suspended, start the animation

    carousel.addEventListener('focusout', function (event) {
      if (!hasClass(event.target, 'Carousel__slide') && animationSuspended) {
        startAnimation();
      }
    }); // Set the index (=current slide) to 0 – the first slide

    index = 0;
    setSlides(index); // If the carousel is animated, advance to the
    // next slide after 5s

    if (settings.startAnimated) {
      timer = setTimeout(nextSlide, 5000);
    }
  } // Function to set a slide the current slide


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
    var new_prev = new_current - 1; // If the next slide number is equal to the length,
    // the next slide should be the first one of the slides.
    // If the previous slide number is less than 0.
    // the previous slide is the last of the slides.

    if (new_next === length) {
      new_next = 0;
    } else if (new_prev < 0) {
      new_prev = length - 1;
    } // Reset slide classes


    for (var i = slides.length - 1; i >= 0; i--) {
      slides[i].className = 'slide';
    } // Add classes to the previous, next and current slide


    slides[new_next].className = 'next Carousel__slide' + (transition === 'next' ? ' in-transition' : '');
    slides[new_next].setAttribute('aria-hidden', 'true');
    slides[new_prev].className = 'prev Carousel__slide' + (transition === 'prev' ? ' in-transition' : '');
    slides[new_prev].setAttribute('aria-hidden', 'true');
    slides[new_current].className = 'current Carousel__slide';
    slides[new_current].removeAttribute('aria-hidden'); // Update the text in the live region which is then announced by screen readers.

    if (announceItem) {
      carousel.querySelector('.liveregion').textContent = 'Item ' + (new_current + 1) + ' of ' + slides.length;
    } // Update the buttons in the slider navigation to match the currently displayed  item


    if (settings.slidenav) {
      var buttons = carousel.querySelectorAll('.Carousel__slidenav button[data-slide]');

      for (var j = buttons.length - 1; j >= 0; j--) {
        buttons[j].classList.remove = 'current';
        buttons[j].innerHTML = '<span class="sr-only">Item</span> ' + (j + 1);
      }

      buttons[new_current].classList.add = 'current';
      buttons[new_current].innerHTML = '<span class="sr-only">Item</span> ' + (new_current + 1) + ' <span class="sr-only">(Current Item)</span>';
    } // Set the global index to the new current value


    index = new_current;
  } // Function to advance to the next slide


  function nextSlide(announceItem) {
    announceItem = typeof announceItem !== 'undefined' ? announceItem : false;
    var length = slides.length,
        new_current = index + 1;

    if (new_current === length) {
      new_current = 0;
    } // If we advance to the next slide, the previous needs to be
    // visible to the user, so the third parameter is 'prev', not
    // next.


    setSlides(new_current, false, 'prev', announceItem); // If the carousel is animated, advance to the next
    // slide after 5s

    if (settings.animate) {
      timer = setTimeout(nextSlide, 5000);
    }
  } // Function to advance to the previous slide


  function prevSlide(announceItem) {
    announceItem = typeof announceItem !== 'undefined' ? announceItem : false;
    var length = slides.length,
        new_current = index - 1; // If we are already on the first slide, show the last slide instead.

    if (new_current < 0) {
      new_current = length - 1;
    } // If we advance to the previous slide, the next needs to be
    // visible to the user, so the third parameter is 'next', not
    // prev.


    setSlides(new_current, false, 'next', announceItem);
  } // Function to stop the animation


  function stopAnimation() {
    clearTimeout(timer);
    settings.animate = false;
    animationSuspended = false;

    var _this = carousel.querySelector('[data-action]');

    _this.innerHTML = '<span class="sr-only">Start Animation </span>▶';

    _this.setAttribute('data-action', 'start');
  } // Function to start the animation


  function startAnimation() {
    settings.animate = true;
    animationSuspended = false;
    timer = setTimeout(nextSlide, 5000);

    var _this = carousel.querySelector('[data-action]');

    _this.innerHTML = '<span class="sr-only">Stop Animation </span>￭';

    _this.setAttribute('data-action', 'stop');
  } // Function to suspend the animation


  function suspendAnimation() {
    if (settings.animate) {
      clearTimeout(timer);
      settings.animate = false;
      animationSuspended = true;
    }
  } // Making some functions public


  return {
    init: init,
    next: nextSlide,
    prev: prevSlide,
    "goto": setSlides,
    stop: stopAnimation,
    start: startAnimation
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myCarousel);

/***/ }),

/***/ "./public_html/ui/_js/modules/details.js":
/*!***********************************************!*\
  !*** ./public_html/ui/_js/modules/details.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Details = /*#__PURE__*/function () {
  function Details(settingsObj) {
    _classCallCheck(this, Details);

    this.settings = settingsObj; // set the accordion/detail elements

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
      event.preventDefault(); // changing the state of the details being open defaults to false (not open)

      this.curState = !this.curState; // changing the aria states and class of the button and target

      this.detailsButton.setAttribute("aria-expanded", this.curState);
      this.detailsContainer.classList.toggle("Details--open"); // console.log(this.curState);

      if (this.curState) {
        // console.log(`open`);
        this.detailsContainer.setAttribute("open", "open");
      } else {
        this.detailsContainer.removeAttribute("open"); // console.log(`close`);
      } // return this

    }
  }, {
    key: "keypressHandler",
    value: function keypressHandler(event) {
      if (this.detailsButton.hasFocus) {
        // if the toggle button for the detail is focused allow ENTER or SPACEBAR to open the accordion.
        if (event.key === " " || event.key === "Spacebar" || event.keyCode === 0 || event.keyCode === 32) {
          event.preventDefault();
          this.toggleDetailVisibility(event); // console.log(`space`)
        }

        if (event.key === "Enter" || event.key === "Return" || event.keyCode === 13) {
          event.preventDefault();
          this.toggleDetailVisibility(event); // console.log(`enter`)
        }
      } // return this;

    }
  }]);

  return Details;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Details);

/***/ }),

/***/ "./public_html/ui/_js/modules/dialog.js":
/*!**********************************************!*\
  !*** ./public_html/ui/_js/modules/dialog.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Dialog = /*#__PURE__*/function () {
  function Dialog(settingsObj) {
    _classCallCheck(this, Dialog);

    // constructor(options = {}) {
    // Object.assign(this, {
    //   dialogButton: document.querySelector(`[data-dialog]`),
    //   dialogTarget: document.querySelector(`[data-dialog]`).nextElementSibling,
    // }, options);
    this.settings = settingsObj;
    this.dialogButton = this.settings.button || document.querySelector("[data-dialog]");
    if (!this.dialogButton) return;
    this.dialogTarget = this.settings.target || this.dialogButton.nextElementSibling || document.querySelector("dialog") || document.querySelector("[data-dialog]").nextElementSibling;
    if (!this.dialogTarget) return;
    this.dialogClose = this.settings.close || this.dialogTarget.querySelector("[class*='close'], [class*='Close'], [aria-label*='close']");
    if (!this.dialogClose) return;
    this.curState = false;
    this.init();
    return this;
  }

  _createClass(Dialog, [{
    key: "init",
    value: function init() {
      this.dialogButton.addEventListener("click", this.toggleDialogVisibility.bind(this));
      this.dialogClose.addEventListener("click", this.toggleDialogVisibility.bind(this));
    }
  }, {
    key: "toggleDialogVisibility",
    value: function toggleDialogVisibility() {
      // changing the state of the dialog being open defaults to false (not open)
      this.curState = !this.curState; // changing the aria states and class of the button and target

      this.dialogButton.setAttribute("aria-expanded", this.curState);
      this.dialogTarget.classList.toggle("Dialog--open");

      if (this.curState) {
        // find all of the focusable elements within the element to trap
        this.focusableElements = Array.prototype.slice.call(this.dialogTarget.querySelectorAll('iframe, iframe *, [tabindex="0"], a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'));
        this.firstFocusableEl = this.focusableElements[0];
        this.lastFocusableEl = this.focusableElements.pop(); // setting the initial focus to be on the dialog itself

        this.dialogTarget.setAttribute("tabindex", "-1");
        this.dialogTarget.focus();
        this.dialogTarget.setAttribute("open", ""); // listen for keyboard events namely TAB and ESC keys

        document.addEventListener("keydown", this.keypressHandler.bind(this));
      } else {
        // dealing with an autoplay or currently playing video in the modal if you close it.
        var iframeSrc = this.dialogTarget.querySelector("iframe");

        if (iframeSrc) {
          var src = iframeSrc.src;
          this.dialogTarget.querySelector("iframe").src = "";
          this.dialogTarget.querySelector("iframe").src = src;
        } // set the tab index of the dialog


        this.dialogTarget.setAttribute("tabindex", "0");
        this.dialogTarget.removeAttribute("open");
        this.dialogButton.focus();
      }
    }
  }, {
    key: "keypressHandler",
    value: function keypressHandler(event) {
      var isEscape = false;
      var isTab = false;

      if ("key" in event) {
        isEscape = event.key === "Escape" || event.key === "Esc";
        isTab = event.key === "Tab";
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

      if (event.shiftKey)
        /* shift + tab */
        {
          if (document.activeElement === this.firstFocusableEl) {
            this.lastFocusableEl.focus();
            event.preventDefault();
          }
        } else
        /* tab */
        {
          if (document.activeElement === this.lastFocusableEl) {
            this.firstFocusableEl.focus();
            event.preventDefault();
          }
        }
    }
  }]);

  return Dialog;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dialog);

/***/ }),

/***/ "./public_html/ui/_js/modules/fontLoader.js":
/*!**************************************************!*\
  !*** ./public_html/ui/_js/modules/fontLoader.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var fontLoader = function fontLoader(fontsToLoad) {
  function loadFonts() {
    if ("fonts" in document) {
      var fontsArray = fontsToLoad.map(function (font, i) {
        var shortName = font.shortName || font.localName || "font".concat(i + 1);
        var localName = font.localName || font.shortName || "font".concat(i + 1);
        var path = font.path;

        var doesFileExist = function doesFileExist(urlToFile, extension) {
          fetch(urlToFile + extension, {
            method: 'GET'
          }) // .then( response => console.warn('success:', response) )
          // .catch( error => console.warn('error:', error) );
          .then(function (response) {
            return response;
          })["catch"](function (error) {
            return error;
          });
        };

        var fontsToEmbed;

        if (doesFileExist(path, ".eot")) {
          fontsToEmbed += "url('".concat(path, ".eot?#iefix') format('embedded-opentype'),");
        }

        if (doesFileExist(path, ".ttf")) {
          fontsToEmbed += "url('".concat(path, ".format('truetype'),");
        }

        if (doesFileExist(path, ".woff2")) {
          fontsToEmbed += "url('".concat(path, ".woff2') format('woff2'),");
        }

        if (doesFileExist(path, ".woff")) {
          fontsToEmbed += "url('".concat(path, ".woff') format('woff'),");
        }

        var newFont = new FontFace(shortName, "local(".concat(localName, "),\n            url('").concat(path, ".ttf') format('truetype')"), {
          weight: 400
        });
        newFont.display = 'swap';
        return newFont;
      }); // console.log(fontsArray);

      var requests = fontsArray.map(function (font) {
        return font.load();
      });
      Promise.all(requests).then(function (loadedFonts) {
        // Render them at the same time
        loadedFonts.forEach(function (font) {
          document.fonts.add(font);
        });
      }).then(function (_) {
        document.documentElement.classList.add('fonts-loaded');
      })["catch"](function (error) {
        console.warn(error.message);
      });
    }
  }

  if (navigator.connection && navigator.connection.saveData || "matchMedia" in window && window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection && (navigator.connection.effectiveType === "slow-2g" || navigator.connection.effectiveType === "2g")) {
    console.warn("looks like you don't want custom typefaces");
  } else {
    loadFonts();
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fontLoader);

/***/ }),

/***/ "./public_html/ui/_js/modules/nav.js":
/*!*******************************************!*\
  !*** ./public_html/ui/_js/modules/nav.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Nav)
/* harmony export */ });
function Nav() {
  var nav = document.querySelectorAll("Nav")[0]; // const bodyEverything = Array.from(document.querySelectorAll(`body *`));
  // const navEverything = Array.from(document.querySelectorAll(`body .Header, body .Header *`));

  var button = document.getElementsByClassName("Nav__toggle")[0]; // const everythingButNav = bodyEverything.filter((el) => !navEverything.includes(el));
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
    var lastFocusableEl = focusableEls[focusableEls.length - 1]; // console.log(e);
    // let isTabPressed = (e.key === `Tab` || e.keyCode === 9);

    var isEscape = e.key === "Escape" || e.key === "Esc" || e.keyCode === 27; // if (!isTabPressed) {
    //   return;
    // }

    if (e.shiftKey)
      /* shift + tab */
      {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else
      /* tab */
      {
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
      nav.removeEventListener("keydown", keyHandler, {
        passive: true
      });
      setTimeout(function () {
        nav.classList.toggle("Nav--isactive");
      }, 200);
    }

    button.setAttribute("aria-expanded", curState);
  };

  if (button) {
    button.addEventListener("click", toggleNav);
  }

  var navItems = nav.querySelectorAll("a");
  navItems.forEach(function (item) {
    return item.addEventListener("click", toggleNav);
  });
} // EOF

/***/ }),

/***/ "./public_html/ui/_js/modules/tabs.js":
/*!********************************************!*\
  !*** ./public_html/ui/_js/modules/tabs.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Tabs = /*#__PURE__*/function () {
  function Tabs(settingsObj) {
    _classCallCheck(this, Tabs);

    this.settings = settingsObj; // set the accordion/detail elements

    this.tabContainer = this.settings.container || document.querySelector(".Tabbed");
    if (!this.tabContainer) return;
    this.tabbed = this.tabContainer;
    this.tablist = this.tabbed.querySelector('ul');
    this.tabs = this.tablist.querySelectorAll('a');
    this.panels = this.tabbed.querySelectorAll('[id^="section"]');
    this.init();
    return this;
  }

  _createClass(Tabs, [{
    key: "init",
    value: function init() {
      var _this = this;

      // Add semantics are remove user focusability for each tab
      Array.prototype.forEach.call(this.tabs, function (tab, i) {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', 'tab' + (i + 1));
        tab.setAttribute('tabindex', '-1');
        tab.parentNode.setAttribute('role', 'presentation'); // Handle clicking of tabs for mouse users

        tab.addEventListener('click', function (e) {
          e.preventDefault();

          var currentTab = _this.tablist.querySelector('[aria-selected]');

          if (e.currentTarget !== currentTab) {
            _this.switchTab(currentTab, e.currentTarget);
          }
        }); // Handle keydown events for keyboard users

        tab.addEventListener('keydown', function (e) {
          // Get the index of the current tab in the tabs node list
          var index = Array.prototype.indexOf.call(_this.tabs, e.currentTarget); // Work out which key the user is pressing and
          // Calculate the new tab's index where appropriate

          var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;

          if (dir !== null) {
            e.preventDefault(); // If the down key is pressed, move focus to the open panel,
            // otherwise switch to the adjacent tab

            dir === 'down' ? _this.panels[i].focus() : _this.tabs[dir] ? _this.switchTab(e.currentTarget, _this.tabs[dir]) : void 0;
          }
        });
      }); // Add tab panel semantics and hide them all

      Array.prototype.forEach.call(this.panels, function (panel, i) {
        panel.setAttribute('role', 'tabpanel');
        panel.setAttribute('tabindex', '-1');
        var id = panel.getAttribute('id');
        panel.setAttribute('aria-labelledby', _this.tabs[i].id);
        panel.hidden = true;
      }); // Add the tablist role to the first <ul> in the .tabbed container

      this.tablist.setAttribute('role', 'tablist'); // Initially activate the first tab and reveal the first tab panel

      this.tabs[0].removeAttribute('tabindex');
      this.tabs[0].setAttribute('aria-selected', 'true');
      this.panels[0].hidden = false;
    } // Get relevant elements and collections
    // The tab switching function

  }, {
    key: "switchTab",
    value: function switchTab(oldTab, newTab) {
      newTab.focus(); // Make the active tab focusable by the user (Tab key)

      newTab.removeAttribute('tabindex'); // Set the selected state

      newTab.setAttribute('aria-selected', 'true');
      oldTab.removeAttribute('aria-selected');
      oldTab.setAttribute('tabindex', '-1'); // Get the indices of the new and old tabs to find the correct
      // tab panels to show and hide

      var index = Array.prototype.indexOf.call(this.tabs, newTab);
      var oldIndex = Array.prototype.indexOf.call(this.tabs, oldTab);
      this.panels[oldIndex].hidden = true;
      this.panels[index].hidden = false;
    }
  }]);

  return Tabs;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tabs);

/***/ }),

/***/ "./public_html/ui/_js/modules/theme.js":
/*!*********************************************!*\
  !*** ./public_html/ui/_js/modules/theme.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var themePicker = function themePicker(input) {
  var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
  var isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches;
  var hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified; // console.log('isDarkMode=' + isDarkMode, 'isLightMode=' + isLightMode, 'isNotSpecified=' + isNotSpecified, 'hasNoSupport=' + hasNoSupport);

  var toggleSwitch = document.querySelector(input);
  var currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleSwitch.addEventListener('change', switchTheme, false);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (themePicker);

/***/ }),

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/***/ ((module) => {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lazysizes/lazysizes.js":
/*!*********************************************!*\
  !*** ./node_modules/lazysizes/lazysizes.js ***!
  \*********************************************/
/***/ ((module) => {

(function(window, factory) {
	var lazySizes = factory(window, window.document, Date);
	window.lazySizes = lazySizes;
	if( true && module.exports){
		module.exports = lazySizes;
	}
}(typeof window != 'undefined' ?
      window : {}, 
/**
 * import("./types/global")
 * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
 */
function l(window, document, Date) { // Pass in the window Date function also for SSR because the Date class can be lost
	'use strict';
	/*jshint eqnull:true */

	var lazysizes,
		/**
		 * @type { LazySizesConfigPartial }
		 */
		lazySizesCfg;

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
			fastLoadedClass: 'ls-is-cached',
			iframeLoadMode: 0,
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

		lazySizesCfg = window.lazySizesConfig || window.lazysizesConfig || {};

		for(prop in lazySizesDefaults){
			if(!(prop in lazySizesCfg)){
				lazySizesCfg[prop] = lazySizesDefaults[prop];
			}
		}
	})();

	if (!document || !document.getElementsByClassName) {
		return {
			init: function () {},
			/**
			 * @type { LazySizesConfigPartial }
			 */
			cfg: lazySizesCfg,
			/**
			 * @type { true }
			 */
			noSupport: true,
		};
	}

	var docElem = document.documentElement;

	var supportPicture = window.HTMLPictureElement;

	var _addEventListener = 'addEventListener';

	var _getAttribute = 'getAttribute';

	/**
	 * Update to bind to window because 'this' becomes null during SSR
	 * builds.
	 */
	var addEventListener = window[_addEventListener].bind(window);

	var setTimeout = window.setTimeout;

	var requestAnimationFrame = window.requestAnimationFrame || setTimeout;

	var requestIdleCallback = window.requestIdleCallback;

	var regPicture = /^picture$/i;

	var loadEvents = ['load', 'error', 'lazyincluded', '_lazyloaded'];

	var regClassCache = {};

	var forEach = Array.prototype.forEach;

	/**
	 * @param ele {Element}
	 * @param cls {string}
	 */
	var hasClass = function(ele, cls) {
		if(!regClassCache[cls]){
			regClassCache[cls] = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		}
		return regClassCache[cls].test(ele[_getAttribute]('class') || '') && regClassCache[cls];
	};

	/**
	 * @param ele {Element}
	 * @param cls {string}
	 */
	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)){
			ele.setAttribute('class', (ele[_getAttribute]('class') || '').trim() + ' ' + cls);
		}
	};

	/**
	 * @param ele {Element}
	 * @param cls {string}
	 */
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

	/**
	 * @param elem { Element }
	 * @param name { string }
	 * @param detail { any }
	 * @param noBubbles { boolean }
	 * @param noCancelable { boolean }
	 * @returns { CustomEvent }
	 */
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
		if( !supportPicture && ( polyfill = (window.picturefill || lazySizesCfg.pf) ) ){
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

	/**
	 *
	 * @param elem { Element }
	 * @param parent { Element }
	 * @param [width] {number}
	 * @returns {number}
	 */
	var getWidth = function(elem, parent, width){
		width = width || elem.offsetWidth;

		while(width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth){
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
		var gDelay = lazySizesCfg.throttleDelay;
		var rICTimeout = lazySizesCfg.ricTimeout;
		var run = function(){
			running = false;
			lastTime = Date.now();
			fn();
		};
		var idleCallback = requestIdleCallback && rICTimeout > 49 ?
			function(){
				requestIdleCallback(run, {timeout: rICTimeout});

				if(rICTimeout !== lazySizesCfg.ricTimeout){
					rICTimeout = lazySizesCfg.ricTimeout;
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

			return isBodyHidden || !(getCSS(elem.parentNode, 'visibility') == 'hidden' && getCSS(elem, 'visibility') == 'hidden');
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

			if((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)){

				i = 0;

				lowRuns++;

				for(; i < eLlen; i++){

					if(!lazyloadElems[i] || lazyloadElems[i]._lazyRace){continue;}

					if(!supportScroll || (lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i]))){unveilElement(lazyloadElems[i]);continue;}

					if(!(elemExpandVal = lazyloadElems[i][_getAttribute]('data-expand')) || !(elemExpand = elemExpandVal * 1)){
						elemExpand = currentExpand;
					}

					if (!defaultExpand) {
						defaultExpand = (!lazySizesCfg.expand || lazySizesCfg.expand < 1) ?
							docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 :
							lazySizesCfg.expand;

						lazysizes._defEx = defaultExpand;

						preloadExpand = defaultExpand * lazySizesCfg.expFactor;
						hFac = lazySizesCfg.hFac;
						isBodyHidden = null;

						if(currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document.hidden){
							currentExpand = preloadExpand;
							lowRuns = 0;
						} else if(loadMode > 1 && lowRuns > 1 && isLoading < 6){
							currentExpand = defaultExpand;
						} else {
							currentExpand = shrinkExpand;
						}
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
						(lazySizesCfg.loadHidden || isVisible(lazyloadElems[i])) &&
						((isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4)) || isNestedVisible(lazyloadElems[i], elemExpand))){
						unveilElement(lazyloadElems[i]);
						loadedSomething = true;
						if(isLoading > 9){break;}
					} else if(!loadedSomething && isCompleted && !autoLoadElem &&
						isLoading < 4 && lowRuns < 4 && loadMode > 2 &&
						(preloadElems[0] || lazySizesCfg.preloadAfterLoad) &&
						(preloadElems[0] || (!elemExpandVal && ((eLbottom || eLright || eLleft || eLtop) || lazyloadElems[i][_getAttribute](lazySizesCfg.sizesAttr) != 'auto')))){
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
			addClass(elem, lazySizesCfg.loadedClass);
			removeClass(elem, lazySizesCfg.loadingClass);
			addRemoveLoadEvents(elem, rafSwitchLoadingClass);
			triggerEvent(elem, 'lazyloaded');
		};
		var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
		var rafSwitchLoadingClass = function(e){
			rafedSwitchLoadingClass({target: e.target});
		};

		var changeIframeSrc = function(elem, src){
			var loadMode = elem.getAttribute('data-load-mode') || lazySizesCfg.iframeLoadMode;

			// loadMode can be also a string!
			if (loadMode == 0) {
				elem.contentWindow.location.replace(src);
			} else if (loadMode == 1) {
				elem.src = src;
			}
		};

		var handleSources = function(source){
			var customMedia;

			var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);

			if( (customMedia = lazySizesCfg.customMedia[source[_getAttribute]('data-media') || source[_getAttribute]('media')]) ){
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
						addClass(elem, lazySizesCfg.autosizesClass);
					} else {
						elem.setAttribute('sizes', sizes);
					}
				}

				srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
				src = elem[_getAttribute](lazySizesCfg.srcAttr);

				if(isImg) {
					parent = elem.parentNode;
					isPicture = parent && regPicture.test(parent.nodeName || '');
				}

				firesLoad = detail.firesLoad || (('src' in elem) && (srcset || src || isPicture));

				event = {target: elem};

				addClass(elem, lazySizesCfg.loadingClass);

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
			removeClass(elem, lazySizesCfg.lazyClass);

			rAF(function(){
				// Part of this can be removed as soon as this fix is older: https://bugs.chromium.org/p/chromium/issues/detail?id=7731 (2015)
				var isLoaded = elem.complete && elem.naturalWidth > 1;

				if( !firesLoad || isLoaded){
					if (isLoaded) {
						addClass(elem, lazySizesCfg.fastLoadedClass);
					}
					switchLoadingClass(event);
					elem._lazyCache = true;
					setTimeout(function(){
						if ('_lazyCache' in elem) {
							delete elem._lazyCache;
						}
					}, 9);
				}
				if (elem.loading == 'lazy') {
					isLoading--;
				}
			}, true);
		});

		/**
		 *
		 * @param elem { Element }
		 */
		var unveilElement = function (elem){
			if (elem._lazyRace) {return;}
			var detail;

			var isImg = regImg.test(elem.nodeName);

			//allow using sizes="auto", but don't use. it's invalid. Use data-sizes="auto" or a valid value for sizes instead (i.e.: sizes="80vw")
			var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]('sizes'));
			var isAuto = sizes == 'auto';

			if( (isAuto || !isCompleted) && isImg && (elem[_getAttribute]('src') || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)){return;}

			detail = triggerEvent(elem, 'lazyunveilread').detail;

			if(isAuto){
				 autoSizer.updateElem(elem, true, elem.offsetWidth);
			}

			elem._lazyRace = true;
			isLoading++;

			lazyUnveil(elem, detail, isAuto, sizes, isImg);
		};

		var afterScroll = debounce(function(){
			lazySizesCfg.loadMode = 3;
			throttledCheckElements();
		});

		var altLoadmodeScrollListner = function(){
			if(lazySizesCfg.loadMode == 3){
				lazySizesCfg.loadMode = 2;
			}
			afterScroll();
		};

		var onload = function(){
			if(isCompleted){return;}
			if(Date.now() - started < 999){
				setTimeout(onload, 999);
				return;
			}


			isCompleted = true;

			lazySizesCfg.loadMode = 3;

			throttledCheckElements();

			addEventListener('scroll', altLoadmodeScrollListner, true);
		};

		return {
			_: function(){
				started = Date.now();

				lazysizes.elements = document.getElementsByClassName(lazySizesCfg.lazyClass);
				preloadElems = document.getElementsByClassName(lazySizesCfg.lazyClass + ' ' + lazySizesCfg.preloadClass);

				addEventListener('scroll', throttledCheckElements, true);

				addEventListener('resize', throttledCheckElements, true);

				addEventListener('pageshow', function (e) {
					if (e.persisted) {
						var loadingElements = document.querySelectorAll('.' + lazySizesCfg.loadingClass);

						if (loadingElements.length && loadingElements.forEach) {
							requestAnimationFrame(function () {
								loadingElements.forEach( function (img) {
									if (img.complete) {
										unveilElement(img);
									}
								});
							});
						}
					}
				});

				if(window.MutationObserver){
					new MutationObserver( throttledCheckElements ).observe( docElem, {childList: true, subtree: true, attributes: true} );
				} else {
					docElem[_addEventListener]('DOMNodeInserted', throttledCheckElements, true);
					docElem[_addEventListener]('DOMAttrModified', throttledCheckElements, true);
					setInterval(throttledCheckElements, 999);
				}

				addEventListener('hashchange', throttledCheckElements, true);

				//, 'fullscreenchange'
				['focus', 'mouseover', 'click', 'load', 'transitionend', 'animationend'].forEach(function(name){
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
			unveil: unveilElement,
			_aLSL: altLoadmodeScrollListner,
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
		/**
		 *
		 * @param elem {Element}
		 * @param dataAttr
		 * @param [width] { number }
		 */
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
				autosizesElems = document.getElementsByClassName(lazySizesCfg.autosizesClass);
				addEventListener('resize', debouncedUpdateElementsSizes);
			},
			checkElems: debouncedUpdateElementsSizes,
			updateElem: getSizeElement
		};
	})();

	var init = function(){
		if(!init.i && document.getElementsByClassName){
			init.i = true;
			autoSizer._();
			loader._();
		}
	};

	setTimeout(function(){
		if(lazySizesCfg.init){
			init();
		}
	});

	lazysizes = {
		/**
		 * @type { LazySizesConfigPartial }
		 */
		cfg: lazySizesCfg,
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

/***/ "./node_modules/quicklink/dist/quicklink.umd.js":
/*!******************************************************!*\
  !*** ./node_modules/quicklink/dist/quicklink.umd.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

!function(e,n){ true?n(exports):0}(this,function(e){function n(e){return new Promise(function(n,t,r){(r=new XMLHttpRequest).open("GET",e,r.withCredentials=!0),r.onload=function(){200===r.status?n():t()},r.send()})}var t,r=(t=document.createElement("link")).relList&&t.relList.supports&&t.relList.supports("prefetch")?function(e){return new Promise(function(n,t,r){(r=document.createElement("link")).rel="prefetch",r.href=e,r.onload=n,r.onerror=t,document.head.appendChild(r)})}:n,o=window.requestIdleCallback||function(e){var n=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-n))}})},1)},i=new Set;function c(e,t,o){if(o=navigator.connection){if(o.saveData)return Promise.reject(new Error("Cannot prefetch, Save-Data is enabled"));if(/2g/.test(o.effectiveType))return Promise.reject(new Error("Cannot prefetch, network conditions are poor"))}return Promise.all([].concat(e).map(function(e){if(!i.has(e))return i.add(e),(t?function(e){return window.fetch?fetch(e,{credentials:"include"}):n(e)}:r)(new URL(e,location.href).toString())}))}e.listen=function(e){if(e||(e={}),window.IntersectionObserver){var n=function(e){e=e||1;var n=[],t=0;function r(){t<e&&n.length>0&&(n.shift()(),t++)}return[function(e){n.push(e)>1||r()},function(){t--,r()}]}(e.throttle||1/0),t=n[0],r=n[1],f=e.limit||1/0,u=e.origins||[location.hostname],s=e.ignores||[],a=e.delay||0,l=[],h=e.timeoutFn||o,d="function"==typeof e.hrefFn&&e.hrefFn,m=new IntersectionObserver(function(n){n.forEach(function(n){if(n.isIntersecting)l.push((n=n.target).href),function(e,n){n?setTimeout(e,n):e()}(function(){-1!==l.indexOf(n.href)&&(m.unobserve(n),i.size<f&&t(function(){c(d?d(n):n.href,e.priority).then(r).catch(function(n){r(),e.onError&&e.onError(n)})}))},a);else{var o=l.indexOf((n=n.target).href);o>-1&&l.splice(o)}})},{threshold:e.threshold||0});return h(function(){(e.el||document).querySelectorAll("a").forEach(function(e){u.length&&!u.includes(e.hostname)||function e(n,t){return Array.isArray(t)?t.some(function(t){return e(n,t)}):(t.test||t).call(t,n.href,n)}(e,s)||m.observe(e)})},{timeout:e.timeout||2e3}),function(){i.clear(),m.disconnect()}}},e.prefetch=c});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************************!*\
  !*** ./public_html/ui/_js/main.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var quicklink_dist_quicklink_umd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! quicklink/dist/quicklink.umd */ "./node_modules/quicklink/dist/quicklink.umd.js");
/* harmony import */ var quicklink_dist_quicklink_umd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(quicklink_dist_quicklink_umd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! debounce */ "./node_modules/debounce/index.js");
/* harmony import */ var debounce__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(debounce__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_fontLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/fontLoader */ "./public_html/ui/_js/modules/fontLoader.js");
/* harmony import */ var _modules_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/dialog */ "./public_html/ui/_js/modules/dialog.js");
/* harmony import */ var _modules_details__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/details */ "./public_html/ui/_js/modules/details.js");
/* harmony import */ var _modules_carousel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/carousel */ "./public_html/ui/_js/modules/carousel.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/tabs */ "./public_html/ui/_js/modules/tabs.js");
/* harmony import */ var _modules_nav__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/nav */ "./public_html/ui/_js/modules/nav.js");
/* harmony import */ var _modules_theme__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/theme */ "./public_html/ui/_js/modules/theme.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// import app from './modules/app';










quicklink_dist_quicklink_umd__WEBPACK_IMPORTED_MODULE_1___default().listen(); // Load in fonts, all font files myst be in the same directory. loads like js/css files, no file extention name needed.
// loads in woff eot and ttf files automatically if they are all in the same  directory.
// Fallbacks for short name is local and conversly. Back up name for both is 'font1', 'font2', etc

(0,_modules_fontLoader__WEBPACK_IMPORTED_MODULE_3__["default"])([{
  shortName: "Neue",
  localName: "HelveticaNeue-Roman",
  path: "/ui/webfonts/helvetica/helveticaneue-roman-webfont"
}, {
  shortName: "NeueBold",
  localName: "HelveticaNeue-Bold",
  path: "/ui/webfonts/helvetica/helveticaneue-bold-webfont"
}]);
(0,_modules_nav__WEBPACK_IMPORTED_MODULE_8__["default"])();
(lazysizes__WEBPACK_IMPORTED_MODULE_0___default().cfg.init) = false; // check if native lazy loading is available

if ('loading' in HTMLImageElement.prototype) {
  // console.log("Browser supports `loading`..");
  var lazy = document.querySelectorAll("[class*='lazyload']");

  var _iterator = _createForOfIteratorHelper(lazy),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      item.classList.remove("lazyload");
      item.classList.add("lazyloaded");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} else {
  // Fetch and apply a polyfill/JavaScript library
  // console.log("Browser does not support `loading`..");
  // for lazy-loading instead.
  (lazysizes__WEBPACK_IMPORTED_MODULE_0___default().cfg.init) = true;
} // init modals


var modals = Array.from(document.querySelectorAll("[data-modal]"));

for (var _i = 0, _modals = modals; _i < _modals.length; _i++) {
  var win = _modals[_i];
  new _modules_dialog__WEBPACK_IMPORTED_MODULE_4__["default"]({
    button: win
  }); // console.log(win);
} // init details


var details = Array.from(document.querySelectorAll("details"));

for (var _i2 = 0, _details = details; _i2 < _details.length; _i2++) {
  var detail = _details[_i2];
  new _modules_details__WEBPACK_IMPORTED_MODULE_5__["default"]({
    container: detail
  });
} // init tabs


var tabset = Array.from(document.querySelectorAll(".Tabbed"));

for (var _i3 = 0, _tabset = tabset; _i3 < _tabset.length; _i3++) {
  var tab = _tabset[_i3];
  new _modules_tabs__WEBPACK_IMPORTED_MODULE_7__["default"]({
    container: tab
  });
} // init Carousels


var carousels = document.querySelectorAll(".Carousel");

var _iterator2 = _createForOfIteratorHelper(carousels),
    _step2;

try {
  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
    var carousel = _step2.value;
    // console.log(carousel.querySelector(`.Carousel__slide`))
    var newCarousel = new _modules_carousel__WEBPACK_IMPORTED_MODULE_6__["default"]();
    newCarousel.init({
      id: carousel,
      slidenav: true,
      animate: true,
      startAnimated: false
    });
  }
} catch (err) {
  _iterator2.e(err);
} finally {
  _iterator2.f();
}

var media = '(prefers-reduced-motion: reduce)';
var pref = window.matchMedia(media); // console.log("reduced motion=",pref)

if (pref.media !== media && !pref.matches) {// do stuff without animations
  // console.log('prefers reduced motion');
} // Night mode theme picker


(0,_modules_theme__WEBPACK_IMPORTED_MODULE_9__["default"])(".Theme__picker input[type=\"checkbox\"]"); // window.resize callback function

function getVerticalHeight() {
  var vh = window.innerHeight * 0.01; // document.documentElement.style.setProperty('--vh', `${vh}px`);

  document.documentElement.style.setProperty("--vh", "".concat(vh, "px")); // console.info(vh);
}

window.onresize = debounce__WEBPACK_IMPORTED_MODULE_2___default()(getVerticalHeight, 200);
getVerticalHeight();
var allLinks = Array.from(document.querySelectorAll("[target=\"_blank\"]"));
allLinks.forEach(function (el) {
  if (!el.hasAttribute("rel")) {
    el.setAttribute("rel", "noreferrer");
  }
}); // function ready(fn) {
//   if (document.readyState !== 'loading') {
//     fn();
//   } else {
//     document.addEventListener('DOMContentLoaded', fn);
//   }
// }
// remove no-js body class proving JS is loaded and everything before this in this script has run and not errored out.

document.body.classList.remove("no-js");
})();

/******/ })()
;