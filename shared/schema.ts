import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  level: integer("level").default(1),
  xp: integer("xp").default(0),
  streak: integer("streak").default(0),
  rank: varchar("rank").default("Bronze"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  difficulty: varchar("difficulty").notNull(), // Beginner, Intermediate, Advanced
  xpPerLesson: integer("xp_per_lesson").default(25),
  totalLessons: integer("total_lessons").default(5),
  icon: varchar("icon").default("🎯"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  courseId: varchar("course_id").notNull().references(() => courses.id),
  completedLessons: integer("completed_lessons").default(0),
  isCompleted: boolean("is_completed").default(false),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const badges = pgTable("badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  icon: varchar("icon").notNull(),
  color: varchar("color").default("cyber-yellow"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userBadges = pgTable("user_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  badgeId: varchar("badge_id").notNull().references(() => badges.id),
  earnedAt: timestamp("earned_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;
export type Badge = typeof badges.$inferSelect;
export type InsertBadge = typeof badges.$inferInsert;
export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = typeof userBadges.$inferInsert;

export const insertCourseSchema = createInsertSchema(courses);
export const insertUserProgressSchema = createInsertSchema(userProgress);
export const insertBadgeSchema = createInsertSchema(badges);
export const insertUserBadgeSchema = createInsertSchema(userBadges);
