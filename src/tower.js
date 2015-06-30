/**
 * Created by ValTM on 24.6.2015 ?..
 */
function Tower(game, params){
    Entity.call(this, game, params);
    this.tween = [];
    this.game = game;
}
//inherit(Tower, Entity);

Tower.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    //make tower
    this.initTower();
};

Tower.prototype.initTower = function (){
    this.target = null;
    this.kills = 0;
    this.damage = 10;
    this.range = 200;
    this.projSpeed = 200;

};

Tower.prototype.dispose = function (stage) {
    Entity.prototype.dispose.call(this, stage);
    createjs.Tween.removeTweens(this.bitmap);
};

Tower.prototype.update = function(game) {
    if (game.currentWave) {
        for (var i = 0; i < game.currentWave.enemies.length; i++) {
            var enemy = game.currentWave.enemies[i];
            if (Math.pow(enemy.x - this.x, 2) + Math.pow(enemy.y - this.y, 2) < Math.pow(this.range, 2)) {
                this.target = enemy;
                break;
            } else {
                this.target = null;
            }
        }
    }
    if (this.target) {
        var tower = this;
        function onHit(tweenObj, bitmapObj) {
            tower.target.health = tower.target.health - tower.damage;
            if (game.currentWave != null && tower.target.health < 0) {
                if (game.currentWave.enemies) {
                    var index = game.currentWave.enemies.indexOf(tower.target);
                    if (index > -1) {
                        game.currentWave.enemies.splice(index, 1);
                        tower.target.dispose(game.stage);
                        game.gold += 100;
                    }
                }
            }
			createjs.Tween.removeTweens(bitmapObj);
			game.stage.removeChild(bitmapObj);
        }

        function bitmap(stage, tower) {
            var bitmap = new createjs.Bitmap("assets/projectile.png");
            bitmap.x = tower.x + 32;
            bitmap.y = tower.y;
            stage.addChild(bitmap);
            return bitmap;
        }

		var bitmapObj = bitmap(game.stage, this);
        var tweenObj = createjs.Tween.get(bitmapObj);

        var target = this.target;
        tweenObj.to({x: target.x, y: target.y}, this.projSpeed, createjs.Ease.linear()).call(onHit, [tweenObj, bitmapObj]);
        this.tween.push(tweenObj);
    }
};

