var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (options) {
    options.color = Asteroid.COLOR;
    options.pos = options.pos || options.game.randomPosition();
    options.radius = Asteroid.RADIUS;
    options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);
    Asteroids.MovingObject.call(this, options);
  };

  Asteroid.RADIUS = 50;
  Asteroid.COLOR = "#9D9D92";
  Asteroid.SPEED = 3;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function (context) {
    var asteroid = new Image(Asteroid.RADIUS*2, Asteroid.RADIUS*2);
    var radians = this.vel[0] < 0 ? Math.PI - (Math.atan(-this.vel[1]/this.vel[0])) : Math.atan(this.vel[1]/this.vel[0]);
    asteroid.src = "./lib/asteroid.png";
    context.save();
    context.translate(this.pos[0], this.pos[1]);
    context.rotate(radians);
    context.drawImage(asteroid, -this.radius, -this.radius, this.radius*2, this.radius*2);
    context.restore();
  };
})(this);
