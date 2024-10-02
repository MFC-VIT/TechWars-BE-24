import mongoose from "mongoose";
import { connectDB } from "../api/db/connectDB.js"
import territoryModel from "../api/models/territoryModel.js";
import "dotenv/config"

const territories = [
  {
    "name": "BASKETBALL COURT (BEHIND CS HALL)",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "basketball_court_cs"
  },
  {
    "name": "SJT FOODYS",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "sjt_foodys"
  },
  {
    "name": "FOODYS",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "foodys"
  },
  {
    "name": "GDN",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "gdn"
  },
  {
    "name": "TT MAIN GATE",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "tt_main_gate"
  },
  {
    "name": "SJT ANNEXE",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "sjt_annexe"
  },
  {
    "name": "CBMR",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "cbmr"
  },
  {
    "name": "APPLES",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "apples"
  },
  {
    "name": "LIBRARY SUBMISSION AREA",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "library_submission"
  },
  {
    "name": "FLAG KC LAWN",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "kc_lawn"
  },
  {
    "name": "ARCHITECTURE BLOCK LAWN",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "architecture_lawn"
  },
  {
    "name": "GREENOS",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "greenos"
  },
  {
    "name": "BALAJI",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "balaji"
  },
  {
    "name": "DOMINOS",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "dominos"
  },
  {
    "name": "F-BLOCK LH ATM",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "fblock_lh_atm"
  },
  {
    "name": "GATE 1A",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "gate_1a"
  },
  {
    "name": "OPTICIAN SHOP",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "optician_shop"
  },
  {
    "name": "MADRAS COFFEE SHOP",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "madras_coffee_shop"
  },
  {
    "name": "TENNIS COURT",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "tennis_court"
  },
  {
    "name": "SJT BACK ENTRY",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "sjt_back_entry"
  },
  {
    "name": "SMV BACK GATE",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "smv_back_gate"
  },
  {
    "name": "PRP SIDE GATE",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "prp_side_gate"
  },
  {
    "name": "PRP MAIN GATE",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "prp_main_gate"
  },
  {
    "name": "ORGAN DONOR BUILDING",
    "requiredScore": 0,
    "isCaptured": false,
    "alias": "organ_donor_building"
  }
]

const dbConnectionString = process.env.MONGO_URI

const seed = async ()=>{
  try {
    await connectDB(dbConnectionString);
    for (const territory of territories){
      await territoryModel.create({
        ...territory
      })
    }
  }catch(error){
    console.error(error);
  }finally {
    await mongoose.connection.close();
  }
}

seed();

const nameAliasMap = territories.reduce((map, territory) => {
  map[territory.name] = territory.alias;
  return map;
}, {});

console.log(nameAliasMap);
