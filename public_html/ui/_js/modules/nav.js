export default (function () {
  const nav = document.querySelectorAll(`Nav`)[0];
  // const bodyEverything = Array.from(document.querySelectorAll(`body *`));
  // const navEverything = Array.from(document.querySelectorAll(`body .Header, body .Header *`));
  const button = document.getElementsByClassName(`Nav__toggle`)[0];

  // const everythingButNav = bodyEverything.filter((el) => !navEverything.includes(el));
  // console.log(everythingButNav);

  let curState = false;

  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  function trapFocus(element) {
    const focusableEls = Array.from(element.querySelectorAll(`iframe, iframe *, [tabindex="0"], a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])`));
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];
    const KEYCODE_TAB = 9;

    // console.log(firstFocusableEl)
    // console.log(lastFocusableEl)

    element.addEventListener(`keydown`, function (e) {
      var isTabPressed = (e.key === `Tab` || e.keyCode === KEYCODE_TAB);

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) /* shift + tab */ {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }

    });
  }

  const toggleNav = function (event) {
    // event.preventDefault();
    curState = !curState
    if (curState) {
      nav.classList.toggle(`Nav--isactive`);
      setTimeout(() => {
        nav.classList.toggle(`Nav--visible`);
      }, 100);

      trapFocus(nav);

    } else {

      nav.classList.toggle(`Nav--visible`);
      setTimeout(() => {
        nav.classList.toggle(`Nav--isactive`);
      }, 200);
    }
    button.setAttribute(`aria-expanded`, curState);
  };

  document.body.addEventListener(`keydown`, evt => {
    evt = evt || window.event;
    var isEscape = false;
    if (`key` in evt) {
      isEscape = (evt.key === `Escape` || evt.key === `Esc`);
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape && curState) {
      toggleNav();
    }
  });

  if (button) {
    button.addEventListener(`click`, toggleNav);
  }

})();

// EOF
