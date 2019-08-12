export default function Nav(){
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

   function keyHandler (e) {

    const focusableEls = Array.from(nav.querySelectorAll(`iframe, iframe *, [tabindex="0"], a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])`));
    const firstFocusableEl = focusableEls[0];
    const lastFocusableEl = focusableEls[focusableEls.length - 1];

    // console.log(e);
    let isTabPressed = (e.key === `Tab` || e.keyCode === 9);
    let isEscape = (e.key === `Escape` || e.key === `Esc` || e.keyCode === 27);

    // if (!isTabPressed) {
    //   return;
    // }

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

    if (isEscape && curState) {
      toggleNav();
    }

  }

  const toggleNav = function () {
    // event.preventDefault();
    curState = !curState
    if (curState) {
      nav.classList.toggle(`Nav--isactive`);
      nav.addEventListener(`keydown`, keyHandler);

      setTimeout(() => {
        nav.classList.toggle(`Nav--visible`);
      }, 100);

    } else {

      // console.log('button')
      button.focus();

      nav.classList.toggle(`Nav--visible`);
      nav.removeEventListener(`keydown`, keyHandler, { passive: true });

      setTimeout(() => {
        nav.classList.toggle(`Nav--isactive`);
      }, 200);
    }
    button.setAttribute(`aria-expanded`, curState);
  };


  if (button) {
    button.addEventListener(`click`, toggleNav);
  }

}

// EOF
