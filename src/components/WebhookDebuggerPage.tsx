import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Play, 
  Bug, 
  Code, 
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Terminal,
  Copy,
  Download
} from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function WebhookDebuggerPage() {
  const [testUrl, setTestUrl] = useState('');
  const [testPayload, setTestPayload] = useState(JSON.stringify({
    "object": "whatsapp_business_account",
    "entry": [{
      "id": "PHONE_NUMBER_ID",
      "changes": [{
        "value": {
          "messaging_product": "whatsapp",
          "metadata": {
            "display_phone_number": "15550123456",
            "phone_number_id": "PHONE_NUMBER_ID"
          },
          "messages": [{
            "from": "15551234567",
            "id": "wamid.XXX",
            "timestamp": "1234567890",
            "text": {
              "body": "Hello World!"
            },
            "type": "text"
          }]
        },
        "field": "messages"
      }]
    }]
  }, null, 2));

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Webhook Debugger</h1>
            <p className="text-muted-foreground">Test and debug webhook endpoints in real-time</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="tester">
          <TabsList className="mb-6">
            <TabsTrigger value="tester">Webhook Tester</TabsTrigger>
            <TabsTrigger value="logs">Debug Logs</TabsTrigger>
            <TabsTrigger value="inspector">Payload Inspector</TabsTrigger>
          </TabsList>

          <TabsContent value="tester">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Webhook URL</label>
                    <Input 
                      placeholder="https://your-app.com/webhook"
                      value={testUrl}
                      onChange={(e) => setTestUrl(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Type</label>
                    <Select defaultValue="message_received">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="message_received">Message Received</SelectItem>
                        <SelectItem value="message_status">Message Status</SelectItem>
                        <SelectItem value="message_reaction">Message Reaction</SelectItem>
                        <SelectItem value="button_clicked">Button Clicked</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Test Payload</label>
                    <Textarea 
                      value={testPayload}
                      onChange={(e) => setTestPayload(e.target.value)}
                      rows={12}
                      className="font-mono text-sm"
                    />
                  </div>

                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Send Test Webhook
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        200 OK
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Response Time:</span>
                      <span className="text-sm">145ms</span>
                    </div>

                    <div>
                      <span className="text-sm font-medium mb-2 block">Headers:</span>
                      <div className="bg-gray-100 rounded p-3 text-sm font-mono">
                        <div>Content-Type: application/json</div>
                        <div>X-Response-Time: 145ms</div>
                        <div>Server: nginx/1.18.0</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium mb-2 block">Response Body:</span>
                      <div className="bg-gray-100 rounded p-3 text-sm font-mono">
                        {`{
  "status": "success",
  "message": "Webhook received",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Recent Webhook Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '10:30:15', url: 'https://api.company.com/webhook', status: 200, event: 'message.received' },
                    { time: '10:29:42', url: 'https://api.company.com/webhook', status: 500, event: 'message.status' },
                    { time: '10:28:33', url: 'https://api.company.com/webhook', status: 200, event: 'button.clicked' },
                  ].map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-mono">{log.time}</span>
                        <Badge variant="outline">{log.event}</Badge>
                        <span className="text-sm text-gray-600 truncate max-w-xs">{log.url}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={log.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {log.status === 200 ? <CheckCircle className="h-3 w-3 mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
                          {log.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Code className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inspector">
            <Card>
              <CardHeader>
                <CardTitle>Payload Inspector</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">Inspect and validate webhook payloads for different event types.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}