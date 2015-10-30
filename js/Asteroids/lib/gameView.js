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

    key("enter", function () {
      if (!this.game.playing) {
        this.game.beginPlaying();
      }
    }.bind(this));
  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();

    setInterval(function() {
      this.game.step();
      this.game.draw(this.context);
    }.bind(this), 20);
  };
})(this);
