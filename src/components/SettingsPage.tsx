import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';
import { 
  User, 
  Building, 
  Key, 
  Bell, 
  Shield, 
  Smartphone,
  Globe,
  Users,
  Settings,
  AlertCircle,
  CheckCircle,
  Copy,
  RefreshCw,
  Save
} from 'lucide-react';

export function SettingsPage({ user }) {
  const [orgSettings, setOrgSettings] = useState({
    name: user.organizationName,
    description: 'Leading e-commerce platform',
    website: 'https://company.com',
    industry: 'E-commerce',
    timezone: 'UTC-05:00',
    language: 'en_US'
  });

  const [whatsappSettings, setWhatsappSettings] = useState({
    phoneNumberId: '123456789012345',
    accessToken: 'EAAG...***masked***',
    webhookUrl: 'https://yourapp.com/webhook',
    verifyToken: 'your_verify_token_123',
    businessAccountId: '987654321098765'
  });

  const [notifications, setNotifications] = useState({
    emailReports: true,
    campaignAlerts: true,
    systemUpdates: false,
    billingNotifications: true,
    securityAlerts: true
  });

  const [teamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@company.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@company.com', role: 'User', status: 'Pending' }
  ]);

  const handleSaveOrgSettings = (e) => {
    e.preventDefault();
    console.log('Saving organization settings:', orgSettings);
  };

  const handleSaveWhatsAppSettings = (e) => {
    e.preventDefault();
    console.log('Saving WhatsApp settings:', whatsappSettings);
  };

  const generateNewToken = () => {
    console.log('Generating new access token...');
  };

  const testWebhook = () => {
    console.log('Testing webhook connection...');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your organization and WhatsApp integration settings</p>
      </div>

      <Tabs defaultValue="organization" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp API</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        {/* Organization Settings */}
        <TabsContent value="organization">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Organization Profile
                </CardTitle>
                <CardDescription>
                  Update your organization information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveOrgSettings} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        value={orgSettings.name}
                        onChange={(e) => setOrgSettings({...orgSettings, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={orgSettings.industry} onValueChange={(value) => setOrgSettings({...orgSettings, industry: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="E-commerce">E-commerce</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={orgSettings.description}
                      onChange={(e) => setOrgSettings({...orgSettings, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={orgSettings.website}
                      onChange={(e) => setOrgSettings({...orgSettings, website: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={orgSettings.timezone} onValueChange={(value) => setOrgSettings({...orgSettings, timezone: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-08:00">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-07:00">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="UTC-06:00">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="UTC-05:00">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+00:00">UTC (UTC+0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Default Language</Label>
                      <Select value={orgSettings.language} onValueChange={(value) => setOrgSettings({...orgSettings, language: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en_US">English (US)</SelectItem>
                          <SelectItem value="es_ES">Spanish (Spain)</SelectItem>
                          <SelectItem value="fr_FR">French (France)</SelectItem>
                          <SelectItem value="de_DE">German (Germany)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button type="submit">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* WhatsApp API Settings */}
        <TabsContent value="whatsapp">
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                These settings connect your platform to the WhatsApp Cloud API. Changes may affect message delivery.
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="h-5 w-5 mr-2" />
                  WhatsApp Business API Configuration
                </CardTitle>
                <CardDescription>
                  Configure your WhatsApp Cloud API credentials and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveWhatsAppSettings} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phoneNumberId"
                        value={whatsappSettings.phoneNumberId}
                        onChange={(e) => setWhatsappSettings({...whatsappSettings, phoneNumberId: e.target.value})}
                        readOnly
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accessToken">Access Token</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accessToken"
                        type="password"
                        value={whatsappSettings.accessToken}
                        onChange={(e) => setWhatsappSettings({...whatsappSettings, accessToken: e.target.value})}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={generateNewToken}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="businessAccountId">Business Account ID</Label>
                    <Input
                      id="businessAccountId"
                      value={whatsappSettings.businessAccountId}
                      onChange={(e) => setWhatsappSettings({...whatsappSettings, businessAccountId: e.target.value})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <h4 className="text-lg font-medium">Webhook Configuration</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="webhookUrl"
                        value={whatsappSettings.webhookUrl}
                        onChange={(e) => setWhatsappSettings({...whatsappSettings, webhookUrl: e.target.value})}
                      />
                      <Button type="button" variant="outline" size="sm" onClick={testWebhook}>
                        Test
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="verifyToken">Verify Token</Label>
                    <Input
                      id="verifyToken"
                      value={whatsappSettings.verifyToken}
                      onChange={(e) => setWhatsappSettings({...whatsappSettings, verifyToken: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Save Configuration
                    </Button>
                    <Button type="button" variant="outline">
                      Test Connection
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Status</CardTitle>
                <CardDescription>Current status of your WhatsApp API integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="font-medium">API Connection</div>
                      <div className="text-sm text-green-600">Connected</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="font-medium">Webhook</div>
                      <div className="text-sm text-green-600">Active</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <div>
                      <div className="font-medium">Phone Number</div>
                      <div className="text-sm text-green-600">Verified</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                    <div>
                      <div className="font-medium">Rate Limit</div>
                      <div className="text-sm text-yellow-600">1000/hr</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Management */}
        <TabsContent value="team">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2" />
                      Team Members
                    </CardTitle>
                    <CardDescription>
                      Manage team access and permissions
                    </CardDescription>
                  </div>
                  <Button>
                    <User className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-600">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>
                          {member.status}
                        </Badge>
                        <Badge variant="outline">{member.role}</Badge>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailReports">Email Reports</Label>
                    <p className="text-sm text-gray-600">Receive weekly campaign performance reports</p>
                  </div>
                  <Switch
                    id="emailReports"
                    checked={notifications.emailReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, emailReports: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="campaignAlerts">Campaign Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified when campaigns complete or fail</p>
                  </div>
                  <Switch
                    id="campaignAlerts"
                    checked={notifications.campaignAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, campaignAlerts: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <p className="text-sm text-gray-600">Receive notifications about platform updates</p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, systemUpdates: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="billingNotifications">Billing Notifications</Label>
                    <p className="text-sm text-gray-600">Alerts about billing and subscription changes</p>
                  </div>
                  <Switch
                    id="billingNotifications"
                    checked={notifications.billingNotifications}
                    onCheckedChange={(checked) => setNotifications({...notifications, billingNotifications: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityAlerts">Security Alerts</Label>
                    <p className="text-sm text-gray-600">Important security notifications</p>
                  </div>
                  <Switch
                    id="securityAlerts"
                    checked={notifications.securityAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, securityAlerts: checked})}
                  />
                </div>
                
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security and access controls
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Password Security</h4>
                  <div className="space-y-3">
                    <Button variant="outline">Change Password</Button>
                    <p className="text-sm text-gray-600">
                      Last changed: Never. We recommend changing your password regularly.
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">API Keys</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">Production API Key</div>
                        <div className="text-sm text-gray-600">wp_live_***...***abc123</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline">Generate New API Key</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3 text-red-600">Danger Zone</h4>
                  <div className="space-y-3">
                    <Button variant="destructive" className="w-full">
                      Delete Organization
                    </Button>
                    <p className="text-sm text-gray-600">
                      This action cannot be undone. This will permanently delete your organization and all associated data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}