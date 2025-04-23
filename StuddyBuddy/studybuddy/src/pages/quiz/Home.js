"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { axiosInstance } from "../../lib/axios"
import { useQuery } from "@tanstack/react-query"
import {
  BookOpen,
  Filter,
  Plus,
  Sparkles,
  CheckCircle,
  Clock,
  ChevronRight,
  Search,
  Award,
  BarChart2,
} from "lucide-react"

const Home = () => {
  const navigate = useNavigate()

  const [subjectFilter, setSubjectFilter] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const { data: quizzes = [], isLoading: quizzesLoading } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => axiosInstance.get("/quiz/user").then((res) => res.data),
  })

  const { data: attempt = {}, isLoading: attemptLoading } = useQuery({
    queryKey: ["attempt"],
    queryFn: () => axiosInstance.get("/quiz/user/attempts").then((res) => res.data),
  })

  // Filter quizzes based on subject, difficulty, and search query
  const filteredQuizzes = quizzes.filter((q) => {
    const matchesSubject = !subjectFilter || q.subject === subjectFilter
    const matchesDifficulty = !difficultyFilter || q.difficulty === difficultyFilter
    const matchesSearch = !searchQuery || q.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSubject && matchesDifficulty && matchesSearch
  })

  const allSubjects = quizzes
    .map((quiz) => quiz.subject)
    .filter((subject, index, subjects) => subjects.indexOf(subject) === index)

  // Calculate stats
  const totalQuizzes = quizzes.length
  const completedQuizzes = attempt?.quizAttempts?.filter((attempt) => attempt.quizType === "manual").length || 0
  const completionRate = totalQuizzes > 0 ? Math.round((completedQuizzes / totalQuizzes) * 100) : 0

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500 text-white"
      case "Medium":
        return "bg-orange-500 text-white"
      case "Hard":
        return "bg-red-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-orange-500 mb-2 flex items-center justify-center">
            <BookOpen className="h-8 w-8 mr-2" /> Quiz Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse, filter, and take quizzes to test your knowledge and track your progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-3 mr-4">
                <BookOpen className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Quizzes</p>
                <h3 className="text-2xl font-bold text-gray-800">{totalQuizzes}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3 mr-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <h3 className="text-2xl font-bold text-gray-800">{completedQuizzes}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-orange-100">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <BarChart2 className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Completion Rate</p>
                <h3 className="text-2xl font-bold text-gray-800">{completionRate}%</h3>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${completionRate}%` }}></div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-orange-100">
          {/* Card Header */}
          <div className="bg-orange-500 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BookOpen className="h-5 w-5 mr-2" /> Available Quizzes
            </h2>
          </div>

          {/* Filters and Actions */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  />
                </div>

                {/* Subject Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white"
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                  >
                    <option value="">All Subjects</option>
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 text-orange-500" />
                  </div>
                </div>

                {/* Difficulty Filter */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Award className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option value="">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronRight className="h-4 w-4 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/quiz/createquiz")}
                  className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <Plus className="h-5 w-5 mr-1" /> Create
                </button>

                <button
                  onClick={() => navigate("/quiz/genquiz")}
                  className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                  <Sparkles className="h-5 w-5 mr-1" /> AI Generate
                </button>
              </div>
            </div>
          </div>

          {/* Quiz List */}
          {quizzesLoading || attemptLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {filteredQuizzes.length > 0 ? (
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3">Title</th>
                      <th className="px-6 py-3">Subject</th>
                      <th className="px-6 py-3">Difficulty</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredQuizzes.map((quiz) => {
                      const isCompleted = attempt?.quizAttempts?.some((a) => a.quiz.toString() === quiz._id)
                      return (
                        <tr
                          key={quiz._id}
                          className={`hover:bg-gray-50 transition-colors ${isCompleted ? "bg-green-50" : ""}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            {isCompleted ? (
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                                <span className="text-sm text-green-600">Completed</span>
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-orange-400 mr-1" />
                                <span className="text-sm text-orange-500">Pending</span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{quiz.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyColor(
                                quiz.difficulty,
                              )}`}
                            >
                              {quiz.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {isCompleted ? (
                              <button
                                onClick={() => navigate(`/quiz/result/${quiz._id}`)}
                                className="text-indigo-600 hover:text-indigo-900 font-medium"
                              >
                                View Results
                              </button>
                            ) : (
                              <Link
                                to={`/quiz/${quiz._id}`}
                                className="text-orange-500 hover:text-orange-700 font-medium"
                              >
                                Take Quiz
                              </Link>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-20">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No quizzes found</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    {subjectFilter || difficultyFilter || searchQuery
                      ? "Try adjusting your filters to see more quizzes."
                      : "Create your first quiz or generate one with AI to get started."}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => navigate("/quiz/createquiz")}
                      className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                    >
                      <Plus className="h-5 w-5 mr-1" /> Create Quiz
                    </button>
                    <button
                      onClick={() => navigate("/quiz/genquiz")}
                      className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                    >
                      <Sparkles className="h-5 w-5 mr-1" /> AI Generate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
