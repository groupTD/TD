var global = this;

function Game(width, height, stage, gridSettingsContainer) {
    this.currentLevel = 1;
    this.width = width;
    this.height = height;
    this.rng = new Xor128(); // Create Random Number Generator
    this.towers = [];
    this.bullets = [];

    //this.enemies = [];

    this.paused = false;
    this.moving = false; ///< Moving something (temporary pause)
    this.mouseX = 0;
    this.mouseY = 0;
    this.gold = 400;
    this.lives = 5;
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
    this.livesText = null;
    this.goldText = null;

    /// A flag to defer initialization of game state to enable calling logic to
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
};

Game.prototype.dispose = function () {
    this.currentWave.dispose();

};


Game.prototype.addTower = function (x, y) {
    /*TODO add check if outside canvas*/
    hardcodeNoPlacement = function (tile) {
        if (tile.arrayX == 0 && tile.arrayY == 6 || tile.arrayX == 11 && tile.arrayY == 6)return true;
        else if (tile.arrayX == 1 && tile.arrayY == 6 || tile.arrayX == 10 && tile.arrayY == 6)return true;
        else return false;
    }
    var tile = Entity.prototype.getTile(this.grid, x, y);
    if (undefined != tile) {
        if (!hardcodeNoPlacement(tile)) {
            if (tile.blocked != 0) {
                if (this.gold > 100) {
                    var tower = new Tower(this, {
                        texturePath: "assets/tower.png",
                        x: tile.x,
                        y: tile.y
                    });
                    this.setTileBlock(tile);
                    this.towers.push(tower);
                    tower.init(this.stage);
                    this.gold = this.gold - 100;
                    this.updateEnemiesPath();
                    return tower;
                }
            }
        }
    }
};

Game.prototype.updateEnemiesPath = function(){
    if(this.currentWave!=null){
        if(this.currentWave.enemies!=null) {
            this.currentWave.enemies.forEach(function (enemy) {
                enemy.newPath=true;
            })
        }
    }
};

Game.prototype.setTileBlock= function (tile) {
            this.grid.tiles[tile.arrayX][tile.arrayY].blocked=0;
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
	var text = "Wave    " + this.difficulty;
	this.levelStatusText = new createjs.Text(text, "bold 22px Arial", "#663300");
	this.levelStatusText.x = (this.grid.horTilesLength * this.grid.horTilesCount)+10;
	this.levelStatusText.y = (this.grid.verTilesLength * this.grid.verTilesCount) / 2+20;
	stage.addChild(this.levelStatusText);

};


Game.prototype.addLivesText = function () {
    game.stage.removeChild(game.livesText);
    var text = "Lives    " + game.lives;
    game.livesText = new createjs.Text(text, "bold 22px Arial", "#663300");
    game.livesText.x = (this.grid.horTilesLength * this.grid.horTilesCount)+10;
    game.livesText.y = this.grid.verTilesLength;
    game.stage.addChild(this.livesText);

};


Game.prototype.addGoldText = function () {
    stage.removeChild(this.goldText);
    var text = "Gold  " + this.gold;
    this.goldText = new createjs.Text(text, "bold 22px Arial", "#663300");
    this.goldText.x = (this.grid.horTilesLength * this.grid.horTilesCount)+10;
    this.goldText.y = 2 * this.grid.verTilesLength;
    stage.addChild(this.goldText);

};



Game.prototype.draw = function () {
    this.grid.draw(this.stage);
};

Game.prototype.pause = function() {
    this.paused = true;
    this.currentWave.pause();

};

Game.prototype.resume = function() {
    this.paused = false;
    this.currentWave.resume();
};


Game.prototype.update = function (dt, autoSaveHandler) {
    if (this.pause || this.moving)
        return;
};

Game.prototype.onInit = function () {

};

Game.prototype.getTile = function (grid, xSearch, ySearch) {

    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    function rectangleContainsPoint(rect, point) {
        if (rect.width <= 0 || rect.height <= 0) {
            return false;
        }
        return (point.x >= rect.x && point.x < rect.x + rect.width && point.y >= rect.y && point.y < rect.y + rect.height);
    }

    for (var xi = 0; xi < grid.horTilesCount; xi++) {
        for (var yi = 0; yi < grid.verTilesCount; yi++) {
            var point = new Point(xSearch, ySearch);
            var rectangle = new Rectangle(grid.tiles[xi][yi].x, grid.tiles[xi][yi].y, grid.verTilesLength, grid.horTilesLength);
            if (rectangleContainsPoint(rectangle, point)) {
                return grid.tiles[xi][yi];
            }
        }
    }

};


Game.prototype.addProjectile = function(pr) {

};
