import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Search, 
  Phone, 
  Video,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Copy,
  Settings,
  PhoneCall,
  Users,
  Clock
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';

// Mock call buttons data
const callButtons = [
  {
    id: '1',
    name: 'Customer Support Call',
    description: 'Direct line to customer support team',
    buttonText: 'Call Support',
    phoneNumber: '+1-555-0123',
    type: 'voice',
    status: 'active',
    clicks: 1250,
    conversions: 890,
    averageCallDuration: '4:30',
    createdAt: '2024-01-10',
    lastUsed: '2024-01-15T10:30:00Z',
    placement: ['chat', 'menu'],
    businessHours: true,
    autoResponse: 'Thanks for calling! We\'ll connect you shortly.'
  },
  {
    id: '2',
    name: 'Sales Video Call',
    description: 'Video consultation with sales team',
    buttonText: 'Video Consultation',
    phoneNumber: '+1-555-0456',
    type: 'video',
    status: 'active',
    clicks: 650,
    conversions: 520,
    averageCallDuration: '12:45',
    createdAt: '2024-01-08',
    lastUsed: '2024-01-15T08:45:00Z',
    placement: ['chat', 'catalog'],
    businessHours: true,
    autoResponse: 'Starting video call for product consultation...'
  },
  {
    id: '3',
    name: 'Emergency Support',
    description: '24/7 emergency technical support line',
    buttonText: 'Emergency Call',
    phoneNumber: '+1-555-0789',
    type: 'voice',
    status: 'active',
    clicks: 320,
    conversions: 310,
    averageCallDuration: '8:15',
    createdAt: '2024-01-05',
    lastUsed: '2024-01-14T22:15:00Z',
    placement: ['chat'],
    businessHours: false,
    autoResponse: 'Emergency support - connecting immediately...'
  },
  {
    id: '4',
    name: 'Product Demo Call',
    description: 'Schedule a product demonstration call',
    buttonText: 'Schedule Demo',
    phoneNumber: '+1-555-0321',
    type: 'video',
    status: 'paused',
    clicks: 180,
    conversions: 145,
    averageCallDuration: '25:30',
    createdAt: '2024-01-03',
    lastUsed: '2024-01-10T16:20:00Z',
    placement: ['menu'],
    businessHours: true,
    autoResponse: 'Let\'s schedule your personalized product demo!'
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'active': return <PhoneCall className="h-4 w-4 text-green-600" />;
    case 'paused': return <Clock className="h-4 w-4 text-yellow-600" />;
    default: return <Phone className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeIcon = (type) => {
  return type === 'video' ? Video : Phone;
};

export function CallButtonsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const filteredButtons = callButtons.filter(button => {
    const matchesSearch = button.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         button.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || button.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || button.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    totalButtons: callButtons.length,
    activeButtons: callButtons.filter(b => b.status === 'active').length,
    totalClicks: callButtons.reduce((sum, b) => sum + b.clicks, 0),
    avgConversionRate: Math.round(
      callButtons.reduce((sum, b) => sum + (b.conversions / b.clicks) * 100, 0) / callButtons.length
    )
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Click-to-Call Buttons</h1>
            <p className="text-muted-foreground">Manage call buttons for voice and video calls within WhatsApp</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Call Button
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Call Button</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="button-name">Button Name</Label>
                    <Input id="button-name" placeholder="e.g., Customer Support Call" />
                  </div>
                  <div>
                    <Label htmlFor="button-text">Button Text</Label>
                    <Input id="button-text" placeholder="e.g., Call Support" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the purpose of this call button" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input id="phone-number" placeholder="+1-555-0123" />
                  </div>
                  <div>
                    <Label htmlFor="call-type">Call Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="voice">Voice Call</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Button Placement</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="chat-placement" />
                      <label htmlFor="chat-placement" className="text-sm">
                        Chat conversations
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="menu-placement" />
                      <label htmlFor="menu-placement" className="text-sm">
                        Main menu
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="catalog-placement" />
                      <label htmlFor="catalog-placement" className="text-sm">
                        Product catalog
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="auto-response">Auto-response Message</Label>
                  <Textarea 
                    id="auto-response" 
                    placeholder="Message sent when user clicks the call button"
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="business-hours" />
                  <Label htmlFor="business-hours">Only show during business hours</Label>
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
                    Create Button
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
                  <p className="text-sm text-gray-600">Total Buttons</p>
                  <p className="text-2xl font-bold">{stats.totalButtons}</p>
                </div>
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Buttons</p>
                  <p className="text-2xl font-bold">{stats.activeButtons}</p>
                </div>
                <PhoneCall className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Clicks</p>
                  <p className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Conversion</p>
                  <p className="text-2xl font-bold">{stats.avgConversionRate}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-500" />
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
                placeholder="Search call buttons..."
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
                <SelectItem value="voice">Voice Call</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
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
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Call Buttons List */}
        <div className="space-y-4">
          {filteredButtons.map((button) => {
            const TypeIcon = getTypeIcon(button.type);
            const conversionRate = Math.round((button.conversions / button.clicks) * 100);

            return (
              <Card key={button.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <TypeIcon className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">{button.name}</h3>
                        <Badge className={getStatusColor(button.status)}>
                          {getStatusIcon(button.status)}
                          <span className="ml-1 capitalize">{button.status}</span>
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={button.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}
                        >
                          {button.type} call
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{button.description}</p>

                      <div className="bg-gray-100 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">Button Preview:</span>
                            <Button size="sm" variant="outline">
                              <TypeIcon className="h-4 w-4 mr-2" />
                              {button.buttonText}
                            </Button>
                          </div>
                          <span className="text-sm text-gray-600">{button.phoneNumber}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Clicks</p>
                          <p className="font-semibold">{button.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Conversions</p>
                          <p className="font-semibold">{button.conversions.toLocaleString()} ({conversionRate}%)</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Avg Call Duration</p>
                          <p className="font-semibold">{button.averageCallDuration}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Last Used</p>
                          <p className="font-semibold">
                            {new Date(button.lastUsed).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Placement</p>
                          <div className="flex flex-wrap gap-1">
                            {button.placement.map((place) => (
                              <Badge key={place} variant="outline" className="text-xs">
                                {place}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Business Hours Only</p>
                          <p className="font-semibold">{button.businessHours ? 'Yes' : 'No'}</p>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-500">
                        Created {button.createdAt}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
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

        {filteredButtons.length === 0 && (
          <div className="text-center py-12">
            <Phone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No call buttons found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first call button to enable voice and video calls in WhatsApp.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Call Button
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}