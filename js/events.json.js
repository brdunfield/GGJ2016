// index of event is the x tile to trigger it
// TODO - make more 2D
var events = [];
/*
events[7] = {
    type:"dialog",
    text:"This is a test dialog, with extremely long testy style text, so we can test text wrapping!"
};*/

events[42] = {
    type:"conversation",
    text:[{speaker: "princess", text:"Test Conversation!"},{speaker: "player", text:"Still Testing!"}],
    stopMovement: false,
    autoplay: true
}


events[-4] = {
    text:[{speaker: "player", text:"What are you doing? Don't click that!"}],
    special: "plotArrow"
}
events[-5] = {
    text:[{speaker: "player", text:"This isn't over yet."},{speaker: "player", text:"..."},{speaker: "player", text:"Look over there! More levels to go through!"}],
}

events[30] = {
    type: "enemySpawn",
    x: 60,
    y: 12,
    enemyType: "test"
}