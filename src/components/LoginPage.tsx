import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MessageCircle, Shield, Zap, Users } from 'lucide-react';

export function LoginPage({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({
    organizationName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login - in real app, this would validate credentials
    onLogin({
      id: '1',
      email: loginForm.email,
      organizationName: 'Demo Organization',
      role: 'admin'
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Mock signup - in real app, this would create account
    onLogin({
      id: '1',
      email: signupForm.email,
      organizationName: signupForm.organizationName,
      role: 'admin'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-blue-600 p-12 text-white flex-col justify-between">
        <div>
          <div className="flex items-center mb-8">
            <MessageCircle className="h-12 w-12 mr-4" />
            <h1 className="text-3xl font-bold">WhatsApp Business Platform</h1>
          </div>
          <p className="text-xl mb-12 opacity-90">
            Scale your business communication with official WhatsApp Cloud API
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 mr-4 mt-1 opacity-80" />
              <div>
                <h3 className="font-semibold mb-1">Secure & Reliable</h3>
                <p className="opacity-80">Enterprise-grade security with 99.9% uptime guarantee</p>
              </div>
            </div>
            <div className="flex items-start">
              <Zap className="h-6 w-6 mr-4 mt-1 opacity-80" />
              <div>
                <h3 className="font-semibold mb-1">Lightning Fast</h3>
                <p className="opacity-80">Send messages instantly with our optimized infrastructure</p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-6 w-6 mr-4 mt-1 opacity-80" />
              <div>
                <h3 className="font-semibold mb-1">Multi-Tenant</h3>
                <p className="opacity-80">Manage multiple organizations from a single platform</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm opacity-70">
          © 2024 WhatsApp Business Platform. All rights reserved.
        </div>
      </div>

      {/* Right side - Login/Signup */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">WhatsApp Business Platform</h1>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Sign in to your organization's WhatsApp platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@company.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Organization</CardTitle>
                  <CardDescription>
                    Set up your organization's WhatsApp business account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name</Label>
                      <Input
                        id="orgName"
                        placeholder="Your Company Name"
                        value={signupForm.organizationName}
                        onChange={(e) => setSignupForm({...signupForm, organizationName: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="admin@company.com"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={signupForm.confirmPassword}
                        onChange={(e) => setSignupForm({...signupForm, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Create Organization
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}