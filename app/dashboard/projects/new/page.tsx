import { Installation } from "@/lib/actions/types";
import { getInstallations } from "@/lib/actions/installations";
import { RefreshOnFocus } from "@/components/dashboard/refresh-on-focus";
import NewProjectForm from "@/components/dashboard/new-project-form";
import GoBack from "@/components/dashboard/go-back";

export default async function Page() {
    const response = await getInstallations()

    let installations: Installation[] = [];
    if (response.success) {
        installations = response.installations || []
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                <GoBack title="Add Project" description="Create a new project and start fuzzing" href="/dashboard/projects" />
                <NewProjectForm installations={installations} />
            </div>
            <RefreshOnFocus />
        </>
    )
}