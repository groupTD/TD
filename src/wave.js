function Wave(game, params) {
	this.game = game;
	this.difficulty = params.difficulty;
	this.enemies = [];
	this.enemyCount = 5 + this.difficulty;
	this.addedEnemies = 0;
}

Wave.prototype.isFinished = function () {
	return this.addedEnemies == this.enemyCount && this.enemies.length == 0;
};

Wave.prototype.addEnemy = function () {
    if (this.enemies.length < this.enemyCount && this.addedEnemies < this.enemyCount) {
		var enemy = new Enemy(this.game, this, {
			texturePath: "assets/enemy.png",
			speed: 1000,
			x: 0,
			y: (game.grid.verTilesCount * game.grid.verTilesLength) / 2 + 20,
			health: 10 * this.difficulty
		});

        this.enemies.push(enemy);
        enemy.init(this.game.stage);
		this.addedEnemies++;
        return enemy;
    }

    return null;
};

Wave.prototype.pause = function () {
	for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].pauseMovement();
    }
};

Wave.prototype.resume = function () {
	for (var i = 0; i < this.enemies.length; i++) {
        this.enemies[i].resumeMovement();
    }
};

Wave.prototype.removeEnemy = function (enemy) {
    var enemyIndex = -1;
    for (var i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i] === enemy) {
            enemyIndex = i;
            break;
        }
    }
	
	if (enemyIndex > -1) {
		// remove element from array
		this.enemies.splice(enemyIndex, 1);
		enemy.dispose(this.game.stage);
	}
};

Wave.prototype.enemyFinished = function (enemy) {
	this.game.lives--;
    this.removeEnemy(enemy);
	if (this.game.lives == 0) {
		this.game.dispose();
		this.game.stage.removeAllChildren();
		
		this.initMenu();
	}
};

Wave.prototype.initMenu = function() {
	var startText = createText("New game");
	startText.x = width / 2 - 50;
	startText.y = height / 2;
	var mainMenu = new createjs.Container();
	var textObj = new createjs.Text("Game Over", "40px Arial", "#000000");
	textObj.x = startText.x;
	textObj.y = startText.y - 60;
	
	startText.addEventListener('click', function() {
		stage.removeChild(mainMenu);
		initGame();
	});
	
	mainMenu.addChild(textObj);
	mainMenu.addChild(startText);
	stage.addChild(backImage);
	stage.addChild(mainMenu);
	stage.update();
}

Wave.prototype.dispose = function () {
	for (var i = 0; i < this.enemies.length; i++) {
		this.removeEnemy(this.enemies[i]);
	}
};
