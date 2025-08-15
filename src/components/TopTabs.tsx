import React from 'react'
import { Home, CreditCard, BarChart3, Sprout, Ticket, User, MessageCircle } from 'lucide-react'

type Active = 'accounts' | 'cards' | 'insights' | 'borrow' | 'invest' | 'account' | 'chat'

interface TopTabsProps {
  active: Active
}

const items: Array<{ key: Active; label: string; icon: React.ComponentType<any>; href?: string }> = [
  { key: 'accounts', label: 'Accounts', icon: Home, href: '#/accounts' },
  { key: 'cards', label: 'Cards', icon: CreditCard, href: '#/cards' },
  { key: 'insights', label: 'Insights', icon: BarChart3, href: '#/insights' },
  { key: 'borrow', label: 'Borrow', icon: Sprout, href: '#/borrow' },
  { key: 'invest', label: 'Invest', icon: Ticket, href: '#/invest' },
  { key: 'account', label: 'Account', icon: User, href: '#/account' },
  { key: 'chat', label: 'Chat', icon: MessageCircle },
]

const TopTabs: React.FC<TopTabsProps> = ({ active }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-card mb-8">
      <div className="flex items-center justify-between px-6 py-4">
        {items.map(({ key, label, icon: Icon, href }) => {
          const pill = key === active
          const content = (
            <div className="flex flex-col items-center gap-2">
              <Icon className={`w-6 h-6 ${pill ? 'text-purple-600' : 'text-purple-600/70'}`} />
              {pill ? (
                <span className="px-3 py-1 rounded-full text-white bg-purple-600 text-sm shadow-sm">{label}</span>
              ) : (
                <span className="text-sm text-gray-700">{label}</span>
              )}
            </div>
          )
          return href ? (
            <a key={key} href={href} className="transition-transform hover:scale-[1.02]">
              {content}
            </a>
          ) : (
            <div key={key}>{content}</div>
          )
        })}
      </div>
    </div>
  )
}

export default TopTabs
