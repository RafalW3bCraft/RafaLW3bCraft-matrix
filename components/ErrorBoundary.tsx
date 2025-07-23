import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Log to monitoring service
    if (typeof window !== 'undefined') {
      // Send to Sentry or custom logging
      fetch('/api/error-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
        }),
      }).catch(console.error);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-matrix-black flex items-center justify-center px-4">
          <div className="terminal-window p-8 max-w-md w-full text-center">
            <div className="flex items-center justify-center mb-6">
              <AlertTriangle className="text-red-500 w-16 h-16" />
            </div>
            
            <h1 className="font-cyber text-2xl text-red-500 mb-4">
              SYSTEM BREACH DETECTED
            </h1>
            
            <p className="text-gray-300 font-mono text-sm mb-6">
              An unexpected error occurred in the cybersecurity matrix.
              {this.state.error && (
                <span className="block mt-2 text-red-400 text-xs">
                  Error: {this.state.error.message}
                </span>
              )}
            </p>

            <div className="space-y-3">
              <Button
                onClick={this.handleReset}
                className="w-full cyber-button"
              >
                <RefreshCw className="mr-2 w-4 h-4" />
                Retry Operation
              </Button>
              
              <Button
                onClick={this.handleReload}
                variant="outline"
                className="w-full border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-matrix-black"
              >
                <RefreshCw className="mr-2 w-4 h-4" />
                Reload System
              </Button>
              
              <Button
                onClick={this.handleHome}
                variant="outline"
                className="w-full border-neon-green text-neon-green hover:bg-neon-green hover:text-matrix-black"
              >
                <Home className="mr-2 w-4 h-4" />
                Return to Base
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}