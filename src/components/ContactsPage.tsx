import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  Upload, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin,
  MoreHorizontal,
  Edit,
  Trash2,
  FileDown
} from 'lucide-react';

export function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    tags: []
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock contacts data
  const contacts = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      email: 'john.doe@email.com',
      tags: ['Customer', 'VIP'],
      status: 'Active',
      lastMessage: '2024-06-15'
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1234567891',
      email: 'jane.smith@email.com',
      tags: ['Prospect'],
      status: 'Active',
      lastMessage: '2024-06-14'
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      phone: '+1234567892',
      email: 'bob.johnson@email.com',
      tags: ['Customer'],
      status: 'Inactive',
      lastMessage: '2024-06-10'
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Williams',
      phone: '+1234567893',
      email: 'alice.williams@email.com',
      tags: ['Lead', 'High Priority'],
      status: 'Active',
      lastMessage: '2024-06-13'
    }
  ];

  const filteredContacts = contacts.filter(contact => 
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContact = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    console.log('Adding contact:', newContact);
    setNewContact({ firstName: '', lastName: '', phone: '', email: '', tags: [] });
    setIsAddDialogOpen(false);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, this would process CSV/Excel file
      console.log('Uploading file:', file.name);
    }
  };

  const getStatusBadge = (status) => {
    return (
      <Badge variant={status === 'Active' ? 'default' : 'secondary'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600">Manage your WhatsApp contacts and customer database</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button type="button">
                <Plus className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Contact</DialogTitle>
                <DialogDescription>
                  Enter the contact details to add them to your database.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddContact} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={newContact.firstName}
                      onChange={(e) => setNewContact({...newContact, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newContact.lastName}
                      onChange={(e) => setNewContact({...newContact, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+1234567890"
                    value={newContact.phone}
                    onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Contact</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-gray-900">
              {contacts.length.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-green-600">
              {contacts.filter(c => c.status === 'Active').length}
            </div>
            <p className="text-sm text-gray-600">Active Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-blue-600">
              {contacts.filter(c => c.tags.includes('Customer')).length}
            </div>
            <p className="text-sm text-gray-600">Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold text-purple-600">
              {contacts.filter(c => c.tags.includes('Lead') || c.tags.includes('Prospect')).length}
            </div>
            <p className="text-sm text-gray-600">Leads</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Management</CardTitle>
          <CardDescription>View and manage your contact database</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">Contact List</TabsTrigger>
              <TabsTrigger value="import">Import Contacts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Contacts</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tags</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Contacts Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Message</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <div className="font-medium">
                            {contact.firstName} {contact.lastName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            {contact.phone}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            {contact.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(contact.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(contact.lastMessage).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="import">
              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Import Contacts</h3>
                  <p className="text-gray-600 mb-4">
                    Upload a CSV or Excel file to import multiple contacts at once
                  </p>
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload">
                    <Button asChild>
                      <span className="cursor-pointer">
                        Choose File
                      </span>
                    </Button>
                  </Label>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">File Format Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Required columns: first_name, last_name, phone</li>
                    <li>• Optional columns: email, tags (comma-separated)</li>
                    <li>• Phone numbers should include country code (e.g., +1234567890)</li>
                    <li>• Maximum 10,000 contacts per upload</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}