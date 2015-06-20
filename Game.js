var consoleSize = 25;
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

/// Custom inheritance function that prevents the super class's constructor
/// from being called on inehritance.
/// Also assigns constructor property of the subclass properly.
function inherit(subclass,base){
    // If the browser or ECMAScript supports Object.create, use it
    // (but don't remember to redirect constructor pointer to subclass)
    if(Object.create){
        subclass.prototype = Object.create(base.prototype);
    }
    else{
        var sub = function(){};
        sub.prototype = base.prototype;
        subclass.prototype = new sub;
    }
    subclass.prototype.constructor = subclass;
}


function Entity(game,x,y){
    this.game = game;
    this.x = x;
    this.y = y;
}


function Enemy(game,x,y){
    Entity.call(this,game,x,y);
    this.bitmap = new createjs.Bitmap("assets/enemy.png");
    this.bitmap.x=x;
    this.bitmap.y=y;
}
inherit(Enemy, Entity); // Subclass

function Tile(game,x,y){
    Entity.call(this,game,x,y);
    this.entity = null;
}
inherit(Tile,Entity);

function Grid(game){

    this.tiles =new Array(10);
    for(var i=0;i<10;i++){
        this.tiles[i] = new Array(11);
    }
    for(var i=0,x=96;i<10;i++,x+=64){
        for(var n=0,y=48;n<11;n++,y+=64){
            this.tiles[i][n]=new Tile(game,x,y);
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
	this.enemies = new Enemy(this,120,333);
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
    this.grid = new Grid(this);

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
