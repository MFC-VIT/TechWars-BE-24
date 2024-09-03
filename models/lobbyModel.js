const { Int32 } = require("bson");
const mongoose = require("mongoose");
const  User = require('./teamModel');

const lobbySchema = new mongoose.Schema({
    lobby_id:{
        type:String,
        required:true,
        unique:true
    },
    userCount:{
        type:Number
    },
    userPresent:[User],
    allUsers:[String],
    territoryId: { 
        type: String,
        default: null
    },
    roundsOver: { 
        type: Boolean, 
        default: false 
    },
    whosAttack:{

    },
    isQuiz:{

    },
    isAttack:{

    },
    isTraining:{

    },
    nextRoundTime:{

    },
    isQuizTime:{

    },
    isAttackTime:{

    },
    isTrainingTime:{

    },
    





});

module.exports = mongoose.model("lobby",lobbySchema);