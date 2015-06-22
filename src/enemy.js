function Enemy(game, params) {
    Entity.call(this, game, params);
    this.speed = params.speed;

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

    // move to level logic
    var tweenObj = createjs.Tween.get(this.bitmap);

    for (var j = 0; j < this.game.path.points.length; j++) {
        var tw = {
            x: game.path.points[j].x,
            y: game.path.points[j].y
        };
        tweenObj.to(tw, this.speed, createjs.Ease.liner);
    }
    game.tween.push(tweenObj);
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

Enemy.prototype.getTile = function (grid, xSearch, ySearch) {

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    function rectangleContainsPoint(rect, point) {
        if (rect.width <= 0 || rect.height <= 0) {
            return false;
        }
        return (point.x >= rect.x && point.x < rect.x + rect.width && point.y >= rect.y && point.y < rect.y + rect.height);
    }

    for (var xi = 0; xi < grid.horTilesCount; xi++) {
        for (var yi = 0; yi < grid.verTilesCount; yi++) {
            var point = new Point(xSearch, ySearch);
            var rectangle = new Rectangle(grid.tiles[xi][yi].x, grid.tiles[xi][yi].y, grid.verTilesLength, grid.horTilesLength);
            if (rectangleContainsPoint(rectangle, point)) {
                return grid.tiles[xi][yi];
                console.log(grid.tiles[xi][yi].number);
            }
        }
    }
}

