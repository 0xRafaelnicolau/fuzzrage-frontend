"use client";

import { useState, useEffect, useTransition } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Project, getProject, updateProject } from "@/lib/actions/projects";
import { toast } from "sonner";

export function UpdateProject({ projectId }: { projectId: string }) {
    const [project, setProject] = useState<Project>();
    const [name, setName] = useState(project?.attributes.name || "");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const fetchProject = async () => {
            const response = await getProject({ projectId });

            if (response.success && response.project) {
                setProject(response.project);
            } else {
                toast.error(response.error?.message || "Failed to fetch project");
            }
        }

        fetchProject();
    }, [projectId]);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await updateProject({
                projectId: projectId,
                name: formData.get('name') as string,
            });

            if (result.success) {
                toast.success("Project updated successfully");
            } else {
                toast.error(result.error?.message || "Failed to update project");
            }
        });
    };

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <CardTitle>Project Name</CardTitle>
                        <CardDescription>
                            Modify your project name.
                        </CardDescription>
                    </div>
                    <Button
                        type="submit"
                        form="project-form"
                        disabled={!name.trim() || isPending}
                    >
                        <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">
                            {isPending ? "Updating..." : "Update"}
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form id="project-form" action={handleSubmit}>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter project name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full"
                    />
                </form>
            </CardContent>
        </Card >
    );
}