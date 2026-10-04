import { ProfileSettings } from '../components/settings/ProfileSettings'
import { SecuritySettings } from '../components/settings/SecuritySettings'
import { PageContainer } from '../components/ui/PageContainer'
import { PageHeader } from '../components/ui/PageHeader'

export function SettingsPage() {
  return <PageContainer>
    <PageHeader
      breadcrumb="Home / Settings"
      title="Settings"
      subtitle="Manage your account information and security settings."
    />
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <ProfileSettings />
      <SecuritySettings />
    </div>
  </PageContainer>
}
