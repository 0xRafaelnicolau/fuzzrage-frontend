import { UpdateProject } from "@/app/(dashboard)/project/[id]/settings/(general)/update-project";
import { DeleteProject } from "@/app/(dashboard)/project/[id]/settings/(general)/delete-project";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">General</h2>
            </div>

            <UpdateProject projectId={id} />
            <DeleteProject projectId={id} />
        </main>
    );
}