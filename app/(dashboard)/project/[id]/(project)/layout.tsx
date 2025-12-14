import { siteConfig } from '@/components/home/config';
import { ProjectsHeader } from '@/app/(dashboard)/project/[id]/(project)/projects-header';
import { Footer } from '@/components/ui/footer';
import { getUser, User } from '@/lib/actions/user';
import { getProject, Project } from '@/lib/actions/projects';
import FlickeringGrid from '@/components/ui/flickering-grid';
import { notFound } from 'next/navigation';

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [userResponse, projectResponse] = await Promise.all([getUser(), getProject({ projectId: id })]);

    let user: User;
    if (userResponse.user && userResponse.success) {
        user = userResponse.user;
    } else {
        notFound();
    }

    let project: Project;
    if (projectResponse.project && projectResponse.success) {
        project = projectResponse.project;
    } else {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col">
            <ProjectsHeader user={user} projectId={id} projectName={project.attributes.name} />
            <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center justify-center -z-20">
                    <div className="w-full h-full overflow-hidden rounded-lg bg-background">
                        <FlickeringGrid
                            className="fixed inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center_60%,white,transparent)]"
                            color="#0B54C7"
                            maxOpacity={0.5}
                            flickerChance={0.5}
                            squareSize={4}
                            gridGap={4}
                        />
                    </div>
                </div>
                <div className="container mx-auto p-2">
                    {children}
                </div>
            </div>
            <Footer socialLinks={siteConfig.footer.socialLinks} />
        </main>
    );
}