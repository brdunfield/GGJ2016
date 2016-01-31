//level[x][y] = {"asset", "trigger"}
var level = [];
for (var i = 0; i < 300; i++)
    level[i] = [];

// AREA 1 ------------------------------------------
//ground
for (var x = 0; x < 70; x++) {
    level[x][17] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}
for (var x = 70; x < 80; x++) {
    level[x][16] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}
for (var x = 80; x < 90; x++) {
    level[x][14] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}
for (var x = 90; x < 95; x++) {
    level[x][11] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}
for (var x = 95; x < 100; x++) {
    level[x][8] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}

hill(15, 4, 17, 3, "grass", "ground");

for (var x = 35; x < 45; x++) {
    level[x][10] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}

for (var x = 45; x < 50; x++) {
    level[x][5] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}
for (var x = 50; x < 65; x++) {
    level[x][2] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}
for (var x = 65; x < 85; x++) {
    level[x][0] = {
        asset: "stone_ground",
        fillBelowTile: "stone_ground"
    };
}

// AREA 2 ------------------------------------------
//ground
for (var x = 100; x < 110; x++) {
    level[x][15] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}
for (var x = 110; x < 120; x++) {
    level[x][16] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}
for (var x = 120; x < 150; x++) {
    level[x][17] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}

//pillars
level[163][12] = {asset: "stone_ground", fillBelowTile: "stone_ground"};
level[191][12] = {asset: "stone_ground", fillBelowTile: "stone_ground"};

level[167][10] = {asset: "stone_ground", fillBelowTile: "stone_ground"};
level[186][10] = {asset: "stone_ground", fillBelowTile: "stone_ground"};

level[172][8] = {asset: "stone_ground", fillBelowTile: "stone_ground"};
level[182][8] = {asset: "stone_ground", fillBelowTile: "stone_ground"};

level[176][13] = {asset: "stone_ground", fillBelowTile: "stone_ground"};
level[177][13] = {asset: "stone_ground", fillBelowTile: "stone_ground"};
level[178][13] = {asset: "stone_ground", fillBelowTile: "stone_ground"};

for (var x = 150; x < 160; x++) {
    level[x][18] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}
for (var x = 160; x < 200; x++) {
    level[x][18] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}
for (var x = 165; x < 190; x++) {
    level[x][16] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}
for (var x = 170; x < 185; x++) {
    level[x][14] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}

//leading up to castle
for (var x = 200; x < 240; x++) {
    level[x][17] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}

for (var x = 240; x < 250; x++) {
    level[x][17] = {
        asset: "ground",
        fillBelowTile: "ground"
    };
}

for (var x = 220; x < 300; x++) {
    level[x][17] = {
        asset: "stone",
        fillBelowTile: "stone_ground"
    };
}

for (var x = 220; x < 280; x++) {
    for(var y=10; y < 17; y++) {
        level[x][y] = {
            asset: "stone_castle"
        };
    }
}

//helpers
function hill(hillStart, hillSection, groundHeight, hillScale, groundTile, fillTile) {
    for (var x = hillStart; x < hillStart+hillSection; x++) {
        level[x][groundHeight - hillScale] = {
            asset: groundTile,
            fillBelowTile: fillTile
        };
    }
    for (var x = hillStart+hillSection; x < hillStart+hillSection*2; x++) {
        level[x][groundHeight - hillScale * 2] = {
            asset: groundTile,
            fillBelowTile: fillTile
        };
    }
    for (var x = hillStart+hillSection*2; x < hillStart+hillSection*3; x++) {
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
