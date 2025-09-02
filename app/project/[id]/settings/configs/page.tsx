import { AddConfig } from "@/components/projects/add-config";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Configs</h2>
            </div>

            <AddConfig projectId={id} />
        </main>
    );
}