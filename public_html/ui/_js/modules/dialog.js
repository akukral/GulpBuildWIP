const Dialog = class Dialog {
  constructor(
    dialogButton,
    dialogTarget,
    dialogClose
    ) {
    // constructor(options = {}) {
    // Object.assign(this, {
    //   dialogButton: document.querySelector(`[data-dialog]`),
    //   dialogTarget: document.querySelector(`[data-dialog]`).nextElementSibling,
    // }, options);

    this.dialogButton = dialogButton || document.querySelector(`[data-dialog]`);
    this.dialogTarget = dialogTarget || this.dialogButton.nextElementSibling || document.querySelector(`dialog`) || document.querySelector(`[data-dialog]`).nextElementSibling;
    this.dialogClose = dialogClose || this.dialogTarget.querySelector(`[class*='close'], [class*='Close'], [aria-label*='close']`);

    this.curState = false;

    this.init()
  }


  init() {
    this.dialogButton.addEventListener(`click`, this.toggledialog.bind(this));
    this.dialogClose.addEventListener(`click`, this.toggledialog.bind(this));
  }

  toggledialog() {
    // changing the state of the dialog being open defaults to false (not open)
    this.curState = !this.curState

    // changing the aria states and class of the button and target
    this.dialogButton.setAttribute(`aria-expanded`, this.curState);
    this.dialogTarget.classList.toggle(`Dialog--open`);

    if (this.curState) {
      this.focusableElements = Array.prototype.slice.call(this.dialogTarget.querySelectorAll('iframe, iframe *, [tabindex="0"], a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'));
      this.firstFocusableEl = this.focusableElements[0];
      this.lastFocusableEl = this.focusableElements[this.focusableElements.length-1];

      // setting the initial focus to be on the dialog itself
      this.dialogTarget.setAttribute(`tabindex`, `-1`);
      this.dialogTarget.focus()

      this.dialogTarget.setAttribute(`open`,``);

      // listen for keyboard events namely TAB and ESC keys
      document.addEventListener(`keydown`, this.keyhandler.bind(this));
    } else {
      // set the tab index of the dialog
      this.dialogTarget.setAttribute(`tabindex`, `0`);
      this.dialogTarget.removeAttribute(`open`);

      this.dialogButton.focus();
    }
  }

  keyhandler(event) {

    let isEscape = false;
    // let isTab = false;
    if (`key` in event) {
      isEscape = (event.key === `Escape` || event.key === `Esc`);
      // isTab = (event.key === 'Tab')
    } else {
      isEscape = (event.keyCode === 27);
      // isTab = (event.keyCode === KEYCODE_TAB)
    }
     console.log(isEscape);
    // if(!isEscape && !isTab) return

    if (isEscape && this.curState) {
      this.toggledialog();
      this.dialogButton.focus();
    }

    if (event.shiftKey) /* shift + tab */ {
      if (document.activeElement === this.firstFocusableEl) {
        this.lastFocusableEl.focus();
        event.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === this.lastFocusableEl) {
        this.firstFocusableEl.focus();
        event.preventDefault();
      }
    }
  }
};

export default Dialog;
