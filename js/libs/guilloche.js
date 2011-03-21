/*
---

name: guilloche
script: guilloche.js
description: guilloche
provides: [Guilloche]
url: https://gist.github.com/803329

*/
var guilloche = function(canvas, opts){
  var opts = opts || {};

  var ctx = canvas.getContext('2d'),
  		size = {x: canvas.offsetWidth, y: canvas.offsetHeight},
  		halfSize = {x: size.x / 2, y: size.y / 2},
  		majorR =                             opts.majorR || 479.5,
  		minorR =                             opts.minorR || 50,
  		angleMultiplier =             opts.angleMultiplier || 50,
  		radiusEffectConstant = opts.radiusEffectConstant || 250,
  		steps =                               opts.steps || 1210,
  		centerPoint =                   opts.centerPoint || { x: 100, y:100 },
  		color =                               opts.color || 'rgb(255,255,255)',
  		globalAlpha =                   opts.globalAlpha || 1.0;

  ctx.globalAlpha = globalAlpha;
	ctx.clearRect(0, 0, size.x, size.y);

	var	diff = majorR - minorR,
			s = diff / minorR,
			theta = 0,
			radiusEffect = radiusEffectConstant + minorR,
			oldX, oldY;

	for (var i = steps; i--;) {
		var new_theta = angleMultiplier * theta,
			  x = diff * Math.sin(new_theta) + radiusEffect * Math.sin(new_theta * s) + (centerPoint.x),
			  y = diff * Math.cos(new_theta) - radiusEffect * Math.cos(new_theta * s) + (centerPoint.y);

		theta += Math.PI * 4 / steps;

		if (oldX) {
      ctx.strokeStyle = color;
			ctx.beginPath();
			ctx.moveTo(oldX, oldY);
			ctx.lineTo(x, y);
			ctx.closePath();
			ctx.stroke();
		}

		oldX = x;
		oldY = y;
	}

};
