let winSize;
const getWinSize = () => winSize = { width: window.innerWidth, height: window.innerHeight};
getWinSize()

$(window).on("resize", getWinSize);

// Utility functions
const MathUtils = {
  lineEq: (y2, y1, x2, x1, currentVal) => {
      // y = mx + b 
      var m = (y2 - y1) / (x2 - x1), b = y1 - m * x1;
      return m * currentVal + b;
  },
  lerp: (a, b, n) => (1 - n) * a + n * b,
  getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2)
};

gridConfig = {
  amount:12
}

// Grid component with logic
class Grid {
  constructor(el) {
    this.el = $(el);

    this.init()
  }

  init() {
    this.attachLines()

    this.el.click(() => this.wiggle())
  }

  wiggle() {
    if(this.isAnimating) return;
    
    Array.prototype.forEach.call(this.lines, line => {
      let dur = MathUtils.getRandomFloat(0, 2);
      TweenMax.to(line, dur, {height: "80%", opacity: 1})
    });
  }

  attachLines(width) {
    for (let index = 0; index < gridConfig.amount; index++) {
      this.el.append("<div class='line'></div>")
    }

    this.lines = $(".line");

    this.animateLines()
  }

  animateLines() {
    this.isAnimating = true;
    Array.prototype.forEach.call(this.lines, line => {
      let dur = MathUtils.getRandomFloat(0, 2);
      TweenMax.to(line, dur, {height: "100%", opacity: 1})
    });
    this.isAnimating = false;
  }
};

class Swiper {
  constructor(el) {
    this.DOM = $(el)
    this.DOM.on("click", () => this.clearOverlay())
    this.addOverlay();
  }
  
  addOverlay() {
    this.DOM.after("<div class='overlay'></div>")
    this.DOM.overlay = this.DOM.next()
  }

  clearOverlay() {
    TweenMax.to(this.DOM.overlay, .1, {scale:2})
  }
 

};

(function($){
  // var grid = new Grid(".container"),
    var imgs = Array.from( $(".container img") );
  
  imgs.forEach(img => {
    let wrappedImg = new Swiper(img)
  });

})(jQuery);