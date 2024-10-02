import mongoose from "mongoose";
import "dotenv/config"
import lobbyModel from "../api/models/lobbyModel.js";
import { connectDB } from "../api/db/connectDB.js";
import teamModel from "../api/models/teamModel.js";

const teams = [
  {
    "TeamName": "Viking",
    "Password": "kgd5ECb"
  },
  {
    "TeamName": "Samurai",
    "Password": "c5AjZ7H"
  },
  {
    "TeamName": "Knight",
    "Password": "y8uVKx7"
  },
  {
    "TeamName": "Gladiator",
    "Password": "SLY2kpQ"
  },
  {
    "TeamName": "Spartan",
    "Password": "Zr5RvmB"
  },
  {
    "TeamName": "Barbarian",
    "Password": "RmUd9TS"
  },
  {
    "TeamName": "Ninja",
    "Password": "Eg4PU3A"
  },
  {
    "TeamName": "Legion",
    "Password": "mcK46sQ"
  },
  {
    "TeamName": "Crusader",
    "Password": "NAgW73P"
  },
  {
    "TeamName": "Templar",
    "Password": "NknE5bd"
  },
  {
    "TeamName": "Warlord",
    "Password": "azKs7v3"
  },
  {
    "TeamName": "Pharaoh",
    "Password": "TBGt7nM"
  },
  {
    "TeamName": "Conqueror",
    "Password": "HCrg5c7"
  },
  {
    "TeamName": "Sultan",
    "Password": "cNYp7x4"
  },
  {
    "TeamName": "Emperor",
    "Password": "apkDS5M"
  },
  {
    "TeamName": "Tsar",
    "Password": "x5tHTCZ"
  },
  {
    "TeamName": "Caesar",
    "Password": "S9Wsr62"
  },
  {
    "TeamName": "Khan",
    "Password": "sXk53EH"
  },
  {
    "TeamName": "Monarch",
    "Password": "qhzB6ty"
  },
  {
    "TeamName": "Shogun",
    "Password": "PY9jFfK"
  },
  {
    "TeamName": "Duke",
    "Password": "qVyv4Mj"
  },
  {
    "TeamName": "Viscount",
    "Password": "tA5D6gT"
  },
  {
    "TeamName": "Overlord",
    "Password": "sky4D2r"
  },
  {
    "TeamName": "Rajah",
    "Password": "pSYhC6e"
  },
  {
    "TeamName": "Chief",
    "Password": "tSraX59"
  },
  {
    "TeamName": "Commander",
    "Password": "wZ3UbXd"
  },
  {
    "TeamName": "Marshal",
    "Password": "GQcK5aP"
  },
  {
    "TeamName": "Warden",
    "Password": "c3Vu6Y8"
  },
  {
    "TeamName": "Dictator",
    "Password": "ExLP8N6"
  },
  {
    "TeamName": "Sovereign",
    "Password": "b3F2JjU"
  },
  {
    "TeamName": "Ruler",
    "Password": "d5RFpJC"
  },
  {
    "TeamName": "Chieftain",
    "Password": "g6H9qhN"
  },
  {
    "TeamName": "Mogul",
    "Password": "A96mbw5"
  },
  {
    "TeamName": "Magnate",
    "Password": "KVaub3g"
  },
  {
    "TeamName": "Baron",
    "Password": "Tc6b8UK"
  },
  {
    "TeamName": "King",
    "Password": "za4ygK8"
  },
  {
    "TeamName": "Empress",
    "Password": "Acx6MdT"
  },
  {
    "TeamName": "Queen",
    "Password": "PtLW9xT"
  },
  {
    "TeamName": "Prince",
    "Password": "J3qg7sV"
  },
  {
    "TeamName": "Princess",
    "Password": "dT7Q3wj"
  },
  {
    "TeamName": "Czar",
    "Password": "LAY9re6"
  },
  {
    "TeamName": "Dictatrix",
    "Password": "X7thZdj"
  },
  {
    "TeamName": "Archduke",
    "Password": "BvcJ8Zd"
  },
  {
    "TeamName": "Daimyo",
    "Password": "pb4HkzY"
  },
  {
    "TeamName": "Lord",
    "Password": "yFw2ufU"
  },
  {
    "TeamName": "Regent",
    "Password": "Q6uVR2r"
  },
  {
    "TeamName": "Premier",
    "Password": "aGxq8HF"
  },
  {
    "TeamName": "Patriarch",
    "Password": "jhJ2w6a"
  },
  {
    "TeamName": "Matriarch",
    "Password": "V9GQaeP"
  },
  {
    "TeamName": "Dynast",
    "Password": "LuQym48"
  }
]

const dbConnectionString = process.env.MONGO_URI

const seed = async ()=>{
  try {
    await connectDB(dbConnectionString);
    const lobby = await lobbyModel.findOne({ name: "techwars" });
    for (const teamObj of teams){
      const team = await teamModel.create({
        name: teamObj.TeamName,
        password: teamObj.Password,
        lobby_id: lobby._id
      })
      lobby.teams.push({ teamId: team._id })
    }
    await lobby.save();
  } catch(error){
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
