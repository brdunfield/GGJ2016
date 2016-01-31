// index of event is the x tile to trigger it
// TODO - make more 2D
var events = [];

events[-4] = {
    text:[{speaker: "player", text:"What are you doing? Don't click that!"}],
    special: "plotArrow"
}
events[-5] = {
    text:[{speaker: "player", text:"This isn't over yet."},{speaker: "player", text:"..."},{speaker: "player", text:"Look over there! More levels to go through!"}],

// AREA 1 ------------------------------------------
{
    //stacked enemies
    events[section1Start + 35] = {
        type: "enemySpawn",
        x: 78,
        y: 0,
        enemyType: "ranged"
    }
    events[section1Start + 36] = {
        type: "enemySpawn",
        x: 82,
        y: 0,
        enemyType: "ranged"
    }
    events[section1Start + 37] = {
        type: "enemySpawn",
        x: 86,
        y: 0,
        enemyType: "ranged"
    }

}
