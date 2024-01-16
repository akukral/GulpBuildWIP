const Details = class Details {
  constructor(
    settingsObj
  ) {

    this.settings = settingsObj;

    // set the accordion/detail elements
    this.detailsContainer = this.settings.container || document.querySelector(`details`);
    if (!this.detailsContainer) {return}
    this.detailsButton = this.settings.button || this.detailsContainer.querySelector(`summary`);
    if (!this.detailsButton) {return}
    this.detailsTarget = this.settings.target || this.detailsButton.nextElementSibling || this.detailsContainer.querySelector(`summary`).nextElementSibling;
    if (!this.detailsTarget) {return}

    // Store the animation object (so we can cancel it if needed)
    this.animation = null;
    // Store if the element is closing
    this.isClosing = false;
    // Store if the element is expanding
    this.isExpanding = false;

    this.init()

    return this
  }


  init() {
    // Detect user clicks on the summary element
    this.detailsButton.addEventListener(`click`, this.onClick.bind(this));
    this.detailsButton.addEventListener(`keydown`, this.keypressHandler.bind(this));
  }

  onClick(e) {
    // Stop default behaviour from the browser
    e.preventDefault();
    // Add an overflow on the <details> to avoid content overflowing
    // this.detailsContainer.style.overflow = 'clip';
    // Check if the element is being closed or is already closed
    if (this.isClosing || !this.detailsContainer.open) {
      this.open();
    // Check if the element is being openned or is already open
    } else if (this.isExpanding || this.detailsContainer.open) {
      this.shrink();
    }
  }

  shrink() {
    // Set the element as "being closed"
    this.isClosing = true;

    // Store the current height of the element
    const startHeight = `${this.detailsContainer.offsetHeight}px`;
    // Calculate the height of the summary
    const endHeight = `${this.detailsButton.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.detailsContainer.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });

    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(false);
    // If the animation is cancelled, isClosing variable is set to false
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    // Apply a fixed height on the element
    this.detailsContainer.style.height = `${this.detailsContainer.offsetHeight}px`;
    // Force the [open] attribute on the details element
    this.detailsContainer.open = true;
    // Wait for the next frame to call the expand function
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    // Set the element as "being expanding"
    this.isExpanding = true;
    // Get the current fixed height of the element
    const startHeight = `${this.detailsContainer.offsetHeight}px`;
    // Calculate the open height of the element (summary height + content height)
    const endHeight = `${this.detailsButton.offsetHeight + this.detailsTarget.offsetHeight}px`;

    // If there is already an animation running
    if (this.animation) {
      // Cancel the current animation
      this.animation.cancel();
    }

    // Start a WAAPI animation
    this.animation = this.detailsContainer.animate({
      // Set the keyframes from the startHeight to endHeight
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    // When the animation is complete, call onAnimationFinish()
    this.animation.onfinish = () => this.onAnimationFinish(true);
    // If the animation is cancelled, isExpanding variable is set to false
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    // Set the open attribute based on the parameter
    this.detailsContainer.open = open;
    // Clear the stored animation
    this.animation = null;
    // Reset isClosing & isExpanding
    this.isClosing = false;
    this.isExpanding = false;
    // Remove the overflow hidden and the fixed height
    this.detailsContainer.style.height = '';
    // this.detailsContainer.style.overflow = '';
  }

  keypressHandler(event) {
    if(this.detailsButton.hasFocus){
      // if the toggle button for the detail is focused allow ENTER or SPACEBAR to open the accordion.
      if (event.key === ` ` || event.key === `Spacebar` || event.keyCode === 0 || event.keyCode === 32) {
        event.preventDefault();
        this.onClick(event);
        // console.log(`space`)
      }
      if (event.key === `Enter` || event.key === `Return` || event.keyCode === 13) {
        event.preventDefault();
        this.onClick(event);
        // console.log(`enter`)
      }
    }
    // return this;
  }
};

export default Details;
