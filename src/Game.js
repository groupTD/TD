// Remember global object reference for deserialization.
// The variable "window" should be the same thing in a browser,
// but we could write this script independent of running environment.
var global = this;

function Game(width, height, stage, gridSettingsContainer) {
    this.currentLevel = 1;
    this.width = width;
    this.height = height;
    this.rng = new Xor128(); // Create Random Number Generator
    this.towers = [];
    this.bullets = [];
    this.enemies = [];
    this.towers = [];
    this.paused = false;
    this.moving = false; ///< Moving something (temporary pause)
    this.mouseX = 0;
    this.mouseY = 0;
    this.score = 0;
    this.credit = 0;
    this.progress = 0;
    this.stage = stage;
    this.stageClear = true;
    this.highScores = [];
    this.grid = new Grid(gridSettingsContainer);
    this.path = new Path();
    this.enemyCount = 0;
    this.tween = [];
	this.currentWave = null;
	this.difficulty = 1;
	this.levelStatusText = null;
    /// A flag to defer initialization of game state to enale calling logic to
    /// set event handlers on object creation in deserialization.
    this.initialized = false;
}

Game.prototype.global_time = 0;
Game.prototype.waveTime = 60;
Game.prototype.stageTime = Game.prototype.waveTime * 10;

Game.prototype.enemyTypes = [];

Game.prototype.init = function (level) {
    this.initialized = true;
    this.onInit();
    this.grid.init();
    if (level == 1) {
        this.path.init(this.grid, getNavLevel1(this.grid));
        this.enemyCount = 5;
    }
};

Game.prototype.dispose = function () {
	this.currentWave.dispose();
};

Game.prototype.addTower = function() {
    if (this.towers.length < 1) {
        var tile = Entity.prototype.getTile(this.grid, 300, 300);
        var tower = new Tower(this, {
            texturePath: "assets/tower.png",
            x: tile.x,
            y: tile.x
        });
        this.towers.push(tower);
        tower.init(this.stage);
        return tower;
    }
    return null;
};

Game.prototype.removeTower = function (tower) {
    var towerIndex = 0;
    for (var i = 0; i < this.towers.length; i++) {
        if (this.towers[i] === tower) {
            towerIndex = i;
            break;
        }
    }

    // remove element from array
    this.towers.splice(towerIndex, 1);

    tower.dispose(this.stage);
};

Game.prototype.addEnemy = function (enemy) {
    if (this.currentWave == null) {
		this.currentWave = new Wave(this, {
			difficulty: this.difficulty
		});
		
		this.addCurrentLevelText();
	}
		
	if (!this.currentWave.isFinished())
		this.currentWave.addEnemy();
	else {	
		this.currentWave = null;
		this.difficulty++;
	}
};

Game.prototype.addCurrentLevelText = function () {
	stage.removeChild(this.levelStatusText);
	var text = "Current creep level: " + this.difficulty;
	this.levelStatusText = new createjs.Text(text, "40px Arial", "#ff7700");
	this.levelStatusText.x = (this.grid.horTilesLength * this.grid.horTilesCount) / 2;
	this.levelStatusText.y = (this.grid.verTilesLength * this.grid.verTilesCount) / 2;
	stage.addChild(this.levelStatusText);
}

function getNavLevel1(grid) {
    var pathCoords = [];
    for (var i = 0; i < grid.tiles.length; i++) {
        pathCoords[i] = [];
        for (var j = 0; j < grid.tiles[i].length; j++) {
            pathCoords[i][j] = false;
        }
    }

    pathCoords[0][0] = true;
    pathCoords[0][1] = true;
    pathCoords[0][2] = true;
    pathCoords[0][3] = true;
    pathCoords[0][4] = true;
    pathCoords[0][5] = true;
    pathCoords[0][6] = true;
    pathCoords[0][7] = true;
    pathCoords[0][8] = true;
    pathCoords[0][9] = true;
    pathCoords[0][10] = true;
    pathCoords[1][10] = true;
    pathCoords[2][10] = true;
    pathCoords[3][10] = true;
    pathCoords[4][10] = true;
    pathCoords[5][10] = true;
    pathCoords[6][10] = true;
    pathCoords[7][10] = true;
    pathCoords[8][10] = true;
    pathCoords[9][10] = true;

    // |
    // |
    // |
    // |
    // |
    // -------------
    return pathCoords;
}

Game.prototype.draw = function () {
    this.grid.draw(this.stage);
};

Game.prototype.pause = function() {
    this.paused = true;
    this.currentWave.pause();
}

Game.prototype.resume = function() {
    this.paused = false;
    this.currentWave.resume();
}

Game.prototype.deserialize = function (stream) {

};

Game.prototype.startStage = function (stage) {

};

Game.prototype.getStageProgress = function () {

};

Game.prototype.update = function (dt, autoSaveHandler) {
    if (this.pause || this.moving)
        return;
};

Game.prototype.serialize = function () {

};

Game.prototype.addBullet = function (b) {

};

Game.prototype.isGameOver = function () {

};

Game.prototype.hitTest = function (target) {

};

Game.prototype.separateTower = function (tower) {

};

Game.prototype.onClick = function (e) {

};

Game.prototype.mouseMove = function (e) {

};

Game.prototype.addTowerEvent = function (t) {

};

Game.prototype.addEnemyEvent = function (e) {

};

Game.prototype.addBulletEvent = function (b) {

};

Game.prototype.onHeal = function (target, healer) {

};

Game.prototype.onInit = function () {

};

Game.prototype.onStageClear = function () {

};

Game.prototype.onBeamHit = function (x, y) {

};
