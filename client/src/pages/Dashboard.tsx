<<<<<<< HEAD
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
<<<<<<< HEAD
  Shield, 
  Activity, 
  Settings, 
  LogOut, 
  Mail,
  Github,
  Crown,
  Zap,
=======
  LogOut, 
  Mail,
  Github,
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
  Monitor
} from 'lucide-react';
import { useLocation } from 'wouter';

export default function Dashboard() {
<<<<<<< HEAD
  const { user, isLoading, isAuthenticated, isAdmin, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to login if not authenticated
=======
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
    if (!isLoading && !isAuthenticated) {
      setLocation('/login');
    }
  }, [isLoading, isAuthenticated, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-matrix-black via-zinc-900 to-matrix-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
<<<<<<< HEAD
    return (
      <div className="min-h-screen bg-gradient-to-br from-matrix-black via-zinc-900 to-matrix-black flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <p className="text-white text-lg">Access denied. Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
=======
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setLocation('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-matrix-black via-zinc-900 to-matrix-black">
<<<<<<< HEAD
      {/* Header */}
=======
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      <header className="border-b border-cyan-500/30 bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">
                <span className="text-neon-cyan">RafalW3bCraft</span> Dashboard
              </h1>
<<<<<<< HEAD
              {isAdmin && (
                <div className="flex items-center gap-2 px-3 py-1 bg-purple-900/50 rounded-full">
                  <Crown className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-300 text-sm font-medium">Admin</span>
                </div>
              )}
            </div>
            
=======
            </div>

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setLocation('/')}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Monitor className="h-4 w-4 mr-2" />
                View Site
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

<<<<<<< HEAD
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="bg-zinc-900/90 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-xl flex items-center gap-3">
                <Zap className="h-6 w-6" />
                Welcome to your Dashboard, {user.firstName || 'User'}!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 mb-4">
                Access granted to RafalW3bCraft cybersecurity platform. Your secure portal for 
                advanced cyber operations and portfolio management.
              </p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-400">
                  Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'First time'}
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">System Online</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info Section */}
        <div className="mb-8">
=======
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
          <Card className="bg-zinc-900/90 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <User className="h-5 w-5" />
                User Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                {user.profileImageUrl && (
                  <img
                    src={user.profileImageUrl}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-cyan-500/50"
                  />
                )}
<<<<<<< HEAD
                
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-zinc-400 text-sm">Name</label>
                      <p className="text-white">
                        {user.firstName} {user.lastName || ''}
                      </p>
                    </div>
<<<<<<< HEAD
                    
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                    <div>
                      <label className="text-zinc-400 text-sm">Email</label>
                      <p className="text-white flex items-center gap-2">
                        <Mail className="h-4 w-4 text-cyan-400" />
                        {user.email || 'Not provided'}
                      </p>
                    </div>
<<<<<<< HEAD
                    
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                    <div>
                      <label className="text-zinc-400 text-sm">Username</label>
                      <p className="text-white">{user.username || 'Not set'}</p>
                    </div>
<<<<<<< HEAD
                    
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                    <div>
                      <label className="text-zinc-400 text-sm">Authentication Provider</label>
                      <p className="text-white flex items-center gap-2">
                        {user.provider === 'google' && <Mail className="h-4 w-4 text-red-400" />}
                        {user.provider === 'github' && <Github className="h-4 w-4 text-gray-400" />}
                        {user.provider || 'Unknown'}
                      </p>
                    </div>
                  </div>
<<<<<<< HEAD
                  
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                  {user.bio && (
                    <div className="mt-4">
                      <label className="text-zinc-400 text-sm">Bio</label>
                      <p className="text-white mt-1">{user.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
<<<<<<< HEAD

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Blog Management */}
          <Card className="bg-zinc-900/90 border-cyan-500/30 hover:border-cyan-400/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg">Blog Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 text-sm mb-4">
                Access and manage blog posts, create new content, and review submissions.
              </p>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                Access Blog Panel
              </Button>
            </CardContent>
          </Card>

          {/* Portfolio Projects */}
          <Card className="bg-zinc-900/90 border-cyan-500/30 hover:border-cyan-400/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg">Portfolio Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 text-sm mb-4">
                View and manage cybersecurity projects, tools, and framework developments.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Projects
              </Button>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="bg-zinc-900/90 border-cyan-500/30 hover:border-cyan-400/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-lg">Analytics & Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 text-sm mb-4">
                Track website performance, user engagement, and system metrics.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Admin Control Panel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-300 mb-6">
                Advanced administrative functions and system management tools.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button
                  onClick={() => setLocation('/admin')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  System Admin
                </Button>
                
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security Center
                </Button>
                
                <Button
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  System Health
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
=======
      </main>
    </div>
  );
}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
