"use client";

import React, { useState, useTransition } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Config, deleteConfig, updateConfig } from "@/lib/actions/configs";
import { ChevronDown, ChevronRight, Edit, Trash2, Check, X, AlertTriangle } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
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

interface ConfigListTableProps {
    projectId: string;
    configs: Config[];
}

export function ConfigListTable({ projectId, configs }: ConfigListTableProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState<string>("");
    const [editingConfig, setEditingConfig] = useState<string>("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const toggleExpand = (configId: string) => {
        if (editingId === configId || deleteDialogOpen === configId) {
            return;
        }

        setExpandedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(configId)) {
                newSet.delete(configId);
            } else {
                newSet.add(configId);
            }
            return newSet;
        });
    };

    const handleEdit = (config: Config, event: React.MouseEvent) => {
        event.stopPropagation();
        setEditingId(config.id);
        setEditingName(config.name);
        setEditingConfig(config.config);
        setExpandedIds(prev => {
            const newSet = new Set(prev);
            newSet.add(config.id);
            return newSet;
        });
    };

    const handleSaveEdit = async (formData: FormData) => {
        const configId = formData.get('configId') as string;

        startTransition(async () => {
            const response = await updateConfig({
                project_id: projectId,
                config_id: configId,
                name: formData.get('name') as string,
                content: formData.get('content') as string
            });

            if (response.success) {
                setEditingId(null);
                setEditingName("");
                setEditingConfig("");
                toast.success("Config updated successfully");
            } else {
                toast.error(response.error?.message || "Failed to update config");
            }
        });
    };

    const handleCancelEdit = (event: React.MouseEvent) => {
        event.stopPropagation();
        setEditingId(null);
        setEditingName("");
        setEditingConfig("");
    };

    const handleDelete = (configId: string) => {
        setDeleteDialogOpen(null);
        startTransition(async () => {
            const response = await deleteConfig({
                project_id: projectId,
                config_id: configId
            });

            if (response.success) {
                toast.success("Config deleted successfully");
            } else {
                toast.error(response.error?.message || "Failed to delete config");
            }
        });
    };

    return (
        <>
            {configs.map((config, index) => {
                const isLast = index === configs.length - 1;
                const isExpanded = expandedIds.has(config.id);
                const isLastVisible = isLast && !isExpanded;

                return (
                    <React.Fragment key={config.id}>
                        <TableRow
                            className={`cursor-pointer hover:bg-muted/50 border-t ${isLastVisible ? '' : 'border-b'}`}
                            onClick={() => toggleExpand(config.id)}
                        >
                            <TableCell className={`w-12 pl-5 border-t ${isLastVisible ? '' : 'border-b'}`}>
                                {expandedIds.has(config.id) ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </TableCell>
                            <TableCell className={`font-medium pl-0 border-t ${isLastVisible ? '' : 'border-b'}`}>
                                {editingId === config.id ? (
                                    <Input
                                        value={editingName}
                                        onChange={(e) => setEditingName(e.target.value)}
                                        className="border-0 bg-transparent p-0 h-auto text-sm font-medium focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none -ml-1.5 pl-1.5"
                                        autoFocus
                                    />
                                ) : (
                                    config.name
                                )}
                            </TableCell>
                            <TableCell className={`w-24 text-right border-t ${isLastVisible ? '' : 'border-b'}`}>
                                <div className="flex gap-2 justify-end">
                                    {editingId === config.id ? (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const form = document.getElementById(`edit-form-${config.id}`) as HTMLFormElement;
                                                    if (form) {
                                                        const formData = new FormData(form);
                                                        handleSaveEdit(formData);
                                                    }
                                                }}
                                                disabled={isPending}
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={(e) => handleCancelEdit(e)}
                                                className="h-8 w-8"
                                                disabled={isPending}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={(e) => handleEdit(config, e)}
                                                className="h-8 w-8"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setDeleteDialogOpen(config.id);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                        {expandedIds.has(config.id) && (
                            <TableRow className={isLast ? '' : 'border-b'}>
                                <TableCell colSpan={3} className={isLast ? '' : 'border-b'}>
                                    <div className="px-2 py-2">
                                        {editingId === config.id ? (
                                            <form id={`edit-form-${config.id}`} action={handleSaveEdit}>
                                                <input type="hidden" name="configId" value={config.id} />
                                                <input type="hidden" name="name" value={editingName} />
                                                <input type="hidden" name="content" value={editingConfig} />
                                                <CodeEditor
                                                    value={editingConfig}
                                                    language="yaml"
                                                    onChange={(e) => setEditingConfig(e.target.value)}
                                                    padding={13}
                                                    className="rounded-md border border-input shadow-xs focus-within:ring-ring/50 focus-within:ring-[3px]"
                                                    style={{
                                                        backgroundColor: "var(--background)",
                                                        fontFamily: "var(--font-mono)",
                                                    }}
                                                />
                                            </form>
                                        ) : (
                                            <CodeEditor
                                                value={config.config}
                                                language="yaml"
                                                readOnly
                                                padding={13}
                                                className="rounded-md border border-input shadow-xs"
                                                style={{
                                                    backgroundColor: "var(--muted)",
                                                    fontFamily: "var(--font-mono)",
                                                }}
                                            />
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </React.Fragment>
                );
            })}
            {deleteDialogOpen && (
                <AlertDialog open={deleteDialogOpen !== null} onOpenChange={(open) => !open && setDeleteDialogOpen(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Are you sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete <strong>{configs.find(c => c.id === deleteDialogOpen)?.name}</strong>. This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setDeleteDialogOpen(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => handleDelete(deleteDialogOpen)}
                                disabled={isPending}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
}