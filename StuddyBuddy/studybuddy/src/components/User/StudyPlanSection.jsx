"use client"

// components/User/StudyPlanSection.jsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { axiosInstance } from "../../lib/axios"
import { useState } from "react"
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Loader2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  GraduationCap,
} from "lucide-react"
import StudyPlanCard from "./StudyPlanCard"
import StudyPlanProgress from "./StudyPlanProgress"

const StudyPlanSection = ({ userId, isOwnProfile }) => {
  const queryClient = useQueryClient()
  const [inputs, setInputs] = useState({ subject: "", duration: "" })
  const [loading, setLoading] = useState(false)
  const [expandedPlans, setExpandedPlans] = useState({})
  const [expandedModules, setExpandedModules] = useState({})

  const { data: studyPlans = [], isLoading: plansLoading } = useQuery({
    queryKey: ["studyPlan", userId],
    queryFn: () => axiosInstance.get(`/study/${userId}`).then((res) => res.data),
  })

  const generatePlan = async () => {
    if (!inputs.subject || !inputs.duration) {
      toast.error("Please enter both subject and duration")
      return
    }

    try {
      setLoading(true)
      await axiosInstance.post("/study/generate", { ...inputs, userId })
      toast.success("Study plan generated!")
      queryClient.invalidateQueries(["studyPlan", userId])
      setInputs({ subject: "", duration: "" }) // Reset inputs after successful generation
    } catch (err) {
      toast.error("Failed to generate plan")
    } finally {
      setLoading(false)
    }
  }

  const toggleModule = useMutation({
    mutationFn: (moduleId) => axiosInstance.put(`/study/module/${moduleId}/toggle`),
    onSuccess: () => {
      queryClient.invalidateQueries(["studyPlan", userId])
      toast.success("Module status updated")
    },
  })

  const togglePlanExpand = (planId) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }))
  }

  const toggleModuleExpand = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  // Calculate completion percentage for a plan
  const calculateProgress = (modules) => {
    if (!modules || modules.length === 0) return 0
    const completedCount = modules.filter((mod) => mod.isCompleted).length
    return Math.round((completedCount / modules.length) * 100)
  }

  return (
    <div className="my-8 bg-white rounded-2xl shadow-md overflow-hidden border border-orange-100">
      {/* Header */}
      <div className="bg-orange-500 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <BookOpen className="h-5 w-5 mr-2" /> Study Plans
        </h2>
        {studyPlans && studyPlans.length > 0 && (
          <div className="bg-white text-orange-500 text-xs font-bold px-2 py-1 rounded-full">
            {studyPlans.length} PLANS
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Generate Plan Form */}
        {isOwnProfile && (
          <div className="mb-6">
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100 mb-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
                <Sparkles className="h-5 w-5 text-orange-500 mr-2" /> Generate AI Study Plan
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Create a personalized study plan for any subject with our AI assistant. Just specify the subject and
                duration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      placeholder="Subject (e.g., Physics, Math)"
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      value={inputs.subject}
                      onChange={(e) => setInputs({ ...inputs, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      placeholder="Duration (e.g., 2 months, 6 weeks)"
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                      value={inputs.duration}
                      onChange={(e) => setInputs({ ...inputs, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-span-1">
                  <button
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center justify-center"
                    onClick={generatePlan}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" /> Generate Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {plansLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        )}

        {/* No Plans State */}
        {!plansLoading && (!studyPlans || studyPlans.length === 0) && (
          <div className="text-center py-16">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No study plans available</h3>
            {isOwnProfile ? (
              <p className="text-gray-500 mb-4">Generate your first study plan to get started</p>
            ) : (
              <p className="text-gray-500 mb-4">This user hasn't created any study plans yet</p>
            )}
          </div>
        )}

        {/* Study Plans Display */}
        {!plansLoading && studyPlans && studyPlans.length > 0 && (
          <div className="space-y-6">
            {studyPlans.map((plan) => {
              const progress = calculateProgress(plan.modules)
              const isExpanded = expandedPlans[plan._id] || false

              return (
                <div key={plan._id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {/* Plan Header - Clickable to expand/collapse */}
                  <div
                    className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => togglePlanExpand(plan._id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <GraduationCap className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            {plan.subject}{" "}
                            <span className="text-sm font-normal text-gray-500 ml-2">({plan.duration})</span>
                          </h3>
                          <p className="text-xs text-gray-500">
                            Created on {new Date(plan.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center mt-3 md:mt-0">
                        <div className="mr-4">
                          <div className="flex items-center mb-1">
                            <div className="bg-gray-200 rounded-full h-2 w-24 md:w-32">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                            </div>
                            <span className="text-xs font-medium text-gray-600 ml-2">{progress}%</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            {plan.modules.filter((mod) => mod.isCompleted).length} of {plan.modules.length} completed
                          </p>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Plan Modules - Shown when expanded */}
                  {isExpanded && (
                    <div className="p-4 border-t border-gray-200">
                      <StudyPlanProgress studyPlan={plan} />
                      <div className="space-y-3">
                     
                        {plan.modules.map((mod, idx) => (
                        <StudyPlanCard
                            key={mod._id}
                            module={mod}
                            index={idx}
                            isOwnProfile={isOwnProfile}
                            onToggleComplete={() => toggleModule.mutate(mod._id)}
                            isCompleted={mod.isCompleted}
                        />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && studyPlans.length === 0 && (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
            <div className="border rounded-lg p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StudyPlanSection
