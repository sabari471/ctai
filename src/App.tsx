import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MaterialForecasting from "./pages/MaterialForecasting";
import VendorIdentification from "./pages/VendorIdentification";
import ProjectSchedule from "./pages/ProjectSchedule";
import ProcurementPlan from "./pages/ProcurementPlan";
import ProcurementWorkflow from "./pages/ProcurementWorkflow";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="materials" element={<MaterialForecasting />} />
              <Route path="vendors" element={<VendorIdentification />} />
              <Route path="schedule" element={<ProjectSchedule />} />
              <Route path="procurement-plan" element={<ProcurementPlan />} />
              <Route path="workflow" element={<ProcurementWorkflow />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
