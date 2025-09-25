import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  Search, 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video, 
  MessageCircle,
  Clock,
  CheckCheck,
  Heart,
  ThumbsUp,
  Smile
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

// Mock conversation data
const conversations = [
  {
    id: '1',
    contact: { name: 'John Smith', phone: '+1234567890', avatar: '' },
    lastMessage: 'Thanks for the quick response!',
    timestamp: '2 min ago',
    unread: 0,
    status: 'active',
    sessionWindow: true
  },
  {
    id: '2',
    contact: { name: 'Sarah Johnson', phone: '+1987654321', avatar: '' },
    lastMessage: 'Can you send me the product catalog?',
    timestamp: '15 min ago',
    unread: 2,
    status: 'pending',
    sessionWindow: true
  },
  {
    id: '3',
    contact: { name: 'Mike Wilson', phone: '+1122334455', avatar: '' },
    lastMessage: 'Order confirmed! Thank you.',
    timestamp: '1 hour ago',
    unread: 0,
    status: 'closed',
    sessionWindow: false
  }
];

const messages = [
  {
    id: '1',
    text: 'Hi! I\'m interested in your products.',
    sender: 'customer',
    timestamp: '10:30 AM',
    status: 'delivered',
    type: 'text'
  },
  {
    id: '2',
    text: 'Hello! Thanks for reaching out. I\'d be happy to help you with our product range.',
    sender: 'agent',
    timestamp: '10:32 AM',
    status: 'read',
    type: 'text'
  },
  {
    id: '3',
    text: 'Can you show me your latest collection?',
    sender: 'customer',
    timestamp: '10:35 AM',
    status: 'delivered',
    type: 'text'
  },
  {
    id: '4',
    text: 'Absolutely! Let me send you our catalog.',
    sender: 'agent',
    timestamp: '10:36 AM',
    status: 'read',
    type: 'text'
  },
  {
    id: '5',
    text: 'catalog.pdf',
    sender: 'agent',
    timestamp: '10:37 AM',
    status: 'read',
    type: 'document'
  },
  {
    id: '6',
    text: 'Thanks for the quick response!',
    sender: 'customer',
    timestamp: '10:40 AM',
    status: 'delivered',
    type: 'text',
    reaction: '👍'
  }
];

export function ConversationsPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message sending logic here
      setMessageText('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.contact.phone.includes(searchTerm)
  );

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <h1>Conversations</h1>
        <p className="text-muted-foreground">Manage customer conversations and session messages</p>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Conversation List */}
        <div className="w-1/3 bg-white border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conversations</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ScrollArea className="flex-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                  selectedConversation.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conversation.contact.avatar} />
                    <AvatarFallback>{conversation.contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {conversation.contact.name}
                      </p>
                      <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.contact.phone}</p>
                    <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            conversation.status === 'active' ? 'default' : 
                            conversation.status === 'pending' ? 'secondary' : 'outline'
                          }
                          className="text-xs"
                        >
                          {conversation.status}
                        </Badge>
                        {conversation.sessionWindow && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            24h window
                          </Badge>
                        )}
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-green-600 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center p-0">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.contact.avatar} />
                <AvatarFallback>{selectedConversation.contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{selectedConversation.contact.name}</h3>
                <p className="text-sm text-gray-500">{selectedConversation.contact.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === 'agent'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900'
                    } shadow-sm`}
                  >
                    {message.type === 'document' ? (
                      <div className="flex items-center space-x-2">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm">{message.text}</span>
                      </div>
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs opacity-70">{message.timestamp}</span>
                      <div className="flex items-center space-x-1">
                        {message.reaction && (
                          <span className="text-sm">{message.reaction}</span>
                        )}
                        {message.sender === 'agent' && (
                          <CheckCheck 
                            className={`h-3 w-3 ${
                              message.status === 'read' ? 'text-blue-300' : 'text-gray-300'
                            }`} 
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="bg-white border-t p-4">
            <div className="flex items-end space-x-2">
              <Button variant="ghost" size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <Textarea
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="min-h-[40px] max-h-[120px] resize-none"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Smile className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {!selectedConversation.sessionWindow && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                <Clock className="h-4 w-4 inline mr-1" />
                24-hour session window expired. Use templates for outbound messages.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}