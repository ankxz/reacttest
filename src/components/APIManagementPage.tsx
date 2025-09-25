import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Plus, 
  Search, 
  Key, 
  Code, 
  Copy,
  Eye,
  EyeOff,
  Trash2,
  BarChart3,
  Clock,
  Shield,
  Globe,
  Terminal,
  Book,
  Download
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';

// Mock API keys data
const apiKeys = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'whatsapp_live_pk_1234567890abcdef',
    maskedKey: 'whatsapp_live_pk_****...cdef',
    type: 'live',
    permissions: ['messages.send', 'messages.read', 'webhooks.manage'],
    usageLimit: 10000,
    usageCount: 7500,
    lastUsed: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01',
    expiresAt: '2024-12-31',
    status: 'active'
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'whatsapp_test_pk_abcdef1234567890',
    maskedKey: 'whatsapp_test_pk_****...7890',
    type: 'test',
    permissions: ['messages.send', 'messages.read'],
    usageLimit: 1000,
    usageCount: 250,
    lastUsed: '2024-01-15T08:45:00Z',
    createdAt: '2024-01-10',
    expiresAt: '2024-06-30',
    status: 'active'
  },
  {
    id: '3',
    name: 'Webhook Integration',
    key: 'whatsapp_live_sk_fedcba0987654321',
    maskedKey: 'whatsapp_live_sk_****...4321',
    type: 'server',
    permissions: ['webhooks.read', 'webhooks.write'],
    usageLimit: 50000,
    usageCount: 12450,
    lastUsed: '2024-01-15T11:20:00Z',
    createdAt: '2023-12-15',
    expiresAt: '2024-12-15',
    status: 'active'
  }
];

// Mock API endpoints
const apiEndpoints = [
  {
    method: 'POST',
    path: '/v1/messages',
    description: 'Send a message to a WhatsApp user',
    category: 'Messages'
  },
  {
    method: 'GET',
    path: '/v1/messages',
    description: 'Retrieve message history',
    category: 'Messages'
  },
  {
    method: 'POST',
    path: '/v1/media',
    description: 'Upload media files',
    category: 'Media'
  },
  {
    method: 'GET',
    path: '/v1/media/{media-id}',
    description: 'Download media files',
    category: 'Media'
  },
  {
    method: 'POST',
    path: '/v1/webhooks',
    description: 'Create webhook endpoint',
    category: 'Webhooks'
  },
  {
    method: 'GET',
    path: '/v1/business/profile',
    description: 'Get business profile information',
    category: 'Business'
  }
];

const permissions = [
  { id: 'messages.send', label: 'Send Messages', description: 'Send messages to users' },
  { id: 'messages.read', label: 'Read Messages', description: 'Access message history' },
  { id: 'media.upload', label: 'Upload Media', description: 'Upload images, videos, documents' },
  { id: 'media.download', label: 'Download Media', description: 'Download media files' },
  { id: 'webhooks.manage', label: 'Manage Webhooks', description: 'Create and manage webhooks' },
  { id: 'webhooks.read', label: 'Read Webhooks', description: 'View webhook configurations' },
  { id: 'webhooks.write', label: 'Write Webhooks', description: 'Create webhook endpoints' },
  { id: 'business.read', label: 'Read Business Profile', description: 'Access business information' },
  { id: 'business.write', label: 'Update Business Profile', description: 'Modify business information' }
];

export function APIManagementPage() {
  const [activeTab, setActiveTab] = useState('keys');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState(new Set());

  const filteredKeys = apiKeys.filter(key => {
    const matchesSearch = key.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         key.key.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || key.type === selectedType;
    return matchesSearch && matchesType;
  });

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const stats = {
    totalKeys: apiKeys.length,
    activeKeys: apiKeys.filter(k => k.status === 'active').length,
    totalUsage: apiKeys.reduce((sum, k) => sum + k.usageCount, 0),
    avgUsage: Math.round(apiKeys.reduce((sum, k) => sum + (k.usageCount / k.usageLimit) * 100, 0) / apiKeys.length)
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>API Management</h1>
            <p className="text-muted-foreground">Manage API keys, endpoints, and developer resources</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline">
              <Book className="h-4 w-4 mr-2" />
              API Docs
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create API Key
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New API Key</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div>
                    <Label htmlFor="key-name">API Key Name</Label>
                    <Input id="key-name" placeholder="e.g., Production Integration" />
                  </div>
                  
                  <div>
                    <Label htmlFor="key-type">Key Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select key type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="live">Live (Production)</SelectItem>
                        <SelectItem value="test">Test (Development)</SelectItem>
                        <SelectItem value="server">Server-to-Server</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="usage-limit">Usage Limit (per month)</Label>
                    <Input id="usage-limit" type="number" placeholder="10000" />
                  </div>

                  <div>
                    <Label>Permissions</Label>
                    <div className="mt-2 max-h-48 overflow-y-auto border rounded-lg p-3">
                      {permissions.map((permission) => (
                        <div key={permission.id} className="flex items-start space-x-2 mb-3">
                          <input 
                            type="checkbox" 
                            id={permission.id} 
                            className="mt-1"
                          />
                          <div>
                            <label htmlFor={permission.id} className="text-sm font-medium">
                              {permission.label}
                            </label>
                            <p className="text-xs text-gray-500">{permission.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="expires-at">Expiration Date</Label>
                    <Input id="expires-at" type="date" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-rotate" />
                    <Label htmlFor="auto-rotate">Auto-rotate key before expiration</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>
                      Create API Key
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="keys">API Keys</TabsTrigger>
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="keys" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Keys</p>
                      <p className="text-2xl font-bold">{stats.totalKeys}</p>
                    </div>
                    <Key className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Keys</p>
                      <p className="text-2xl font-bold">{stats.activeKeys}</p>
                    </div>
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Usage</p>
                      <p className="text-2xl font-bold">{stats.totalUsage.toLocaleString()}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Usage</p>
                      <p className="text-2xl font-bold">{stats.avgUsage}%</p>
                    </div>
                    <Globe className="h-8 w-8 text-orange-500" />
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
                    placeholder="Search API keys..."
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
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="server">Server</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* API Keys List */}
            <div className="space-y-4">
              {filteredKeys.map((apiKey) => {
                const usagePercentage = Math.round((apiKey.usageCount / apiKey.usageLimit) * 100);
                const isVisible = visibleKeys.has(apiKey.id);

                return (
                  <Card key={apiKey.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{apiKey.name}</h3>
                            <Badge 
                              variant="outline"
                              className={
                                apiKey.type === 'live' ? 'bg-green-100 text-green-800' :
                                apiKey.type === 'test' ? 'bg-blue-100 text-blue-800' :
                                'bg-purple-100 text-purple-800'
                              }
                            >
                              {apiKey.type.toUpperCase()}
                            </Badge>
                            <Badge className="bg-green-100 text-green-800">
                              {apiKey.status}
                            </Badge>
                          </div>
                          
                          <div className="bg-gray-100 rounded-lg p-3 mb-4 font-mono text-sm">
                            <div className="flex items-center justify-between">
                              <span>{isVisible ? apiKey.key : apiKey.maskedKey}</span>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => toggleKeyVisibility(apiKey.id)}
                                >
                                  {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => copyToClipboard(apiKey.key)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Usage This Month</p>
                              <p className="font-semibold">
                                {apiKey.usageCount.toLocaleString()} / {apiKey.usageLimit.toLocaleString()}
                              </p>
                              <Progress value={usagePercentage} className="h-2 mt-1" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Last Used</p>
                              <p className="font-semibold">
                                {new Date(apiKey.lastUsed).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Created</p>
                              <p className="font-semibold">{apiKey.createdAt}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Expires</p>
                              <p className="font-semibold">{apiKey.expiresAt}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-600 mb-2">Permissions</p>
                            <div className="flex flex-wrap gap-2">
                              {apiKey.permissions.map((permission) => (
                                <Badge key={permission} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <Button variant="ghost" size="sm">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Clock className="h-4 w-4" />
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
          </TabsContent>

          <TabsContent value="endpoints">
            <Card>
              <CardHeader>
                <CardTitle>API Endpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    apiEndpoints.reduce((acc, endpoint) => {
                      if (!acc[endpoint.category]) acc[endpoint.category] = [];
                      acc[endpoint.category].push(endpoint);
                      return acc;
                    }, {})
                  ).map(([category, endpoints]) => (
                    <div key={category}>
                      <h3 className="font-semibold mb-3">{category}</h3>
                      <div className="space-y-2">
                        {endpoints.map((endpoint, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <Badge 
                                variant="outline"
                                className={
                                  endpoint.method === 'POST' ? 'bg-green-100 text-green-800' :
                                  endpoint.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                                  endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }
                              >
                                {endpoint.method}
                              </Badge>
                              <code className="font-mono text-sm">{endpoint.path}</code>
                              <span className="text-gray-600">{endpoint.description}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Code className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage">
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">API usage analytics and metrics would be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Getting Started Guide</h3>
                      <p className="text-sm text-gray-600">Learn how to integrate with WhatsApp Cloud API</p>
                    </div>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">API Reference</h3>
                      <p className="text-sm text-gray-600">Complete API endpoint documentation</p>
                    </div>
                    <Button variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      View Online
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">SDK Documentation</h3>
                      <p className="text-sm text-gray-600">SDKs for popular programming languages</p>
                    </div>
                    <Button variant="outline">
                      <Terminal className="h-4 w-4 mr-2" />
                      View SDKs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}