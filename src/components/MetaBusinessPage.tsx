import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ExternalLink, 
  Settings, 
  Users,
  Shield,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram
} from 'lucide-react';

export function MetaBusinessPage() {
  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Meta Business Manager</h1>
            <p className="text-muted-foreground">Manage your Meta business accounts and assets</p>
          </div>
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open Meta Business Manager
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-blue-600" />
                Business Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">WhatsApp Business Account</p>
                    <p className="text-sm text-gray-600">Active and verified</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Facebook Page</p>
                    <p className="text-sm text-gray-600">TechStore Solutions</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Instagram className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Instagram Account</p>
                    <p className="text-sm text-gray-600">@techstoresolutions</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-800">Connected</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Team Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">John Smith</p>
                  <p className="text-sm text-gray-600">Admin</p>
                </div>
                <Badge variant="outline">Full Access</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Manager</p>
                </div>
                <Badge variant="outline">Editor</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Mike Wilson</p>
                  <p className="text-sm text-gray-600">Support Agent</p>
                </div>
                <Badge variant="outline">Viewer</Badge>
              </div>
              
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Team Access
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Two-factor authentication</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm">Business verification</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm">Privacy review pending</span>
              </div>
              <Button className="w-full mt-4" variant="outline">
                Review Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                Analytics Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Connect with Meta Analytics for comprehensive insights across all platforms.</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Facebook Insights</span>
                  <Badge className="bg-blue-100 text-blue-800">Connected</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Instagram Insights</span>
                  <Badge className="bg-purple-100 text-purple-800">Connected</Badge>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="h-5 w-5 mr-2 text-blue-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                Business Settings
              </Button>
              <Button className="w-full" variant="outline">
                Payment Methods
              </Button>
              <Button className="w-full" variant="outline">
                Ad Accounts
              </Button>
              <Button className="w-full" variant="outline">
                Asset Library
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Business Manager Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Centralized Management</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Manage all Meta business assets in one place</li>
                  <li>• Control access and permissions for team members</li>
                  <li>• Streamlined billing and payment management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Enhanced Security</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Two-factor authentication for all accounts</li>
                  <li>• Business verification and compliance</li>
                  <li>• Secure asset sharing and collaboration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}