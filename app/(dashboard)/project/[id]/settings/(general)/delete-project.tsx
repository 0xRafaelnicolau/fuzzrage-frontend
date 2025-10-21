"use client";

import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteProject, getProject, Project } from "@/lib/actions/projects";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { toast } from "sonner";

export function DeleteProject({ projectId }: { projectId: string }) {
    const router = useRouter();

    const [project, setProject] = useState<Project | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");

    useEffect(() => {
        const fetchProject = async () => {
            const result = await getProject({ projectId });

            if (result.success && result.project) {
                setProject(result.project);
            } else {
                notFound();
            }
        };

        fetchProject();
    }, [projectId]);

    const handleDelete = async () => {
        const response = await deleteProject({ projectId });

        if (response.success) {
            toast.success("Project deleted successfully");
            router.push("/dashboard");
        }
        else {
            toast.error(response.error?.message || "Failed to delete project");
        }
    }

    return (
        <>
            <Card className="w-full mt-6">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <CardTitle>Delete Project</CardTitle>
                            <CardDescription>
                                Permanently delete your project and all of its contents.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="-mx-6 border-t border-border"></div>
                        <div className="flex items-center justify-between -mb-2">
                            <p className="text-xs text-muted-foreground">
                                This action is not reversible, please continue with caution.
                            </p>
                            <Button
                                type="button"
                                onClick={() => setIsDialogOpen(true)}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="hidden sm:inline">
                                    Delete
                                </span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) setConfirmationText("");
            }}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete <strong>{project?.attributes.name}</strong> and all of its contents. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <div className="space-y-4">
                            <Label htmlFor="confirmation-name">
                                Please type <strong>{project?.attributes.name}</strong> to confirm:
                            </Label>
                            <Input
                                id="confirmation-name"
                                value={confirmationText}
                                onChange={(e) => setConfirmationText(e.target.value)}
                            />
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={confirmationText !== project?.attributes.name}
                            onClick={handleDelete}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}