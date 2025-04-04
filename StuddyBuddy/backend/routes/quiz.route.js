import express from "express";
import { getQuiz, storeQuiz, storeResults, getPreviousResults } from "../controllers/quiz.controller.js";


const router = express.Router();

router.get("/", getQuiz);
router.post("/quiz",storeQuiz);
router.post("/results", storeResults);
router.get("/results", getPreviousResults);

export default router

