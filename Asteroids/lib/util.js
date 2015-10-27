var Asteroids;

(function (root) {
  var Asteroids = root.Asteroids;
  if (typeof Asteroids === "undefined") {
    Asteroids = root.Asteroids = {};
  }

  var Util = Asteroids.Util = function () {};

  Util.inherits = function (child, parent) {
    function Surrogate() {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    child.prototype.constructor = child;
  };

  Util.randomVec = function (length){
    var x = Math.floor((Math.random() * length + 1) * ([-1,1][Math.random()*2|0]));
    var y = Math.floor((Math.random() * length + 1) * ([-1,1][Math.random()*2|0]));
    return [x, y];
  };
})(this);
