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
              {showMenu ? "v" : ">"}
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