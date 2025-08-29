import { Navbar } from '@/components/ui/navbar';
import { TabNavigation } from '@/components/ui/tab-navigation';
import { getProject, getUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { getProviderIcon } from '@/components/providers/icon-provider';
import { CirclePlus } from 'lucide-react';
import UserMenu from '@/components/ui/user-menu';
import GoBack from '@/components/dashboard/go-back';
import Link from 'next/link';

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);
    const user = await getUser();

    const dashboardTabs = [
        { id: 'overview', label: 'Overview', href: `/project/${id}` },
        { id: 'campaigns', label: 'Campaigns', href: `/project/${id}/campaigns` },
        { id: 'statistics', label: 'Statistics', href: `/project/${id}/statistics` },
        { id: 'activity', label: 'Activity', href: `/project/${id}/activity` },
        { id: 'corpus', label: 'Corpus', href: `/project/${id}/corpus` },
        { id: 'settings', label: 'Settings', href: `/project/${id}/settings` },
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
            <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                    <GoBack
                        title={project?.attributes.name || "Project"}
                        description={""} href="/dashboard/projects"
                        buttons={[
                            <Link key="repository-link" href={`https://github.com/${project?.attributes.repository_owner}/${project?.attributes.repository_name}`} target="_blank">
                                <Button variant="outline">
                                    {getProviderIcon(user?.provider)}
                                    <span className="hidden md:inline">Repository</span>
                                </Button>
                            </Link>,
                            <Button key="start-campaign" variant="default" className="gap-1.25">
                                <CirclePlus className="h-4 w-4" />
                                <span className="hidden md:inline">Start Campaign</span>
                            </Button>
                        ]} />
                </div>
            </>
            {children}
        </div>
    );
}