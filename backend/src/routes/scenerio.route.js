import express from 'express'
import Router from 'express'
import {
    getAllScenerios, getScenerioContext, getScenerioById
} from "../controllers/scenerio.controller.js"

const router = Router()

// list scenarios
router.get("/", getAllScenerios)

// left panel context
router.get("/:id/context", getScenerioContext)

// full scenario
router.get("/:id", getScenerioById)

export default router