function Enemy(game, wave, params) {
    Entity.call(this, game, params);
    this.speed = params.speed;
    this.tween = [];
    this.newPath =false;
    this.path;
	this.wave = wave;
    // TODO: not implemented
    this.health = params.health;
    this.damage = params.damage;

}

Enemy.prototype.getBitmap = function () {
    return this.bitmap;
};

Enemy.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    //Get Shortest Path
	this.initMovement();
};

Enemy.prototype.pauseMovement = function() {
    for(var i=0; i<this.tween.length;i++){
        this.tween[i].setPaused(true);
    }
};

Enemy.prototype.getPath = function(grid, coords, destination) {
    var path = Entity.prototype.getShortestPath(grid, coords, destination);
    return path;
};


Enemy.prototype.initMovement = function() {
	//var path = Entity.prototype.getShortestPath(game.grid, {x: this.x, y: this.y}, {x: 766, y: 384});
    var path = this.getPath(game.grid, {x: this.x, y: this.y}, {x:766, y:384});
    var enemy = this;
    this.path = path;
    // move to level logic
    var tweenObj = createjs.Tween.get(this.bitmap);

    function updateEnemyCoords() {
     enemy.x = this.x;
     enemy.y = this.y;
        if(enemy.newPath==true){
            enemy.tween[0]._paused = true;
            enemy.tween.splice(0,1);
            enemy.initMovement();
            enemy.newPath=false;
        }
     }

    //Create Tween for shortest path
    for (var j = 0; j < path.length ; j++) {
        var tw = {
            x: game.grid.tiles[path[j].x][path[j].y].x+20,
            y: game.grid.tiles[path[j].x][path[j].y].y+20
        };
        tweenObj.to(tw, this.speed, createjs.Ease.linear).call(updateEnemyCoords);
    }
    this.tween.push(tweenObj);
    // signal game that enemy is finished
    var that = this;
    tweenObj.call(function () {
        that.wave.enemyFinished(that);
    })
};

Enemy.prototype.resumeMovement = function() {
    for(var i=0; i<this.tween.length;i++){
        this.tween[i].setPaused(false);
    } //this.tween.setPaused(false);
};

Enemy.prototype.dispose = function (stage) {
    Entity.prototype.dispose.call(this, stage);

    createjs.Tween.removeTweens(this.bitmap);
};


