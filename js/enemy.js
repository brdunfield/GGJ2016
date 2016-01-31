var Enemy = function(x, y, type) {
    this.pos = {x: x*50, y: y*50};
    this.type = type;
    this.vel = {x:0, y:0};
    this.speed = 50;
    this.mass = 15;
    this.attacking = false;
    this.arrow = null;
    
    if (type == "test") {
        this.hp = 1;
        this.ranged = false;
        this.attackRange = 1;
    }
    if (type =="ranged") {
        this.hp = 1;
        this.ranged = true;
        this.shootFrequency = Math.random()*5000 + 3000;
        this.lastShot = 0;
    }
}
Enemy.prototype.update = function(player, elapsedtime, time){
    // different AI
    // types
    // ranged
    // melee
    // passive
    // "test" just walks towards player in the x direction
    if (this.hp == 0) {
        // die
    }
    if (this.type == "test") {
        var dist = this.pos.x - player.pos.x;
        // add the amount we can move at speed
        this.pos.x += (-dist/Math.abs(dist) * this.speed*elapsedtime/1000);
        
        // TODO - check against walls
        
        // if we are close to the player, do a melee attack
        // check the 4 tiles in front of the player
        // player tile.x + 1 and +2
        // player tile.y -0 -1
        var playerTile = {x:Math.floor(player.pos.x/50),y:Math.floor(player.pos.y/50)},
            enemyTile = {x:Math.floor(this.pos.x/50),y:Math.floor(this.pos.y/50)};
        if (enemyTile.y == playerTile.y || enemyTile.y == playerTile.y - 1) {
            if (Math.abs(enemyTile.x - playerTile.x) <= 2) {
                console.log("Enemy attacks with a sword!");
                this.attacking = true;
            }
        }
    } else if (this.type == "ranged") {
        if (time - this.lastShot > this.shootFrequency) {
            // fire arrow at player
            this.lastShot = time;
            console.log("Firing Arrow!");
            this.arrow = new Arrow({x:this.pos.x,y:this.pos.y - 75}, {x:player.pos.x, y:player.pos.y -50}, "enemy");
        }
    }
    
    
}

Enemy.prototype.die = function(elapsedtime) {
    
}
