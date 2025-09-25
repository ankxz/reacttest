import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { 
  Plus, 
  Send, 
  Search, 
  Calendar,
  Users,
  MessageSquare,
  Play,
  Pause,
  BarChart3,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

export function CampaignsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message: '',
    templateId: '',
    audience: '',
    scheduledDate: ''
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock campaigns data
  const campaigns = [
    {
      id: 1,
      name: 'Summer Sale 2024',
      status: 'Active',
      audience: 'All Customers',
      template: 'Promotional',
      sent: 1250,
      delivered: 1198,
      opened: 890,
      clicks: 234,
      created: '2024-06-15',
      scheduled: '2024-06-15 10:00',
      deliveryRate: 95.8,
      openRate: 71.2,
      clickRate: 18.7
    },
    {
      id: 2,
      name: 'Product Launch Announcement',
      status: 'Completed',
      audience: 'VIP Customers',
      template: 'Announcement',
      sent: 3500,
      delivered: 3456,
      opened: 2890,
      clicks: 867,
      created: '2024-06-10',
      scheduled: '2024-06-10 14:00',
      deliveryRate: 98.7,
      openRate: 82.6,
      clickRate: 24.8
    },
    {
      id: 3,
      name: 'Newsletter June',
      status: 'Scheduled',
      audience: 'All Subscribers',
      template: 'Newsletter',
      sent: 0,
      delivered: 0,
      opened: 0,
      clicks: 0,
      created: '2024-06-18',
      scheduled: '2024-06-20 09:00',
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0
    },
    {
      id: 4,
      name: 'Feedback Request',
      status: 'Draft',
      audience: 'Recent Customers',
      template: 'Survey',
      sent: 0,
      delivered: 0,
      opened: 0,
      clicks: 0,
      created: '2024-06-18',
      scheduled: '',
      deliveryRate: 0,
      openRate: 0,
      clickRate: 0
    }
  ];

  const templates = [
    { id: 1, name: 'Promotional Offer', category: 'Marketing' },
    { id: 2, name: 'Product Announcement', category: 'Product' },
    { id: 3, name: 'Newsletter Template', category: 'Newsletter' },
    { id: 4, name: 'Survey Request', category: 'Feedback' }
  ];

  const audiences = [
    { id: 1, name: 'All Customers', count: 12459 },
    { id: 2, name: 'VIP Customers', count: 1250 },
    { id: 3, name: 'New Subscribers', count: 3456 },
    { id: 4, name: 'Recent Customers', count: 2890 }
  ];

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'default',
      'Completed': 'secondary',
      'Scheduled': 'outline',
      'Draft': 'secondary',
      'Paused': 'destructive'
    };
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Completed': 'bg-gray-100 text-gray-800',
      'Scheduled': 'bg-blue-100 text-blue-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Paused': 'bg-red-100 text-red-800'
    };
    
    return <Badge className={colors[status]}>{status}</Badge>;
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    console.log('Creating campaign:', newCampaign);
    setNewCampaign({ name: '', message: '', templateId: '', audience: '', scheduledDate: '' });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
          <p className="text-gray-600">Create and manage your WhatsApp marketing campaigns</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription>
                Set up a new WhatsApp marketing campaign.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  placeholder="e.g., Summer Sale 2024"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template">Message Template</Label>
                <Select value={newCampaign.templateId} onValueChange={(value) => setNewCampaign({...newCampaign, templateId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id.toString()}>
                        {template.name} ({template.category})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={newCampaign.audience} onValueChange={(value) => setNewCampaign({...newCampaign, audience: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    {audiences.map((audience) => (
                      <SelectItem key={audience.id} value={audience.name}>
                        {audience.name} ({audience.count.toLocaleString()} contacts)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Schedule Date & Time (Optional)</Label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={newCampaign.scheduledDate}
                  onChange={(e) => setNewCampaign({...newCampaign, scheduledDate: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit">
                  Create & Send
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {campaigns.length}
                </div>
                <p className="text-sm text-gray-600">Total Campaigns</p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {campaigns.filter(c => c.status === 'Active').length}
                </div>
                <p className="text-sm text-gray-600">Active Campaigns</p>
              </div>
              <Play className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {campaigns.reduce((sum, c) => sum + c.sent, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Messages Sent</p>
              </div>
              <Send className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {(campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.filter(c => c.openRate > 0).length || 0).toFixed(1)}%
                </div>
                <p className="text-sm text-gray-600">Avg. Open Rate</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Campaign Management</CardTitle>
              <CardDescription>Monitor and manage your WhatsApp campaigns</CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Sent</TableHead>
                  <TableHead>Delivery Rate</TableHead>
                  <TableHead>Open Rate</TableHead>
                  <TableHead>Click Rate</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-sm text-gray-500">{campaign.template}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(campaign.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2 text-gray-400" />
                        {campaign.audience}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{campaign.sent.toLocaleString()}</div>
                      {campaign.status === 'Active' && campaign.sent > 0 && (
                        <Progress value={85} className="w-16 h-2 mt-1" />
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={campaign.deliveryRate > 95 ? 'text-green-600' : campaign.deliveryRate > 85 ? 'text-yellow-600' : 'text-red-600'}>
                        {campaign.deliveryRate > 0 ? `${campaign.deliveryRate}%` : '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={campaign.openRate > 70 ? 'text-green-600' : campaign.openRate > 50 ? 'text-yellow-600' : campaign.openRate > 0 ? 'text-red-600' : 'text-gray-400'}>
                        {campaign.openRate > 0 ? `${campaign.openRate}%` : '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={campaign.clickRate > 20 ? 'text-green-600' : campaign.clickRate > 10 ? 'text-yellow-600' : campaign.clickRate > 0 ? 'text-red-600' : 'text-gray-400'}>
                        {campaign.clickRate > 0 ? `${campaign.clickRate}%` : '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(campaign.created).toLocaleDateString()}
                      </div>
                      {campaign.scheduled && (
                        <div className="text-xs text-gray-500">
                          Scheduled: {new Date(campaign.scheduled).toLocaleString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {campaign.status === 'Active' && (
                          <Button variant="ghost" size="sm">
                            <Pause className="h-4 w-4" />
                          </Button>
                        )}
                        {campaign.status === 'Draft' && (
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}