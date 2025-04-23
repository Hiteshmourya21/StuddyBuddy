"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../../lib/axios"
import { BookOpen, Award, Clock, BarChart2, Brain, ChevronRight } from "lucide-react"

const QuizGen = () => {
  const [subject, setSubject] = useState("")
  const [customSubject, setCustomSubject] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [quizResults, setQuizResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

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
    Mythology: 20,
    Sports: 21,
    Geography: 22,
    History: 23,
    Politics: 24,
    Art: 25,
    Celebrities: 26,
    Animals: 27,
    Vehicles: 28,
    "Entertainment: Comics": 29,
    "Science: Gadgets": 30,
    "Entertainment: Japanese Anime & Manga": 31,
    "Entertainment: Cartoon & Animations": 32,
    Other: null,
  }

  useEffect(() => {
    setIsLoading(true)
    axiosInstance
      .get("/quiz/result/ai/previous")
      .then((response) => {
        setQuizResults(response.data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching quiz results:", error)
        setIsLoading(false)
      })
  }, [])

  const handleStartQuiz = () => {
    const selectedSubject = subject === "Other" ? customSubject : subject
    if (!selectedSubject || !difficulty) {
      alert("Please select both Subject and Difficulty!")
      return
    }
    navigate("/quiz/startquiz", { state: { subject: selectedSubject, difficulty } })
  }

  // Get difficulty color
  const getDifficultyColor = (diff) => {
    switch (diff) {
      case "Easy":
        return "text-green-500 bg-green-50"
      case "Medium":
        return "text-orange-500 bg-orange-50"
      case "Hard":
        return "text-red-500 bg-red-50"
      default:
        return "text-gray-500 bg-gray-50"
    }
  }

  // Get score color
  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600"
    if (score >= 5) return "text-orange-500"
    return "text-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500 mb-2 flex items-center justify-center">
            <BookOpen className="h-8 w-8 mr-2" /> Quiz Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Challenge yourself with quizzes on various subjects and difficulty levels to test your knowledge and learn
            new things.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden mb-8 border border-orange-100">
          {/* Card Header */}
          <div className="bg-orange-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Brain className="h-5 w-5 mr-2" /> Create Your Quiz
            </h2>
          </div>

          {/* Card Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-orange-500" /> Subject
                </label>
                <div className="relative">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition appearance-none bg-white"
                  >
                    <option value="">Select Subject</option>
                    {Object.keys(subjectCategoryMap).map((subj) => (
                      <option key={subj} value={subj}>
                        {subj}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
                {subject === "Other" && (
                  <input
                    type="text"
                    placeholder="Enter custom subject"
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    className="mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Award className="h-4 w-4 mr-1 text-orange-500" /> Difficulty
                </label>
                <div className="relative">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition appearance-none bg-white"
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleStartQuiz}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                >
                  <Brain className="h-5 w-5 mr-2" /> Start Quiz
                </button>
              </div>
            </div>

            {/* Difficulty Indicators */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-3 border border-green-100 flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <Award className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-green-700">Easy</h3>
                  <p className="text-xs text-green-600">Basic knowledge questions</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 flex items-center">
                <div className="bg-orange-100 rounded-full p-2 mr-3">
                  <Award className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium text-orange-700">Medium</h3>
                  <p className="text-xs text-orange-600">Intermediate difficulty</p>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-3 border border-red-100 flex items-center">
                <div className="bg-red-100 rounded-full p-2 mr-3">
                  <Award className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-red-700">Hard</h3>
                  <p className="text-xs text-red-600">Advanced knowledge required</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-orange-100">
          {/* Results Header */}
          <div className="bg-orange-500 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BarChart2 className="h-5 w-5 mr-2" /> Recent Quiz Results
            </h2>
            <span className="bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full">LAST 5</span>
          </div>

          {/* Results Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : quizResults?.quizAttempts?.length > 0 ? (
              <div className="space-y-4">
                {quizResults.quizAttempts.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-orange-100 rounded-full p-2 mr-3">
                          <BookOpen className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{result.subject}</h3>
                          <div className="flex items-center mt-1">
                            <span
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${getDifficultyColor(result.difficulty)}`}
                            >
                              {result.difficulty}
                            </span>
                            <span className="text-xs text-gray-500 ml-2 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(result.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className={`text-xl font-bold ${getScoreColor(result.score)}`}>{result.score}</div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No quiz results found</p>
                <p className="text-sm text-gray-400 mt-1">Take your first quiz to see results here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizGen
