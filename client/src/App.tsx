import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Community from "@/pages/Community";
import Admin from "@/pages/Admin";
import AdminBlogEditor from "@/pages/AdminBlogEditor";
import AdminMessages from "@/pages/AdminMessages";
import AdminPosts from "@/pages/AdminPosts";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
// LoginRedirect removed - direct access only

function Router() {
  // Authentication removed - public access

  return (
    <Switch>
      {/* Public routes always available */}
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/community" component={Community} />
      
      {/* Authentication routes */}
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      
      {/* Protected admin routes */}
      <Route path="/admin" component={Admin} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/posts" component={AdminPosts} />
      <Route path="/admin/new-post" component={AdminBlogEditor} />
      <Route path="/admin/edit-post/:id" component={AdminBlogEditor} />
      
      {/* Home route - public access */}
      <Route path="/" component={Home} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="dark">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
