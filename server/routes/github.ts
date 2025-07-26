import { Request, Response } from 'express';
import { githubService } from '../../lib/github-api';
import { authLimiter } from '../../lib/security';
import { z } from 'zod';

// Rate limiting for GitHub API routes
const githubLimiter = authLimiter;

// Validation schemas
const repoParamsSchema = z.object({
  repo: z.string().min(1).max(100),
});

// Get featured repositories
export async function getFeaturedRepos(req: Request, res: Response) {
  try {
<<<<<<< HEAD
    const repos = await githubService.getFeaturedRepos();
=======
    const repos = await githubService.getAllRepos(); // Changed to get all repos instead of just featured
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
    
    // Transform for frontend consumption
    const transformedRepos = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      lastUpdated: repo.updated_at,
      topics: repo.topics || [],
      homepage: repo.homepage,
    }));

    res.json(transformedRepos);
  } catch (error) {
    console.error('Error fetching featured repos:', error);
    res.status(500).json({
      error: 'Failed to fetch GitHub repositories',
      message: 'Unable to retrieve repository data at this time',
    });
  }
}

// Get all repositories
export async function getAllRepos(req: Request, res: Response) {
  try {
    const repos = await githubService.getAllRepos();
    
    const transformedRepos = repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url,
      createdAt: repo.created_at,
      updatedAt: repo.updated_at,
      topics: repo.topics || [],
      homepage: repo.homepage,
    }));

    res.json(transformedRepos);
  } catch (error) {
    console.error('Error fetching all repos:', error);
    res.status(500).json({
      error: 'Failed to fetch GitHub repositories',
      message: 'Unable to retrieve repository data at this time',
    });
  }
}

<<<<<<< HEAD
=======
// Get all public repositories (alias for getAllRepos with better naming)
export async function getAllPublicRepos(req: Request, res: Response) {
  return getAllRepos(req, res);
}

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
// Get repository details
export async function getRepoDetails(req: Request, res: Response) {
  try {
    const { repo } = repoParamsSchema.parse(req.params);
    
    const repoData = await githubService.getRepoDetails(repo);
    
    if (!repoData) {
      return res.status(404).json({
        error: 'Repository not found',
        message: `Repository '${repo}' could not be found`,
      });
    }

    const transformedRepo = {
      id: repoData.id,
      name: repoData.name,
      fullName: repoData.full_name,
      description: repoData.description,
      language: repoData.language,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      url: repoData.html_url,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      topics: repoData.topics || [],
      homepage: repoData.homepage,
    };

    res.json(transformedRepo);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request parameters',
        details: error.errors,
      });
    }

    console.error('Error fetching repo details:', error);
    res.status(500).json({
      error: 'Failed to fetch repository details',
      message: 'Unable to retrieve repository information at this time',
    });
  }
}

// Get GitHub statistics
export async function getGitHubStats(req: Request, res: Response) {
  try {
    const stats = await githubService.getGitHubStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    res.status(500).json({
      error: 'Failed to fetch GitHub statistics',
      message: 'Unable to retrieve GitHub statistics at this time',
    });
  }
}

// Get recent commits for a repository
export async function getRecentCommits(req: Request, res: Response) {
  try {
    const { repo } = repoParamsSchema.parse(req.params);
    const count = parseInt(req.query.count as string) || 5;
    
    if (count < 1 || count > 20) {
      return res.status(400).json({
        error: 'Invalid count parameter',
        message: 'Count must be between 1 and 20',
      });
    }

    const commits = await githubService.getRecentCommits(repo, count);
    
    const transformedCommits = (commits as any[]).map((commit: any) => ({
      sha: commit.sha.substring(0, 7),
      message: commit.commit.message.split('\n')[0], // First line only
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));

    res.json(transformedCommits);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Invalid request parameters',
        details: error.errors,
      });
    }

    console.error('Error fetching recent commits:', error);
    res.status(500).json({
      error: 'Failed to fetch recent commits',
      message: 'Unable to retrieve commit information at this time',
    });
  }
}

// Clear GitHub cache (admin only)
export async function clearGitHubCache(req: Request, res: Response) {
  try {
    // Note: Add authentication check here for admin users
    githubService.clearCache();
    
    res.json({
      message: 'GitHub cache cleared successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error clearing GitHub cache:', error);
    res.status(500).json({
      error: 'Failed to clear cache',
      message: 'Unable to clear GitHub cache at this time',
    });
  }
}

// Get cache statistics (admin only)
export async function getCacheStats(req: Request, res: Response) {
  try {
    // Note: Add authentication check here for admin users
    const stats = githubService.getCacheStats();
    
    res.json({
      cache: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    res.status(500).json({
      error: 'Failed to get cache statistics',
      message: 'Unable to retrieve cache information at this time',
    });
  }
}