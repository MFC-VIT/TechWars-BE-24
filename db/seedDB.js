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
        team_name: "Blue-Ninja",
        lobby_id: "123",
        password: "Hello-Ninja"
      },
      {
        team_name: "Gray-Ninja",
        lobby_id: "123",
        password: "Hello-Ninja"
      },
      {
        team_name: "Black-Ninja",
        lobby_id: "123",
        password: "Hello-Ninja"
      },
      {
        team_name: "Neon-Ninja",
        lobby_id: "123",
        password: "Hello-Ninja"
      },
      {
        team_name: "Gold-Ninja",
        lobby_id: "123",
        password: "Hello-Ninja"
      },
      
    ];
    await teamModel.insertMany(tempTeams);
  } catch(error){
    console.error("Error seeding questions:", error);
  }
}

const getNQuestions = (quesCount, quesList)=>{
  if (quesCount >= quesList.length) return quesList;  // edge case
  const startIndex = Math.floor(Math.random()*quesCount);
  const questions = [];
  for (let i = startIndex; i < startIndex+quesCount; i++){
    const iterator = i >= quesList.length ? i - quesList.length : i;
    questions.push(quesList[iterator]);
  }
  return questions;
}

export const seedQuestions = async (lobby_id, rounds, quesPerRound)=>{
  try {
    const teamsInLobby = await teamModel.find({
      lobby_id
    })
    for (const team of teamsInLobby){
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

tempSeedTeams().then(()=>seedQuestions("123", 5, 5))
// seedQuestions("123", 5, 5);

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