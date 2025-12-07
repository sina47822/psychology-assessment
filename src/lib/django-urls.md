# urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'paths', views.LearningPathViewSet, basename='path')
router.register(r'achievements', views.AchievementViewSet, basename='achievement')
router.register(r'notifications', views.NotificationViewSet, basename='notification')
router.register(r'stats', views.UserStatsViewSet, basename='stats')

urlpatterns = [
    path('', include(router.urls)),
    
    # مسیرهای تو در تو
    path(
        'paths/<slug:path_slug>/weeks/',
        views.WeeklyModuleViewSet.as_view({'get': 'list'}),
        name='path-weeks'
    ),
    path(
        'paths/<slug:path_slug>/weeks/<int:pk>/',
        views.WeeklyModuleViewSet.as_view({'get': 'retrieve'}),
        name='week-detail'
    ),
    path(
        'paths/<slug:path_slug>/weeks/<int:pk>/tasks/',
        views.WeeklyModuleViewSet.as_view({'get': 'daily_tasks'}),
        name='week-tasks'
    ),
    
    # تمرین‌ها
    path(
        'weeks/<int:week_id>/tasks/',
        views.DailyTaskViewSet.as_view({'get': 'list'}),
        name='week-tasks-list'
    ),
    path(
        'weeks/<int:week_id>/tasks/<int:pk>/',
        views.DailyTaskViewSet.as_view({'get': 'retrieve'}),
        name='task-detail'
    ),
    path(
        'weeks/<int:week_id>/tasks/<int:pk>/submit/',
        views.DailyTaskViewSet.as_view({'post': 'submit'}),
        name='task-submit'
    ),
]