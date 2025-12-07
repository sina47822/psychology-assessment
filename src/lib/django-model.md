# models.py

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class LearningPath(models.Model):
    """مدل مسیر آموزشی"""
    
    DIFFICULTY_CHOICES = [
        ('beginner', 'مقدماتی'),
        ('intermediate', 'متوسط'),
        ('advanced', 'پیشرفته'),
    ]
    
    CATEGORY_CHOICES = [
        ('communication', 'ارتباطات'),
        ('emotion', 'هیجانات'),
        ('discipline', 'تربیت'),
        ('academic', 'تحصیلی'),
        ('technology', 'تکنولوژی'),
        ('career', 'شغلی'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='عنوان')
    slug = models.SlugField(max_length=200, unique=True, verbose_name='اسلاگ')
    description = models.TextField(verbose_name='توضیحات کوتاه')
    long_description = models.TextField(verbose_name='توضیحات کامل')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, verbose_name='دسته‌بندی')
    difficulty = models.CharField(max_length=50, choices=DIFFICULTY_CHOICES, verbose_name='سطح دشواری')
    duration_weeks = models.PositiveIntegerField(verbose_name='تعداد هفته‌ها')
    estimated_hours = models.PositiveIntegerField(verbose_name='ساعت تخمینی')
    points_reward = models.PositiveIntegerField(default=500, verbose_name='امتیاز جایزه')
    
    # تصاویر و فایل‌ها
    cover_image = models.ImageField(upload_to='paths/covers/', null=True, blank=True, verbose_name='تصویر کاور')
    thumbnail = models.ImageField(upload_to='paths/thumbnails/', null=True, blank=True, verbose_name='تصویر کوچک')
    intro_video = models.URLField(null=True, blank=True, verbose_name='ویدیوی معرفی')
    
    # پیش‌نیازها
    prerequisites = models.ManyToManyField('self', symmetrical=False, blank=True, verbose_name='پیش‌نیازها')
    
    # وضعیت
    is_active = models.BooleanField(default=True, verbose_name='فعال')
    is_featured = models.BooleanField(default=False, verbose_name='ویژه')
    is_free = models.BooleanField(default=True, verbose_name='رایگان')
    
    # آمار
    enrolled_count = models.PositiveIntegerField(default=0, verbose_name='تعداد ثبت‌نام‌ها')
    average_rating = models.FloatField(default=0.0, verbose_name='میانگین امتیاز')
    completion_rate = models.FloatField(default=0.0, verbose_name='نرخ تکمیل')
    
    # زمان‌ها
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ به‌روزرسانی')
    published_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ انتشار')
    
    class Meta:
        verbose_name = 'مسیر آموزشی'
        verbose_name_plural = 'مسیرهای آموزشی'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=True)
        super().save(*args, **kwargs)

class LearningObjective(models.Model):
    """مدل اهداف یادگیری"""
    
    path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='objectives', verbose_name='مسیر')
    title = models.CharField(max_length=200, verbose_name='عنوان هدف')
    description = models.TextField(verbose_name='توضیحات')
    order = models.PositiveIntegerField(default=0, verbose_name='ترتیب')
    
    class Meta:
        verbose_name = 'هدف یادگیری'
        verbose_name_plural = 'اهداف یادگیری'
        ordering = ['order']
    
    def __str__(self):
        return f"{self.path.title} - {self.title}"

class WeeklyModule(models.Model):
    """مدل هفته‌های آموزشی"""
    
    path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='weekly_modules', verbose_name='مسیر')
    week_number = models.PositiveIntegerField(verbose_name='شماره هفته')
    title = models.CharField(max_length=200, verbose_name='عنوان هفته')
    description = models.TextField(verbose_name='توضیحات هفته')
    
    # محتوای هفته
    video_count = models.PositiveIntegerField(default=0, verbose_name='تعداد ویدیوها')
    article_count = models.PositiveIntegerField(default=0, verbose_name='تعداد مقالات')
    exercise_count = models.PositiveIntegerField(default=7, verbose_name='تعداد تمرین‌ها')
    quiz_count = models.PositiveIntegerField(default=1, verbose_name='تعداد آزمون‌ها')
    
    # پیش‌نیاز هفته
    prerequisite_module = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, 
                                          verbose_name='هفته پیش‌نیاز')
    
    # وضعیت پیش‌فرض
    is_unlocked_by_default = models.BooleanField(default=False, verbose_name='از ابتدا باز باشد')
    
    # امتیاز
    points_reward = models.PositiveIntegerField(default=100, verbose_name='امتیاز این هفته')
    
    # ترتیب
    order = models.PositiveIntegerField(default=0, verbose_name='ترتیب')
    
    class Meta:
        verbose_name = 'هفته آموزشی'
        verbose_name_plural = 'هفته‌های آموزشی'
        unique_together = ['path', 'week_number']
        ordering = ['order', 'week_number']
    
    def __str__(self):
        return f"{self.path.title} - هفته {self.week_number}: {self.title}"

class DailyTask(models.Model):
    """مدل تمرین روزانه"""
    
    TASK_TYPE_CHOICES = [
        ('reading', 'مطالعه'),
        ('practice', 'تمرین عملی'),
        ('reflection', 'بازتاب'),
        ('quiz', 'آزمون'),
        ('interaction', 'تعامل'),
        ('video', 'تماشای ویدیو'),
    ]
    
    week = models.ForeignKey(WeeklyModule, on_delete=models.CASCADE, related_name='daily_tasks', verbose_name='هفته')
    day_number = models.PositiveIntegerField(verbose_name='شماره روز')  # 1-7
    title = models.CharField(max_length=200, verbose_name='عنوان تمرین')
    description = models.TextField(verbose_name='توضیحات تمرین')
    task_type = models.CharField(max_length=50, choices=TASK_TYPE_CHOICES, verbose_name='نوع تمرین')
    
    # محتوا
    content = models.TextField(verbose_name='محتوا', help_text='متن کامل تمرین')
    video_url = models.URLField(null=True, blank=True, verbose_name='لینک ویدیو')
    audio_url = models.URLField(null=True, blank=True, verbose_name='لینک صوت')
    pdf_url = models.URLField(null=True, blank=True, verbose_name='لینک PDF')
    
    # زمان و امتیاز
    estimated_time = models.PositiveIntegerField(verbose_name='زمان تخمینی (دقیقه)')
    points_reward = models.PositiveIntegerField(default=10, verbose_name='امتیاز')
    
    # مرتبط‌سازی
    prerequisite_tasks = models.ManyToManyField('self', symmetrical=False, blank=True, verbose_name='تمرین‌های پیش‌نیاز')
    
    # ترتیب
    order = models.PositiveIntegerField(default=0, verbose_name='ترتیب')
    
    class Meta:
        verbose_name = 'تمرین روزانه'
        verbose_name_plural = 'تمرین‌های روزانه'
        unique_together = ['week', 'day_number']
        ordering = ['day_number', 'order']
    
    def __str__(self):
        return f"هفته {self.week.week_number} - روز {self.day_number}: {self.title}"

class TaskQuestion(models.Model):
    """مدل سوالات تمرین"""
    
    task = models.ForeignKey(DailyTask, on_delete=models.CASCADE, related_name='questions', verbose_name='تمرین')
    question = models.TextField(verbose_name='سوال')
    question_type = models.CharField(max_length=50, choices=[
        ('multiple_choice', 'چند گزینه‌ای'),
        ('text', 'متنی'),
        ('rating', 'امتیازدهی'),
        ('checkbox', 'چک باکس'),
    ], verbose_name='نوع سوال')
    options = models.JSONField(null=True, blank=True, verbose_name='گزینه‌ها')  # برای سوالات چندگزینه‌ای
    is_required = models.BooleanField(default=True, verbose_name='الزامی')
    order = models.PositiveIntegerField(default=0, verbose_name='ترتیب')
    
    class Meta:
        verbose_name = 'سوال تمرین'
        verbose_name_plural = 'سوالات تمرین'
        ordering = ['order']
    
    def __str__(self):
        return f"{self.task.title} - سوال {self.order}"

class WeeklyChallenge(models.Model):
    """مدل چالش هفتگی"""
    
    week = models.OneToOneField(WeeklyModule, on_delete=models.CASCADE, related_name='challenge', verbose_name='هفته')
    title = models.CharField(max_length=200, verbose_name='عنوان چالش')
    description = models.TextField(verbose_name='توضیحات چالش')
    
    DIFFICULTY_CHOICES = [
        ('easy', 'آسان'),
        ('medium', 'متوسط'),
        ('hard', 'سخت'),
    ]
    difficulty = models.CharField(max_length=50, choices=DIFFICULTY_CHOICES, verbose_name='سطح دشواری')
    
    points_reward = models.PositiveIntegerField(default=50, verbose_name='امتیاز جایزه')
    criteria = models.JSONField(verbose_name='معیارهای تکمیل')  # لیستی از معیارها
    
    class Meta:
        verbose_name = 'چالش هفتگی'
        verbose_name_plural = 'چالش‌های هفتگی'
    
    def __str__(self):
        return f"{self.week.path.title} - هفته {self.week.week_number}: {self.title}"

class UserPathEnrollment(models.Model):
    """مدل ثبت‌نام کاربر در مسیر"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='path_enrollments', verbose_name='کاربر')
    path = models.ForeignKey(LearningPath, on_delete=models.CASCADE, related_name='enrollments', verbose_name='مسیر')
    
    # وضعیت
    is_active = models.BooleanField(default=True, verbose_name='فعال')
    current_week = models.PositiveIntegerField(default=1, verbose_name='هفته جاری')
    completed_weeks = models.JSONField(default=list, verbose_name='هفته‌های تکمیل شده')  # لیست شماره هفته‌های تکمیل شده
    
    # پیشرفت
    progress_percentage = models.FloatField(default=0.0, verbose_name='درصد پیشرفت')
    completed_tasks_count = models.PositiveIntegerField(default=0, verbose_name='تعداد تمرین‌های تکمیل شده')
    total_points_earned = models.PositiveIntegerField(default=0, verbose_name='مجموع امتیاز کسب شده')
    
    # زمان‌ها
    enrolled_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت‌نام')
    started_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ شروع')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ تکمیل')
    last_accessed_at = models.DateTimeField(auto_now=True, verbose_name='آخرین دسترسی')
    
    class Meta:
        verbose_name = 'ثبت‌نام در مسیر'
        verbose_name_plural = 'ثبت‌نام‌ها در مسیر'
        unique_together = ['user', 'path']
    
    def __str__(self):
        return f"{self.user.username} - {self.path.title}"
    
    def save(self, *args, **kwargs):
        if not self.started_at:
            self.started_at = timezone.now()
        super().save(*args, **kwargs)

class UserTaskProgress(models.Model):
    """مدل پیشرفت کاربر در تمرین‌ها"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='task_progress', verbose_name='کاربر')
    task = models.ForeignKey(DailyTask, on_delete=models.CASCADE, related_name='user_progress', verbose_name='تمرین')
    
    # وضعیت
    is_completed = models.BooleanField(default=False, verbose_name='تکمیل شده')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ تکمیل')
    
    # پاسخ‌ها
    answers = models.JSONField(null=True, blank=True, verbose_name='پاسخ‌ها')  # ذخیره پاسخ‌های کاربر
    
    # امتیاز
    points_earned = models.PositiveIntegerField(default=0, verbose_name='امتیاز کسب شده')
    quality_rating = models.PositiveIntegerField(null=True, blank=True, verbose_name='امتیاز کیفیت')  # 1-5
    
    # زمان‌ها
    started_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ شروع')
    time_spent_minutes = models.PositiveIntegerField(default=0, verbose_name='زمان صرف شده (دقیقه)')
    
    class Meta:
        verbose_name = 'پیشرفت تمرین'
        verbose_name_plural = 'پیشرفت تمرین‌ها'
        unique_together = ['user', 'task']
    
    def __str__(self):
        return f"{self.user.username} - {self.task.title}"
    
    def save(self, *args, **kwargs):
        if self.is_completed and not self.completed_at:
            self.completed_at = timezone.now()
            # محاسبه امتیاز بر اساس کیفیت و زمان
            if not self.points_earned:
                self.points_earned = self.task.points_reward
                if self.quality_rating and self.quality_rating >= 4:
                    self.points_earned += 10
        super().save(*args, **kwargs)

class UserWeeklyProgress(models.Model):
    """مدل پیشرفت هفتگی کاربر"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='weekly_progress', verbose_name='کاربر')
    week = models.ForeignKey(WeeklyModule, on_delete=models.CASCADE, related_name='user_progress', verbose_name='هفته')
    enrollment = models.ForeignKey(UserPathEnrollment, on_delete=models.CASCADE, related_name='weekly_progress', verbose_name='ثبت‌نام')
    
    # وضعیت
    is_completed = models.BooleanField(default=False, verbose_name='تکمیل شده')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ تکمیل')
    
    # آمار
    completed_tasks = models.PositiveIntegerField(default=0, verbose_name='تمرین‌های تکمیل شده')
    total_tasks = models.PositiveIntegerField(default=7, verbose_name='کل تمرین‌ها')
    challenge_completed = models.BooleanField(default=False, verbose_name='چالش تکمیل شده')
    
    # امتیاز
    points_earned = models.PositiveIntegerField(default=0, verbose_name='امتیاز کسب شده')
    
    # زمان‌ها
    started_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ شروع')
    time_spent_hours = models.FloatField(default=0.0, verbose_name='زمان صرف شده (ساعت)')
    
    class Meta:
        verbose_name = 'پیشرفت هفتگی'
        verbose_name_plural = 'پیشرفت‌های هفتگی'
        unique_together = ['user', 'week']
    
    def __str__(self):
        return f"{self.user.username} - {self.week.title}"
    
    def calculate_progress(self):
        """محاسبه درصد پیشرفت هفته"""
        if self.total_tasks > 0:
            return (self.completed_tasks / self.total_tasks) * 100
        return 0.0
    
    def save(self, *args, **kwargs):
        if self.completed_tasks == self.total_tasks and self.challenge_completed:
            self.is_completed = True
            if not self.completed_at:
                self.completed_at = timezone.now()
        super().save(*args, **kwargs)

class Achievement(models.Model):
    """مدل دستاوردها"""
    
    ACHIEVEMENT_TYPE_CHOICES = [
        ('weekly', 'هفتگی'),
        ('path', 'مسیر'),
        ('streak', 'تداوم'),
        ('special', 'ویژه'),
        ('milestone', 'نقطه عطف'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='عنوان')
    description = models.TextField(verbose_name='توضیحات')
    icon = models.CharField(max_length=50, verbose_name='آیکون')  # emoji یا نام آیکون
    achievement_type = models.CharField(max_length=50, choices=ACHIEVEMENT_TYPE_CHOICES, verbose_name='نوع دستاورد')
    points_reward = models.PositiveIntegerField(default=100, verbose_name='امتیاز جایزه')
    
    # معیارهای کسب
    criteria_type = models.CharField(max_length=50, choices=[
        ('tasks_completed', 'تکمیل تمرین‌ها'),
        ('streak_days', 'تداوم روزها'),
        ('path_completed', 'تکمیل مسیر'),
        ('challenge_completed', 'تکمیل چالش'),
        ('points_earned', 'کسب امتیاز'),
        ('weeks_completed', 'تکمیل هفته‌ها'),
    ], verbose_name='نوع معیار')
    
    target_value = models.PositiveIntegerField(verbose_name='مقدار هدف')
    unit = models.CharField(max_length=50, null=True, blank=True, verbose_name='واحد')
    
    # مرتبط‌سازی
    related_path = models.ForeignKey(LearningPath, on_delete=models.SET_NULL, null=True, blank=True, 
                                    verbose_name='مسیر مرتبط')
    
    # وضعیت
    is_active = models.BooleanField(default=True, verbose_name='فعال')
    is_hidden = models.BooleanField(default=False, verbose_name='مخفی')
    
    class Meta:
        verbose_name = 'دستاورد'
        verbose_name_plural = 'دستاوردها'
    
    def __str__(self):
        return self.title

class UserAchievement(models.Model):
    """مدل دستاوردهای کسب شده توسط کاربر"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements', verbose_name='کاربر')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='users', verbose_name='دستاورد')
    
    unlocked_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ کسب')
    points_earned = models.PositiveIntegerField(verbose_name='امتیاز کسب شده')
    
    # اطلاعات اضافی
    progress_data = models.JSONField(null=True, blank=True, verbose_name='داده‌های پیشرفت')
    
    class Meta:
        verbose_name = 'دستاورد کاربر'
        verbose_name_plural = 'دستاوردهای کاربران'
        unique_together = ['user', 'achievement']
    
    def __str__(self):
        return f"{self.user.username} - {self.achievement.title}"

class Reward(models.Model):
    """مدل جوایز"""
    
    REWARD_TYPE_CHOICES = [
        ('badge', 'نشان'),
        ('certificate', 'گواهینامه'),
        ('discount', 'تخفیف'),
        ('free_session', 'جلسه رایگان'),
        ('physical', 'جایزه فیزیکی'),
        ('ebook', 'کتاب الکترونیکی'),
        ('course', 'دوره رایگان'),
        ('community', 'عضویت در انجمن'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='عنوان')
    description = models.TextField(verbose_name='توضیحات')
    reward_type = models.CharField(max_length=50, choices=REWARD_TYPE_CHOICES, verbose_name='نوع جایزه')
    icon = models.CharField(max_length=50, verbose_name='آیکون')
    
    # شرایط دریافت
    points_required = models.PositiveIntegerField(verbose_name='امتیاز مورد نیاز')
    is_available = models.BooleanField(default=True, verbose_name='در دسترس')
    
    # اطلاعات جایزه
    discount_percentage = models.PositiveIntegerField(null=True, blank=True, verbose_name='درصد تخفیف')
    session_duration = models.PositiveIntegerField(null=True, blank=True, verbose_name='مدت جلسه (دقیقه)')
    physical_item = models.CharField(max_length=200, null=True, blank=True, verbose_name='آیتم فیزیکی')
    file_url = models.URLField(null=True, blank=True, verbose_name='لینک فایل')
    
    # محدودیت‌ها
    stock_quantity = models.PositiveIntegerField(null=True, blank=True, verbose_name='تعداد موجودی')
    expiry_date = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ انقضا')
    
    class Meta:
        verbose_name = 'جایزه'
        verbose_name_plural = 'جوایز'
    
    def __str__(self):
        return self.title

class UserReward(models.Model):
    """مدل جوایز دریافت شده توسط کاربر"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='rewards', verbose_name='کاربر')
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE, related_name='users', verbose_name='جایزه')
    
    claimed_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ دریافت')
    is_used = models.BooleanField(default=False, verbose_name='استفاده شده')
    used_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ استفاده')
    
    # اطلاعات استفاده
    usage_data = models.JSONField(null=True, blank=True, verbose_name='داده‌های استفاده')
    
    # کد/شناسه
    reward_code = models.CharField(max_length=100, unique=True, verbose_name='کد جایزه')
    
    class Meta:
        verbose_name = 'جایزه کاربر'
        verbose_name_plural = 'جوایز کاربران'
        unique_together = ['user', 'reward']
    
    def __str__(self):
        return f"{self.user.username} - {self.reward.title}"
    
    def save(self, *args, **kwargs):
        if not self.reward_code:
            import uuid
            self.reward_code = f"REWARD-{uuid.uuid4().hex[:12].upper()}"
        super().save(*args, **kwargs)

class Notification(models.Model):
    """مدل اعلان‌ها"""
    
    NOTIFICATION_TYPE_CHOICES = [
        ('weekly_task', 'تمرین هفتگی'),
        ('achievement', 'دستاورد'),
        ('reward', 'جایزه'),
        ('reminder', 'یادآوری'),
        ('motivation', 'انگیزشی'),
        ('system', 'سیستمی'),
        ('progress', 'پیشرفت'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', verbose_name='کاربر')
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPE_CHOICES, verbose_name='نوع اعلان')
    
    title = models.CharField(max_length=200, verbose_name='عنوان')
    message = models.TextField(verbose_name='پیام')
    
    # داده‌های اضافی
    data = models.JSONField(null=True, blank=True, verbose_name='داده‌های اضافی')
    
    # وضعیت
    is_read = models.BooleanField(default=False, verbose_name='خوانده شده')
    is_sent = models.BooleanField(default=False, verbose_name='ارسال شده')
    
    # زمان‌ها
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    scheduled_for = models.DateTimeField(null=True, blank=True, verbose_name='زمان برنامه‌ریزی شده')
    read_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ خواندن')
    
    class Meta:
        verbose_name = 'اعلان'
        verbose_name_plural = 'اعلان‌ها'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"
    
    def mark_as_read(self):
        self.is_read = True
        self.read_at = timezone.now()
        self.save()

class UserStreak(models.Model):
    """مدل تداوم کاربر"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='streak', verbose_name='کاربر')
    
    # تداوم
    current_streak = models.PositiveIntegerField(default=0, verbose_name='تداوم جاری')
    longest_streak = models.PositiveIntegerField(default=0, verbose_name='بیشترین تداوم')
    
    # زمان‌ها
    last_activity_date = models.DateField(null=True, blank=True, verbose_name='تاریخ آخرین فعالیت')
    streak_start_date = models.DateField(null=True, blank=True, verbose_name='تاریخ شروع تداوم')
    
    # آمار
    total_active_days = models.PositiveIntegerField(default=0, verbose_name='کل روزهای فعال')
    completed_this_week = models.PositiveIntegerField(default=0, verbose_name='تکمیل شده این هفته')
    
    class Meta:
        verbose_name = 'تداوم کاربر'
        verbose_name_plural = 'تداوم کاربران'
    
    def __str__(self):
        return f"{self.user.username} - {self.current_streak} روز تداوم"
    
    def update_streak(self):
        """به‌روزرسانی تداوم کاربر"""
        today = timezone.now().date()
        
        if not self.last_activity_date:
            # اولین فعالیت
            self.current_streak = 1
            self.streak_start_date = today
        elif self.last_activity_date == today - timezone.timedelta(days=1):
            # فعالیت متوالی
            self.current_streak += 1
        elif self.last_activity_date == today:
            # قبلاً امروز فعالیت کرده
            pass
        else:
            # تداوم شکسته شده
            self.current_streak = 1
            self.streak_start_date = today
        
        # به‌روزرسانی بیشترین تداوم
        if self.current_streak > self.longest_streak:
            self.longest_streak = self.current_streak
        
        # به‌روزرسانی تاریخ آخرین فعالیت
        self.last_activity_date = today
        self.total_active_days += 1
        
        self.save()

class UserStats(models.Model):
    """مدل آمار کاربر"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stats', verbose_name='کاربر')
    
    # آمار کلی
    total_points = models.PositiveIntegerField(default=0, verbose_name='مجموع امتیاز')
    total_tasks_completed = models.PositiveIntegerField(default=0, verbose_name='مجموع تمرین‌های تکمیل شده')
    total_paths_completed = models.PositiveIntegerField(default=0, verbose_name='مجموع مسیرهای تکمیل شده')
    total_weeks_completed = models.PositiveIntegerField(default=0, verbose_name='مجموع هفته‌های تکمیل شده')
    total_challenges_completed = models.PositiveIntegerField(default=0, verbose_name='مجموع چالش‌های تکمیل شده')
    
    # زمان‌ها
    total_learning_time = models.PositiveIntegerField(default=0, verbose_name='زمان کل یادگیری (ساعت)')
    average_daily_time = models.FloatField(default=0.0, verbose_name='میانگین زمان روزانه (دقیقه)')
    
    # آخرین‌ها
    last_task_completed_at = models.DateTimeField(null=True, blank=True, verbose_name='آخرین تمرین تکمیل شده')
    last_path_completed_at = models.DateTimeField(null=True, blank=True, verbose_name='آخرین مسیر تکمیل شده')
    
    # امتیازات
    current_level = models.PositiveIntegerField(default=1, verbose_name='سطح جاری')
    points_to_next_level = models.PositiveIntegerField(default=100, verbose_name='امتیاز تا سطح بعدی')
    level_progress = models.FloatField(default=0.0, verbose_name='پیشرفت سطح')
    
    class Meta:
        verbose_name = 'آمار کاربر'
        verbose_name_plural = 'آمار کاربران'
    
    def __str__(self):
        return f"آمار {self.user.username}"
    
    def calculate_level(self):
        """محاسبه سطح کاربر بر اساس امتیاز"""
        levels = {
            1: 0,
            2: 500,
            3: 1200,
            4: 2000,
            5: 3000,
            6: 5000,
            7: 7500,
            8: 10000,
            9: 15000,
            10: 20000
        }
        
        for level, threshold in sorted(levels.items(), reverse=True):
            if self.total_points >= threshold:
                next_level = level + 1 if level < 10 else 10
                next_threshold = levels.get(next_level, self.total_points * 2)
                
                self.current_level = level
                self.points_to_next_level = next_threshold - self.total_points
                self.level_progress = ((self.total_points - threshold) / (next_threshold - threshold)) * 100
                break
    
    def save(self, *args, **kwargs):
        self.calculate_level()
        super().save(*args, **kwargs)