import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCourseSchema, insertUserProgressSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize default data
  await initializeDefaultData();

  // Course routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // User progress routes (using profile ID from query params)
  app.get('/api/user/progress', async (req, res) => {
    try {
      const profileId = req.query.profileId as string;
      if (!profileId) {
        return res.status(400).json({ message: "Profile ID is required" });
      }
      
      // For now, return empty progress since we're using client-side profiles
      res.json([]);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.post('/api/user/progress/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params;
      const { profileId, progressData } = req.body;
      
      if (!profileId) {
        return res.status(400).json({ message: "Profile ID is required" });
      }

      // For now, return success since we're using client-side profiles
      res.json({ 
        courseId, 
        profileId, 
        completedLessons: progressData?.completedLessons || 0,
        isCompleted: progressData?.isCompleted || false
      });
    } catch (error) {
      console.error("Error updating user progress:", error);
      res.status(500).json({ message: "Failed to update user progress" });
    }
  });

  // Badge routes
  app.get('/api/badges', async (req, res) => {
    try {
      const badges = await storage.getBadges();
      res.json(badges);
    } catch (error) {
      console.error("Error fetching badges:", error);
      res.status(500).json({ message: "Failed to fetch badges" });
    }
  });

  app.get('/api/user/badges', async (req, res) => {
    try {
      const profileId = req.query.profileId as string;
      if (!profileId) {
        return res.status(400).json({ message: "Profile ID is required" });
      }
      
      // For now, return empty badges since we're using client-side profiles
      res.json([]);
    } catch (error) {
      console.error("Error fetching user badges:", error);
      res.status(500).json({ message: "Failed to fetch user badges" });
    }
  });

  // Leaderboard route
  app.get('/api/leaderboard', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      // For now, return empty leaderboard since we're using client-side profiles
      res.json([]);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function initializeDefaultData() {
  try {
    // Check if courses already exist
    const existingCourses = await storage.getCourses();
    if (existingCourses.length === 0) {
      // Create default courses
      await storage.createCourse({
        title: "Safe UPI Payments",
        description: "Learn secure digital payment practices and fraud prevention.",
        difficulty: "Beginner",
        xpPerLesson: 25,
        totalLessons: 5,
        icon: "🏦🔒",
      });

      await storage.createCourse({
        title: "Spot the Phishing Scam",
        description: "Identify and avoid email scams and fraudulent messages.",
        difficulty: "Intermediate",
        xpPerLesson: 40,
        totalLessons: 6,
        icon: "📧⚠️",
      });

      await storage.createCourse({
        title: "Social Media Safety",
        description: "Master privacy settings and secure social networking.",
        difficulty: "Advanced",
        xpPerLesson: 60,
        totalLessons: 7,
        icon: "📱🛡️",
      });
    }

    // Check if badges already exist
    const existingBadges = await storage.getBadges();
    if (existingBadges.length === 0) {
      // Create default badges
      const badges = [
        {
          name: "First Login",
          description: "Welcome to CyberRaksha!",
          icon: "⭐",
          color: "cyber-yellow",
        },
        {
          name: "Cyber Guardian",
          description: "Completed your first course",
          icon: "🛡️",
          color: "cyber-blue",
        },
        {
          name: "Quiz Master",
          description: "Scored 100% on 5 quizzes",
          icon: "🔥",
          color: "cyber-red",
        },
        {
          name: "Streak Warrior",
          description: "Maintained a 7-day learning streak",
          icon: "⚡",
          color: "cyber-green",
        },
        {
          name: "Knowledge Seeker",
          description: "Completed 3 different courses",
          icon: "📚",
          color: "cyber-yellow",
        },
      ];

      for (const badge of badges) {
        await storage.createBadge(badge);
      }
    }
  } catch (error) {
    console.error("Error initializing default data:", error);
  }
}
