var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (context) {
    this.context = context;
    this.game = new Asteroids.Game();
  };

  GameView.prototype.start = function () {
    var that = this;
    setInterval(function() {
      that.game.step();
      that.game.draw(that.context);
    }, 20);
  };
})(this);
