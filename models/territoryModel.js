/** 
 * Territory ID
 * Troops
 * Owner ID
*/

// import { Schema } from "mongoose"

// const territorySchema = new Schema({
//     name: {
//         type: String,
//     },
//     lobby: {
        
//     },
//     troops: {
        
//     }

    
// })
const mongoose = require('mongoose');

const TerritorySchema = new mongoose.Schema({
    territory_id:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    territoryName: {
        type: String,
        required: true
    },
    lobbyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lobby'
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    troops_deployed:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('Territory', TerritorySchema);
