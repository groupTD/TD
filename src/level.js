function Level(id, path) {
    this.id = id;
    this.path = path;
}

Level.prototype.createEnemy = function () {
    var enemy = new Enemy(this, "assets/enemy.png", 0, 0);

}

Level.prototype.destroyEnemy = function () {

}