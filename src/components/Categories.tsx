import React, {useState} from 'react';
import {Category} from '../services/triviaService';

interface CategoriesProps {
    categories: Category[];
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
}

const Categories: React.FC<CategoriesProps> = ({
                                                   categories,
                                                   selectedCategory,
                                                   onSelectCategory
                                               }) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className="categories-container">
            <div className="categories-header">
                <h2>Categories</h2>
                <span
                    className="category-toggle mobile-only"
                    onClick={() => setShowMenu(!showMenu)}
                >
              {showMenu ?
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       className="lucide lucide-chevron-down-icon lucide-chevron-down">
                      <path d="m6 9 6 6 6-6"/>
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                       className="lucide lucide-chevron-right-icon lucide-chevron-right">
                      <path d="m9 18 6-6-6-6"/>
                  </svg>
              }
          </span>
            </div>
            <div className={`categories-list ${showMenu ? "open" : ""}`}>
                <div
                    className={`category-item ${selectedCategory === null ? 'selected' : ''}`}
                    onClick={() => onSelectCategory(null)}
                >
                    All Categories
                </div>
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`category-item ${selectedCategory?.id === category.id ? 'selected' : ''}`}
                        onClick={() => onSelectCategory(category)}
                    >
                        {category.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;