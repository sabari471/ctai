import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Star, MapPin, Clock, TrendingUp, Award } from "lucide-react";

interface VendorData {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  projects: number;
  responseTime: string;
  totalValue: number;
  performance: {
    quality: number;
    delivery: number;
    cost: number;
    service: number;
  };
  orders: Array<{
    month: string;
    value: number;
    orders: number;
  }>;
}

interface VendorChartProps {
  vendors: VendorData[];
  className?: string;
}

const VendorChart = ({ vendors, className = "" }: VendorChartProps) => {
  // Process data for different visualizations
  const categoryDistribution = vendors.reduce((acc, vendor) => {
    const existing = acc.find(item => item.category === vendor.category);
    if (existing) {
      existing.count += 1;
      existing.totalValue += vendor.totalValue;
    } else {
      acc.push({
        category: vendor.category,
        count: 1,
        totalValue: vendor.totalValue,
        color: getCategoryColor(vendor.category)
      });
    }
    return acc;
  }, [] as Array<{ category: string; count: number; totalValue: number; color: string }>);

  const performanceAnalysis = vendors.map(vendor => ({
    name: vendor.name.split(' ')[0], // Short name for chart
    fullName: vendor.name,
    quality: vendor.performance.quality,
    delivery: vendor.performance.delivery,
    cost: vendor.performance.cost,
    service: vendor.performance.service,
    rating: vendor.rating,
    projects: vendor.projects,
  }));

  const locationDistribution = vendors.reduce((acc, vendor) => {
    const city = vendor.location.split(',')[0].trim();
    const existing = acc.find(item => item.location === city);
    if (existing) {
      existing.count += 1;
      existing.vendors.push(vendor.name);
    } else {
      acc.push({
        location: city,
        count: 1,
        vendors: [vendor.name]
      });
    }
    return acc;
  }, [] as Array<{ location: string; count: number; vendors: string[] }>);

  const topPerformers = vendors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map(vendor => ({
      ...vendor,
      averagePerformance: (vendor.performance.quality + vendor.performance.delivery + vendor.performance.cost + vendor.performance.service) / 4
    }));

  function getCategoryColor(category: string): string {
    const colors = {
      'Electrical': 'hsl(221.2 83.2% 53.3%)',
      'Construction': 'hsl(262.1 83.3% 57.8%)',
      'Mechanical': 'hsl(142.1 76.2% 36.3%)',
      'Safety': 'hsl(47.9 95.8% 53.1%)',
      'Materials': 'hsl(0 84.2% 60.2%)',
    };
    return colors[category as keyof typeof colors] || 'hsl(215.4 16.3% 46.9%)';
  }

  const formatCurrency = (value: number) => {
    return `₹${(value / 100000).toFixed(1)}L`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass border-0 p-3 rounded-lg shadow-lg">
          <p className="font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey}: {entry.dataKey === 'totalValue' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const RadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass border-0 p-3 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{data.fullName}</p>
          <div className="space-y-1 text-sm">
            <p>Quality: {data.quality}%</p>
            <p>Delivery: {data.delivery}%</p>
            <p>Cost: {data.cost}%</p>
            <p>Service: {data.service}%</p>
            <p className="pt-1 border-t">Rating: {data.rating}/5.0</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`grid gap-6 ${className}`}>
      {/* Vendor Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border-0 hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{vendors.length}</p>
                  <p className="text-sm text-muted-foreground">Total Vendors</p>
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
                <Star className="h-8 w-8 text-warning" />
                <div>
                  <p className="text-2xl font-bold">
                    {(vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
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
                <Award className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold">
                    {vendors.reduce((sum, v) => sum + v.projects, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
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
                <MapPin className="h-8 w-8 text-secondary" />
                <div>
                  <p className="text-2xl font-bold">{locationDistribution.length}</p>
                  <p className="text-sm text-muted-foreground">Cities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Category Distribution & Location Analysis */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Vendor Distribution by Category
              </CardTitle>
              <CardDescription>
                Number of vendors and total business value per category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214.3 31.8% 91.4%)" />
                  <XAxis 
                    dataKey="category" 
                    stroke="hsl(215.4 16.3% 46.9%)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(215.4 16.3% 46.9%)"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill="hsl(221.2 83.2% 53.3%)" name="Vendors" />
                  <Bar dataKey="totalValue" fill="hsl(262.1 83.3% 57.8%)" name="Value" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                Geographic Distribution
              </CardTitle>
              <CardDescription>
                Vendor distribution across different cities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={locationDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ location, count }) => `${location}: ${count}`}
                  >
                    {locationDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getCategoryColor(Object.keys(getCategoryColor)[index] || 'Materials')} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="mt-4 space-y-2">
                {locationDistribution.slice(0, 3).map((location, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{location.location}</span>
                    <Badge variant="secondary" className="glass">
                      {location.count} vendors
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Radar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              Vendor Performance Analysis
            </CardTitle>
            <CardDescription>
              Multi-dimensional performance comparison across key metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={performanceAnalysis.slice(0, 5)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Quality"
                  dataKey="quality"
                  stroke="hsl(221.2 83.2% 53.3%)"
                  fill="hsl(221.2 83.2% 53.3%)"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Delivery"
                  dataKey="delivery"
                  stroke="hsl(142.1 76.2% 36.3%)"
                  fill="hsl(142.1 76.2% 36.3%)"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Cost"
                  dataKey="cost"
                  stroke="hsl(47.9 95.8% 53.1%)"
                  fill="hsl(47.9 95.8% 53.1%)"
                  fillOpacity={0.1}
                />
                <Radar
                  name="Service"
                  dataKey="service"
                  stroke="hsl(262.1 83.3% 57.8%)"
                  fill="hsl(262.1 83.3% 57.8%)"
                  fillOpacity={0.1}
                />
                <Tooltip content={<RadarTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Performers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-warning" />
              Top Performing Vendors
            </CardTitle>
            <CardDescription>
              Highest rated vendors based on overall performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  className="p-4 glass rounded-lg hover-lift"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                          #{index + 1}
                        </div>
                        <Avatar>
                          <AvatarFallback className="bg-gradient-secondary text-secondary-foreground">
                            {vendor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold">{vendor.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-current text-warning" />
                            {vendor.rating}
                          </span>
                          <span>{vendor.projects} projects</span>
                          <span>{vendor.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">{vendor.averagePerformance.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">Avg Performance</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Quality</div>
                      <Progress value={vendor.performance.quality} className="h-2 mt-1" />
                      <div className="text-right text-xs">{vendor.performance.quality}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Delivery</div>
                      <Progress value={vendor.performance.delivery} className="h-2 mt-1" />
                      <div className="text-right text-xs">{vendor.performance.delivery}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Cost</div>
                      <Progress value={vendor.performance.cost} className="h-2 mt-1" />
                      <div className="text-right text-xs">{vendor.performance.cost}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Service</div>
                      <Progress value={vendor.performance.service} className="h-2 mt-1" />
                      <div className="text-right text-xs">{vendor.performance.service}%</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VendorChart;