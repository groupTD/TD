function Grid(gridSettingsContainer) {
    this.horTilesCount = gridSettingsContainer.horTilesCount;
    this.verTilesCount = gridSettingsContainer.verTilesCount;
    this.horTilesLength = gridSettingsContainer.horTilesLength;
    this.verTilesLength = gridSettingsContainer.verTilesLength;
    this.gridXStartCoord = gridSettingsContainer.gridXStartCoord;
    this.gridYStartCoord = gridSettingsContainer.gridYStartCoord;
}


function Tile(grid, x, y, tileNumber, arrayX, arrayY,blocked) {
    this.grid = grid;
    this.x = x;
    this.y = y;
    this.blocked = blocked;
    this.number = tileNumber;
    this.arrayX = arrayX;
    this.arrayY = arrayY;
    this.texture;
}

Grid.prototype.init = function () {
    this.tiles = new Array(this.horTilesCount);

    for (var i = 0; i < this.horTilesCount; i++) {
        this.tiles[i] = new Array(this.verTilesCount);
    }
    var tileNumber = 1;
    for (var n = 0, y = this.gridYStartCoord; n < this.verTilesCount; n++, y += this.verTilesLength) {
        for (var i = 0, x = this.gridXStartCoord; i < this.horTilesCount; i++, x += this.horTilesLength) {
            //Setting grid frame blocked for enemies
            if(i==0||n==0||i==this.horTilesCount-1||n==this.verTilesCount-1){
                if(i==0&&n==Math.floor((this.verTilesCount)/2)){
                    this.tiles[i][n] = new Tile(this, x, y, tileNumber, i, n, 1);
                }
                else if(i==this.horTilesCount-1&&n==6)this.tiles[i][n] = new Tile(this, x, y, tileNumber, i, n, 1);
                else this.tiles[i][n] = new Tile(this, x, y, tileNumber, i, n, 0);
            }
            else this.tiles[i][n] = new Tile(this, x, y, tileNumber, i, n, 1);
            tileNumber++;
        }
    }
}

Grid.prototype.draw = function (stage) {
    function drawLine(x, y, grid) {
        var line = new createjs.Shape();
        if (y === 0)line.graphics.moveTo(x, grid.gridYStartCoord).setStrokeStyle(1).beginStroke("#000000").lineTo(x, grid.verTilesLength * grid.verTilesCount + grid.gridYStartCoord);
        else line.graphics.moveTo(grid.gridXStartCoord, y).setStrokeStyle(1).beginStroke("#000000").lineTo(grid.horTilesLength * grid.horTilesCount + grid.gridXStartCoord, y);
        stage.addChild(line);
    }

    for (var x = this.gridXStartCoord; x < width; x += this.horTilesLength) {
        drawLine(x, 0, this);
    }
    for (var y = this.gridYStartCoord; y < height; y += this.verTilesLength) {
        drawLine(0, y, this);
    }

    function drawCircle(tile) {
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(1).beginStroke("rgba(255,0,0,1)").drawCircle(tile.x, tile.y, 2);
        stage.addChild(circle);
    }

    function writeTileNumber(tile) {
        var txt = new createjs.Text(tile.number, "15px Arial", "#000");
        txt.x = tile.x + (0.25 * tile.grid.horTilesLength);
        txt.y = tile.y + (0.25 * tile.grid.verTilesLength);
        stage.addChild(txt);
    }

    function drawGridFrame(tile,grid) {
        var bitmap = new createjs.Bitmap("assets/Rock.jpg");
        var i = tile.arrayX;
        var n = tile.arrayY;
        if(i==0||n==0||i==grid.horTilesCount-1||n==grid.verTilesCount-1) {
            if (!((i == 0 && n == Math.floor((grid.verTilesCount) / 2))||(i == grid.horTilesCount - 1 && n == Math.floor(grid.horTilesCount/2)))) {
                bitmap.x = tile.x;
                bitmap.y = tile.y;
            }
        }
        stage.addChild(bitmap);
    }

    for (var n = 0; n < this.verTilesCount; n++) {
        for (var i = 0; i < this.horTilesCount; i++) {
            drawCircle(this.tiles[i][n]);
            writeTileNumber(this.tiles[i][n]);
            drawGridFrame(this.tiles[i][n],this);
        }
    }
}