import { motion } from "framer-motion";
import { TrendingUp, Users, Package, AlertCircle, DollarSign, Calendar, Truck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Globe3D from "@/components/Globe3D";

const Dashboard = () => {
  const stats = [
    {
      title: "Predicted Materials",
      value: "247",
      change: "+12%",
      icon: Package,
      color: "text-primary",
    },
    {
      title: "Active Vendors",
      value: "45",
      change: "+3",
      icon: Users,
      color: "text-secondary",
    },
    {
      title: "Pending Approvals",
      value: "8",
      change: "-2",
      icon: AlertCircle,
      color: "text-warning",
    },
    {
      title: "Total Budget",
      value: "₹2.8M",
      change: "+5.2%",
      icon: DollarSign,
      color: "text-accent",
    },
  ];

  const recentActivities = [
    { action: "Material forecast updated", time: "2 min ago", status: "success" },
    { action: "Vendor approval pending", time: "15 min ago", status: "warning" },
    { action: "Delivery scheduled", time: "1 hour ago", status: "info" },
    { action: "Budget approved", time: "2 hours ago", status: "success" },
  ];

  const upcomingMilestones = [
    { title: "Transformer Installation", date: "Jan 15, 2024", progress: 75 },
    { title: "Cable Layout", date: "Jan 22, 2024", progress: 45 },
    { title: "Final Inspection", date: "Feb 5, 2024", progress: 0 },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <motion.h1 
          className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Dashboard Overview
        </motion.h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your procurement projects.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card className="glass border-0 hover-lift group cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color} group-hover:scale-110 transition-transform`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>{' '}
                  from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Globe Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="glass border-0 h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Global Vendor Distribution
              </CardTitle>
              <CardDescription>
                Interactive 3D view of your supplier network
              </CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <Globe3D />
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-0 h-96">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-success' :
                      activity.status === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                Upcoming Milestones
              </CardTitle>
              <CardDescription>Project timeline and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingMilestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">{milestone.title}</h4>
                      <span className="text-xs text-muted-foreground">{milestone.date}</span>
                    </div>
                    <Progress value={milestone.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{milestone.progress}% complete</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-accent" />
                Quick Actions
              </CardTitle>
              <CardDescription>Frequently used procurement tools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                <Button className="justify-start bg-gradient-primary hover-lift" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Generate Material Forecast
                </Button>
                <Button className="justify-start bg-gradient-secondary hover-lift" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Find New Vendors
                </Button>
                <Button className="justify-start bg-gradient-primary hover-lift" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Update Schedule
                </Button>
                <Button className="justify-start bg-gradient-secondary hover-lift" variant="outline">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Review Approvals
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;