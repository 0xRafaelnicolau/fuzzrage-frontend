import { Suspense } from "react";
import { AddConfig } from "@/components/projects/settings/config/add-config";
import { AddConfigSkeleton } from "@/components/projects/settings/config/add-config-skeleton";
import { ConfigList } from "@/components/projects/settings/config/config-list";
import { Config, getConfigs } from "@/lib/actions/configs";
import { ConfigListSkeleton } from "@/components/projects/settings/config/config-list-skeleton";

async function AddConfigContent({ id }: { id: string }) {
    return <AddConfig projectId={id} />;
}

async function ConfigListContent({ id }: { id: string }) {
    const response = await getConfigs({ project_id: id });

    let configs: Config[] | undefined;
    if (response.success) {
        configs = response.configs;
    }

    return <ConfigList projectId={id} configs={configs || []} />;
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Configs</h2>
            </div>

            <Suspense fallback={<AddConfigSkeleton />}>
                <AddConfigContent id={id} />
            </Suspense>

            <Suspense fallback={<ConfigListSkeleton />}>
                <ConfigListContent id={id} />
            </Suspense>
        </main>
    );
}