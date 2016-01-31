var Character = function(x, y, name, speed, mass) {
    this.pos = {x: x*50, y: y*50};
    this.name = name;
    this.vel = {x:0, y:0};
    this.speed = speed;
    this.mass = mass;
    this.attacking = false;
}
Character.prototype.update = function() {
    
}