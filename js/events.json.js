// index of event is the x tile to trigger it
// TODO - make more 2D
var events = [];
events[7] = {
    type:"dialog",
    text:"This is a test dialog, with extremely long testy style text, so we can test text wrapping!"
};

events[12] = {
    type:"conversation",
    text:[{speaker: "player", text:"Test Conversation!"},{speaker: "player", text:"Still Testing!"}],
    stopMovement: false,
    autoplay: true
}


events[22] = {
    type:"special",
    key:"xbutton"
}

events[30] = {
    type: "enemySpawn",
    x: 60,
    y: 12,
    enemyType: "test"
}

// AREA 1 ------------------------------------------
//hill enemy

//stone hill enemies

events[20] = {
    type: "enemySpawn",
    x: 60,
    y: 9,
    enemyType: "ranged"
}

//stacked enemies
events[35] = {
    type: "enemySpawn",
    x: 72,
    y: 3,
    enemyType: "ranged"
}
events[36] = {
    type: "enemySpawn",
    x: 74,
    y: 6,
    enemyType: "ranged"
}
events[37] = {
    type: "enemySpawn",
    x: 73,
    y: 9,
    enemyType: "ranged"
}
