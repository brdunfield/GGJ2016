var Character = function(x, y, name, speed, mass) {
    this.pos = {x: x*50, y: y*50};
    this.name = name;
    this.vel = {x:0, y:0};
    this.speed = speed;
    this.mass = mass;
    this.attacking = false;
    this.following = true;
    this.moving = false;
    this.jumping = false;
    this.attacking = false;
}
Character.prototype.update = function(player, elapsedTime) {
    // if following, move toward the player at speed to within 1 tile (50)
    if (this.following) {
        var movement = ((this.pos.x > player.pos.x) ? -1 : 1 )*this.speed * (elapsedTime / 1000);
        if (Math.abs(this.pos.x + movement - player.pos.x) > 50) {
            this.moving = true;
            this.pos.x += movement;
        } else {
            this.moving = false;
        }
        if (player.jumping && !this.jumping) {
            this.vel.y = -550;
            this.jumping = true;
        }
    }
}