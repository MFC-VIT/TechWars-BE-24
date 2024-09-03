/**
 * Team ID
 * Lobby ID
 * territories
 * troops
 * state- [draft, attack, fortify, waiting]
 */

// import { Schema } from "mongoose";

// const teamSchema = new Schema({
//     name: {
//         type: String,
//     },
//     id: {
//         type: String,
//     },
//     lobby: {
//         type: String,
//     },
//     territories: {

//     },
//     state: {
        
//     }

// })
const { Int32 } = require("bson");
const mongoose = require("mongoose");
const  userSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    territory_id:[{
        type:mongoose.Schema.ObjectId,
        required:true
    }],
    password:{
        type:String,
        required:true
    },
    lobby_id:{
        type:String,
        required:true
    },
    team_name:{
        type:String,
        required:true
    },
    score:{
        type:Int32,
    },
    rounds:{
        type:Int32
    }
});

module.exports = mongoose.model("user",userSchema);