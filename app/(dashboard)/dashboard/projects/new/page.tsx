import { Installation, getInstallations } from "@/lib/actions/installations";
import { ImportRepo } from "@/app/(dashboard)/dashboard/projects/new/import-repo";
import { GoBack } from "@/components/ui/go-back";
import { RefreshOnFocus } from "@/components/ui/refresh-on-focus";
import { notFound } from "next/navigation";
import { User, getUser } from "@/lib/actions/user";

export default async function Page() {
    const [userResponse, installationsResponse] = await Promise.all([getUser(), getInstallations()]);

    let user: User;
    if (userResponse.user && userResponse.success) {
        user = userResponse.user;
    } else {
        notFound();
    }

    let installations: Installation[] = [];
    if (installationsResponse.success) {
        installations = installationsResponse.installations || []
    } else {
        return notFound()
    }

    return (
        <>
            <div className="p-3">
                <GoBack title="Add Project" description="Create a new project and start fuzzing" href="/dashboard/projects" />
                <div className="mt-6">
                    <ImportRepo user={user} installations={installations} />
                </div>
            </div>
            <RefreshOnFocus />
        </>
    )
}