import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Puzzle, 
  Settings, 
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Database,
  Zap,
  Users
} from 'lucide-react';

export function CRMERPPage() {
  const integrations = [
    {
      name: 'Salesforce',
      category: 'CRM',
      status: 'connected',
      description: 'Sync contacts and conversation history',
      icon: '🏢'
    },
    {
      name: 'HubSpot',
      category: 'CRM',
      status: 'available',
      description: 'Lead management and customer tracking',
      icon: '📊'
    },
    {
      name: 'SAP',
      category: 'ERP',
      status: 'available',
      description: 'Enterprise resource planning integration',
      icon: '⚙️'
    },
    {
      name: 'Shopify',
      category: 'E-commerce',
      status: 'connected',
      description: 'Order management and customer support',
      icon: '🛒'
    }
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>CRM & ERP Integrations</h1>
            <p className="text-muted-foreground">Connect with your existing business systems</p>
          </div>
          <Button>
            <Puzzle className="h-4 w-4 mr-2" />
            Browse Integrations
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <Badge variant="outline">{integration.category}</Badge>
                    </div>
                  </div>
                  {integration.status === 'connected' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                <div className="flex justify-between items-center">
                  <Badge 
                    className={integration.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {integration.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {integration.status === 'connected' ? (
                      <>
                        <Settings className="h-4 w-4 mr-2" />
                        Configure
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Connect
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2 text-blue-600" />
                Data Sync
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Automatically sync customer data, conversation history, and contact information between systems.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                Automation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Trigger workflows and automated actions based on WhatsApp interactions and customer behavior.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-green-600" />
                Unified View
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">Get a complete 360-degree view of customer interactions across all channels and touchpoints.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}