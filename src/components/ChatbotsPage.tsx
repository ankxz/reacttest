import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Search, 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  Edit, 
  Trash2,
  MessageSquare,
  Users,
  Zap,
  Brain,
  Activity,
  Clock
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

// Mock chatbots data
const chatbots = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles common customer inquiries and support requests',
    status: 'active',
    type: 'rule-based',
    totalConversations: 3420,
    successfulResolutions: 2890,
    averageResponseTime: '0.5s',
    lastUpdated: '2024-01-15',
    triggers: ['support', 'help', 'issue', 'problem'],
    confidence: 92
  },
  {
    id: '2',
    name: 'Order Assistant',
    description: 'Helps customers track orders and manage returns',
    status: 'active',
    type: 'ai-powered',
    totalConversations: 2150,
    successfulResolutions: 1950,
    averageResponseTime: '1.2s',
    lastUpdated: '2024-01-14',
    triggers: ['order', 'track', 'return', 'refund'],
    confidence: 88
  },
  {
    id: '3',
    name: 'Product Recommendation Bot',
    description: 'Provides personalized product recommendations',
    status: 'draft',
    type: 'ai-powered',
    totalConversations: 0,
    successfulResolutions: 0,
    averageResponseTime: '0s',
    lastUpdated: '2024-01-13',
    triggers: ['recommend', 'suggest', 'product', 'buy'],
    confidence: 0
  },
  {
    id: '4',
    name: 'FAQ Bot',
    description: 'Answers frequently asked questions automatically',
    status: 'paused',
    type: 'rule-based',
    totalConversations: 1680,
    successfulResolutions: 1580,
    averageResponseTime: '0.3s',
    lastUpdated: '2024-01-12',
    triggers: ['faq', 'question', 'info', 'about'],
    confidence: 95
  }
];

const botTypes = [
  { value: 'rule-based', label: 'Rule-Based', icon: Settings, color: 'bg-blue-100 text-blue-800' },
  { value: 'ai-powered', label: 'AI-Powered', icon: Brain, color: 'bg-purple-100 text-purple-800' },
  { value: 'hybrid', label: 'Hybrid', icon: Zap, color: 'bg-green-100 text-green-800' }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'active': return <Play className="h-4 w-4 text-green-600" />;
    case 'paused': return <Pause className="h-4 w-4 text-yellow-600" />;
    case 'draft': return <Clock className="h-4 w-4 text-gray-600" />;
    default: return <Settings className="h-4 w-4 text-gray-600" />;
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

export function ChatbotsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredChatbots = chatbots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || bot.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || bot.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalBots: chatbots.length,
    activeBots: chatbots.filter(b => b.status === 'active').length,
    totalConversations: chatbots.reduce((sum, b) => sum + b.totalConversations, 0),
    avgSuccessRate: Math.round(
      chatbots.reduce((sum, b) => sum + (b.totalConversations > 0 ? (b.successfulResolutions / b.totalConversations) * 100 : 0), 0) / 
      chatbots.filter(b => b.totalConversations > 0).length
    )
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Chatbots & Auto-replies</h1>
            <p className="text-muted-foreground">Manage automated conversation bots and responses</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Bot
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Chatbot</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="bot-name">Bot Name</Label>
                  <Input id="bot-name" placeholder="Enter bot name" />
                </div>
                <div>
                  <Label htmlFor="bot-description">Description</Label>
                  <Textarea id="bot-description" placeholder="Describe the bot's purpose" />
                </div>
                <div>
                  <Label htmlFor="bot-type">Bot Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {botTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="triggers">Trigger Keywords</Label>
                  <Input id="triggers" placeholder="help, support, question" />
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
                    Create Bot
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
                  <p className="text-sm text-gray-600">Total Bots</p>
                  <p className="text-2xl font-bold">{stats.totalBots}</p>
                </div>
                <Bot className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bots</p>
                  <p className="text-2xl font-bold">{stats.activeBots}</p>
                </div>
                <Play className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversations</p>
                  <p className="text-2xl font-bold">{stats.totalConversations.toLocaleString()}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold">{stats.avgSuccessRate}%</p>
                </div>
                <Activity className="h-8 w-8 text-orange-500" />
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
                placeholder="Search chatbots..."
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
                {botTypes.map((type) => (
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

        {/* Chatbots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChatbots.map((bot) => {
            const typeInfo = botTypes.find(t => t.value === bot.type);
            const TypeIcon = typeInfo?.icon || Bot;
            const successRate = bot.totalConversations > 0 ? Math.round((bot.successfulResolutions / bot.totalConversations) * 100) : 0;

            return (
              <Card key={bot.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <TypeIcon className="h-5 w-5 text-blue-600" />
                      <div>
                        <CardTitle className="text-lg">{bot.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{bot.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(bot.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(bot.status)}>
                      {bot.status}
                    </Badge>
                    <Badge variant="outline" className={typeInfo?.color}>
                      {typeInfo?.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Conversations</p>
                      <p className="font-semibold">{bot.totalConversations.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Success Rate</p>
                      <p className="font-semibold">{successRate}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Response Time</p>
                      <p className="font-semibold">{bot.averageResponseTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Confidence</p>
                      <p className="font-semibold">{bot.confidence}%</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Trigger Keywords</p>
                    <div className="flex flex-wrap gap-1">
                      {bot.triggers.slice(0, 3).map((trigger) => (
                        <Badge key={trigger} variant="outline" className="text-xs">
                          {trigger}
                        </Badge>
                      ))}
                      {bot.triggers.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{bot.triggers.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-gray-500">
                      Updated {bot.lastUpdated}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Activity className="h-4 w-4" />
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
            );
          })}
        </div>

        {filteredChatbots.length === 0 && (
          <div className="text-center py-12">
            <Bot className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No chatbots found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first chatbot to automate customer interactions.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Bot
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}