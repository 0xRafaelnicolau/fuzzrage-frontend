import { AddConfig } from "@/components/projects/add-config";

export default function Page() {
    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Configs</h2>
            </div>

            <AddConfig />
        </main>
    );
}