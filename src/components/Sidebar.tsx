import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Send, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut,
  MessageCircle,
  MessagesSquare,
  Zap,
  Store,
  Phone,
  Smartphone,
  Code,
  Puzzle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { 
    id: 'messaging', 
    label: 'Messaging', 
    icon: MessagesSquare,
    children: [
      { id: 'campaigns', label: 'Campaigns', icon: Send },
      { id: 'templates', label: 'Templates', icon: FileText },
      { id: 'conversations', label: 'Conversations', icon: MessageCircle },
      { id: 'media', label: 'Media Library', icon: FileText },
    ]
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: Zap,
    children: [
      { id: 'flows', label: 'Flows', icon: Zap },
      { id: 'webhooks', label: 'Webhooks', icon: Code },
      { id: 'chatbots', label: 'Chatbots', icon: MessageCircle },
      { id: 'broadcasts', label: 'Broadcasts', icon: Send },
    ]
  },
  {
    id: 'business',
    label: 'Business',
    icon: Store,
    children: [
      { id: 'profile', label: 'Business Profile', icon: Store },
      { id: 'catalog', label: 'Product Catalog', icon: FileText },
      { id: 'phone-numbers', label: 'Phone Numbers', icon: Smartphone },
    ]
  },
  {
    id: 'voice',
    label: 'Voice & Calling',
    icon: Phone,
    children: [
      { id: 'call-buttons', label: 'Call Buttons', icon: Phone },
      { id: 'calling-api', label: 'Calling API', icon: Phone },
    ]
  },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  {
    id: 'developer',
    label: 'Developer Tools',
    icon: Code,
    children: [
      { id: 'api-management', label: 'API Management', icon: Code },
      { id: 'webhook-debugger', label: 'Webhook Debugger', icon: Code },
      { id: 'sandbox', label: 'Sandbox', icon: Code },
      { id: 'documentation', label: 'Documentation', icon: FileText },
    ]
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: Puzzle,
    children: [
      { id: 'crm-erp', label: 'CRM / ERP', icon: Puzzle },
      { id: 'payments', label: 'Payment Links', icon: Puzzle },
      { id: 'meta-business', label: 'Meta Business', icon: Puzzle },
    ]
  },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, setActiveTab, user, onLogout }) {
  const [openSections, setOpenSections] = useState(['messaging', 'automation']);
  
  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const toggleSection = (sectionId) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const renderMenuItem = (item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id || (item.children && item.children.some(child => child.id === activeTab));
    const isOpen = openSections.includes(item.id);

    if (item.children) {
      return (
        <Collapsible key={item.id} open={isOpen} onOpenChange={() => toggleSection(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
              {isOpen ? (
                <ChevronDown className="h-4 w-4 ml-auto" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-auto" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => {
              const ChildIcon = child.icon;
              return (
                <Button
                  key={child.id}
                  variant={activeTab === child.id ? "default" : "ghost"}
                  className="w-full justify-start text-sm"
                  onClick={() => setActiveTab(child.id)}
                >
                  <ChildIcon className="h-3 w-3 mr-3" />
                  {child.label}
                </Button>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Button
        key={item.id}
        variant={activeTab === item.id ? "default" : "ghost"}
        className="w-full justify-start"
        onClick={() => setActiveTab(item.id)}
      >
        <Icon className="h-4 w-4 mr-3" />
        {item.label}
      </Button>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center mb-4">
          <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-xl font-bold text-gray-900">WhatsApp Platform</h1>
        </div>
        <div className="text-sm text-gray-600">{user.organizationName}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => renderMenuItem(item))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback>{getInitials(user.organizationName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-medium text-gray-900">
              {user.email}
            </div>
            <div className="text-xs text-gray-500 capitalize">{user.role}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}