import { NextRequest, NextResponse } from 'next/server';

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 values
    if (values.length > 100) {
      values.shift();
    }
  }

  getAverageMetric(name: string): number {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return 0;
    
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  getMetrics() {
    const result: Record<string, any> = {};
    
    for (const [name, values] of this.metrics.entries()) {
      if (values.length > 0) {
        result[name] = {
          average: this.getAverageMetric(name),
          current: values[values.length - 1],
          count: values.length,
        };
      }
    }
    
    return result;
  }
}

// Middleware to track request timing
export function performanceMiddleware(req: NextRequest) {
  const start = Date.now();
  const monitor = PerformanceMonitor.getInstance();
  
  return {
    end: () => {
      const duration = Date.now() - start;
      monitor.recordMetric('request_duration', duration);
      monitor.recordMetric(`${req.method}_requests`, duration);
      
      // Track specific route patterns
      const path = req.nextUrl.pathname;
      if (path.startsWith('/api/')) {
        monitor.recordMetric('api_requests', duration);
      }
      
      return duration;
    }
  };
}

// Web Vitals tracking
export interface WebVitals {
  id: string;
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export function getVitalsRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: [0.1, 0.25],
    FID: [100, 300],
    FCP: [1800, 3000],
    LCP: [2500, 4000],
    TTFB: [800, 1800],
  };

  const [good, poor] = thresholds[name as keyof typeof thresholds] || [0, 0];
  
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

// Cache utilities for better performance
export class CacheManager {
  private static cache = new Map<string, { data: any; expiry: number }>();

  static set(key: string, data: any, ttlMs: number = 5 * 60 * 1000) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttlMs,
    });
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  static delete(key: string) {
    this.cache.delete(key);
  }

  static clear() {
    this.cache.clear();
  }

  static size() {
    return this.cache.size;
  }

  static cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Image optimization helper
export function optimizeImageUrl(src: string, width?: number, quality?: number): string {
  if (!src) return '';
  
  // If it's already optimized or external, return as is
  if (src.includes('/_next/image') || src.startsWith('http')) {
    return src;
  }
  
  const params = new URLSearchParams();
  params.append('url', src);
  
  if (width) params.append('w', width.toString());
  if (quality) params.append('q', quality.toString());
  
  return `/_next/image?${params.toString()}`;
}

// Resource hints for preloading
export function generateResourceHints(urls: string[]) {
  return urls.map(url => ({
    rel: 'preload',
    href: url,
    as: getResourceType(url),
  }));
}

function getResourceType(url: string): string {
  const ext = url.split('.').pop()?.toLowerCase();
  
  switch (ext) {
    case 'css':
      return 'style';
    case 'js':
    case 'mjs':
      return 'script';
    case 'woff':
    case 'woff2':
    case 'ttf':
    case 'otf':
      return 'font';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'webp':
    case 'svg':
      return 'image';
    default:
      return 'fetch';
  }
}

// Bundle analyzer for production optimization
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return null;
  
  const scripts = Array.from(document.scripts);
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  const analysis = {
    scripts: scripts.map(script => ({
      src: script.src,
      size: script.innerHTML.length || 0,
    })),
    stylesheets: stylesheets.map(link => ({
      href: (link as HTMLLinkElement).href,
    })),
    totalScriptSize: scripts.reduce((total, script) => total + script.innerHTML.length, 0),
  };
  
  return analysis;
}