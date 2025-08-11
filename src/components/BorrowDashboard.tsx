import React, { useMemo, useState } from 'react'
import TopTabs from './TopTabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'
import { Calculator, CreditCard, Percent, PiggyBank } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

type Series = { m: number; balance: number; interest: number; principal: number; payment: number }[]

function buildSeries(amount: number, apr: number, term: number): Series {
  const r = apr / 100 / 12
  const payment = r === 0 ? amount / term : (amount * r * Math.pow(1 + r, term)) / (Math.pow(1 + r, term) - 1)
  let bal = amount
  const s: Series = []
  for (let i = 1; i <= term; i++) {
    const interest = bal * r
    const principal = Math.min(payment - interest, bal)
    bal = Math.max(0, bal - principal)
    s.push({ m: i, balance: bal, interest, principal, payment })
  }
  return s
}

const BorrowDashboard: React.FC = () => {
  const [amount, setAmount] = useState(5000)
  const [apr, setApr] = useState(8.9)
  const [term, setTerm] = useState(36)
  const series = useMemo(() => buildSeries(amount, apr, term), [amount, apr, term])
  const monthly = series[0]?.payment ?? 0
  const totalInterest = series.reduce((a, b) => a + b.interest, 0)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TopTabs active="borrow" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Borrow with confidence</CardTitle>
              <CardDescription>Personalised offers based on your spending behaviour</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 space-y-1">
                  <div className="flex items-center gap-2"><CreditCard className="w-4 h-4 text-purple-600" /><span className="font-medium">FinWiz Flex</span></div>
                  <p className="text-sm text-gray-600">£5,000 • 8.9% APR • up to 36 months</p>
                  <ul className="text-xs text-gray-500 list-disc ml-5 mt-1">
                    <li>No early repayment fees</li>
                    <li>Instant decision</li>
                  </ul>
                  <Button size="sm" className="mt-2">Apply</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-1">
                  <div className="flex items-center gap-2"><Percent className="w-4 h-4 text-purple-600" /><span className="font-medium">Green Home Loan</span></div>
                  <p className="text-sm text-gray-600">£12,000 • 6.4% APR • up to 60 months</p>
                  <ul className="text-xs text-gray-500 list-disc ml-5 mt-1">
                    <li>Energy upgrade cashback</li>
                    <li>Fixed rate</li>
                  </ul>
                  <Button size="sm" className="mt-2">Apply</Button>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 space-y-1">
                  <div className="flex items-center gap-2"><PiggyBank className="w-4 h-4 text-purple-600" /><span className="font-medium">Debt Consolidation</span></div>
                  <p className="text-sm text-gray-600">£8,000 • 7.2% APR • up to 48 months</p>
                  <ul className="text-xs text-gray-500 list-disc ml-5 mt-1">
                    <li>Lower blended interest</li>
                    <li>One simple payment</li>
                  </ul>
                  <Button size="sm" className="mt-2">Apply</Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
              <CardDescription>Updated monthly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between"><span>Credit score</span><Badge variant="success">Excellent</Badge></div>
              <div className="flex items-center justify-between"><span>Income stability</span><Badge variant="secondary">Stable</Badge></div>
              <div className="flex items-center justify-between"><span>Utilisation</span><Badge variant="warning">38%</Badge></div>
              <div className="flex items-center justify-between"><span>Pre-approval</span><Badge variant="default">85%</Badge></div>
            </CardContent>
          </Card>
        </div>

        {/* Calculator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calculator className="w-5 h-5 text-purple-600" /> Quick Calculator</CardTitle>
            <CardDescription>Estimate your monthly repayment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
              <div className="lg:col-span-2">
                <label className="text-sm text-gray-600">Loan amount (£)</label>
                <Input value={amount} onChange={(e)=>setAmount(Number(e.target.value)||0)} />
                <input type="range" min={1000} max={50000} step={100} value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div className="lg:col-span-2">
                <label className="text-sm text-gray-600">APR (%)</label>
                <Input value={apr} onChange={(e)=>setApr(Number(e.target.value)||0)} />
                <input type="range" min={0} max={25} step={0.1} value={apr} onChange={(e)=>setApr(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div className="lg:col-span-2">
                <label className="text-sm text-gray-600">Term (months)</label>
                <Input value={term} onChange={(e)=>setTerm(Number(e.target.value)||1)} />
                <input type="range" min={6} max={84} step={1} value={term} onChange={(e)=>setTerm(Number(e.target.value))} className="w-full mt-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Estimated monthly payment</div>
                  <div className="text-2xl font-bold">£{monthly.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total interest</div>
                  <div className="text-2xl font-bold">£{totalInterest.toFixed(2)}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-500">Total repayable</div>
                  <div className="text-2xl font-bold">£{(amount + totalInterest).toFixed(2)}</div>
                </CardContent>
              </Card>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip formatter={(v:number)=>`£${v.toFixed(2)}`} />
                <Line type="monotone" dataKey="balance" stroke="#9333ea" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Amortisation preview */}
        <Card>
          <CardHeader>
            <CardTitle>Amortisation preview</CardTitle>
            <CardDescription>First 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 text-xs font-semibold text-gray-500 mb-2">
              <div>Month</div><div>Payment</div><div>Interest</div><div>Principal</div><div>Balance</div>
            </div>
            {series.slice(0,6).map((r)=> (
              <div key={r.m} className="grid grid-cols-5 text-sm py-1 border-t border-gray-100">
                <div>M{r.m}</div>
                <div>£{r.payment.toFixed(2)}</div>
                <div>£{r.interest.toFixed(2)}</div>
                <div>£{r.principal.toFixed(2)}</div>
                <div>£{r.balance.toFixed(2)}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BorrowDashboard
