import { TeamInvite } from "@/components/projects/settings/team-invite";
import { TeamList } from "@/components/projects/settings/team-list";
import { getProjectOwner } from "@/lib/actions/projects";
import { getCollabRoles, getTeamMembers } from "@/lib/actions/team";
import { CollabRole, ProjectOwner, TeamMember } from "@/lib/actions/types";
import { getUser } from "@/lib/actions/user";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;

    const [userResponse, collabRolesResponse, projectOwnerResponse, teamMembersResponse] = await Promise.all([
        getUser(),
        getCollabRoles(),
        getProjectOwner({ projectId: id }),
        getTeamMembers({ project_id: id })
    ]);

    const user = userResponse.success && userResponse.user ? userResponse.user : (() => { throw new Error("User not found"); })();
    const roles: CollabRole[] = collabRolesResponse.success && collabRolesResponse.roles ? collabRolesResponse.roles : [];
    const owner: ProjectOwner | undefined = projectOwnerResponse.success && projectOwnerResponse.owner ? projectOwnerResponse.owner : undefined;
    const members: TeamMember[] = teamMembersResponse.success && teamMembersResponse.members ? teamMembersResponse.members : [];

    return (
        <main>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Team</h2>
            </div>

            <TeamInvite projectId={id} roles={roles} />
            <TeamList user={user} projectId={id} owner={owner} members={members} />
        </main>
    );
}   