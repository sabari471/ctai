import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CheckCircle, AlertCircle, Play, Pause } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProjectSchedule = () => {
  const [view, setView] = useState("gantt");

  const phases = [
    {
      id: 1,
      name: "Material Procurement",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      progress: 68,
      status: "In Progress",
      color: "bg-primary",
      tasks: [
        { name: "Cement & Aggregates", progress: 90, status: "Nearly Complete" },
        { name: "Steel & Reinforcement", progress: 75, status: "In Progress" },
        { name: "Electrical Equipment", progress: 45, status: "In Progress" },
      ]
    },
    {
      id: 2,
      name: "Equipment Installation",
      startDate: "2024-02-01",
      endDate: "2024-03-15",
      progress: 25,
      status: "Starting",
      color: "bg-secondary",
      tasks: [
        { name: "Transformer Setup", progress: 0, status: "Pending" },
        { name: "Cable Installation", progress: 15, status: "Planning" },
        { name: "Control Panel Setup", progress: 5, status: "Planning" },
      ]
    },
    {
      id: 3,
      name: "Testing & Commissioning",
      startDate: "2024-03-01",
      endDate: "2024-03-30",
      progress: 0,
      status: "Scheduled",
      color: "bg-accent",
      tasks: [
        { name: "System Testing", progress: 0, status: "Scheduled" },
        { name: "Safety Checks", progress: 0, status: "Scheduled" },
        { name: "Final Commissioning", progress: 0, status: "Scheduled" },
      ]
    },
  ];

  const milestones = [
    { name: "Material Delivery Complete", date: "2024-02-10", status: "upcoming" },
    { name: "Transformer Installation", date: "2024-02-20", status: "scheduled" },
    { name: "System Integration", date: "2024-03-05", status: "scheduled" },
    { name: "Project Handover", date: "2024-03-30", status: "scheduled" },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress': case 'starting': return 'bg-primary text-primary-foreground';
      case 'nearly complete': return 'bg-success text-success-foreground';
      case 'scheduled': case 'pending': return 'bg-muted text-muted-foreground';
      case 'planning': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const GanttView = () => (
    <div className="space-y-6">
      {phases.map((phase, index) => (
        <motion.div
          key={phase.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
          className="space-y-4"
        >
          <Card className="glass border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${phase.color}`} />
                  <div>
                    <CardTitle className="text-lg">{phase.name}</CardTitle>
                    <CardDescription>
                      {phase.startDate} → {phase.endDate}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(phase.status)}>
                    {phase.status}
                  </Badge>
                  <span className="text-sm font-medium">{phase.progress}%</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="relative">
                <Progress value={phase.progress} className="h-6" />
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent to-white/20 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${phase.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              
              <div className="grid gap-3">
                {phase.tasks.map((task, taskIndex) => (
                  <motion.div
                    key={taskIndex}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.progress > 80 ? 'bg-success' :
                        task.progress > 30 ? 'bg-primary' : 'bg-muted-foreground'
                      }`} />
                      <span className="font-medium">{task.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary" className="glass">
                        {task.status}
                      </Badge>
                      <span className="text-sm">{task.progress}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const TimelineView = () => (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle>Project Milestones</CardTitle>
        <CardDescription>Key delivery points and checkpoints</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <div className="flex-shrink-0">
                <div className={`w-4 h-4 rounded-full ${
                  milestone.status === 'completed' ? 'bg-success' :
                  milestone.status === 'upcoming' ? 'bg-primary animate-pulse-glow' :
                  'bg-muted-foreground'
                }`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{milestone.name}</h4>
                <p className="text-sm text-muted-foreground">{milestone.date}</p>
              </div>
              <Badge variant={milestone.status === 'upcoming' ? 'default' : 'secondary'}>
                {milestone.status}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

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
          Project Schedule
        </motion.h1>
        <p className="text-muted-foreground">
          Interactive timeline and progress tracking for procurement activities
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">75</p>
                <p className="text-sm text-muted-foreground">Days Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-8 w-8 text-secondary" />
              <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Tasks Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-8 w-8 text-warning" />
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">At Risk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Views */}
      <Tabs defaultValue="gantt" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="glass">
            <TabsTrigger value="gantt">Gantt View</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="glass border-0 hover-lift">
              <Play className="h-4 w-4 mr-2" />
              Start Phase
            </Button>
            <Button variant="outline" size="sm" className="glass border-0 hover-lift">
              <Pause className="h-4 w-4 mr-2" />
              Hold
            </Button>
          </div>
        </div>

        <TabsContent value="gantt">
          <GanttView />
        </TabsContent>
        
        <TabsContent value="timeline">
          <TimelineView />
        </TabsContent>
        
        <TabsContent value="calendar">
          <Card className="glass border-0">
            <CardContent className="p-8 text-center">
              <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
              <p className="text-muted-foreground">
                Interactive calendar view coming soon with drag-and-drop scheduling
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProjectSchedule;