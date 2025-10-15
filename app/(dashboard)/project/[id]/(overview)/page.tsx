import { BitbucketIcon } from "@/components/ui/bitbucket-icon";
import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/ui/github-icon";
import { GitLabIcon } from "@/components/ui/gitlab-icon";
import { GoBack } from "@/components/ui/go-back";
import { StartCampaignModal } from "@/components/projects/start-campaign-modal";
import { getProject, Project } from "@/lib/actions/projects";
import { User } from "@/lib/actions/user";
import { getUser } from "@/lib/actions/user";
import Link from "next/link";
import { notFound } from "next/navigation";

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

export default async function Page({ params }: { params: { id: string } }) {
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

    return (
        <>
            <div className="p-3">
                <GoBack
                    title={project?.attributes.name || "Project"}
                    description={""}
                    href="/dashboard/projects"
                    buttons={[
                        <Link key="repository-link" href={`https://github.com/${project?.attributes.repository_owner}/${project?.attributes.repository_name}`} target="_blank">
                            <Button variant="outline" size="icon" className="md:size-auto md:h-9 md:px-4 md:py-2 md:has-[>svg]:px-3">
                                {getProviderIcon(user?.provider)}
                                <span className="hidden md:inline">Repository</span>
                            </Button>
                        </Link>,
                        <StartCampaignModal key="start-campaign" projectId={id} />
                    ]} />
            </div>
        </>
    )
}