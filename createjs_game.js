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
var backImage = new createjs.Bitmap("assets/back4.png");
var checkedImage = new createjs.Bitmap("assets/checked.png");
var lockedImage = new createjs.Bitmap("assets/locked.png");

var explosionSpriteTemplate;
var hitSpriteTemplate;
var pauseText;
var boughtTower = null;
var deleteShape;
var frameTime = 0.1;

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

function init() {
    canvas = document.getElementById("scratch");
    width = parseInt(canvas.style.width);
    height = parseInt(canvas.style.height);

    stage = new createjs.Stage("scratch");
    stage.enableMouseOver();
    //stage.touchEnabled();

    var progressContainer = new createjs.Container();
    var progressBarBack = new createjs.Shape();
    progressBarBack.graphics.beginFill("#f00").drawRect(0, 0, width / 2, 30);
    progressContainer.addChild(progressBarBack);
    var progressBar = new createjs.Shape();
    progressBar.graphics.beginFill("#0f0").drawRect(0, 0, width / 2, 30);
    progressBar.scaleX = 0;
    progressContainer.addChild(progressBar);
    var progressText = new createjs.Text("Loading...", "bold 24px Helvetica", "#ffffff");
    progressText.y = -24;
    progressContainer.addChild(progressText);
    progressContainer.x = width / 4;
    progressContainer.y = (height - 30) / 2;
    stage.addChild(progressContainer);

    var queue = new createjs.LoadQueue();
    queue.on("complete", function () {
        stage.removeChild(progressContainer);
        start();
    });

    // Tower images
    queue.loadFile("assets/healer.png");
    queue.loadFile("assets/turret.png");
    queue.loadFile("assets/shotgun.png");
    queue.loadFile("assets/BeamTower.png");
    queue.loadFile("assets/MissileTower.png");
    queue.loadFile("assets/shotgun.png");

    // Enemy images
    queue.loadFile("assets/enemy.png");
    queue.loadFile("assets/boss.png");
    queue.loadFile("assets/enemy3.png");
    queue.loadFile("assets/enemy4.png");
    queue.loadFile("assets/BeamEnemy.png");
    queue.loadFile("assets/MissileEnemy.png");
    queue.loadFile("assets/BattleShip.png");
    queue.loadFile("assets/BattleShipTurret.png");
    queue.loadFile("assets/BulletShieldEnemy.png");

    // Effects
    queue.loadFile("assets/explode.png");
    queue.loadFile("assets/explode2.png");
    queue.loadFile("assets/explode_blue.png");

    // Miscellaneous
    queue.loadFile("assets/back.jpg");
    queue.loadFile("assets/back2.jpg");
    queue.loadFile("assets/Missile.png");
    queue.loadFile("assets/trashcan.png");
    queue.loadFile("assets/checked.png");
    queue.loadFile("assets/locked.png");

    queue.on("progress", function (event) {
        progressBar.scaleX = queue.progress;
        stage.update();
    });


    writeToTextArea("INIT OVER")
}


function start() {
    writeToTextArea("Starting START");
    game = new Game(width, height);


    stage.addChild(backImage);

    function drawGrid() {
        function drawLine(x, y) {
            var line = new createjs.Shape();
            if (y === 0)line.graphics.moveTo(x, 48).setStrokeStyle(1).beginStroke("#000000").lineTo(x, 752);
            else line.graphics.moveTo(96, y).setStrokeStyle(1).beginStroke("#000000").lineTo(736, y);
            stage.addChild(line);
        }
        for (x = 96; x < width; x += 64) {
            drawLine(x, 0);
        }
        for (y = 48; y < height; y += 64) {
            drawLine(0, y);
        }
    }

    drawGrid();

    function drawCircle(x,y){
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)").drawCircle(x,y,2);
        stage.addChild(circle);
    }

    function drawTiles(){
        for(var i=0;i<10;i++){
            for(var n=0;n<11;n++){
            drawCircle(game.grid.tiles[i][n].x,game.grid.tiles[i][n].y);
            }
        }
    }
    drawTiles();

    createjs.Ticker.addEventListener("tick", tick);

    writeToTextArea("Ending START")
}

function tick(event) {
    if (game) {
        //writeToTextArea("RUN " + i);
        game.update(frameTime, function () {
        });
        if (i > 150)game = null;
    }
    else writeToTextArea("STOPED " + i);
    if (i > 200) {
        start();
        i = 0;
    }

    stage.update();
    i++;

}



