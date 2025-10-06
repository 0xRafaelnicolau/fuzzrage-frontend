"use client";

import { useState, useTransition } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createConfig } from "@/lib/actions/configs";
import { toast } from "sonner";

export function AddConfigForm({ projectId }: { projectId: string }) {
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
        <form action={handleSubmit} className="space-y-4">
            <div className="flex items-end justify-between gap-4">
                <div className="flex-1 space-y-2">
                    <Label htmlFor="config-name">Name</Label>
                    <Input
                        id="config-name"
                        name="name"
                        type="text"
                        placeholder="Enter config name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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

            <div className="-mx-6 border-t border-border"></div>
            <div className="flex items-center justify-between -mb-2">
                <p className="text-xs text-muted-foreground">
                    Visit Echidna official <a href="https://secure-contracts.com/program-analysis/echidna/configuration.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">documentation</a> for more information.
                </p>
                <Button
                    type="submit"
                    disabled={!name.trim() || !config.trim() || isPending}
                >
                    <Save className="h-4 w-4" />
                    <span className="hidden sm:inline">
                        {isPending ? "Saving..." : "Save"}
                    </span>
                </Button>
            </div>
        </form>
    );
}