/**
 * Team ID
 * Lobby ID
 * territories
 * troops
 * state- [draft, attack, fortify, waiting]
 */

import { Schema } from "mongoose";

const teamSchema = new Schema({
    name: {
        type: String,
    },
    id: {
        type: String,
    },
    lobby: {
        type: String,
    },
    territories: {

    },
    state: {
        
    }

})