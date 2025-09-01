"use client";

import { useState } from "react";
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

export function AddConfig() {
    const [name, setName] = useState("");
    const [config, setConfig] = useState("");

    const handleSubmit = async () => {

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
                        disabled={!name.trim() || !config.trim()}
                    >
                        <Save className="h-4 w-4" />
                        Save
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <form id="config-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="config-name">Name</Label>
                        <Input
                            id="config-name"
                            type="text"
                            placeholder="Enter config name"
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
                            placeholder="Please paste your Echidna config here."
                            onChange={(evn) => setConfig(evn.target.value)}
                            padding={15}
                            style={{
                                backgroundColor: "var(--background)",
                                fontFamily: "var(--font-mono)",
                                border: "solid var(--border)",
                                borderRadius: "var(--radius)",
                                minHeight: "200px"
                            }}
                        />
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}