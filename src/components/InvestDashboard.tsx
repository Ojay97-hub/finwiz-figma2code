import React, { useState } from 'react'
import TopTabs from './TopTabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TrendingUp, PieChart as PieIcon, Briefcase, Shield, Calendar, ArrowUpRight } from 'lucide-react'
import { Input } from './ui/Input'

const perf = Array.from({ length: 12 }).map((_, i) => ({ m: i + 1, v: 10000 + Math.round(Math.sin(i / 2) * 800 + i * 200) }))

const holdings = [
  { name: 'Global Equity ETF', value: 5200, change: 1.2 },
  { name: 'UK Gilts', value: 2100, change: 0.4 },
  { name: 'Tech Growth', value: 1500, change: -0.6 },
  { name: 'Cash', value: 1200, change: 0 },
]

const highlights = [
  { name: 'FTSE 100', change: 0.7 },
  { name: 'S&P 500', change: 1.1 },
  { name: 'NASDAQ', change: 1.9 },
]

const InvestDashboard: React.FC = () => {
  const [monthly, setMonthly] = useState(300)
  const [years, setYears] = useState(5)
  const projected = monthly * 12 * years * 1.08 // naive 8% CAGR

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopTabs active="invest" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-purple-600" /> Portfolio Performance</CardTitle>
              <CardDescription>Last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={perf}>
                  <defs>
                    <linearGradient id="pf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9333ea" stopOpacity={0.6} />
                      <stop offset="95%" stopColor="#9333ea" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="m" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="v" stroke="#9333ea" fill="url(#pf)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><PieIcon className="w-5 h-5 text-purple-600" /> Allocation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {holdings.map(h => (
                <div key={h.name} className="flex items-center justify-between">
                  <span>{h.name}</span>
                  <span className={h.change >= 0 ? 'text-green-600' : 'text-red-500'}>{h.change >= 0 ? '+' : ''}{h.change}%</span>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">Rebalance</Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ideas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-purple-600" /> Ideas</CardTitle>
              <CardDescription>Curated for your risk profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span>Clean Energy ETF</span><Badge variant="secondary">Balanced</Badge></div>
              <div className="flex items-center justify-between"><span>US Quality Dividend</span><Badge variant="secondary">Conservative</Badge></div>
              <div className="flex items-center justify-between"><span>AI Innovators</span><Badge variant="warning">Growth</Badge></div>
              <Button size="sm">Explore</Button>
            </CardContent>
          </Card>

          {/* Contribution Planner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-purple-600" /> Contribution Planner</CardTitle>
              <CardDescription>How much to reach a goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-sm text-gray-600">Monthly (£)</label>
                  <Input value={monthly} onChange={(e)=>setMonthly(Number(e.target.value)||0)} />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Years</label>
                  <Input value={years} onChange={(e)=>setYears(Number(e.target.value)||0)} />
                </div>
              </div>
              <p className="text-sm text-gray-600">Projected pot (naive 8% CAGR)</p>
              <p className="text-2xl font-bold text-purple-600">£{projected.toLocaleString(undefined,{maximumFractionDigits:0})}</p>
              <Button className="mt-3 gap-2">Increase Plan <ArrowUpRight className="w-4 h-4" /></Button>
            </CardContent>
          </Card>

          {/* Market Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Market Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {highlights.map(h => (
                <div key={h.name} className="flex items-center justify-between">
                  <span>{h.name}</span>
                  <span className={h.change >= 0 ? 'text-green-600' : 'text-red-500'}>{h.change >= 0 ? '+' : ''}{h.change}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default InvestDashboard
