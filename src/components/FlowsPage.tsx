import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Copy,
  BarChart3,
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  ArrowRight,
  Settings
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

// Mock flows data
const flows = [
  {
    id: '1',
    name: 'Customer Onboarding',
    description: 'Welcome new customers and collect basic information',
    status: 'active',
    type: 'onboarding',
    triggers: ['keyword_hello', 'menu_option'],
    completionRate: 85,
    totalSessions: 1250,
    averageTime: '3:45',
    lastUpdated: '2024-01-15',
    steps: [
      { id: 1, type: 'message', content: 'Welcome! Let\'s get you set up.' },
      { id: 2, type: 'form', content: 'Please provide your name and email' },
      { id: 3, type: 'condition', content: 'Valid email?' },
      { id: 4, type: 'message', content: 'Thank you! You\'re all set.' }
    ]
  },
  {
    id: '2',
    name: 'Order Status Check',
    description: 'Allow customers to check their order status',
    status: 'active',
    type: 'support',
    triggers: ['keyword_order', 'menu_order_status'],
    completionRate: 92,
    totalSessions: 850,
    averageTime: '1:30',
    lastUpdated: '2024-01-14',
    steps: [
      { id: 1, type: 'message', content: 'Please provide your order number' },
      { id: 2, type: 'input', content: 'Order number input' },
      { id: 3, type: 'api', content: 'Fetch order details' },
      { id: 4, type: 'message', content: 'Display order status' }
    ]
  },
  {
    id: '3',
    name: 'Product Survey',
    description: 'Collect customer feedback on products',
    status: 'draft',
    type: 'survey',
    triggers: ['menu_feedback'],
    completionRate: 0,
    totalSessions: 0,
    averageTime: '0:00',
    lastUpdated: '2024-01-13',
    steps: [
      { id: 1, type: 'message', content: 'Help us improve our products!' },
      { id: 2, type: 'form', content: 'Rating and feedback form' },
      { id: 3, type: 'message', content: 'Thank you for your feedback!' }
    ]
  },
  {
    id: '4',
    name: 'Checkout Process',
    description: 'Complete purchase within WhatsApp',
    status: 'paused',
    type: 'commerce',
    triggers: ['menu_buy', 'button_checkout'],
    completionRate: 78,
    totalSessions: 420,
    averageTime: '5:20',
    lastUpdated: '2024-01-12',
    steps: [
      { id: 1, type: 'message', content: 'Let\'s complete your purchase' },
      { id: 2, type: 'form', content: 'Shipping information' },
      { id: 3, type: 'payment', content: 'Payment processing' },
      { id: 4, type: 'message', content: 'Order confirmation' }
    ]
  }
];

const flowTypes = [
  { value: 'onboarding', label: 'Onboarding', icon: Users, color: 'bg-blue-100 text-blue-800' },
  { value: 'support', label: 'Support', icon: MessageSquare, color: 'bg-green-100 text-green-800' },
  { value: 'survey', label: 'Survey', icon: BarChart3, color: 'bg-purple-100 text-purple-800' },
  { value: 'commerce', label: 'Commerce', icon: CheckCircle, color: 'bg-orange-100 text-orange-800' }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'active': return <Play className="h-4 w-4 text-green-600" />;
    case 'paused': return <Pause className="h-4 w-4 text-yellow-600" />;
    case 'draft': return <Clock className="h-4 w-4 text-gray-600" />;
    default: return <XCircle className="h-4 w-4 text-red-600" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-red-100 text-red-800';
  }
};

export function FlowsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredFlows = flows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || flow.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || flow.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalFlows: flows.length,
    activeFlows: flows.filter(f => f.status === 'active').length,
    totalSessions: flows.reduce((sum, f) => sum + f.totalSessions, 0),
    avgCompletionRate: Math.round(flows.reduce((sum, f) => sum + f.completionRate, 0) / flows.length)
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Conversational Flows</h1>
            <p className="text-muted-foreground">Create guided workflows and interactive experiences</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Flow
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Flow</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="flow-name">Flow Name</Label>
                  <Input id="flow-name" placeholder="Enter flow name" />
                </div>
                <div>
                  <Label htmlFor="flow-description">Description</Label>
                  <Textarea id="flow-description" placeholder="Describe the flow purpose" />
                </div>
                <div>
                  <Label htmlFor="flow-type">Flow Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {flowTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-activate" />
                  <Label htmlFor="auto-activate">Activate immediately</Label>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Flow
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Flows</p>
                  <p className="text-2xl font-bold">{stats.totalFlows}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Flows</p>
                  <p className="text-2xl font-bold">{stats.activeFlows}</p>
                </div>
                <Play className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sessions</p>
                  <p className="text-2xl font-bold">{stats.totalSessions.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Completion</p>
                  <p className="text-2xl font-bold">{stats.avgCompletionRate}%</p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search flows..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {flowTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Flows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFlows.map((flow) => {
            const typeInfo = flowTypes.find(t => t.value === flow.type);
            const TypeIcon = typeInfo?.icon || Zap;

            return (
              <Card key={flow.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{flow.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{flow.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(flow.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(flow.status)}>
                      {flow.status}
                    </Badge>
                    <Badge variant="outline" className={typeInfo?.color}>
                      {typeInfo?.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Sessions</p>
                      <p className="font-semibold">{flow.totalSessions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Completion</p>
                      <p className="font-semibold">{flow.completionRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Avg Time</p>
                      <p className="font-semibold">{flow.averageTime}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Flow Steps ({flow.steps.length})</p>
                    <div className="flex items-center space-x-1 overflow-x-auto">
                      {flow.steps.map((step, index) => (
                        <React.Fragment key={step.id}>
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                          </div>
                          {index < flow.steps.length - 1 && (
                            <ArrowRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      Updated {flow.lastUpdated}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredFlows.length === 0 && (
          <div className="text-center py-12">
            <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No flows found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first conversational flow to get started.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Flow
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}