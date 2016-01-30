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
