/**
 * Created by ValTM on 24.6.2015 ã..
 */
function Tower(game, params){
    Entity.call(this, game, params);
    this.tween = [];
    this.kills = 0;

}
//inherit(Tower, Entity);

Tower.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    //make tower
    this.initTower();
}

Tower.prototype.initTower = function (stage){
    this.angle = 0;
    this.health = 10;
    this.target = null;
    this.id = Tower.prototype.idGen++;
    this.cooldown = 4;
    this.kills = 0;
    this.damage = 0;
}

Tower.prototype.dispose = function (stage) {
    Entity.prototype.dispose.call(this, stage);

    createjs.Tween.removeTweens(this.bitmap);
}

Tower.prototype.idGen = 0;

Tower.prototype.cost = function(){
    return Math.ceil(Math.pow(1.5, game.towers.length) * 100);
}