import { ReactNode } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { ThemeProvider } from '../ThemeProvider';
import { WebVitalsTracker } from '../analytics/WebVitals';
import { SEOHead } from '../SEOHead';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
}

export function Layout({ 
  children, 
  title, 
  description, 
  canonical, 
  noIndex = false 
}: LayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="rafalw3bcraft-theme">
      <ErrorBoundary>
        <SEOHead
          title={title}
          description={description}
          canonical={canonical}
          noIndex={noIndex}
        />
        
        <WebVitalsTracker />
        
        <div className="min-h-screen bg-matrix-black text-white">
          {children}
        </div>
        
        <Toaster />
      </ErrorBoundary>
    </ThemeProvider>
  );
}