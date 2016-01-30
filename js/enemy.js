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
Enemy.update = function(player){
    // different AI
    // "test" just walks towards player in the x direction
    
    if (type == "test") {
        
    }
}