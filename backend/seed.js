import dotenv from "dotenv"
import mongoose from "mongoose"
import scenarios from "./seed/scenarios.js"
import Scenario from "./src/models/scenerio.model.js"

dotenv.config()

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)

        console.log("MongoDB connected")

    } catch (error) {

        console.error(error)

        process.exit(1)

    }
}

const seedData = async () => {

    try {

        await Scenario.deleteMany()

        console.log("Old scenarios removed")

        await Scenario.insertMany(scenarios)

        console.log("Scenarios inserted successfully")

        process.exit()

    } catch (error) {

        console.error(error)

        process.exit(1)

    }

}

connectDB().then(seedData)