// src/services/notificationService.ts
export interface Notification {
  id: string;
  userId: string;
  type: 'weekly_task' | 'achievement' | 'reward' | 'reminder' | 'motivation';
  title: string;
  message: string;
  data?: any;
  isRead: boolean;
  createdAt: string;
  scheduledFor?: string;
}

export interface WeeklyMessage {
  id: string;
  weekNumber: number;
  dayNumber: number;
  title: string;
  message: string;
  category: 'motivation' | 'reminder' | 'tip' | 'encouragement';
  points: number;
}

export class NotificationService {
  // ارسال پیام هفتگی به والدین
  static async sendWeeklyNotification(userId: string, week: number, day: number) {
    const messages: Record<number, WeeklyMessage[]> = {
      1: [
        { id: 'w1d1', weekNumber: 1, dayNumber: 1, 
          title: 'شروع سفر تربیتی', 
          message: 'هفته اول شروع شد! امروز فقط ۱۰ دقیقه وقت بذارید و با نوجوانتون درباره روزش صحبت کنید.',
          category: 'motivation', points: 10 },
        { id: 'w1d3', weekNumber: 1, dayNumber: 3,
          title: 'تداوم کلید موفقیت است',
          message: '۳ روز متوالی تمرین کردید! 🔥 فردا با یه تمرین جدید منتظرتونیم.',
          category: 'encouragement', points: 5 }
      ],
      2: [
        { id: 'w2d1', weekNumber: 2, dayNumber: 1,
          title: 'ورود به هفته دوم',
          message: 'تبریک! هفته اول رو با موفقیت پشت سر گذاشتید. این هفته روی مهارت شنیدن فعال کار می‌کنیم.',
          category: 'motivation', points: 20 }
      ]
    };

    const weeklyMessages = messages[week]?.filter(m => m.dayNumber === day) || [];
    
    // ارسال نوتیفیکیشن
    for (const msg of weeklyMessages) {
      await this.createNotification({
        userId,
        type: 'weekly_task',
        title: msg.title,
        message: msg.message,
        data: { points: msg.points, week, day }
      });
    }
  }

  // ایجاد دستاورد
  static async createAchievementNotification(userId: string, achievement: any) {
    return this.createNotification({
      userId,
      type: 'achievement',
      title: '🎉 دستاورد جدید!',
      message: `تبریک! "${achievement.title}" رو کسب کردید.`,
      data: achievement
    });
  }

  // یادآوری تمرین روزانه
  static async sendDailyReminder(userId: string) {
    const reminders = [
      "وقت تمرین امروزه! فقط ۱۵ دقیقه وقت بذارید و تاثیرش رو ببینید.",
      "نوجوانتون منتظر توجه شماست. امروز با یه تمرین کوچیک شروع کنید.",
      "پیشرفت شما قابل تحسینه! بیاید امروز هم ادامه بدیم.",
      "هر روز یه قدم کوچیک، نتایجی بزرگ می‌سازه. تمرین امروز رو فراموش نکنید."
    ];

    const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
    
    return this.createNotification({
      userId,
      type: 'reminder',
      title: '⏰ یادآوری تمرین',
      message: randomReminder
    });
  }

  // پیام انگیزشی هفتگی
  static async sendWeeklyMotivation(userId: string) {
    const motivations = [
      "هفته خوبی داشتید! تداوم شما قابل تحسینه. هفته جدید رو با انرژی شروع کنید.",
      "هر هفته یه فرصت جدید برای رشد و یادگیریه. آماده یادگیری چیزهای جدید هستید؟",
      "پیشرفت شما در نمودارها مشخصه! هفته جدید رو بهتر از هفته قبل کنید.",
      "والدین موفق کسانی هستند که هرگز از یادگیری دست نمی‌کشن. ادامه بدید!"
    ];

    const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)];
    
    return this.createNotification({
      userId,
      type: 'motivation',
      title: '💫 انگیزه هفتگی',
      message: randomMotivation
    });
  }

  private static async createNotification(notification: Omit<Notification, 'id' | 'isRead' | 'createdAt'>) {
    // در اینجا API call به بک‌اند انجام می‌شود
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    // ذخیره در localStorage برای تست
    if (typeof window !== 'undefined') {
      const notifications = JSON.parse(localStorage.getItem(`notifications_${notification.userId}`) || '[]');
      notifications.unshift(newNotification);
      localStorage.setItem(`notifications_${notification.userId}`, JSON.stringify(notifications.slice(0, 50))); // محدود به ۵۰ مورد
    }

    // نمایش toast به کاربر
    this.showToast(newNotification);
    
    return newNotification;
  }

  private static showToast(notification: Notification) {
    // استفاده از toast library یا ایجاد custom toast
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('show-notification', { detail: notification });
      window.dispatchEvent(event);
    }
  }
}