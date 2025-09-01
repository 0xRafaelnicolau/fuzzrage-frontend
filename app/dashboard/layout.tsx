import { Navbar } from '@/components/ui/navigation/navbar';
import { TabNavigation } from '@/components/ui/navigation/tab-navigation';
import { User } from '@/lib/actions/types';
import { getUser } from '@/lib/actions/user';
import UserMenu from '@/components/ui/navigation/user-menu';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const response = await getUser();

    let user: User | undefined;
    if (response.success) {
        user = response.user;
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
        <div>
            <Navbar buttons={buttons} />
            <TabNavigation tabs={dashboardTabs} />
            {children}
        </div>
    );
}