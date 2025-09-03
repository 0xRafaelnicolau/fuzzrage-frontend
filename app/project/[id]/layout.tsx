import { Navbar } from '@/components/ui/navigation/navbar';
import { TabNavigation } from '@/components/ui/navigation/tab-navigation';
import { getProject } from '@/lib/actions/projects';
import { getUser } from '@/lib/actions/user';
import { Project, User } from '@/lib/actions/types';
import { Button } from '@/components/ui/button';
import { getProviderIcon } from '@/components/providers/icon-provider';
import { CirclePlus } from 'lucide-react';
import UserMenu from '@/components/ui/navigation/user-menu';
import GoBack from '@/components/ui/go-back';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [projectResponse, userResponse] = await Promise.all([
        getProject({ projectId: id }),
        getUser()
    ]);

    let user: User | undefined;
    if (userResponse.success) {
        user = userResponse.user;
    } else {
        notFound();
    }

    let project: Project | undefined;
    if (projectResponse.success) {
        project = projectResponse.project;
    } else {
        notFound();
    }

    const dashboardTabs = [
        { id: 'overview', label: 'Overview', href: `/project/${id}` },
        { id: 'campaigns', label: 'Campaigns', href: `/project/${id}/campaigns` },
        { id: 'activity', label: 'Activity', href: `/project/${id}/activity` },
        { id: 'statistics', label: 'Statistics', href: `/project/${id}/statistics` },
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
                                <Button variant="outline" size="icon" className="md:size-auto md:h-9 md:px-4 md:py-2 md:has-[>svg]:px-3">
                                    {getProviderIcon(user?.provider)}
                                    <span className="hidden md:inline">Repository</span>
                                </Button>
                            </Link>,
                            <Button key="start-campaign" variant="default" size="icon" className="gap-1.25 md:size-auto md:h-9 md:px-4 md:py-2 md:has-[>svg]:px-3">
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