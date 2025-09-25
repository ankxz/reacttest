import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CreditCard, 
  DollarSign, 
  Shield,
  ExternalLink,
  Link,
  QrCode,
  Smartphone,
  Globe
} from 'lucide-react';

export function PaymentsPage() {
  const paymentMethods = [
    {
      name: 'Stripe',
      description: 'Accept credit cards and online payments',
      icon: '💳',
      status: 'available'
    },
    {
      name: 'PayPal',
      description: 'PayPal payment gateway integration',
      icon: '🅿️',
      status: 'available'
    },
    {
      name: 'Apple Pay',
      description: 'Mobile payments for iOS users',
      icon: '📱',
      status: 'available'
    },
    {
      name: 'Google Pay',
      description: 'Mobile payments for Android users',
      icon: '🟢',
      status: 'available'
    }
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Payment Links</h1>
            <p className="text-muted-foreground">Send secure payment links through WhatsApp</p>
          </div>
          <Button>
            <Link className="h-4 w-4 mr-2" />
            Create Payment Link
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{method.icon}</span>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Setup
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Security Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">PCI DSS Compliant</p>
                  <p className="text-sm text-gray-600">Industry-standard security</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <QrCode className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Secure Links</p>
                  <p className="text-sm text-gray-600">Encrypted payment URLs</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Mobile Optimized</p>
                  <p className="text-sm text-gray-600">Seamless mobile checkout</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link className="h-5 w-5 mr-2 text-blue-600" />
                Quick Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Send payment links directly in WhatsApp conversations for instant checkout.</p>
              <Button className="w-full" variant="outline">
                Create Quick Payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Subscription Billing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Set up recurring payments and subscription management through WhatsApp.</p>
              <Button className="w-full" variant="outline">
                Setup Subscriptions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-purple-600" />
                Multi-Currency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Accept payments in multiple currencies with automatic conversion.</p>
              <Button className="w-full" variant="outline">
                Configure Currencies
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}