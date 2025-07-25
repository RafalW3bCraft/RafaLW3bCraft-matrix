import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Star } from 'lucide-react';
import type { GithubProject } from '@shared/schema';

// RafalW3bCraft featured GitHub repositories
const portfolioProjects = [
  {
    id: 1,
    name: '🔸 G3r4kiSecBot',
    description: 'Telegram Security as a Service bot with real-time link scanning, VirusTotal & URLhaus integration, weekly reports & admin-only tools for comprehensive threat detection.',
    language: 'Python',
    tags: ['Telegram', 'Security', 'SaaS'],
    stars: 0,
    url: 'https://github.com/RafalW3bCraft/G3r4kiSecBot',
    lastUpdated: new Date(),
  },
  {
    id: 2,
    name: '🔸 AmazonAffiliatedBot',
    description: 'Affiliate Product Drop Bot with auto-curated deals, subscription model, and passive income stream capabilities for monetized Telegram automation.',
    language: 'Python',
    tags: ['Telegram', 'Affiliate', 'Automation'],
    stars: 0,
    url: 'https://github.com/RafalW3bCraft/AmazonAffiliatedBot',
    lastUpdated: new Date(),
  },
  {
    id: 3,
    name: '🔸 TheCommander',
    description: 'Terminal-based AI OS assistant with NLP-powered commands, integration with local shell & Python, and modular LLM agent logic for system automation.',
    language: 'Python',
    tags: ['AI', 'Terminal', 'Assistant'],
    stars: 0,
    url: 'https://github.com/RafalW3bCraft/TheCommander',
    lastUpdated: new Date(),
  },
  {
    id: 4,
    name: '🔸 WhisperAiEngine',
    description: 'AI Speech-to-Text Engine with Whisper fine-tuning, real-time transcription capabilities, used in surveillance & language processing projects.',
    language: 'Python',
    tags: ['AI', 'Speech', 'Whisper'],
    stars: 0,
    url: 'https://github.com/RafalW3bCraft/WhisperAiEngine',
    lastUpdated: new Date(),
  },
  {
    id: 5,
    name: '🔸 OmniLanguageTutor',
    description: 'Quran + Spanish Learning App with word-by-word IPA, translation & audio sync, plus AI tutoring for enhanced language acquisition and religious studies.',
    language: 'React',
    tags: ['Education', 'AI', 'Language'],
    stars: 0,
    url: 'https://github.com/RafalW3bCraft/OmniLanguageTutor',
    lastUpdated: new Date(),
  }
];

export function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<GithubProject[]>({
    queryKey: ['/api/github/projects'],
    queryFn: async () => {
      const response = await fetch('/api/github/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
  });

  const displayProjects = projects && projects.length > 0 ? projects : portfolioProjects;

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      Python: 'neon-green',
      Go: 'cyber-purple',
      Rust: 'gold-accent',
      React: 'neon-cyan',
      JavaScript: 'gold-accent',
      TypeScript: 'neon-cyan',
      Java: 'neon-green',
      'Node.js': 'cyber-purple',
    };
    return colors[language] || 'neon-cyan';
  };

  const getBorderColor = (index: number) => {
    const colors = ['neon-green', 'cyber-purple', 'gold-accent', 'neon-cyan'];
    return colors[index % colors.length];
  };

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-cyber text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-neon-cyan">SECURITY</span>{' '}
          <span className="text-cyber-purple">PROJECTS</span>
        </h2>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="terminal-window p-6 animate-pulse">
                <div className="h-6 bg-gray-600 rounded mb-4"></div>
                <div className="h-16 bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-600 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {displayProjects.map((project, index) => (
              <div
                key={project.id}
                className={`terminal-window p-6 hover:border-${getBorderColor(index)} transition-all duration-300 group`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-cyber text-xl text-neon-green group-hover:text-gold-accent transition-colors duration-300">
                    {project.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={`px-2 py-1 bg-${getLanguageColor(project.language || 'typescript')} text-matrix-black rounded text-xs font-mono`}
                    >
                      {project.language}
                    </Badge>
                    <div className="flex items-center text-yellow-400">
                      <Star size={14} className="mr-1" />
                      <span className="text-sm font-mono">{project.stars}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 font-mono text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Project Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(project as any).tags?.map((tag: string, tagIndex: number) => (
                    <Badge 
                      key={tagIndex}
                      variant="outline" 
                      className={`px-2 py-1 text-xs rounded font-mono transition-colors duration-300 ${
                        tagIndex % 4 === 0
                          ? 'border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-matrix-black'
                          : tagIndex % 4 === 1
                          ? 'border-neon-green text-neon-green hover:bg-neon-green hover:text-matrix-black'
                          : tagIndex % 4 === 2
                          ? 'border-cyber-purple text-cyber-purple hover:bg-cyber-purple hover:text-white'
                          : 'border-gold-accent text-gold-accent hover:bg-gold-accent hover:text-matrix-black'
                      }`}
                    >
                      {tag}
                    </Badge>
                  )) || null}
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neon-cyan hover:text-gold-accent transition-colors duration-300 font-mono text-sm flex items-center"
                  >
                    <Github size={16} className="mr-2" />
                    VIEW_CODE
                  </a>
                  <Button
                    variant="link"
                    className="text-cyber-purple hover:text-gold-accent transition-colors duration-300 font-mono text-sm p-0"
                    onClick={() => window.open(project.url, '_blank')}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    DEMO
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
