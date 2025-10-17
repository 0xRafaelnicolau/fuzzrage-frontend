"use client";

import { useState, useTransition, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createInvite } from "@/lib/actions/team";
import { CollabRole, getCollabRoles } from "@/lib/actions/roles";
import { toast } from "sonner";
import { getRoleName } from "@/lib/utils";

export function TeamInvite({ projectId }: { projectId: string }) {
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState<CollabRole[]>([]);
    const [selectedRole, setSelectedRole] = useState<string>("1");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchRoles = async () => {
            const response = await getCollabRoles();
            if (response.success && response.roles) {
                setRoles(response.roles);
            } else {
                toast.error(response.error?.message || "Failed to fetch roles");
            }
        }

        fetchRoles();
    }, [projectId]);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await createInvite({
                project_id: projectId,
                email: formData.get('email') as string,
                role: parseInt(selectedRole)
            });

            if (result.success) {
                setEmail("");
                setSelectedRole("1");
                toast.success("Invite sent successfully");
            } else {
                toast.error(result.error?.message || "Failed to send invite");
            }
        });
    };

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <CardTitle>Invite Team Member</CardTitle>
                        <CardDescription>
                            Send an invitation to join this project.
                        </CardDescription>
                    </div>
                    <Button
                        type="submit"
                        form="invite-form"
                        disabled={!email.trim() || !selectedRole || isPending}
                    >
                        <UserPlus className="h-4 w-4" />
                        <span className="hidden sm:inline">
                            {isPending ? "Sending..." : "Send Invite"}
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form id="invite-form" action={handleSubmit} className="space-y-4">
                    <div className="flex flex-col md:flex-row md:gap-4 space-y-4 md:space-y-0">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="invite-email">Email</Label>
                            <Input
                                id="invite-email"
                                name="email"
                                type="email"
                                placeholder="Enter email address..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>

                        <div className="w-full md:w-48 space-y-2">
                            <Label htmlFor="invite-role">Permissions</Label>
                            <Select
                                name="role"
                                value={selectedRole}
                                onValueChange={setSelectedRole}
                                required
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select permissions..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map((role) => (
                                        <SelectItem key={role.role_id} value={role.role_id}>{getRoleName(role)}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}