var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (options) {
    options.radius = Bullet.RADIUS;
    options.color = Bullet.COLOR;

    Asteroids.MovingObject.call(this, options);
  };

  Bullet.RADIUS = 5;
  Bullet.COLOR = "cyan";
  Bullet.SPEED = 10;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.remove();
      if (otherObject.radius === Asteroids.Asteroid.RADIUS / 2) {
        otherObject.remove();
        this.game.score += 50;
      } else {
        otherObject.radius /= 2;
        this.game.score += 75;
      }
    }
  };

  Bullet.prototype.isWrappable = false;
})(this);
