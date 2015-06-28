/**
 * Created by ValTM on 24.6.2015 ã..
 */
function Tower(game, params){
    Entity.call(this, game, params);
    this.tween = [];
    this.kills = 0;
    this.projSpeed = 0;

}
//inherit(Tower, Entity);

Tower.prototype.init = function (stage) {
    // call base method
    Entity.prototype.init.call(this, stage);
    //make tower
    this.initTower();
};

Tower.prototype.initTower = function (stage){
    this.angle = 0;
    this.health = 10;
    this.target = null;
    this.id = Tower.prototype.idGen++;
    this.cooldown = 4;
    this.kills = 0;
    this.damage = 0;
    this.projSpeed = 100;

};

Tower.prototype.dispose = function (stage) {
    Entity.prototype.dispose.call(this, stage);

    createjs.Tween.removeTweens(this.bitmap);
};

Tower.prototype.idGen = 0;

Tower.prototype.cost = function(){
    return Math.ceil(Math.pow(1.5, game.towers.length) * 100);
};

Tower.prototype.getCooldownTime = function(tower){
    return tower.cooldown;
};

Tower.prototype.shoot = function(){
    var spd = Tower.prototype.projSpeed;
    var mat = [Math.cos(this.angle), Math.sin(this.angle), -Math.sin(this.angle), Math.cos(this.angle)];
    for(var i = -1; i <= 1; i += 2){
        var ofs = mattvp(mat, [0, i * 5]);
        var b = new Bullet(this.game, this.x + ofs[0], this.y + ofs[1], spd * mat[0], spd * mat[1], this.angle, this);
        b.damage = Math.pow(1.2, this.level);
        this.game.addBullet(b);
    }
    this.cooldown = this.getCooldownTime();
}

function Bullet(game,x,y,vx,vy,angle,owner){
    this.game = game;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.angle = angle;
    this.owner = owner;
    this.team = owner.team;
    this.damage = 1;
    this.vanished = false;
};

Bullet.prototype.update = function(dt){
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    var enemies = this.team == 0 ? this.game.enemies : this.game.towers;
    for(var i = 0; i < enemies.length; i++){
        var e = enemies[i];
        if((e.x - this.x) * (e.x - this.x) + (e.y - this.y) * (e.y - this.y) < e.radius * e.radius){
            this.owner.damage += this.damage;
            if(e.receiveDamage(this.damage)){
                this.owner.onKill(e);
            }
            return 0;
        }
    }
    this.onUpdate(dt);
    if(0 < this.x && this.x < this.game.width && 0 < this.y && this.y < this.game.height)
        return 1;
    else{
        // Hitting edge won't trigger bullet hit effect
        this.vanished = true;
        return 0;
    }
};