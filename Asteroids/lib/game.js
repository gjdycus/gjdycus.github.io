var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship({ pos: this.randomPosition(), game: this });
    this.addAsteroids();
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 6;
  Game.BACKGROUND_IMG = new Image(Game.DIM_X, Game.DIM_Y);
  Game.BACKGROUND_IMG.src = "./lib/space.jpg";

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }
  };

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({ game: this }));
    }
  };

  Game.prototype.randomPosition = function () {
    var x = Math.floor(Math.random() * Game.DIM_X);
    var y = Math.floor(Math.random() * Game.DIM_Y);

    return [x, y];
  };

  Game.prototype.draw = function (context) {
    context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    context.drawImage(Game.BACKGROUND_IMG, 0, 0);
    this.allObjects().forEach (function(el){
      el.draw(context);
    });
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach (function(el){
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

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Bullet) {
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(object);
      this.asteroids[idx] = new Asteroids.Asteroid({ game: this });
    } else if (object instanceof Asteroids.Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    }
  };

  Game.prototype.checkCollisions = function () {
    var that = this;
    this.allObjects().forEach(function (object1) {
      that.allObjects().forEach(function (object2) {
        if (object1.isCollidedWith(object2) && object1 !== object2) {
          object1.collideWith(object2);
        }
      });
    });
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets);
  };

})(this);
