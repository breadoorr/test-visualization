import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchCategories, fetchQuestions, fetchQuestionsByCategory, Category, Question } from './services/triviaService';
import Categories from './components/Categories';
import CategoryDistribution from './components/CategoryDistribution';
import DifficultyDistribution from './components/DifficultyDistribution';
import {cleanup} from "@testing-library/react";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and questions on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        try {
          const questionsData = await fetchQuestions();
          setQuestions(questionsData);
        } catch (err) {
          setError('Failed to fetch questions. Please try again later');
          console.error(err);
        }
      } catch (err) {
        setError('Failed to fetch categories. Please try again later.');
        console.error(err);
      }
    };

    getData();
    setLoading(false);
    // return () => clearTimeout(timeout);
  }, []);

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Trivia Question Visualizer</h1>
      </header>
      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        <div className="content-container">
          <div className="sidebar">
            <Categories 
              categories={categories}
              selectedCategory={selectedCategory} 
              onSelectCategory={handleCategorySelect} 
            />
          </div>
          
          <div className="charts-container">
            {loading ? (
              <div className="loading">Loading data...</div>
            ) : (
              <>
                <CategoryDistribution questions={questions.filter(question => ((selectedCategory == null) ? question : question.category === selectedCategory.name))} />
                <DifficultyDistribution questions={questions.filter(question => ((selectedCategory == null) ? question : question.category === selectedCategory.name))} />
              </>
            )}
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <p>Data from <a href="https://opentdb.com" target="_blank" rel="noopener noreferrer">Open Trivia DB</a></p>
      </footer>
    </div>
  );
}

export default App;
