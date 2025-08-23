import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import ProfileSetup from "@/pages/profile-setup";
import Dashboard from "@/pages/dashboard";
import CoursePage from "@/pages/course";
import NotFound from "@/pages/not-found";

function Router() {
  const { user, profile, isLoading } = useAuth();

  console.log('Router state:', { user: !!user, profile: !!profile, isLoading, userEmail: user?.email });

  // Show loading state while authentication is being determined
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <div className="text-cyber-accent font-mono text-lg">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Switch>
      {user && profile ? (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/course/:courseId/:lessonId?" component={CoursePage} />
        </>
      ) : (
        <>
          <Route path="/" component={Landing} />
        </>
      )}
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
