function Enemy(game, params) {
    Entity.call(this, game, params);
    this.speed = params.speed;
    this.tween = [];
    this.path;

    // TODO: not implemented
    this.health = params.health;
    this.damage = params.damage;

}

Enemy.prototype.getBitmap = function () {
    return this.bitmap;
}

Enemy.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    //Get Shortest Path
	this.initMovement();
}

Enemy.prototype.pauseMovement = function() {
    for(var i=0; i<this.tween.length;i++){
        this.tween[i].setPaused(true);
    }
    //createjs.Tween.removeTweens(this.bitmap);
}

Enemy.prototype.initMovement = function() {
	var path = Entity.prototype.getShortestPath(game.grid, {x: this.x, y: this.y}, {x: 767, y: 767});
    var enemy = this;
    this.path = path;
    // move to level logic
    var tweenObj = createjs.Tween.get(this.bitmap);

    function updateEnemyCoords() {
        enemy.x = this.x;
        enemy.y = this.y;
        //Outputs Tile number on which Enemy is on
        //console.log(Entity.prototype.getTile(game.grid,enemy.x,enemy.y).number);
    }

    //Create Tween for shortest path
    for (var j = 0; j < path.length - 1; j++) {
        var tw = {
            x: game.grid.tiles[path[j].x][path[j].y].x,
            y: game.grid.tiles[path[j].x][path[j].y].y
        };
        tweenObj.to(tw, this.speed, createjs.Ease.linear).call(updateEnemyCoords);
    }
    this.tween.push(tweenObj);
    // signal game that enemy is finished
    var that = this;
    tweenObj.call(function () {
        that.game.enemyFinished(that);
    })
}

Enemy.prototype.resumeMovement = function() {
    for(var i=0; i<this.tween.length;i++){
        this.tween[i].setPaused(false);
    } //this.tween.setPaused(false);
}

Enemy.prototype.dispose = function (stage) {
    Entity.prototype.dispose.call(this, stage);

    createjs.Tween.removeTweens(this.bitmap);
}


