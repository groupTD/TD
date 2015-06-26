var consoleSize = 25;
var i = 0;

var stage;
var towerContainer;
var enemyContainer;
var topContainer;
var canvas;
var width;
var height;
var game;
var pauseMenu;
var backImage = new createjs.Bitmap("assets/back4.png");
var checkedImage = new createjs.Bitmap("assets/checked.png");
var lockedImage = new createjs.Bitmap("assets/locked.png");
var gridSettingsContainer = new GridSettings;

var explosionSpriteTemplate;
var hitSpriteTemplate;
var pauseText;
var boughtTower = null;
var deleteShape;
var frameTime = 0.1;

var mainMenu = new createjs.Container();

function GridSettings() {
    this.horTilesLength = 64;
    this.verTilesLength = 64;
    this.gridXStartCoord = 0;//96;
    this.gridYStartCoord = 0;//48;
    this.verTilesCount = 12;//11;
    this.horTilesCount = 12;// 10;
}

function init() {
	canvas = document.getElementById("scratch");
	stage = new createjs.Stage("scratch");
    stage.enableMouseOver();
	width = parseInt(canvas.style.width);
    height = parseInt(canvas.style.height);
	initMenu();
}

function initMenu() {
	var startText = createText("Start");
	startText.x = width / 2 - 50;
	startText.y = height / 2;
	
	startText.addEventListener('click', function(event) {
		stage.removeChild(mainMenu);
		initGame();
	});
	mainMenu.addChild(startText);
	stage.addChild(backImage);
	stage.addChild(mainMenu);
	stage.update();
}

function initGame() {
	game = new Game(width, height, stage, gridSettingsContainer);
    game.init(1);
	game.draw();
	
	this.document.onkeyup = keyBoardHandler;
	createjs.Ticker.addEventListener("tick", tick);
}

function keyBoardHandler(event) {
	
	// when 'p' is pressed (for pause)
	if (event.keyCode == 80) {
		if (!game.paused) {
			game.pause();
			stage.addChild(getPauseMenu());
			stage.update();	
		}
		else {
			stage.removeChild(getPauseMenu());
			game.resume()
		}
	} else if (event.keyCode == 27) { // on escape
		game.dispose();
		stage.removeAllChildren();
		initMenu();
	}
}

function getPauseMenu() {
	if (pauseMenu == null) {
		pauseMenu = new createjs.Container();
		var popupGraphics = new createjs.Graphics();
		popupGraphics.beginFill('black').drawRect(width / 2 - 150, height / 2 - 150, 300, 300);
		var popupShape = new createjs.Shape(popupGraphics);
		pauseMenu.addChild(popupShape);
		
		var pauseText = createText("Game paused");
		pauseText.x = width / 2 - 130;
		pauseText.y = height / 2 - 30;
		pauseMenu.addChild(pauseText);
	}
	
	return pauseMenu;
}



function tick(event) {
	if (!game.paused) {
        if (i++ % 10 == 0) {
			var enemy = game.addEnemy();
            var tower = game.addTower();
		}
		stage.update();	
	}    
}

function createText(text) {
	var textObj = new createjs.Text(text, "40px Arial", "#ff7700");
	var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, textObj.getMeasuredWidth(), textObj.getMeasuredHeight());
	textObj.hitArea = hit;
	
	return textObj;
}



