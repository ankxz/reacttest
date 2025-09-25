import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Eye, 
  Copy,
  FileImage,
  FileVideo,
  FileAudio,
  FileText,
  File,
  MoreVertical
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Progress } from './ui/progress';

// Mock media data
const mediaFiles = [
  {
    id: '1',
    name: 'product-showcase.jpg',
    type: 'image',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploadDate: '2024-01-15',
    url: '/api/placeholder/300/200',
    used: 15,
    tags: ['product', 'showcase']
  },
  {
    id: '2',
    name: 'welcome-video.mp4',
    type: 'video',
    size: '15.2 MB',
    duration: '00:02:30',
    uploadDate: '2024-01-14',
    url: '/api/placeholder/300/200',
    used: 8,
    tags: ['welcome', 'onboarding']
  },
  {
    id: '3',
    name: 'notification-sound.mp3',
    type: 'audio',
    size: '1.1 MB',
    duration: '00:00:15',
    uploadDate: '2024-01-13',
    url: '',
    used: 22,
    tags: ['notification', 'sound']
  },
  {
    id: '4',
    name: 'terms-and-conditions.pdf',
    type: 'document',
    size: '850 KB',
    pages: 12,
    uploadDate: '2024-01-12',
    url: '',
    used: 5,
    tags: ['legal', 'terms']
  },
  {
    id: '5',
    name: 'product-catalog.pdf',
    type: 'document',
    size: '3.2 MB',
    pages: 24,
    uploadDate: '2024-01-10',
    url: '',
    used: 45,
    tags: ['catalog', 'products']
  }
];

const getFileIcon = (type) => {
  switch (type) {
    case 'image': return FileImage;
    case 'video': return FileVideo;
    case 'audio': return FileAudio;
    case 'document': return FileText;
    default: return File;
  }
};

const getFileTypeColor = (type) => {
  switch (type) {
    case 'image': return 'bg-blue-100 text-blue-800';
    case 'video': return 'bg-purple-100 text-purple-800';
    case 'audio': return 'bg-green-100 text-green-800';
    case 'document': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export function MediaLibraryPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = selectedTab === 'all' || file.type === selectedTab;
    return matchesSearch && matchesTab;
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setIsUploading(true);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadProgress(0);
        }
      }, 200);
    }
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Media Library</h1>
            <p className="text-muted-foreground">Manage images, videos, audio files, and documents</p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button asChild className="cursor-pointer">
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </span>
              </Button>
            </label>
          </div>
        </div>

        {isUploading && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Uploading files...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="newest">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="size">File Size</SelectItem>
                <SelectItem value="usage">Most Used</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedFiles.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{selectedFiles.length} selected</span>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Files ({mediaFiles.length})</TabsTrigger>
            <TabsTrigger value="image">Images ({mediaFiles.filter(f => f.type === 'image').length})</TabsTrigger>
            <TabsTrigger value="video">Videos ({mediaFiles.filter(f => f.type === 'video').length})</TabsTrigger>
            <TabsTrigger value="audio">Audio ({mediaFiles.filter(f => f.type === 'audio').length})</TabsTrigger>
            <TabsTrigger value="document">Documents ({mediaFiles.filter(f => f.type === 'document').length})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <Card 
                    key={file.id} 
                    className={`cursor-pointer hover:shadow-lg transition-shadow ${
                      selectedFiles.includes(file.id) ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => handleFileSelect(file.id)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square mb-3 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                        {file.type === 'image' && file.url ? (
                          <img 
                            src={file.url} 
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileIcon className="h-12 w-12 text-gray-400" />
                        )}
                        
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-sm truncate" title={file.name}>
                          {file.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${getFileTypeColor(file.type)}`}
                          >
                            {file.type}
                          </Badge>
                          <span className="text-xs text-gray-500">{file.size}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Used {file.used} times</span>
                          <span>{file.uploadDate}</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {file.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {filteredFiles.length === 0 && (
          <div className="text-center py-12">
            <FileImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms.' : 'Upload your first media file to get started.'}
            </p>
            {!searchTerm && (
              <label htmlFor="file-upload">
                <Button asChild className="cursor-pointer">
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </span>
                </Button>
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}