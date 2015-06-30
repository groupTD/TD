/**
 * Created by ValTM on 24.6.2015 ?..
 */
function Tower(game, params){
    Entity.call(this, game, params);
    this.tween = [];
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
        function onHit(tower, game) {
            tower.target.health = tower.target.health - tower.damage;
            if (tower.target.health < 0) {
                tower.target = null;
            }
            game.gold += 100;
        }

        function bitmap(stage, tower) {
            var bitmap = new createjs.Bitmap("assets/projectile.png");
            bitmap.x = tower.x + 32;
            bitmap.y = tower.y;
            stage.addChild(bitmap);
            return bitmap;
        }

        var tweenObj = createjs.Tween.get(bitmap(game.stage, this));

        var target = this.target;
        tweenObj.to({x: target.x, y: target.y}, this.projSpeed, createjs.Ease.linear()).call(onHit(this, game));
        this.tween.push(tweenObj);

        var that = this;
        tweenObj.call(function () {
                Entity.prototype.dispose.call(this, stage);
                createjs.Tween.removeTweens(this.bitmap);
                //Da se mahat kartinkite
                //that.wave.enemyFinished(that);
            }
        );
    }
};
   // console.log(this.target);

/*
Tower.prototype.idGen = 0;

Tower.prototype.cost = function(){
    return Math.ceil(Math.pow(1.5, game.towers.length) * 100);
};

Tower.prototype.getCooldownTime = function(tower){
    return tower.cooldown;
};

Tower.prototype.shoot = function(){
    var speed = Tower.prototype.projSpeed;
    var math = [Math.cos(this.angle), Math.sin(this.angle), -Math.sin(this.angle), Math.cos(this.angle)];
    for(var i = -1; i <= 1; i += 2){
        var offset = mattvp(math, [0, i * 5]);
        var towerProj = new Projectile(this.game, this.x + offset[0], this.y + offset[1], speed * math[0], speed * math[1], this.angle, this);
        towerProj.damage = Math.pow(1.2, this.level);
        this.game.addProjectile(towerProj);
    }
    this.cooldown = this.getCooldownTime();
};

function Projectile(game,x,y,vx,vy,angle,tower){
    this.game = game;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.angle = angle;
    this.tower = tower;
    this.team = tower.team;
    this.damage = 1;
    this.vanished = false;
}

Projectile.prototype.update = function(dt){
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    var enemies = this.team == 0 ? this.game.enemies : this.game.towers;
    for(var i = 0; i < enemies.length; i++){
        var enemy = enemies[i];
        if((enemy.x - this.x) * (enemy.x - this.x) + (enemy.y - this.y) * (enemy.y - this.y) < enemy.radius * enemy.radius){
            this.tower.damage += this.damage;
            if(enemy.receiveDamage(this.damage)){
                this.tower.onKill(enemy);
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
};*/
