//level[x][y] = {"asset", "trigger"}
var level = [];
for (var i = 0; i < 50000; i++)
    level[i] = [];

// AREA 1 - LENGTH: 100 ------------------------------------------
var section1Start = 1000; {
    //ground & background
    for (var x = section1Start + 0; x < section1Start + 14; x++) {
        level[x][17] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }

    //first hill
    slope(section1Start + 14, 3, 2, 17, 1, "grass", "ground");
    for (var x = section1Start + 20; x < section1Start + 30; x++) {
        level[x][16] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }


    //PIT
    //HILL IN FRONT OF STONE BG
    for (var x = section1Start + 70; x < section1Start + 80; x++) {
        level[x][16] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    for (var x = section1Start + 80; x < section1Start + 90; x++) {
        level[x][14] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    for (var x = section1Start + 90; x < section1Start + 95; x++) {
        level[x][11] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    for (var x = section1Start + 95; x < section1Start + 100; x++) {
        level[x][8] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }

    //FOREGROUND
    //grass platforming section
    for (var x = section1Start + 33; x < section1Start + 36; x++) {
        level[x][15] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 38; x < section1Start + 42; x++) {
        level[x][13] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 45; x < section1Start + 51; x++) {
        level[x][12] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 53; x < section1Start + 55; x++) {
        level[x][13] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 57; x < section1Start + 59; x++) {
        level[x][12] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 62; x < section1Start + 66; x++) {
        level[x][11] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    for (var x = section1Start + 66; x < section1Start + 70; x++) {
        level[x][11] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    //end grass platforming
    //stone hill platforms

    level[section1Start + 78][3] = {
        asset: "grass"
    };
    level[section1Start + 82][5] = {
        asset: "grass"
    };
    level[section1Start + 86][7] = {
        asset: "grass"
    };
}

// STONE TEMPLE - LENGTH: 100 ------------------------------------
var stoneTempleStart = 2000; {
    //ground
    //lead up
    for (var x = stoneTempleStart; x < stoneTempleStart + 10; x++) {
        level[x][17] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    //grass hill
    for (var x = stoneTempleStart + 10; x < stoneTempleStart + 20; x++) {
        level[x][15] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    for (var x = stoneTempleStart + 20; x < stoneTempleStart + 50; x++) {
        level[x][17] = {
            asset: "stone",
            fillBelowTile: "stone_ground",
            wall: true
        };
    }

    //pillars
    level[stoneTempleStart + 63][12] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };
    level[stoneTempleStart + 91][12] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };

    level[stoneTempleStart + 67][10] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };
    level[stoneTempleStart + 86][10] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };

    level[stoneTempleStart + 72][8] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };
    level[stoneTempleStart + 82][8] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };

    level[stoneTempleStart + 76][13] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };
    level[stoneTempleStart + 77][13] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };
    level[stoneTempleStart + 78][13] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };

    //stone temple
    for (var x = stoneTempleStart + 50; x < stoneTempleStart + 60; x++) {
        level[x][18] = {
            asset: "stone",
            fillBelowTile: "stone_ground",
            wall: true
        };
    }
    for (var x = stoneTempleStart + 60; x < stoneTempleStart + 100; x++) {
        level[x][18] = {
            asset: "stone",
            fillBelowTile: "stone_ground",
            wall: true
        };
    }
    for (var x = stoneTempleStart + 65; x < stoneTempleStart + 90; x++) {
        level[x][16] = {
            asset: "stone",
            fillBelowTile: "stone_ground"
        };
    }
    for (var x = stoneTempleStart + 70; x < stoneTempleStart + 85; x++) {
        level[x][14] = {
            asset: "stone",
            fillBelowTile: "stone_ground"
        };
    }
}
//CASTLE AREA - LENGTH: 200 --------------------------------------
var castleStart = 3000; {
    //leading up to castle
    for (var x = castleStart; x < castleStart + 40; x++) {
        level[x][17] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }

    for (var x = castleStart + 40; x < castleStart + 50; x++) {
        level[x][17] = {
            asset: "ground",
            fillBelowTile: "ground",
            wall: true
        };
    }

    //castle
    castleTower(castleStart + 30, 17, 11, 15);
    //castle entrance door
    level[castleStart + 30][15] = {
        asset: "wood",
        noCollide: true
    };
    level[castleStart + 30][16] = {
        asset: "wood_door",
        noCollide: true
    };
    castleTower(castleStart + 41, 17, 21, 11);
    castleTower(castleStart + 62, 17, 11, 15);


    //boss room
    castleTower(castleStart + 73, 17, 41, 11);
    castleTower(castleStart + 114, 17, 11, 15);

    //castle ends castleStart + 125, floor ends 130


    //castle floor
    for (var x = castleStart + 20; x < castleStart + 130; x++) {
        level[x][17] = {
            asset: "stone",
            fillBelowTile: "stone_ground",
            wall: true
        };
    }

    //after castle
    for (var x = castleStart + 130; x < castleStart + 200; x++) {
        level[x][17] = {
            asset: "ground",
            fillBelowTile: "ground"
        };
    }
}

// POST CASTLE - LENGTH: 50 ------------------------------------------
var postCastleStart = castleStart + 200;
postCastleStart = 0; {
    for (var x = postCastleStart; x < postCastleStart + 54; x++) {
        level[x][17] = {
            asset: "lava",
            noCollide: true
        };
    }
    for (var x = postCastleStart; x < postCastleStart + 54; x++) {
        for (var y = 18; y < 25; y++) {
            level[x][y] = {
                asset: "lava_ground",
                noCollide: true
            };
        }
    }

    //platforms
    for (var x = postCastleStart; x < postCastleStart + 6; x++) {
        level[x][16] = {
            asset: "stone",
            wall: true
        };
    }
    for (var x = postCastleStart + 8; x < postCastleStart + 11; x++) {
        level[x][16] = {
            asset: "stone",
            wall: true
        };
    }
    for (var x = postCastleStart + 13; x < postCastleStart + 15; x++) {
        level[x][16] = {
            asset: "stone",
            wall: true
        };
    }
    for (var x = postCastleStart + 17; x < postCastleStart + 20; x++) {
        level[x][15] = {
            asset: "stone",
            wall: true
        };
    }
    for (var x = postCastleStart + 22; x < postCastleStart + 30; x++) {
        level[x][15] = {
            asset: "stone",
            wall: true
        };
    }
    for (var x = postCastleStart + 34; x < postCastleStart + 50; x++) {
        level[x][16] = {
            asset: "stone",
            fillBelowTile: "stone_ground",
            wall: true
        };
    }
}




//helpers
function slope(hillStart, hillSectionWidth, hillDivisions, groundHeight, hillStepHeight, groundTile, fillTile) {
    for (var d = 1; d <= hillDivisions; d++) {
        for (var x = hillStart + hillSectionWidth * (d - 1); x < hillStart + hillSectionWidth * d; x++) {
            level[x][groundHeight - hillStepHeight * d] = {
                asset: groundTile,
                fillBelowTile: fillTile
            };
        }
    }
}

function castleTower(startX, startY, width, height) {
    for (var x = startX; x < startX + width; x++) {
        for (var y = startY; y > startY - height; y--) {
            level[x][y] = {
                asset: "stone_castle",
                fillBelowTile: "stone_castle",
                noCollide: true
            };
        }
    }
    for (var x = startX; x < startX + width; x++) {
        if (x % 2 == 0) {
            level[x][startY - height] = {
                asset: "stone_castle",
                noCollide: true
            };
        }
    }
}

