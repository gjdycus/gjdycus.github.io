var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  };

  MovingObject.prototype.draw = function(context) {
    context.beginPath();
    context.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = this.color;
    context.fill();
  };

  MovingObject.prototype.move = function() {
    this.pos = this.game.wrap(this.pos);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    return (MovingObject.distance(this, otherObject) < (this.radius + otherObject.radius));
  };

  MovingObject.distance = function(obj1, obj2) {
    return Math.sqrt(Math.pow((obj1.pos[0] - obj2.pos[0]), 2) + Math.pow((obj1.pos[1] - obj2.pos[1]), 2));
  };
})(this);
