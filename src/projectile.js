function Projectile(game, params){
    Entity.call(this, game, params);
    this.tween = [];
}

Projectile.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    //make tower
};