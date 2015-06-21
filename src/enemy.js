function Enemy(game, params){
    Entity.call(this, game, params);
	this.speed = params.speed;
	
	// TODO: not implemented
	this.health = params.health;
	this.damage = params.damage;
}

Enemy.prototype.getBitmap = function() {
	return this.bitmap;
}

Enemy.prototype.init = function(stage) {
	// call base method
	Entity.prototype.init.call(this, stage);
	
	// move to level logic
	var tweenObj = createjs.Tween.get(this.bitmap);
	
	for (var j = 0; j < this.game.path.points.length; j++) {
		tweenObj.to({
			x: game.path.points[j].x,
			y: game.path.points[j].y
		}, this.speed, createjs.Ease.liner);
	}
	
	// signal game that enemy is finished
	var that = this;
	tweenObj.call(function() {
		that.game.enemyFinished(that);
	})
}

Enemy.prototype.dispose = function(stage) {
	Entity.prototype.dispose.call(this, stage);
	
	createjs.Tween.removeTweens(this.bitmap);
}

