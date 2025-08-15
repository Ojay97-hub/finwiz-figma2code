import React, { useState } from 'react'
import TopTabs from './TopTabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  MessageCircle, 
  Trash2, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Lock, 
  Eye, 
  EyeOff,
  ChevronRight,
  Download,
  HelpCircle,
  LogOut,
  Smartphone,
  Globe,
  DollarSign
} from 'lucide-react'

const AccountDashboard: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  // Mock user data
  const userData = {
    name: 'Owen Cotter',
    email: 'owen.cotter@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    memberSince: 'January 2023',
    accountType: 'Premium',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }

  const notifications = [
    { id: 1, title: 'Account Login', message: 'New login from Chrome on Mac', time: '2 hours ago', read: false },
    { id: 2, title: 'Payment Processed', message: 'Your Netflix payment was successful', time: '1 day ago', read: true },
    { id: 3, title: 'Security Alert', message: 'Password changed successfully', time: '3 days ago', read: true },
  ]

  const connectedDevices = [
    { id: 1, name: 'MacBook Pro', location: 'New York, NY', lastActive: '2 minutes ago', current: true },
    { id: 2, name: 'iPhone 14', location: 'New York, NY', lastActive: '1 hour ago', current: false },
    { id: 3, name: 'Chrome Browser', location: 'New York, NY', lastActive: '2 days ago', current: false },
  ]

  const renderProfileSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Update your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={userData.avatar} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover border-4 border-purple-100"
              />
              <button className="absolute -bottom-1 -right-1 bg-purple-600 text-white p-1.5 rounded-full hover:bg-purple-700 transition-colors">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{userData.name}</h3>
              <p className="text-gray-500 text-sm">{userData.accountType} Member</p>
              <Badge variant="secondary" className="mt-1">Member since {userData.memberSince}</Badge>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <Input defaultValue={userData.name} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input defaultValue={userData.email} type="email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <Input defaultValue={userData.phone} type="tel" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Account Type</label>
              <Input defaultValue={userData.accountType} disabled />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <Input defaultValue={userData.address} />
          </div>

          <div className="flex gap-3">
            <Button className="gap-2">
              <Edit3 className="w-4 h-4" />
              Save Changes
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage your account security and privacy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password Change */}
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium">Change Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Current Password</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Enter current password" />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <Input type="password" placeholder="Enter new password" />
              </div>
            </div>
            <Button size="sm" className="gap-2">
              <Lock className="w-4 h-4" />
              Update Password
            </Button>
          </div>

          {/* Two-Factor Authentication */}
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <Badge variant="secondary">Disabled</Badge>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Smartphone className="w-4 h-4" />
              Enable 2FA
            </Button>
          </div>

          {/* Connected Devices */}
          <div className="space-y-4">
            <h4 className="font-medium">Connected Devices</h4>
            <div className="space-y-3">
              {connectedDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${device.current ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Smartphone className={`w-4 h-4 ${device.current ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {device.name} 
                        {device.current && <Badge variant="success" className="ml-2 text-xs">Current</Badge>}
                      </div>
                      <div className="text-xs text-gray-500">{device.location} • {device.lastActive}</div>
                    </div>
                  </div>
                  {!device.current && (
                    <Button variant="outline" size="sm">Remove</Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Notification Preferences */}
          <div className="space-y-4">
            {[
              { title: 'Account Activity', desc: 'Logins, password changes, and security alerts', enabled: true },
              { title: 'Transaction Alerts', desc: 'Payment confirmations and transaction updates', enabled: true },
              { title: 'Marketing Updates', desc: 'Product updates and promotional offers', enabled: false },
              { title: 'Weekly Reports', desc: 'Account summaries and spending insights', enabled: true },
            ].map((pref, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium">{pref.title}</div>
                  <div className="text-sm text-gray-500">{pref.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    defaultChecked={pref.enabled}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>Your latest account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-3 border rounded-lg ${!notif.read ? 'bg-purple-50 border-purple-200' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{notif.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{notif.message}</div>
                    <div className="text-xs text-gray-400 mt-2">{notif.time}</div>
                  </div>
                  {!notif.read && <div className="w-2 h-2 bg-purple-600 rounded-full mt-1"></div>}
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">View All Notifications</Button>
        </CardContent>
      </Card>
    </div>
  )

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            App Preferences
          </CardTitle>
          <CardDescription>Customize your FinWiz experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme & Display */}
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium">Theme & Display</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Theme</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Light Mode</option>
                  <option>Dark Mode</option>
                  <option>Auto</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Currency</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>GBP (£)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium">Privacy Settings</h4>
            <div className="space-y-3">
              {[
                { title: 'Share usage analytics', desc: 'Help improve FinWiz by sharing anonymous usage data' },
                { title: 'Personalized recommendations', desc: 'Receive tailored financial advice based on your activity' },
                { title: 'Third-party integrations', desc: 'Allow connections with external financial services' },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{setting.title}</div>
                    <div className="text-xs text-gray-500">{setting.desc}</div>
                  </div>
                  <input 
                    type="checkbox" 
                    defaultChecked={index !== 2}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderSupportSection = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Help & Support
          </CardTitle>
          <CardDescription>Get help and manage your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
              <MessageCircle className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Contact Support</div>
                <div className="text-xs text-gray-500">Get help from our team</div>
              </div>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
              <Globe className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Help Center</div>
                <div className="text-xs text-gray-500">Browse FAQs and guides</div>
              </div>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
              <Download className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Export Data</div>
                <div className="text-xs text-gray-500">Download your information</div>
              </div>
            </Button>
            <Button variant="outline" className="gap-2 h-auto p-4 justify-start">
              <DollarSign className="w-5 h-5" />
              <div className="text-left">
                <div className="font-medium">Billing</div>
                <div className="text-xs text-gray-500">Manage subscription</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-red-900">Delete Account</div>
                <div className="text-sm text-red-700">Permanently delete your account and all data</div>
              </div>
              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const sections = [
    { id: 'profile', label: 'Profile', icon: User, component: renderProfileSection },
    { id: 'security', label: 'Security', icon: Shield, component: renderSecuritySection },
    { id: 'notifications', label: 'Notifications', icon: Bell, component: renderNotificationsSection },
    { id: 'preferences', label: 'Preferences', icon: Settings, component: renderPreferencesSection },
    { id: 'support', label: 'Support', icon: HelpCircle, component: renderSupportSection },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopTabs active="account" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        activeSection === section.id ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-600' : 'text-gray-700'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      {section.label}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {sections.find(s => s.id === activeSection)?.component()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountDashboard
