"use client";

import { useState, useTransition } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/cards/card";
import { Project } from "@/lib/actions/types";
import { updateProject } from "@/lib/actions/projects";
import { toast } from "sonner";

export function UpdateProject({ project }: { project: Project }) {
    const [name, setName] = useState(project.attributes.name || "");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await updateProject({
                projectId: project.id,
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