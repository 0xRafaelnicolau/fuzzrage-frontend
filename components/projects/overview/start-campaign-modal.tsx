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

interface StartCampaignModalProps {
    projectId: string
}

export async function StartCampaignModal({ projectId }: StartCampaignModalProps) {
    const response = await getConfigs({ project_id: projectId })

    let configs: Config[] = []
    if (response.success && response.configs) {
        configs = response.configs
    } else {
        configs = []
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default" size="icon" className="gap-1.25 md:size-auto md:h-9 md:px-4 md:py-2 md:has-[>svg]:px-3">
                        <CirclePlus className="h-4 w-4" />
                        <span className="hidden md:inline">Start Campaign</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Start Campaign</DialogTitle>
                        <DialogDescription>
                            Configure the campaign settings below.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 mt-2 mb-2">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="git-branch">Branch</Label>
                                <Select name="git-branch">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a branch" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="main">main</SelectItem>
                                        <SelectItem value="develop">master</SelectItem>
                                        <SelectItem value="feature/new-feature">security-review</SelectItem>
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
                                />
                            </div>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="config">Config</Label>
                            <Select name="config">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a config" />
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
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="entrypoint">Entrypoint</Label>
                            <Input
                                id="entrypoint"
                                name="entrypoint"
                                placeholder="Enter the entrypoint..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Start Campaign</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}