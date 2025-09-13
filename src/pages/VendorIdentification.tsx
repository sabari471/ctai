import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Star, Phone, Mail, ExternalLink, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import VendorChart from "@/components/charts/VendorChart";

const VendorIdentification = () => {
  const [selectedVendor, setSelectedVendor] = useState(null);

  const vendors = [
    {
      id: "1",
      name: "TechCorp Industries",
      specialization: "Electrical Equipment",
      location: "Mumbai, Maharashtra",
      rating: 4.8,
      experience: "15+ years",
      certifications: ["ISO 9001", "CE Certified"],
      services: ["Transformers", "Switchgear", "Control Panels"],
      contact: { phone: "+91 98765 43210", email: "sales@techcorp.com" },
      projects: 145,
      responseTime: "2-4 hours",
      category: "Electrical",
      totalValue: 850000,
      performance: {
        quality: 92,
        delivery: 88,
        cost: 85,
        service: 94
      },
      orders: [
        { month: "Oct", value: 120000, orders: 3 },
        { month: "Nov", value: 180000, orders: 4 },
        { month: "Dec", value: 150000, orders: 2 },
      ]
    },
    {
      id: "2",
      name: "BuildMax Co.",
      specialization: "Construction Materials",
      location: "Delhi, India",
      rating: 4.6,
      experience: "12+ years",
      certifications: ["BIS Certified", "Green Building"],
      services: ["Cement", "Steel", "Aggregates"],
      contact: { phone: "+91 98765 43211", email: "info@buildmax.co" },
      projects: 230,
      responseTime: "1-2 hours",
      category: "Construction",
      totalValue: 1200000,
      performance: {
        quality: 88,
        delivery: 92,
        cost: 90,
        service: 87
      },
      orders: [
        { month: "Oct", value: 200000, orders: 5 },
        { month: "Nov", value: 250000, orders: 6 },
        { month: "Dec", value: 180000, orders: 4 },
      ]
    },
    {
      id: "3",
      name: "ElectroPro Systems",
      specialization: "Electrical Infrastructure",
      location: "Bangalore, Karnataka",
      rating: 4.9,
      experience: "18+ years",
      certifications: ["ISO 14001", "OHSAS 18001"],
      services: ["Cables", "Lighting", "Power Distribution"],
      contact: { phone: "+91 98765 43212", email: "contact@electropro.in" },
      projects: 189,
      responseTime: "30 min - 1 hour",
      category: "Electrical",
      totalValue: 950000,
      performance: {
        quality: 95,
        delivery: 93,
        cost: 88,
        service: 96
      },
      orders: [
        { month: "Oct", value: 180000, orders: 4 },
        { month: "Nov", value: 220000, orders: 5 },
        { month: "Dec", value: 200000, orders: 3 },
      ]
    },
    {
      id: "4",
      name: "MetalCorp Ltd",
      specialization: "Metal & Steel",
      location: "Chennai, Tamil Nadu",
      rating: 4.7,
      experience: "20+ years",
      certifications: ["ISI Mark", "Export Quality"],
      services: ["Steel Bars", "Structural Steel", "Metal Sheets"],
      contact: { phone: "+91 98765 43213", email: "orders@metalcorp.com" },
      projects: 167,
      responseTime: "1-3 hours",
      category: "Materials",
      totalValue: 780000,
      performance: {
        quality: 90,
        delivery: 85,
        cost: 92,
        service: 89
      },
      orders: [
        { month: "Oct", value: 150000, orders: 3 },
        { month: "Nov", value: 180000, orders: 4 },
        { month: "Dec", value: 160000, orders: 3 },
      ]
    },
    {
      id: "5",
      name: "PowerTech Solutions",
      specialization: "Power Equipment",
      location: "Hyderabad, Telangana",
      rating: 4.5,
      experience: "10+ years",
      certifications: ["IEC Standards", "UL Listed"],
      services: ["Transformers", "Generators", "UPS Systems"],
      contact: { phone: "+91 98765 43214", email: "support@powertech.co.in" },
      projects: 98,
      responseTime: "2-6 hours",
      category: "Electrical",
      totalValue: 680000,
      performance: {
        quality: 87,
        delivery: 82,
        cost: 85,
        service: 88
      },
      orders: [
        { month: "Oct", value: 120000, orders: 2 },
        { month: "Nov", value: 160000, orders: 3 },
        { month: "Dec", value: 140000, orders: 2 },
      ]
    },
    {
      id: "6",
      name: "AutoControl Systems",
      specialization: "Automation & Control",
      location: "Pune, Maharashtra",
      rating: 4.8,
      experience: "14+ years",
      certifications: ["CE Mark", "FCC Approved"],
      services: ["Control Panels", "SCADA", "PLCs"],
      contact: { phone: "+91 98765 43215", email: "hello@autocontrol.in" },
      projects: 134,
      responseTime: "1-2 hours",
      category: "Mechanical",
      totalValue: 720000,
      performance: {
        quality: 93,
        delivery: 89,
        cost: 87,
        service: 92
      },
      orders: [
        { month: "Oct", value: 140000, orders: 3 },
        { month: "Nov", value: 170000, orders: 4 },
        { month: "Dec", value: 150000, orders: 3 },
      ]
    },
  ];

  const getRatingColor = (rating: number) => {
    if (rating >= 4.8) return "text-success";
    if (rating >= 4.5) return "text-warning";
    return "text-muted-foreground";
  };

  const VendorModal = ({ vendor }: any) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-0 hover-lift">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="glass border-0 shadow-floating max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {vendor.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{vendor.name}</h3>
              <p className="text-muted-foreground">{vendor.specialization}</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vendor.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vendor.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vendor.location}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Performance Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Rating</span>
                  <span className="text-sm font-medium">{vendor.rating}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Projects Completed</span>
                  <span className="text-sm font-medium">{vendor.projects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-medium">{vendor.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Services Offered</h4>
            <div className="flex flex-wrap gap-2">
              {vendor.services.map((service: string, index: number) => (
                <Badge key={index} variant="secondary" className="glass">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Certifications</h4>
            <div className="flex flex-wrap gap-2">
              {vendor.certifications.map((cert: string, index: number) => (
                <Badge key={index} className="bg-gradient-primary text-primary-foreground">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
          Vendor Identification
        </motion.h1>
        <p className="text-muted-foreground">
          Discover and connect with verified suppliers and service providers
        </p>
      </div>

      {/* Controls */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search vendors by name, location, or service..."
              className="pl-10 glass border-0"
            />
          </div>
          <Button variant="outline" className="glass border-0 hover-lift">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
        
        <Button className="bg-gradient-secondary hover-lift">
          <Users className="h-4 w-4 mr-2" />
          Add New Vendor
        </Button>
      </motion.div>

      {/* Vendor Analytics Dashboard */}
      <VendorChart 
        vendors={vendors}
        className="mt-6"
      />

      {/* Vendor Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card className="glass border-0 hover-lift group cursor-pointer h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {vendor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {vendor.name}
                      </CardTitle>
                      <CardDescription>{vendor.specialization}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className={`h-4 w-4 fill-current ${getRatingColor(vendor.rating)}`} />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.location}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Experience</span>
                    <span className="font-medium">{vendor.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Projects</span>
                    <span className="font-medium">{vendor.projects}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Time</span>
                    <span className="font-medium">{vendor.responseTime}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Key Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {vendor.services.slice(0, 2).map((service, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs glass">
                        {service}
                      </Badge>
                    ))}
                    {vendor.services.length > 2 && (
                      <Badge variant="secondary" className="text-xs glass">
                        +{vendor.services.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <VendorModal vendor={vendor} />
                  <Button size="sm" className="flex-1 bg-gradient-primary hover-lift">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default VendorIdentification;