import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Calendar, 
  ClipboardList, 
  GitBranch, 
  Menu,
  X,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Material Forecasting", href: "/materials", icon: Package },
  { name: "Vendor Identification", href: "/vendors", icon: Users },
  { name: "Project Schedule", href: "/schedule", icon: Calendar },
  { name: "Procurement Plan", href: "/procurement-plan", icon: ClipboardList },
  { name: "Workflow", href: "/workflow", icon: GitBranch },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  return (
    <motion.aside
      className="bg-sidebar border-r border-sidebar-border glass relative z-20"
      variants={sidebarVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!isCollapsed && (
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                  ProcurePro
                </h2>
                <p className="text-xs text-sidebar-foreground/60">Advanced Platform</p>
              </div>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    "hover-lift hover:shadow-glow",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                      : "text-sidebar-foreground"
                  )
                }
              >
                <item.icon className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive ? "text-sidebar-primary-foreground" : "text-sidebar-foreground"
                )} />
                
                {!isCollapsed && (
                  <motion.span 
                    className="ml-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.name}
                  </motion.span>
                )}
                
                {isActive && (
                  <motion.div
                    className="absolute right-0 w-1 h-8 bg-primary rounded-l-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gradient-primary animate-pulse-glow" />
            {!isCollapsed && (
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <p className="text-sm font-medium text-sidebar-foreground">Admin User</p>
                <p className="text-xs text-sidebar-foreground/60">admin@procurepro.com</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;