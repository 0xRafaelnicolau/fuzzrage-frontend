import { Suspense } from "react";
import { TeamInvite } from "@/components/projects/settings/team/team-invite";
import { TeamInviteSkeleton } from "@/components/projects/settings/team/team-invite-skeleton";
import { TeamList } from "@/components/projects/settings/team/team-list";
import { TeamListSkeleton } from "@/components/projects/settings/team/team-list-skeleton";
import { ProjectOwner, getProjectOwner } from "@/lib/actions/projects";
import { TeamMember, getTeamMembers } from "@/lib/actions/team";
import { CollabRole, getCollabRoles } from "@/lib/actions/roles";
import { getUser, User } from "@/lib/actions/user";

async function TeamInviteContent({ id }: { id: string }) {
    const response = await getCollabRoles();

    let roles: CollabRole[] | undefined;
    if (response.success) {
        roles = response.roles;
    }

    return <TeamInvite projectId={id} roles={roles} />;
}

async function TeamListContent({ id }: { id: string }) {
    const [userResponse, projectOwnerResponse, teamMembersResponse] = await Promise.all([
        getUser(),
        getProjectOwner({ projectId: id }),
        getTeamMembers({ project_id: id })
    ]);

    const user = userResponse.success && userResponse.user ? userResponse.user : (() => { throw new Error("User not found"); })();
    const owner: ProjectOwner | undefined = projectOwnerResponse.success && projectOwnerResponse.owner ? projectOwnerResponse.owner : undefined;
    const members: TeamMember[] = teamMembersResponse.success && teamMembersResponse.members ? teamMembersResponse.members : [];

    return <TeamList user={user} projectId={id} owner={owner} members={members || []} />
}

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Team</h2>
            </div>

            <Suspense fallback={<TeamInviteSkeleton />}>
                <TeamInviteContent id={id} />
            </Suspense>

            <Suspense fallback={<TeamListSkeleton />}>
                <TeamListContent id={id} />
            </Suspense>
        </main>
    );
}