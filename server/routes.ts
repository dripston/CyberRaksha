import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCourseSchema, insertUserProgressSchema } from "@shared/schema";
import { db } from "./db";
import { users, userProgress, courses, badges, userBadges } from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize default data
  await initializeDefaultData();

  // Progress routes (inline)
  const updateXPSchema = z.object({
    courseId: z.string(),
    lessonXP: z.number().min(1),
    lessonNumber: z.number().min(1),
    isLessonComplete: z.boolean(),
    isCourseComplete: z.boolean().optional(),
  });

  app.post('/api/progress/update-xp', async (req, res) => {
    try {
      const { userId, courseId, lessonXP, lessonNumber, isLessonComplete, isCourseComplete } = req.body;
      
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      // Validate input
      const parsed = updateXPSchema.safeParse({
        courseId,
        lessonXP,
        lessonNumber,
        isLessonComplete,
        isCourseComplete
      });

      if (!parsed.success) {
        return res.status(400).json({ error: "Invalid request data" });
      }

      // First try to find user by username (firstName field)
      let [currentUser] = await db
        .select()
        .from(users)
        .where(eq(users.firstName, userId))
        .limit(1);

      // If user doesn't exist, create them
      if (!currentUser) {
        console.log('Creating new user:', userId);
        const [newUser] = await db
          .insert(users)
          .values({
            firstName: userId,
            email: `${userId}@cyberraksha.local`,
            xp: 0,
            level: 1,
            rank: "Bronze"
          })
          .returning();
        currentUser = newUser;
      }

      // Start transaction
      await db.transaction(async (tx) => {
        // Update user's total XP
        await tx
          .update(users)
          .set({ 
            xp: (currentUser.xp || 0) + lessonXP,
            updatedAt: new Date()
          })
          .where(eq(users.id, currentUser.id));

        // Update or create user progress
        const existingProgress = await tx
          .select()
          .from(userProgress)
          .where(and(
            eq(userProgress.userId, currentUser.id),
            eq(userProgress.courseId, courseId)
          ))
          .limit(1);

        if (existingProgress.length > 0) {
          await tx
            .update(userProgress)
            .set({
              completedLessons: lessonNumber,
              isCompleted: isCourseComplete || false,
              lastAccessedAt: new Date()
            })
            .where(eq(userProgress.id, existingProgress[0].id));
        } else {
          await tx
            .insert(userProgress)
            .values({
              userId: currentUser.id,
              courseId: courseId,
              completedLessons: lessonNumber,
              isCompleted: isCourseComplete || false,
              lastAccessedAt: new Date()
            });
        }
      });

      // Return updated user data
      const updatedUserData = await db
        .select()
        .from(users)
        .where(eq(users.id, currentUser.id))
        .limit(1);

      res.json({ 
        success: true, 
        user: updatedUserData[0],
        xpGained: lessonXP 
      });

    } catch (error) {
      console.error("Error updating XP:", error);
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  app.get('/api/progress/leaderboard', async (req, res) => {
    try {
      const leaderboard = await db
        .select({
          id: users.id,
          username: users.firstName, // Use firstName as username
          firstName: users.firstName,
          lastName: users.lastName,
          profileImageUrl: users.profileImageUrl,
          xp: users.xp,
          level: users.level,
          rank: users.rank
        })
        .from(users)
        .orderBy(desc(users.xp))
        .limit(50);

      const leaderboardWithPositions = leaderboard.map((user, index) => ({
        ...user,
        position: index + 1
      }));

      res.json(leaderboardWithPositions);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

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

  // Get all user progress
  app.get('/api/user/progress', async (req, res) => {
    try {
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const userProgress = await storage.getUserProgress(userId);
      res.json(userProgress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  app.post('/api/user/progress/:courseId', async (req, res) => {
    try {
      const { courseId } = req.params;
      const { userId, completedLessons, isCompleted } = req.body;
      
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const progress = await storage.updateUserProgress({
        userId,
        courseId,
        completedLessons,
        isCompleted
      });
      
      res.json(progress);
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
      const userId = req.query.userId as string;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const userBadges = await storage.getUserBadges(userId);
      res.json(userBadges);
    } catch (error) {
      console.error("Error fetching user badges:", error);
      res.status(500).json({ message: "Failed to fetch user badges" });
    }
  });

  // Leaderboard route
  app.get('/api/leaderboard', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 50;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
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
    // Check if the specific course exists in database
    const existingCourses = await db.select().from(courses);
    console.log('Existing courses in DB:', existingCourses.length);
    
    if (existingCourses.length === 0) {
      console.log('Creating default courses...');
      // Create the specific course that the frontend expects
      await db.insert(courses).values({
        id: "upi-payments-course", // Match frontend expected ID
        title: "Safe UPI Payments",
        description: "Master the art of secure digital payments in India's UPI ecosystem.",
        difficulty: "beginner",
        xpPerLesson: 50,
        totalLessons: 6,
        icon: "🎯",
      });

      // Create additional courses
      await db.insert(courses).values([
        {
          id: "password-security-course",
          title: "Password Security Fundamentals",
          description: "Learn the basics of creating and managing secure passwords.",
          difficulty: "beginner",
          xpPerLesson: 50,
          totalLessons: 8,
          icon: "🔒",
        },
        {
          id: "phishing-detection-course",
          title: "Phishing Detection & Prevention", 
          description: "Master the skills to identify and avoid phishing attacks.",
          difficulty: "intermediate",
          xpPerLesson: 75,
          totalLessons: 12,
          icon: "🎣",
        }
      ]);
      
      console.log('✅ Default courses created successfully');
    }

    // Check if badges already exist
    const existingBadges = await db.select().from(badges);
    if (existingBadges.length === 0) {
      console.log('Creating default badges...');
      // Create default badges
      await db.insert(badges).values([
        {
          id: "first-steps",
          name: "First Steps",
          description: "Welcome to CyberRaksha!",
          icon: "⭐",
          color: "cyber-yellow",
        },
        {
          id: "xp-warrior",
          name: "XP Warrior",
          description: "Earned 200+ XP",
          icon: "⚡",
          color: "cyber-blue",
        },
        {
          id: "cyber-guardian",
          name: "Cyber Guardian",
          description: "Earned 500+ XP",
          icon: "🛡️",
          color: "cyber-green",
        },
        {
          id: "course-master",
          name: "Course Master",
          description: "Completed your first course",
          icon: "🔥",
          color: "cyber-red",
        },
      ]);
      console.log('✅ Default badges created successfully');
    }
  } catch (error) {
    console.error("Error initializing default data:", error);
  }
}
