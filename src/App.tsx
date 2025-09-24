import React, { useState, useEffect } from 'react';
import './App.css';
import {Category, Question, fetchData} from './services/triviaService';
import Categories from './components/Categories';
import CategoryDistribution from './components/CategoryDistribution';
import DifficultyDistribution from './components/DifficultyDistribution';
import QuestionNumber from "./components/QuestionNumber";

function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortAscending, setSortAscending] = useState<boolean>(false);

  // Fetch categories and questions on component mount and poll every minute
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setCategories(data.categories.sort((a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)));
        setQuestions(data.questions);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories. Please try again later.');
        console.error(err);
      }
    };

    getData().then(() => console.log('Data updated at:', new Date().toLocaleTimeString()));

    // Polling for new data every hour
    const interval = setInterval(() => {
      console.log('Polling for new data...');
      getData().then(() => console.log('Data updated at:', new Date().toLocaleTimeString()));
    }, 1000 * 60 * 60);

    return () => {
      clearInterval(interval);
    };

  }, []);

  const handleCategorySelect = (category: Category | null) => {
    setSelectedCategory(category);
  };
  
  const handleSortToggle = () => {
    setSortAscending(!sortAscending);
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
          
          <div className={"charts-container " + (selectedCategory ? "selected" : "")}>
            {loading ? (
              <div className="loading">Loading data...</div>
            ) : (
              <>
                { selectedCategory == null ? (
                    <>
                      <div className="sort-control">
                        <label className="sort-label">
                          <span>Sort: {sortAscending ? 'Ascending' : 'Descending'}</span>
                          <input
                              type="checkbox"
                              checked={sortAscending}
                              onChange={handleSortToggle}
                              className="sort-toggle"/>
                        </label>
                      </div>
                      <CategoryDistribution
                          questions={questions}
                          selectCategory={(categoryName) => {
                            const cat = categories.find(c => c.name === categoryName) || null;
                            handleCategorySelect(cat);
                          }}
                          sortAscending={sortAscending}/>
                    </>
                ) : (
                    <QuestionNumber questions={questions.filter(question => question.category === selectedCategory.name)} />
                )}
                <DifficultyDistribution 
                  questions={questions.filter(question => ((selectedCategory == null) ? question : question.category === selectedCategory.name))} 
                />
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
