import axios from 'axios';

// Types for API responses
export interface Category {
  id: number;
  name: string;
}

export interface Question {
  category: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface CategoriesResponse {
  trivia_categories: Category[];
}

export interface QuestionsResponse {
  response_code: number;
  results: Question[];
}

// Base URL for the API
const API_BASE_URL = 'https://opentdb.com';

// Function to fetch categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<CategoriesResponse>(`${API_BASE_URL}/api_category.php`);
    return response.data.trivia_categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Handle specific error types
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Server error: ${error.response.status}. Please try again later.`);
      }
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      throw new Error('Failed to fetch categories. Please try again later.');
    }
  }
};

// Function to fetch all questions
export const fetchQuestions = async (amount: number = 50): Promise<Question[]> => {
  try {
    const response = await axios.get<QuestionsResponse>(`${API_BASE_URL}/api.php`, {
      params: {
        amount,
        encode: 'base64',
      },
    });
    
    // Decode base64 encoded strings
    return response.data.results.map(question => ({
      ...question,
      category: atob(question.category),
      type: atob(question.type),
      difficulty: atob(question.difficulty) as 'easy' | 'medium' | 'hard',
      question: atob(question.question),
      correct_answer: atob(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(answer => atob(answer)),
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    
    // Handle specific error types
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Server error: ${error.response.status}. Please try again later.`);
      }
    } else if (axios.isAxiosError(error) && error.request) {
      throw new Error('Network error. Please check your connection and try again.');
    } else {
      throw new Error('Failed to fetch questions. Please try again later.');
    }
  }
};