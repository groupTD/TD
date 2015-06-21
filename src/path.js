function Path(pathCoords) {
	this.points = [];
	this.initFlag = false;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

Path.prototype.init = function (grid, pathCoords) {
	if (!this.initFlag) {
		for (var i = 0; i < pathCoords.length; i++) {
			for (var j = 0; j < pathCoords[i].length; j++) {
				if (pathCoords[i][j]) {
					var x = grid.tiles[i][j].x;
					var y = grid.tiles[i][j].y;
					this.points.push(new Point(x, y));
				}
			}
		}
		
		this.initFlag = true;
	}
}

















