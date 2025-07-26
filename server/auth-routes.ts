import { Router } from 'express';
<<<<<<< HEAD
import passport from 'passport';
=======
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
import { storage } from './storage';
import rateLimit from 'express-rate-limit';

const router = Router();

<<<<<<< HEAD
// Rate limiting for auth routes - more lenient for development
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // increased limit for better UX
  message: 'Too many authentication attempts, try again later',
  skip: (req) => process.env.NODE_ENV === 'development' // Skip in development
=======
// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limited attempts for admin only
  message: 'Too many authentication attempts, try again later',
  skip: (req) => process.env.NODE_ENV === 'development'
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
});

// Apply rate limiting to auth routes
router.use(authLimiter);

<<<<<<< HEAD
// Google OAuth routes
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login?error=auth_failed' }),
  async (req, res) => {
    try {
      // Log successful login
      await storage.createAuditLog({
        userId: (req.user as any).id,
        action: 'oauth_login_success',
        resource: 'authentication',
        details: { provider: 'google' },
        severity: 'info'
      });
      
      // Redirect to dashboard after successful login
      res.redirect('/dashboard');
    } catch (error) {
      console.error('Google auth callback error:', error);
      res.redirect('/login?error=callback_failed');
    }
  }
);

// GitHub OAuth routes
router.get('/github', passport.authenticate('github', { 
  scope: ['user:email'] 
}));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login?error=auth_failed' }),
  async (req, res) => {
    try {
      // Log successful login
      await storage.createAuditLog({
        userId: (req.user as any).id,
        action: 'oauth_login_success',
        resource: 'authentication',
        details: { provider: 'github' },
        severity: 'info'
      });
      
      // Redirect to dashboard after successful login
      res.redirect('/dashboard');
    } catch (error) {
      console.error('GitHub auth callback error:', error);
      res.redirect('/login?error=callback_failed');
    }
  }
);

// Get current user
router.get('/user', async (req, res) => {
  const user = req.user || (req.session as any)?.user;
  const isAdmin = (req.session as any)?.isAdmin;
  
  if (!req.isAuthenticated() && !user && !isAdmin) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  try {
    // Handle admin session user
    if (isAdmin && user) {
      return res.json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profileImageUrl: user.profileImageUrl,
        role: user.role,
        provider: user.provider
      });
    }
    
    // Handle OAuth user
    const dbUser = await storage.getUser((req.user as any).id);
    if (!dbUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: dbUser.id,
      email: dbUser.email,
      firstName: dbUser.firstName,
      lastName: dbUser.lastName,
      username: dbUser.username,
      profileImageUrl: dbUser.profileImageUrl,
      role: dbUser.role,
      provider: dbUser.provider
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  // Log for both OAuth and admin users
  const user = req.user || (req.session as any)?.user;
=======
// Get current admin user
router.get('/user', async (req, res) => {
  const isAdmin = (req.session as any)?.isAdmin;
  const user = (req.session as any)?.user;

  if (!isAdmin || !user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  return res.json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    role: user.role,
    provider: user.provider
  });
});

// Admin logout
router.post('/logout', async (req, res) => {
  const user = (req.session as any)?.user;

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
  if (user) {
    try {
      await storage.createAuditLog({
        userId: user.id,
<<<<<<< HEAD
        action: 'logout',
        resource: 'authentication',
        details: { provider: user.provider || 'admin' },
=======
        action: 'admin_logout',
        resource: 'authentication',
        details: { provider: 'admin' },
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
        severity: 'info'
      });
    } catch (error) {
      console.error('Error logging logout:', error);
    }
  }
<<<<<<< HEAD
  
  // Clear admin session flags
  if ((req.session as any)?.isAdmin) {
    (req.session as any).isAdmin = false;
    (req.session as any).user = null;
  }
  
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
        return res.status(500).json({ message: 'Session cleanup failed' });
      }
      res.clearCookie('connect.sid');
      res.clearCookie('rafalw3bcraft.sid'); // Clear custom session cookie
      res.json({ message: 'Logged out successfully' });
    });
=======

  // Clear admin session
  (req.session as any).isAdmin = false;
  (req.session as any).user = null;

  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('rafalw3bcraft.sid');
    res.json({ message: 'Logged out successfully' });
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
  });
});

export default router;