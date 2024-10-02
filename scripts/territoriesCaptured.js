import { connectDB } from "../api/db/connectDB.js"
import "dotenv/config"
import teamModel from "../api/models/teamModel.js";
import mongoose from "mongoose";
import fs from "fs"

const dbConnectionString = process.env.MONGO_URI;

const getData = async ()=>{
  await connectDB(dbConnectionString);
  try {
    const teams = await teamModel.find();
    const teamData = [];
    for (const team of teams){
      teamData.push({ name: team.name, count: team.territories.length, score: team.score })
    }
    teamData.sort((first, second)=>second.count-first.count);
    fs.writeFileSync("result.txt", JSON.stringify(teamData, null, 2), 'utf-8')
    console.log(teamData)
  } catch(error){
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

getData();