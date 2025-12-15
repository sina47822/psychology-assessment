// src/types/coaching.ts

// مدل مسیر آموزشی
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: 'parenting' | 'communication' | 'discipline' | 'emotion' | 'academic';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalWeeks: number; // تعداد هفته‌های مسیر
  estimatedHours: number;
  isActive: boolean;
  coverImage?: string;
  prerequisites?: string[]; // مسیرهای پیش‌نیاز
  learningObjectives: string[];
  createdAt: string;
  updatedAt: string;
}

// مدل هفتگی
export interface WeeklyModule {
  id: string;
  pathId: string;
  weekNumber: number;
  title: string;
  description: string;
  videoUrl?: string;
  audioUrl?: string;
  pdfUrl?: string;
  dailyTasks: DailyTask[];
  weeklyChallenge: Challenge;
  isUnlocked: boolean;
  isCompleted: boolean;
  completedAt?: string;
}

// مدل تمرین روزانه
export interface DailyTask {
  id: string;
  moduleId: string;
  dayNumber: number; // 1-7
  title: string;
  description: string;
  estimatedTime: number; // دقیقه
  taskType: 'reading' | 'practice' | 'reflection' | 'quiz' | 'interaction';
  content: string;
  questions?: TaskQuestion[];
  isCompleted: boolean;
  completedAt?: string;
}

// مدل چالش هفتگی
export interface Challenge {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  criteria: string[];
  isCompleted: boolean;
  completedAt?: string;
}

// مدل دستاورد
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji یا آدرس عکس
  type: 'weekly' | 'path' | 'streak' | 'special';
  points: number;
  criteria: AchievementCriteria;
  unlockedAt?: string;
}

export interface AchievementCriteria {
  type: 'tasks_completed' | 'streak_days' | 'path_completed' | 'challenge_completed';
  target: number;
  unit?: 'days' | 'tasks' | 'weeks';
}

// مدل جایزه
export interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'badge' | 'certificate' | 'discount' | 'free_session' | 'physical';
  icon: string;
  pointsRequired: number;
  isClaimed: boolean;
  claimedAt?: string;
  expiryDate?: string;
}

// مدل پیشرفت کاربر
export interface UserProgress {
  userId: string;
  currentPathId?: string;
  currentWeek?: number;
  totalPoints: number;
  streakDays: number;
  completedPaths: string[];
  achievements: Achievement[];
  rewards: Reward[];
  weeklyProgress: {
    [weekId: string]: {
      dailyTasks: { [taskId: string]: boolean };
      challengeCompleted: boolean;
    }
  };
}