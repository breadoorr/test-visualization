import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Question } from '../services/triviaService';

interface CategoryDistributionProps {
  questions: Question[];
  selectCategory: (categoryName: string) => void;
  sortAscending?: boolean;
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ questions, selectCategory,  sortAscending = false }) => {
  const getCategoryData = () => {
    const categoryCount: Record<string, number> = {};
    
    questions.forEach(question => {
      if (categoryCount[question.category]) {
        categoryCount[question.category]++;
      } else {
        categoryCount[question.category] = 1;
      }
    });
    
    return Object.keys(categoryCount).map(category => ({
      name: category,
      count: categoryCount[category]
    }));
  };

  const data = getCategoryData();

  return (
    <div className="chart-container" id="categoryDistribution">
      <h2>Questions by Category</h2>
      <ResponsiveContainer width="100%" height={400} minWidth={400}>
        <BarChart
          data={data.sort((a, b) => sortAscending ? a.count - b.count : b.count - a.count)}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
          }}
          onClick={(data) => {
            selectCategory(data.activeLabel as string);
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            display="none"
          />
          <YAxis />
          <Tooltip contentStyle={{backgroundColor: "var(--background)", color: "var(--text)", border: "1px solid var(--primary)", borderRadius: "10px"}} />
          <Legend/>
          <Bar dataKey="count" fill={"var(--text)"} name="Number of Questions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryDistribution;