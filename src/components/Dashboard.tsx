import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardHome } from './DashboardHome';
import { ContactsPage } from './ContactsPage';
import { CampaignsPage } from './CampaignsPage';
import { TemplatesPage } from './TemplatesPage';
import { AnalyticsPage } from './AnalyticsPage';
import { SettingsPage } from './SettingsPage';
import { ConversationsPage } from './ConversationsPage';
import { MediaLibraryPage } from './MediaLibraryPage';
import { FlowsPage } from './FlowsPage';
import { WebhooksPage } from './WebhooksPage';
import { ChatbotsPage } from './ChatbotsPage';
import { BroadcastsPage } from './BroadcastsPage';
import { BusinessProfilePage } from './BusinessProfilePage';
import { CatalogPage } from './CatalogPage';
import { PhoneNumbersPage } from './PhoneNumbersPage';
import { CallButtonsPage } from './CallButtonsPage';
import { CallingAPIPage } from './CallingAPIPage';
import { APIManagementPage } from './APIManagementPage';
import { WebhookDebuggerPage } from './WebhookDebuggerPage';
import { SandboxPage } from './SandboxPage';
import { DocumentationPage } from './DocumentationPage';
import { CRMERPPage } from './CRMERPPage';
import { PaymentsPage } from './PaymentsPage';
import { MetaBusinessPage } from './MetaBusinessPage';

export function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome user={user} />;
      case 'contacts':
        return <ContactsPage />;
      case 'campaigns':
        return <CampaignsPage />;
      case 'templates':
        return <TemplatesPage />;
      case 'conversations':
        return <ConversationsPage />;
      case 'media':
        return <MediaLibraryPage />;
      case 'flows':
        return <FlowsPage />;
      case 'webhooks':
        return <WebhooksPage />;
      case 'chatbots':
        return <ChatbotsPage />;
      case 'broadcasts':
        return <BroadcastsPage />;
      case 'profile':
        return <BusinessProfilePage />;
      case 'catalog':
        return <CatalogPage />;
      case 'phone-numbers':
        return <PhoneNumbersPage />;
      case 'call-buttons':
        return <CallButtonsPage />;
      case 'calling-api':
        return <CallingAPIPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'api-management':
        return <APIManagementPage />;
      case 'webhook-debugger':
        return <WebhookDebuggerPage />;
      case 'sandbox':
        return <SandboxPage />;
      case 'documentation':
        return <DocumentationPage />;
      case 'crm-erp':
        return <CRMERPPage />;
      case 'payments':
        return <PaymentsPage />;
      case 'meta-business':
        return <MetaBusinessPage />;
      case 'settings':
        return <SettingsPage user={user} />;
      default:
        return <DashboardHome user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        user={user} 
        onLogout={onLogout} 
      />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}