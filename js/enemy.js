var Enemy = function(x, y, type) {
    this.pos = {x: x*50, y: y*50};
    this.type = type;
    this.vel = {x:0, y:0};
    this.speed = 50;
    this.mass = 15;
    
    if (type == "test") {
        this.hp = 1;
    }
}
Enemy.prototype.update = function(player, elapsedtime){
    // different AI
    // "test" just walks towards player in the x direction
    if (this.hp == 0) {
        // die
    }
    if (this.type == "test") {
        var dist = this.pos.x - player.pos.x;
        // add the amount we can move at speed
        this.pos.x += (-dist/Math.abs(dist) * this.speed*elapsedtime/1000);
    }
}

Enemy.prototype.die = function(elapsedtime) {
    
}