import { useEffect, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import ProfileCard from "@/components/ProfileCard";
import CourseCard from "@/components/CourseCard";
import ProgressBar from "@/components/ProgressBar";
import BadgeDisplay from "@/components/BadgeDisplay";
import QuickActions from "@/components/QuickActions";
import { motion } from "framer-motion";
import { Course, UserProgress, Badge } from "@shared/schema";

// Mock courses data - All 6 courses
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
    totalLessons: 5,
    xpPerLesson: 50,
    icon: "🔒",
    createdAt: new Date()
  },
  {
    id: "social-media-safety-course",
    title: "Social Media Safety",
    description: "Navigate social media platforms safely and protect your privacy online.",
    difficulty: "beginner",
    totalLessons: 5,
    xpPerLesson: 50,
    icon: "📱",
    createdAt: new Date()
  },
  {
    id: "email-security-course",
    title: "Email Security",
    description: "Master email security to avoid phishing attacks and protect sensitive information.",
    difficulty: "beginner",
    totalLessons: 5,
    xpPerLesson: 50,
    icon: "📧",
    createdAt: new Date()
  },
  {
    id: "public-wifi-security-course",
    title: "Public WiFi Security",
    description: "Stay safe when using public WiFi networks and protect your data.",
    difficulty: "beginner",
    totalLessons: 5,
    xpPerLesson: 50,
    icon: "📶",
    createdAt: new Date()
  },
  {
    id: "mobile-device-security-course",
    title: "Mobile Device Security",
    description: "Secure your mobile devices and protect your data on the go.",
    difficulty: "beginner",
    totalLessons: 5,
    xpPerLesson: 50,
    icon: "📱",
    createdAt: new Date()
  }
];

export default function Dashboard() {
  const { toast } = useToast();
  const { profile: authProfile, isLoading } = useAuth();
  
  // Get fresh profile from localStorage on every render and add 300 XP
  const profile = useMemo(() => {
    try {
      const profileData = localStorage.getItem('cyberRakshaProfile');
      if (profileData) {
        const parsedProfile = JSON.parse(profileData);
        // Update XP and level
        const updatedXP = (parsedProfile.xp || 0) + 300;
        const updatedLevel = Math.floor(updatedXP / 500) + 1;
        const updatedRank = updatedXP >= 1500 ? 'Silver' : updatedXP >= 500 ? 'Bronze' : 'Basic';
        
        const updatedProfile = {
          ...parsedProfile,
          xp: updatedXP,
          level: updatedLevel,
          rank: updatedRank
        };
        
        // Save updated profile to localStorage
        localStorage.setItem('cyberRakshaProfile', JSON.stringify(updatedProfile));
        return updatedProfile;
      }
    } catch (error) {
      console.error('Error parsing profile from localStorage:', error);
    }
    return authProfile ? {
      ...authProfile,
      xp: (authProfile.xp || 0) + 300,
      level: Math.floor(((authProfile.xp || 0) + 300) / 500) + 1,
      rank: ((authProfile.xp || 0) + 300) >= 1500 ? 'Silver' : ((authProfile.xp || 0) + 300) >= 500 ? 'Bronze' : 'Basic'
    } : null;
  }, [authProfile]);

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

  // Remove backend API call - only use localStorage
  const userProgress: (UserProgress & { course: Course })[] = [];
  const progressLoading = false;

  // Remove backend API call - only use localStorage
  const userBadges: any[] = [];
  const badgesLoading = false;

  // Create frontend-only leaderboard that includes current user with updated XP
  const leaderboard = useMemo(() => {
    const mockLeaderboard = [
      { id: '1', username: 'Alice', xp: 1250, level: 3, rank: 'Silver', position: 1 },
      { id: '2', username: 'Bob', xp: 875, level: 2, rank: 'Bronze', position: 2 },
      { id: '3', username: 'Charlie', xp: 650, level: 2, rank: 'Bronze', position: 3 },
    ];

    if (profile?.username) {
      // Add current user to leaderboard with updated XP
      const currentUser = {
        id: profile.username,
        username: profile.username,
        xp: profile.xp || 0,
        level: profile.level || 1,
        rank: profile.rank || 'Bronze',
        position: 0
      };

      // Remove existing entry if present and add updated one
      const filteredBoard = mockLeaderboard.filter(user => user.username !== profile.username);
      const fullBoard = [...filteredBoard, currentUser];
      
      // Sort by XP and assign positions
      const sortedBoard = fullBoard.sort((a, b) => (b.xp || 0) - (a.xp || 0));
      return sortedBoard.map((user, index) => ({ ...user, position: index + 1 }));
    }

    return mockLeaderboard;
  }, [profile]);

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-text font-mono">Loading...</div>
      </div>
    );
  }

  const getProgressForCourse = (courseId: string) => {
    // Only use localStorage for course progress
    try {
      const progressKey = `course_progress_${courseId}`;
      const savedProgress = localStorage.getItem(progressKey);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        const course = courses.find(c => c.id === courseId);
        return course ? ((progress.completedLessons || 0) / (course.totalLessons || 1)) * 100 : 0;
      }
    } catch (error) {
      console.error('Error getting course progress:', error);
    }
    
    // Return 0 if no progress found in localStorage
    return 0;
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
                <div className="space-y-4">
                  {leaderboard.slice(0, 10).map((user, index) => (
                    <div key={user.id} className={`flex items-center justify-between p-3 rounded-lg ${
                      user.username === profile?.username ? 'bg-cyber-accent/20 border border-cyber-accent' : 'bg-cyber-dark'
                    }`}>
                      <div className="flex items-center space-x-4">
                        <span className={`text-lg font-mono font-bold ${
                          index === 0 ? 'text-yellow-400' : 
                          index === 1 ? 'text-gray-300' : 
                          index === 2 ? 'text-amber-600' : 'text-cyber-accent'
                        }`}>
                          #{user.position}
                        </span>
                        <span className={`font-mono ${
                          user.username === profile?.username ? 'text-cyber-accent font-bold' : 'text-cyber-text'
                        }`}>
                          {user.username}
                          {user.username === profile?.username && ' (You)'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-cyber-muted text-sm font-mono">{user.rank}</span>
                        <span className="text-cyber-neon font-mono">{user.xp} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
