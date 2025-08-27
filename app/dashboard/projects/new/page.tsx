import NewProjectForm from "@/components/dashboard/new-project-form";
import { RefreshOnFocus } from "@/components/ui/refresh-on-focus";
import { getInstallations } from "@/lib/data";

export default async function Page() {
    const installations = await getInstallations()

    return (
        <>
            <NewProjectForm installations={installations} />
            <RefreshOnFocus />
        </>
    )
}