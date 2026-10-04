import { OperationalMetrics } from '../components/home/OperationalMetrics'
import { QuickActions } from '../components/home/QuickActions'
import { RecentActivity } from '../components/home/RecentActivity'
import { PageContainer } from '../components/ui/PageContainer'
import { PageHeader } from '../components/ui/PageHeader'

export function HomePage() {
  return <PageContainer>
    <PageHeader
      breadcrumb="Home"
      title="Home"
      subtitle="Overview of current Universal Packaging activity."
    />
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
      <QuickActions />
      <OperationalMetrics />
      <RecentActivity />
    </div>
  </PageContainer>
}
