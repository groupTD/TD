function Entity(game, params){
    this.game = game;
	this.params = params;
}

Entity.prototype.init = function(stage) {
	this.bitmap = new createjs.Bitmap(this.params.texturePath);
	this.bitmap.x = this.params.x;
	this.bitmap.y = this.params.y;
	stage.addChild(this.bitmap);
}

Entity.prototype.dispose = function(stage) {
	stage.removeChild(this.bitmap);
}