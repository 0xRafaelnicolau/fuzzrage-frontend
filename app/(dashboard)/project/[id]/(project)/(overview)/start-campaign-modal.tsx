"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CirclePlus } from 'lucide-react'
import { Config, getConfigs } from "@/lib/actions/configs"
import { createCampaign, Campaign } from "@/lib/actions/campaigns"
import { toast } from "sonner"

interface StartCampaignModalProps {
    projectId: string
    onCampaignCreated?: (campaign: Campaign) => void
}

export function StartCampaignModal({ projectId, onCampaignCreated }: StartCampaignModalProps) {
    const [configs, setConfigs] = useState<Config[]>([])
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchConfigs() {
            setLoading(true)
            const response = await getConfigs({ project_id: projectId })

            if (response.success && response.configs) {
                setConfigs(response.configs)
            } else {
                setConfigs([])
            }
            setLoading(false)
        }

        if (open) {
            fetchConfigs()
        }
    }, [projectId, open])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const branch = formData.get("git-branch") as string
        const duration = parseInt(formData.get("duration") as string)
        const configId = parseInt(formData.get("config") as string)
        const contractName = formData.get("contract") as string
        const entryPoint = formData.get("entrypoint") as string

        if (!branch || !duration || !configId || !contractName || !entryPoint) {
            toast.error("Please fill in all fields")
            setIsSubmitting(false)
            return
        }

        const result = await createCampaign({
            project_id: projectId,
            branch,
            config_id: configId,
            contract_name: contractName,
            duration,
            entry_point: entryPoint,
        })

        if (result.success) {
            toast.success("Campaign started successfully")
            if (result.campaign && onCampaignCreated) {
                onCampaignCreated(result.campaign)
            }
            setOpen(false)
        } else {
            toast.error(result.error?.message || "Failed to start campaign")
        }

        setIsSubmitting(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="icon" className="gap-1.25 md:size-auto md:h-9 md:px-4 md:py-2 md:has-[>svg]:px-3">
                    <CirclePlus className="h-4 w-4" />
                    <span className="hidden md:inline">Start Campaign</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Start Campaign</DialogTitle>
                        <DialogDescription>
                            Configure the campaign settings below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 mt-4 mb-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="git-branch">Branch</Label>
                                <Select name="git-branch" required>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="main">main</SelectItem>
                                        <SelectItem value="develop">master</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="duration">Duration</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    type="number"
                                    placeholder="Enter duration"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="config">Config</Label>
                            <Select name="config" required disabled={loading}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={loading ? "Loading configs..." : "Select a config"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {configs.length > 0 ? (
                                        configs.map((config) => (
                                            <SelectItem key={config.id} value={config.id}>
                                                {config.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="no-configs" disabled>
                                            No configs available
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="contract">Contract</Label>
                            <Input
                                id="contract"
                                name="contract"
                                placeholder="Enter the contract..."
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="entrypoint">Entrypoint</Label>
                            <Input
                                id="entrypoint"
                                name="entrypoint"
                                placeholder="Enter the entrypoint..."
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting || loading}>
                            {isSubmitting ? "Starting..." : "Start Campaign"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}