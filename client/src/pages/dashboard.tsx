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
import { isUnauthorizedError } from "@/lib/authUtils";
import { motion } from "framer-motion";
import { Course, User, UserProgress, Badge } from "@shared/schema";

interface DashboardData {
  courses: Course[];
  userProgress: (UserProgress & { course: Course })[];
  userBadges: any[];
  leaderboard: User[];
}

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: userProgress = [], isLoading: progressLoading } = useQuery<(UserProgress & { course: Course })[]>({
    queryKey: ["/api/user/progress"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: userBadges = [], isLoading: badgesLoading } = useQuery<any[]>({
    queryKey: ["/api/user/badges"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: leaderboard = [] } = useQuery<User[]>({
    queryKey: ["/api/leaderboard"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-text font-pixel">Loading...</div>
      </div>
    );
  }

  const getProgressForCourse = (courseId: string) => {
    const progress = userProgress.find((p) => p.courseId === courseId);
    return progress ? ((progress.completedLessons || 0) / (progress.course.totalLessons || 1)) * 100 : 0;
  };

  const nextLevelXP = (user?.level || 1) * 500;
  const currentLevelXP = ((user?.level || 1) - 1) * 500;
  const progressToNext = ((user?.xp || 0) - currentLevelXP) / (nextLevelXP - currentLevelXP) * 100;

  return (
    <div className="min-h-screen bg-cyber-bg text-cyber-text">
      <Header user={user} />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Profile Card Sidebar */}
          <div className="lg:col-span-1">
            <ProfileCard user={user} userBadges={userBadges} />
          </div>
          
          {/* Main Dashboard Content */}
          <div className="lg:col-span-3">
            
            {/* Welcome Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="cyber-card p-8 mb-12"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-mono text-2xl text-cyber-secondary mb-3 font-bold">
                    Welcome Back, Warrior!
                  </h2>
                  <p className="text-cyber-muted text-lg leading-relaxed">
                    Continue your cyber safety journey and level up your skills.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-gradient-to-br from-cyber-primary via-cyber-accent to-cyber-neon rounded-2xl flex items-center justify-center animate-pulse-slow">
                    <span className="text-3xl">🎮</span>
                  </div>
                </div>
              </div>
              
              {/* XP Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-sm text-cyber-accent font-medium">
                    XP Progress to Level {(user?.level || 1) + 1}
                  </span>
                  <span className="text-base text-cyber-muted font-medium">
                    {user?.xp || 0} / {nextLevelXP} XP
                  </span>
                </div>
                <ProgressBar progress={progressToNext} />
                <div className="text-sm text-cyber-muted mt-2">
                  {nextLevelXP - (user?.xp || 0)} XP needed for next level
                </div>
              </div>
            </motion.div>
            
            {/* Active Courses */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-mono text-xl text-cyber-secondary font-bold">Active Courses</h2>
                <button className="text-base text-cyber-accent hover:text-cyber-neon transition-colors font-medium">
                  View All Courses →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {coursesLoading ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="cyber-card p-8 animate-pulse">
                      <div className="h-40 bg-cyber-light rounded-lg mb-6"></div>
                      <div className="h-5 bg-cyber-light rounded mb-3"></div>
                      <div className="h-4 bg-cyber-light rounded mb-6"></div>
                      <div className="h-3 bg-cyber-light rounded"></div>
                    </div>
                  ))
                ) : (
                  courses.map((course, index: number) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                      <CourseCard 
                        course={course} 
                        progress={getProgressForCourse(course.id)}
                      />
                    </motion.div>
                  ))
                )}
              </div>
            </div>
            
            {/* Achievement Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Weekly Challenge */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="retro-card rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-pixel text-sm text-cyber-yellow">Weekly Challenge</h3>
                  <div className="text-2xl animate-bounce-slow">🏆</div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-cyber-text mb-2">Password Security Master</h4>
                  <p className="text-xs text-cyber-muted mb-3">Complete 5 password-related lessons this week</p>
                  
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-cyber-muted">Progress</span>
                    <span className="text-xs text-cyber-green font-bold">3/5</span>
                  </div>
                  <ProgressBar progress={60} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cyber-yellow">Reward: +100 XP & Badge</span>
                  <span className="text-xs text-cyber-muted">3 days left</span>
                </div>
              </motion.div>
              
              {/* Leaderboard Preview */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="retro-card rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-pixel text-sm text-cyber-yellow">Leaderboard</h3>
                  <button className="text-xs text-cyber-green hover:text-cyber-yellow transition-colors">
                    View All →
                  </button>
                </div>
                
                <div className="space-y-3">
                  {leaderboard.slice(0, 3).map((player, index: number) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded flex items-center justify-center ${
                          index === 0 ? 'bg-cyber-yellow' : 'bg-cyber-muted'
                        }`}>
                          <span className="font-pixel text-xs text-cyber-bg">{index + 1}</span>
                        </div>
                        <span className={`text-sm ${
                          player.id === user?.id ? 'text-cyber-text font-bold' : 'text-cyber-text'
                        }`}>
                          {player.firstName || player.id === user?.id ? 'You' : `Player ${index + 1}`}
                        </span>
                      </div>
                      <span className="text-xs text-cyber-green font-bold">{player.xp || 0} XP</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <QuickActions />
            </motion.div>
            
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-cyber-dark border-t border-cyber-light mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-pixel text-cyber-yellow text-sm mb-2">CyberRaksha</div>
            <p className="text-cyber-muted text-xs">Building a safer digital future, one lesson at a time.</p>
            <div className="mt-4 text-xs text-cyber-muted">
              Made with ❤️ for cyber safety education in India
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
