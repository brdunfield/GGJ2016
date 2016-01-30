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