// DashboardApp.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import TodoSection from './TodoSection';
const difficultyData = [
  { name: 'Easy', value: 4 },
  { name: 'Medium', value: 6 },
  { name: 'Hard', value: 2 },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];
const Dashboard = () => (
  <div className="p-6 grid grid-cols-2 gap-4">
    <div className="bg-white rounded-2xl shadow p-4 col-span-1 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-2">Activity Graph</h2>
      <PieChart width={250} height={250}>
        <Pie
          data={difficultyData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={50}
          label
        >
          {difficultyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>

    <div className="bg-white rounded-2xl shadow p-4 col-span-1">
      <h2 className="text-lg font-semibold">📝 Todo List</h2>
      <TodoSection />
    </div>
    <div className="bg-white rounded-2xl shadow p-4 col-span-1">
      <h2 className="text-lg font-semibold">📊Quizzes Data </h2>
    </div>
    <div className="bg-white rounded-2xl shadow p-4 col-span-1">
      <h2 className="text-lg font-semibold">🔥Streaks</h2>
    </div>
    <div className="bg-white rounded-2xl shadow p-4 col-span-2">
      <h2 className="text-lg font-semibold">📅 History</h2>
    </div>
    <div className="bg-white rounded-2xl shadow p-4 col-span-2">
      <h2 className="text-lg font-semibold">💡 Recommendations</h2>
    </div>
  </div>
);

const Todo = () => <div className="p-6 text-xl">📝 Todo List Page</div>;
const QuizzesData = () => <div className="p-6 text-xl">📊 Quizzes Data Page</div>;
const Streaks = () => <div className="p-6 text-xl">🔥 Streaks Page</div>;
const History = () => <div className="p-6 text-xl">📅 History Page</div>;
const Recommendations = () => <div className="p-6 text-xl">💡 Recommendations Page</div>;
const DashboardApp = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/quizzes-data" element={<QuizzesData />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/history" element={<History />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  );
};

export default DashboardApp;