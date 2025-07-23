import { useEffect } from 'react';
import { WebVitals, getVitalsRating } from '@/lib/performance';

interface WebVitalsProps {
  onMetric?: (metric: WebVitals) => void;
}

export function WebVitalsTracker({ onMetric }: WebVitalsProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    const trackVital = (name: string, value: number) => {
      const metric: WebVitals = {
        id: `${name}-${Date.now()}-${Math.random()}`,
        name: name as WebVitals['name'],
        value,
        rating: getVitalsRating(name, value),
      };

      // Send to analytics
      if (onMetric) {
        onMetric(metric);
      }

      // Send to API for tracking
      fetch('/api/analytics/vitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metric),
      }).catch(console.error);
    };

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    let clsEntries: LayoutShift[] = [];

    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries() as LayoutShift[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          clsEntries.push(entry);
        }
      }
    });

    if ('LayoutShift' in window) {
      clsObserver.observe({ type: 'layout-shift', buffered: true });
    }

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        trackVital('FID', entry.processingStart - entry.startTime);
      }
    });

    if ('PerformanceEventTiming' in window) {
      fidObserver.observe({ type: 'first-input', buffered: true });
    }

    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      trackVital('LCP', lastEntry.startTime);
    });

    if ('LargestContentfulPaint' in window) {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          trackVital('FCP', entry.startTime);
        }
      }
    });

    fcpObserver.observe({ type: 'paint', buffered: true });

    // Time to First Byte (TTFB)
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      trackVital('TTFB', navEntry.responseStart - navEntry.requestStart);
    }

    // Cleanup function
    return () => {
      clsObserver.disconnect();
      fidObserver.disconnect();
      lcpObserver.disconnect();
      fcpObserver.disconnect();

      // Report final CLS value
      if (clsValue > 0) {
        trackVital('CLS', clsValue);
      }
    };
  }, [onMetric]);

  return null; // This component doesn't render anything
}

// Hook for using Web Vitals in components
export function useWebVitals() {
  useEffect(() => {
    const trackPageView = () => {
      // Track page load performance
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const metrics = {
            dns: navigation.domainLookupEnd - navigation.domainLookupStart,
            connection: navigation.connectEnd - navigation.connectStart,
            request: navigation.responseStart - navigation.requestStart,
            response: navigation.responseEnd - navigation.responseStart,
            domParsing: navigation.domInteractive - navigation.responseEnd,
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loading: navigation.loadEventEnd - navigation.loadEventStart,
            total: navigation.loadEventEnd - navigation.navigationStart,
          };

          // Send metrics to analytics
          fetch('/api/analytics/performance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              page: window.location.pathname,
              metrics,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
            }),
          }).catch(console.error);
        }
      }
    };

    // Track when page is fully loaded
    if (document.readyState === 'complete') {
      trackPageView();
    } else {
      window.addEventListener('load', trackPageView);
      return () => window.removeEventListener('load', trackPageView);
    }
  }, []);
}