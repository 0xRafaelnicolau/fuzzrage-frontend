import { Config } from "@/lib/actions/configs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { Table, TableBody } from "@/components/ui/table";
import { ConfigListTable } from "@/components/projects/settings/config/config-list-table";

interface ConfigListProps {
    projectId: string;
    configs: Config[];
}

export function ConfigList({ projectId, configs }: ConfigListProps) {
    const sortedConfigs = [...configs].sort((a, b) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });

    if (configs.length === 0) {
        return (
            <Card className="w-full mt-6">
                <CardHeader>
                    <div className="space-y-2">
                        <CardTitle>Manage Configurations</CardTitle>
                        <CardDescription>
                            Manage your Echidna configurations.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-4">
                    <p className="text-muted-foreground text-sm">No configs found. Add your first config above.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="space-y-2">
                    <CardTitle>Manage Configurations</CardTitle>
                    <CardDescription>
                        Manage your Echidna configurations.
                    </CardDescription>
                </div>
            </CardHeader>
            <div className="-mb-6">
                <Table>
                    <TableBody>
                        <ConfigListTable projectId={projectId} configs={sortedConfigs} />
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}