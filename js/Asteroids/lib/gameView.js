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

  GameView.MOVES = {
    "up": [0, -2],
    "left": [-2, 0],
    "down": [0, 2],
    "right": [2, 0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function (e) { e.preventDefault(); this.game.ship.power(move); }.bind(this));
    }.bind(this));

    key("space", function (e) { e.preventDefault(); this.game.ship.fireBullet(); }.bind(this));
  };

  GameView.prototype.start = function () {
    var that = this;
    setInterval(function() {
      that.game.step();
      that.game.draw(that.context);
    }, 20);

    this.bindKeyHandlers();
  };
})(this);
