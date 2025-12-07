# serializers.py

from rest_framework import serializers
from .models import (
    LearningPath, LearningObjective, WeeklyModule, DailyTask,
    TaskQuestion, WeeklyChallenge, UserPathEnrollment,
    UserTaskProgress, UserWeeklyProgress, Achievement,
    UserAchievement, Reward, UserReward, Notification,
    UserStreak, UserStats
)

class LearningPathSerializer(serializers.ModelSerializer):
    """سریالایزر مسیرهای آموزشی"""
    
    objectives = serializers.StringRelatedField(many=True, read_only=True)
    enrolled_count = serializers.IntegerField(read_only=True)
    average_rating = serializers.FloatField(read_only=True)
    completion_rate = serializers.FloatField(read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = LearningPath
        fields = [
            'id', 'title', 'slug', 'description', 'long_description',
            'category', 'difficulty', 'duration_weeks', 'estimated_hours',
            'points_reward', 'cover_image', 'thumbnail', 'intro_video',
            'prerequisites', 'is_active', 'is_featured', 'is_free',
            'enrolled_count', 'average_rating', 'completion_rate',
            'created_at', 'updated_at', 'published_at',
            'objectives', 'is_enrolled', 'user_progress'
        ]
        read_only_fields = ['slug', 'created_at', 'updated_at']
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.enrollments.filter(user=request.user, is_active=True).exists()
        return False
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            enrollment = obj.enrollments.filter(user=request.user, is_active=True).first()
            if enrollment:
                return {
                    'progress_percentage': enrollment.progress_percentage,
                    'current_week': enrollment.current_week,
                    'completed_weeks': enrollment.completed_weeks,
                    'completed_at': enrollment.completed_at
                }
        return None

class WeeklyModuleSerializer(serializers.ModelSerializer):
    """سریالایزر هفته‌های آموزشی"""
    
    path_title = serializers.CharField(source='path.title', read_only=True)
    user_progress = serializers.SerializerMethodField()
    is_unlocked = serializers.SerializerMethodField()
    is_completed = serializers.SerializerMethodField()
    
    class Meta:
        model = WeeklyModule
        fields = [
            'id', 'path', 'path_title', 'week_number', 'title', 'description',
            'video_count', 'article_count', 'exercise_count', 'quiz_count',
            'prerequisite_module', 'is_unlocked_by_default', 'points_reward',
            'order', 'user_progress', 'is_unlocked', 'is_completed'
        ]
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            progress = obj.user_progress.filter(user=request.user).first()
            if progress:
                return {
                    'is_completed': progress.is_completed,
                    'completed_at': progress.completed_at,
                    'completed_tasks': progress.completed_tasks,
                    'total_tasks': progress.total_tasks,
                    'challenge_completed': progress.challenge_completed,
                    'points_earned': progress.points_earned,
                    'progress_percentage': progress.calculate_progress()
                }
        return None
    
    def get_is_unlocked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            if obj.is_unlocked_by_default:
                return True
            
            # بررسی پیش‌نیاز
            if obj.prerequisite_module:
                progress = obj.prerequisite_module.user_progress.filter(
                    user=request.user,
                    is_completed=True
                ).exists()
                return progress
            
            return True
        return False
    
    def get_is_completed(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            progress = obj.user_progress.filter(
                user=request.user,
                is_completed=True
            ).exists()
            return progress
        return False

class DailyTaskSerializer(serializers.ModelSerializer):
    """سریالایزر تمرین‌های روزانه"""
    
    week_info = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    questions = serializers.SerializerMethodField()
    
    class Meta:
        model = DailyTask
        fields = [
            'id', 'week', 'week_info', 'day_number', 'title', 'description',
            'task_type', 'content', 'video_url', 'audio_url', 'pdf_url',
            'estimated_time', 'points_reward', 'prerequisite_tasks',
            'order', 'user_progress', 'questions'
        ]
    
    def get_week_info(self, obj):
        return {
            'week_number': obj.week.week_number,
            'week_title': obj.week.title,
            'path_title': obj.week.path.title
        }
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            progress = obj.user_progress.filter(user=request.user).first()
            if progress:
                return {
                    'is_completed': progress.is_completed,
                    'completed_at': progress.completed_at,
                    'points_earned': progress.points_earned,
                    'quality_rating': progress.quality_rating,
                    'time_spent_minutes': progress.time_spent_minutes,
                    'answers': progress.answers
                }
        return None
    
    def get_questions(self, obj):
        return TaskQuestionSerializer(obj.questions.all(), many=True).data

class TaskQuestionSerializer(serializers.ModelSerializer):
    """سریالایزر سوالات تمرین"""
    
    class Meta:
        model = TaskQuestion
        fields = [
            'id', 'task', 'question', 'question_type',
            'options', 'is_required', 'order'
        ]

class UserTaskProgressSerializer(serializers.ModelSerializer):
    """سریالایزر پیشرفت کاربر در تمرین"""
    
    task_title = serializers.CharField(source='task.title', read_only=True)
    task_type = serializers.CharField(source='task.task_type', read_only=True)
    week_number = serializers.IntegerField(source='task.week.week_number', read_only=True)
    path_title = serializers.CharField(source='task.week.path.title', read_only=True)
    
    class Meta:
        model = UserTaskProgress
        fields = [
            'id', 'user', 'task', 'task_title', 'task_type',
            'week_number', 'path_title', 'is_completed',
            'completed_at', 'answers', 'points_earned',
            'quality_rating', 'started_at', 'time_spent_minutes'
        ]
        read_only_fields = ['user', 'task']

class UserPathEnrollmentSerializer(serializers.ModelSerializer):
    """سریالایزر ثبت‌نام کاربر در مسیر"""
    
    path_title = serializers.CharField(source='path.title', read_only=True)
    path_category = serializers.CharField(source='path.category', read_only=True)
    path_difficulty = serializers.CharField(source='path.difficulty', read_only=True)
    
    class Meta:
        model = UserPathEnrollment
        fields = [
            'id', 'user', 'path', 'path_title', 'path_category',
            'path_difficulty', 'is_active', 'current_week',
            'completed_weeks', 'progress_percentage',
            'completed_tasks_count', 'total_points_earned',
            'enrolled_at', 'started_at', 'completed_at',
            'last_accessed_at'
        ]
        read_only_fields = ['user']

class AchievementSerializer(serializers.ModelSerializer):
    """سریالایزر دستاوردها"""
    
    is_unlocked = serializers.SerializerMethodField()
    
    class Meta:
        model = Achievement
        fields = [
            'id', 'title', 'description', 'icon',
            'achievement_type', 'points_reward',
            'criteria_type', 'target_value', 'unit',
            'related_path', 'is_active', 'is_hidden',
            'is_unlocked'
        ]
    
    def get_is_unlocked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.users.filter(user=request.user).exists()
        return False

class UserStatsSerializer(serializers.ModelSerializer):
    """سریالایزر آمار کاربر"""
    
    username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = UserStats
        fields = [
            'id', 'user', 'username', 'total_points',
            'total_tasks_completed', 'total_paths_completed',
            'total_weeks_completed', 'total_challenges_completed',
            'total_learning_time', 'average_daily_time',
            'last_task_completed_at', 'last_path_completed_at',
            'current_level', 'points_to_next_level', 'level_progress'
        ]

class NotificationSerializer(serializers.ModelSerializer):
    """سریالایزر اعلان‌ها"""
    
    class Meta:
        model = Notification
        fields = [
            'id', 'user', 'notification_type',
            'title', 'message', 'data',
            'is_read', 'is_sent', 'created_at',
            'scheduled_for', 'read_at'
        ]
        read_only_fields = ['user', 'created_at']