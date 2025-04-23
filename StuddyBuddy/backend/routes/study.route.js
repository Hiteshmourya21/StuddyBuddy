import express from "express"
import { generateStudyPlan, getStudyPlan, toggleModuleStatus } from "../controllers/studyController.js"
import { protectRoute } from "../middleware/auth.middleware.js"
const router = express.Router()

router.use(protectRoute)
router.post("/generate", generateStudyPlan)
router.get("/:userId", getStudyPlan)
router.put("/module/:moduleId/toggle", toggleModuleStatus)

export default router
