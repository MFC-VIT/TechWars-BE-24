/**
 * Seed Questions, TeamIDs, LobbyIDs into DB
 */
import mongoose from "mongoose"
import teamModel from "../models/teamModel.js"
// import questionModel from "../models/questionsModel.js"
import { questions } from "../questions.js"
import "dotenv/config"
import { getNQuestions } from "../functions.js"
import lobbyModel from "../models/lobbyModel.js"

mongoose.connect(process.env.MONGO_URI)

const tempSeedTeams = async ()=>{
  try {
    const teams = await teamModel.find();
    if (teams.length != 0){
      return;
    }
    const lobby = await lobbyModel.create({ name: "ninja-family" });
    const tempTeams = [
      {
        team_name: "Red-Ninja",
        lobby_id: lobby._id,
        password: "Hello-Ninja"
      },
      {
        team_name: "Blue-Ninja",
        lobby_id: lobby._id,
        password: "Hello-Ninja"
      },
      {
        team_name: "Gray-Ninja",
        lobby_id: lobby._id,
        password: "Hello-Ninja"
      },
      {
        team_name: "Black-Ninja",
        lobby_id: lobby._id,
        password: "Hello-Ninja"
      },
      {
        team_name: "Neon-Ninja",
        lobby_id: lobby._id,
        password: "Hello-Ninja"
      },
      {
        team_name: "Gold-Ninja",
        lobby_id: lobby._id,
        password: "Hello-Ninja"
      },
      
    ];
    await teamModel.insertMany(tempTeams);
    const allUsers = await teamModel.find({ lobby_id: lobby._id });
    lobby.allUsers = allUsers.map((user)=>user._id);
    await lobby.save();

  } catch(error){
    console.error("Error seeding questions:", error);
  } finally {
    mongoose.connection.close();
  }
}

export const seedQuestions = async (lobbyId, rounds, quesPerRound)=>{
  try {
    const teamsInLobby = await teamModel.find({
      lobby_id: lobbyId
    })
    for (const team of teamsInLobby){
      if (team.questions.length){
        team.questions = [];
      }
      const questionsForThisTeam = getNQuestions(rounds*quesPerRound, questions);
      team.questions = questionsForThisTeam;
      await team.save();
    } 
  } catch (error){
    console.error("Error seeding questions:", error);
  } finally {
    mongoose.connection.close();
  }
}

// await tempSeedTeams();
await seedQuestions("66da602e1599b492c4b64dd8", 5, 5);

// for demo, assuming 2 teams, then 5 questions each. (total of 10 ques in db)
// const seedQuestions = async ()=>{
//   try {
//     const teams = await teamModel.find();
//     let questionsToSeed = []; 
//     const teamsCount = teams.length;
//     const questionCount = questions.length;
//     const quesForEachTeam = parseInt(questionCount / teamsCount);
//     for (let teamIndex = 0; teamIndex < teamsCount; teamIndex++){
//       let start = teamIndex*quesForEachTeam;
//       for (let quesIndex = start ; quesIndex < start+quesForEachTeam; quesIndex++ ){
//         questionsToSeed[quesIndex] = {
//           team_id: teams[teamIndex]._id,
//           question: questions[quesIndex].question,
//           answer: questions[quesIndex].answer,
//           options: questions[quesIndex].options,
//           points: questions[quesIndex].points
//         } 
//       }
//     }
//     await questionModel.insertMany(questionsToSeed);
//   } catch(error){
//     console.error("Error seeding questions:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedQuestions();