import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getSuggestedConnections, getPublicProfile, updateProfile, getUserById, getSearchResults} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/suggestions", protectRoute, getSuggestedConnections);

router.get("/:username", protectRoute, getPublicProfile);
router.get("/Id/:userId", getUserById);

router.put("/profile", protectRoute, updateProfile);

router.get("/query/search", getSearchResults);


export default router;