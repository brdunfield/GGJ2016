// index of event is the x tile to trigger it
// TODO - make more 2D
var events = [];
events[-4] = {
    text:[{speaker: "player", text:"What are you doing? Don't click that!"}],
    special: "plotArrow"
}
events[-5] = {
    text:[{speaker: "player", text:"This isn't over yet."},{speaker: "player", text:"..."},{speaker: "player", text:"Look over there! More levels to go through!"}],
}
events[-10] = {
    text:[{speaker:"princess", text:"My Hero!"},{speaker:"player", text:"You're safe now, Your Highness!"}]
}
// AREA 1 ------------------------------------------
{
    //move/jump tutorial
    events[section1Start + 8] = {
        type: "conversation",
        text: [{
            speaker: "player",
            text: "Use D to move right. We must slay the enemies and save the princess!"
        }]
    };
    events[section1Start + 11] = {
        type: "conversation",
        text: [{
            speaker: "player",
            text: "Use SPACE to jump so we can get over these hills!"
        }]
    };

    //first enemy
    events[section1Start + 18] = {
        type: "conversation",
        text: [{
            speaker: "player",
            text: "Use LEFT click on your mouse to swing your sword and slay that monster!"
        }]
    };
    events[section1Start + 19] = {
        type: "enemySpawn",
        x: section1Start + 29,
        y: 15,
        enemyType: "test"
    }

    //jump puzzle

    //bow and arrow tutorial
    events[section1Start + 61] = {
        type: "conversation",
        text: [{
            speaker: "player",
            text: "Use RIGHT click to shoot an arrow!"
        }]
    };

    //stacked enemies
    events[section1Start + 63] = {
        type: "enemySpawn",
        x: section1Start + 78,
        y: 0,
        enemyType: "ranged"
    }
    events[section1Start + 64] = {
        type: "enemySpawn",
        x: section1Start + 82,
        y: 0,
        enemyType: "ranged"
    }
    events[section1Start + 65] = {
        type: "enemySpawn",
        x: section1Start + 86,
        y: 0,
        enemyType: "ranged"
    }
}

// Stone Temple - LENGTH: 100 ------------------------------------------
{
    //shoot enemies!
    //    events[stoneTempleStart] = {
    //        type: "conversation",
    //        text: [{
    //            speaker: "player",
    //            text: "Use RIGHT click to shoot an arrow!"
    //        }]
    //    };
    //enemies to shoot down
    events[stoneTempleStart + 1] = {
        type: "enemySpawn",
        x: stoneTempleStart + 10,
        y: 0,
        enemyType: "ranged"
    }
    events[stoneTempleStart + 2] = {
        type: "enemySpawn",
        x: stoneTempleStart + 13,
        y: 0,
        enemyType: "ranged"
    }
    events[stoneTempleStart + 3] = {
        type: "enemySpawn",
        x: stoneTempleStart + 14,
        y: 0,
        enemyType: "ranged"
    }
    events[stoneTempleStart + 4] = {
        type: "enemySpawn",
        x: stoneTempleStart + 20,
        y: 0,
        enemyType: "ranged"
    }
}

//CASTLE START -------------------------------------
{
    events[castleStart + 10] = {
        type: "conversation",
        text: [{
            speaker: "player",
            text: "Excellent! The Castle! Now let's move forward and rescue that princess!"
        }]
    };

    events[castleStart + 32] = {
        type: "conversation",
        text: [{
            speaker: "player",
            text: "Hold on princess! I’m coming to save you!"
        }]
    };

    events[castleStart + 29] = {
        type: "enemySpawn",
        x: castleStart + 40,
        y: 15,
        enemyType: "melee"
    }
    events[castleStart + 30] = {
        type: "enemySpawn",
        x: castleStart + 55,
        y: 15,
        enemyType: "ranged"
    }
    events[castleStart + 31] = {
        type: "enemySpawn",
        x: castleStart + 60,
        y: 15,
        enemyType: "ranged"
    }

    //boss fight
    events[castleStart + 61] = {
        type: "conversation",
        cutscene:"true",
        text: [{
            speaker: "player",
            text: "I will find you Lord Night Skull, no matter where you hide!"
        },
        {
            speaker: "player",
            text: "These creatures are nothing compared to my righteous sword!"
        },
        {
            speaker: "player",
            text: "Show yourself evil-doer!"
        }]
    };
    events[castleStart + 62] = {
        type: "special",
        key: "spawnlns"
    }

    events[castleStart + 75] = {
        type: "conversation",
        cutscene: true,
        text: [{
            speaker: "princess",
            text: "Help me!"
        }, {
            speaker: "player",
            text: "Worry not my love! Your savior has arrived!"
        },{
            speaker: "lns",
            text: "Rats! How did you get here?"
        },{
            speaker: "player",
            text: "At last! You will face justice, fiend!"
        },{
            speaker: "lns",
            text: "You will die where you stand, Sir Erwin Rudolf Josef Alexander!"
        },]
    };
    events[castleStart + 76] = {
        type: "special",
        key:"lnsfight"
    };

}
