"use client";

import React, { useTransition, useCallback, useMemo, useState, useEffect } from "react";
import { getUser, User } from "@/lib/actions/user";
import { getProjectOwner, ProjectOwner } from "@/lib/actions/projects";
import { TeamMember, deleteTeamMember, getTeamMembers } from "@/lib/actions/team";
import { Trash2, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

interface TeamListProps {
    projectId: string;
}

const ROLE_NAMES = {
    1: "Read",
    2: "Write",
    3: "Owner"
} as const;

const ownerToTeamMember = (owner: ProjectOwner): TeamMember => ({
    collaborator_id: '',
    user_id: 'owner',
    username: owner.name,
    avatar_url: owner.avatar_url,
    role_level: 3
});

const getInitials = (username: string): string =>
    username
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);

export function TeamList({ projectId }: TeamListProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const [user, setUser] = useState<User>();
    const [owner, setOwner] = useState<ProjectOwner>();
    const [members, setMembers] = useState<TeamMember[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInfo = async () => {
            setLoading(true);
            const [userResponse, projectOwnerResponse, teamMembersResponse] = await Promise.all([
                getUser(),
                getProjectOwner({ projectId }),
                getTeamMembers({ projectId })
            ]);

            if (userResponse.success && userResponse.user) {
                setUser(userResponse.user);
            } else {
                toast.error(userResponse.error?.message || "Failed to get user");
            }

            if (projectOwnerResponse.success && projectOwnerResponse.owner) {
                setOwner(projectOwnerResponse.owner);
            } else {
                toast.error(projectOwnerResponse.error?.message || "Failed to get project owner");
            }

            if (teamMembersResponse.success && teamMembersResponse.members) {
                setMembers(teamMembersResponse.members);
            } else {
                toast.error(teamMembersResponse.error?.message || "Failed to get team members");
            }
            setLoading(false);
        }
        fetchInfo();
    }, [projectId]);


    const handleRemoveMember = useCallback((collaboratorId: string, memberUsername: string) => {
        const isCurrentUser = user?.name === memberUsername;

        startTransition(async () => {
            const response = await deleteTeamMember({
                projectId,
                collaborator_id: collaboratorId
            });

            if (response.success) {
                toast.success("Member removed successfully");
                if (isCurrentUser) {
                    router.push("/dashboard/projects");
                }
            } else {
                toast.error(response.error?.message || "Failed to remove member");
            }
        });
    }, [user?.name, projectId, router]);

    const allMembers = useMemo(() => {
        const membersList = owner ? [ownerToTeamMember(owner)] : [];

        const sortedMembers = members
            ?.filter(member => member.role_level !== 3)
            .sort((a, b) => {
                if (a.role_level !== b.role_level) {
                    return b.role_level - a.role_level;
                }
                return a.username.localeCompare(b.username);
            });

        return [...membersList, ...sortedMembers ?? []];
    }, [owner, members]);

    if (allMembers.length === 0) {
        return (
            <Card className="w-full mt-6">
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                        Manage team members and their permissions.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center py-8">
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <Spinner variant="default" className="text-muted-foreground" />
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm">
                            No team members found. Invite your first member above.
                        </p>
                    )}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                    Manage team members and their permissions.
                </CardDescription>
            </CardHeader>
            <div className="-mb-6">
                <Table>
                    <TableBody>
                        {allMembers.map((member, index) => {
                            const isLast = index === allMembers.length - 1;
                            const isOwner = member.user_id === 'owner' || member.role_level === 3;
                            const isCurrentUser = user?.name === member.username;
                            const borderClass = `border-t ${isLast ? '' : 'border-b'}`;

                            return (
                                <TableRow
                                    key={member.user_id}
                                    className={`hover:bg-muted/50 ${borderClass}`}
                                >
                                    <TableCell className={`w-16 pl-5 ${borderClass}`}>
                                        <Avatar className="h-7 w-7">
                                            <AvatarImage
                                                src={member.avatar_url}
                                                alt={`${member.username}'s avatar`}
                                            />
                                            <AvatarFallback className="text-xs font-medium">
                                                {getInitials(member.username)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className={`font-medium pl-0 ${borderClass}`}>
                                        <div className="flex items-center gap-4">
                                            <span>{member.username}</span>
                                            <span className="text-xs text-muted-foreground font-normal translate-y-px">
                                                {ROLE_NAMES[member.role_level as keyof typeof ROLE_NAMES]}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className={`w-24 text-right ${borderClass}`}>
                                        {!isOwner && (
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        title="Remove Team Member"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="flex items-center gap-2">
                                                            <AlertTriangle className="h-4 w-4" />
                                                            {isCurrentUser ? "Leave Project" : "Remove Member"}
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {isCurrentUser ? (
                                                                <>You are about to remove <strong>yourself</strong> from this project. This action cannot be undone.</>
                                                            ) : (
                                                                <>This will remove <strong>{member.username}</strong> from the project. This action cannot be undone.</>
                                                            )}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleRemoveMember(member.collaborator_id, member.username)}
                                                            disabled={isPending}
                                                        >
                                                            {isCurrentUser ? "Leave" : "Remove"}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}