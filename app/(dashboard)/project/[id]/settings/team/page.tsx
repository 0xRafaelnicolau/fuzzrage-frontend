import { TeamInvite } from "@/app/(dashboard)/project/[id]/settings/team/team-invite";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Team</h2>
            </div>

            <TeamInvite projectId={id} />
        </main>
    );
}