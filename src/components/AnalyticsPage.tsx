import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Send, 
  Eye, 
  MousePointer,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('messages');

  // Mock analytics data
  const overviewStats = [
    {
      title: 'Messages Sent',
      value: '45,678',
      change: '+12.5%',
      trend: 'up',
      icon: Send,
      color: 'text-blue-600'
    },
    {
      title: 'Delivery Rate',
      value: '96.8%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Open Rate',
      value: '74.2%',
      change: '-1.3%',
      trend: 'down',
      icon: Eye,
      color: 'text-purple-600'
    },
    {
      title: 'Click Rate',
      value: '18.7%',
      change: '+3.2%',
      trend: 'up',
      icon: MousePointer,
      color: 'text-orange-600'
    }
  ];

  const chartData = [
    { date: '2024-06-01', sent: 1200, delivered: 1156, opened: 890, clicked: 234 },
    { date: '2024-06-02', sent: 1350, delivered: 1298, opened: 967, clicked: 278 },
    { date: '2024-06-03', sent: 1100, delivered: 1067, opened: 812, clicked: 189 },
    { date: '2024-06-04', sent: 1450, delivered: 1398, opened: 1087, clicked: 312 },
    { date: '2024-06-05', sent: 1600, delivered: 1552, opened: 1203, clicked: 356 },
    { date: '2024-06-06', sent: 1250, delivered: 1213, opened: 934, clicked: 267 },
    { date: '2024-06-07', sent: 1380, delivered: 1334, opened: 1024, clicked: 289 }
  ];

  const campaignPerformance = [
    { name: 'Summer Sale 2024', sent: 3500, delivered: 3456, opened: 2890, clicked: 867, conversionRate: 24.8 },
    { name: 'Product Launch', sent: 2200, delivered: 2167, opened: 1734, clicked: 542, conversionRate: 24.6 },
    { name: 'Newsletter June', sent: 1800, delivered: 1776, opened: 1312, clicked: 298, conversionRate: 16.6 },
    { name: 'Welcome Series', sent: 1200, delivered: 1189, opened: 945, clicked: 267, conversionRate: 22.3 }
  ];

  const deviceBreakdown = [
    { name: 'Mobile', value: 78, color: '#8884d8' },
    { name: 'Desktop', value: 18, color: '#82ca9d' },
    { name: 'Tablet', value: 4, color: '#ffc658' }
  ];

  const timeAnalysis = [
    { hour: '08:00', messages: 450, engagement: 0.68 },
    { hour: '09:00', messages: 720, engagement: 0.72 },
    { hour: '10:00', messages: 890, engagement: 0.78 },
    { hour: '11:00', messages: 1200, engagement: 0.81 },
    { hour: '12:00', messages: 1450, engagement: 0.75 },
    { hour: '13:00', messages: 1350, engagement: 0.69 },
    { hour: '14:00', messages: 1600, engagement: 0.83 },
    { hour: '15:00', messages: 1400, engagement: 0.79 },
    { hour: '16:00', messages: 1200, engagement: 0.74 },
    { hour: '17:00', messages: 980, engagement: 0.71 },
    { hour: '18:00', messages: 750, engagement: 0.66 },
    { hour: '19:00', messages: 520, engagement: 0.62 }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600">Track your WhatsApp campaign performance and engagement metrics</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {getTrendIcon(stat.trend)}
                      <p className={`text-sm ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last period
                      </p>
                    </div>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Message delivery and engagement over time</CardDescription>
              </div>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="messages">Messages</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="conversion">Conversion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => formatDate(value)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sent" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Sent"
                />
                <Line 
                  type="monotone" 
                  dataKey="delivered" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="Delivered"
                />
                <Line 
                  type="monotone" 
                  dataKey="opened" 
                  stroke="#ffc658" 
                  strokeWidth={2}
                  name="Opened"
                />
                <Line 
                  type="monotone" 
                  dataKey="clicked" 
                  stroke="#ff7300" 
                  strokeWidth={2}
                  name="Clicked"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
            <CardDescription>Message engagement by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {deviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analytics</CardTitle>
          <CardDescription>Deep dive into your campaign performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList>
              <TabsTrigger value="campaigns">Campaign Performance</TabsTrigger>
              <TabsTrigger value="timing">Best Times</TabsTrigger>
              <TabsTrigger value="engagement">Engagement Analysis</TabsTrigger>
            </TabsList>
            
            <TabsContent value="campaigns" className="space-y-4">
              <div className="space-y-4">
                {campaignPerformance.map((campaign, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">
                          {campaign.sent.toLocaleString()} messages sent
                        </p>
                      </div>
                      <Badge variant={campaign.conversionRate > 20 ? 'default' : 'secondary'}>
                        {campaign.conversionRate}% conversion
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Delivered</div>
                        <div className="font-medium">
                          {((campaign.delivered / campaign.sent) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Opened</div>
                        <div className="font-medium">
                          {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Clicked</div>
                        <div className="font-medium">
                          {((campaign.clicked / campaign.sent) * 100).toFixed(1)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">CTR</div>
                        <div className="font-medium">
                          {((campaign.clicked / campaign.opened) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="timing">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={timeAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="messages" fill="#8884d8" name="Messages Sent" />
                  <Line yAxisId="right" dataKey="engagement" stroke="#ff7300" name="Engagement Rate" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="engagement">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip labelFormatter={(value) => formatDate(value)} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="opened"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                    name="Opened"
                  />
                  <Area
                    type="monotone"
                    dataKey="clicked"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    name="Clicked"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}