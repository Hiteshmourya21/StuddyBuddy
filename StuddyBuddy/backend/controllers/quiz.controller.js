import quizModel from "../models/quiz.model.js";


// import { generateQuizFromAI } from "../lib/openai.js"; // Adjust path if needed

// import { GoogleGenerativeAI } from "@google/generative-ai";
import {CohereClient} from "cohere-ai";
import QuizResult from "../models/quizResult.model.js";
import { addQuizAttemptReward, addQuizScoreReward } from "./rewar.controller.js";
import axios from "axios";
// Initialize Gemini API with your API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // set this in .env file

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

// const getQuiz = async (req, res) => {
//   const { subject, difficulty } = req.body;

//   const prompt = `Generate 5 multiple-choice questions on "${subject}" at "${difficulty}" difficulty. 
// Return the result in JSON format as an array of objects with the following fields:
// - question
// - options (array of 4)
// - correctAnswer (value should match one of the options)
// Example:
// [
//   {
//     "question": "What is the capital of France?",
//     "options": ["Paris", "London", "Berlin", "Madrid"],
//     "correctAnswer": "Paris"
//   }
// ]`;

//   try {
//     const response = await cohere.generate({
//       model: "command",
//       prompt,
//       maxTokens: 600,
//       temperature: 0.7,
//     });

//     const rawText = response.generations[0].text.trim();

//     let quizData;
//     try {
//       quizData = JSON.parse(rawText);
//     } catch (err) {
//       return res.status(500).json({
//         message: "Error parsing AI response",
//         rawText,
//       });
//     }

//     res.status(200).json({ quiz: quizData });
//   } catch (err) {
//     console.error("Cohere API Error:", err);
//     res.status(500).json({ message: "Server error while generating quiz", error: err.message });
//   }
// };



// const getQuiz = async (req, res) => {
//   try {
//     const { subject, difficulty } = req.query;
//     if (!subject || !difficulty) {
//       return res.status(400).json({ message: "Subject and Difficulty required" });
//     }

//     // ✅ Generate with OpenAI
//     const questions = await generateQuizFromAI(subject, difficulty);

//     if (!questions.length) {
//       return res.status(500).json({ message: "Failed to generate questions" });
//     }

//     // ✅ Save to DB
//     const newQuiz = new quizModel({
//       title: `${subject} ${difficulty} Quiz`,
//       subject,
//       difficulty,
//       questions,
//     });

//     await newQuiz.save();

//     res.status(201).json(questions);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// import { GoogleGenerativeAI } from'@google/generative-ai';

// // Initialize Gemini with API Key

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const getQuiz = async (req, res) => {
//   const { subject, difficulty } = req.body;

//   const prompt = `Generate 5 multiple-choice questions on "${subject}" at "${difficulty}" difficulty.
// Return the result in strict JSON format as an array of objects with the following fields:
// - question
// - options (array of 4)
// - correctAnswer (value must match one of the options)

// Example:
// [
//   {
//     "question": "What is the capital of France?",
//     "options": ["Paris", "London", "Berlin", "Madrid"],
//     "correctAnswer": "Paris"
//   }
// ]`;

//   try {
//     const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

//     const result = await model.generateContent(prompt);
//     const text = result.response.text().trim();

//     let quizData;
//     try {
//       quizData = JSON.parse(text);
//     } catch (err) {
//       return res.status(500).json({
//         message: "Error parsing Gemini response",
//         rawText: text,
//       });
//     }

//     res.status(200).json({ quiz: quizData });
//   } catch (err) {
//     console.error("Gemini API Error:", err);
//     res.status(500).json({ message: "Server error while generating quiz", error: err.message });
//   }
// };




const getQuiz = async (req, res) => {
  const { subject, difficulty } = req.query;

  // Validate input
  if (!subject || !difficulty) {
    return res.status(400).json({ message: "Subject and difficulty are required." });
  }

  const difficultyLevel = difficulty.toLowerCase();

  const subjectCategoryMap = {
    "General Knowledge": 9,
    "Entertainment: Books": 10,
    "Entertainment: Film": 11,
    "Entertainment: Music": 12,
    "Entertainment: Musicals & Theatres": 13,
    "Entertainment: Television": 14,
    "Entertainment: Video Games": 15,
    "Entertainment: Board Games": 16,
    "Science & Nature": 17,
    "Science: Computers": 18,
    "Science: Mathematics": 19,
    "Mythology": 20,
    "Sports": 21,
    "Geography": 22,
    "History": 23,
    "Politics": 24,
    "Art": 25,
    "Celebrities": 26,
    "Animals": 27,
    "Vehicles": 28,
    "Entertainment: Comics": 29,
    "Science: Gadgets": 30,
    "Entertainment: Japanese Anime & Manga": 31,
    "Entertainment: Cartoon & Animations": 32,
  };

  const categoryId = subjectCategoryMap[subject];

  try {
    if (categoryId) {
      // If valid subject, fetch from OpenTDB
      const response = await axios.get("https://opentdb.com/api.php", {
        params: {
          amount: 5,
          category: categoryId,
          difficulty: difficultyLevel,
          type: "multiple",
        },
      });

      const questions = response.data.results.map((q) => ({
        question: q.question,
        options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        correctAnswer: q.correct_answer,
      }));

      return res.status(200).json({ quiz: questions });
    } else {
      // Fallback to Cohere if subject is not found
      const prompt = `Generate 5 multiple-choice questions on "${subject}" at "${difficulty}" difficulty. 
      Return the result in JSON format as an array of objects with the following fields:
      - question
      - options (array of 4)
      - correctAnswer (value should match one of the options)
      Example:
      [
        {
          "question": "What is the capital of France?",
          "options": ["Paris", "London", "Berlin", "Madrid"],
          "correctAnswer": "Paris"
        }
      ]`;

      const response = await cohere.generate({
        model: "command",
        prompt,
        max_tokens: 600,
        temperature: 0.7,
      });

      const rawText = response.generations[0].text.trim();

      let quizData;
      try {
        quizData = JSON.parse(rawText);
      } catch (err) {
        return res.status(500).json({
          message: "Error parsing AI response",
          rawText,
        });
      }

      return res.status(200).json({ quiz: quizData });
    }
  } catch (error) {
    console.error("Quiz fetch error:", error);
    return res.status(500).json({
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};


const storeQuiz =  async (req, res) => {
    try {
      const { title,subject, difficulty, questions } = req.body;
      const userId = req.user._id;
      if (!title || !subject || !difficulty || !questions || !questions.length) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const newQuiz = new quizModel({ title,   subject, difficulty, questions ,user:userId});
      await newQuiz.save();
      res.status(201).json(newQuiz);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  }

  const storeResults = async (req, res) => {
    try {
      const { subject, difficulty, score, type, quizId } = req.body;
      const userId = req.user._id;
  
      // Basic validation
      if (!subject || !difficulty || score === undefined || !type) {
        return res.status(400).json({ message: "Subject, difficulty, score, and type are required" });
      }
  
      // Fetch or create QuizResult for the user
      let quizResult = await QuizResult.findOne({ user: userId });
  
      let newAttempt = {
        subject,
        difficulty,
        score,
        quizType:type,
      };
  
      // If quiz is manual type, validate quizId and fetch quiz
      if (type === "manual") {
        if (!quizId) {
          return res.status(400).json({ message: "quizId is required for manual quizzes" });
        }
  
        const quiz = await quizModel.findById(quizId);
        if (!quiz) {
          return res.status(404).json({ message: "Quiz not found" });
        }
  
        newAttempt.quiz = quiz._id;
        await addQuizAttemptReward(quiz.user, quiz._id);
      }
  
      if (!quizResult) {
        quizResult = new QuizResult({
          user: userId,
          quizAttempts: [newAttempt],
        });
      } else {
        quizResult.quizAttempts.push(newAttempt);
      }
      await addQuizScoreReward(userId, quizResult._id, score);
      await quizResult.save();
      res.status(201).json(quizResult);
    } catch (error) {
      console.error("Error saving quiz result:", error);
      res.status(500).json({ error: "Failed to save quiz result" });
    }
  };
  

export const getPreviousAiResults = async (req, res) => {
    try {
      const userId = req.user._id;
      const results = await QuizResult.findOne({user:userId});
      results.quizAttempts = results.quizAttempts.filter(attempt => attempt.quizType === "ai");
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz results" });
    }
  }



export const getUserQuizes = async (req, res) => {
    try {
      const quizes = await quizModel.find().select("-questions");
      res.json(quizes);
    } catch (error) {
      console.error("Error in getUserQuizes controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


export const getQuizById = async (req, res) => {
    try {
      const { quizId } = req.params;
      const userId = req.user._id;
      const attempted = await QuizResult.findOne({ user: userId});
      if (attempted?.quizAttempts.some((attempt) => attempt.quiz.toString() === quizId)) {
        return res.status(400).json({ message: "You have already attempted this quiz" });
      }

      const quiz = await quizModel.findById(quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      console.error("Error in getQuizById controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getUserCreatedQuizes = async (req, res) => {
    try {
      const userId = req.user._id;
      const quizes = await quizModel.find({ user: userId });
      res.json(quizes);
    } catch (error) {
      console.error("Error in getUserCreatedQuizes controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  export const getUserAttempts = async (req, res) => {
    try {
      const userId = req.user._id;
      const attempts = await QuizResult.findOne({ user: userId });
      res.json(attempts);
    } catch (error) {
      console.error("Error in getUserAttempts controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };


export const deleteQuiz =   async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;
      await quizModel.findByIdAndDelete(id);
      const attempts = await QuizResult.findOne({ user: userId });
      attempts.quizAttempts = attempts.quizAttempts.filter(attempt => attempt.quiz.toString() !== id);
      await attempts.save();
      res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
      console.error("Error in deleteQuiz controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  export {
      getQuiz,
      storeQuiz,
      storeResults,
  }