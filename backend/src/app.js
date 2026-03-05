import express from 'express'
import cors from 'cors'
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

import scenerioRoutes from '../src/routes/scenerio.route.js'
app.use("/api/scenarios", scenerioRoutes)

export default app