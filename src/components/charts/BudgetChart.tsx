import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ComposedChart, Area, AreaChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, Target, AlertTriangle, CheckCircle } from "lucide-react";

interface BudgetData {
  category: string;
  allocated: number;
  spent: number;
  committed: number;
  remaining: number;
  variance: number;
  status: 'on-track' | 'over-budget' | 'under-budget' | 'at-risk';
}

interface BudgetChartProps {
  budgetData: BudgetData[];
  totalBudget?: number;
  className?: string;
}

const BudgetChart = ({ budgetData, totalBudget = 2800000, className = "" }: BudgetChartProps) => {
  // Calculate totals
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0);
  const totalCommitted = budgetData.reduce((sum, item) => sum + item.committed, 0);
  const totalRemaining = budgetData.reduce((sum, item) => sum + item.remaining, 0);
  const budgetUtilization = ((totalSpent + totalCommitted) / totalBudget) * 100;

  // Variance analysis
  const varianceData = budgetData.map(item => ({
    ...item,
    utilizationPercent: ((item.spent + item.committed) / item.allocated) * 100,
    spentPercent: (item.spent / item.allocated) * 100,
  }));

  // Monthly spending trend (simulated)
  const monthlyTrend = [
    { month: 'Oct', budget: totalBudget / 6, actual: totalSpent * 0.1, forecast: totalSpent * 0.12 },
    { month: 'Nov', budget: totalBudget / 6, actual: totalSpent * 0.25, forecast: totalSpent * 0.28 },
    { month: 'Dec', budget: totalBudget / 6, actual: totalSpent * 0.45, forecast: totalSpent * 0.48 },
    { month: 'Jan', budget: totalBudget / 6, actual: totalSpent * 0.68, forecast: totalSpent * 0.72 },
    { month: 'Feb', budget: totalBudget / 6, actual: totalSpent * 0.88, forecast: totalSpent * 0.92 },
    { month: 'Mar', budget: totalBudget / 6, actual: totalSpent, forecast: totalSpent * 1.05 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'hsl(142 76% 36%)';
      case 'over-budget': return 'hsl(0 84.2% 60.2%)';
      case 'under-budget': return 'hsl(221.2 83.2% 53.3%)';
      case 'at-risk': return 'hsl(47.9 95.8% 53.1%)';
      default: return 'hsl(215.4 16.3% 46.9%)';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'over-budget': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'under-budget': return <TrendingUp className="h-4 w-4 text-primary" />;
      case 'at-risk': return <AlertTriangle className="h-4 w-4 text-warning" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
    return `₹${value.toFixed(0)}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border-0 p-3 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`grid gap-6 ${className}`}>
      {/* Budget Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                  <p className="text-sm text-muted-foreground">Spent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(totalCommitted)}</p>
                  <p className="text-sm text-muted-foreground">Committed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(totalRemaining)}</p>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Budget Utilization Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Budget Utilization Overview
            </CardTitle>
            <CardDescription>
              Current budget utilization: {budgetUtilization.toFixed(1)}%
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress 
                value={budgetUtilization} 
                className="h-4"
                // @ts-ignore
                indicatorClassName={budgetUtilization > 90 ? "bg-destructive" : budgetUtilization > 75 ? "bg-warning" : "bg-primary"}
              />
              <div className="flex justify-between text-sm">
                <span>₹0</span>
                <span className="font-medium">{formatCurrency(totalSpent + totalCommitted)} / {formatCurrency(totalBudget)}</span>
                <span>{formatCurrency(totalBudget)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Budget by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-secondary" />
              Budget Breakdown by Category
            </CardTitle>
            <CardDescription>
              Allocated vs spent vs committed budget across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={varianceData}>
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
                <Bar dataKey="allocated" fill="hsl(215.4 16.3% 46.9% / 0.3)" name="Allocated" />
                <Bar dataKey="spent" fill="hsl(221.2 83.2% 53.3%)" name="Spent" />
                <Bar dataKey="committed" fill="hsl(47.9 95.8% 53.1%)" name="Committed" />
                <Bar dataKey="remaining" fill="hsl(142 76% 36%)" name="Remaining" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                Monthly Spending Trend
              </CardTitle>
              <CardDescription>
                Budget vs actual vs forecast spending
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrend}>
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
                  <Line 
                    type="monotone" 
                    dataKey="budget" 
                    stroke="hsl(215.4 16.3% 46.9%)" 
                    strokeDasharray="5 5"
                    name="Budget"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="hsl(221.2 83.2% 53.3%)" 
                    strokeWidth={3}
                    name="Actual"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="hsl(262.1 83.3% 57.8%)" 
                    strokeDasharray="3 3"
                    name="Forecast"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Category Status
              </CardTitle>
              <CardDescription>
                Budget performance by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {budgetData.map((category, index) => (
                  <motion.div
                    key={category.category}
                    className="p-4 glass rounded-lg hover-lift"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(category.status)}
                        <h4 className="font-medium">{category.category}</h4>
                      </div>
                      <Badge 
                        style={{ 
                          backgroundColor: getStatusColor(category.status) + '20',
                          color: getStatusColor(category.status)
                        }}
                      >
                        {category.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilization</span>
                        <span className="font-medium">
                          {((category.spent + category.committed) / category.allocated * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress 
                        value={(category.spent + category.committed) / category.allocated * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Spent: {formatCurrency(category.spent)}</span>
                        <span>Remaining: {formatCurrency(category.remaining)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BudgetChart;