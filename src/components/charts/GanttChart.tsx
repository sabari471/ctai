import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Play, Pause, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface GanttTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'delayed';
  dependencies?: string[];
  assignee?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface GanttChartProps {
  tasks: GanttTask[];
  title?: string;
  className?: string;
}

const GanttChart = ({ tasks, title = "Project Timeline", className = "" }: GanttChartProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  // Calculate the date range and timeline
  const { startDate, endDate, totalDays } = useMemo(() => {
    const dates = tasks.flatMap(task => [new Date(task.startDate), new Date(task.endDate)]);
    const start = new Date(Math.min(...dates.map(d => d.getTime())));
    const end = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // Add padding
    start.setDate(start.getDate() - 7);
    end.setDate(end.getDate() + 7);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return { startDate: start, endDate: end, totalDays: diffDays };
  }, [tasks]);

  // Generate timeline weeks
  const weeks = useMemo(() => {
    const weeks = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      weeks.push(new Date(current));
      current.setDate(current.getDate() + 7);
    }
    
    return weeks;
  }, [startDate, endDate]);

  const getStatusColor = (status: GanttTask['status']) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-primary';
      case 'delayed': return 'bg-destructive';
      case 'not-started': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const getPriorityColor = (priority: GanttTask['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const calculateTaskPosition = (task: GanttTask) => {
    const taskStart = new Date(task.startDate);
    const taskEnd = new Date(task.endDate);
    
    const startOffset = Math.max(0, (taskStart.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = (taskEnd.getTime() - taskStart.getTime()) / (1000 * 60 * 60 * 24);
    
    const left = (startOffset / totalDays) * 100;
    const width = Math.max(2, (duration / totalDays) * 100);
    
    return { left: `${left}%`, width: `${width}%` };
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <Card className={`glass border-0 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="glass border-0">
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button variant="outline" size="sm" className="glass border-0">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Timeline Header */}
        <div className="border-b border-border bg-muted/30 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {formatDate(startDate)} - {formatDate(endDate)}
              </span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              {totalDays} days • {tasks.length} tasks
            </div>
          </div>
          
          {/* Week Grid */}
          <div className="grid grid-cols-12 gap-2 text-xs text-muted-foreground">
            {weeks.slice(0, 12).map((week, index) => (
              <div key={index} className="text-center">
                {formatDate(week)}
              </div>
            ))}
          </div>
        </div>

        {/* Tasks */}
        <div className="relative">
          {/* Vertical Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="border-r border-border/30" />
              ))}
            </div>
          </div>

          {/* Task Rows */}
          <div className="space-y-1 p-6 pt-0">
            {tasks.map((task, index) => {
              const position = calculateTaskPosition(task);
              const isSelected = selectedTask === task.id;
              
              return (
                <motion.div
                  key={task.id}
                  className="relative h-16 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Task Info */}
                  <div className="w-80 pr-4 flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{task.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge className={getPriorityColor(task.priority)} variant="secondary">
                          {task.priority}
                        </Badge>
                        {task.assignee && <span>• {task.assignee}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Bar */}
                  <div className="flex-1 relative h-8 mx-4">
                    <motion.div
                      className={`absolute top-1 h-6 rounded-lg cursor-pointer transition-all duration-200 ${
                        getStatusColor(task.status)
                      } ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      style={position}
                      onClick={() => setSelectedTask(isSelected ? null : task.id)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative h-full px-2 flex items-center justify-between text-xs text-white font-medium">
                        <span className="truncate">{task.progress}%</span>
                        {task.status === 'delayed' && (
                          <AlertCircle className="h-3 w-3 ml-1" />
                        )}
                      </div>
                      
                      {/* Progress Fill */}
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-lg"
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </motion.div>
                    
                    {/* Dependencies Lines */}
                    {task.dependencies?.map((depId, depIndex) => {
                      const depTask = tasks.find(t => t.id === depId);
                      if (!depTask) return null;
                      
                      return (
                        <motion.div
                          key={depId}
                          className="absolute top-4 h-px bg-primary/50"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: (index + depIndex) * 0.2 }}
                        />
                      );
                    })}
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-20 text-right">
                    <div className="text-sm font-medium">{task.progress}%</div>
                    <Progress value={task.progress} className="h-1 mt-1" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Task Details Panel */}
        {selectedTask && (
          <motion.div
            className="border-t border-border bg-muted/30 p-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {(() => {
              const task = tasks.find(t => t.id === selectedTask);
              if (!task) return null;
              
              return (
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Task Details</h4>
                    <div className="space-y-1 text-sm">
                      <div>Status: <Badge className={getStatusColor(task.status)} variant="secondary">
                        {task.status.replace('-', ' ')}
                      </Badge></div>
                      <div>Priority: <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge></div>
                      {task.assignee && <div>Assignee: {task.assignee}</div>}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Timeline</h4>
                    <div className="space-y-1 text-sm">
                      <div>Start: {formatDate(new Date(task.startDate))}</div>
                      <div>End: {formatDate(new Date(task.endDate))}</div>
                      <div>Progress: {task.progress}%</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Dependencies</h4>
                    <div className="space-y-1 text-sm">
                      {task.dependencies?.length ? (
                        task.dependencies.map(depId => {
                          const depTask = tasks.find(t => t.id === depId);
                          return depTask ? (
                            <div key={depId}>• {depTask.name}</div>
                          ) : null;
                        })
                      ) : (
                        <div className="text-muted-foreground">No dependencies</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default GanttChart;