import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Plus, 
  Search, 
  Phone, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Settings,
  Edit,
  Trash2,
  BarChart3,
  Globe,
  Shield,
  Users,
  MessageCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';

// Mock phone numbers data
const phoneNumbers = [
  {
    id: '1',
    number: '+1-555-0123',
    displayName: 'Main Support Line',
    businessName: 'TechStore Solutions',
    status: 'verified',
    country: 'United States',
    capabilities: ['voice', 'sms', 'whatsapp'],
    whatsappStatus: 'active',
    messageLimit: 1000,
    messagesUsed: 750,
    qualityRating: 'high',
    createdAt: '2024-01-10',
    lastUsed: '2024-01-15T10:30:00Z',
    webhookUrl: 'https://api.company.com/webhook',
    businessProfile: {
      verified: true,
      category: 'Technology',
      description: 'Customer support and sales inquiries'
    }
  },
  {
    id: '2',
    number: '+1-555-0456',
    displayName: 'Sales Department',
    businessName: 'TechStore Solutions',
    status: 'pending',
    country: 'United States',
    capabilities: ['voice', 'sms', 'whatsapp'],
    whatsappStatus: 'pending_verification',
    messageLimit: 250,
    messagesUsed: 0,
    qualityRating: 'unknown',
    createdAt: '2024-01-14',
    lastUsed: null,
    webhookUrl: 'https://api.company.com/webhook',
    businessProfile: {
      verified: false,
      category: 'Technology',
      description: 'Sales and product inquiries'
    }
  },
  {
    id: '3',
    number: '+44-20-7946-0958',
    displayName: 'UK Support',
    businessName: 'TechStore Solutions UK',
    status: 'verified',
    country: 'United Kingdom',
    capabilities: ['voice', 'sms', 'whatsapp'],
    whatsappStatus: 'active',
    messageLimit: 500,
    messagesUsed: 125,
    qualityRating: 'medium',
    createdAt: '2024-01-08',
    lastUsed: '2024-01-15T08:45:00Z',
    webhookUrl: 'https://api.company.com/webhook-uk',
    businessProfile: {
      verified: true,
      category: 'Technology',
      description: 'UK customer support'
    }
  }
];

const getStatusIcon = (status) => {
  switch (status) {
    case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
    case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
    case 'rejected': return <AlertCircle className="h-4 w-4 text-red-600" />;
    default: return <Clock className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'verified': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getQualityColor = (rating) => {
  switch (rating) {
    case 'high': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function PhoneNumbersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredNumbers = phoneNumbers.filter(number => {
    const matchesSearch = number.number.includes(searchTerm) ||
                         number.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         number.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || number.status === selectedStatus;
    const matchesCountry = selectedCountry === 'all' || number.country === selectedCountry;
    return matchesSearch && matchesStatus && matchesCountry;
  });

  const stats = {
    totalNumbers: phoneNumbers.length,
    verifiedNumbers: phoneNumbers.filter(n => n.status === 'verified').length,
    totalMessageLimit: phoneNumbers.reduce((sum, n) => sum + n.messageLimit, 0),
    totalMessagesUsed: phoneNumbers.reduce((sum, n) => sum + n.messagesUsed, 0)
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Phone Numbers</h1>
            <p className="text-muted-foreground">Manage WhatsApp Business phone numbers and their configurations</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Phone Number
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Phone Number</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input id="phone-number" placeholder="+1-555-0123" />
                  </div>
                  <div>
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" placeholder="e.g., Customer Support" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" placeholder="Your business name" />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="business-category">Business Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea id="description" placeholder="Describe how this number will be used" />
                </div>

                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" placeholder="https://your-api.com/webhook" />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="auto-verify" />
                  <Label htmlFor="auto-verify">Submit for verification immediately</Label>
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Add Phone Number
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
                  <p className="text-sm text-gray-600">Total Numbers</p>
                  <p className="text-2xl font-bold">{stats.totalNumbers}</p>
                </div>
                <Phone className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Verified</p>
                  <p className="text-2xl font-bold">{stats.verifiedNumbers}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Message Limit</p>
                  <p className="text-2xl font-bold">{stats.totalMessageLimit.toLocaleString()}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Messages Used</p>
                  <p className="text-2xl font-bold">{stats.totalMessagesUsed.toLocaleString()}</p>
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
                placeholder="Search phone numbers..."
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
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Phone Numbers List */}
        <div className="space-y-4">
          {filteredNumbers.map((phoneNumber) => {
            const usagePercentage = Math.round((phoneNumber.messagesUsed / phoneNumber.messageLimit) * 100);

            return (
              <Card key={phoneNumber.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">{phoneNumber.number}</h3>
                        <Badge className={getStatusColor(phoneNumber.status)}>
                          {getStatusIcon(phoneNumber.status)}
                          <span className="ml-1 capitalize">{phoneNumber.status}</span>
                        </Badge>
                        {phoneNumber.businessProfile.verified && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified Business
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <p className="font-medium">{phoneNumber.displayName}</p>
                        <p className="text-gray-600">{phoneNumber.businessName}</p>
                        <p className="text-sm text-gray-500">{phoneNumber.businessProfile.description}</p>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600">Country</p>
                          <p className="font-semibold">{phoneNumber.country}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">WhatsApp Status</p>
                          <Badge 
                            variant="outline" 
                            className={phoneNumber.whatsappStatus === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {phoneNumber.whatsappStatus.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Quality Rating</p>
                          <Badge variant="outline" className={getQualityColor(phoneNumber.qualityRating)}>
                            {phoneNumber.qualityRating}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Created</p>
                          <p className="font-semibold">{phoneNumber.createdAt}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Message Usage</p>
                          <p className="text-sm font-semibold">
                            {phoneNumber.messagesUsed.toLocaleString()} / {phoneNumber.messageLimit.toLocaleString()}
                          </p>
                        </div>
                        <Progress value={usagePercentage} className="h-2" />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {phoneNumber.capabilities.map((capability) => (
                          <Badge key={capability} variant="outline" className="text-xs">
                            {capability.toUpperCase()}
                          </Badge>
                        ))}
                      </div>

                      {phoneNumber.lastUsed && (
                        <div className="mt-3 text-xs text-gray-500">
                          Last used: {new Date(phoneNumber.lastUsed).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
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

        {filteredNumbers.length === 0 && (
          <div className="text-center py-12">
            <Phone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No phone numbers found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Add your first phone number to start using WhatsApp Business API.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Phone Number
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}