//level[x][y] = {"asset", "trigger"}
var level = [];
for (var i = 0; i < 300; i++)
    level[i] = [];

// --- Area 1 ---
//ground
for (var x = 0; x < 200; x++) {
    level[x][17] = {
        asset: "grass",
        fillBelowTile: "ground"
    };
}
//platforms
for (var x = 11; x < 14; x++) {
    level[x][14] = {
        asset: "grass"
    };
}

// wall test
level[20][16] = {
    asset:"grass",
    wall:"true"
}
level[20][15] = {
    asset:"grass",
    wall:"true"
}
level[20][14] = {
    asset:"grass",
    wall:"true"
}

// lava test
level[25][17] = {
    asset:"lava",
    fillBelowTile:"lava",
    fatal:true
}
level[26][17] = {
    asset:"lava",
    fillBelowTile:"lava",
    fatal:true
}