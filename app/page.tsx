import { Header } from "../components/header"
import { AccountSummary } from "../components/account-summary"
import { Marketplace } from "../components/marketplace"
import { Hotel } from "../components/hotel"
import { BlackMarket } from "../components/black-market"
import { GoalsManager } from "../components/goals-manager"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <AccountSummary />
      <Marketplace />
      <Hotel />
      <BlackMarket />
      <GoalsManager />
    </div>
  )
}

