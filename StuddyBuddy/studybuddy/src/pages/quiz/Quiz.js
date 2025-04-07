import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StartQuiz from './StartQuiz';
import QuizGen from './QuizGen';

const QuizListPage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/api/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Failed to fetch quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter(q => {
    return (
      (!subjectFilter || q.subject === subjectFilter) &&
      (!difficultyFilter || q.difficulty === difficultyFilter)
    );
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            <option value="">All Subjects</option>
            <option value="Math">Math</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
          </select>

          <select
            className="border border-gray-300 rounded px-3 py-2"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button
            onClick={() => navigate('/genquiz')}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Create a Quiz
          </button>

          <button
            onClick={() => navigate('/generate-quiz')}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Generate by AI
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuizzes.map((quiz) => (
                <tr key={quiz._id} className="border-t">
                  <td className="px-4 py-2">
                    {quiz.done ? (
                      <span className="text-green-500">✔</span>
                    ) : (
                      <span className="text-gray-400">◻</span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">
                    {quiz.title}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                        quiz.difficulty === 'Easy'
                          ? 'bg-green-400'
                          : quiz.difficulty === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredQuizzes.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center px-4 py-6 text-gray-500">
                    No quizzes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Quiz = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<QuizListPage />} />
        <Route path="/genquiz" element={<QuizGen />} />
        <Route path="/startquiz" element={<StartQuiz />} />
        <Route path="/generate-quiz" element={<QuizGen />} />
      </Routes>
    </div>
  );
};

export default Quiz;
