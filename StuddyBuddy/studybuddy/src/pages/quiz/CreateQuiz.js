"use client"

import { useState } from "react"
import { axiosInstance } from "../../lib/axios"
import { useQuery } from "@tanstack/react-query"
import { BookOpen, Plus, Trash2, Save, HelpCircle, AlertCircle, Edit3, List, FileText } from "lucide-react"

const CreateQuiz = () => {
  const [quizzes, setQuizzes] = useState([])
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    subject: "",
    difficulty: "",
    questions: [],
  })
  const [activeTab, setActiveTab] = useState("create")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [formErrors, setFormErrors] = useState({})

  const { data: userQuiz, isLoading } = useQuery({
    queryKey: ["userQuiz"],
    queryFn: async () => {
      const response = await axiosInstance.get("/quiz/user")
      setQuizzes(response.data)
      return response.data
    },
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewQuiz({ ...newQuiz, [name]: value })
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" })
    }
  }

  const addQuestion = () => {
    const updatedQuestions = [...newQuiz.questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })
    setCurrentQuestionIndex(updatedQuestions.length - 1)
  }

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...newQuiz.questions]
    updatedQuestions[index][field] = value
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })

    // Clear error for this question
    if (formErrors[`question_${index}`]) {
      setFormErrors({ ...formErrors, [`question_${index}`]: "" })
    }
    if (field === "correctAnswer" && formErrors[`correctAnswer_${index}`]) {
      setFormErrors({ ...formErrors, [`correctAnswer_${index}`]: "" })
    }
  }

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...newQuiz.questions]
    updatedQuestions[qIndex].options[optIndex] = value
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })

    // Clear error for this option
    if (formErrors[`option_${qIndex}_${optIndex}`]) {
      setFormErrors({ ...formErrors, [`option_${qIndex}_${optIndex}`]: "" })
    }
  }

  const deleteQuestion = (index) => {
    const updatedQuestions = newQuiz.questions.filter((_, i) => i !== index)
    setNewQuiz({ ...newQuiz, questions: updatedQuestions })

    // Update current question index if needed
    if (currentQuestionIndex >= updatedQuestions.length && updatedQuestions.length > 0) {
      setCurrentQuestionIndex(updatedQuestions.length - 1)
    } else if (updatedQuestions.length === 0) {
      setCurrentQuestionIndex(0)
    }
  }

  const validateForm = () => {
    const errors = {}

    // Validate quiz details
    if (!newQuiz.title.trim()) errors.title = "Quiz title is required"
    if (!newQuiz.subject.trim()) errors.subject = "Subject is required"
    if (!newQuiz.difficulty) errors.difficulty = "Difficulty is required"

    // Validate questions
    if (newQuiz.questions.length === 0) {
      errors.questions = "At least one question is required"
    } else {
      newQuiz.questions.forEach((q, qIndex) => {
        if (!q.question.trim()) {
          errors[`question_${qIndex}`] = "Question text is required"
        }

        q.options.forEach((opt, optIndex) => {
          if (!opt.trim()) {
            errors[`option_${qIndex}_${optIndex}`] = `Option ${optIndex + 1} is required`
          }
        })

        if (!q.correctAnswer.trim()) {
          errors[`correctAnswer_${qIndex}`] = "Correct answer is required"
        } else if (!q.options.includes(q.correctAnswer)) {
          errors[`correctAnswer_${qIndex}`] = "Correct answer must match one of the options"
        }
      })
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const saveQuiz = async () => {
    if (!validateForm()) {
      setActiveTab("create")
      return
    }

    try {
      const response = await axiosInstance.post("/quiz", newQuiz)
      setQuizzes([...quizzes, response.data])
      setNewQuiz({ title: "", subject: "", difficulty: "", questions: [] })
      setCurrentQuestionIndex(0)
      setActiveTab("list")
    } catch (error) {
      console.error("Error saving quiz:", error)
    }
  }

  const deleteQuiz = async (id) => {
    try {
      await axiosInstance.delete(`/quiz/delete/${id}`)
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id))
    } catch (error) {
      console.error("Error deleting quiz:", error)
    }
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Hard":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500 mb-2 flex items-center justify-center">
            <Edit3 className="h-8 w-8 mr-2" /> Quiz Creator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create custom quizzes with multiple-choice questions to test knowledge on any subject.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === "create"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("create")}
          >
            <Edit3 className="h-4 w-4 mr-2" /> Create Quiz
          </button>
          <button
            className={`py-3 px-6 font-medium flex items-center ${
              activeTab === "list"
                ? "text-orange-500 border-b-2 border-orange-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("list")}
          >
            <List className="h-4 w-4 mr-2" /> My Quizzes
          </button>
        </div>

        {activeTab === "create" ? (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-orange-100">
            {/* Quiz Details Section */}
            <div className="bg-orange-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" /> Quiz Details
              </h2>
            </div>

            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter a descriptive title for your quiz"
                    className={`w-full px-4 py-2 border ${
                      formErrors.title ? "border-red-300 bg-red-50" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400`}
                    value={newQuiz.title}
                    onChange={handleInputChange}
                  />
                  {formErrors.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g., Mathematics, History, Science"
                    className={`w-full px-4 py-2 border ${
                      formErrors.subject ? "border-red-300 bg-red-50" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400`}
                    value={newQuiz.subject}
                    onChange={handleInputChange}
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                  <select
                    name="difficulty"
                    className={`w-full px-4 py-2 border ${
                      formErrors.difficulty ? "border-red-300 bg-red-50" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400`}
                    value={newQuiz.difficulty}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  {formErrors.difficulty && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.difficulty}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Questions Section */}
            <div className="bg-orange-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <HelpCircle className="h-5 w-5 mr-2" /> Questions
              </h2>
            </div>

            <div className="p-6">
              {formErrors.questions && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" /> {formErrors.questions}
                  </p>
                </div>
              )}

              {newQuiz.questions.length > 0 ? (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {newQuiz.questions.map((_, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          currentQuestionIndex === index
                            ? "bg-orange-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        Q{index + 1}
                      </button>
                    ))}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Question {currentQuestionIndex + 1}</h3>
                      <button
                        className="text-red-500 hover:text-red-700 flex items-center"
                        onClick={() => deleteQuestion(currentQuestionIndex)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                        <input
                          type="text"
                          placeholder="Enter your question"
                          className={`w-full px-4 py-2 border ${
                            formErrors[`question_${currentQuestionIndex}`]
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400`}
                          value={newQuiz.questions[currentQuestionIndex].question}
                          onChange={(e) => handleQuestionChange(currentQuestionIndex, "question", e.target.value)}
                        />
                        {formErrors[`question_${currentQuestionIndex}`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" /> {formErrors[`question_${currentQuestionIndex}`]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {newQuiz.questions[currentQuestionIndex].options.map((opt, i) => (
                            <div key={i}>
                              <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <input
                                  type="text"
                                  placeholder={`Option ${i + 1}`}
                                  className={`flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md ${
                                    formErrors[`option_${currentQuestionIndex}_${i}`]
                                      ? "border-red-300 bg-red-50"
                                      : "border-gray-300"
                                  } focus:outline-none focus:ring-orange-500 focus:border-orange-500`}
                                  value={opt}
                                  onChange={(e) => handleOptionChange(currentQuestionIndex, i, e.target.value)}
                                />
                              </div>
                              {formErrors[`option_${currentQuestionIndex}_${i}`] && (
                                <p className="mt-1 text-sm text-red-600 flex items-center">
                                  <AlertCircle className="h-4 w-4 mr-1" />{" "}
                                  {formErrors[`option_${currentQuestionIndex}_${i}`]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
                        <input
                          type="text"
                          placeholder="Enter the correct answer (must match one of the options)"
                          className={`w-full px-4 py-2 border ${
                            formErrors[`correctAnswer_${currentQuestionIndex}`]
                              ? "border-red-300 bg-red-50"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400`}
                          value={newQuiz.questions[currentQuestionIndex].correctAnswer}
                          onChange={(e) => handleQuestionChange(currentQuestionIndex, "correctAnswer", e.target.value)}
                        />
                        {formErrors[`correctAnswer_${currentQuestionIndex}`] && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />{" "}
                            {formErrors[`correctAnswer_${currentQuestionIndex}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300 mb-6">
                  <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No questions yet</h3>
                  <p className="text-gray-500 mb-4">Add your first question to get started</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                  onClick={addQuestion}
                >
                  <Plus className="h-5 w-5 mr-2" /> Add Question
                </button>

                <button
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                  onClick={saveQuiz}
                >
                  <Save className="h-5 w-5 mr-2" /> Save Quiz
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-orange-100">
            <div className="bg-orange-500 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <BookOpen className="h-5 w-5 mr-2" /> My Quizzes
              </h2>
            </div>

            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
              ) : quizzes.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {quizzes.map((quiz, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="font-semibold text-lg text-gray-800">{quiz.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{quiz.subject}</span>
                            <span className={`text-sm px-2 py-1 rounded ${getDifficultyColor(quiz.difficulty)}`}>
                              {quiz.difficulty}
                            </span>
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded flex items-center">
                              <HelpCircle className="h-3 w-3 mr-1" />
                              {quiz.questions?.length || 0} Questions
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors flex items-center"
                            onClick={() => deleteQuiz(quiz._id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No quizzes created yet</h3>
                  <p className="text-gray-500 mb-6">Create your first quiz to get started</p>
                  <button
                    onClick={() => setActiveTab("create")}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors inline-flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-2" /> Create Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateQuiz
  