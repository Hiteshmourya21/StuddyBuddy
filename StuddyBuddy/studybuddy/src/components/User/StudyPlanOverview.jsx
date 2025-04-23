"use client"
import { GraduationCap, BookOpen, CheckCircle } from "lucide-react"

const StudyPlanOverview = ({ studyPlans }) => {
  // Calculate total modules and completed modules across all plans
  const totalModules = studyPlans.reduce((total, plan) => total + plan.modules.length, 0)
  const completedModules = studyPlans.reduce(
    (total, plan) => total + plan.modules.filter((m) => m.isCompleted).length,
    0,
  )
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0

  // Get subject distribution
  const subjectDistribution = studyPlans.reduce((acc, plan) => {
    if (!acc[plan.subject]) {
      acc[plan.subject] = {
        total: plan.modules.length,
        completed: plan.modules.filter((m) => m.isCompleted).length,
      }
    } else {
      acc[plan.subject].total += plan.modules.length
      acc[plan.subject].completed += plan.modules.filter((m) => m.isCompleted).length
    }
    return acc
  }, {})

  return (
    <div className="bg-white rounded-lg shadow-sm border border-orange-100 p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
        <BookOpen className="h-5 w-5 text-orange-500 mr-2" /> Study Plans Overview
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-full p-2 mr-3">
              <BookOpen className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Plans</p>
              <p className="text-xl font-bold text-gray-800">{studyPlans.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-full p-2 mr-3">
              <GraduationCap className="h-5 w-5 text-orange-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Modules</p>
              <p className="text-xl font-bold text-gray-800">{totalModules}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
          <div className="flex items-center">
            <div className="bg-green-100 rounded-full p-2 mr-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Completed Modules</p>
              <p className="text-xl font-bold text-gray-800">
                {completedModules} <span className="text-sm text-gray-500">({overallProgress}%)</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Progress by Subject</h4>
        <div className="space-y-3">
          {Object.entries(subjectDistribution).map(([subject, data]) => {
            const subjectProgress = data.total > 0 ? Math.round((data.completed / data.total) * 100) : 0
            return (
              <div key={subject}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-700">{subject}</span>
                  <span className="text-xs text-gray-500">
                    {data.completed}/{data.total} modules
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${subjectProgress}%` }}></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default StudyPlanOverview
