import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Globe, 
  Shield, 
  Activity, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Settings,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

// Mock webhooks data
const webhooks = [
  {
    id: '1',
    name: 'Message Status Updates',
    url: 'https://api.myapp.com/webhooks/whatsapp/status',
    events: ['message.sent', 'message.delivered', 'message.read', 'message.failed'],
    status: 'active',
    lastTriggered: '2024-01-15T10:30:00Z',
    successRate: 98.5,
    totalCalls: 15420,
    failedCalls: 231,
    verifyToken: 'abc123...',
    secret: 'secret123...',
    retryPolicy: 'exponential',
    timeout: 30
  },
  {
    id: '2',
    name: 'Incoming Messages',
    url: 'https://api.myapp.com/webhooks/whatsapp/messages',
    events: ['message.received', 'message.reaction'],
    status: 'active',
    lastTriggered: '2024-01-15T10:25:00Z',
    successRate: 99.2,
    totalCalls: 8750,
    failedCalls: 70,
    verifyToken: 'xyz789...',
    secret: 'secret456...',
    retryPolicy: 'linear',
    timeout: 15
  },
  {
    id: '3',
    name: 'User Interactions',
    url: 'https://api.myapp.com/webhooks/whatsapp/interactions',
    events: ['button.clicked', 'list.selected', 'flow.completed'],
    status: 'error',
    lastTriggered: '2024-01-15T09:45:00Z',
    successRate: 45.2,
    totalCalls: 1250,
    failedCalls: 685,
    verifyToken: 'def456...',
    secret: 'secret789...',
    retryPolicy: 'exponential',
    timeout: 25
  },
  {
    id: '4',
    name: 'Test Webhook',
    url: 'https://webhook.site/test-endpoint',
    events: ['message.received'],
    status: 'paused',
    lastTriggered: '2024-01-14T15:20:00Z',
    successRate: 100,
    totalCalls: 25,
    failedCalls: 0,
    verifyToken: 'test123...',
    secret: 'testsecret...',
    retryPolicy: 'none',
    timeout: 10
  }
];

const eventTypes = [
  { value: 'message.sent', label: 'Message Sent', category: 'Messages' },
  { value: 'message.delivered', label: 'Message Delivered', category: 'Messages' },
  { value: 'message.read', label: 'Message Read', category: 'Messages' },
  { value: 'message.failed', label: 'Message Failed', category: 'Messages' },
  { value: 'message.received', label: 'Message Received', category: 'Messages' },
  { value: 'message.reaction', label: 'Message Reaction', category: 'Messages' },
  { value: 'button.clicked', label: 'Button Clicked', category: 'Interactions' },
  { value: 'list.selected', label: 'List Item Selected', category: 'Interactions' },
  { value: 'flow.started', label: 'Flow Started', category: 'Flows' },
  { value: 'flow.completed', label: 'Flow Completed', category: 'Flows' },
  { value: 'flow.abandoned', label: 'Flow Abandoned', category: 'Flows' },
  { value: 'user.opted_in', label: 'User Opted In', category: 'User Management' },
  { value: 'user.opted_out', label: 'User Opted Out', category: 'User Management' }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'paused': return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
    default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'error': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function WebhooksPage() {
  const [selectedTab, setSelectedTab] = useState('webhooks');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredWebhooks = webhooks.filter(webhook => {
    const matchesSearch = webhook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webhook.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || webhook.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalWebhooks: webhooks.length,
    activeWebhooks: webhooks.filter(w => w.status === 'active').length,
    totalCalls: webhooks.reduce((sum, w) => sum + w.totalCalls, 0),
    avgSuccessRate: Math.round(webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length)
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Webhooks</h1>
            <p className="text-muted-foreground">Manage webhook endpoints for real-time events</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Webhook
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Webhook</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="webhook-name">Webhook Name</Label>
                    <Input id="webhook-name" placeholder="e.g., Message Status Updates" />
                  </div>
                  <div>
                    <Label htmlFor="webhook-url">Endpoint URL</Label>
                    <Input id="webhook-url" placeholder="https://your-api.com/webhook" />
                  </div>
                </div>
                
                <div>
                  <Label>Events to Subscribe</Label>
                  <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                    {Object.entries(
                      eventTypes.reduce((acc, event) => {
                        if (!acc[event.category]) acc[event.category] = [];
                        acc[event.category].push(event);
                        return acc;
                      }, {})
                    ).map(([category, events]) => (
                      <div key={category} className="mb-4">
                        <h4 className="font-medium text-sm mb-2">{category}</h4>
                        <div className="space-y-2">
                          {events.map((event) => (
                            <div key={event.value} className="flex items-center space-x-2">
                              <Checkbox id={event.value} />
                              <label htmlFor={event.value} className="text-sm">
                                {event.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="verify-token">Verify Token</Label>
                    <Input id="verify-token" placeholder="Enter verification token" />
                  </div>
                  <div>
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <Input id="webhook-secret" type="password" placeholder="Enter webhook secret" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 seconds</SelectItem>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">60 seconds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="retry-policy">Retry Policy</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select retry policy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Retries</SelectItem>
                        <SelectItem value="linear">Linear Backoff</SelectItem>
                        <SelectItem value="exponential">Exponential Backoff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-activate" />
                  <Label htmlFor="auto-activate">Activate webhook immediately</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Webhook
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="logs">Event Logs</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="webhooks" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Webhooks</p>
                      <p className="text-2xl font-bold">{stats.totalWebhooks}</p>
                    </div>
                    <Globe className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active</p>
                      <p className="text-2xl font-bold">{stats.activeWebhooks}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Calls</p>
                      <p className="text-2xl font-bold">{stats.totalCalls.toLocaleString()}</p>
                    </div>
                    <Activity className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Success Rate</p>
                      <p className="text-2xl font-bold">{stats.avgSuccessRate}%</p>
                    </div>
                    <Shield className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search webhooks..."
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Webhooks List */}
            <div className="space-y-4">
              {filteredWebhooks.map((webhook) => (
                <Card key={webhook.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{webhook.name}</h3>
                          <Badge className={getStatusColor(webhook.status)}>
                            {getStatusIcon(webhook.status)}
                            <span className="ml-1">{webhook.status}</span>
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{webhook.url}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {webhook.events.map((event) => (
                            <Badge key={event} variant="outline" className="text-xs">
                              {event}
                            </Badge>
                          ))}
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Success Rate</p>
                            <p className="font-semibold">{webhook.successRate}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Total Calls</p>
                            <p className="font-semibold">{webhook.totalCalls.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Failed Calls</p>
                            <p className="font-semibold">{webhook.failedCalls}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Last Triggered</p>
                            <p className="font-semibold">
                              {new Date(webhook.lastTriggered).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Event logs would be displayed here with detailed webhook call information.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Testing tools for webhooks would be available here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}