"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const StudyPlanProgress = ({ studyPlan }) => {
  const [viewType, setViewType] = useState("progress") // progress or chart

  // Calculate completion percentage
  const calculateProgress = (modules) => {
    if (!modules || modules.length === 0) return 0
    const completedCount = modules.filter((mod) => mod.isCompleted).length
    return Math.round((completedCount / modules.length) * 100)
  }

  const progress = calculateProgress(studyPlan?.modules)

  // Prepare data for chart
  const prepareChartData = () => {
    if (!studyPlan?.modules) return []

    // Group modules by completion status
    const completed = studyPlan.modules.filter((m) => m.isCompleted).length
    const remaining = studyPlan.modules.length - completed

    return [
      { name: "Completed", value: completed },
      { name: "Remaining", value: remaining },
    ]
  }

  const chartData = prepareChartData()

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Study Progress</h3>
        <div className="flex">
          <button
            className={`px-3 py-1 text-sm rounded-l-md ${
              viewType === "progress" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setViewType("progress")}
          >
            Progress
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-r-md ${
              viewType === "chart" ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setViewType("chart")}
          >
            Chart
          </button>
        </div>
      </div>

      {viewType === "progress" ? (
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Overall Completion</span>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              {studyPlan?.modules?.filter((m) => m.isCompleted).length} of {studyPlan?.modules?.length} modules
              completed
            </span>
          </div>
        </div>
      ) : (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default StudyPlanProgress
