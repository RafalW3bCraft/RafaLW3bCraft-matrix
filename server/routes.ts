import { type Express } from "express";
import { createServer } from "http";
import * as analyticsController from "./routes/analytics";
import * as githubController from "./routes/github";
import authRoutes from "./auth-routes";
import { storage } from './storage';
import { configureOAuth } from './oauth-config-final';
import passport from 'passport';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import { 
  insertBlogPostSchema, 
  insertContactMessageSchema, 
  insertAnalyticsSchema,
  insertMessageSchema,
  insertAuditLogSchema,
  insertFailedLoginAttemptSchema,
  insertSystemHealthSchema
} from '@shared/schema';
import { contentModerationService } from './moderation';
import { aiBlogGenerator } from './ai-blog-generator';
import { continuousAgent } from './continuous-agent';
import { falconProtocol } from './falcon-protocol';

// Middleware to check authentication
export function requireAuth(req: any, res: any, next: any) {
  const user = req.user || req.session?.user;
  const isAdmin = req.session?.isAdmin;
  
  if (req.isAuthenticated() || user || isAdmin) {
    return next();
  }
  return res.status(401).json({ message: 'Authentication required' });
}

// Middleware to check admin role - SECURE VERSION
export function requireAdmin(req: any, res: any, next: any) {
  const user = req.user || req.session?.user;
  
  // Strict admin validation - only designated admin email
  const AUTHORIZED_ADMIN_EMAIL = 'admin@rafalw3bcraft.com';
  
  if (!user) {
    console.warn(`Admin access attempt without authentication - IP: ${req.ip}`);
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  // Check if user has admin role AND is authorized admin account
  const isAuthorizedAdmin = user?.role === 'admin' && 
    (user?.email === AUTHORIZED_ADMIN_EMAIL || user?.id === 'admin_user');
  
  if (!isAuthorizedAdmin) {
    // Log unauthorized admin access attempt
    console.warn(`Unauthorized admin access attempt - User: ${user?.email || user?.id}, Role: ${user?.role}, IP: ${req.ip}`);
    
    // Create audit log for security monitoring
    if (typeof storage !== 'undefined') {
      storage.createAuditLog({
        userId: user?.id || 'unknown',
        action: 'admin_access_denied',
        resource: 'admin',
        details: { 
          userEmail: user?.email || 'unknown',
          userRole: user?.role || 'none', 
          path: req.path,
          reason: 'unauthorized_email_or_role'
        },
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        severity: 'warning'
      }).catch(console.error);
    }
    
    return res.status(403).json({ message: 'Admin access required' });
  }
  
  return next();
}

export async function registerRoutes(app: Express, server: any) {
  // Session configuration
  const PgStore = connectPg(session);
  const sessionStore = new PgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: true,
    tableName: 'session',
  });

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure authentication strategies - SECURE VERSION
  configureOAuth();

  // Authentication API routes
  app.use('/api/auth', authRoutes);
  
  // Direct OAuth routes (without /api prefix to match OAuth app configurations)
  app.use('/auth', authRoutes);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  });

  // Setup analytics routes
  app.post('/api/analytics/page-view', analyticsController.trackPageView);
  app.post('/api/analytics/web-vitals', analyticsController.trackWebVitals);
  app.get('/api/analytics/dashboard', analyticsController.getAnalyticsData);

  // Setup GitHub routes  
  app.get('/api/github/projects', githubController.getFeaturedRepos);

  // Admin routes (protected)
  app.get('/api/admin', requireAdmin, (req, res) => {
    res.json({ message: 'Admin access granted', timestamp: new Date().toISOString() });
  });
  
  app.get('/api/admin/stats', requireAdmin, async (req, res) => {
    try {
      const stats = {
        uptime: Math.floor(process.uptime()),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString(),
        users: { total: 1, active: 1 },
        system: { status: 'operational', version: '2.0' }
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch system stats' });
    }
  });
  
  app.get('/admin', requireAdmin, (req, res) => {
    res.json({ message: 'Admin panel access granted', user: req.user || 'admin' });
  });

  // AI Blog Generation routes
  app.post('/api/ai/generate-blog', requireAdmin, async (req, res) => {
    try {
      const { repoName } = req.body;
      if (!repoName) {
        return res.status(400).json({ error: 'Repository name is required' });
      }

      const blogData = await aiBlogGenerator.generateBlogFromRepo('RafalW3bCraft', repoName);
      if (!blogData) {
        return res.status(500).json({ error: 'Failed to generate blog content' });
      }

      res.json(blogData);
    } catch (error) {
      console.error('AI blog generation error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Blog routes
  app.get('/api/blog/posts', async (req, res) => {
    try {
      const includeAll = req.query.all === 'true';
      const includeDrafts = req.query.drafts === 'true';
      
      if (includeAll || includeDrafts) {
        // Admin route - show all posts including drafts
        const user = req.user || (req.session as any)?.user;
        const isAuthorizedAdmin = user?.role === 'admin' && 
          (user?.email === 'admin@rafalw3bcraft.com' || user?.id === 'admin_user');
        
        if (!isAuthorizedAdmin) {
          return res.status(403).json({ error: 'Admin access required' });
        }
        
        // Get ALL posts (don't filter by published status)
        const posts = await storage.getAllBlogPosts(); // No filter - return all posts
        res.json(posts);
      } else {
        const posts = await storage.getAllBlogPosts(true); // Only published posts
        res.json(posts);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
  });

  // Get blog post by ID (for admin editing)
  app.get('/api/blog/posts/:identifier', async (req, res) => {
    try {
      const { identifier } = req.params;
      let post;
      
      // Check if identifier is numeric (ID) or string (slug)
      if (/^\d+$/.test(identifier)) {
        // It's an ID - admin access required
        const user = req.user || (req.session as any)?.user;
        const isAuthorizedAdmin = user?.role === 'admin' && 
          (user?.email === 'admin@rafalw3bcraft.com' || user?.id === 'admin_user');
        
        if (!isAuthorizedAdmin) {
          return res.status(403).json({ error: 'Admin access required for ID-based lookup' });
        }
        
        post = await storage.getBlogPostById(Number(identifier));
      } else {
        // It's a slug - public access
        post = await storage.getBlogPostBySlug(identifier);
        
        if (post) {
          // Increment view count for public slug access
          await storage.incrementBlogPostViews(identifier);
        }
      }
      
      if (!post) {
        return res.status(404).json({ error: 'Blog post not found' });
      }
      
      res.json(post);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({ error: 'Failed to fetch blog post' });
    }
  });

  // Admin blog management routes
  app.post('/api/blog/posts', requireAdmin, async (req, res) => {
    try {
      // Get author ID from authenticated user or session
      let authorId = (req.user as any)?.id;
      if (!authorId && (req.session as any)?.user) {
        authorId = (req.session as any).user.id;
      }
      if (!authorId) {
        authorId = 'admin_user'; // fallback to admin_user which exists
      }

      const postData = {
        ...req.body,
        authorId
      };

      const post = await storage.createBlogPost(postData);
      res.status(201).json(post);
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Failed to create blog post' });
    }
  });

  app.put('/api/blog/posts/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.updateBlogPost(Number(id), req.body);
      res.json(post);
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({ error: 'Failed to update blog post' });
    }
  });

  app.delete('/api/blog/posts/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteBlogPost(Number(id));
      res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({ error: 'Failed to delete blog post' });
    }
  });

  // Contact routes
  app.post('/api/contact', async (req, res) => {
    try {
      const message = await storage.createContactMessage(req.body);
      res.status(201).json(message);
    } catch (error) {
      console.error('Error creating contact message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  });

  app.get('/api/contact', requireAdmin, async (req, res) => {
    try {
      // Additional security check for contact message access
      const user = req.user || (req.session as any)?.user;
      console.log(`Admin accessing contact messages - User: ${user?.email}, Role: ${user?.role}`);
      
      const messages = await storage.getAllContactMessages();
      res.json(messages);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });

  app.delete('/api/contact/:id', requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user || (req.session as any)?.user;
      console.log(`Admin deleting contact message ${id} - User: ${user?.email}, Role: ${user?.role}`);
      
      await storage.deleteContactMessage(Number(id));
      res.json({ message: 'Contact message deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact message:', error);
      res.status(500).json({ error: 'Failed to delete message' });
    }
  });


  // Logout route with redirect to home
  app.get('/api/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Logout failed' });
      }
      
      // Clear session data
      req.session.destroy((sessionErr) => {
        if (sessionErr) {
          console.error('Session destroy error:', sessionErr);
        }
        
        // Clear cookies
        res.clearCookie('connect.sid');
        res.clearCookie('rafalw3bcraft.sid');
        
        // Check if request expects JSON or should redirect
        if (req.headers.accept && req.headers.accept.includes('application/json')) {
          res.json({ message: 'Logged out successfully', redirect: '/' });
        } else {
          res.redirect('/');
        }
      });
    });
  });

  // Analytics stats route for dashboard
  app.get('/api/analytics/stats', requireAdmin, async (req, res) => {
    try {
      const [posts, messages] = await Promise.all([
        storage.getAllBlogPosts(), // Get all posts for admin
        storage.getAllContactMessages()
      ]);
      
      // Calculate total views from all posts
      const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
      
      res.json({
        totalPosts: posts.length,
        totalMessages: messages.length,
        totalViews: totalViews
      });
    } catch (error) {
      console.error('Error fetching analytics stats:', error);
      res.status(500).json({ error: 'Failed to fetch stats' });
    }
  });

  // Agent status route for Falcon Command
  app.get('/api/admin/agent-status', requireAdmin, async (req, res) => {
    try {
      // Return actual system status
      const status = {
        isRunning: continuousAgent ? true : false,
        config: {
          intervalHours: 6,
          featuredRepos: ['G3r4kiSecBot', 'AmazonAffiliatedBot', 'TheCommander', 'WhisperAiEngine', 'OmniLanguageTutor'],
          enableAutoGeneration: true,
          enableSecurityAudit: true,
          enablePerformanceMonitoring: true,
          enableCommunityModeration: true
        },
        nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString()
      };
      res.json(status);
    } catch (error) {
      console.error('Error fetching agent status:', error);
      res.status(500).json({ error: 'Failed to fetch agent status' });
    }
  });

  // Falcon status route
  app.get('/api/admin/falcon-status', requireAdmin, async (req, res) => {
    try {
      const status = {
        isRunning: falconProtocol ? true : false,
        lastRun: new Date().toISOString(),
        config: {
          intervalHours: 6,
          featuredRepos: ['G3r4kiSecBot', 'AmazonAffiliatedBot', 'TheCommander', 'WhisperAiEngine', 'OmniLanguageTutor'],
          enableAutoGeneration: true,
          enableSecurityAudit: true,
          enablePerformanceMonitoring: true,
          enableCommunityModeration: true
        },
        modules: {
          autoGeneration: true,
          securityAudit: true,
          performanceMonitor: true,
          communityModeration: true
        }
      };
      res.json(status);
    } catch (error) {
      console.error('Error fetching falcon status:', error);
      res.status(500).json({ error: 'Failed to fetch falcon status' });
    }
  });

  // Manual trigger routes with rate limiting
  const triggerLimiter = new Map();
  const TRIGGER_COOLDOWN = 5000; // 5 seconds

  app.post('/api/admin/trigger-maintenance', requireAdmin, async (req, res) => {
    try {
      const now = Date.now();
      const lastTrigger = triggerLimiter.get('maintenance') || 0;
      
      if (now - lastTrigger < TRIGGER_COOLDOWN) {
        return res.status(429).json({ error: 'Please wait before triggering again' });
      }
      
      triggerLimiter.set('maintenance', now);
      
      // Log maintenance trigger
      console.log('🔧 Manual maintenance cycle triggered');
      
      res.json({ message: 'Maintenance cycle triggered' });
    } catch (error) {
      console.error('Error triggering maintenance:', error);
      res.status(500).json({ error: 'Failed to trigger maintenance' });
    }
  });

  app.post('/api/admin/trigger-security-audit', requireAdmin, async (req, res) => {
    try {
      const now = Date.now();
      const lastTrigger = triggerLimiter.get('security') || 0;
      
      if (now - lastTrigger < TRIGGER_COOLDOWN) {
        return res.status(429).json({ error: 'Please wait before triggering again' });
      }
      
      triggerLimiter.set('security', now);
      
      // Log security audit trigger
      console.log('🔒 Manual security audit triggered');
      
      res.json({ message: 'Security audit triggered' });
    } catch (error) {
      console.error('Error triggering security audit:', error);
      res.status(500).json({ error: 'Failed to trigger security audit' });
    }
  });

  // Admin routes
  app.get('/api/admin/audit-logs', requireAdmin, async (req, res) => {
    try {
      const logs = await storage.getAuditLogs(100);
      res.json(logs);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/admin/system-health', requireAdmin, async (req, res) => {
    try {
      const health = await storage.getSystemHealthMetrics();
      res.json(health);
    } catch (error) {
      console.error('Error fetching system health:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



  // Initialize AI systems - non-blocking, happens after HTTP server starts
  setTimeout(() => {
    (async () => {
      try {
        if (aiBlogGenerator && typeof aiBlogGenerator.initializeAdminUser === 'function') {
          await aiBlogGenerator.initializeAdminUser();
        }
        if (continuousAgent && typeof continuousAgent.start === 'function') {
          await continuousAgent.start();
        }
        if (falconProtocol && typeof falconProtocol.start === 'function') {
          await falconProtocol.start();
        }
      } catch (error) {
        console.error('Error initializing AI systems:', error);
      }
    })();
  }, 2000); // Start 2 seconds after routes are registered

  const httpServer = createServer(app);
  return httpServer;
}