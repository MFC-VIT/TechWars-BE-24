/**
 * Seed Questions, TeamIDs, LobbyIDs into DB
 */
import mongoose from "mongoose"
import teamModel from "../models/teamModel.js"
import questionModel from "../models/questionsModel.js"
import { questions } from "../questions.js"
import "dotenv/config"

mongoose.connect(process.env.MONGO_URI)

const tempSeedTeams = async ()=>{
  try {
    const teams = await teamModel.find();
    if (teams.length != 0){
      return;
    }
    const tempTeams = [
      {
        team_name: "Red-Ninja",
        lobby_id: "123",
        password: "Hello-Ninja"
      },
      {
        team_name: "Gray-Nija",
        lobby_id: "987",
        password: "Hello-Ninja"
      }
    ];
    await teamModel.insertMany(tempTeams);
  } catch(error){
    console.error("Error seeding questions:", error);
  }
}

// for demo, assuming 2 teams, then 5 questions each. (total of 10 ques in db)
const seedQuestions = async ()=>{
  try {
    const teams = await teamModel.find();
    let questionsToSeed = []; 
    const teamsCount = teams.length;
    const questionCount = questions.length;
    const quesForEachTeam = parseInt(questionCount / teamsCount);
    for (let teamIndex = 0; teamIndex < teamsCount; teamIndex++){
      let start = teamIndex*quesForEachTeam;
      for (let quesIndex = start ; quesIndex < start+quesForEachTeam; quesIndex++ ){
        questionsToSeed[quesIndex] = {
          team_id: teams[teamIndex]._id,
          question: questions[quesIndex].question,
          answer: questions[quesIndex].answer,
          options: questions[quesIndex].options,
          points: questions[quesIndex].points
        } 
      }
    }
    await questionModel.insertMany(questionsToSeed);
  } catch(error){
    console.error("Error seeding questions:", error);
  } finally {
    mongoose.connection.close();
  }
}

tempSeedTeams();
seedQuestions();