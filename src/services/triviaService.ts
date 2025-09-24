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

export interface TriviaResponse {
  questions: Question[];
  categories: Category[];
}

// Base URL for the API
const API_BASE_URL = 'https://opentdb.com';

export const fetchData = async (amount: number = 50): Promise<TriviaResponse> => {
  try {
    const response = await axios.get<QuestionsResponse>(`${API_BASE_URL}/api.php`, {
      params: {
        amount,
        encode: 'base64',
      },
    });
    
    // Decode base64 encoded strings
    let questions =  response.data.results.map(question => ({
      ...question,
      category: atob(question.category),
      type: atob(question.type),
      difficulty: atob(question.difficulty) as 'easy' | 'medium' | 'hard',
      question: atob(question.question),
      correct_answer: atob(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(answer => atob(answer)),
    }));

    let categories: Category[] = [];
    let key = 0;
    questions.forEach((question) => {
      if (!categories.some(c => c.name === question.category)) {
        categories.push({
          id: key++,
          name: question.category,
        });
      }
    });

    return {
      questions,
      categories
    }
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