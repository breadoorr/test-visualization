import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieLabelRenderProps } from 'recharts/types/polar/Pie';
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
    <div className="chart-container">
      <h2>Questions by Difficulty</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={(props: PieLabelRenderProps) => {
              const { name, percent } = props;
              return `${name} ${percent ? ((percent as number) * 100).toFixed(0) : 0}%`;
            }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} questions`]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DifficultyDistribution;