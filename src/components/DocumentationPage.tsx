import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Book, 
  Code, 
  Download,
  ExternalLink,
  Video,
  FileText,
  Users,
  Zap
} from 'lucide-react';

export function DocumentationPage() {
  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Documentation</h1>
            <p className="text-muted-foreground">Developer resources, guides, and API documentation</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="h-5 w-5 mr-2 text-blue-600" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Quick Start Guide</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Setup & Configuration</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Authentication Guide</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-green-600" />
                API Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Messages API</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Media API</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Webhooks API</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Video className="h-5 w-5 mr-2 text-purple-600" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Platform Overview</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Integration Tutorial</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Best Practices</span>
                <Button size="sm" variant="ghost">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SDK Downloads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Node.js SDK</p>
                  <p className="text-sm text-gray-600">npm install @whatsapp/cloud-api</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Python SDK</p>
                  <p className="text-sm text-gray-600">pip install whatsapp-cloud-api</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">PHP SDK</p>
                  <p className="text-sm text-gray-600">composer require whatsapp/cloud-api</p>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community & Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Developer Forum</p>
                    <p className="text-sm text-gray-600">Community discussions</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Support Center</p>
                    <p className="text-sm text-gray-600">Get help from experts</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">Changelog</p>
                    <p className="text-sm text-gray-600">Latest updates</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}