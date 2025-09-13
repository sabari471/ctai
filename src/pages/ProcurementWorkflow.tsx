import { useState } from "react";
import { motion } from "framer-motion";
import { 
  GitBranch, 
  Plus, 
  Send, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  FileText,
  User,
  DollarSign
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProcurementWorkflow = () => {
  const [activeTab, setActiveTab] = useState("request");

  const workflowSteps = [
    { id: 1, name: "Request Submitted", status: "completed", date: "2024-01-10" },
    { id: 2, name: "Manager Approval", status: "completed", date: "2024-01-11" },
    { id: 3, name: "Finance Approval", status: "current", date: "2024-01-12" },
    { id: 4, name: "Vendor Selection", status: "pending", date: "TBD" },
    { id: 5, name: "Purchase Order", status: "pending", date: "TBD" },
    { id: 6, name: "Delivery", status: "pending", date: "TBD" },
  ];

  const activeRequests = [
    {
      id: "PR-2024-001",
      material: "Electrical Transformers",
      requestor: "John Smith",
      value: "₹5,70,000",
      status: "Finance Approval",
      priority: "High",
      daysOpen: 3,
    },
    {
      id: "PR-2024-002", 
      material: "Steel Reinforcement",
      requestor: "Sarah Johnson",
      value: "₹5,52,500",
      status: "Vendor Selection",
      priority: "Medium",
      daysOpen: 7,
    },
    {
      id: "PR-2024-003",
      material: "Control Panel Equipment",
      requestor: "Mike Wilson",
      value: "₹4,50,000",
      status: "Purchase Order",
      priority: "Critical",
      daysOpen: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'current': return 'bg-primary text-primary-foreground animate-pulse-glow';
      case 'pending': return 'bg-muted text-muted-foreground';
      case 'finance approval': return 'bg-warning text-warning-foreground';
      case 'vendor selection': return 'bg-secondary text-secondary-foreground';
      case 'purchase order': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const RequestForm = () => (
    <Card className="glass border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          New Procurement Request
        </CardTitle>
        <CardDescription>
          Submit a new material or service procurement request
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="material">Material/Service</Label>
              <Input 
                id="material"
                placeholder="e.g., Electrical Transformer"
                className="glass border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger className="glass border-0">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="glass border-0">
                  <SelectItem value="electrical">Electrical Equipment</SelectItem>
                  <SelectItem value="civil">Civil & Construction</SelectItem>
                  <SelectItem value="mechanical">Mechanical Components</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity"
                placeholder="e.g., 2"
                className="glass border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Input 
                id="unit"
                placeholder="e.g., units, kg, meters"
                className="glass border-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Estimated Budget</Label>
              <Input 
                id="budget"
                placeholder="₹0.00"
                className="glass border-0"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level</Label>
              <Select>
                <SelectTrigger className="glass border-0">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="glass border-0">
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery">Required By</Label>
              <Input 
                id="delivery"
                type="date"
                className="glass border-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justification">Business Justification</Label>
            <Textarea 
              id="justification"
              placeholder="Explain why this procurement is needed..."
              className="glass border-0 min-h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">Technical Specifications</Label>
            <Textarea 
              id="specifications"
              placeholder="Detailed technical requirements and specifications..."
              className="glass border-0 min-h-24"
            />
          </div>

          <Button className="w-full bg-gradient-primary hover-lift">
            <Send className="h-4 w-4 mr-2" />
            Submit Request
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );

  const ApprovalWorkflow = () => (
    <div className="space-y-6">
      {/* Current Workflow Status */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Request PR-2024-001 - Electrical Transformers
          </CardTitle>
          <CardDescription>Track approval progress and next steps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === 'completed' ? 'bg-success' :
                    step.status === 'current' ? 'bg-primary animate-pulse-glow' :
                    'bg-muted-foreground/20'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-success-foreground" />
                    ) : step.status === 'current' ? (
                      <Clock className="h-5 w-5 text-primary-foreground" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{step.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {step.status === 'current' ? 'In progress...' : 
                     step.status === 'completed' ? `Completed on ${step.date}` :
                     'Pending'}
                  </p>
                </div>
                
                <Badge className={getStatusColor(step.status)}>
                  {step.status}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const ProcurementTracker = () => (
    <div className="space-y-6">
      {/* Active Requests */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-secondary" />
            Active Procurement Requests
          </CardTitle>
          <CardDescription>Monitor all ongoing procurement activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeRequests.map((request, index) => (
              <motion.div
                key={request.id}
                className="p-4 glass rounded-lg hover-lift cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold">{request.id}</h4>
                      <p className="text-sm text-muted-foreground">{request.material}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold">{request.value}</p>
                      <p className="text-xs text-muted-foreground">by {request.requestor}</p>
                    </div>
                    
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                    
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                    
                    <div className="text-sm text-muted-foreground">
                      {request.daysOpen} days
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <p className="text-lg font-bold">23</p>
                <p className="text-xs text-muted-foreground">Total Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-warning" />
              <div>
                <p className="text-lg font-bold">8</p>
                <p className="text-xs text-muted-foreground">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-secondary" />
              <div>
                <p className="text-lg font-bold">12</p>
                <p className="text-xs text-muted-foreground">In Transit</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-6 w-6 text-success" />
              <div>
                <p className="text-lg font-bold">156</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
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
          Procurement Workflow
        </motion.h1>
        <p className="text-muted-foreground">
          Manage procurement requests, approvals, and order tracking
        </p>
      </div>

      {/* Workflow Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass">
          <TabsTrigger value="request">New Request</TabsTrigger>
          <TabsTrigger value="approval">Approval Flow</TabsTrigger>
          <TabsTrigger value="tracker">Tracker</TabsTrigger>
        </TabsList>

        <TabsContent value="request">
          <RequestForm />
        </TabsContent>

        <TabsContent value="approval">
          <ApprovalWorkflow />
        </TabsContent>

        <TabsContent value="tracker">
          <ProcurementTracker />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ProcurementWorkflow;