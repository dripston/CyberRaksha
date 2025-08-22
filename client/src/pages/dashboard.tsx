import { useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import CourseCard from "@/components/CourseCard";
import ProgressBar from "@/components/ProgressBar";
import BadgeDisplay from "@/components/BadgeDisplay";
import QuickActions from "@/components/QuickActions";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Course, UserProgress, Badge } from "@shared/schema";

// Mock courses data - UPI Payments as the first course
const mockCourses: Course[] = [
  {
    id: "upi-payments-course",
    title: "Safe UPI Payments",
    description: "Master the art of secure digital payments in India's UPI ecosystem. Learn to identify payment methods and avoid cyber traps.",
    difficulty: "beginner",
    totalLessons: 6,
    xpPerLesson: 50,
    icon: "🎯",
    createdAt: new Date()
  },
  {
    id: "password-security-course",
    title: "Password Security Fundamentals",
    description: "Learn the basics of creating and managing secure passwords to protect your digital identity.",
    difficulty: "beginner",
    totalLessons: 8,
    xpPerLesson: 50,
    icon: "🔒",
    createdAt: new Date()
  },
  {
    id: "phishing-detection-course", 
    title: "Phishing Detection & Prevention",
    description: "Master the skills to identify and avoid phishing attacks across email, web, and social platforms.",
    difficulty: "intermediate",
    totalLessons: 12,
    xpPerLesson: 75,
    icon: "🎣",
    createdAt: new Date()
  },
  {
    id: "safe-browsing-course",
    title: "Safe Internet Browsing",
    description: "Discover best practices for secure web browsing and protecting your privacy online.",
    difficulty: "beginner",
    totalLessons: 6,
    xpPerLesson: 40,
    icon: "🌐",
    createdAt: new Date()
  },
  {
    id: "social-media-privacy-course",
    title: "Social Media Privacy",
    description: "Learn to configure privacy settings and protect your personal information on social platforms.",
    difficulty: "beginner",
    totalLessons: 10,
    xpPerLesson: 60,
    icon: "🔒",
    createdAt: new Date()
  },
  {
    id: "advanced-threats-course",
    title: "Advanced Threat Detection",
    description: "Deep dive into identifying sophisticated cyber threats and advanced persistent attacks.",
    difficulty: "advanced",
    totalLessons: 15,
    xpPerLesson: 100,
    icon: "⚠️",
    createdAt: new Date()
  }
];

export default function Dashboard() {
  const { toast } = useToast();
  const { profile, isLoading } = useAuth();

  // Use frontend courses instead of API call
  const courses = useMemo(() => mockCourses, []);
  const coursesLoading = false; // No longer loading from API

  // Redirect to profile setup if no profile
  useEffect(() => {
    if (!isLoading && !profile) {
      toast({
        title: "Profile Required",
        description: "Please set up your profile to continue...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/profile-setup";
      }, 500);
      return;
    }
  }, [profile, isLoading, toast]);

  const { data: userProgress = [], isLoading: progressLoading } = useQuery<(UserProgress & { course: Course })[]>({
    queryKey: ["/api/user/progress", profile?.id],
    queryFn: () => fetch(`/api/user/progress?userId=${profile?.id}`).then(res => res.json()),
    enabled: !!profile?.id,
    retry: false,
  });

  const { data: userBadges = [], isLoading: badgesLoading } = useQuery<any[]>({
    queryKey: ["/api/user/badges", profile?.id],
    queryFn: () => fetch(`/api/user/badges?userId=${profile?.id}`).then(res => res.json()),
    enabled: !!profile?.id,
    retry: false,
  });

  const { data: leaderboard = [] } = useQuery<any[]>({
    queryKey: ["/api/progress/leaderboard"],
    queryFn: () => fetch('/api/progress/leaderboard').then(res => res.json()),
    enabled: !!profile,
    retry: false,
  });

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-text font-mono">Loading...</div>
      </div>
    );
  }

  const getProgressForCourse = (courseId: string) => {
    const progress = userProgress.find((p) => p.courseId === courseId);
    return progress ? ((progress.completedLessons || 0) / (progress.course.totalLessons || 1)) * 100 : 0;
  };

  const nextLevelXP = (profile?.level || 1) * 500;
  const currentLevelXP = ((profile?.level || 1) - 1) * 500;
  const progressToNext = ((profile?.xp || 0) - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      <Header profile={profile} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Profile Card Sidebar */}
          <div className="lg:col-span-1">
            <ProfileCard profile={profile} userBadges={userBadges} />
          </div>
          
          {/* Main Dashboard Content */}
          <div className="lg:col-span-3">
            
            {/* Welcome Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-mono font-bold text-cyber-accent mb-4">
                Welcome back, {profile.username}! 👋
              </h1>
              <p className="text-xl text-cyber-muted">
                Ready to continue your cyber safety journey? Let's level up your skills!
              </p>
            </motion.div>

            {/* Level Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="cyber-card p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-mono font-bold text-cyber-neon">
                  Level {profile.level} • {profile.rank}
                </h2>
                <span className="text-cyber-accent font-mono">
                  {profile.xp} / {nextLevelXP} XP
                </span>
              </div>
              <ProgressBar 
                progress={progressToNext} 
                className="h-3 bg-cyber-light"
                progressClassName="bg-gradient-to-r from-cyber-primary to-cyber-accent"
              />
              <p className="text-cyber-muted mt-2">
                {nextLevelXP - profile.xp} XP needed for next level
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <QuickActions />
            </motion.div>

            {/* Courses Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-mono font-bold text-cyber-secondary">
                  Available Courses
                </h2>
                <span className="text-cyber-accent font-mono">
                  {courses.length} courses available
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    progress={getProgressForCourse(course.id)}
                    onProgressUpdate={() => {
                      // Handle progress update
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Badges Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-mono font-bold text-cyber-secondary mb-6">
                Your Badges
              </h2>
              <BadgeDisplay badges={userBadges} />
            </motion.div>

            {/* Leaderboard Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-mono font-bold text-cyber-secondary mb-6">
                Leaderboard
              </h2>
              <div className="cyber-card p-6">
                {leaderboard.length > 0 ? (
                  <div className="space-y-4">
                    {leaderboard.slice(0, 10).map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-cyber-dark">
                        <div className="flex items-center space-x-4">
                          <span className={`text-lg font-mono font-bold ${
                            index === 0 ? 'text-yellow-400' : 
                            index === 1 ? 'text-gray-300' : 
                            index === 2 ? 'text-amber-600' : 'text-cyber-accent'
                          }`}>
                            #{index + 1}
                          </span>
                          <span className="text-cyber-text font-mono">{user.username || 'Anonymous'}</span>
                        </div>
                        <span className="text-cyber-neon font-mono">{user.xp || 0} XP</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-cyber-muted text-center py-8">
                    No leaderboard data available yet. Be the first to earn XP!
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}