import mongoose from "mongoose";

const Phase1OptionSchema = new mongoose.Schema({
  option_id: String,   
  title: String,
  logic: String
});

const Phase2OptionSchema = new mongoose.Schema({
  option_id: String,   
  text: String
});

const Phase2BranchSchema = new mongoose.Schema({
  linked_option: String, 

  options: [Phase2OptionSchema]
});

const ScenarioSchema = new mongoose.Schema({

  title: String,

  context: String,

  core_issue: String,

  scenario: String,

  phase1: {

    question: String,

    options: [Phase1OptionSchema]
  },

  phase2: {

    description: String,

    branches: [Phase2BranchSchema]

  },

  phase3: {

    title: String,

    architecture: [String]

  },

  phase4: {

    prompt: String

  },

  phase5: {

    company_lens: [

      {
        company: String,
        expectation: String
      }

    ],

    strong_signals: [String],

    weak_signals: [String]

  }

});

export default mongoose.model("Scenario", ScenarioSchema);