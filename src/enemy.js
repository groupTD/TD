function Enemy(game, params) {
    Entity.call(this, game, params);
    this.speed = params.speed;

    // TODO: not implemented
    this.health = params.health;
    this.damage = params.damage;
    this.tween = [];
    this.path;
}

Enemy.prototype.getBitmap = function () {
    return this.bitmap;
}

Enemy.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    var path = Entity.prototype.getShortestPath(game.grid,{x: this.x,y:this.y },{x: 744,y: 744});
    this.path = path;
    // move to level logic
    var tweenObj = createjs.Tween.get(this.bitmap);

    for (var j = 0; j < path.length-1; j++) {
        var tw = {
            x: game.grid.tiles[path[j].x][path[j].y].x,
            y: game.grid.tiles[path[j].x][path[j].y].y
        };
        tweenObj.to(tw, this.speed, createjs.Ease.liner);
    }
    this.tween.push(tweenObj);
    // signal game that enemy is finished
    var that = this;
    tweenObj.call(function () {
        that.game.enemyFinished(that);
    })
}

Enemy.prototype.dispose = function (stage) {
    Entity.prototype.dispose.call(this, stage);

    createjs.Tween.removeTweens(this.bitmap);
}


