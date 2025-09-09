import { Navbar } from '@/components/ui/navigation/navbar';
import { TabNavigation } from '@/components/ui/navigation/tab-navigation';
import { User, getUser } from '@/lib/actions/user';
import { DashboardFooter } from '@/components/dashboard/dashboard-footer';
import { notFound } from 'next/navigation';
import UserMenu from '@/components/ui/navigation/user-menu';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const response = await getUser();

    let user: User | undefined;
    if (response.success) {
        user = response.user;
    } else {
        notFound();
    }

    const dashboardTabs = [
        { id: 'overview', label: 'Overview', href: '/dashboard' },
        { id: 'projects', label: 'Projects', href: '/dashboard/projects' },
        { id: 'activity', label: 'Activity', href: '/dashboard/activity' },
        { id: 'usage', label: 'Usage', href: '/dashboard/usage' },
        { id: 'settings', label: 'Settings', href: '/dashboard/settings' },
    ];

    const buttons = (
        <>
            {/* <ThemeToggle /> */}
            {user && <UserMenu user={user} />}
        </>
    );

    return (
        <main className="min-h-screen flex flex-col">
            <Navbar buttons={buttons} />
            <TabNavigation tabs={dashboardTabs} />
            <div className="flex-1" style={{ minHeight: 'calc(100vh)' }}>
                {children}
            </div>
            <DashboardFooter />
        </main>
    );
}