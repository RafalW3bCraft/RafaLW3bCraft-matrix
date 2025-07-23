import {
  users,
  blogPosts,
  contactMessages,
  analytics,
  githubProjects,
  messages,
  moderationLogs,
  notifications,
  audioPlayLogs,
  auditLogs,
  failedLoginAttempts,
  systemHealth,
  type User,
  type UpsertUser,
  type BlogPost,
  type InsertBlogPost,
  type ContactMessage,
  type InsertContactMessage,
  type Analytics,
  type InsertAnalytics,
  type GithubProject,
  type Message,
  type InsertMessage,
  type InsertAudioPlayLog,
  type AudioPlayLog,
  type InsertAuditLog,
  type AuditLog,
  type InsertFailedLoginAttempt,
  type FailedLoginAttempt,
  type InsertSystemHealth,
  type SystemHealth,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, gt, lt, and } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Blog operations
  getAllBlogPosts(published?: boolean): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  incrementBlogPostViews(slug: string): Promise<void>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  deleteContactMessage(id: number): Promise<void>;
  
  // Analytics operations
  recordAnalytics(data: InsertAnalytics): Promise<Analytics>;
  getAnalyticsStats(): Promise<{
    totalViews: number;
    totalPosts: number;
    totalMessages: number;
  }>;
  
  // GitHub projects operations
  getGithubProjects(): Promise<GithubProject[]>;
  upsertGithubProject(project: Omit<GithubProject, 'id'>): Promise<GithubProject>;
  
  // Message operations
  getUserMessages(userId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Admin operations
  getAdminUser(): Promise<User | null>;
  getUserByProviderId(provider: string, providerId: string): Promise<User | undefined>;
  
  // Falcon Protocol operations
  logAudioPlay(userId: string, audioType: string, sessionId?: string): Promise<AudioPlayLog>;
  hasAudioBeenPlayed(userId: string, audioType: string, sessionId?: string): Promise<boolean>;
  createAuditLog(auditData: InsertAuditLog): Promise<AuditLog>;
  getAuditLogs(limit?: number): Promise<AuditLog[]>;
  getAuditLogsByUser(userId: string, limit?: number): Promise<AuditLog[]>;
  logFailedLoginAttempt(attemptData: InsertFailedLoginAttempt): Promise<FailedLoginAttempt>;
  getRecentFailedLogins(hours: number): Promise<FailedLoginAttempt[]>;
  logSystemHealth(metricType: string, metricName: string, value: any, status?: string): Promise<SystemHealth>;
  getSystemHealthMetrics(metricType?: string, hours?: number): Promise<SystemHealth[]>;
  
  // Maintenance operations
  cleanupOldAnalytics(cutoffDate: Date): Promise<void>;
  cleanupOldModerationLogs(cutoffDate: Date): Promise<void>;
  getRecentModerationLogs(hours: number): Promise<any[]>;
  getFailedLoginAttempts(hours: number): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByProviderId(provider: string, providerId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users)
      .where(and(eq(users.provider, provider), eq(users.providerId, providerId)));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
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

  // Blog operations
  async getAllBlogPosts(published?: boolean): Promise<BlogPost[]> {
    if (published !== undefined) {
      return await db.select().from(blogPosts)
        .where(eq(blogPosts.published, published))
        .orderBy(desc(blogPosts.createdAt));
    }
    
    return await db.select().from(blogPosts)
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post;
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: number): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async incrementBlogPostViews(slug: string): Promise<void> {
    await db
      .update(blogPosts)
      .set({ views: sql`${blogPosts.views} + 1` })
      .where(eq(blogPosts.slug, slug));
  }

  // Contact operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async deleteContactMessage(id: number): Promise<void> {
    await db.delete(contactMessages).where(eq(contactMessages.id, id));
  }
  // Analytics operations
  async recordAnalytics(data: InsertAnalytics): Promise<Analytics> {
    const [record] = await db.insert(analytics).values(data).returning();
    return record;
  }

  async getAnalyticsStats(): Promise<{
    totalViews: number;
    totalPosts: number;
    totalMessages: number;
  }> {
    const [viewsResult] = await db.select({ count: sql<number>`count(*)` }).from(analytics);
    const [postsResult] = await db.select({ count: sql<number>`count(*)` }).from(blogPosts);
    const [messagesResult] = await db.select({ count: sql<number>`count(*)` }).from(contactMessages);

    return {
      totalViews: viewsResult.count,
      totalPosts: postsResult.count,
      totalMessages: messagesResult.count,
    };
  }

  // GitHub projects operations
  async getGithubProjects(): Promise<GithubProject[]> {
    return await db.select().from(githubProjects).orderBy(desc(githubProjects.stars));
  }

  async upsertGithubProject(project: Omit<GithubProject, 'id'>): Promise<GithubProject> {
    const [upsertedProject] = await db
      .insert(githubProjects)
      .values(project)
      .onConflictDoUpdate({
        target: githubProjects.name,
        set: {
          ...project,
          lastUpdated: new Date(),
        },
      })
      .returning();
    return upsertedProject;
  }

  // Message operations
  async getUserMessages(userId: string): Promise<Message[]> {
    return await db.select().from(messages)
      .where(eq(messages.senderId, userId))
      .orderBy(desc(messages.createdAt));
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(messageData).returning();
    return message;
  }

  // Admin and system operations
  async getAdminUser(): Promise<any | null> {
    const adminUsers = await db
      .select()
      .from(users)
      .where(eq(users.role, 'admin'))
      .limit(1);

    return adminUsers[0] || null;
  }



  async getRecentModerationLogs(hours: number): Promise<any[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);

    return await db
      .select()
      .from(moderationLogs)
      .where(gt(moderationLogs.createdAt, cutoffTime))
      .orderBy(desc(moderationLogs.createdAt));
  }

  async getFailedLoginAttempts(hours: number): Promise<FailedLoginAttempt[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);

    return await db
      .select()
      .from(failedLoginAttempts)
      .where(gt(failedLoginAttempts.attemptedAt, cutoffTime))
      .orderBy(desc(failedLoginAttempts.attemptedAt));
  }

  async cleanupOldAnalytics(cutoffDate: Date): Promise<void> {
    try {
      await db
        .delete(analytics)
        .where(lt(analytics.timestamp, cutoffDate));
      
      // Analytics cleanup completed
    } catch (error) {
      console.error('Failed to cleanup old analytics:', error);
    }
  }

  async cleanupOldModerationLogs(cutoffDate: Date): Promise<void> {
    try {
      await db
        .delete(moderationLogs)
        .where(lt(moderationLogs.createdAt, cutoffDate));
      
      // Moderation logs cleanup completed
    } catch (error) {
      console.error('Failed to cleanup old moderation logs:', error);
    }
  }

  // Falcon Protocol v∞ - Audio Play Logs
  async logAudioPlay(userId: string, audioType: string, sessionId?: string): Promise<AudioPlayLog> {
    const [audioLog] = await db.insert(audioPlayLogs).values({
      userId,
      audioType,
      sessionId
    }).returning();
    return audioLog;
  }

  async hasAudioBeenPlayed(userId: string, audioType: string, sessionId?: string): Promise<boolean> {
    const logs = await db
      .select()
      .from(audioPlayLogs)
      .where(
        sessionId 
          ? sql`${audioPlayLogs.userId} = ${userId} AND ${audioPlayLogs.audioType} = ${audioType} AND ${audioPlayLogs.sessionId} = ${sessionId}`
          : sql`${audioPlayLogs.userId} = ${userId} AND ${audioPlayLogs.audioType} = ${audioType}`
      )
      .limit(1);
    
    return logs.length > 0;
  }

  // Falcon Protocol v∞ - Audit Logs
  async createAuditLog(auditData: InsertAuditLog): Promise<AuditLog> {
    const [auditLog] = await db.insert(auditLogs).values(auditData).returning();
    return auditLog;
  }

  async getAuditLogs(limit: number = 100): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit);
  }

  async getAuditLogsByUser(userId: string, limit: number = 50): Promise<AuditLog[]> {
    return await db
      .select()
      .from(auditLogs)
      .where(eq(auditLogs.userId, userId))
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit);
  }

  // Falcon Protocol v∞ - Failed Login Attempts
  async logFailedLoginAttempt(attemptData: InsertFailedLoginAttempt): Promise<FailedLoginAttempt> {
    const [attempt] = await db.insert(failedLoginAttempts).values(attemptData).returning();
    return attempt;
  }

  async getRecentFailedLogins(hours: number): Promise<FailedLoginAttempt[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);

    return await db
      .select()
      .from(failedLoginAttempts)
      .where(gt(failedLoginAttempts.attemptedAt, cutoffTime))
      .orderBy(desc(failedLoginAttempts.attemptedAt));
  }

  // Falcon Protocol v∞ - System Health
  async logSystemHealth(metricType: string, metricName: string, value: any, status: string = 'healthy'): Promise<SystemHealth> {
    const [healthLog] = await db.insert(systemHealth).values({
      metricType,
      metricName,
      value,
      status
    }).returning();
    return healthLog;
  }

  async getSystemHealthMetrics(metricType?: string, hours: number = 24): Promise<SystemHealth[]> {
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hours);

    if (metricType) {
      return await db
        .select()
        .from(systemHealth)
        .where(sql`${systemHealth.checkedAt} > ${cutoffTime} AND ${systemHealth.metricType} = ${metricType}`)
        .orderBy(desc(systemHealth.checkedAt));
    }

    return await db
      .select()
      .from(systemHealth)
      .where(gt(systemHealth.checkedAt, cutoffTime))
      .orderBy(desc(systemHealth.checkedAt));
  }

  async createSystemNotification(userId: string, subject: string, content: string): Promise<any> {
    const notification = await db
      .insert(notifications)
      .values({
        userId,
        title: subject,
        message: content,
        type: 'system',
        isRead: false,
      })
      .returning();

    return notification[0];
  }
}

export const storage = new DatabaseStorage();
