"use client"

import { useState } from "react"
import { CheckCircle, Clock, ChevronDown, ChevronUp, CheckSquare, Square } from "lucide-react"

const StudyPlanCard = ({ module, index, isOwnProfile, onToggleComplete, isCompleted }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`border rounded-lg overflow-hidden transition-all ${
        isCompleted ? "border-green-200 bg-green-50" : "border-gray-200"
      }`}
    >
      <div
        className={`flex justify-between items-center p-4 cursor-pointer ${isCompleted ? "bg-green-50" : "bg-white"}`}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className={`flex-shrink-0 mr-3 ${isCompleted ? "text-green-500" : "text-orange-500"}`}>
            {isCompleted ? <CheckCircle className="h-6 w-6" /> : <Clock className="h-6 w-6" />}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              {index + 1}. {module.title}
            </h4>
          </div>
        </div>
        <div className="flex items-center">
          {isOwnProfile && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onToggleComplete(module._id)
              }}
              className={`mr-3 flex items-center text-sm font-medium px-3 py-1 rounded-full ${
                isCompleted
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckSquare className="h-4 w-4 mr-1" /> Completed
                </>
              ) : (
                <>
                  <Square className="h-4 w-4 mr-1" /> Mark Complete
                </>
              )}
            </button>
          )}
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="px-4 pb-4 pt-0">
          <div className="pl-9">
            <p className="text-gray-600 text-sm">{module.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyPlanCard
