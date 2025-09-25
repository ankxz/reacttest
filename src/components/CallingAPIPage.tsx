import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Phone, 
  Video, 
  PhoneCall,
  Clock,
  Users,
  BarChart3,
  Settings,
  Code,
  AlertTriangle
} from 'lucide-react';

export function CallingAPIPage() {
  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Business Calling API</h1>
            <p className="text-muted-foreground">Programmatically manage voice and video calls (Beta)</p>
          </div>
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            <AlertTriangle className="h-4 w-4 mr-1" />
            Limited Beta
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Beta Feature</h3>
              <p className="text-sm text-yellow-700 mt-1">
                The Business Calling API is currently in limited beta. Contact your account manager to request access.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Voice Calling Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Initiate Voice Calls</p>
                      <p className="text-sm text-gray-600">Programmatically start voice calls to WhatsApp users</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PhoneCall className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Call Management</p>
                      <p className="text-sm text-gray-600">End, pause, or transfer ongoing calls</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Call Scheduling</p>
                      <p className="text-sm text-gray-600">Schedule calls for optimal timing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Video Calling Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Video className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Video Conferences</p>
                      <p className="text-sm text-gray-600">Start video calls with customers</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Group Calls</p>
                      <p className="text-sm text-gray-600">Multi-participant video conferences</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Call Controls</p>
                      <p className="text-sm text-gray-600">Mute, video toggle, screen sharing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>API Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <PhoneCall className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Call Initiation</h3>
                    <p className="text-sm text-gray-600">Start voice/video calls programmatically via API</p>
                  </div>
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Call Analytics</h3>
                    <p className="text-sm text-gray-600">Track call duration, quality, and outcomes</p>
                  </div>
                  <div className="text-center">
                    <Code className="h-12 w-12 text-purple-500 mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Webhooks</h3>
                    <p className="text-sm text-gray-600">Real-time call status updates and events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Authentication</h3>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                      <p>Authorization: Bearer YOUR_API_TOKEN</p>
                      <p>Content-Type: application/json</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Initiate Voice Call</h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="font-mono text-sm mb-2">POST /v1/calls/voice</p>
                      <pre className="text-sm">
{`{
  "to": "+1234567890",
  "from": "+1987654321",
  "callback_url": "https://your-app.com/webhook"
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Initiate Video Call</h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="font-mono text-sm mb-2">POST /v1/calls/video</p>
                      <pre className="text-sm">
{`{
  "to": "+1234567890",
  "from": "+1987654321",
  "video_enabled": true,
  "callback_url": "https://your-app.com/webhook"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples">
            <Card>
              <CardHeader>
                <CardTitle>Code Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">JavaScript / Node.js</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 text-sm">
                      <pre>
{`const whatsapp = require('@whatsapp/calling-api');

const client = new whatsapp.CallClient({
  apiKey: 'YOUR_API_KEY'
});

// Initiate voice call
const call = await client.calls.create({
  to: '+1234567890',
  from: '+1987654321',
  type: 'voice'
});

console.log('Call ID:', call.id);`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Python</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 text-sm">
                      <pre>
{`from whatsapp_calling import CallClient

client = CallClient(api_key='YOUR_API_KEY')

# Initiate video call
call = client.calls.create(
    to='+1234567890',
    from_='+1987654321',
    type='video',
    video_enabled=True
)

print(f"Call ID: {call.id}")`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">cURL</h3>
                    <div className="bg-gray-900 text-white rounded-lg p-4 text-sm">
                      <pre>
{`curl -X POST https://api.whatsapp.com/v1/calls/voice \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+1234567890",
    "from": "+1987654321",
    "callback_url": "https://your-app.com/webhook"
  }'`}
                      </pre>
                    </div>
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