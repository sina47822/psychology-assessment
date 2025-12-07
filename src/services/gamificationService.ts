// src/services/gamificationService.ts
export interface GamificationEvent {
  userId: string;
  type: 'task_completed' | 'challenge_completed' | 'streak_updated' | 'path_completed' | 'daily_login';
  data: any;
  points: number;
  timestamp: string;
}

export class GamificationService {
  // محاسبه امتیاز برای رویدادها
  static calculatePoints(event: Omit<GamificationEvent, 'points' | 'timestamp'>): number {
    switch (event.type) {
      case 'task_completed':
        return this.calculateTaskPoints(event.data);
      case 'challenge_completed':
        return 200; // امتیاز ثابت برای چالش
      case 'streak_updated':
        return this.calculateStreakPoints(event.data.streakDays);
      case 'path_completed':
        return 500; // امتیاز تکمیل مسیر
      case 'daily_login':
        return 10; // امتیاز روزانه برای ورود
      default:
        return 0;
    }
  }

  private static calculateTaskPoints(taskData: any): number {
    let points = 50; // امتیاز پایه
    
    // امتیاز اضافه برای زود انجام دادن
    if (taskData.completedEarly) points += 20;
    
    // امتیاز اضافه برای بازتاب کامل
    if (taskData.reflectionLength > 100) points += 30;
    
    // امتیاز اضافه برای کیفیت بالا
    if (taskData.qualityRating > 4) points += 50;
    
    return points;
  }

  private static calculateStreakPoints(streakDays: number): number {
    // امتیاز بر اساس رکورد تداوم
    if (streakDays >= 30) return 300;
    if (streakDays >= 14) return 200;
    if (streakDays >= 7) return 100;
    return 0;
  }

  // بررسی دستاوردها
  static checkAchievements(userProgress: any): string[] {
    const newAchievements: string[] = [];
    
    // بررسی دستاورد تداوم
    if (userProgress.streakDays >= 7 && !userProgress.achievements.includes('7_day_streak')) {
      newAchievements.push('7_day_streak');
    }
    
    if (userProgress.streakDays >= 30 && !userProgress.achievements.includes('30_day_streak')) {
      newAchievements.push('30_day_streak');
    }
    
    // بررسی دستاورد تمرین‌ها
    if (userProgress.completedTasks >= 50 && !userProgress.achievements.includes('50_tasks')) {
      newAchievements.push('50_tasks');
    }
    
    // بررسی دستاورد مسیرها
    if (userProgress.completedPaths.length >= 3 && !userProgress.achievements.includes('3_paths')) {
      newAchievements.push('3_paths');
    }
    
    return newAchievements;
  }

  // بررسی جوایز قابل دریافت
  static checkAvailableRewards(userPoints: number, claimedRewards: string[]): any[] {
    const allRewards = [
      { id: 'ebook', points: 500, title: 'کتاب الکترونیکی' },
      { id: 'discount', points: 750, title: 'تخفیف ۲۰٪' },
      { id: 'free_session', points: 1000, title: 'مشاوره رایگان' },
      { id: 'certificate', points: 1200, title: 'گواهینامه طلایی' },
      { id: 'coaching', points: 1500, title: 'همراهی مربی' },
    ];
    
    return allRewards.filter(reward => 
      userPoints >= reward.points && 
      !claimedRewards.includes(reward.id)
    );
  }

  // ارتقاء سطح کاربر
  static calculateLevel(userPoints: number): { level: number; nextLevelPoints: number; progress: number } {
    const levels = [
      { points: 0, level: 1 },
      { points: 500, level: 2 },
      { points: 1200, level: 3 },
      { points: 2000, level: 4 },
      { points: 3000, level: 5 },
      { points: 5000, level: 6 },
    ];
    
    let currentLevel = 1;
    let nextLevelPoints = 500;
    
    for (let i = 0; i < levels.length - 1; i++) {
      if (userPoints >= levels[i].points && userPoints < levels[i + 1].points) {
        currentLevel = levels[i].level;
        nextLevelPoints = levels[i + 1].points;
        break;
      }
    }
    
    if (userPoints >= levels[levels.length - 1].points) {
      currentLevel = levels[levels.length - 1].level;
      nextLevelPoints = userPoints + 1000;
    }
    
    const progress = ((userPoints - (currentLevel === 1 ? 0 : levels[currentLevel - 2].points)) / 
                     (nextLevelPoints - (currentLevel === 1 ? 0 : levels[currentLevel - 2].points))) * 100;
    
    return {
      level: currentLevel,
      nextLevelPoints,
      progress: Math.min(100, progress)
    };
  }
}