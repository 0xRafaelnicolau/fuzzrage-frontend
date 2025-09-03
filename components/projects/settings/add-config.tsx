"use client";

import { useState, useTransition } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/cards/card";
import { createConfig } from "@/lib/actions/configs";
import { toast } from "sonner";

export function AddConfig({ projectId }: { projectId: string }) {
    const [name, setName] = useState("");
    const [config, setConfig] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {

            const result = await createConfig({
                project_id: projectId,
                name: formData.get('name') as string,
                config: formData.get('config') as string
            });

            if (result.success) {
                setName("");
                setConfig("");

                toast.success("Config created successfully");
            } else {
                toast.error(result.error?.message || "Failed to create config");
            }
        });
    };

    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <CardTitle>Add New Config</CardTitle>
                        <CardDescription>
                            Paste a new Echidna configuration.
                        </CardDescription>
                    </div>
                    <Button
                        type="submit"
                        form="config-form"
                        disabled={!name.trim() || !config.trim() || isPending}
                    >
                        <Save className="h-4 w-4" />
                        <span className="hidden sm:inline">
                            {isPending ? "Saving..." : "Save"}
                        </span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form id="config-form" action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="config-name">Name</Label>
                        <Input
                            id="config-name"
                            name="name"
                            type="text"
                            placeholder="Enter config name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="config-content">Content</Label>
                        <CodeEditor
                            value={config}
                            language="yaml"
                            placeholder="Please paste your Echidna config here..."
                            onChange={(e) => setConfig(e.target.value)}
                            padding={13}
                            className="rounded-md border border-input shadow-xs focus-within:ring-ring/50 focus-within:ring-[3px]"
                            style={{
                                backgroundColor: "var(--background)",
                                fontFamily: "var(--font-mono)",
                                minHeight: "100px",
                            }}
                        />
                        <input type="hidden" name="config" value={config} />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}