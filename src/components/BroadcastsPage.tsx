import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Search, 
  Send, 
  Users, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Copy,
  Trash2,
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

// Mock broadcasts data
const broadcasts = [
  {
    id: '1',
    name: 'New Product Launch',
    message: 'Exciting news! Our new smartphone is now available. Get 20% off for early birds!',
    template: 'product_launch_template',
    status: 'sent',
    scheduledAt: '2024-01-15T10:00:00Z',
    sentAt: '2024-01-15T10:00:00Z',
    audienceSize: 15420,
    delivered: 14890,
    read: 12340,
    clicked: 2890,
    failed: 530,
    tags: ['product', 'promotion']
  },
  {
    id: '2',
    name: 'Weekly Newsletter',
    message: 'Your weekly update with the latest tech news and product updates.',
    template: 'newsletter_template',
    status: 'scheduled',
    scheduledAt: '2024-01-20T09:00:00Z',
    sentAt: null,
    audienceSize: 18700,
    delivered: 0,
    read: 0,
    clicked: 0,
    failed: 0,
    tags: ['newsletter', 'weekly']
  },
  {
    id: '3',
    name: 'Flash Sale Alert',
    message: '⚡ Flash Sale! 50% off selected items. Limited time offer - ends midnight!',
    template: 'flash_sale_template',
    status: 'draft',
    scheduledAt: null,
    sentAt: null,
    audienceSize: 8950,
    delivered: 0,
    read: 0,
    clicked: 0,
    failed: 0,
    tags: ['sale', 'urgent']
  },
  {
    id: '4',
    name: 'Customer Survey',
    message: 'Help us improve! Take our 2-minute survey and get a discount on your next purchase.',
    template: 'survey_template',
    status: 'failed',
    scheduledAt: '2024-01-14T14:00:00Z',
    sentAt: '2024-01-14T14:00:00Z',
    audienceSize: 5200,
    delivered: 3100,
    read: 2450,
    clicked: 890,
    failed: 2100,
    tags: ['survey', 'feedback']
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'sent': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'scheduled': return <Clock className="h-4 w-4 text-blue-600" />;
    case 'draft': return <Edit className="h-4 w-4 text-gray-600" />;
    case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
    default: return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'sent': return 'bg-green-100 text-green-800';
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    case 'failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function BroadcastsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState('all');

  const filteredBroadcasts = broadcasts.filter(broadcast => {
    const matchesSearch = broadcast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         broadcast.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || broadcast.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalBroadcasts: broadcasts.length,
    sentBroadcasts: broadcasts.filter(b => b.status === 'sent').length,
    totalAudience: broadcasts.reduce((sum, b) => sum + b.audienceSize, 0),
    avgDeliveryRate: Math.round(
      broadcasts.filter(b => b.status === 'sent').reduce((sum, b) => sum + (b.delivered / b.audienceSize) * 100, 0) / 
      broadcasts.filter(b => b.status === 'sent').length
    )
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Broadcasts</h1>
            <p className="text-muted-foreground">Send bulk messages to multiple opted-in users</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Broadcast
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Broadcast</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div>
                  <Label htmlFor="broadcast-name">Broadcast Name</Label>
                  <Input id="broadcast-name" placeholder="e.g., Weekly Newsletter" />
                </div>
                
                <div>
                  <Label htmlFor="message-template">Message Template</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product_launch">Product Launch</SelectItem>
                      <SelectItem value="newsletter">Newsletter</SelectItem>
                      <SelectItem value="promotion">Promotion</SelectItem>
                      <SelectItem value="survey">Survey</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={selectedAudience} onValueChange={setSelectedAudience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Contacts (18,750)</SelectItem>
                      <SelectItem value="active">Active Customers (12,500)</SelectItem>
                      <SelectItem value="new">New Subscribers (3,200)</SelectItem>
                      <SelectItem value="vip">VIP Customers (850)</SelectItem>
                      <SelectItem value="custom">Custom Segment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Audience Filters</Label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="opted-in" defaultChecked disabled />
                      <label htmlFor="opted-in" className="text-sm">
                        Only opted-in users (required for broadcasts)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exclude-recent" />
                      <label htmlFor="exclude-recent" className="text-sm">
                        Exclude users contacted in last 24 hours
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="schedule">Schedule</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="When to send?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">Send Immediately</SelectItem>
                      <SelectItem value="schedule">Schedule for Later</SelectItem>
                      <SelectItem value="draft">Save as Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="e.g., promotion, newsletter, urgent" />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>
                    Create Broadcast
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
                  <p className="text-sm text-gray-600">Total Broadcasts</p>
                  <p className="text-2xl font-bold">{stats.totalBroadcasts}</p>
                </div>
                <Send className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sent</p>
                  <p className="text-2xl font-bold">{stats.sentBroadcasts}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Audience</p>
                  <p className="text-2xl font-bold">{stats.totalAudience.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Delivery Rate</p>
                  <p className="text-2xl font-bold">{stats.avgDeliveryRate}%</p>
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
                placeholder="Search broadcasts..."
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
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Broadcasts List */}
        <div className="space-y-4">
          {filteredBroadcasts.map((broadcast) => {
            const deliveryRate = broadcast.audienceSize > 0 ? Math.round((broadcast.delivered / broadcast.audienceSize) * 100) : 0;
            const readRate = broadcast.delivered > 0 ? Math.round((broadcast.read / broadcast.delivered) * 100) : 0;
            const clickRate = broadcast.read > 0 ? Math.round((broadcast.clicked / broadcast.read) * 100) : 0;

            return (
              <Card key={broadcast.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{broadcast.name}</h3>
                        <Badge className={getStatusColor(broadcast.status)}>
                          {getStatusIcon(broadcast.status)}
                          <span className="ml-1 capitalize">{broadcast.status}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{broadcast.message}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {broadcast.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Audience</p>
                          <p className="font-semibold">{broadcast.audienceSize.toLocaleString()}</p>
                        </div>
                        {broadcast.status === 'sent' && (
                          <>
                            <div>
                              <p className="text-gray-600">Delivered</p>
                              <p className="font-semibold">{broadcast.delivered.toLocaleString()} ({deliveryRate}%)</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Read</p>
                              <p className="font-semibold">{broadcast.read.toLocaleString()} ({readRate}%)</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Clicked</p>
                              <p className="font-semibold">{broadcast.clicked.toLocaleString()} ({clickRate}%)</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Failed</p>
                              <p className="font-semibold text-red-600">{broadcast.failed.toLocaleString()}</p>
                            </div>
                          </>
                        )}
                        {broadcast.status === 'scheduled' && (
                          <div className="lg:col-span-4">
                            <p className="text-gray-600">Scheduled for</p>
                            <p className="font-semibold">
                              {new Date(broadcast.scheduledAt).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>

                      {broadcast.sentAt && (
                        <div className="mt-3 text-xs text-gray-500">
                          Sent on {new Date(broadcast.sentAt).toLocaleString()}
                        </div>
                      )}
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
                      {broadcast.status === 'draft' && (
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
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

        {filteredBroadcasts.length === 0 && (
          <div className="text-center py-12">
            <Send className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No broadcasts found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Create your first broadcast to send bulk messages to your audience.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Broadcast
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}