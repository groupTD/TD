function Projectile(game, params){
    Entity.call(this, game, params);
    this.tween = [];
}

Projectile.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    //make tower
};

Projectile.prototype.dispose = function (stage) {
    Entity.prototype.dispose.call(this, stage);

    createjs.Tween.removeTweens(this.bitmap);
};