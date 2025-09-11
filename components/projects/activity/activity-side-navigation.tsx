import { ActivityTypePicker } from '@/components/projects/activity/activity-type-picker';
import { ActivityDatePicker } from '@/components/projects/activity/activity-date-picker';

interface ActivitySideNavigationProps {
    projectId: string;
    from?: string;
    to?: string;
}

export async function ActivitySideNavigation({ projectId, from, to }: ActivitySideNavigationProps) {
    return (
        <>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Filters</h2>
            </div>
            <div className="space-y-3 mt-4 pb-6">
                <ActivityDatePicker projectId={projectId} from={from} to={to} />
                <ActivityTypePicker projectId={projectId} />
            </div>
        </>
    );
}