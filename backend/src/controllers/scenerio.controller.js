import Scenerio from '../models/scenerio.model.js'

// Get All Scenerios
const getAllScenerios = async (req, res) => {
    try {
        const scenerios = await Scenerio.find({}, "title context core_issue")

        res.status(200).json({
            success: true,
            message: "Fetched all scenerios",
            count: scenerios.length,
            data: scenerios
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

// Get Scenerio Context

const getScenerioContext = async (req, res) => {
    try {
        const scenerioContext = await Scenerio.findById(req.params.id, "title context core_issue scenario")
        if (!scenerioContext) {

            return res.status(404).json({
                success: false,
                message: "Scenario not found"
            })

        }

        res.status(200).json({
            success: true,
            data: scenerioContext
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getScenerioById = async(req, res) => {
    try {

const scenario = await Scenerio.findById(req.params.id)

if (!scenario) {

return res.status(404).json({
success: false,
message: "Scenario not found"
})

}

res.status(200).json({
success: true,
data: scenario
})

} catch (error) {

res.status(500).json({
success: false,
message: error.message
})

}
}
export {getAllScenerios , getScenerioContext, getScenerioById}