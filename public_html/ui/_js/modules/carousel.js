!function () {
  const w = window,
    d = w.document;

    function addPolyfill(e) {
    const type = e.type === 'focus' ? 'focusin' : 'focusout';
    const event = new CustomEvent(type, {
      bubbles: true,
      cancelable: false
    });
    event.c1Generated = true;
    e.target.dispatchEvent(event);
  }

  function removePolyfill(e) {
    if (!e.c1Generated) { // focus after focusin, so chrome will the first time trigger tow times focusin
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

const myCarousel = (function () {

  // Initial variables
  let carousel
  let slides
  let index
  let slidenav
  let settings
  let timer
  let setFocus
  let animationSuspended


  // Helper function: Iterates over an array of elements
  function forEachElement(elements, fn) {
    for (let i = 0; i < elements.length; i++)
      {fn(elements[i], i);}
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
    let ctrls = document.createElement('ul');

    ctrls.className = 'controls';
    ctrls.innerHTML = '<li>' +
      '<button type="button" class="Button btn-prev">&laquo;</button>' +
      '</li>' +
      '<li>' +
      '<button type="button" class="Button btn-next">&raquo;</button>' +
      '</li>';

    ctrls.querySelector('.btn-prev')
      .addEventListener('click', function () {
        prevSlide(true);
      });
    ctrls.querySelector('.btn-next')
      .addEventListener('click', function () {
        nextSlide(true);
      });

    carousel.appendChild(ctrls);

    // If the carousel is animated or a slide navigation is requested in the settings, anoter unordered list that contains those elements is added. (Note that you cannot supress the navigation when it is animated.)
    if (settings.slidenav || settings.animate) {
      slidenav = document.createElement('ul');

      slidenav.className = 'Carousel__slidenav';

      if (settings.animate) {
        let li = document.createElement('li');

        if (settings.startAnimated) {
          li.innerHTML = '<button data-action="stop"><span class="sr-only">Stop Animation </span>￭</button>';
        } else {
          li.innerHTML = '<button data-action="start"><span class="sr-only">Start Animation </span>▶</button>';
        }

        slidenav.appendChild(li);
      }

      if (settings.slidenav) {
        forEachElement(slides, function (el, i) {
          let li = document.createElement('li');
          let klass = (i === 0) ? 'class="current" ' : '';
          let kurrent = (i === 0) ? ' <span class="sr-only">(Current Item)</span>' : '';

          li.innerHTML = '<button ' + klass + 'data-slide="' + i + '"><span class="sr-only">Item</span> ' + (i + 1) + kurrent + '</button>';
          slidenav.appendChild(li);
        });
      }

      slidenav.addEventListener('click', function (event) {
        let button = event.target;
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
    let liveregion = document.createElement('div');
    liveregion.setAttribute('aria-live', 'polite');
    liveregion.setAttribute('aria-atomic', 'true');
    liveregion.setAttribute('class', 'liveregion sr-only');
    carousel.appendChild(liveregion);

    // After the slide transitioned, remove the in-transition class, if focus should be set, set the tabindex attribute to -1 and focus the slide.
    slides[0].parentNode.addEventListener('transitionend', function (event) {
      let slide = event.target;
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
    let announceItem = typeof announceItemHere !== 'undefined' ? announceItemHere : false;

    new_current = parseFloat(new_current);

    let length = slides.length;
    let new_next = new_current + 1;
    let new_prev = new_current - 1;

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
    for (let i = slides.length - 1; i >= 0; i--) {
      slides[i].className = 'slide';
    }

    // Add classes to the previous, next and current slide
    slides[new_next].className = 'next Carousel__slide' + ((transition === 'next') ? ' in-transition' : '');
    slides[new_next].setAttribute('aria-hidden', 'true');

    slides[new_prev].className = 'prev Carousel__slide' + ((transition === 'prev') ? ' in-transition' : '');
    slides[new_prev].setAttribute('aria-hidden', 'true');

    slides[new_current].className = 'current Carousel__slide';
    slides[new_current].removeAttribute('aria-hidden');

    // Update the text in the live region which is then announced by screen readers.
    if (announceItem) {
      carousel.querySelector('.liveregion').textContent = 'Item ' + (new_current + 1) + ' of ' + slides.length;
    }

    // Update the buttons in the slider navigation to match the currently displayed  item
    if (settings.slidenav) {
      let buttons = carousel.querySelectorAll('.Carousel__slidenav button[data-slide]');
      for (let j = buttons.length - 1; j >= 0; j--) {
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

    let length = slides.length,
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

    let length = slides.length,
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
    let _this = carousel.querySelector('[data-action]');
    _this.innerHTML = '<span class="sr-only">Start Animation </span>▶';
    _this.setAttribute('data-action', 'start');
  }

  // Function to start the animation
  function startAnimation() {
    settings.animate = true;
    animationSuspended = false;
    timer = setTimeout(nextSlide, 5000);
    let _this = carousel.querySelector('[data-action]');
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
});

export default myCarousel;