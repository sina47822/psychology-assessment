export interface Question {
  id: number;
  text: string;
  category: string;
  categoryTitle: string;
}

export interface Category {
  id: number;
  title: string;
  questions: Question[];
  minSelection: number;
  maxSelection: number;
}

export interface UserAnswers {
  [categoryId: number]: number[];
}

export interface WelcomeData {
  title: string;
  subtitle: string;
  description: string;
  instructions: string[];
}

export interface SelectionRules {
  minPerCategory: number;
  maxPerCategory: number;
  minTotal: number;
  maxTotal: number;
}