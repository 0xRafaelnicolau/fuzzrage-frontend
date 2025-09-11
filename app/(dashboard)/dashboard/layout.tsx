import { Navbar } from '@/components/ui/navigation/navbar';
import { TabNavigation } from '@/components/ui/navigation/tab-navigation';
import { User, getUser } from '@/lib/actions/user';
import { DashboardFooter } from '@/components/dashboard/dashboard-footer';
import { notFound } from 'next/navigation';
import UserMenu from '@/components/ui/navigation/user-menu';
import { FlickeringGrid } from '@/components/ui/flickering-grid';

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
            {user && <UserMenu user={user} />}
        </>
    );

    return (
        <main>
            <Navbar buttons={buttons} />
            <TabNavigation tabs={dashboardTabs} />
            <div className="flex-1 relative" style={{ minHeight: 'calc(100vh)' }}>
                <div className="absolute inset-0 flex items-center justify-center -z-20">
                    <div className="w-full h-full overflow-hidden rounded-lg bg-background">
                        <FlickeringGrid
                            className="fixed inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center_60%,white,transparent)]"
                            squareSize={4}
                            gridGap={6}
                            color="#0B54C7"
                            maxOpacity={0.5}
                            flickerChance={1}
                        />
                    </div>
                </div>
                {children}
            </div>
            <DashboardFooter />
        </main>
    );
}