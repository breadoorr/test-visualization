import React from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { Question } from '../services/triviaService';

interface DifficultyDistributionProps {
  questions: Question[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
const DIFFICULTY_LABELS: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
};

const DifficultyDistribution: React.FC<DifficultyDistributionProps> = ({ questions }) => {
  // Process data for the chart
  const getDifficultyData = () => {
    const difficultyCount: Record<string, number> = {
      easy: 0,
      medium: 0,
      hard: 0
    };
    
    questions.forEach(question => {
      if (difficultyCount[question.difficulty] !== undefined) {
        difficultyCount[question.difficulty]++;
      }
    });
    
    return Object.keys(difficultyCount).map(difficulty => ({
      name: DIFFICULTY_LABELS[difficulty],
      value: difficultyCount[difficulty]
    }));
  };

  const data = getDifficultyData();

  return (
    <div className="chart-container" id={"difficultyDistribution"}>
      <h2>Questions by Difficulty</h2>
      <ResponsiveContainer width="100%" height={400} minWidth={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{border: "1px solid var(--primary)", borderRadius: "10px"}} formatter={(value, name) => [`${name}: ${value} questions`]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyDistribution;