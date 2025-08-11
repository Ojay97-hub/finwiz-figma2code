import React from 'react'
import TopTabs from './TopTabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { CreditCard, PiggyBank, Shield, Rocket, Settings, Plus, Bell, ChevronRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chests = [
  { name: 'Current Magic', balance: 2300, status: 'Active', accent: 'bg-purple-600' },
  { name: 'Dream Vault', balance: 11000, status: 'Active', accent: 'bg-teal-500' },
  { name: 'Credit Sorcery', balance: 1070, status: 'Active', accent: 'bg-pink-500' },
]

const achievements = [
  { label: '5 Goals Completed', ok: true },
  { label: '3 Month Saving Streak', ok: true },
]

const upcoming = [
  { name: 'Netflix', when: 'today', amount: 15 },
  { name: 'Spotify', when: 'tomorrow', amount: 10 },
  { name: 'Water bill', when: '3 days', amount: 70 },
]

const tracker = Array.from({ length: 9 }).map((_, i) => ({
  month: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
  income: [9.5, 10.2, 10.8, 10.6, 11.2, 10.9, 11.4, 11.0, 11.76][i] * 1000,
}))

const avatar = (name: string, color: string) => (
  <div className={`w-8 h-8 rounded-full grid place-items-center text-white text-xs ${color}`}>{name}</div>
)

const AccountsOverview: React.FC = () => {
  const totalWealth = 12230

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopTabs active="accounts" />

        {/* Title + AI insight */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-4xl">Good Morning, Owen!</CardTitle>
              <CardDescription>Total Wealth Gold</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-sm text-gray-500">Total Wealth</div>
                  <div className="font-display text-5xl font-extrabold">£{totalWealth.toLocaleString(undefined,{minimumFractionDigits:2})}</div>
                  <Badge variant="success" className="mt-2">+£247.00 this week</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="gap-2"><Settings className="w-4 h-4" /> Manage</Button>
                  <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Chest</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FinWiz AI Insights</CardTitle>
              <CardDescription>Automate your success ✨</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p>You’re on track to save £340 more than last month. Coffee spending is down 23%. Keep your momentum and you’ll hit your £15k goal 2 months early!</p>
              <div className="flex gap-2">
                <Button size="sm">Learn More</Button>
                <Button variant="secondary" size="sm">Set Goals</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chests + Quick actions + Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-4">
            {chests.map((c) => (
              <Card key={c.name}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${c.accent}`} />
                    <div>
                      <div className="text-sm text-gray-500">{c.name}</div>
                      <div className="text-2xl font-bold">£{c.balance.toLocaleString(undefined,{minimumFractionDigits:2})}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{c.status}</Badge>
                    <Button variant="outline" size="sm" className="gap-1">View <ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                <Button variant="secondary" className="gap-2"><CreditCard className="w-4 h-4" /> Pay</Button>
                <Button variant="secondary" className="gap-2"><PiggyBank className="w-4 h-4" /> Save</Button>
                <Button className="gap-2"><Rocket className="w-4 h-4" /> Set Goals</Button>
                <Button variant="outline" className="gap-2"><Bell className="w-4 h-4" /> Add Alerts</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {achievements.map((a) => (
                  <div key={a.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{a.label}</span>
                    <Badge variant="success">✓</Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">View Progress</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent money casts & upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Money Casts</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-4 flex-wrap">
              {[
                avatar('CL', 'bg-purple-600'),
                avatar('JF', 'bg-teal-600'),
                avatar('MO', 'bg-pink-600'),
                avatar('LS', 'bg-blue-600'),
              ]}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Summons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcoming.map((u) => (
                <div key={u.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>{u.name}</span>
                  </div>
                  <div className="text-gray-500">{u.when}</div>
                  <div className="font-semibold">£{u.amount}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Treasure tracker */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle>Treasure Tracker</CardTitle>
            <CardDescription>Income trend (Apr 2025 → Dec 2025)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={tracker}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v: number) => [`£${v.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="income" stroke="#9333ea" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AccountsOverview
