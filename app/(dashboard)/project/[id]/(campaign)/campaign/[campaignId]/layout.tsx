import { CampaignsHeader } from '@/app/(dashboard)/project/[id]/(campaign)/campaign/[campaignId]/campaigns-header';
import { Footer } from '@/components/ui/footer';
import { User, getUser } from '@/lib/actions/user';
import { notFound } from 'next/navigation';
import ConditionalFlickeringGrid from '@/components/ui/conditional-flickering-grid';

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ id: string, campaignId: string }> }) {
    const { id, campaignId } = await params;

    const response = await getUser();

    let user: User;
    if (response.user && response.success) {
        user = response.user;
    } else {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col">
            <CampaignsHeader user={user} projectId={id} campaignId={campaignId} />
            <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center justify-center -z-20">
                    <div className="w-full h-full overflow-hidden rounded-lg bg-background">
                        <ConditionalFlickeringGrid projectId={id} campaignId={campaignId} />
                    </div>
                </div>
                <div className="container mx-auto p-2">
                    {children}
                </div>
            </div>
            <Footer />
        </main>
    );
}