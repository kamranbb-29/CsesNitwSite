import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Team from "@/pages/team";
import About from "@/pages/about";
import Events from "@/pages/events";
import Gallery from "@/pages/gallery";
import AdminPage from "@/pages/AdminPage";
import AdminDashboard from "./pages/adminDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/team" component={Team} />
      <Route path="/about" component={About} />
      <Route path="/events" component={Events} />
      <Route path="/gallery" component={Gallery} />
      <Route path = "/admin" component={AdminPage} />
      <Route path = "/adminDashboard" component={() => <ProtectedRoute component={AdminDashboard}/>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
