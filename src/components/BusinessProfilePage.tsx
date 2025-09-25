import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  Upload, 
  Save, 
  Edit, 
  Check,
  Clock,
  MapPin,
  Globe,
  Mail,
  Phone,
  Store,
  Shield,
  AlertCircle,
  CheckCircle,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Mock business profile data
const businessProfile = {
  name: 'TechStore Solutions',
  description: 'Your trusted partner for technology solutions and support. We provide high-quality products and exceptional customer service.',
  category: 'Technology',
  subcategory: 'Electronics Retail',
  logo: '',
  coverPhoto: '',
  address: {
    street: '123 Technology Drive',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'United States'
  },
  contact: {
    email: 'support@techstore.com',
    phone: '+1-555-0123',
    website: 'https://www.techstore.com'
  },
  businessHours: {
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '10:00', close: '16:00', closed: false },
    sunday: { open: '', close: '', closed: true }
  },
  verification: {
    status: 'verified',
    submittedAt: '2024-01-10',
    approvedAt: '2024-01-12',
    badge: true
  },
  stats: {
    rating: 4.8,
    totalReviews: 1250,
    totalCustomers: 15000,
    joinedDate: '2023-06-15'
  }
};

const businessCategories = [
  'Automotive',
  'Beauty & Personal Care',
  'Business Services',
  'Education',
  'Entertainment',
  'Finance',
  'Food & Beverage',
  'Government',
  'Healthcare',
  'Non-profit',
  'Real Estate',
  'Retail',
  'Technology',
  'Travel & Hospitality'
];

const daysOfWeek = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
];

export function BusinessProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(businessProfile);

  const handleSave = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setProfile(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="p-6 bg-white border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1>Business Profile</h1>
            <p className="text-muted-foreground">Manage your business information and verification status</p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="hours">Business Hours</TabsTrigger>
            <TabsTrigger value="analytics">Profile Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="business-name">Business Name *</Label>
                      <Input
                        id="business-name"
                        value={profile.name}
                        onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={profile.description}
                        onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                        disabled={!isEditing}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={profile.category} onValueChange={(value) => setProfile(prev => ({ ...prev, category: value }))} disabled={!isEditing}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {businessCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Input
                          id="subcategory"
                          value={profile.subcategory}
                          onChange={(e) => setProfile(prev => ({ ...prev, subcategory: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.contact.email}
                        onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profile.contact.phone}
                        onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profile.contact.website}
                        onChange={(e) => handleInputChange('contact', 'website', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={profile.address.street}
                        onChange={(e) => handleInputChange('address', 'street', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={profile.address.city}
                          onChange={(e) => handleInputChange('address', 'city', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={profile.address.state}
                          onChange={(e) => handleInputChange('address', 'state', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                        <Input
                          id="zipCode"
                          value={profile.address.zipCode}
                          onChange={(e) => handleInputChange('address', 'zipCode', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={profile.address.country}
                          onChange={(e) => handleInputChange('address', 'country', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Preview */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={profile.logo} />
                        <AvatarFallback className="text-xl">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Logo
                        </Button>
                      )}
                    </div>

                    <div className="text-center border-t pt-4">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <h3 className="font-semibold">{profile.name}</h3>
                        {profile.verification.badge && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{profile.description}</p>
                      <Badge variant="outline">{profile.category}</Badge>
                    </div>

                    <div className="space-y-2 text-sm border-t pt-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{profile.address.city}, {profile.address.state}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{profile.contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profile.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span>{profile.contact.website}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm">Rating</span>
                      </div>
                      <span className="font-semibold">{profile.stats.rating}/5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Customers</span>
                      </div>
                      <span className="font-semibold">{profile.stats.totalCustomers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Joined</span>
                      </div>
                      <span className="font-semibold">{profile.stats.joinedDate}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="verification">
            <Card>
              <CardHeader>
                <CardTitle>Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  {profile.verification.status === 'verified' ? (
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  ) : (
                    <Clock className="h-12 w-12 text-yellow-600" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {profile.verification.status === 'verified' ? 'Verified Business' : 'Verification Pending'}
                    </h3>
                    <p className="text-gray-600">
                      {profile.verification.status === 'verified' 
                        ? 'Your business has been verified and approved for WhatsApp Business API'
                        : 'Your verification request is being reviewed'
                      }
                    </p>
                  </div>
                </div>

                {profile.verification.status === 'verified' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Verification Benefits</span>
                    </div>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Green verified badge on your business profile</li>
                      <li>• Higher message sending limits</li>
                      <li>• Access to advanced WhatsApp Business features</li>
                      <li>• Increased customer trust and credibility</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours">
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {daysOfWeek.map((day) => {
                    const hours = profile.businessHours[day.key];
                    return (
                      <div key={day.key} className="flex items-center space-x-4">
                        <div className="w-24">
                          <span className="font-medium">{day.label}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={!hours.closed}
                            onCheckedChange={(checked) => 
                              handleBusinessHoursChange(day.key, 'closed', !checked)
                            }
                            disabled={!isEditing}
                          />
                          {!hours.closed ? (
                            <>
                              <Input
                                type="time"
                                value={hours.open}
                                onChange={(e) => handleBusinessHoursChange(day.key, 'open', e.target.value)}
                                disabled={!isEditing}
                                className="w-32"
                              />
                              <span>to</span>
                              <Input
                                type="time"
                                value={hours.close}
                                onChange={(e) => handleBusinessHoursChange(day.key, 'close', e.target.value)}
                                disabled={!isEditing}
                                className="w-32"
                              />
                            </>
                          ) : (
                            <span className="text-gray-500">Closed</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Profile Views</p>
                      <p className="text-2xl font-bold">2,543</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Click to Website</p>
                      <p className="text-2xl font-bold">1,876</p>
                    </div>
                    <Globe className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Contact Clicks</p>
                      <p className="text-2xl font-bold">987</p>
                    </div>
                    <Phone className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}