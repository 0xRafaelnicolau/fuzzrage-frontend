import { AddConfigForm } from "@/components/projects/settings/config/add-config-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/cards/card";

export function AddConfig({ projectId }: { projectId: string }) {
    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="space-y-2">
                    <CardTitle>Add New Config</CardTitle>
                    <CardDescription>
                        Paste a new Echidna configuration.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <AddConfigForm projectId={projectId} />
            </CardContent>
        </Card>
    );
}