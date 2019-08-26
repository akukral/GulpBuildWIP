const Dialog = class Dialog {
  constructor(
    settingsObj
    ) {
    // constructor(options = {}) {
    // Object.assign(this, {
    //   dialogButton: document.querySelector(`[data-dialog]`),
    //   dialogTarget: document.querySelector(`[data-dialog]`).nextElementSibling,
    // }, options);
    this.settings = settingsObj;

    this.dialogButton = this.settings.button || document.querySelector(`[data-dialog]`);
    if (!this.dialogButton) return
    this.dialogTarget = this.settings.target || this.dialogButton.nextElementSibling || document.querySelector(`dialog`) || document.querySelector(`[data-dialog]`).nextElementSibling;
    if (!this.dialogTarget) return
    this.dialogClose = this.settings.close || this.dialogTarget.querySelector(`[class*='close'], [class*='Close'], [aria-label*='close']`);
    if (!this.dialogClose) return

    this.curState = false;

    this.init();

    return this
  }


  init() {
    this.dialogButton.addEventListener(`click`, this.toggleDialogVisibility.bind(this));
    this.dialogClose.addEventListener(`click`, this.toggleDialogVisibility.bind(this));
  }

  toggleDialogVisibility() {
    // changing the state of the dialog being open defaults to false (not open)
    this.curState = !this.curState

    // changing the aria states and class of the button and target
    this.dialogButton.setAttribute(`aria-expanded`, this.curState);
    this.dialogTarget.classList.toggle(`Dialog--open`);

    if (this.curState) {
      // find all of the focusable elements within the element to trap
      this.focusableElements = Array.prototype.slice.call(this.dialogTarget.querySelectorAll('iframe, iframe *, [tabindex="0"], a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'));

      this.firstFocusableEl = this.focusableElements[0];

      this.lastFocusableEl = this.focusableElements.pop();

      // setting the initial focus to be on the dialog itself
      this.dialogTarget.setAttribute(`tabindex`, `-1`);
      this.dialogTarget.focus()

      this.dialogTarget.setAttribute(`open`,``);

      // listen for keyboard events namely TAB and ESC keys
      document.addEventListener(`keydown`, this.keypressHandler.bind(this));
    } else {
      // dealing with an autoplay or currently playing video in the modal if you close it.
      const iframeSrc = this.dialogTarget.querySelector(`iframe`).src;
      this.dialogTarget.querySelector(`iframe`).src = ``;
      this.dialogTarget.querySelector(`iframe`).src = iframeSrc;

      // set the tab index of the dialog
      this.dialogTarget.setAttribute(`tabindex`, `0`);
      this.dialogTarget.removeAttribute(`open`);

      this.dialogButton.focus();
    }
  }

  keypressHandler(event) {

    let isEscape = false;
    let isTab = false;

    if (`key` in event) {
      isEscape = (event.key === `Escape` || event.key === `Esc`);
      isTab = (event.key === `Tab`)
    } else {
      isEscape = (event.keyCode === 27);
      isTab = (event.keyCode === KEYCODE_TAB)
    }

    if(!isEscape && !isTab) return //if the keypressed isn't a tab or escape what are we doing here

    if (isEscape && this.curState) {
      // if the state of this dialog is open/true close it and set the focus back to the button that opens it.
      this.toggleDialogVisibility();
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
