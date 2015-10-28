var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = Ship.COLOR;
    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 37.5;
  Ship.COLOR = "red";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.fireBullet = function () {
    var bulletVel = [this.vel[0] * Asteroids.Bullet.SPEED, this.vel[1] * Asteroids.Bullet.SPEED];

    var bullet = new Asteroids.Bullet({
      game: this.game,
      vel: bulletVel,
      pos: this.pos
    });

    if (this.vel[0] !== 0 || this.vel[1] !== 0) {
      this.game.add(bullet);
    }
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    if (this.vel[0] > 10) {
      this.vel[0] = 10;
    } else if (this.vel[0] < -10) {
      this.vel[0] = -10;
    } else if (this.vel[1] > 10) {
      this.vel[1] = 10;
    } else if (this.vel[1] < -10) {
      this.vel[1] = -10;
    }
  };

  Ship.prototype.draw = function (context) {
    var ship = new Image(Ship.RADIUS*2, Ship.RADIUS*2);
    var radians = this.vel[0] < 0 ? Math.PI - (Math.atan(-this.vel[1]/this.vel[0])) : Math.atan(this.vel[1]/this.vel[0]);
    ship.src = "./lib/ship.png";
    context.save();
    context.translate(this.pos[0], this.pos[1]);
    context.rotate(radians);
    context.drawImage(ship, -Ship.RADIUS, -Ship.RADIUS);
    context.restore();
  };
})(this);
