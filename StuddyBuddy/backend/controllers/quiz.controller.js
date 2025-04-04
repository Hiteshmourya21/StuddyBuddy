import quizModel from "../models/quiz.model.js";



const getQuiz = async (req, res) => {
    try {
      const { subject, difficulty } = req.query;
      if (!subject || !difficulty) {
        return res.status(400).json({ message: "Subject and Difficulty required" });
      }
  
      const quiz = await quizModel.findOne({ subject, difficulty });
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
  
      res.json(quiz.questions);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

const storeQuiz =  async (req, res) => {
    try {
      const { subject, difficulty, questions } = req.body;
      if (!subject || !difficulty || !questions || !questions.length) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newQuiz = new quizModel({ subject, difficulty, questions });
      await newQuiz.save();
      res.status(201).json({ message: "Quiz created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

const storeResults = async (req, res) => {
    try {
      const { subject, difficulty, score } = req.body;
      await QuizResult.create({ subject, difficulty, score });
  
      const results = await QuizResult.find().sort({ createdAt: -1 }).limit(5);
      res.status(201).json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to save quiz result" });
    }
  }

const getPreviousResults = async (req, res) => {
    try {
      const results = await QuizResult.find().sort({ createdAt: -1 }).limit(5);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  }



export {
    getQuiz,
    storeQuiz,
    storeResults,
    getPreviousResults
}