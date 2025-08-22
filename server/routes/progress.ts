import { Router } from "express";
import { db } from "../db";
import { users, userProgress, courses, badges, userBadges } from "@shared/schema";
import { eq, desc, and } from "drizzle-orm";
import { z } from "zod";

const router = Router();

// Schema for XP update requests
const updateXPSchema = z.object({
  courseId: z.string(),
  lessonXP: z.number().min(1),
  lessonNumber: z.number().min(1),
  isLessonComplete: z.boolean(),
  isCourseComplete: z.boolean().optional(),
});

// Get user progress for a specific course
router.get("/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const progress = await db
      .select()
      .from(userProgress)
      .where(and(
        eq(userProgress.userId, userId as string),
        eq(userProgress.courseId, courseId)
      ))
      .limit(1);

    res.json(progress[0] || null);
  } catch (error) {
    console.error("Error fetching course progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

// Update user XP and course progress
router.post("/update-xp", async (req, res) => {
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

    // Get current user
    const [currentUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Start transaction
    await db.transaction(async (tx) => {
      // Update user's total XP
      const updatedUser = await tx
        .update(users)
        .set({ 
          xp: (currentUser.xp || 0) + lessonXP,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId))
        .returning();

      // Update or create user progress
      const existingProgress = await tx
        .select()
        .from(userProgress)
        .where(and(
          eq(userProgress.userId, userId),
          eq(userProgress.courseId, courseId)
        ))
        .limit(1);

      if (existingProgress.length > 0) {
        // Update existing progress
        await tx
          .update(userProgress)
          .set({
            completedLessons: lessonNumber,
            isCompleted: isCourseComplete || false,
            lastAccessedAt: new Date()
          })
          .where(eq(userProgress.id, existingProgress[0].id));
      } else {
        // Create new progress record
        await tx
          .insert(userProgress)
          .values({
            userId: userId,
            courseId: courseId,
            completedLessons: lessonNumber,
            isCompleted: isCourseComplete || false,
            lastAccessedAt: new Date()
          });
      }

      // Award badges based on achievements
      const totalXP = updatedUser[0].xp;
      await awardBadges(tx, userId, totalXP, isCourseComplete);
    });

    // Return updated user data
    const updatedUserData = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
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

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await db
      .select({
        id: users.id,
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

    // Add position to each user
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

// Get user badges
router.get("/badges/:userId?", async (req, res) => {
  try {
    const userId = req.params.userId || req.query.userId;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const userBadgesList = await db
      .select({
        badge: badges,
        earnedAt: userBadges.earnedAt
      })
      .from(userBadges)
      .innerJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, userId as string))
      .orderBy(desc(userBadges.earnedAt));

    res.json(userBadgesList);
  } catch (error) {
    console.error("Error fetching user badges:", error);
    res.status(500).json({ error: "Failed to fetch badges" });
  }
});

// Helper function to award badges based on achievements
async function awardBadges(tx: any, userId: string, totalXP: number, courseCompleted?: boolean) {
  const existingBadges = await tx
    .select({ badgeId: userBadges.badgeId })
    .from(userBadges)
    .where(eq(userBadges.userId, userId));

  const existingBadgeIds = existingBadges.map((b: any) => b.badgeId);

  // Define badge criteria
  const badgeAwards = [];

  // XP-based badges
  if (totalXP >= 50 && !existingBadgeIds.includes("first-steps")) {
    badgeAwards.push({ userId, badgeId: "first-steps" });
  }
  if (totalXP >= 200 && !existingBadgeIds.includes("xp-warrior")) {
    badgeAwards.push({ userId, badgeId: "xp-warrior" });
  }
  if (totalXP >= 500 && !existingBadgeIds.includes("cyber-guardian")) {
    badgeAwards.push({ userId, badgeId: "cyber-guardian" });
  }

  // Course completion badge
  if (courseCompleted && !existingBadgeIds.includes("course-master")) {
    badgeAwards.push({ userId, badgeId: "course-master" });
  }

  // Award new badges
  if (badgeAwards.length > 0) {
    await tx.insert(userBadges).values(badgeAwards);
  }
}

// Initialize default badges
router.post("/init-badges", async (req, res) => {
  try {
    const defaultBadges = [
      {
        id: "first-steps",
        name: "First Steps",
        description: "Earned your first 50 XP",
        icon: "🚀",
        color: "cyber-accent"
      },
      {
        id: "xp-warrior",
        name: "XP Warrior", 
        description: "Reached 200 total XP",
        icon: "⚔️",
        color: "cyber-orange"
      },
      {
        id: "cyber-guardian",
        name: "Cyber Guardian",
        description: "Reached 500 total XP", 
        icon: "🛡️",
        color: "cyber-neon"
      },
      {
        id: "course-master",
        name: "Course Master",
        description: "Completed your first course",
        icon: "🎓",
        color: "cyber-yellow"
      }
    ];

    await db.insert(badges).values(defaultBadges).onConflictDoNothing();
    res.json({ success: true, message: "Badges initialized" });
  } catch (error) {
    console.error("Error initializing badges:", error);
    res.status(500).json({ error: "Failed to initialize badges" });
  }
});

export default router;
