import express from "express"
import cors from "cors"
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}))


app.use(express.json())

import scenerioRoutes from "../src/routes/scenerio.route.js"

app.use("/api/scenarios", scenerioRoutes)

export default app