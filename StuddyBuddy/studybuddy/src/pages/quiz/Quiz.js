import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import StartQuiz from './StartQuiz'
import QuizGen from './QuizGen'

const Quiz = () => {
  return (
    <div className="min-h-screen ">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genquiz" element={<QuizGen />} />
        <Route path="/startquiz" element={<StartQuiz />} />
      </Routes>
    </div>
  )
}

export default Quiz