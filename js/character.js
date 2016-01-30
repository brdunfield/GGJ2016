var Character = function(x, y, asset, type, speed, mass) {
    this.pos = {x: x*50, y: y*50};
    this.type = type;
    this.vel = {x:0, y:0};
    this.speed = speed;
    this.mass = mass;
    this.attacking = false;
}
Character.prototype.update = function() {
    
}