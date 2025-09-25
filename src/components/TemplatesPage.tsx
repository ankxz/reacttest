import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  Search, 
  FileText,
  MessageSquare,
  Eye,
  Edit,
  Copy,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';

export function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    category: '',
    language: 'en_US',
    header: '',
    body: '',
    footer: '',
    buttons: []
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock templates data
  const templates = [
    {
      id: 1,
      name: 'Welcome Message',
      category: 'Utility',
      language: 'en_US',
      status: 'Approved',
      header: 'Welcome to {{company_name}}!',
      body: 'Hi {{customer_name}}, thank you for joining us. We\'re excited to have you on board!',
      footer: 'Best regards, {{company_name}} Team',
      buttons: [
        { type: 'url', text: 'Visit Website', url: 'https://company.com' }
      ],
      created: '2024-06-01',
      lastUsed: '2024-06-15',
      usageCount: 1250
    },
    {
      id: 2,
      name: 'Order Confirmation',
      category: 'Utility',
      language: 'en_US',
      status: 'Approved',
      header: 'Order Confirmed #' + '{{order_id}}',
      body: 'Your order has been confirmed and will be delivered to ' + '{{delivery_address}}' + ' by ' + '{{delivery_date}}' + '.',
      footer: 'Track your order anytime',
      buttons: [
        { type: 'url', text: 'Track Order', url: 'https://company.com/track/' + '{{order_id}}' },
        { type: 'phone', text: 'Call Support', phone: '+1234567890' }
      ],
      created: '2024-05-15',
      lastUsed: '2024-06-14',
      usageCount: 2890
    },
    {
      id: 3,
      name: 'Summer Sale Promotion',
      category: 'Marketing',
      language: 'en_US',
      status: 'Pending',
      header: '🏖️ Summer Sale is Here!',
      body: 'Get up to ' + '{{discount_percentage}}' + '% off on all summer collection. Limited time offer valid until ' + '{{end_date}}' + '.',
      footer: 'Terms and conditions apply',
      buttons: [
        { type: 'url', text: 'Shop Now', url: 'https://company.com/sale' }
      ],
      created: '2024-06-10',
      lastUsed: null,
      usageCount: 0
    },
    {
      id: 4,
      name: 'Appointment Reminder',
      category: 'Utility',
      language: 'en_US',
      status: 'Rejected',
      header: 'Appointment Reminder',
      body: 'Hi ' + '{{customer_name}}' + ', this is a reminder for your appointment on ' + '{{appointment_date}}' + ' at ' + '{{appointment_time}}' + '.',
      footer: 'Please arrive 10 minutes early',
      buttons: [
        { type: 'quick_reply', text: 'Confirm' },
        { type: 'quick_reply', text: 'Reschedule' }
      ],
      created: '2024-06-05',
      lastUsed: null,
      usageCount: 0
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', count: templates.length },
    { value: 'Utility', label: 'Utility', count: templates.filter(t => t.category === 'Utility').length },
    { value: 'Marketing', label: 'Marketing', count: templates.filter(t => t.category === 'Marketing').length },
    { value: 'Authentication', label: 'Authentication', count: 0 }
  ];

  const languages = [
    { value: 'en_US', label: 'English (US)' },
    { value: 'es_ES', label: 'Spanish (Spain)' },
    { value: 'fr_FR', label: 'French (France)' },
    { value: 'de_DE', label: 'German (Germany)' }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    const config = {
      'Approved': { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Pending': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'Rejected': { color: 'bg-red-100 text-red-800', icon: XCircle },
      'Draft': { color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
    };
    const { color, icon: Icon } = config[status];
    
    return (
      <Badge className={`${color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    );
  };

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    console.log('Creating template:', newTemplate);
    setNewTemplate({ name: '', category: '', language: 'en_US', header: '', body: '', footer: '', buttons: [] });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Message Templates</h1>
          <p className="text-gray-600">Create and manage WhatsApp message templates for your campaigns</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button">
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Message Template</DialogTitle>
              <DialogDescription>
                Create a new WhatsApp message template. Templates must be approved by WhatsApp before use.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTemplate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    placeholder="e.g., welcome_message"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate({...newTemplate, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Utility">Utility</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Authentication">Authentication</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={newTemplate.language} onValueChange={(value) => setNewTemplate({...newTemplate, language: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="header">Header (Optional)</Label>
                <Input
                  id="header"
                  placeholder="e.g., Welcome to {`{{company_name}}`}!"
                  value={newTemplate.header}
                  onChange={(e) => setNewTemplate({...newTemplate, header: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body">Message Body</Label>
                <Textarea
                  id="body"
                  placeholder={`Enter your message content. Use {{variable_name}} for dynamic content.`}
                  rows={4}
                  value={newTemplate.body}
                  onChange={(e) => setNewTemplate({...newTemplate, body: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer">Footer (Optional)</Label>
                <Input
                  id="footer"
                  placeholder="e.g., Best regards, {`{{company_name}}`} Team"
                  value={newTemplate.footer}
                  onChange={(e) => setNewTemplate({...newTemplate, footer: e.target.value})}
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Template Guidelines:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Use {`{{variable_name}}`} format for dynamic content</li>
                  <li>• Marketing templates require pre-approval from WhatsApp</li>
                  <li>• Utility templates are typically approved faster</li>
                  <li>• Avoid using excessive emojis or special characters</li>
                </ul>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit">
                  Submit for Approval
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
                  {templates.length}
                </div>
                <p className="text-sm text-gray-600">Total Templates</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {templates.filter(t => t.status === 'Approved').length}
                </div>
                <p className="text-sm text-gray-600">Approved</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {templates.filter(t => t.status === 'Pending').length}
                </div>
                <p className="text-sm text-gray-600">Pending Review</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {templates.reduce((sum, t) => sum + t.usageCount, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Total Usage</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Templates Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Template Library</CardTitle>
              <CardDescription>Manage your WhatsApp message templates</CardDescription>
            </div>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.category}</CardDescription>
                    </div>
                    {getStatusBadge(template.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {template.header && (
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        <strong>Header:</strong> {template.header}
                      </div>
                    )}
                    <div className="p-2 bg-gray-50 rounded text-sm">
                      <strong>Body:</strong> {template.body.substring(0, 100)}{template.body.length > 100 ? '...' : ''}
                    </div>
                    {template.footer && (
                      <div className="p-2 bg-gray-50 rounded text-sm">
                        <strong>Footer:</strong> {template.footer}
                      </div>
                    )}
                  </div>
                  
                  {template.buttons.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-sm font-medium">Buttons:</div>
                      {template.buttons.map((button, index) => (
                        <Badge key={index} variant="outline" className="mr-1">
                          {button.text}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Used: {template.usageCount.toLocaleString()}</span>
                    <span>Created: {new Date(template.created).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Copy className="h-4 w-4 mr-1" />
                      Duplicate
                    </Button>
                    {template.status === 'Draft' && (
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}