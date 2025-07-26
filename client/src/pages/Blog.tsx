<<<<<<< HEAD
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { CyberNavigation } from '@/components/CyberNavigation';
import { MatrixRain } from '@/components/MatrixRain';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Calendar, Eye, Search } from 'lucide-react';
import type { BlogPost } from '@shared/schema';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?published=true');
      if (!response.ok) throw new Error('Failed to fetch posts');
=======
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { CyberNavigation } from "@/components/CyberNavigation";
import { MatrixRain } from "@/components/MatrixRain";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Calendar, Eye, Search } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog/posts?published=true");
      if (!response.ok) throw new Error("Failed to fetch posts");
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      return response.json();
    },
  });

<<<<<<< HEAD
  const filteredPosts = posts?.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];
=======
  const filteredPosts =
    posts?.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
    ) || [];
>>>>>>> b0a6a12 (intiate personal portfolio site and more)

  return (
    <div className="min-h-screen matrix-bg">
      <MatrixRain />
      <CyberNavigation />
<<<<<<< HEAD
      
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      <main className="relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-cyber text-4xl md:text-5xl font-bold mb-4">
<<<<<<< HEAD
              <span className="text-neon-cyan">CYBER</span>{' '}
              <span className="text-neon-green">SECURITY</span>{' '}
              <span className="text-cyber-purple">BLOG</span>
            </h1>
            <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto">
              Deep dives into cybersecurity, threat analysis, and security research
=======
              <span className="text-neon-cyan">Rafal<span className="text-neon-green">W3b</span>Craft</span>{" "}
              <span className="text-cyber-purple">BLOG</span>
            </h1>
            <p className="text-gray-400 font-mono text-lg max-w-2xl mx-auto">
              Deep dives into cybersecurity, Automation, App Development, Bots, AL/ML, threat analysis, and security research
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
<<<<<<< HEAD
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-cyan" size={20} />
=======
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-cyan"
                size={20}
              />
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-transparent border-neon-cyan text-white font-mono focus:border-neon-green"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
<<<<<<< HEAD
                <div key={i} className="glass-morphism p-6 rounded-lg animate-pulse">
=======
                <div
                  key={i}
                  className="glass-morphism p-6 rounded-lg animate-pulse"
                >
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                  <div className="h-4 bg-gray-600 rounded mb-3"></div>
                  <div className="h-6 bg-gray-600 rounded mb-3"></div>
                  <div className="h-16 bg-gray-600 rounded mb-4"></div>
                  <div className="h-4 bg-gray-600 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="terminal-window p-8 text-center max-w-2xl mx-auto">
              <div className="text-neon-green font-mono text-lg mb-4">
<<<<<<< HEAD
                <span className="text-gray-400">$</span> find ./blog -name "*{searchTerm}*"
              </div>
              <p className="text-gray-400 font-mono">
                {searchTerm ? `No posts found matching "${searchTerm}"` : 'No posts found. Check back soon for cyber security insights!'}
=======
                <span className="text-gray-400">$</span> find ./blog -name "*
                {searchTerm}*"
              </div>
              <p className="text-gray-400 font-mono">
                {searchTerm
                  ? `No posts found matching "${searchTerm}"`
                  : "No posts found. Check back soon for cyber security insights!"}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="glass-morphism p-6 rounded-lg hover:border-neon-cyan transition-all duration-300 group"
                >
                  <div className="flex items-center text-sm text-gray-400 mb-3 font-mono">
                    <Calendar size={14} className="mr-2" />
<<<<<<< HEAD
                    <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'No date'}</span>
=======
                    <span>
                      {post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString()
                        : "No date"}
                    </span>
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                    <span className="mx-2">•</span>
                    {post.tags && post.tags.length > 0 && (
                      <Badge
                        variant="outline"
                        className="px-2 py-1 bg-neon-cyan text-matrix-black rounded text-xs"
                      >
                        {post.tags[0]}
                      </Badge>
                    )}
                  </div>

                  <h2 className="font-cyber text-xl text-neon-green mb-3 group-hover:text-gold-accent transition-colors duration-300">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>

                  <p className="text-gray-300 mb-4 line-clamp-3">
<<<<<<< HEAD
                    {post.excerpt || post.content.substring(0, 150) + '...'}
=======
                    {post.excerpt || post.content.substring(0, 150) + "..."}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 1 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(1, 4).map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="outline"
                          className="px-2 py-1 border-cyber-purple text-cyber-purple text-xs font-mono"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="text-neon-cyan hover:text-gold-accent transition-colors duration-300 font-mono text-sm cursor-pointer">
                        READ_MORE &gt;&gt;
                      </span>
                    </Link>
<<<<<<< HEAD
                    
=======

>>>>>>> b0a6a12 (intiate personal portfolio site and more)
                    <div className="flex items-center text-sm text-gray-400 font-mono">
                      <Eye size={14} className="mr-1" />
                      <span>{post.views || 0}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination placeholder */}
          {filteredPosts.length > 9 && (
            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-4 glass-morphism p-4 rounded-lg">
<<<<<<< HEAD
                <span className="text-gray-400 font-mono text-sm">More posts coming soon...</span>
=======
                <span className="text-gray-400 font-mono text-sm">
                  More posts coming soon...
                </span>
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
