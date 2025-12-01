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
  description: string;
}

export interface UserAnswers {
  [categoryId: number]: number[];
}

export interface DemographicsData {
  livingWith: string;
  fatherLiving: boolean;
  fatherAge: string;
  fatherEducation: string;
  fatherOccupation: string;
  motherLiving: boolean;
  motherAge: string;
  motherEducation: string;
  motherOccupation: string;
  province: string;
  city: string;
  maritalStatus: string;
}

export interface WelcomeData {
  title: string;
  subtitle: string;
  description: string;
  instructions: string[];
}

export interface SelectionRules {
  minTotal: number;
  maxTotal: number;
}

export interface User {
  id: string;
  email?: string;
  username?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isVerified: boolean;
  createdAt: string;
  lastLogin: string;
  assessmentCompleted: boolean;
  assessmentData?: {
    demographics: DemographicsData;
    answers: UserAnswers;
    completedAt: string;
  };
}

export interface LoginCredentials {
  identifier: string; // email, username, or phone
  password: string;
}

export interface RegisterData {
  email?: string;
  username?: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface OTPData {
  phone?: string;
  email?: string;
  otp: string;
}