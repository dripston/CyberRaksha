import { useEffect } from "react";
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

interface DashboardData {
  courses: Course[];
  userProgress: (UserProgress & { course: Course })[];
  userBadges: any[];
  leaderboard: any[];
}

export default function Dashboard() {
  const { toast } = useToast();
  const { profile, isLoading } = useAuth();

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

  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    enabled: !!profile,
    retry: false,
  });

  const { data: userProgress = [], isLoading: progressLoading } = useQuery<(UserProgress & { course: Course })[]>({
    queryKey: ["/api/user/progress"],
    enabled: !!profile,
    retry: false,
  });

  const { data: userBadges = [], isLoading: badgesLoading } = useQuery<any[]>({
    queryKey: ["/api/user/badges"],
    enabled: !!profile,
    retry: false,
  });

  const { data: leaderboard = [] } = useQuery<any[]>({
    queryKey: ["/api/leaderboard"],
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
              
              {coursesLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="cyber-card p-6 animate-pulse">
                      <div className="h-4 bg-cyber-light rounded mb-4"></div>
                      <div className="h-3 bg-cyber-light rounded mb-2"></div>
                      <div className="h-3 bg-cyber-light rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
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
