import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Plus, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProcurementPlan = () => {
  const categories = [
    {
      id: "electrical",
      name: "Electrical Equipment",
      totalValue: "₹15.7L",
      items: 12,
      riskLevel: "Medium",
      leadTime: "14-21 days",
      items_details: [
        {
          item: "33/11 KV Transformer",
          vendor: "PowerTech Solutions",
          quantity: "2 units",
          unitCost: "₹2,85,000",
          totalCost: "₹5,70,000",
          leadTime: "21 days",
          riskMitigation: "Backup vendor identified",
        },
        {
          item: "XLPE Cables (11 KV)",
          vendor: "ElectroPro Systems", 
          quantity: "2800 m",
          unitCost: "₹180",
          totalCost: "₹5,04,000",
          leadTime: "14 days",
          riskMitigation: "Local supplier available",
        },
        {
          item: "Control Panel (SCADA Ready)",
          vendor: "AutoControl Systems",
          quantity: "1 unit",
          unitCost: "₹4,50,000",
          totalCost: "₹4,50,000",
          leadTime: "18 days",
          riskMitigation: "Modular design for quick replacement",
        },
      ]
    },
    {
      id: "civil",
      name: "Civil & Construction",
      totalValue: "₹8.9L",
      items: 8,
      riskLevel: "Low",
      leadTime: "3-7 days",
      items_details: [
        {
          item: "OPC 53 Grade Cement",
          vendor: "BuildMax Co.",
          quantity: "1250 bags",
          unitCost: "₹450",
          totalCost: "₹5,62,500",
          leadTime: "3 days",
          riskMitigation: "Multiple local suppliers",
        },
        {
          item: "Steel Reinforcement Bars",
          vendor: "MetalCorp Ltd",
          quantity: "8500 kg",
          unitCost: "₹65",
          totalCost: "₹5,52,500",
          leadTime: "5 days",
          riskMitigation: "Steel reserve stock available",
        },
      ]
    },
    {
      id: "mechanical",
      name: "Mechanical Components", 
      totalValue: "₹2.7L",
      items: 5,
      riskLevel: "High",
      leadTime: "10-15 days",
      items_details: [
        {
          item: "Cooling System",
          vendor: "TechCorp Industries",
          quantity: "1 unit",
          unitCost: "₹1,85,000",
          totalCost: "₹1,85,000",
          leadTime: "15 days",
          riskMitigation: "Critical path monitoring",
        },
        {
          item: "Safety Equipment",
          vendor: "SafetyFirst Co.",
          quantity: "1 set",
          unitCost: "₹85,000", 
          totalCost: "₹85,000",
          leadTime: "10 days",
          riskMitigation: "Alternative suppliers vetted",
        },
      ]
    },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
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
          Procurement Plan
        </motion.h1>
        <p className="text-muted-foreground">
          Comprehensive procurement strategy with risk assessment and vendor allocation
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">₹27.3L</p>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">25</p>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">8</p>
              <p className="text-sm text-muted-foreground">Vendors</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-0 hover-lift">
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">High Risk Items</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Bar */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button className="bg-gradient-primary hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button variant="outline" className="glass border-0 hover-lift">
            <Edit className="h-4 w-4 mr-2" />
            Edit Plan
          </Button>
        </div>
        
        <Button variant="outline" className="glass border-0 hover-lift">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Procurement Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="glass border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Procurement Plan by Category
            </CardTitle>
            <CardDescription>
              Detailed breakdown of materials and services by procurement category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="space-y-4">
              {categories.map((category, index) => (
                <AccordionItem 
                  key={category.id} 
                  value={category.id} 
                  className="glass rounded-lg border-0 px-4"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <motion.div 
                      className="flex items-center justify-between w-full pr-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex items-center space-x-4">
                        <div>
                          <h3 className="text-lg font-semibold text-left">{category.name}</h3>
                          <p className="text-sm text-muted-foreground text-left">
                            {category.items} items • Lead time: {category.leadTime}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getRiskColor(category.riskLevel)}>
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {category.riskLevel} Risk
                        </Badge>
                        <div className="text-right">
                          <p className="text-lg font-bold">{category.totalValue}</p>
                          <p className="text-xs text-muted-foreground">Total Value</p>
                        </div>
                      </div>
                    </motion.div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="pt-4">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Vendor</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total Cost</TableHead>
                            <TableHead>Lead Time</TableHead>
                            <TableHead>Risk Mitigation</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {category.items_details.map((item, itemIndex) => (
                            <motion.tr
                              key={itemIndex}
                              className="hover:bg-muted/50"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * itemIndex }}
                            >
                              <TableCell className="font-medium">{item.item}</TableCell>
                              <TableCell>{item.vendor}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell className="font-semibold">{item.totalCost}</TableCell>
                              <TableCell>{item.leadTime}</TableCell>
                              <TableCell className="max-w-48">
                                <span className="text-sm text-muted-foreground">
                                  {item.riskMitigation}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" className="hover-lift">
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="hover-lift text-destructive">
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProcurementPlan;