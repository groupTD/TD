function Enemy(game,texture,x,y){
    Entity.call(this,game,texture,x,y);
}

Enemy.prototype.draw = function(container) { 
	
}

inherit(Enemy, Entity);