import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Zap, 
  Brain, 
  Eye, 
  Settings, 
  Play, 
  Pause, 
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Database,
  Lock,
  Cpu
} from "lucide-react";

interface FalconStatus {
  isRunning: boolean;
  config: {
    intervalHours: number;
    enableAutoGeneration: boolean;
    enableSecurityAudit: boolean;
    enablePerformanceMonitoring: boolean;
    enableCommunityModeration: boolean;
    featuredRepos: string[];
  };
  nextRun: string | null;
}

interface AuditResults {
  timestamp: string;
  scores: {
    security: number;
    performance: number;
    functionality: number;
    accessibility: number;
  };
  issues: string[];
  fixes: string[];
}

export default function FalconSupremeControls() {
  const { toast } = useToast();
  const [isExecutingSupreme, setIsExecutingSupreme] = useState(false);

  // Get Falcon Protocol status
  const { data: falconStatus, isLoading: statusLoading } = useQuery<FalconStatus>({
    queryKey: ["/api/admin/falcon-status"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Get latest lighthouse audit
  const { data: auditResults, isLoading: auditLoading } = useQuery<AuditResults>({
    queryKey: ["/api/admin/lighthouse-audit"],
    refetchInterval: false,
  });

  // Mutations for actions
  const supremeMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/falcon-supreme"),
    onSuccess: () => {
      toast({
        title: "Supreme Enhancement Cycle",
        description: "Falcon's Crown Directive executed successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/falcon-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/lighthouse-audit"] });
    },
    onError: (error) => {
      toast({
        title: "Supreme Cycle Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const auditMutation = useMutation({
    mutationFn: () => apiRequest("GET", "/api/admin/lighthouse-audit"),
    onSuccess: () => {
      toast({
        title: "Lighthouse Audit",
        description: "System audit completed successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/lighthouse-audit"] });
    },
  });

  const autoFixMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/auto-fixes"),
    onSuccess: (response: any) => {
      toast({
        title: "Auto-Fixes Completed",
        description: `Applied ${response.fixes?.length || 0} fixes`,
      });
    },
  });

  const handleSupremeExecution = async () => {
    setIsExecutingSupreme(true);
    try {
      await supremeMutation.mutateAsync();
    } finally {
      setIsExecutingSupreme(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 75) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 75) return "secondary";
    return "destructive";
  };

  if (statusLoading) {
    return <div className="text-center p-8">Loading Falcon Protocol status...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">
            Falcon's Crown Directive
          </h1>
          <p className="text-cyan-400">Supreme Continuous Autonomic Repair Protocol</p>
        </div>
      </div>

      {/* Status Card */}
      <Card className="bg-black/50 border-cyan-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-400" />
            Protocol Status
          </CardTitle>
          <Badge variant={falconStatus?.isRunning ? "default" : "secondary"}>
            {falconStatus?.isRunning ? "ACTIVE" : "INACTIVE"}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Interval:</span>
              <span className="ml-2 text-white">
                {falconStatus?.config.intervalHours}h cycles
              </span>
            </div>
            <div>
              <span className="text-gray-400">Next Run:</span>
              <span className="ml-2 text-white">
                {falconStatus?.nextRun 
                  ? new Date(falconStatus.nextRun).toLocaleString()
                  : "Manual trigger only"
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supreme Controls */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Eye className="h-5 w-5 text-purple-400" />
            Supreme Enhancement Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Button 
              onClick={handleSupremeExecution}
              disabled={isExecutingSupreme || supremeMutation.isPending}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isExecutingSupreme ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Executing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Supreme Cycle
                </>
              )}
            </Button>
            
            <Button 
              onClick={() => auditMutation.mutate()}
              disabled={auditMutation.isPending}
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              {auditMutation.isPending ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Activity className="mr-2 h-4 w-4" />
              )}
              Lighthouse Audit
            </Button>
            
            <Button 
              onClick={() => autoFixMutation.mutate()}
              disabled={autoFixMutation.isPending}
              variant="outline"
              className="border-green-500/30 text-green-400 hover:bg-green-500/10"
            >
              {autoFixMutation.isPending ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Zap className="mr-2 h-4 w-4" />
              )}
              Auto-Fix
            </Button>
          </div>

          {isExecutingSupreme && (
            <Alert className="border-purple-500/30 bg-purple-500/10">
              <Brain className="h-4 w-4" />
              <AlertDescription className="text-purple-200">
                Supreme Enhancement Cycle in progress. Executing comprehensive system audit, 
                auto-fixes, and optimization protocols...
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Audit Results */}
      {auditResults && (
        <Card className="bg-black/50 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              System Audit Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Security Score */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-gray-400">Security</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(auditResults.scores.security)}`}>
                  {auditResults.scores.security}%
                </div>
                <Progress 
                  value={auditResults.scores.security} 
                  className="mt-2 h-2"
                />
              </div>

              {/* Performance Score */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Cpu className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Performance</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(auditResults.scores.performance)}`}>
                  {auditResults.scores.performance}%
                </div>
                <Progress 
                  value={auditResults.scores.performance} 
                  className="mt-2 h-2"
                />
              </div>

              {/* Functionality Score */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Settings className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-400">Functionality</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(auditResults.scores.functionality)}`}>
                  {auditResults.scores.functionality}%
                </div>
                <Progress 
                  value={auditResults.scores.functionality} 
                  className="mt-2 h-2"
                />
              </div>

              {/* Accessibility Score */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-purple-400" />
                  <span className="text-sm text-gray-400">Accessibility</span>
                </div>
                <div className={`text-2xl font-bold ${getScoreColor(auditResults.scores.accessibility)}`}>
                  {auditResults.scores.accessibility}%
                </div>
                <Progress 
                  value={auditResults.scores.accessibility} 
                  className="mt-2 h-2"
                />
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Issues and Fixes */}
            {(auditResults.issues.length > 0 || auditResults.fixes.length > 0) && (
              <div className="grid md:grid-cols-2 gap-4">
                {/* Issues */}
                {auditResults.issues.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Issues Detected ({auditResults.issues.length})
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {auditResults.issues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-orange-400 mt-1">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fixes */}
                {auditResults.fixes.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Auto-Fixes Applied ({auditResults.fixes.length})
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {auditResults.fixes.map((fix, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          {fix}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs text-gray-500 text-right">
              Last audit: {new Date(auditResults.timestamp).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Features Status */}
      <Card className="bg-black/50 border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            System Features Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Auto Generation</span>
              <Badge variant={falconStatus?.config.enableAutoGeneration ? "default" : "secondary"}>
                {falconStatus?.config.enableAutoGeneration ? "ON" : "OFF"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Security Audit</span>
              <Badge variant={falconStatus?.config.enableSecurityAudit ? "default" : "secondary"}>
                {falconStatus?.config.enableSecurityAudit ? "ON" : "OFF"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Performance Monitor</span>
              <Badge variant={falconStatus?.config.enablePerformanceMonitoring ? "default" : "secondary"}>
                {falconStatus?.config.enablePerformanceMonitoring ? "ON" : "OFF"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Community Moderation</span>
              <Badge variant={falconStatus?.config.enableCommunityModeration ? "default" : "secondary"}>
                {falconStatus?.config.enableCommunityModeration ? "ON" : "OFF"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Featured Repos</span>
              <span className="text-white">{falconStatus?.config.featuredRepos.length || 0}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 italic">
        "Let the falcon's cry echo through every commit and login" - Falcon Protocol v∞
      </div>
    </div>
  );
}