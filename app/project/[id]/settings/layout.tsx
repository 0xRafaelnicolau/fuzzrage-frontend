import { SettingsSideNavigation } from "@/components/projects/settings/settings-side-navigation";

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;

    const settingsTabs = [
        { id: 'general', label: 'General', href: `/project/${id}/settings` },
        { id: 'configs', label: 'Configs', href: `/project/${id}/settings/configs` },
        { id: 'team', label: 'Team', href: `/project/${id}/settings/team` },
    ];

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 min-h-screen">
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 h-fit pt-6">
                            <SettingsSideNavigation tabs={settingsTabs} />
                        </div>
                    </div>

                    {/* Horizontal separator line for mobile - full width */}
                    <div className="lg:hidden border-b [border-color:var(--border-light)] dark:border-input -mx-4 sm:-mx-6 lg:mx-0"></div>

                    {/* Vertical separator line for desktop */}
                    <div className="hidden lg:block border-r [border-color:var(--border-light)] dark:border-input self-stretch"></div>

                    <div className="lg:w-3/4 pt-0 lg:pt-6">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}   