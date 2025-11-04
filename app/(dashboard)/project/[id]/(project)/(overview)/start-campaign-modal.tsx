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
import { Corpus, getCorpus } from "@/lib/actions/corpus"

interface StartCampaignModalProps {
    projectId: string
    onCampaignCreated?: (campaign: Campaign) => void
}

export function StartCampaignModal({ projectId, onCampaignCreated }: StartCampaignModalProps) {
    const [configs, setConfigs] = useState<Config[]>([])
    const [loadingConfigs, setLoadingConfigs] = useState(true)
    const [corpus, setCorpus] = useState<Corpus[]>([])
    const [loadingCorpus, setLoadingCorpus] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function fetchConfigs() {
            setLoadingConfigs(true)
            const response = await getConfigs({ project_id: projectId })

            if (response.success && response.configs) {
                setConfigs(response.configs)
            } else {
                setConfigs([])
            }
            setLoadingConfigs(false)
        }

        if (open) {
            fetchConfigs()
        }
    }, [projectId, open])

    useEffect(() => {
        async function fetchCorpus() {
            setLoadingCorpus(true)

            const response = await getCorpus({ project_id: projectId })
            if (response.success && response.corpus) {
                setCorpus(response.corpus)
            } else {
                setCorpus([])
            }

            setLoadingCorpus(false)
        }

        if (open) {
            fetchCorpus()
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
        const saveCorpus = formData.get("save-corpus") as string
        const corpusId = formData.get("corpus") as string
        const dstCorpusName = formData.get("dst-corpus-name") as string

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
            corpus_reused: !!corpusId,
            corpus_saved: saveCorpus === "yes",
            src_corpus_id: corpusId || undefined,
            dst_corpus_name: dstCorpusName || undefined,
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
            <DialogContent className="sm:max-w-[430px]">
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
                                        <SelectValue placeholder="Branch" />
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
                                    placeholder="Minutes"
                                    min="1"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="config">Config</Label>
                            <Select name="config" required disabled={loadingConfigs}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={loadingConfigs ? "Loading configs..." : "Select a config"} />
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
                        <div className="grid gap-3">
                            <Label htmlFor="save-corpus">Save Corpus</Label>
                            <Select name="save-corpus" defaultValue="no">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="dst-corpus-name">Corpus Name</Label>
                            <Input
                                id="dst-corpus-name"
                                name="dst-corpus-name"
                                placeholder="Enter the corpus name..."
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="corpus">Corpus (optional)</Label>
                            <Select name="corpus" disabled={loadingCorpus}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={loadingCorpus ? "Loading corpus..." : "Select a corpus"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {corpus.length > 0 ? (
                                        corpus.map((corpus) => (
                                            <SelectItem key={corpus.corpus_id} value={corpus.corpus_id}>
                                                {corpus.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="no-configs" disabled>
                                            No corpus available
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter className="mt-6">
                        <DialogClose asChild>
                            <Button variant="outline" type="button" disabled={isSubmitting}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting || loadingConfigs}>
                            {isSubmitting ? "Starting..." : "Start Campaign"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}