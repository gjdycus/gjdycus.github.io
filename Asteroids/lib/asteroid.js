var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game) {
    Asteroids.MovingObject.call(this, {pos: pos, color: Asteroids.Asteroid.COLOR, radius: Asteroids.Asteroid.RADIUS, vel: Asteroids.Util.randomVec(2), game: game});
  };

  Asteroid.RADIUS = 50;
  Asteroid.COLOR = "#9D9D92";

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})(this);
