import React, { useEffect, useState } from 'react';
import BankingDashboard from './components/BankingDashboard';
import CardsDashboard from './components/CardsDashboard';
import AccountsOverview from './components/AccountsOverview';
import BorrowDashboard from './components/BorrowDashboard';
import InvestDashboard from './components/InvestDashboard';
import AccountDashboard from './components/AccountDashboard';
import ChatDashboard from './components/ChatDashboard';

function App() {
  const [route, setRoute] = useState<string>(() => window.location.hash || '#/insights')

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || '#/insights')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  let page: JSX.Element
  if (route.startsWith('#/cards')) page = <CardsDashboard />
  else if (route.startsWith('#/accounts')) page = <AccountsOverview />
  else if (route.startsWith('#/borrow')) page = <BorrowDashboard />
  else if (route.startsWith('#/invest')) page = <InvestDashboard />
  else if (route.startsWith('#/account')) page = <AccountDashboard />
  else if (route.startsWith('#/chat')) page = <ChatDashboard />
  else page = <BankingDashboard />

  return (
    <div className="App">
      {page}
    </div>
  );
}

export default App;
