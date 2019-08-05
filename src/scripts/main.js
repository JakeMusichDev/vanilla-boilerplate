let winSize;
const getWinSize = () => winSize = { width: window.innerWidth, height: window.innerHeight};
getWinSize()

$(window).on("resize", getWinSize);

gridConfig = {
  amount:12
}

class Grid {
  constructor(el) {
    this.el = $(el);

    this.init()
  }

  init() {
   this.attachLine()
  }

  attachLine(width) {
    for (let index = 0; index < gridConfig.amount; index++) {
      this.el.append("<div class='line'></div>")
    }
  }
}

(function($){ 
  var grid = new Grid(".container");
})(jQuery);