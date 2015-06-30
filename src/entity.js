function Entity(game, params) {
    this.game = game;
    this.params = params;
    this.x = params.x;
    this.y = params.y;
}

Entity.prototype.init = function (stage) {
    this.bitmap = new createjs.Bitmap(this.params.texturePath);
    this.bitmap.x = this.params.x;
    this.bitmap.y = this.params.y;
    stage.addChild(this.bitmap);
};

Entity.prototype.dispose = function (stage) {
    stage.removeChild(this.bitmap);
};

Entity.prototype.getTile = function (grid, xSearch, ySearch) {

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

Entity.prototype.getShortestPath = function (grid, startPoint, endPoint) {
    var graph = new Array(grid.horTilesCount);

    for (var i = 0; i < grid.horTilesCount; i++) {
        graph[i] = new Array(grid.verTilesCount);
    }

    for (var x = 0; x < grid.horTilesCount; x++) {
        for (var y = 0; y < grid.verTilesCount; y++) {
            graph[x][y] = grid.tiles[x][y].blocked;
        }
    }
    var startTile = this.getTile(grid, startPoint.x, startPoint.y);
    var endTile = this.getTile(grid, endPoint.x, endPoint.y);
    var graph2 = new Graph(graph);
    var start = graph2.grid[startTile.arrayX][startTile.arrayY];
    var end = graph2.grid[endTile.arrayX][endTile.arrayY];
    return astar.search(graph2, start, end);
};