
import { useLocation } from 'react-router-dom';

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from '../../lib/axios';

const StartQuiz = () => {
    const location = useLocation();
    const subject = location.state?.subject;
    const difficulty = location.state?.difficulty;
    const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (subject && difficulty) {
      axiosInstance
        .get(`/quiz?subject=${subject}&difficulty=${difficulty}`)
        .then((response) => {
          setQuestions(response.data);
          setQuizStarted(true);
        })
        .catch((error) => console.error("Error fetching questions:", error));
    }
  }, [subject, difficulty]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [quizStarted, timeLeft]);

  const handleAnswer = (option) => {
    if (option === questions[currentQuestionIndex]?.correctAnswer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60);
    } else {
      axiosInstance.post("/quiz/results", { subject, difficulty, score })
        .then(() => navigate("/"))
        .catch((error) => console.error("Error saving result:", error));
    }
  };

  return (
    <div>
      {quizStarted ? (
        <div>
          <h2>{questions[currentQuestionIndex]?.question}</h2>
          <p>Time left: {timeLeft}s</p>
          <ul>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <li key={index} onClick={() => handleAnswer(option)}>{option}</li>
            ))}
          </ul>
        </div>
      ) : (
        <h1>Loading quiz...</h1>
      )}
    </div>
  );
};

export default StartQuiz;