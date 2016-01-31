var PLAYERLEFT = 425;
var Engine = function(canvasID) {
    // This is required in order to have the proper context in the requestAnimationFrame below400
    var self = this;
    
    this.debug = true;
    
    var canvas = document.getElementById(canvasID);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // This is where we set variables the engine will need to keep in state
    this.context = canvas.getContext('2d'); // The canvas context where we will render
    this.fps = 60; // Frames per second - so we can gauge performance
    this.lastTime = 0; // used for calculating FPS
    
    // Game Variables
    this.viewport = {x:0,y:0};
    this.player = {pos: {x:PLAYERLEFT, y:700},
                  vel:{x:0,y:0},
                  speed: 200,
                  mass: 10,
                  player: true,
                  moving: null,
                  attacking:null,
                  jumping: false}
    this.arrowPull = false;
    
    this.mousePos = {x:0, y:0};
    
    this.level = level;
    
    this.dialog = null;
    this.conversation = null;
    
    this.enemies = [];
    this.enemies.push(new Enemy(17,10,"ranged"));
    
    this.characters = [];
    this.characters.push(new Character(4, 10, "princess", 30, 5))
    
    // PLot variables
    this.cutscene = false;
    this.xButton = {x:25, y:25, falling: false, broken: false, vel:{x:-200,y:0}};
    
    
    /*
        ======================= Time based Motion Variables =======================
    */
    // speeds are in px/s
    this.playerSpeed = 200;
    this.arrowSpeed = 600;
    this.arrow = null;
    this.arrows = [];
    
    this.gravity = 100;
    
    this.messageSpeed = 4000; // autoplay messages will advance after 5s
    this.lastMessage = 0;
    
    // Assets and asset loading variables
	this.images = {};
	this.imagesLoaded = 0;
	this.imagesFailed = 0;
	this.imageUrls = [];
	this.imagesIndex = 0;
    
    /*
        ======================= Event Handlers Declaration =======================
    */
    window.addEventListener('contextmenu', function(e){e.preventDefault();});
    
    window.onkeypress = function (e) { self.keyPressed(e) };
	window.onkeydown = function (e) { self.keyPressed(e); };
    window.onkeyup = function (e) { self.keyReleased(e); };
    window.onmousedown = function(e) {self.mouseDown(e);};
    window.onmousemove = function(e) {self.mousePos = {x:e.clientX, y:e.clientY};};
    window.onmouseup = function(e) {self.mouseUp(e);};
    
    //Image loading - later
    self.initImageAssets.call(self);
    /*
    // for now -start game
    window.requestAnimationFrame(function (time) {
        self.animate.call(self, time);
    });*/
};

Engine.prototype.animate = function(time) {
    var self = this,
        ctx = this.context;
    
    // Time based motion - determine how long it has been since the last frame
    // This will be in milliseconds
    var elapsedTime = time - this.lastTime;
    
    /*
        ======================= Update =======================
    */
    
    // remove expired enemies, or offscreen enemies
    for (var e = this.enemies.length-1; e >= 0; e--) {
        if (this.enemies[e].hp == 0)
            this.enemies.splice(e,1);
        else if (this.enemies[e].pos.x + this.viewport.x < -50) // offscreen enemies
            this.enemies.splice(e,1);
    }
    
    // Update entity positions.
    var playerTile = {x: Math.floor(this.player.pos.x/50), y:Math.floor(this.player.pos.y/50)};
    // apply gravity to player
    this.player = this.physics(this.player, elapsedTime);
    
    // Update player position if there has been a key press
    // don't move if there's a dialog to deal with
    if (this.player.moving !== null && !this.dialog) {
        // check if we would collide with a wall if we progressed
        var testx = this.player.pos.x + this.player.speed * (elapsedTime / 1000) + 25;
        var testTile = {x:Math.floor(testx/50), y: Math.floor(this.player.pos.y/50) - 1};
        if (level[testTile.x][testTile.y] != undefined && level[testTile.x][testTile.y].hasOwnProperty("wall")){
            console.log("hit a wall");// do nothing
        } else {
            this.player.pos.x += this.player.speed * (elapsedTime / 1000);
            // move the viewport only if the player is far enough along
            if (this.player.pos.x + this.viewport.x > PLAYERLEFT)
                this.viewport.x -= this.player.speed * (elapsedTime / 1000);
        }
    }
    if (this.player.attacking != null) {
        this.player.attacking += elapsedTime;
        if (this.player.attacking > 500)
            this.player.attacking = null;
    }
    
    // apply gravity to enemies and update
    for (var e=0; e < this.enemies.length; e++) {
        if (!this.cutscene) {
            this.enemies[e] = this.physics(this.enemies[e], elapsedTime);

            this.enemies[e].update(this.player, elapsedTime, time);

            if (this.enemies[e].arrow) {
                this.arrows.push(this.enemies[e].arrow);
                this.enemies[e].arrow = null;
            }
        }
        // check enemy attacks
        if (this.enemies[e].attacking) {
            if (this.enemies[e].ranged) {
                
            } else {
                // melee attack
                // check if player is within enemy attack range
                var enemyTile = {x: Math.floor((this.enemies[e].pos.x-this.viewport.x)/50), y:Math.floor(this.enemies[e].pos.y/50)};
                if (enemyTile.y == playerTile.y && Math.abs(enemyTile.x - playerTile.x) < 2) {
                    console.log("Enemy attack hit");
                    
                    this.knockback();
                }
            }
            this.enemies[e].attacking = false;

        }
    }
    
    // Update characters
    for (var c=0; c < this.characters.length; c++) {
        this.physics(this.characters[c], elapsedTime);
        this.characters[c].update();
    }

    // if player has fallen off the screen, respawn
    if (this.player.pos.y > window.innerHeight) {
        this.respawn();
    }
    
    // update arrow if any
    for (var a=this.arrows.length - 1; a >= 0; a--) {
        var arrow = this.arrows[a];
        arrow.update(elapsedTime);
        
        // check arrow collision
        // get arrow tile and compare
        var arrowTile = {x:Math.floor(arrow.pos.x/50), y:Math.floor(arrow.pos.y/50)};
        if (level[arrowTile.x][arrowTile.y] != undefined && !level[arrowTile.x][arrowTile.y].hasOwnProperty("noCollide")) {
            // we hit a tile - arrow dies
            this.arrows.splice(a, 1);
        } else if (arrow.dist < 6) {
            // if a plot arrow, do stuff here

            this.arrows.splice(a, 1);
        } else {
            // check collisions
            if (arrow.owner == "player") {
                for (var e=0; e < this.enemies.length; e++) {
                    var eTile = {x: Math.floor(this.enemies[e].pos.x/50), y: Math.floor(this.enemies[e].pos.y/50)};
                    if (arrowTile.x == eTile.x && (arrowTile.y == eTile.y - 1 || arrowTile.y == eTile.y - 2)) { // arrows are -1 in y from the rest of entities because they are not a full tile
                        // enemy takes damage and arrow dies
                        this.enemies[e].hp --;
                        this.arrows.splice(a, 1);
                        break;
                    }
                }
            } else if (arrow.owner == "enemy") {
                if (arrowTile.x == playerTile.x && (arrowTile.y == playerTile.y - 1 || arrowTile.y == playerTile.y - 2)) { // arrows are -1 in y from the rest of entities because they are not a full tile
                    this.arrows.splice(a, 1);
                    this.knockback();
                    break;
                }
            }
        }
        
    }
    
    // Check for any events at our x pos
    if (events[playerTile.x] != undefined && events[playerTile.x] != null) {
        var e = events[playerTile.x];
        if (e.type === "dialog") {
            this.dialog = e;
        } else if (e.type === "conversation") {
            this.conversation = e;
            this.lastMessage = time;
            this.conversation.i = 0;
        } else if (e.type === "enemySpawn") {
            this.enemies.push(new Enemy(e.x, e.y, e.enemyType));
        } else if (e.type === "special") {
            this.cutscene = true;
            if (e.key ==="xbutton") {
                // create a special "plot arrow" that attacks the x button. When it connects, x button falls

            }
                this.xButton.falling = true;
        }
        
        // remove the event
        events[playerTile.x] = null;
    }
    
    // advance any conversations
    if (this.conversation)
        if (time - this.lastMessage > this.messageSpeed) {
            this.lastMessage = time;
            if (this.conversation.i < this.conversation.text.length)
                this.conversation.i ++;
            if (this.conversation.i == this.conversation.text.length)
                this.conversation = null;
        }
    
    /*
        ============= CUTSCENE UPDATES ==============
    */
    // apply gravity to x button if falling
    if (this.xButton.falling) {
        this.xButton.vel.y = this.xButton.vel.y + (this.gravity*10*elapsedTime/1000);
        this.xButton.y = this.xButton.y + (this.xButton.vel.y * elapsedTime/1000);
        this.xButton.x = this.xButton.x + (this.xButton.vel.x * elapsedTime/1000)
        
        if (this.xButton.x < 0)
            this.xButton.vel.x *= -1;
        
        if (this.xButton.y > window.innerHeight - 50) {
            this.xButton.vel.y = 0;
            this.xButton.y = window.innerHeight - 50
            this.xButton.falling = false;
            this.xButton.broken = true;
            this.cutscene = false;
        }
    }
    
    // Calculate FPS
    this.fps = Math.round(1000 / (time - this.lastTime));
    
    /*
        ======================= Render =======================
    */
    this.render(time);
    
    /*
        ======================= Call Next Frame =======================
    */
    this.lastTime = time;
    window.requestAnimationFrame(function(time) {
        self.animate.call(self, time);
    });
};

Engine.prototype.render = function(time) {
    var ctx = this.context;
    ctx.textAlign = "left";
    // Clear last frame's images
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Draw images using loaded assets
    // Background
    // TODO LOOP
    ctx.drawImage(this.images["background_01"],this.viewport.x/5,0);
    ctx.drawImage(this.images["background_02"],this.viewport.x/4,0);
    ctx.drawImage(this.images["background_03"],this.viewport.x/3,0);
    //ctx.drawImage(this.images["background_04"],this.viewport.x/2,0);
    ctx.drawImage(this.images["background_05"],this.viewport.x/1.2,0);
    
    // render level present in the viewport
    var startx = Math.floor(-this.viewport.x/50)
    for (var x=startx; x < (window.innerWidth/50) + startx + 1; x++) {     
        for( var y=0; y < window.innerHeight/50; y++) {
            // check if there's a tile for this tile
            //console.log("checking: " + x + ", " + y);
            if (level[x] != undefined)
                if (level[x][y] != undefined) {
                    // draw the asset
                    // if its a sprite, draw whichever part of it matches the global time counter divided by 1 second
                    var numsprites = this.images[level[x][y].asset].width/50;
                    ctx.drawImage(this.images[level[x][y].asset],(Math.floor(time/1000)%numsprites)*50, 0 , 50, 50, (x*50+this.viewport.x), y*50, 50, 50);
                    if(level[x][y].fillBelowTile != undefined) {
                        for(var b=y+1; b < window.innerHeight/50; b++) {
                            ctx.drawImage(this.images[level[x][y].fillBelowTile], (x*50+this.viewport.x), b*50);
                        }
                    }
                }
        }
    }
    
    // player
    var numsprites = (this.player.moving && !this.player.attacking && !this.player.jumping ) ? 2 : 1;
    ctx.drawImage(this.images["player"],((Math.floor(time/200))%numsprites)*50, (this.player.attacking != null) ? 300 : (this.player.jumping) ? 200 : (this.player.moving ) ? 100 : 0, 50, 100, this.player.pos.x + this.viewport.x - 25,this.player.pos.y-100, 50, 100);
    if (this.player.attacking != null)
        ctx.drawImage(this.images["playerAttack"], this.player.pos.x + this.viewport.x + 25,this.player.pos.y-100)
    
    // enemies
    for (var e=0; e< this.enemies.length; e++) {
        // for now just render a red square
        var enemy = this.enemies[e];
        ctx.drawImage(this.images["enemy"], enemy.pos.x + this.viewport.x, enemy.pos.y - 100);
        
    }
    
    // NPC characters
    for (var c=0; c < this.characters.length; c++) {
        var char = this.characters[c];
        ctx.drawImage(this.images[char.name],char.pos.x + this.viewport.x, char.pos.y - 100 );
    }

    // arrow trajectory
    // draw line from player to arrow destination
    if (this.arrowPull) {
        ctx.strokeStyle = "#00894a";
        
        ctx.beginPath();
        ctx.moveTo(this.player.pos.x + this.viewport.x + 25, this.player.pos.y -75);
        ctx.lineTo(this.mousePos.x, this.mousePos.y)
        ctx.stroke();
        
    }
    
    // render arrow
    ctx.fillStyle = "#ff8900";
    for (var a=0; a < this.arrows.length; a++) {
        ctx.fillRect(this.arrows[a].pos.x + this.viewport.x, this.arrows[a].pos.y, 25, 3);
    }
    
    // UI: Health and Score
    
    // X button
    ctx.drawImage(this.xButton.broken ? this.images["xbroken"] : this.images["x"], this.xButton.x, this.xButton.y);
    
    
    if (this.dialog) {
        // render dialog box
        var dx = (window.innerWidth/2) - 200,
            dy = (window.innerHeight/2) - 100;
        ctx.fillStyle = "#333";
        ctx.fillRect(dx, dy, 400, 200);
        ctx.fillStyle = "#eee";
        ctx.font = "16pt Arial"
        wrapText(ctx, this.dialog.text, dx + 20, dy + 40, 360, 22 )
        
        // option buttons
        ctx.fillStyle = "#7478d3";
        ctx.fillRect(dx + 50, dy + 160, 100, 25);
        ctx.fillRect(dx + 250, dy + 160, 100, 25);
        
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.fillText("Yes", dx + 100, dy + 180);
        ctx.fillText("No", dx + 300, dy + 180);
    }
    if (this.conversation) {
        // render conversation
        var blurb = this.conversation.text[this.conversation.i];
        var tx, ty;
        if (blurb.speaker == "player") {
            tx = this.player.pos.x - 100;
            ty = this.player.pos.y - 200;
        } else if (blurb.speaker != "enemy") {
            for (var c=0; c < this.characters.length; c++) {
                if (blurb.speaker == this.characters[c].name) {
                    tx = this.characters[c].pos.x - 100;
                    ty = this.characters[c].pos.y - 200;
                }
            }
        }
        
        ctx.fillStyle = "#b1ff00";
        ctx.fillRect(tx + this.viewport.x, ty, 200, 75);
        
        ctx.fillStyle = "#000";
        ctx.font = "10pt monospace";
        wrapText(ctx, blurb.text, tx + 5 + this.viewport.x, ty + 15, 190, 12);
        
    }
    
    // If game is not currently playing, display title screen
    
    // DEBUG
    if (this.debug) {
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 1;
        ctx.fillStyle = "#333";
        ctx.font = "10px arial";


        for (var x=0; x< window.innerWidth; x+=50) {

            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, window.innerHeight);
            ctx.stroke();

            for( var y=0; y < window.innerHeight; y+=50) {
                ctx.fillText("x:" + Math.floor((x-this.viewport.x)/50), x + 2, y + 10);
                ctx.fillText("y:" + (y-this.viewport.y)/50, x + 2, y + 20)

                if (x === 0) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(window.innerWidth, y);
                    ctx.stroke();
                }
            }
        }

        // FPS Indicator
        document.getElementById('fps').innerHTML = "FPS: " + this.fps;
    }
}

Engine.prototype.physics = function(entity, elapsedTime) {
    // straight up skip physics if elapsed time is comically large
    if (elapsedTime > 500)
        return entity;

    var vel = entity.vel,
        pos = entity.pos;
    vel.y = vel.y + (this.gravity*entity.mass*elapsedTime/1000);
    pos.y = pos.y + (vel.y * elapsedTime/1000)
    
    // apply any x vel
    pos.x = pos.x + (vel.x * elapsedTime/1000)
    
    // collision detection to stop falling
    // check the y tile below the player
    var entityTile = {x: Math.floor((pos.x)/50), y:Math.floor(pos.y/50)}
    if (level[entityTile.x][entityTile.y] != undefined && !level[entityTile.x][entityTile.y].hasOwnProperty("noCollide")) {
        // reset position to top of tile and kill velocity
        pos.y = (entityTile.y) * 50;
        vel.y = 0;
        if (entity.hasOwnProperty("jumping"))
            entity.jumping = false;
        
        // if there is an x vel, kill it here
        vel.x = 0;
        
        // if the tile does damage - take damage
        // for now just respawn
        if (entity.hasOwnProperty("player") && level[entityTile.x][entityTile.y].hasOwnProperty("fatal")) {
            this.respawn();
        }
    }
    entity.pos = pos;
    entity.vel = vel;
    return entity;
}

Engine.prototype.respawn = function() {
    // put viewport back half a screen
    // put player back as well
    this.player.pos.y = 700;
    this.player.pos.x = Math.max(0, this.player.pos.x - 500);
    this.viewport.x = Math.min(0, this.viewport.x + 800);
    // recenter the player on the viewport    
    this.player.pos.x = Math.max(0, PLAYERLEFT - this.viewport.x);


}

Engine.prototype.knockback = function() {
    // knockback player if they are not at the left of hte screen
    var velx = (this.player.pos.x + this.viewport.x < 75) ? 0 : -200
    this.player.vel = {x:velx, y:-400};
}

Engine.prototype.restartGame = function() {
    // reset all variables and begin the game again.
};

/*
    ======================= Event Handler Functions =======================
*/

Engine.prototype.keyPressed = function(e) {
    // Figure out which key was pressed
    if (!this.cutscene)
        switch(e.keyCode) {
            case 39: 
            case 68:
                if (!this.player.attacking)
                    this.player.moving = true; break; // right
            case 32: // jump
                if (this.player.vel.y == 0) {
                    this.player.vel.y = -550;
                    this.player.jumping = true;
                }
                break;
        }
    
};
Engine.prototype.keyReleased = function(e) {
    switch(e.keyCode) {
        case 39: 
        case 68:
            this.player.moving = null;
            break;
        case 13:
            // enter key - proceed in conversation
            if (this.conversation) {
                if (this.conversation.i < this.conversation.text.length)
                    this.conversation.i ++;
                if (this.conversation.i == this.conversation.text.length)
                    this.conversation = null;
            }
    }
};

Engine.prototype.mouseDown = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!this.cutscene)
        switch(e.which) {
            case 1:
                // left click - attack
                // if dialog, check for button click
                if (this.dialog) {
                    var dx = (window.innerWidth/2) - 200,
                        dy = (window.innerHeight/2) - 100;

                    if (e.clientY > dy + 160 && e.clientY < dy + 185) {
                        if (e.clientX > dx + 50 && e.clientX < dx + 150) {
                            // yes
                            console.log("dialog yes");
                            this.dialog = null;
                        } else if (e.clientX > dx + 250 && e.clientX < dx + 350) {
                            // no
                            console.log("dialog no");
                            this.dialog = null;
                        }
                    }
                } else {
                    // attack
                    // TODO - animation
                    this.player.attacking = 0;
                    this.player.moving = null;
                    // check the 4 tiles in front of the player
                    // player tile.x + 1 and +2
                    // player tile.y -0 -1
                    var playerTile = {x:Math.floor(this.player.pos.x/50),y:Math.floor(this.player.pos.y/50)}
                    for (var e=0; e < this.enemies.length; e++) {
                        // compare against those 4 tiles
                        var enemyTile = {x:Math.floor(this.enemies[e].pos.x/50),y:Math.floor(this.enemies[e].pos.y/50)};
                        if (enemyTile.y == playerTile.y || enemyTile.y == playerTile.y - 1) {
                            if (enemyTile.x == playerTile.x + 1 || enemyTile.x == playerTile.x + 2) {
                                console.log("Enemy hit by sword!");
                                this.enemies[e].hp --;
                            }
                        }

                    }

                }
                break;
            case 3:
                // right click
                if (!this.dialog) {
                    this.arrowPull = true;
                    break;
                }
        }
}
Engine.prototype.mouseUp = function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.dialog)
        switch(e.which) {
            case 1:
                // left click
                break;
            case 3:
                // right click -  release arrow
                this.arrowPull = false;
                // see if there is a player owned arrow
                var newArrow = true;
                for (var a = 0; a < this.arrows.length; a++) {
                    if (this.arrows[a].owner == "player")
                        newArrow = false;
                }
                if (newArrow) {
                    var dest = {x:this.mousePos.x - this.viewport.x, y: this.mousePos.y};
                    this.arrows.push(new Arrow({x:this.player.pos.x + 25, y: this.player.pos.y - 75}, dest, "player"));
                }
                break;
        }
}

/*
    ======================= Asset Loading =======================
*/

Engine.prototype.initImageAssets = function() {
    /*
        Process:
        We queue all the assets we wish to include in the game. We then continually call our
        loading function. Each time it is called it returns the percentage of assets that are
        loaded. Once we reach 100%, we know all our assets have been loaded, and can 
        continue with starting the game.
    */
    
    var self = this;
    // Image Queue
    this.queueImage("assets/x.png","x");
    this.queueImage("assets/xbroken.png","xbroken");
    this.queueImage("assets/test.png", 'test');
    this.queueImage("assets/grass.png", 'grass');
    this.queueImage("assets/ground.png", 'ground');
    this.queueImage("assets/lava_sprite.png","lava");
    this.queueImage("assets/stone.png", 'stone');
    this.queueImage("assets/stone_ground.png", 'stone_ground');
    this.queueImage("assets/stone_castle.png", 'stone_castle');
    
    
    // backgrounds
    this.queueImage("assets/background_01.png","background_05");
    this.queueImage("assets/background_02.png","background_04");
    this.queueImage("assets/background_03.png","background_03");
    this.queueImage("assets/background_04.png","background_02");
    this.queueImage("assets/background_05.png","background_01");
    
    // characters
    this.queueImage("assets/Hero.png", 'player');
    this.queueImage("assets/sword.png", 'playerAttack');
    
    this.queueImage("assets/Randy.png", 'enemy');
    this.queueImage("assets/Princess.png", 'princess');
    
    var loadingPercent = 0;
    var interval = setInterval(function(e) {
        // continually load images and check on our progress
        loadingPercent = self.loadImages();
        // Loading bar changes width so users can see progress
        //document.getElementById('loadingBar').style.width = loadingPercent*800/100 + "px";
        console.log("Images loading: " + loadingPercent + "%");
        if (loadingPercent == 100) {
            clearInterval(interval);
            //document.getElementById('loadingBar').style.opacity = 0; // hide bar
            // Start the game loop
            window.requestAnimationFrame(function (time) {
                console.log("Game START");
                self.animate.call(self, time);
            });
        }
    }, 16);
};

Engine.prototype.queueImage = function(url, name) {
    // Adds an image to the queue
    this.imageUrls.push({'url': url, 'name': name});
}

Engine.prototype.loadImage = function(url, name) {
    // Loads a single image when passed its url, and saves it into this.images
    // using the supplied name for future access
    var image = new Image(),
        self = this;
    image.src = url;
    // Record images which were both successful AND failed so we can tell how many of our
    // assets were attempted
    image.addEventListener('load', function(e) {
        self.imagesLoaded ++;
    });
    image.addEventListener('error', function(e) {
        self.imagesFailed ++;
    });
    this.images[name] = image;
};

Engine.prototype.loadImages = function() {
    // Attempt to load the next asset in the queue
    if (this.imagesIndex < this.imageUrls.length) {
        this.loadImage(this.imageUrls[this.imagesIndex].url, this.imageUrls[this.imagesIndex].name);
        this.imagesIndex ++;
    }
    // Return what percentage of assets have been attempted
    return (this.imagesLoaded + this.imagesFailed) / this.imageUrls.length * 100;
}

/*
Engine.prototype.loadJSON = function(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}*/

/*
    ================ Utility Functions ==================
*/
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
}
