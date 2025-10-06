import { SettingsNavigation } from "@/components/projects/settings/settings-navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
    const { id } = await params;

    const tabs = [
        { id: 'general', label: 'General', href: `/project/${id}/settings` },
        { id: 'config', label: 'Config', href: `/project/${id}/settings/config` },
        { id: 'team', label: 'Team', href: `/project/${id}/settings/team` },
    ];

    return (
        <div className="p-3">
            <div className="flex flex-col lg:flex-row relative">
                <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                    <div className="lg:sticky lg:top-0">
                        <SettingsNavigation tabs={tabs} />
                    </div>
                </div>

                <div className="w-full lg:w-3/4 lg:pl-4">
                    <ScrollArea className="lg:h-[calc(100vh-14rem)]">
                        {children}
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}   