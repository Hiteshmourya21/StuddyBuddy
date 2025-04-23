import StudyPlan from "../models/studyPlan.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateStudyPlan = async (req, res) => {
  const { subject, duration } = req.body;
  const userId = req.user._id;
  const studyField = req.user.studyField || "General";

  const prompt = `Create a detailed study plan for ${studyField} preparation in ${subject} over ${duration}. 
Divide the plan into modules. 
Each module should include:
- a title
- a description of what is covered in that module
- a suggested time (in days or weeks) to complete the module, based on the total duration

Return it as a strict JSON array of objects in this format:
[
  {
    "title": "Module 1: Example",
    "description": "Brief description of this module.",
    "duration": "3 days"
  }
]`;

  try {
    const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Remove code block markers like ```json and ```
    if (text.startsWith("```") && text.includes("[") && text.includes("]")) {
      text = text.replace(/^```json\s*|```$/g, "").trim();
    }

    let modules;
    try {
      modules = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({
        message: "Error parsing Gemini response",
        rawText: text,
      });
    }

    const newPlan = new StudyPlan({
      user: userId,
      subject,
      studyField,
      duration,
      modules,
    });

    await newPlan.save();

    res.status(201).json(newPlan);
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ message: "Server error while generating study plan", error: err.message });
  }
};

export const getStudyPlan = async (req, res) => {
  const userId = req.user._id;
  const plans = await StudyPlan.find({ user: userId });
  res.json(plans);
};

export const toggleModuleStatus = async (req, res) => {
  const { moduleId } = req.params;
  const plan = await StudyPlan.findOne({ "modules._id": moduleId });

  if (!plan) return res.status(404).json({ message: "Module not found" });

  const module = plan.modules.id(moduleId);
  module.isCompleted = !module.isCompleted;
  await plan.save();

  res.json(module);
};
