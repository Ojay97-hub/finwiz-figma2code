import React, { useState, useRef, useEffect } from 'react'
import TopTabs from './TopTabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreHorizontal,
  Clock,
  CheckCheck,
  User,
  Bot,
  Star,
  ThumbsUp,
  ThumbsDown,
  Search,
  Filter,
  Archive,
  Settings,
  HelpCircle,
  Zap,
  Shield,
  CreditCard,
  PiggyBank,
  TrendingUp
} from 'lucide-react'

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent' | 'bot'
  timestamp: Date
  status?: 'sent' | 'delivered' | 'read'
  type?: 'text' | 'image' | 'file'
  agentName?: string
  agentAvatar?: string
}

interface ChatSession {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
  status: 'active' | 'resolved' | 'waiting'
  unreadCount: number
  category: string
  priority: 'low' | 'medium' | 'high'
}

const ChatDashboard: React.FC = () => {
  const [activeChat, setActiveChat] = useState<string>('1')
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [agentTyping, setAgentTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock chat sessions
  const [chatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Account Balance Issue',
      lastMessage: 'Thanks for your help! The issue is now resolved.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'active',
      unreadCount: 0,
      category: 'Account',
      priority: 'high'
    },
    {
      id: '2', 
      title: 'Card Payment Problem',
      lastMessage: 'I need help with a declined transaction',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'waiting',
      unreadCount: 2,
      category: 'Cards',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Investment Query',
      lastMessage: 'What are the best investment options?',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'resolved',
      unreadCount: 0,
      category: 'Investments',
      priority: 'low'
    }
  ])

  // Mock messages for active chat
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m having trouble with my account balance. It\'s showing an incorrect amount.',
      sender: 'user',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'read'
    },
    {
      id: '2',
      content: 'Hi Owen! I\'m Sarah from FinWiz support. I\'d be happy to help you with your account balance issue. Let me check your account details.',
      sender: 'agent',
      timestamp: new Date(Date.now() - 28 * 60 * 1000),
      agentName: 'Sarah Johnson',
      agentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '3',
      content: 'I can see there was a pending transaction that has now been processed. Your current balance should be £2,847.50. Can you please refresh your app and confirm?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      agentName: 'Sarah Johnson',
      agentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '4',
      content: 'Perfect! Yes, I can see the correct balance now. Thank you so much for your quick help!',
      sender: 'user',
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      status: 'read'
    },
    {
      id: '5',
      content: 'You\'re very welcome! Is there anything else I can help you with today?',
      sender: 'agent',
      timestamp: new Date(Date.now() - 18 * 60 * 1000),
      agentName: 'Sarah Johnson',
      agentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '6',
      content: 'No, that\'s all for now. Thanks again!',
      sender: 'user',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'read'
    }
  ])

  // Quick action templates
  const quickActions = [
    { icon: CreditCard, label: 'Card Issues', category: 'cards' },
    { icon: PiggyBank, label: 'Account Balance', category: 'account' },
    { icon: TrendingUp, label: 'Investment Help', category: 'investment' },
    { icon: Shield, label: 'Security Concerns', category: 'security' },
  ]

  // FAQ items
  const faqItems = [
    { question: 'How do I reset my password?', category: 'Account' },
    { question: 'Why was my transaction declined?', category: 'Cards' },
    { question: 'How do I set up direct debit?', category: 'Payments' },
    { question: 'What are your investment fees?', category: 'Investments' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')
    setIsTyping(false)

    // Simulate agent response
    setTimeout(() => {
      setAgentTyping(true)
      setTimeout(() => {
        const agentResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Thank you for your message! I\'m looking into this for you right now. I\'ll have an update shortly.',
          sender: 'agent',
          timestamp: new Date(),
          agentName: 'Sarah Johnson',
          agentAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=40&h=40&fit=crop&crop=face'
        }
        setMessages(prev => [...prev, agentResponse])
        setAgentTyping(false)
      }, 2000)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'waiting': return 'bg-yellow-100 text-yellow-700'
      case 'resolved': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopTabs active="chat" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Chat Header */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Support Chat</CardTitle>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>Get help from our support team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Help</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button key={index} variant="outline" size="sm" className="gap-2 h-auto p-3 justify-start">
                        <action.icon className="w-4 h-4" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chat Sessions */}
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Recent Conversations</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 p-0">
                {chatSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setActiveChat(session.id)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors border-l-2 ${
                      activeChat === session.id ? 'border-purple-600 bg-purple-50' : 'border-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{session.title}</div>
                        <div className="text-xs text-gray-500 truncate mt-1">{session.lastMessage}</div>
                      </div>
                      {session.unreadCount > 0 && (
                        <Badge className="bg-purple-600 text-white text-xs ml-2">{session.unreadCount}</Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={`text-xs ${getStatusColor(session.status)}`}>
                          {session.status}
                        </Badge>
                        <Badge variant="secondary" className={`text-xs ${getPriorityColor(session.priority)}`}>
                          {session.priority}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(session.timestamp)}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="text-sm text-green-600 flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Online • Support Agent
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                      {message.sender !== 'user' && (
                        <img
                          src={message.agentAvatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=40&h=40&fit=crop&crop=face'}
                          alt="Agent"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="text-sm">{message.content}</div>
                        <div className={`text-xs mt-1 flex items-center gap-1 ${
                          message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {formatTime(message.timestamp)}
                          {message.sender === 'user' && message.status === 'read' && (
                            <CheckCheck className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {agentTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b120?w=40&h=40&fit=crop&crop=face"
                        alt="Agent"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                    <Button onClick={handleSendMessage} size="sm" className="gap-2">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Sidebar - Help & FAQ */}
          <div className="lg:col-span-1 space-y-4">
            {/* Help Center */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Zap className="w-4 h-4" />
                  Quick Solutions
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Archive className="w-4 h-4" />
                  Knowledge Base
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Phone className="w-4 h-4" />
                  Call Support
                </Button>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Frequently Asked</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {faqItems.map((faq, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 text-sm hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-900">{faq.question}</div>
                    <div className="text-xs text-gray-500 mt-1">{faq.category}</div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Rate this conversation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-yellow-400 hover:text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    Not Helpful
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatDashboard
