"use client";

import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { deleteUser, User } from "@/lib/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export function DeleteUserCard({ user }: { user: User }) {
    const router = useRouter();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");


    const handleDeleteUser = async () => {
        const response = await deleteUser();
        if (response.success) {
            toast.success('User deleted successfully');
            router.push('/');
        } else {
            toast.error(response.error?.message || 'Failed to delete user');
        }
    }

    return (
        <>
            <Card className="w-full mt-6">
                <CardHeader>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <CardTitle>Delete Account</CardTitle>
                            <CardDescription>
                                Permanently delete your account and all of your data.
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
                            This will permanently delete your account and all of your data. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <div className="space-y-4">
                            <Label htmlFor="confirmation-name">
                                Please type <strong>{user?.name}</strong> to confirm:
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
                            disabled={confirmationText !== user?.name}
                            onClick={handleDeleteUser}
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}