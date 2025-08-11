import React from 'react'
import TopTabs from './TopTabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'
import { CreditCard, Plus, Settings, ArrowDownRight, ArrowUpRight, Search, Wallet, ShieldCheck, FileDown } from 'lucide-react'

interface Txn {
  id: string
  date: string // ISO date or label section
  merchant: string
  tag: string
  amount: number // positive for debit, negative for credit? We'll use sign
  time: string
}

const transactions: Txn[] = [
  { id: 't1', date: 'Today · 25 Jan', merchant: 'M&S', tag: 'Groceries', amount: -36, time: '11:05am' },
  { id: 't2', date: 'Today · 25 Jan', merchant: 'John', tag: 'Transfer', amount: 50, time: '11:17pm' },
  { id: 't3', date: 'Today · 25 Jan', merchant: 'Amazon', tag: 'Shopping', amount: -22, time: '12:22pm' },
  { id: 't4', date: 'Today · 25 Jan', merchant: 'Netflix', tag: 'Subscription', amount: -15, time: '10:00pm' },
  { id: 't5', date: 'Yesterday · 24 Jan', merchant: 'DK Ltd', tag: 'Salary', amount: 2650, time: '09:00am' },
  { id: 't6', date: 'Yesterday · 24 Jan', merchant: 'Ikea', tag: 'Shopping', amount: -300, time: '02:11pm' },
  { id: 't7', date: '23 Jan', merchant: 'Cancer Research', tag: 'Donation', amount: -50, time: '10:35am' },
  { id: 't8', date: '23 Jan', merchant: 'BritGas', tag: 'Utilities', amount: -115, time: '08:20am' },
]

const groupByDate = (list: Txn[]) => {
  const map = new Map<string, Txn[]>()
  list.forEach(t => {
    if (!map.has(t.date)) map.set(t.date, [])
    map.get(t.date)!.push(t)
  })
  return Array.from(map.entries())
}

const CardsDashboard: React.FC = () => {
  const balance = 2260
  const currency = '£'
  const grouped = groupByDate(transactions)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopTabs active="cards" />

        {/* Header Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                  Current Account
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="gap-2"><Settings className="w-4 h-4" /> Manage</Button>
                  <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Money</Button>
                </div>
              </div>
              <CardDescription>Let’s check out your main spellcaster!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-sm text-gray-500">Available Balance</div>
                  <div className="font-display text-5xl font-extrabold text-gray-900">{currency}{balance.toLocaleString(undefined,{minimumFractionDigits:2})}</div>
                  <div className="mt-2 flex items-center gap-3 text-sm">
                    <span className="inline-flex items-center gap-1 text-green-600"><ArrowUpRight className="w-4 h-4" /> £2,650 in</span>
                    <span className="inline-flex items-center gap-1 text-red-500"><ArrowDownRight className="w-4 h-4" /> £390 out</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="rounded-xl bg-purple-50 p-4 text-center min-w-[140px] border border-purple-100">
                    <Wallet className="w-5 h-5 text-purple-600 mx-auto" />
                    <div className="mt-2 text-sm text-gray-600">Magic Meter</div>
                    <div className="font-semibold">Level 12</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 text-center min-w-[140px] border border-blue-100">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto" />
                    <div className="mt-2 text-sm text-gray-600">Card Status</div>
                    <div className="font-semibold">Active</div>
                  </div>
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
              <p>Set up an auto-transfer to your ISA to level up your savings goal. Reach a high-interest account instantly. Don’t let lifestyle inflation win.</p>
              <div className="flex gap-2">
                <Button size="sm">Learn More</Button>
                <Button variant="secondary" size="sm">Dismiss</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters/Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Filter</Badge>
            <Badge variant="secondary">Recent Spells</Badge>
            <Badge variant="secondary">All Types</Badge>
            <Badge variant="secondary">Daily Grouping</Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search for a specific transaction..." className="pl-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2"><FileDown className="w-4 h-4" /> Download Statement</Button>
          </div>
        </div>

        {/* Transactions */}
        <Card>
          <CardContent className="p-0">
            {grouped.map(([date, txns], i) => (
              <div key={date} className={i>0 ? 'border-t border-gray-100' : ''}>
                <div className="px-6 py-3 text-sm text-gray-600 bg-gray-50 flex items-center justify-between">
                  <span>{date}</span>
                  <span className="text-gray-500">{currency}{txns.reduce((a,b)=>a+b.amount,0).toLocaleString()}</span>
                </div>
                <ul className="divide-y divide-gray-100">
                  {txns.map(t => (
                    <li key={t.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50/80">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gray-100 grid place-items-center text-gray-600">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{t.merchant}</div>
                          <div className="text-xs text-gray-500">{t.tag} • {t.time}</div>
                        </div>
                      </div>
                      <div className={`font-semibold ${t.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                        {t.amount < 0 ? '-' : '+'}{currency}{Math.abs(t.amount).toLocaleString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CardsDashboard
