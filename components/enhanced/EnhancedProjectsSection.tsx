import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Github, ExternalLink, Star, GitFork, Clock, Eye, TrendingUp } from 'lucide-react';
import { ErrorBoundary } from '../ErrorBoundary';
import { CacheManager } from '@/lib/performance';
import type { GithubProject } from '@shared/schema';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  lastUpdated: string;
  topics: string[];
  homepage?: string | null;
}

interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  lastUpdated: string;
}

function ProjectCard({ project, index }: { project: GitHubRepo; index: number }) {
  const [commits, setCommits] = useState<any[]>([]);
  const [loadingCommits, setLoadingCommits] = useState(false);

  const getBorderColor = (index: number) => {
    const colors = ['neon-green', 'cyber-purple', 'gold-accent', 'neon-cyan'];
    return colors[index % colors.length];
  };

  const getLanguageColor = (language: string | null) => {
    const colors: Record<string, string> = {
      Python: 'neon-green',
      TypeScript: 'neon-cyan',
      JavaScript: 'gold-accent',
      React: 'neon-cyan',
      Rust: 'cyber-purple',
      Go: 'neon-green',
      Java: 'cyber-purple',
    };
    return language ? colors[language] || 'neon-cyan' : 'gray-500';
  };

  const fetchRecentCommits = async () => {
    if (loadingCommits) return;
    
    setLoadingCommits(true);
    try {
      const cacheKey = `commits-${project.name}`;
      const cached = CacheManager.get<any[]>(cacheKey);
      
      if (cached) {
        setCommits(cached);
        return;
      }

      const response = await fetch(`/api/github/repos/${project.name}/commits?count=3`);
      if (response.ok) {
        const data = await response.json();
        setCommits(data);
        CacheManager.set(cacheKey, data, 10 * 60 * 1000); // 10 minutes
      }
    } catch (error) {
      console.warn('Failed to fetch commits:', error);
    } finally {
      setLoadingCommits(false);
    }
  };

  useEffect(() => {
    fetchRecentCommits();
  }, [project.name]);

  return (
    <Card className={`bg-matrix-black border-${getBorderColor(index)} hover:border-opacity-100 border-opacity-60 transition-all duration-300 group overflow-hidden`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-cyber text-white group-hover:text-neon-cyan transition-colors duration-300 flex items-center">
              <Github className="mr-2 w-5 h-5" />
              {project.name}
            </CardTitle>
            <CardDescription className="text-gray-400 mt-2 text-sm leading-relaxed">
              {project.description}
            </CardDescription>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center space-x-4 mt-3 text-sm">
          <div className="flex items-center text-gold-accent">
            <Star className="w-4 h-4 mr-1" />
            {project.stars}
          </div>
          <div className="flex items-center text-neon-green">
            <GitFork className="w-4 h-4 mr-1" />
            {project.forks}
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(project.lastUpdated).toLocaleDateString()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Language and Topics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.language && (
            <Badge 
              variant="outline" 
              className={`border-${getLanguageColor(project.language)} text-${getLanguageColor(project.language)} text-xs`}
            >
              {project.language}
            </Badge>
          )}
          {project.topics.slice(0, 3).map((topic) => (
            <Badge 
              key={topic} 
              variant="secondary" 
              className="bg-cyber-gray text-gray-300 text-xs"
            >
              {topic}
            </Badge>
          ))}
        </div>

        {/* Recent Commits */}
        {commits.length > 0 && (
          <div className="mb-4 p-3 bg-cyber-gray rounded-md">
            <h4 className="text-xs font-mono text-gray-400 mb-2 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              Recent Activity
            </h4>
            <div className="space-y-1">
              {commits.slice(0, 2).map((commit) => (
                <div key={commit.sha} className="text-xs">
                  <div className="flex items-center text-neon-green">
                    <span className="font-mono mr-2">{commit.sha}</span>
                    <span className="text-gray-300 truncate">
                      {commit.message.length > 40 
                        ? `${commit.message.substring(0, 40)}...` 
                        : commit.message
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            asChild
            size="sm"
            className="flex-1 cyber-button"
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 w-4 h-4" />
              View Code
            </a>
          </Button>
          
          {project.homepage && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-matrix-black"
            >
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function GitHubStatsCard({ stats }: { stats: GitHubStats }) {
  return (
    <Card className="bg-matrix-black border-neon-cyan mb-8">
      <CardHeader>
        <CardTitle className="text-neon-cyan flex items-center">
          <Github className="mr-2" />
          GitHub Portfolio Statistics
        </CardTitle>
        <CardDescription className="text-gray-400">
          Real-time metrics from RafalW3bCraft repositories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gold-accent mb-1">
              {stats.totalStars}
            </div>
            <div className="text-sm text-gray-400">Total Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">
              {stats.totalForks}
            </div>
            <div className="text-sm text-gray-400">Total Forks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-purple mb-1">
              {stats.totalRepos}
            </div>
            <div className="text-sm text-gray-400">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-cyan mb-1">
              {new Date(stats.lastUpdated).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-400">Last Updated</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="bg-matrix-black border-cyber-gray">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 bg-cyber-gray" />
            <Skeleton className="h-16 w-full bg-cyber-gray mt-2" />
            <div className="flex space-x-4 mt-3">
              <Skeleton className="h-4 w-12 bg-cyber-gray" />
              <Skeleton className="h-4 w-12 bg-cyber-gray" />
              <Skeleton className="h-4 w-20 bg-cyber-gray" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mb-4">
              <Skeleton className="h-6 w-16 bg-cyber-gray" />
              <Skeleton className="h-6 w-20 bg-cyber-gray" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-8 flex-1 bg-cyber-gray" />
              <Skeleton className="h-8 w-12 bg-cyber-gray" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EnhancedProjectsContent() {
  const { data: projects, isLoading: projectsLoading, error: projectsError } = useQuery<GitHubRepo[]>({
    queryKey: ['/api/github/featured'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  const { data: stats, isLoading: statsLoading } = useQuery<GitHubStats>({
    queryKey: ['/api/github/stats'],
    staleTime: 5 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000, // 15 minutes
  });

  if (projectsError) {
    return (
      <div className="text-center py-12">
        <Card className="bg-matrix-black border-red-500 max-w-md mx-auto">
          <CardContent className="pt-6">
            <div className="text-red-500 mb-4">
              <Github className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="font-cyber text-lg text-red-500 mb-2">
              Repository Access Error
            </h3>
            <p className="text-gray-400 text-sm">
              Unable to fetch GitHub repositories. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-cyber text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-neon-cyan">GITHUB</span>{' '}
          <span className="text-cyber-purple">PORTFOLIO</span>
        </h2>
        
        <p className="text-center text-gray-400 font-mono mb-12 max-w-2xl mx-auto">
          Explore my latest cybersecurity tools, AI automation projects, and innovative solutions. 
          Each repository represents cutting-edge technology and security expertise.
        </p>

        {/* GitHub Stats */}
        {stats && !statsLoading && <GitHubStatsCard stats={stats} />}

        {/* Projects Grid */}
        {projectsLoading ? (
          <ProjectsSkeleton />
        ) : projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Eye className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-400">No repositories found to display.</p>
          </div>
        )}

        {/* View All Projects Link */}
        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-neon-green text-neon-green hover:bg-neon-green hover:text-matrix-black"
          >
            <a
              href="https://github.com/RafalW3bCraft"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 w-5 h-5" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function EnhancedProjectsSection() {
  return (
    <ErrorBoundary>
      <EnhancedProjectsContent />
    </ErrorBoundary>
  );
}