import { AddConfig } from "@/components/projects/settings/add-config";
import { ConfigList } from "@/components/projects/settings/config-list";
import { getConfigs } from "@/lib/actions/configs";
import { Config } from "@/lib/actions/types";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const response = await getConfigs({ project_id: id });

    let configs: Config[] | undefined;
    if (response.success) {
        configs = response.configs;
    }

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Configs</h2>
            </div>

            <AddConfig projectId={id} />
            <ConfigList projectId={id} configs={configs || []} />
        </main>
    );
}