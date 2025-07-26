import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'wouter';
<<<<<<< HEAD
import { FileText, MessageSquare, Eye, Plus, Settings, Crown, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';
import FalconCommandCenter from './enhanced/FalconCommandCenter';
=======
import { FileText, MessageSquare, Eye, Plus, Settings, Activity, User, Mail, Github } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
>>>>>>> b0a6a12 (intiate personal portfolio site and more)

interface Stats {
  totalPosts: number;
  totalMessages: number;
  totalViews: number;
}

export function AdminDashboard() {
<<<<<<< HEAD
  const [realtimeStats, setRealtimeStats] = useState<Stats | null>(null);
  const [activeTab, setActiveTab] = useState('falcon-command');

  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ['/api/analytics/stats'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // WebSocket connection for real-time stats
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      // WebSocket connection established
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'stats') {
          setRealtimeStats(message.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      // WebSocket connection closed
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  const displayStats = realtimeStats || stats;

  if (isLoading && !displayStats) {
=======
  const [activeTab, setActiveTab] = useState('admin-dashboard');
  const { user } = useAuth();

  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ['/api/analytics/stats'],
    refetchInterval: 30000,
  });

  if (isLoading && !stats) {
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="glass-morphism border-neon-cyan/20 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-16 bg-gray-600 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-cyber text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="text-gold-accent">ADMIN</span>{' '}
            <span className="text-neon-cyan">DASHBOARD</span>
          </h1>
          <p className="text-center text-gray-400 font-mono">
            System status: <span className="text-neon-green">OPERATIONAL</span>
<<<<<<< HEAD
            {realtimeStats && <span className="text-neon-cyan ml-4">• Live Updates Active</span>}
=======
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="glass-morphism border-l-4 border-neon-green hover:border-neon-green/60 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-neon-green font-mono text-sm">Total Posts</CardTitle>
              <FileText className="text-neon-green" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white font-cyber">
<<<<<<< HEAD
                {displayStats?.totalPosts || 0}
=======
                {stats?.totalPosts || 0}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-l-4 border-cyber-purple hover:border-cyber-purple/60 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-cyber-purple font-mono text-sm">Contact Messages</CardTitle>
              <MessageSquare className="text-cyber-purple" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white font-cyber">
<<<<<<< HEAD
                {displayStats?.totalMessages || 0}
=======
                {stats?.totalMessages || 0}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-l-4 border-gold-accent hover:border-gold-accent/60 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gold-accent font-mono text-sm">Total Views</CardTitle>
              <Eye className="text-gold-accent" size={20} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white font-cyber">
<<<<<<< HEAD
                {displayStats?.totalViews || 0}
=======
                {stats?.totalViews || 0}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
              </div>
            </CardContent>
          </Card>
        </div>

<<<<<<< HEAD
        {/* Falcon's Mandate Command Center */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800 border-cyan-500/30">
            <TabsTrigger value="falcon-command" className="data-[state=active]:bg-gold-accent data-[state=active]:text-matrix-black">
              <Crown className="h-4 w-4 mr-2" />
              Falcon Command
            </TabsTrigger>
=======
        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800 border-cyan-500/30">
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
            <TabsTrigger value="admin-dashboard" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Admin Dashboard
            </TabsTrigger>
<<<<<<< HEAD
          </TabsList>

          <TabsContent value="falcon-command" className="mt-6">
            <FalconCommandCenter />
          </TabsContent>

=======
            <TabsTrigger value="user-profile" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <User className="h-4 w-4 mr-2" />
              User Profile
            </TabsTrigger>
          </TabsList>

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
          <TabsContent value="admin-dashboard" className="mt-6 space-y-8">
            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="terminal-window">
                <CardHeader>
                  <CardTitle className="font-cyber text-xl text-neon-cyan">Blog Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 font-mono text-sm">
                    Manage your blog posts, create new content, and monitor engagement metrics.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/admin/new-post">
                      <Button className="cyber-button px-4 py-2 rounded font-mono flex items-center">
                        <Plus size={16} className="mr-2" />
<<<<<<< HEAD
                    NEW POST
                  </Button>
                </Link>
                <Link href="/admin/posts">
                  <Button
                    variant="outline"
                    className="px-4 py-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-matrix-black transition-all duration-300 rounded font-mono"
                  >
                    <Settings size={16} className="mr-2" />
                    MANAGE POSTS
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="terminal-window">
            <CardHeader>
              <CardTitle className="font-cyber text-xl text-neon-green">Contact Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 font-mono text-sm">
                Review and respond to incoming contact messages from visitors.
              </p>
              <Link href="/admin/messages">
                <Button
                  variant="outline"
                  className="px-4 py-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-matrix-black transition-all duration-300 rounded font-mono"
                >
                  <MessageSquare size={16} className="mr-2" />
                  VIEW MESSAGES
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-gold-accent">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-gray-400">Database Connection:</span>
                  <span className="text-neon-green">ACTIVE</span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-gray-400">WebSocket Status:</span>
                  <span className={realtimeStats ? "text-neon-green" : "text-gray-400"}>
                    {realtimeStats ? "CONNECTED" : "DISCONNECTED"}
                  </span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-gray-400">Authentication:</span>
                  <span className="text-neon-green">SECURE</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-gray-400">Last Backup:</span>
                  <span className="text-neon-cyan">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-gray-400">Security Level:</span>
                  <span className="text-gold-accent">MAXIMUM</span>
                </div>
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-gray-400">Threat Status:</span>
                  <span className="text-neon-green">CLEAR</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
=======
                        NEW POST
                      </Button>
                    </Link>
                    <Link href="/admin/posts">
                      <Button
                        variant="outline"
                        className="px-4 py-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-matrix-black transition-all duration-300 rounded font-mono"
                      >
                        <Settings size={16} className="mr-2" />
                        MANAGE POSTS
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="terminal-window">
                <CardHeader>
                  <CardTitle className="font-cyber text-xl text-neon-green">Contact Messages</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 font-mono text-sm">
                    Review and respond to incoming contact messages from visitors.
                  </p>
                  <Link href="/admin/messages">
                    <Button
                      variant="outline"
                      className="px-4 py-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-matrix-black transition-all duration-300 rounded font-mono"
                    >
                      <MessageSquare size={16} className="mr-2" />
                      VIEW MESSAGES
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="font-cyber text-xl text-gold-accent">System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-gray-400">Database Connection:</span>
                      <span className="text-neon-green">ACTIVE</span>
                    </div>
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-gray-400">Authentication:</span>
                      <span className="text-neon-green">SECURE</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-gray-400">Last Backup:</span>
                      <span className="text-neon-cyan">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-gray-400">Security Level:</span>
                      <span className="text-gold-accent">MAXIMUM</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user-profile" className="mt-6">
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="font-cyber text-xl text-purple-400 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Admin Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                {user && (
                  <div className="flex items-start gap-4">
                    {user.profileImageUrl && (
                      <img
                        src={user.profileImageUrl}
                        alt="Profile"
                        className="w-16 h-16 rounded-full border-2 border-purple-500/50"
                      />
                    )}

                    <div className="flex-1 space-y-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-gray-400 text-sm font-mono">Name</label>
                          <p className="text-white font-cyber">
                            {user.firstName} {user.lastName || ''}
                          </p>
                        </div>

                        <div>
                          <label className="text-gray-400 text-sm font-mono">Email</label>
                          <p className="text-white flex items-center gap-2 font-cyber">
                            <Mail className="h-4 w-4 text-purple-400" />
                            {user.email || 'Not provided'}
                          </p>
                        </div>

                        <div>
                          <label className="text-gray-400 text-sm font-mono">Username</label>
                          <p className="text-white font-cyber">{user.username || 'Not set'}</p>
                        </div>

                        <div>
                          <label className="text-gray-400 text-sm font-mono">Authentication Provider</label>
                          <p className="text-white flex items-center gap-2 font-cyber">
                            {user.provider === 'google' && <Mail className="h-4 w-4 text-red-400" />}
                            {user.provider === 'github' && <Github className="h-4 w-4 text-gray-400" />}
                            {user.provider || 'admin'}
                          </p>
                        </div>
                      </div>

                      {user.bio && (
                        <div className="mt-4">
                          <label className="text-gray-400 text-sm font-mono">Bio</label>
                          <p className="text-white mt-1 font-cyber">{user.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
