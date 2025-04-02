import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizData = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    let isMounted = true;
    axios
      .get("http://localhost:5000/api/results")
      .then((response) => {
        if (isMounted) {
          setQuizResults(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz results:", error);
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      nextQuestion();
    }
  }, [quizStarted, timeLeft]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const startQuiz = () => {
    if (!subject || !difficulty) {
      alert("Please select a subject and difficulty before starting the quiz.");
      return;
    }
    axios
      .get(`http://localhost:5000/api/questions?subject=${subject}&difficulty=${difficulty}&limit=10`)
      .then((response) => {
        setQuestions(response.data);
        setCurrentQuestionIndex(0);
        setTimeLeft(60);
        setQuizStarted(true);
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(60);
    } else {
      alert("Quiz completed!");
      setQuizStarted(false);
    }
  };

  return (
    <div style={quizStyles.container}>
      {!quizStarted ? (
        <>
          <h1 style={quizStyles.heading}>📝 Take a Quiz</h1>
          <div style={quizStyles.selectionBox}>
            <label>
              <strong>Choose Subject:</strong>
              <select
                style={quizStyles.select}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
            </label>

            <label>
              <strong>Choose Difficulty:</strong>
              <select
                style={quizStyles.select}
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
            
            <button onClick={startQuiz} style={quizStyles.startQuizBtn}>Start Quiz</button>
          </div>
        </>
      ) : (
        <div style={quizStyles.quizBox}>
          <h2>{questions[currentQuestionIndex]?.question}</h2>
          <p>⏳ Time left: {timeLeft} seconds</p>
          <ul>
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <li key={index} onClick={nextQuestion} style={quizStyles.option}>{option}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const quizStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "#fff3e0",
    padding: "20px",
  },
  selectionBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "20px",
  },
  select: {
    padding: "8px",
    marginLeft: "10px",
    borderRadius: "5px",
  },
  startQuizBtn: {
    backgroundColor: "#2ecc71",
    color: "white",
    fontSize: "16px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  quizBox: {
    textAlign: "center",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    width: "50%",
  },
  option: {
    background: "#ffecd1",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default QuizData;
