var Arrow = function(source, dest, owner) {
    // owner can be "player", "enemy", "plot"
    this.dest = dest;
    this.pos = source;
    this.owner = owner;
    this.speed = 600;
    this.dist = 100;
}

Arrow.prototype.update = function(elapsedTime) {
        // get arrow vector line, and move along it at arrow speed
        this.dist = Math.sqrt(Math.pow(this.dest.x - this.pos.x,2) + Math.pow(this.dest.y - this.pos.y,2));
        // d = how much the arrow has moved
        var d = this.speed * elapsedTime/1000;
        this.pos.x += (d/this.dist)*(this.dest.x - this.pos.x);
        this.pos.y += (d/this.dist)*(this.dest.y - this.pos.y);
}
