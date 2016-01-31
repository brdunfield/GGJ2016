//level[x][y] = {"asset", "trigger"}
var level = [];
for (var i = 0; i < 500; i++)
    level[i] = [];

// AREA 1 - LENGTH: 100 ------------------------------------------
var section1Start = 0; {
    //ground & background
    for (var x = section1Start + 0; x < section1Start + 30; x++) {
        level[x][17] = {
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
    //first hill
    hill(section1Start + 15, 4, 17, 3, "grass", "ground");
    //grass platforming section
    for (var x = section1Start + 33; x < section1Start + 36; x++) {
        level[x][15] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 40; x < section1Start + 42; x++) {
        level[x][13] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 45; x < section1Start + 51; x++) {
        level[x][14] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 53; x < section1Start + 55; x++) {
        level[x][14] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 57; x < section1Start + 58; x++) {
        level[x][13] = {
            asset: "grass",
            wall: true
        };
    }
    for (var x = section1Start + 62; x < section1Start + 66; x++) {
        level[x][13] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    for (var x = section1Start + 66; x < section1Start + 70; x++) {
        level[x][15] = {
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

// AREA 2 - LENGTH: 100 ------------------------------------------
var stoneTempleStart = 100; {
    //ground
    //lead up
    for (var x = stoneTempleStart; x < stoneTempleStart + 10; x++) {
        level[x][15] = {
            asset: "grass",
            fillBelowTile: "ground",
            wall: true
        };
    }
    //grass hill
    hill(stoneTempleStart + 6, 14, 14, 2, "grass", "ground");
    for (var x = stoneTempleStart + 10; x < stoneTempleStart + 20; x++) {
        level[x][16] = {
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
//CASTLE AREA - LENGTH: 250 --------------------------------------
var castleStart = 200; {
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

    //castle floor
    for (var x = castleStart + 20; x < castleStart + 120; x++) {
        level[x][17] = {
            asset: "stone",
            fillBelowTile: "stone_ground",
            wall: true
        };
    }

    //castle
    for (var x = castleStart + 30; x < castleStart + 150; x++) {
        for (var y = 6; y < 16; y++) {
            level[x][y] = {
                asset: "stone_castle",
                noCollide: true
            };
        }
    }

    for (var x = castleStart + 30; x < castleStart + 101; x++) {
        if (x % 2 == 0) {
            level[x][5] = {
                asset: "stone_castle",
                noCollide: true
            };
        }
    }

    //after castle
    for (var x = castleStart + 150; x < castleStart + 160; x++) {
        level[x][17] = {
            asset: "ground",
            fillBelowTile: "ground"
        };
    }
    //end scene with fireworks
    for (var x = castleStart + 160; x < castleStart + 250; x++) {
        level[x][16] = {
            asset: "grass",
            fillBelowTile: "ground"
        };
    }
}

// AREA 3 - LENGTH: xxx ------------------------------------------



//helpers
function hill(hillStart, hillSection, groundHeight, hillScale, groundTile, fillTile) {
    for (var x = hillStart; x < hillStart + hillSection; x++) {
        level[x][groundHeight - hillScale] = {
            asset: groundTile,
            fillBelowTile: fillTile
        };
    }
    for (var x = hillStart + hillSection; x < hillStart + hillSection * 2; x++) {
        level[x][groundHeight - hillScale * 2] = {
            asset: groundTile,
            fillBelowTile: fillTile
        };
    }
    for (var x = hillStart + hillSection * 2; x < hillStart + hillSection * 3; x++) {
        level[x][groundHeight - hillScale] = {
            asset: groundTile,
            fillBelowTile: fillTile
        };
    }
}

//function slope(startX, endX, startY, endY, divisions){
//    var sectionX = (endX - startX) / divisions;
//    var sectionHeightChange = (endY - startY) / divisions;
//
//    for(var d = 1; d <= divisions; d++) {
//        for(var x = startX + sectionX*(d-1); x < startX + sectionX*d; x++) {
//            var y = startY + (sectionHeightChange * d-1);
//            level[x][y] = {
//                asset: "grass",
//                fillBelowTile: "ground"
//            };
//        }
//    }
//}
