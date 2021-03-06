var i = 0;

var stage;

var canvas;
var width;
var height;
var game;
var pauseMenu;
var backImage = new createjs.Bitmap("assets/back5.jpg");

var gridSettingsContainer = new GridSettings;


var hitSpriteTemplate;


var mouseClicked = false;
var mouseClickedLength = 0;
var mouseClickedX;
var mouseClickedY;

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
	
	startText.addEventListener('click', function() {
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
	this.document.onmousedown = mouseDownHandler;
    this.document.onmouseup = mouseUpHandler;
	createjs.Ticker.addEventListener("tick", tick);

}
function mouseDownHandler(event) {
    if (!game.paused) {
        mouseClicked=true;
        mouseClickedX = event.pageX;
        mouseClickedY = event.pageY;
    }
}
function mouseUpHandler() {
	if (!game.paused) {
        mouseClicked=false;
        mouseClickedLength=0;
        mouseClickedX=0;
        mouseClickedY=0;
    }
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

function mouseClicking() {
    if (mouseClicked)mouseClickedLength += 1;
    if (mouseClickedLength > 1) {
        var tile = Entity.prototype.getTile(game.grid, mouseClickedX, mouseClickedY);
        if (undefined != tile) {
            game.addTower(tile.x, tile.y);
            stage.update();
        }
    }
}

function tick() {
	if (!game.paused) {
        mouseClicking();
        if (i++ % 10 == 0) {
            game.addEnemy();
            //Gold giver Dev cheat
            game.gold+=100;
        }
        if (i % 20 == 0){
            //console.log(game.towers);

            for (var j = 0; j < game.towers.length; j++) {
                // console.log("Updating tower " + j);
                game.towers[j].update(game);
            }
        }
        //Refresh lives/gold
        game.addLivesText();
        game.addGoldText();
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



