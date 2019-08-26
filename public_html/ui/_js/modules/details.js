const Details = class Details {
  constructor(
    settingsObj
  ) {

    this.settings = settingsObj;

    // set the accordion/detail elements
    this.detailsContainer = this.settings.container || document.querySelector(`details`);
    if (!this.detailsContainer) return
    this.detailsButton = this.settings.button || this.detailsContainer.querySelector(`summary`);
    if (!this.detailsButton) return
    this.detailsTarget = this.settings.target || this.detailsButton.nextElementSibling || this.detailsContainer.querySelector(`summary`).nextElementSibling || document.querySelector(`Details__content`);
    if (!this.detailsTarget) return

    this.curState = false;

    this.init()

    return this
  }


  init() {
    this.detailsButton.addEventListener(`click`, this.toggleDetailVisibility.bind(this));
    this.detailsButton.addEventListener(`keydown`, this.keypressHandler.bind(this));
  }

  toggleDetailVisibility(event) {
    event.preventDefault()
    // changing the state of the details being open defaults to false (not open)
    this.curState = !this.curState

    // changing the aria states and class of the button and target
    this.detailsButton.setAttribute(`aria-expanded`, this.curState);
    this.detailsContainer.classList.toggle(`Details--open`);

    // console.log(this.curState);

    if (this.curState) {
      // console.log(`open`);
      this.detailsContainer.setAttribute(`open`,`open`);
    } else {
      this.detailsContainer.removeAttribute(`open`);
      // console.log(`close`);
    }
    // return this
  }

  keypressHandler(event) {
    if(this.detailsButton.hasFocus){
      // if the toggle button for the detail is focused allow ENTER or SPACEBAR to open the accordion.
      if (event.key === ` ` || event.key === `Spacebar` || event.keyCode === 0 || event.keyCode === 32) {
        event.preventDefault();
        this.toggleDetailVisibility(event);
        // console.log(`space`)
      }
      if (event.key === `Enter` || event.key === `Return` || event.keyCode === 13) {
        event.preventDefault();
        this.toggleDetailVisibility(event);
        // console.log(`enter`)
      }
    }
    // return this;
  }
};

export default Details;
