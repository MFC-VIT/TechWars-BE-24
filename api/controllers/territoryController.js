import "dotenv/config"
import territoryModel from "../models/territoryModel.js"
import { CustomError } from "../utils/functions.js"
import teamModel from "../models/teamModel.js";

export const createTerritory = async (req, res, next)=>{
  const {territoryname, subterritories, minScore, alias} = req.body;
  try {
    const territory = await territoryModel.create({
      name: territoryname,
      subterritories: subterritories,
      requiredScore: minScore,
    });
    if (alias){
      territory.alias = alias;
      await territory.save();
    }
    return res.status(200).json({
      success: true,
      message: "territory created successfully",
      territory,
    });
  } catch(error){
    return next(error);
  }
}

export const getAllTerritories = async (req, res, next)=>{
  try {
    const territories = await territoryModel.find();
    return res.status(200).json({
      success: true,
      territories,
    })
  } catch(error){
    return next(error);
  }
}

export const getAvailableTerritories = async (req, res, next)=>{
  try {
    const availableTerritories = await territoryModel.find({
      isCaptured: false
    });
    return res.status(200).json({
      success: true,
      territories: availableTerritories,
    })
  } catch(error){
    return next(error);
  }
}

export const transferTerritory = async (req, res, next)=>{
  const teamId = req.teamId;
  const query = req.body.name;
  try {
    const territory = await territoryModel.findOne({
      $or : [
        { name: query },
        { alias: query }
      ]
    });
    
    const team = await teamModel.findById(teamId);
    if (territory.isCaptured){
      const prevTeamId = territory.capturedBy;
      const prevTeam = await teamModel.findById(prevTeamId);
      const theirTerritories = prevTeam.territories;
      prevTeam.territories = theirTerritories.filter(territoryObj=>territoryObj._id!=territory._id);
      await prevTeam.save();
    }
    territory.isCaptured = true;
    territory.capturedBy = teamId;
    team.territories.push(territory._id);
    await team.save()
    await territory.save()

    return res.status(200).json({
      success: true,
      territory,
      team,
    })
  } catch(error){
    return next(error);
  }
}