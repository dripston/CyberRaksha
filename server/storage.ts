import {
  users,
  courses,
  userProgress,
  badges,
  userBadges,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type UserProgress,
  type InsertUserProgress,
  type Badge,
  type InsertBadge,
  type UserBadge,
  type InsertUserBadge,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Course operations
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // User progress operations
  getUserProgress(userId: string): Promise<(UserProgress & { course: Course })[]>;
  getUserCourseProgress(userId: string, courseId: string): Promise<UserProgress | undefined>;
  updateUserProgress(userId: string, courseId: string, progress: Partial<InsertUserProgress>): Promise<UserProgress>;
  
  // Badge operations
  getBadges(): Promise<Badge[]>;
  getUserBadges(userId: string): Promise<(UserBadge & { badge: Badge })[]>;
  awardBadge(userId: string, badgeId: string): Promise<UserBadge>;
  
  // Leaderboard
  getLeaderboard(limit?: number): Promise<User[]>;
  
  // User stats update
  updateUserStats(userId: string, xpGain: number): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  // (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses);
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(courseData: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(courseData).returning();
    return course;
  }

  // User progress operations
  async getUserProgress(userId: string): Promise<(UserProgress & { course: Course })[]> {
    return await db
      .select({
        id: userProgress.id,
        userId: userProgress.userId,
        courseId: userProgress.courseId,
        completedLessons: userProgress.completedLessons,
        isCompleted: userProgress.isCompleted,
        lastAccessedAt: userProgress.lastAccessedAt,
        createdAt: userProgress.createdAt,
        course: courses,
      })
      .from(userProgress)
      .innerJoin(courses, eq(userProgress.courseId, courses.id))
      .where(eq(userProgress.userId, userId));
  }

  async getUserCourseProgress(userId: string, courseId: string): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.courseId, courseId)));
    return progress;
  }

  async updateUserProgress(userId: string, courseId: string, progressData: Partial<InsertUserProgress>): Promise<UserProgress> {
    // First try to get existing progress
    const existing = await this.getUserCourseProgress(userId, courseId);
    
    if (existing) {
      const [updated] = await db
        .update(userProgress)
        .set({ ...progressData, lastAccessedAt: new Date() })
        .where(and(eq(userProgress.userId, userId), eq(userProgress.courseId, courseId)))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userProgress)
        .values({ userId, courseId, ...progressData })
        .returning();
      return created;
    }
  }

  // Badge operations
  async getBadges(): Promise<Badge[]> {
    return await db.select().from(badges);
  }

  async getUserBadges(userId: string): Promise<(UserBadge & { badge: Badge })[]> {
    return await db
      .select({
        id: userBadges.id,
        userId: userBadges.userId,
        badgeId: userBadges.badgeId,
        earnedAt: userBadges.earnedAt,
        badge: badges,
      })
      .from(userBadges)
      .innerJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, userId))
      .orderBy(desc(userBadges.earnedAt));
  }

  async awardBadge(userId: string, badgeId: string): Promise<UserBadge> {
    const [userBadge] = await db
      .insert(userBadges)
      .values({ userId, badgeId })
      .returning();
    return userBadge;
  }

  // Leaderboard
  async getLeaderboard(limit: number = 10): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .orderBy(desc(users.xp))
      .limit(limit);
  }

  // User stats update
  async updateUserStats(userId: string, xpGain: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    const newXp = user.xp + xpGain;
    const newLevel = Math.floor(newXp / 500) + 1; // 500 XP per level
    let newRank = user.rank;

    // Update rank based on XP
    if (newXp >= 2000) newRank = "Diamond";
    else if (newXp >= 1500) newRank = "Platinum";
    else if (newXp >= 1000) newRank = "Gold";
    else if (newXp >= 500) newRank = "Silver";
    else newRank = "Bronze";

    const [updatedUser] = await db
      .update(users)
      .set({
        xp: newXp,
        level: newLevel,
        rank: newRank,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    return updatedUser;
  }
}

export const storage = new DatabaseStorage();
