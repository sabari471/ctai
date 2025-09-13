import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Package, DollarSign, Calendar } from "lucide-react";

interface MaterialData {
  name: string;
  quantity: number;
  cost: number;
  category: string;
  deliveryDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface MaterialChartProps {
  materials: MaterialData[];
  className?: string;
}

const MaterialChart = ({ materials, className = "" }: MaterialChartProps) => {
  // Process data for different chart types
  const costByCategory = materials.reduce((acc, material) => {
    const existing = acc.find(item => item.category === material.category);
    if (existing) {
      existing.cost += material.cost;
      existing.count += 1;
    } else {
      acc.push({
        category: material.category,
        cost: material.cost,
        count: 1,
        color: getCategoryColor(material.category)
      });
    }
    return acc;
  }, [] as Array<{ category: string; cost: number; count: number; color: string }>);

  const monthlyForecast = materials.reduce((acc, material) => {
    const month = new Date(material.deliveryDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.cost += material.cost;
      existing.quantity += material.quantity;
    } else {
      acc.push({
        month,
        cost: material.cost,
        quantity: material.quantity,
        date: new Date(material.deliveryDate)
      });
    }
    return acc;
  }, [] as Array<{ month: string; cost: number; quantity: number; date: Date }>)
  .sort((a, b) => a.date.getTime() - b.date.getTime());

  const priorityDistribution = materials.reduce((acc, material) => {
    const existing = acc.find(item => item.priority === material.priority);
    if (existing) {
      existing.count += 1;
      existing.cost += material.cost;
    } else {
      acc.push({
        priority: material.priority,
        count: 1,
        cost: material.cost,
        color: getPriorityColor(material.priority)
      });
    }
    return acc;
  }, [] as Array<{ priority: string; count: number; cost: number; color: string }>);

  function getCategoryColor(category: string): string {
    const colors = {
      'Electrical': 'hsl(221.2 83.2% 53.3%)',
      'Civil': 'hsl(262.1 83.3% 57.8%)',
      'Mechanical': 'hsl(142.1 76.2% 36.3%)',
      'Safety': 'hsl(47.9 95.8% 53.1%)',
    };
    return colors[category as keyof typeof colors] || 'hsl(215.4 16.3% 46.9%)';
  }

  function getPriorityColor(priority: string): string {
    const colors = {
      'critical': 'hsl(0 84.2% 60.2%)',
      'high': 'hsl(47.9 95.8% 53.1%)',
      'medium': 'hsl(262.1 83.3% 57.8%)',
      'low': 'hsl(215.4 16.3% 46.9%)',
    };
    return colors[priority as keyof typeof colors] || 'hsl(215.4 16.3% 46.9%)';
  }

  const formatCurrency = (value: number) => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border-0 p-3 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'cost' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`grid gap-6 ${className}`}>
      {/* Cost by Category - Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Cost Distribution by Category
            </CardTitle>
            <CardDescription>
              Material costs breakdown across different procurement categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214.3 31.8% 91.4%)" />
                <XAxis 
                  dataKey="category" 
                  stroke="hsl(215.4 16.3% 46.9%)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(215.4 16.3% 46.9%)"
                  fontSize={12}
                  tickFormatter={formatCurrency}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="cost" 
                  fill="hsl(221.2 83.2% 53.3%)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Priority Distribution - Pie Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                Priority Distribution
              </CardTitle>
              <CardDescription>
                Materials categorized by procurement priority
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={priorityDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ priority, count }) => `${priority}: ${count}`}
                  >
                    {priorityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {priorityDistribution.map((item, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="glass"
                    style={{ backgroundColor: item.color + '20', color: item.color }}
                  >
                    {item.priority}: {item.count} items
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Monthly Forecast - Area Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Monthly Forecast
              </CardTitle>
              <CardDescription>
                Projected material costs and delivery timeline
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214.3 31.8% 91.4%)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(215.4 16.3% 46.9%)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(215.4 16.3% 46.9%)"
                    fontSize={12}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stroke="hsl(142.1 76.2% 36.3%)"
                    fill="hsl(142.1 76.2% 36.3% / 0.3)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Material Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{materials.length}</p>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">
                    {formatCurrency(materials.reduce((sum, m) => sum + m.cost, 0))}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">
                    {costByCategory.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">
                    {materials.filter(m => m.priority === 'critical' || m.priority === 'high').length}
                  </p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MaterialChart;