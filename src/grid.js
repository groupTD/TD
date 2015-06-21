function Grid(game, horTilesCount, verTilesCount) {
	this.horTilesCount = horTilesCount;
	this.verTilesCount = verTilesCount;
}

function Tile(game,x,y){
    this.game = game;
    this.x = x;
    this.y = y;
}

Grid.prototype.init = function() {
	this.tiles = new Array(this.horTilesCount);
	
	for(var i=0; i< this.horTilesCount; i++){
        this.tiles[i] = new Array(this.verTilesCount);
    }
	
    for(var i=0,x=96; i< this.horTilesCount; i++,x+=64){
        for(var n=0,y=48; n < this.verTilesCount; n++,y+=64){
            this.tiles[i][n] = new Tile(game,x,y);
        }
    }
}

Grid.prototype.draw = function(stage) {
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
	
	function drawCircle(x,y) {
		var circle = new createjs.Shape();
		circle.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)").drawCircle(x,y,2);
		stage.addChild(circle);
	}

	for (var i=0;i<10;i++) {
		for(var n=0;n<11;n++) {
			drawCircle(game.grid.tiles[i][n].x,game.grid.tiles[i][n].y);
		}
	}
}