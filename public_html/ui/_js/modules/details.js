const Details = class Details {
  constructor(
    detailsContainer,
    detailsButton,
    detailsTarget
  ) {

    // set the accordion/detail elements
    this.detailsContainer = detailsContainer || document.querySelector(`details`);
    this.detailsButton = detailsButton || this.detailsContainer.querySelector(`summary`);
    this.detailsTarget = detailsTarget || this.detailsButton.nextElementSibling || this.detailsContainer.querySelector(`summary`).nextElementSibling || document.querySelector(`Details__content`);

    this.curState = false;

    this.init()

    // return this
  }


  init() {
    this.detailsButton.addEventListener(`click`, this.toggledetails.bind(this));
    this.detailsButton.addEventListener(`keydown`, this.keyhandler.bind(this));
  }

  toggledetails(event) {
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

  keyhandler(event) {
    if(this.detailsButton.hasFocus){
      if (event.key === ` ` || event.key === `Spacebar` || event.keyCode === 0 || event.keyCode === 32) {
        event.preventDefault();
        this.toggledetails(event);
        // console.log(`space`)
      }
      if (event.key === `Enter` || event.key === `Return` || event.keyCode === 13) {
        event.preventDefault();
        this.toggledetails(event);
        // console.log(`enter`)
      }
    }
    // return this;
  }
};

export default Details;
