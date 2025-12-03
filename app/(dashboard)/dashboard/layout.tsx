import { DashboardHeader } from '@/app/(dashboard)/dashboard/dashboard-header';
import { Footer } from '@/components/ui/footer';
import { User, getUser } from '@/lib/actions/user';
import { notFound } from 'next/navigation';
import FlickeringGrid from '@/components/ui/flickering-grid';
import { siteConfig } from '@/components/home/config';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const response = await getUser();

    let user: User;
    if (response.user && response.success) {
        user = response.user;
    } else {
        notFound();
    }

    return (
        <main className="min-h-screen flex flex-col">
            <DashboardHeader user={user} />
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