import { Navbar } from '@/components/ui/navbar';
import { TabNavigation } from '@/components/ui/tab-navigation';
import { getUser } from '@/lib/data';
import UserMenu from '@/components/ui/user-menu';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();

    const dashboardTabs = [
        { id: 'overview', label: 'Overview', href: '/dashboard' },
        { id: 'projects', label: 'Projects', href: '/dashboard/projects' },
        { id: 'activity', label: 'Activity', href: '/dashboard/activity' },
        { id: 'usage', label: 'Usage', href: '/dashboard/usage' },
    ];

    const buttons = (
        <>
            {/* <ThemeToggle /> */}
            {user && <UserMenu user={user} />}
        </>
    );

    return (
        <div>
            <Navbar buttons={buttons} />
            <TabNavigation tabs={dashboardTabs} />
            {children}
        </div>
    );
}