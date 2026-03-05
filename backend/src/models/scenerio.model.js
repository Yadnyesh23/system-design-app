import mongoose from "mongoose"

const optionSchema = new mongoose.Schema({

  id: String,
  title: String,
  logic: String

}, { _id:false })

const scenarioSchema = new mongoose.Schema({

  title: String,
  context: String,
  coreIssue: String,
  scenario: String,

  phase1:{
    question:String,
    options:[optionSchema]
  },

  phase2: mongoose.Schema.Types.Mixed,

  phase3:{
    title:String,
    points:[String]
  },

  phase4:{
    instruction:String
  },

  phase5: mongoose.Schema.Types.Mixed

})

export default mongoose.model("Scenario", scenarioSchema)