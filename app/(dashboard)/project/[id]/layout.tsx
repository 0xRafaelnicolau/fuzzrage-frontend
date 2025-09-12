import { Navbar } from '@/components/ui/navigation/navbar';
import { TabNavigation } from '@/components/ui/navigation/tab-navigation';
import { getProject } from '@/lib/actions/projects';
import { User, getUser } from '@/lib/actions/user';
import { Project } from '@/lib/actions/projects';
import { Button } from '@/components/ui/button';
import { GitHubIcon } from "@/components/ui/icons/github-icon";
import { GitLabIcon } from "@/components/ui/icons/gitlab-icon";
import { BitbucketIcon } from "@/components/ui/icons/bitbucket-icon";
import { DashboardFooter } from '@/components/dashboard/dashboard-footer';
import { FlickeringGrid } from '@/components/ui/flickering-grid';
import { notFound } from 'next/navigation';
import UserMenu from '@/components/ui/navigation/user-menu';
import GoBack from '@/components/ui/go-back';
import Link from 'next/link';
import { StartCampaignModal } from '@/components/projects/start/start-campaign-modal';

export const getProviderIcon = (provider?: string) => {
    switch (provider?.toLowerCase()) {
        case 'github':
            return <GitHubIcon />;
        case 'gitlab':
            return <GitLabIcon />;
        case 'bitbucket':
            return <BitbucketIcon />;
        default:
            return <GitHubIcon />;
    }
};

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
            {user && <UserMenu user={user} />}
        </>
    );

    return (
        <main>
            <Navbar buttons={buttons} />
            <TabNavigation tabs={dashboardTabs} />
            <div className="bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                            <StartCampaignModal projectId={id} key="start-campaign" />
                        ]} />
                </div>
                <div className="border-b [border-color:var(--border-light)] dark:border-input"></div>
            </div>
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
        </main >
    );
}