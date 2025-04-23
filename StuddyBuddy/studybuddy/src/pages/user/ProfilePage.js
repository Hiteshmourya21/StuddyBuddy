// ProfilePage.js
"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import ProfileHeader from "../../components/User/ProfileHeader"
import AboutSection from "../../components/User/AboutSection"
import EducationSection from "../../components/User/EducationSection"
import ResourcesSection from "../../components/User/ResourcesSection"
import { axiosInstance } from "../../lib/axios.js"
import StudyPlanSection from "../../components/User/StudyPlanSection.jsx"
import StudyPlanOverview from "../../components/User/StudyPlanOverview.jsx" // Import the overview component

const ProfilePage = () => {
  const { username } = useParams()
  const queryClient = useQueryClient()

  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] })

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/users/${username}`),
  })

  // Add a query to fetch study plans for the overview component
  const { data: studyPlans = [], isLoading: plansLoading } = useQuery({
    queryKey: ["studyPlan", userProfile?.data?._id],
    queryFn: () => 
      userProfile?.data?._id 
        ? axiosInstance.get(`/study/${userProfile.data._id}`).then((res) => res.data)
        : Promise.resolve([]),
    enabled: !!userProfile?.data?._id, // Only run query when user ID is available
  })

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
      await axiosInstance.put("/users/profile", updatedData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile", username])
      toast.success("Profile updated successfully")
    },
  })

  if (isLoading || isUserProfileLoading) return null

  const isOwnProfile = authUser.username === userProfile.data.username
  const userData = isOwnProfile ? authUser : userProfile.data

  const handleSave = (updatedData) => {
    updateProfile(updatedData)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      <ResourcesSection userData={userData} isOwnProfile={isOwnProfile} />
      <AboutSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      <EducationSection userData={userData} isOwnProfile={isOwnProfile} onSave={handleSave} />
      
      {/* Add the StudyPlanOverview component if there are study plans */}
      {!plansLoading && studyPlans && studyPlans.length > 0 && (
        <StudyPlanOverview studyPlans={studyPlans} />
      )}
      
      {/* Your existing StudyPlanSection component */}
      <StudyPlanSection userId={userData._id} isOwnProfile={isOwnProfile} />
    </div>
  )
}

export default ProfilePage