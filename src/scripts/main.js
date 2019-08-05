class Container {

  constructor(el) {
    this.el = $(el)

    this.init()
  }

  init() {
    TweenLite.to(this.el, 2, {  left:100,   top: 75,   backgroundColor:"#23ff",   ease: Power4.easeIn});
  }

}

(function($){ 
  var container = new Container("#box")
})(jQuery);