import express from 'express'
const router = express.Router()
import {
    getAllScenerios, getScenerioContext, getScenerioById
} from "../controllers/scenerio.controller.js"



// list scenarios
router.get("/", getAllScenerios)

// left panel context
router.get("/:id/context", getScenerioContext)

// full scenario
router.get("/:id", getScenerioById)

export default router