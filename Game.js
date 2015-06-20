var consoleSize = 500;
// Remember global object reference for deserialization.
// The variable "window" should be the same thing in a browser,
// but we could write this script independent of running environment.
var global = this;

//Dev help functions
String.prototype.lines = function () {
    return this.split(/\r*\n/);
}
String.prototype.lineCount = function () {
    return this.lines().length;
}
function javascript_abort() {
    throw new Error('This is not an error. This is just to abort javascript');
}

function writeToTextArea(text) {
    var tmp = document.getElementById("textarea").innerHTML;
    var lineCount = tmp.lineCount();
    var index = tmp.indexOf("\n");
    if (lineCount > consoleSize) {
        var result = tmp.substring(index + 1, document.getElementById("textarea").innerHTML.length);
        document.getElementById("textarea").innerHTML = result + text + "\n";
    }
    else {
        document.getElementById("textarea").innerHTML += text + "\n";

    }
}
function Tile(x,y){
    this.x = x;
    this.y = y;
    this.entity = null;
}

function Grid(){

    this.tiles =new Array(10);
    for(var i=0;i<10;i++){
        this.tiles[i] = new Array(11);
    }
    for(var i=0,x=96;i<10;i++,x+=64){
        for(var n=0,y=48;n<11;n++,y+=64){
            this.tiles[i][n]=new Tile(x,y);
            //writeToTextArea(i+" "+n+" "+this.tiles[i][n].x+"  "+this.tiles[i][n].y);
        }
    }
}

function Game(width, height){
	this.width = width;
	this.height = height;
	this.rng = new Xor128(); // Create Random Number Generator
	this.towers = [];
	this.bullets = [];
	this.enemies = [];
	this.pause = false;
	this.moving = false; ///< Moving something (temporary pause)
	this.mouseX = 0;
	this.mouseY = 0;
	this.score = 0;
	this.credit = 0;
	this.progress = 0;
	this.stage = null;
	this.stageClear = true;
	this.highScores = [];
    this.grid = new Grid();

	/// A flag to defer initialization of game state to enale calling logic to
	/// set event handlers on object creation in deserialization.
	this.initialized = false;
}

Game.prototype.global_time = 0;
Game.prototype.waveTime = 60;
Game.prototype.stageTime = Game.prototype.waveTime * 10;

Game.prototype.enemyTypes = [
];

Game.prototype.init = function(){
	this.initialized = true;
	this.onInit();
}

Game.prototype.deserialize = function(stream){

}

Game.prototype.startStage = function(stage){

}

Game.prototype.getStageProgress = function(){

}

Game.prototype.update = function(dt, autoSaveHandler){
	if(this.pause || this.moving)
		return;
    this.grid
}

Game.prototype.serialize = function(){
}

Game.prototype.removeTower = function(tower){
	}

Game.prototype.addBullet = function(b){
	}

Game.prototype.isGameOver = function(){

}

Game.prototype.hitTest = function(target){

}

Game.prototype.separateTower = function(tower){

}

Game.prototype.onClick = function(e){

}

Game.prototype.mouseMove = function(e){

}

Game.prototype.addTowerEvent = function(t){
}

Game.prototype.addEnemyEvent = function(e){
}

Game.prototype.addBulletEvent = function(b){
}

Game.prototype.onHeal = function(target,healer){
}

Game.prototype.onInit = function(){
}

Game.prototype.onStageClear = function(){
}

Game.prototype.onBeamHit = function(x,y){
}
