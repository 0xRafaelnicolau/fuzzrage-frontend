import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { AddProjectDialog } from "@/components/ui/add-project-dialog"
import { getUser } from "@/lib/data"

export default async function Page() {
    const user = await getUser();

    return (
        <main>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
                <div className="flex w-full items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input type="text" placeholder="Search projects..." className="pl-10" />
                    </div>
                    <AddProjectDialog user={user} />
                </div>
            </div>
        </main>
    )
}