const CSS_CLASS_ACTIVE = 'is-sticky';

export default class Sticky {
  constructor(element) {
    this.element = element;
    this.position= 0;
    this.init();
  }

  init() {
    this.addEvents();
    this.position = this.element.offsetTop ;
    this.onScroll();
  }

  addEvents() {
    // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
  }

  aboveScroll() {
    return this.position < window.scrollY;
  }

  onScroll(event) {
    if (this.aboveScroll()) {
      this.setFixed();
    } else {
      this.setStatic();
    }
  }

  setFixed() {
    this.element.classList.add(CSS_CLASS_ACTIVE);
  }

  setStatic() {
    this.element.classList.remove(CSS_CLASS_ACTIVE);
  }
};
