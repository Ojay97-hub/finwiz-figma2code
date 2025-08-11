import React from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { CreditCard, TrendingUp, TrendingDown, Filter, Settings, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'
import TopTabs from './TopTabs'

// Data
const mockData = {
  currentMonth: {
    spend: 2847,
    budget: 3500,
    lastMonth: 3120,
    percentageUsed: 81,
    difference: -9,
  },
  categories: [
    { name: 'Groceries', amount: 342, change: -12, color: 'bg-purple-600' },
    { name: 'Bills', amount: 750, change: -2, color: 'bg-gray-500' },
    { name: 'Eating Out', amount: 100, change: 45, color: 'bg-gray-500' },
    { name: 'Transport', amount: 156, change: 8, color: 'bg-green-500' },
    { name: 'Shopping', amount: 234, change: 23, color: 'bg-gray-500' },
    { name: 'Pet Care', amount: 70, change: 23, color: 'bg-gray-500' },
    { name: 'Subscriptions', amount: 60, change: 23, color: 'bg-gray-500' },
  ],
  previousMonths: [
    { month: 'Sep', spend: 1120, budget: 2100, percentage: 53 },
    { month: 'Oct', spend: 1480, budget: 2100, percentage: 70 },
    { month: 'Nov', spend: 1310, budget: 2100, percentage: 62 },
    { month: 'Dec', spend: 1120, budget: 2100, percentage: 53 },
  ],
  topExpenses: [
    { month: 'Jan', Travel: 0.9, Rent: 1.8, Food: 0.25 },
    { month: 'Feb', Travel: 1.2, Rent: 1.8, Food: 0.45 },
    { month: 'Mar', Travel: 0.9, Rent: 1.8, Food: 0.65 },
    { month: 'Apr', Travel: 1.0, Rent: 1.8, Food: 0.55 },
    { month: 'May', Travel: 1.4, Rent: 1.8, Food: 0.75 },
    { month: 'Jun', Travel: 0.7, Rent: 1.8, Food: 0.5 },
  ],
  categoryBreakdown: [
    { name: 'Groceries', value: 342 },
    { name: 'Entertainment', value: 100 },
    { name: 'Utilities', value: 750 },
    { name: 'Charity', value: 50 },
    { name: 'Friends & Family', value: 200 },
    { name: 'Fees', value: 25 },
  ],
  savingsVsIncome: [
    { month: 'Jan', Savings: 1200, Income: 4500, Expenses: 2000 },
    { month: 'Feb', Savings: 1200, Income: 4500, Expenses: 2300 },
    { month: 'Mar', Savings: 1100, Income: 4500, Expenses: 2200 },
  ],
  annualTrend: [
    { month: 'Jan', expenses: 2.0 },
    { month: 'Feb', expenses: 2.6 },
    { month: 'Mar', expenses: 2.2 },
    { month: 'Apr', expenses: 2.8 },
    { month: 'May', expenses: 2.4 },
    { month: 'Jun', expenses: 2.0 },
    { month: 'Jul', expenses: 2.6 },
    { month: 'Aug', expenses: 2.2 },
    { month: 'Sep', expenses: 2.0 },
    { month: 'Oct', expenses: 2.4 },
    { month: 'Nov', expenses: 2.9 },
    { month: 'Dec', expenses: 3.0 },
  ],
  weeklyTrend: [
    { week: 'W1', spend: 620 },
    { week: 'W2', spend: 540 },
    { week: 'W3', spend: 700 },
    { week: 'W4', spend: 660 },
    { week: 'W5', spend: 610 },
    { week: 'W6', spend: 720 },
    { week: 'W7', spend: 690 },
    { week: 'W8', spend: 640 },
    { week: 'W9', spend: 730 },
    { week: 'W10', spend: 710 },
    { week: 'W11', spend: 760 },
    { week: 'W12', spend: 690 },
  ],
  forecast: [
    { month: 'Apr', Expenses: 2847, Forecast: 2847 },
    { month: 'May', Expenses: 3100, Forecast: 3000 },
    { month: 'Jun', Expenses: 2950, Forecast: 2950 },
    { month: 'Jul', Expenses: 3200, Forecast: 3050 },
    { month: 'Aug', Expenses: 3050, Forecast: 3000 },
    { month: 'Sep', Expenses: 3150, Forecast: 3100 },
    { month: 'Oct', Expenses: 3000, Forecast: 2950 },
    { month: 'Nov', Expenses: 3250, Forecast: 3150 },
    { month: 'Dec', Expenses: 3100, Forecast: 3050 },
    { month: 'Jan', Expenses: 0, Forecast: 2900 },
    { month: 'Feb', Expenses: 0, Forecast: 2850 },
    { month: 'Mar', Expenses: 0, Forecast: 2800 },
  ],
  heatmapMonths: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  heatmapCategories: [
    { name: 'Groceries', values: [60, 55, 70, 65, 58, 62] },
    { name: 'Bills', values: [90, 88, 92, 91, 89, 93] },
    { name: 'Eating Out', values: [35, 50, 48, 52, 46, 40] },
    { name: 'Transport', values: [40, 42, 39, 37, 45, 43] },
    { name: 'Shopping', values: [55, 63, 58, 60, 57, 61] },
  ],
}

const COLORS = ['#9333ea', '#eab308', '#14b8a6', '#f97316', '#ec4899', '#3b82f6']

const BankingDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopTabs active="insights" />

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
          <div className="lg:col-span-2">
            <div className="space-y-2">
              <div className="text-6xl font-extrabold font-display leading-tight">
                <span className="text-gray-900">Fin</span>
                <span className="text-gray-900">Wiz</span>
              </div>
              <div className="text-6xl font-extrabold text-yellow-500 font-display">Insights</div>
            </div>
          </div>
          <Card className="self-center">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 grid place-items-center">
                  <Info className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-600">
                  At <span className="font-semibold text-purple-600">FinWiz</span> we make your finances simple. Our AI automatically categorises spending, tracks goals, and gives you clear insights so you can focus on what matters most.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partners */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['PayPal', 'Amex', 'Wise', 'ClearScore', 'BlackRock'].map((p) => (
            <Badge key={p} variant="secondary" className="rounded-full px-4 py-2 text-gray-700 bg-gray-100 border-gray-200">
              {p}
            </Badge>
          ))}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 bg-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <CreditCard className="w-5 h-5" /> Your All Cards Overview
              </CardTitle>
              <CardDescription className="text-purple-100">Monthly spend budget</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-100">12% better than last month at this time!</span>
                <span className="font-semibold">£{mockData.currentMonth.spend.toLocaleString()} / £{mockData.currentMonth.budget.toLocaleString()}</span>
              </div>
              <div className="w-full bg-purple-500/40 rounded-full h-3">
                <div className="bg-green-400 h-3 rounded-full" style={{ width: `${mockData.currentMonth.percentageUsed}%` }} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <Badge variant="secondary" className="bg-white text-gray-900">Dashboard</Badge>
                <span className="text-white">{mockData.currentMonth.percentageUsed}% Used</span>
                <Badge variant="secondary" className="bg-white text-gray-900">Increase Budget</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#F25F5C] text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-sm">24 January 2026</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center">
                <div className="text-5xl font-extrabold font-display">£840</div>
                <div className="text-3xl font-extrabold font-display">/ £2100</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Previous months */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Outfit']">Previous Monthly Spend Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockData.previousMonths.map((m) => (
              <Card key={m.month}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">{m.month}</Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">£{m.spend.toLocaleString()} vs £{m.budget.toLocaleString()}</Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="h-2 rounded-full bg-green-500" style={{ width: `${m.percentage}%` }} />
                  </div>
                  <p className="text-xs text-gray-500">{m.percentage}% of monthly budget spent</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Outfit']">Monthly Potion Brewing</h2>
          <p className="text-gray-600 mb-6 font-['Outfit']">Your spending breakdown by category</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockData.categories.map((cat, i) => (
              <Card key={i} className="hover:scale-105 transition-transform duration-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 ${cat.color} rounded-lg`} />
                    <div className={`flex items-center gap-1 text-sm ${cat.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {cat.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{Math.abs(cat.change)}% vs last month</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-2xl font-bold text-purple-600">£{cat.amount.toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-['Outfit']">Crystal Ball Insights</h2>
            <div className="flex items-center gap-2">
              <Input placeholder="Filter your data types" className="w-64" />
              <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Expenses</CardTitle>
                  <CardDescription>Monthly spending trends for top 3 categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mockData.topExpenses}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(v: number) => [`£${v}`, '']} />
                      <Legend />
                      <Line type="monotone" dataKey="Travel" stroke="#000000" strokeWidth={2} />
                      <Line type="monotone" dataKey="Rent" stroke="#9333ea" strokeWidth={2} />
                      <Line type="monotone" dataKey="Food" stroke="#eab308" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Spend by category</CardTitle>
                  <CardDescription>Current month breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={mockData.categoryBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                        {mockData.categoryBreakdown.map((_, idx) => (
                          <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => [`£${v}`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="text-center mt-4">
                    <div className="text-2xl font-bold text-purple-600">£667</div>
                    <div className="flex items-center justify-center text-red-500 text-sm">
                      <TrendingDown className="w-4 h-4 mr-1" /> Last Month
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Savings vs Income vs Expenses</CardTitle>
                <CardDescription>3-month comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.savingsVsIncome}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => [`£${v}`, '']} />
                    <Legend />
                    <Bar dataKey="Savings" fill="#22c55e" />
                    <Bar dataKey="Income" fill="#9333ea" />
                    <Bar dataKey="Expenses" fill="#eab308" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Annual Expenses line graph</CardTitle>
                <CardDescription>Year-over-year spending patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={mockData.annualTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => [`£${v}`, '']} />
                    <Area type="monotone" dataKey="expenses" stroke="#9333ea" fill="#9333ea" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="mb-8 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-['Outfit']">Trend Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Spending Momentum</CardTitle>
                <CardDescription>Weekly spend over the last 12 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={mockData.weeklyTrend}>
                    <defs>
                      <linearGradient id="gradSpend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9333ea" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#9333ea" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => [`£${v}`, '']} />
                    <Area type="monotone" dataKey="spend" stroke="#9333ea" fill="url(#gradSpend)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Heatmap</CardTitle>
                <CardDescription>Relative intensity by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-xs">
                  <div></div>
                  {mockData.heatmapMonths.map((m) => (
                    <div key={m} className="text-gray-500 text-center">
                      {m}
                    </div>
                  ))}
                  {mockData.heatmapCategories.map((row) => (
                    <React.Fragment key={row.name}>
                      <div className="text-gray-600">{row.name}</div>
                      {row.values.map((v, idx) => (
                        <div
                          key={`${row.name}-${idx}`}
                          className="h-6 rounded"
                          style={{ backgroundColor: `rgba(147, 51, 234, ${0.2 + (v / 100) * 0.6})` }}
                          title={`${row.name} ${mockData.heatmapMonths[idx]}: ${v}%`}
                        />
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Average Daily Spend</p>
                <p className="text-2xl font-bold mt-1">£96</p>
                <Badge variant="success" className="mt-2">+6% vs last month</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Volatility</p>
                <p className="text-2xl font-bold mt-1">Low</p>
                <Badge variant="secondary" className="mt-2">Stable</Badge>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">No-spend Days</p>
                <p className="text-2xl font-bold mt-1">7</p>
                <Badge variant="warning" className="mt-2">Target: 8</Badge>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Financial Analysis */}
        <div className="mb-10 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 font-['Outfit']">Financial Analysis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>12‑Month Expense Forecast</CardTitle>
                <CardDescription>Projected vs actuals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={mockData.forecast}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: number) => [`£${v}`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="Expenses" stroke="#9333ea" strokeWidth={2} />
                    <Line type="monotone" dataKey="Forecast" stroke="#22c55e" strokeDasharray="5 5" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Budget Health</CardTitle>
                <CardDescription>Used vs remaining</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Used', value: mockData.currentMonth.percentageUsed },
                        { name: 'Remaining', value: 100 - mockData.currentMonth.percentageUsed },
                      ]}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      <Cell fill="#9333ea" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">{mockData.currentMonth.percentageUsed}%</p>
                  <p className="text-sm text-gray-600">of budget used</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Automatic Insights</CardTitle>
              <CardDescription>Quick wins and watch‑outs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p>Eating Out is trending up for 3 weeks in a row</p>
                <Badge variant="warning">Action: set a cap</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p>Groceries are 12% lower than last month</p>
                <Badge variant="success">Good</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p>Subscriptions unchanged for 6 months</p>
                <Badge variant="secondary">Review annually</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2 font-['Outfit']">Stay Updated with Financial Insights</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto font-['Outfit']">
            Get weekly tips, market updates, and personalized financial advice delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input type="email" placeholder="Enter your email address" className="flex-1" />
            <Button className="bg-white text-purple-600 hover:bg-gray-100">Subscribe</Button>
          </div>
        </div>
      </div>

      {/* Floating settings */}
      <div className="fixed bottom-6 left-6">
        <Button variant="outline" size="icon" className="rounded-full shadow-lg">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

export default BankingDashboard