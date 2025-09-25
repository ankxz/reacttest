import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  TestTube, 
  Phone, 
  MessageSquare,
  Users,
  Settings,
  Code,
  Play
} from 'lucide-react';

export function SandboxPage() {
  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Sandbox Environment</h1>
            <p className="text-muted-foreground">Test WhatsApp features with dummy numbers and data</p>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <TestTube className="h-4 w-4 mr-1" />
            Testing Environment
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Phone Numbers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Available Test Numbers</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>+1-555-TEST-001</span>
                    <Badge variant="outline">US</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>+44-555-TEST-002</span>
                    <Badge variant="outline">UK</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>+49-555-TEST-003</span>
                    <Badge variant="outline">DE</Badge>
                  </div>
                </div>
              </div>
              <Button className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Get New Test Number
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Testing Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">Message Testing</p>
                  <p className="text-sm text-gray-600">Send test messages and media</p>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">Contact Management</p>
                  <p className="text-sm text-gray-600">Test contact operations</p>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <Settings className="h-5 w-5 text-purple-600" />
                <div className="flex-1">
                  <p className="font-medium">Webhook Testing</p>
                  <p className="text-sm text-gray-600">Test webhook endpoints</p>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Sandbox Limitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <ul className="space-y-2 text-sm">
                <li>• Messages are not delivered to real phone numbers</li>
                <li>• Limited to 1000 API calls per day</li>
                <li>• Test data is reset every 24 hours</li>
                <li>• Some features may have reduced functionality</li>
                <li>• No actual charges are incurred</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}