import React, { useState, useEffect } from "react";
import axios from "axios";

const QuizData = () => {
  const [quizResults, setQuizResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");

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

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const startQuiz = () => {
    if (!subject || !difficulty) {
      alert("Please select a subject and difficulty before starting the quiz.");
      return;
    }
    console.log("Starting quiz with:", subject, difficulty);
  };

  return (
    <div style={quizStyles.container}>
      <h1 style={quizStyles.heading}>📝 Take a Quiz</h1>
      <div style={quizStyles.selectionBox}>
        <label>
          <strong>Choose Subject:</strong>
          <select style={quizStyles.select} value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </label>

        <label>
          <strong>Choose Difficulty:</strong>
          <select style={quizStyles.select} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        
        <button onClick={startQuiz} style={quizStyles.startQuizBtn}>Start Quiz</button>
      </div>

      {loading ? (
        <div style={quizStyles.loading}>Loading quiz results...</div>
      ) : (
        <div style={quizStyles.resultsBox}>
          <h2 style={quizStyles.subHeading}>📊 Previous Quiz Results</h2>
          <ul style={quizStyles.list}>
            {quizResults.slice(0, 5).map((result, index) => (
              <li key={index} style={quizStyles.listItem}>
                <strong>Subject:</strong> {result.exam} | <strong>Difficulty:</strong> {result.difficulty} | <strong>Score:</strong> {result.score}
              </li>
            ))}
          </ul>

          {quizResults.length > 5 && !showMore && (
            <button onClick={toggleShowMore} style={quizStyles.showMoreBtn}>⬇ Show More</button>
          )}

          {showMore && (
            <ul style={quizStyles.list}>
              {quizResults.map((result, index) => (
                <li key={index} style={quizStyles.listItem}>
                  <strong>Subject:</strong> {result.exam} | <strong>Difficulty:</strong> {result.difficulty} | <strong>Score:</strong> {result.score}
                </li>
              ))}
            </ul>
          )}
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
  resultsBox: {
    width: "50%",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    marginTop: "20px",
  },
  heading: {
    color: "#e67e22",
    fontSize: "26px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  subHeading: {
    color: "#e67e22",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    background: "#ffecd1",
    padding: "10px",
    margin: "5px 0",
    borderRadius: "5px",
  },
  showMoreBtn: {
    backgroundColor: "#f39c12",
    color: "white",
    fontSize: "16px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  loading: {
    fontSize: "18px",
    color: "#e67e22",
  },
};

export default QuizData;
