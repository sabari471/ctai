import { motion } from "framer-motion";
import { Package, TrendingUp, Download, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MaterialChart from "@/components/charts/MaterialChart";

const MaterialForecasting = () => {
  const materials = [
    {
      id: 1,
      name: "Cement (OPC 53 Grade)",
      quantity: 1250,
      unit: "bags",
      unitCost: 450,
      totalCost: 562500,
      priority: "High",
      deliveryDate: "2024-01-20",
      supplier: "BuildMax Industries",
      category: "Civil",
    },
    {
      id: 2,
      name: "Steel Reinforcement Bars",
      quantity: 8500,
      unit: "kg",
      unitCost: 65,
      totalCost: 552500,
      priority: "Critical",
      deliveryDate: "2024-01-18",
      supplier: "MetalCorp Ltd",
      category: "Civil",
    },
    {
      id: 3,
      name: "Electrical Cables (XLPE)",
      quantity: 2800,
      unit: "meters",
      unitCost: 180,
      totalCost: 504000,
      priority: "Medium",
      deliveryDate: "2024-01-25",
      supplier: "ElectroPro Systems",
      category: "Electrical",
    },
    {
      id: 4,
      name: "Transformer (33/11 KV)",
      quantity: 2,
      unit: "units",
      unitCost: 285000,
      totalCost: 570000,
      priority: "Critical",
      deliveryDate: "2024-02-01",
      supplier: "PowerTech Solutions",
      category: "Electrical",
    },
    {
      id: 5,
      name: "Control Panel Equipment",
      quantity: 12,
      unit: "units",
      unitCost: 45000,
      totalCost: 540000,
      priority: "High",
      deliveryDate: "2024-01-30",
      supplier: "AutoControl Systems",
      category: "Electrical",
    },
  ];

  // Transform materials data for charts
  const chartMaterials = materials.map(material => ({
    name: material.name,
    quantity: material.quantity,
    cost: material.totalCost,
    category: material.category,
    deliveryDate: material.deliveryDate,
    priority: material.priority.toLowerCase() as 'low' | 'medium' | 'high' | 'critical',
  }));

  const insights = [
    {
      title: "Most Expensive Material",
      value: "Transformers",
      amount: "₹5.7L",
      trend: "up",
    },
    {
      title: "Critical Items",
      value: "2 Materials",
      amount: "Need immediate attention",
      trend: "warning",
    },
    {
      title: "Total Forecast Value",
      value: "₹27.29L",
      amount: "Current estimate",
      trend: "stable",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-warning text-warning-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

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
          Material Forecasting
        </motion.h1>
        <p className="text-muted-foreground">
          AI-powered material requirement prediction and cost analysis
        </p>
      </div>

      {/* Insights Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {insights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card className="glass border-0 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{insight.title}</p>
                    <p className="text-2xl font-bold">{insight.value}</p>
                    <p className="text-xs text-muted-foreground">{insight.amount}</p>
                  </div>
                  <TrendingUp className={`h-8 w-8 ${
                    insight.trend === 'up' ? 'text-success' :
                    insight.trend === 'warning' ? 'text-warning' : 'text-muted-foreground'
                  }`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              className="pl-10 glass border-0"
            />
          </div>
          <Button variant="outline" className="glass border-0 hover-lift">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <Button className="bg-gradient-primary hover-lift">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </motion.div>

      {/* AI-Powered Material Charts */}
      <MaterialChart 
        materials={chartMaterials}
        className="mt-6"
      />

      {/* Materials Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Material Requirements Forecast
            </CardTitle>
            <CardDescription>
              Detailed breakdown of predicted material needs and costs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted/50">
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Cost</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Supplier</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material, index) => (
                    <motion.tr
                      key={material.id}
                      className="hover:bg-muted/50 transition-colors cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.01, x: 5 }}
                    >
                      <TableCell className="font-medium">{material.name}</TableCell>
                      <TableCell>
                        {material.quantity.toLocaleString()} {material.unit}
                      </TableCell>
                      <TableCell>₹{material.unitCost.toLocaleString()}</TableCell>
                      <TableCell className="font-semibold">
                        ₹{material.totalCost.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(material.priority)}>
                          {material.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{material.deliveryDate}</TableCell>
                      <TableCell>{material.supplier}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MaterialForecasting;