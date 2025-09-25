import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Users, 
  Send, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function DashboardHome({ user }) {
  const stats = [
    {
      title: 'Total Contacts',
      value: '12,459',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Messages Sent',
      value: '45,678',
      change: '+8%',
      icon: Send,
      color: 'text-green-600'
    },
    {
      title: 'Active Campaigns',
      value: '8',
      change: '+2',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '24.5%',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  const recentCampaigns = [
    {
      name: 'Summer Sale 2024',
      status: 'Active',
      sent: 1250,
      delivered: 1198,
      opened: 890,
      date: '2024-06-15'
    },
    {
      name: 'Product Launch',
      status: 'Completed',
      sent: 3500,
      delivered: 3456,
      opened: 2890,
      date: '2024-06-10'
    },
    {
      name: 'Newsletter June',
      status: 'Scheduled',
      sent: 0,
      delivered: 0,
      opened: 0,
      date: '2024-06-20'
    }
  ];

  const getStatusBadge = (status) => {
    const variants = {
      'Active': 'default',
      'Completed': 'secondary',
      'Scheduled': 'outline'
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.organizationName}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your WhatsApp campaigns today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
            <CardDescription>Your latest WhatsApp marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCampaigns.map((campaign, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{campaign.name}</h4>
                      {getStatusBadge(campaign.status)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Sent: {campaign.sent.toLocaleString()} | 
                      Delivered: {campaign.delivered.toLocaleString()} | 
                      Opened: {campaign.opened.toLocaleString()}
                    </div>
                    {campaign.status === 'Active' && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Delivery Progress</span>
                          <span>{Math.round((campaign.delivered / campaign.sent) * 100)}%</span>
                        </div>
                        <Progress value={(campaign.delivered / campaign.sent) * 100} className="h-2" />
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 ml-4">
                    {new Date(campaign.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <Send className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <div className="font-medium">Send Quick Message</div>
                  <div className="text-sm text-gray-600">Send a message to selected contacts</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <div>
                  <div className="font-medium">Import Contacts</div>
                  <div className="text-sm text-gray-600">Upload contacts from CSV or Excel</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <MessageSquare className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <div className="font-medium">Create Template</div>
                  <div className="text-sm text-gray-600">Design a new message template</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <TrendingUp className="h-5 w-5 text-orange-600 mr-3" />
                <div>
                  <div className="font-medium">View Analytics</div>
                  <div className="text-sm text-gray-600">Check campaign performance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>WhatsApp API and platform health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium">WhatsApp API</div>
                <div className="text-sm text-green-600">Operational</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <div className="font-medium">Message Delivery</div>
                <div className="text-sm text-green-600">99.8% Success Rate</div>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <div className="font-medium">Template Review</div>
                <div className="text-sm text-yellow-600">2 Pending Approval</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}