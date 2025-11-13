import { SettingsNavigation } from "@/app/(dashboard)/project/[id]/(project)/settings/settings-navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const tabs = [
        { id: 'account', label: 'Account', href: `/dashboard/settings` },
        { id: 'billing', label: 'Billing', href: `/dashboard/settings/billing` },
        { id: 'notifications', label: 'Notifications', href: `/dashboard/settings/notifications` },
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