import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchCategories, fetchQuestions, Category, Question } from './services/triviaService';
import Categories from './components/Categories';
import CategoryDistribution from './components/CategoryDistribution';
import DifficultyDistribution from './components/DifficultyDistribution';

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
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        try {
          const questionsData = await fetchQuestions();
          setQuestions(questionsData);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch questions. Please try again later');
          console.error(err);
        }
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




  // Filter categories to only show those with questions
  const getCategoriesWithQuestions = () => {
    const categoryCount: Record<string, number> = {};
    questions.forEach(question => {
      if (categoryCount[question.category]) {
        categoryCount[question.category]++;
      } else {
        categoryCount[question.category] = 1;
      }
    });

    return categories.filter(category => {
      return categoryCount[category.name] && categoryCount[category.name] > 0;
    });
  };

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
              categories={getCategoriesWithQuestions()}
              selectedCategory={selectedCategory} 
              onSelectCategory={handleCategorySelect} 
            />
          </div>
          
          <div className="charts-container">
            {loading ? (
              <div className="loading">Loading data...</div>
            ) : (
              <>
                { selectedCategory == null && (
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
                          sortAscending={sortAscending}/>
                    </>
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
