# views.py

from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.db.models import Q, Count, Sum, Avg
from .models import *
from .serializers import *
from .permissions import IsOwnerOrReadOnly

class LearningPathViewSet(viewsets.ModelViewSet):
    """ویو ست مسیرهای آموزشی"""
    
    queryset = LearningPath.objects.filter(is_active=True)
    serializer_class = LearningPathSerializer
    permission_classes = [permissions.is_authenticatedOrReadOnly]
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # فیلتر بر اساس دسته‌بندی
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category=category)
        
        # فیلتر بر اساس سطح دشواری
        difficulty = self.request.query_params.get('difficulty')
        if difficulty:
            queryset = queryset.filter(difficulty=difficulty)
        
        # فیلتر بر اساس وضعیت ویژه
        featured = self.request.query_params.get('featured')
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        # فیلتر بر اساس رایگان بودن
        free = self.request.query_params.get('free')
        if free == 'true':
            queryset = queryset.filter(is_free=True)
        
        # جستجو
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search) |
                Q(long_description__icontains=search)
            )
        
        return queryset.select_related().prefetch_related('objectives', 'prerequisites')
    
    @action(detail=True, methods=['post'])
    def enroll(self, request, slug=None):
        """ثبت‌نام کاربر در مسیر"""
        path = self.get_object()
        user = request.user
        
        # بررسی اینکه آیا قبلاً ثبت‌نام کرده
        existing_enrollment = path.enrollments.filter(user=user, is_active=True).first()
        if existing_enrollment:
            return Response(
                {'detail': 'شما قبلاً در این مسیر ثبت‌نام کرده‌اید.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # بررسی پیش‌نیازها
        for prerequisite in path.prerequisites.all():
            if not prerequisite.enrollments.filter(user=user, completed_at__isnull=False).exists():
                return Response(
                    {'detail': f'برای ثبت‌نام در این مسیر باید مسیر "{prerequisite.title}" را تکمیل کنید.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # ایجاد ثبت‌نام
        enrollment = UserPathEnrollment.objects.create(
            user=user,
            path=path,
            is_active=True,
            started_at=timezone.now()
        )
        
        # ایجاد پیشرفت هفتگی برای هفته اول
        first_week = path.weekly_modules.filter(week_number=1).first()
        if first_week:
            UserWeeklyProgress.objects.create(
                user=user,
                week=first_week,
                enrollment=enrollment,
                started_at=timezone.now()
            )
        
        # به‌روزرسانی تعداد ثبت‌نام‌ها
        path.enrolled_count += 1
        path.save()
        
        serializer = UserPathEnrollmentSerializer(enrollment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['get'])
    def progress(self, request, slug=None):
        """دریافت پیشرفت کاربر در مسیر"""
        path = self.get_object()
        user = request.user
        
        enrollment = path.enrollments.filter(user=user, is_active=True).first()
        if not enrollment:
            return Response(
                {'detail': 'شما در این مسیر ثبت‌نام نکرده‌اید.'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = UserPathEnrollmentSerializer(enrollment)
        return Response(serializer.data)

class WeeklyModuleViewSet(viewsets.ReadOnlyModelViewSet):
    """ویو ست هفته‌های آموزشی"""
    
    serializer_class = WeeklyModuleSerializer
    
    def get_queryset(self):
        path_slug = self.kwargs.get('path_slug')
        return WeeklyModule.objects.filter(
            path__slug=path_slug,
            path__is_active=True
        ).select_related('path').prefetch_related('daily_tasks')
    
    @action(detail=True, methods=['get'])
    def daily_tasks(self, request, path_slug=None, pk=None):
        """دریافت تمرین‌های روزانه یک هفته"""
        week = self.get_object()
        day_number = request.query_params.get('day')
        
        tasks = week.daily_tasks.all()
        if day_number:
            tasks = tasks.filter(day_number=day_number)
        
        serializer = DailyTaskSerializer(
            tasks,
            many=True,
            context={'request': request}
        )
        return Response(serializer.data)

class DailyTaskViewSet(viewsets.ReadOnlyModelViewSet):
    """ویو ست تمرین‌های روزانه"""
    
    serializer_class = DailyTaskSerializer
    
    def get_queryset(self):
        week_id = self.kwargs.get('week_id')
        return DailyTask.objects.filter(
            week_id=week_id
        ).select_related('week', 'week__path')
    
    @action(detail=True, methods=['post'])
    def submit(self, request, week_id=None, pk=None):
        """ثبت پاسخ تمرین"""
        task = self.get_object()
        user = request.user
        
        # بررسی اینکه آیا کاربر در مسیر ثبت‌نام کرده
        enrollment = task.week.path.enrollments.filter(
            user=user,
            is_active=True
        ).first()
        
        if not enrollment:
            return Response(
                {'detail': 'شما در این مسیر ثبت‌نام نکرده‌اید.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        # دریافت پاسخ‌ها از درخواست
        answers = request.data.get('answers', {})
        time_spent = request.data.get('time_spent', 0)
        quality_rating = request.data.get('quality_rating')
        
        # ایجاد یا به‌روزرسانی پیشرفت
        progress, created = UserTaskProgress.objects.get_or_create(
            user=user,
            task=task,
            defaults={
                'answers': answers,
                'time_spent_minutes': time_spent,
                'quality_rating': quality_rating,
                'is_completed': True
            }
        )
        
        if not created:
            progress.answers = answers
            progress.time_spent_minutes = time_spent
            progress.quality_rating = quality_rating
            progress.is_completed = True
            progress.save()
        
        # به‌روزرسانی پیشرفت هفتگی
        weekly_progress, _ = UserWeeklyProgress.objects.get_or_create(
            user=user,
            week=task.week,
            enrollment=enrollment
        )
        weekly_progress.completed_tasks = UserTaskProgress.objects.filter(
            user=user,
            task__week=task.week,
            is_completed=True
        ).count()
        weekly_progress.save()
        
        # به‌روزرسانی پیشرفت مسیر
        enrollment.completed_tasks_count = UserTaskProgress.objects.filter(
            user=user,
            task__week__path=enrollment.path,
            is_completed=True
        ).count()
        enrollment.progress_percentage = (
            enrollment.completed_tasks_count / 
            DailyTask.objects.filter(week__path=enrollment.path).count() * 100
        )
        enrollment.save()
        
        # به‌روزرسانی آمار کاربر
        stats, _ = UserStats.objects.get_or_create(user=user)
        stats.total_tasks_completed = UserTaskProgress.objects.filter(
            user=user,
            is_completed=True
        ).count()
        stats.total_points = UserTaskProgress.objects.filter(
            user=user,
            is_completed=True
        ).aggregate(total=Sum('points_earned'))['total'] or 0
        stats.last_task_completed_at = timezone.now()
        stats.save()
        
        # به‌روزرسانی تداوم
        streak, _ = UserStreak.objects.get_or_create(user=user)
        streak.update_streak()
        
        # بررسی دستاوردها
        self.check_achievements(user, task)
        
        serializer = UserTaskProgressSerializer(progress)
        return Response(serializer.data)
    
    def check_achievements(self, user, task):
        """بررسی دستاوردهای جدید"""
        # دستاورد تکمیل اولین تمرین
        if UserTaskProgress.objects.filter(user=user, is_completed=True).count() == 1:
            achievement = Achievement.objects.filter(
                criteria_type='tasks_completed',
                target_value=1
            ).first()
            if achievement and not UserAchievement.objects.filter(user=user, achievement=achievement).exists():
                UserAchievement.objects.create(
                    user=user,
                    achievement=achievement,
                    points_earned=achievement.points_reward
                )
        
        # دستاورد تداوم
        streak = UserStreak.objects.filter(user=user).first()
        if streak:
            # تداوم ۷ روزه
            if streak.current_streak == 7:
                achievement = Achievement.objects.filter(
                    criteria_type='streak_days',
                    target_value=7
                ).first()
                if achievement and not UserAchievement.objects.filter(user=user, achievement=achievement).exists():
                    UserAchievement.objects.create(
                        user=user,
                        achievement=achievement,
                        points_earned=achievement.points_reward
                    )
            
            # تداوم ۳۰ روزه
            if streak.current_streak == 30:
                achievement = Achievement.objects.filter(
                    criteria_type='streak_days',
                    target_value=30
                ).first()
                if achievement and not UserAchievement.objects.filter(user=user, achievement=achievement).exists():
                    UserAchievement.objects.create(
                        user=user,
                        achievement=achievement,
                        points_earned=achievement.points_reward
                    )

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    """ویو ست دستاوردها"""
    
    serializer_class = AchievementSerializer
    
    def get_queryset(self):
        user = self.request.user
        show_hidden = self.request.query_params.get('show_hidden', 'false') == 'true'
        
        queryset = Achievement.objects.filter(is_active=True)
        if not show_hidden:
            queryset = queryset.filter(is_hidden=False)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def my_achievements(self, request):
        """دریافت دستاوردهای کاربر"""
        achievements = UserAchievement.objects.filter(user=request.user)
        serializer = UserAchievementSerializer(achievements, many=True)
        return Response(serializer.data)

class UserStatsViewSet(viewsets.GenericViewSet):
    """ویو ست آمار کاربر"""
    
    permission_classes = [permissions.is_authenticated]
    
    @action(detail=False, methods=['get'])
    def dashboard(self, request):
        """دریافت آمار داشبورد"""
        user = request.user
        
        # آمار پایه
        stats, _ = UserStats.objects.get_or_create(user=user)
        
        # ثبت‌نام‌های فعال
        active_enrollments = UserPathEnrollment.objects.filter(
            user=user,
            is_active=True,
            completed_at__isnull=True
        ).count()
        
        # مسیرهای تکمیل شده
        completed_paths = UserPathEnrollment.objects.filter(
            user=user,
            completed_at__isnull=False
        ).count()
        
        # تداوم
        streak, _ = UserStreak.objects.get_or_create(user=user)
        
        # تمرین‌های امروز
        today = timezone.now().date()
        today_tasks = UserTaskProgress.objects.filter(
            user=user,
            completed_at__date=today
        ).count()
        
        # هفته جاری
        week_start = today - timezone.timedelta(days=today.weekday())
        week_tasks = UserTaskProgress.objects.filter(
            user=user,
            completed_at__date__gte=week_start
        ).count()
        
        data = {
            'stats': UserStatsSerializer(stats).data,
            'streak': {
                'current': streak.current_streak,
                'longest': streak.longest_streak,
                'last_activity': streak.last_activity_date
            },
            'summary': {
                'active_enrollments': active_enrollments,
                'completed_paths': completed_paths,
                'today_tasks': today_tasks,
                'week_tasks': week_tasks,
                'total_learning_hours': stats.total_learning_time
            }
        }
        
        return Response(data)

class NotificationViewSet(viewsets.ModelViewSet):
    """ویو ست اعلان‌ها"""
    
    serializer_class = NotificationSerializer
    permission_classes = [permissions.is_authenticated]
    
    def get_queryset(self):
        return Notification.objects.filter(
            user=self.request.user
        ).order_by('-created_at')
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def unread_count(self, request):
        """تعداد اعلان‌های خوانده نشده"""
        count = self.get_queryset().filter(is_read=False).count()
        return Response({'count': count})
    
    @action(detail=False, methods=['post'])
    def mark_all_as_read(self, request):
        """علامت‌گذاری همه اعلان‌ها به عنوان خوانده شده"""
        self.get_queryset().filter(is_read=False).update(
            is_read=True,
            read_at=timezone.now()
        )
        return Response({'status': 'success'})

