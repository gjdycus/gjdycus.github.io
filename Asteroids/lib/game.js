var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }


  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.DIM_X = 1024;
  Game.DIM_Y = 768;
  Game.NUM_ASTEROIDS = 4;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPosition(), this));
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);

    return [x, y];
  };

  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.asteroids.forEach (function(el){
      el.draw(context);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach (function(el){
      el.move();
    });
  };

  Game.prototype.wrap = function (pos) {
    var newPos = pos.slice();
    if (newPos[0] < 0 || newPos[0] > Game.DIM_X){
      newPos = [Math.abs(newPos[0] - Game.DIM_X),newPos[1]];
    }
    if (newPos[1] < 0 || newPos[1] > Game.DIM_Y) {
      newPos = [newPos[0], Math.abs(newPos[1] - Game.DIM_Y)];
    }
    return newPos;
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    asteroid.radius = 0;
  };

  Game.prototype.checkCollisions = function () {
    var that = this;
    that.asteroids.forEach(function (asteroid1) {
      that.asteroids.forEach(function (asteroid2) {
        if (asteroid1.isCollidedWith(asteroid2) && asteroid1 !== asteroid2) {
          that.remove(asteroid1);
          that.remove(asteroid2);
        }
      });
    });
  };

})(this);
