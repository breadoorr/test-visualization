import React from 'react';
import { Category } from '../services/triviaService';

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
  return (
    <div className="categories-container">
      <h2>Categories</h2>
      <div className="categories-list">
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