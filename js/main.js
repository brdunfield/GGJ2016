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
    this.playerPos = {x:300, y:700};
    this.playerVel = {x:0,y:0};
    this.arrowPull = false;
    
    this.mousePos = {x:0, y:0};
    
    this.level = level;
    
    this.dialog = null;
    /*
        ======================= Time based Motion Variables =======================
    */
    // speeds are in px/s
    this.moving = null;
    this.playerSpeed = 200;
    this.arrowSpeed = 20;
    this.arrow = null;
    
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
    
    // Update entity positions.
    
    // apply gravity to player
    var g = 100;
    var playerm = 10;
    this.playerVel.y = this.playerVel.y + (g*playerm * elapsedTime/1000);
    
    this.playerPos.y = this.playerPos.y + (this.playerVel.y * elapsedTime/1000);
    
    // Use elapsedTime variable declared above.
    // px to move = entity.speed (px/s) * elapsedTime(ms) * (1s / 1000ms)
    
    // collision detection to stop falling
    // check the y tile below the player
    var playerTile = {x: Math.floor((this.playerPos.x-this.viewport.x)/50), y:Math.floor(this.playerPos.y/50)}
    if (level[playerTile.x][playerTile.y] != undefined) {
        // reset position to top of tile and kill velocity
        this.playerPos.y = (playerTile.y) * 50;
        this.playerVel.y = 0;
    }
    
    // Update player position if there has been a key press
    // don't move if there's a dialog to deal with
    if (this.moving !== null && !this.dialog) {
        this.viewport.x -= this.playerSpeed * (elapsedTime / 1000);
    }
    
    // if player has fallen off the screen, respawn
    if (this.playerPos.y > window.innerHeight) {
        this.respawn();
    }
    
    // update arrow if any
    if (this.arrow) {
        // get arrow vector line, and move along it at arrow speed
        //TODO
    }
    
    // Check for any events at our x pos
    if (events[playerTile.x] != undefined && events[playerTile.x] != null) {
        var e = events[playerTile.x];
        if (e.type === "dialog") {
            this.dialog = e;
        }
        
        // remove the event
        events[playerTile.x] = null;
    }
    
    // Calculate FPS
    this.fps = Math.round(1000 / (time - this.lastTime));
    this.lastTime = time;
    
    /*
        ======================= Render =======================
    */
    this.render();
    
    /*
        ======================= Call Next Frame =======================
    */
    window.requestAnimationFrame(function(time) {
        self.animate.call(self, time);
    });
};

Engine.prototype.render = function() {
    var ctx = this.context;
    ctx.textAlign = "left";
    // Clear last frame's images
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    
    // Draw images using loaded assets
    // Background
    
    // render level present in the viewport
    for (var x=Math.floor(-this.viewport.x/50); x < window.innerWidth/50; x++) {     
        for( var y=0; y < window.innerHeight/50; y++) {
            // check if there's a tile for this tile
            //console.log("checking: " + x + ", " + y);
            if (level[x] != undefined)
                if (level[x][y] != undefined) {
                    ctx.drawImage(this.images[level[x][y].asset], (x*50+this.viewport.x), y*50);
                } 
        }
    }
    
    // player
    ctx.fillStyle = "#d800ff";
    ctx.fillRect(this.playerPos.x - 25, this.playerPos.y-50, 50, 50);
    ctx.fill();
    
    // arrow trajectory
    // draw line from player to mouse pos
    if (this.arrowPull) {
        ctx.strokeStyle = "#00894a";
        ctx.moveTo(this.playerPos.x + 25, this.playerPos.y -25);
        ctx.lineTo(this.mousePos.x, this.mousePos.y)
        ctx.stroke();
        
    }
    
    
    // UI: Health and Score
    
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

Engine.prototype.respawn = function() {
    // put viewport back half a screen
    // put player back as well
    this.playerPos.y = 700;
    this.viewport.x += 500;
}

Engine.prototype.restartGame = function() {
    // reset all variables and begin the game again.
};

/*
    ======================= Event Handler Functions =======================
*/

Engine.prototype.keyPressed = function(e) {
    // Figure out which key was pressed
    switch(e.keyCode) {
        case 39: this.moving = 'right'; break; // right
        case 32: // jump
            if (this.playerVel.y == 0)
                this.playerVel.y = -600;
            break;
    }
    
};
Engine.prototype.keyReleased = function(e) {
    switch(e.keyCode) {
        case 39:
            this.moving = null;
            break;          
    }
};

Engine.prototype.mouseDown = function(e) {
    e.preventDefault();
    e.stopPropagation();
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
                if (this.arrow = null)
                    this.arrow = {dest:this.mousePos, pos:{x:this.playerPos.x + 25, y: this.playerPos.y - 25}};
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
    this.queueImage("assets/test.png", 'test');
    
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