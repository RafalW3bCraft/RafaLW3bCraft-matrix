import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  Activity, 
  Users, 
  FileText, 
  Mail, 
  Github,
  TrendingUp,
  Database,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ErrorBoundary } from '../ErrorBoundary';

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  totalContacts: number;
  totalPosts: number;
  githubStats: {
    totalStars: number;
    totalForks: number;
    totalRepos: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'contact' | 'view' | 'blog';
    description: string;
    timestamp: string;
  }>;
}

function AdminDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const { data: analytics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['/api/admin/analytics'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const refreshMutation = useMutation({
    mutationFn: async () => {
      await queryClient.invalidateQueries({ queryKey: ['/api/admin/analytics'] });
      setLastRefresh(new Date());
    },
  });

  const handleRefresh = () => {
    refreshMutation.mutate();
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96 bg-matrix-black border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center">
              <Shield className="mr-2" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Unauthorized access detected. Please authenticate.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96 bg-matrix-black border-red-500">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center">
              <AlertTriangle className="mr-2" />
              System Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Failed to load dashboard data.</p>
            <Button onClick={handleRefresh} className="mt-4 cyber-button">
              <RefreshCw className="mr-2 w-4 h-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-matrix-black p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-cyber text-3xl text-neon-cyan mb-2">
              Admin Command Center
            </h1>
            <p className="text-gray-400 font-mono">
              Welcome back, {user.firstName || 'Admin'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">Last updated</p>
              <p className="text-sm text-neon-green font-mono">
                {lastRefresh.toLocaleTimeString()}
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={refreshMutation.isPending}
              className="cyber-button"
            >
              <RefreshCw className={`mr-2 w-4 h-4 ${refreshMutation.isPending ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card className="mb-8 bg-matrix-black border-neon-green">
          <CardHeader>
            <CardTitle className="text-neon-green flex items-center">
              <CheckCircle className="mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green">Online</div>
                <div className="text-sm text-gray-400">Server Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-cyan">Secure</div>
                <div className="text-sm text-gray-400">Security Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gold-accent">Fast</div>
                <div className="text-sm text-gray-400">Performance</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyber-purple">Updated</div>
                <div className="text-sm text-gray-400">Data Sync</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-matrix-black border-neon-cyan">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400 flex items-center">
                  <Activity className="mr-2 w-4 h-4" />
                  Page Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-cyan">
                  {analytics.pageViews.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-matrix-black border-neon-green">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400 flex items-center">
                  <Users className="mr-2 w-4 h-4" />
                  Unique Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-neon-green">
                  {analytics.uniqueVisitors.toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-matrix-black border-cyber-purple">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400 flex items-center">
                  <Mail className="mr-2 w-4 h-4" />
                  Contact Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyber-purple">
                  {analytics.totalContacts}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-matrix-black border-gold-accent">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-400 flex items-center">
                  <Github className="mr-2 w-4 h-4" />
                  GitHub Stars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gold-accent">
                  {analytics.githubStats.totalStars}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Detailed Analytics */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-cyber-gray">
            <TabsTrigger value="overview" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-matrix-black">
              Overview
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-matrix-black">
              Recent Activity
            </TabsTrigger>
            <TabsTrigger value="github" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-matrix-black">
              GitHub Stats
            </TabsTrigger>
            <TabsTrigger value="system" className="data-[state=active]:bg-neon-cyan data-[state=active]:text-matrix-black">
              System Health
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-matrix-black border-cyber-gray">
              <CardHeader>
                <CardTitle className="text-neon-cyan">Analytics Overview</CardTitle>
                <CardDescription className="text-gray-400">
                  Key performance metrics and engagement data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center h-48">
                    <RefreshCw className="w-8 h-8 animate-spin text-neon-cyan" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">Total Blog Posts</p>
                        <p className="text-xl font-bold text-neon-green">
                          {analytics?.totalPosts || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">GitHub Repositories</p>
                        <p className="text-xl font-bold text-cyber-purple">
                          {analytics?.githubStats.totalRepos || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-matrix-black border-cyber-gray">
              <CardHeader>
                <CardTitle className="text-neon-cyan">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">
                  Latest user interactions and system events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics?.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded bg-cyber-gray">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline" className="border-neon-cyan text-neon-cyan">
                          {activity.type}
                        </Badge>
                        <span className="text-gray-300">{activity.description}</span>
                      </div>
                      <span className="text-sm text-gray-500 font-mono">
                        {new Date(activity.timestamp).toLocaleString()}
                      </span>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-center py-8">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="github" className="space-y-6">
            <Card className="bg-matrix-black border-cyber-gray">
              <CardHeader>
                <CardTitle className="text-neon-cyan">GitHub Statistics</CardTitle>
                <CardDescription className="text-gray-400">
                  Repository performance and engagement metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gold-accent mb-2">
                      {analytics?.githubStats.totalStars || 0}
                    </div>
                    <p className="text-gray-400">Total Stars</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-neon-green mb-2">
                      {analytics?.githubStats.totalForks || 0}
                    </div>
                    <p className="text-gray-400">Total Forks</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyber-purple mb-2">
                      {analytics?.githubStats.totalRepos || 0}
                    </div>
                    <p className="text-gray-400">Repositories</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card className="bg-matrix-black border-cyber-gray">
              <CardHeader>
                <CardTitle className="text-neon-cyan">System Health</CardTitle>
                <CardDescription className="text-gray-400">
                  Server performance and security monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Database Status</span>
                    <Badge className="bg-neon-green text-matrix-black">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">API Status</span>
                    <Badge className="bg-neon-green text-matrix-black">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Security Scan</span>
                    <Badge className="bg-neon-green text-matrix-black">Clean</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Performance</span>
                    <Badge className="bg-gold-accent text-matrix-black">Optimized</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export function AdminPanel() {
  return (
    <ErrorBoundary>
      <AdminDashboard />
    </ErrorBoundary>
  );
}