import express from 'express'
import cors from 'cors'
const app = express()

// Middleware
app.use(cors({
  origin: "https://system-design-app-tau.vercel.app/", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));app.use(express.json())

import scenerioRoutes from '../src/routes/scenerio.route.js'
app.use("/api/scenarios", scenerioRoutes)

export default app