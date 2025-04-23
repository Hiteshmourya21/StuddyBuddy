// models/StudyPlan.js
import mongoose from "mongoose"

const moduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  isCompleted: { type: Boolean, default: false },
})

const studyPlanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  studyField: String,
  duration: String,
  modules: [moduleSchema],
}, { timestamps: true })

export default mongoose.model("StudyPlan", studyPlanSchema)
