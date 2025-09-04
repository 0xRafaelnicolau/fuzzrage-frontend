import { SideNavigation } from "@/components/ui/navigation/side-navigation";

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;

    const settingsTabs = [
        { id: 'general', label: 'General', href: `/project/${id}/settings` },
        { id: 'configs', label: 'Configs', href: `/project/${id}/settings/configs` },
        { id: 'team', label: 'Team', href: `/project/${id}/settings/team` },
    ];

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="sticky top-30 h-fit">
                            <SideNavigation tabs={settingsTabs} />
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}   