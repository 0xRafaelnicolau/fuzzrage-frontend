"use client";

import { GetTreeRequest, getTree } from "@/lib/actions/tree";
import { Coverage, GetCoverageRequest, getCoverage } from "@/lib/actions/coverage";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { TreeNode, buildTree } from "@/lib/build-tree";
import { Folder, File, Tree } from "@/components/ui/file-tree";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { Campaign, GetCampaignRequest, getCampaign } from "@/lib/actions/campaigns";

const options = [
    { value: "SUCCEEDED", label: "Succeeded", color: "bg-green-500" },
    { value: "FAILED", label: "Failed", color: "bg-red-500" },
    { value: "RUNNING", label: "Running", color: "bg-orange-500" },
    { value: "QUEUED", label: "Queued", color: "bg-yellow-500" },
    { value: "CANCELLED", label: "Canceled", color: "bg-gray-400" },
];

export default function Page() {
    const params = useParams();
    const projectId = params.id as string;
    const campaignId = params.campaignId as string;


    // Campaign
    const [campaign, setCampaign] = useState<Campaign>();
    const [loadingCampaign, setLoadingCampaign] = useState(false);

    useEffect(() => {
        const fetchCampaign = async () => {
            setLoadingCampaign(true);

            const request: GetCampaignRequest = {
                project_id: projectId,
                campaign_id: campaignId,
            };

            const result = await getCampaign(request);
            if (result.success && result.campaign) {
                setCampaign(result.campaign);
            } else {
                toast.error(result.error?.message || 'Failed to fetch campaign');
            }

            setLoadingCampaign(false);
        }

        fetchCampaign();
    }, [projectId, campaignId]);

    // Tree
    const [tree, setTree] = useState<TreeNode[]>([]);
    const [loadingTree, setLoadingTree] = useState(false);

    useEffect(() => {
        const fetchTree = async () => {
            setLoadingTree(true);

            const request: GetTreeRequest = {
                project_id: projectId,
                campaign_id: campaignId,
            };

            const result = await getTree(request);
            if (result.success && result.treeObjects) {
                const tree: TreeNode[] = buildTree(result.treeObjects);
                setTree(tree);
            } else {
                toast.error(result.error?.message || 'Failed to fetch tree');
            }

            setLoadingTree(false);
        };

        fetchTree();
    }, [projectId, campaignId]);

    // Coverage
    const [coverage, setCoverage] = useState<Coverage | null>(null);
    const [loadingCoverage, setLoadingCoverage] = useState(false);
    const [filename, setFilename] = useState<string>("");

    useEffect(() => {
        const fetchCoverage = async () => {
            setLoadingCoverage(true);
            setCoverage(null);

            if (filename !== "") {
                const request: GetCoverageRequest = {
                    project_id: projectId,
                    campaign_id: campaignId,
                    filename: filename,
                };

                const result = await getCoverage(request);
                if (result.success && result.coverage) {
                    setCoverage(result.coverage);
                } else {
                    toast.error('Coverage report not available for this file.');
                };
            };

            setLoadingCoverage(false);
        }

        fetchCoverage();
    }, [filename]);

    const renderTree = (nodes: TreeNode[]) =>
        nodes.map((node: TreeNode) =>
            node.children && node.children.length > 0 ? (
                <Folder key={node.id} value={node.id} element={node.name}>
                    {renderTree(node.children)}
                </Folder>
            ) : (
                <File
                    key={node.id}
                    value={node.id}
                    handleSelect={() => setFilename(node.id)}
                >
                    <p>{node.name}</p>
                </File>
            )
        );

    return (
        <>
            {loadingCampaign ? (
                <div className="flex justify-center items-center py-16">
                    <Spinner variant="default" className="text-muted-foreground" />
                </div>
            ) : (
                <>
                    {campaign && (
                        <>
                            {(campaign.attributes.state === "SUCCEEDED" ||
                                campaign.attributes.state === "FAILED" ||
                                campaign.attributes.state === "CANCELLED") && (
                                    <div className="p-3">
                                        <div className="flex flex-col lg:flex-row relative">
                                            <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                                                <div className="lg:sticky lg:top-0">
                                                    <div className="">
                                                        <h2 className="text-lg font-semibold">Tree</h2>
                                                    </div>
                                                    <div className="bg-background border rounded-md mt-2">
                                                        <div className="lg:hidden">
                                                            {loadingTree ? (
                                                                <div className="flex justify-center items-center py-16">
                                                                    <Spinner variant="default" className="text-muted-foreground" />
                                                                </div>
                                                            ) : (
                                                                <Tree className="p-2 mt-1 overflow-auto" elements={tree}>
                                                                    {renderTree(tree)}
                                                                </Tree>
                                                            )}
                                                        </div>
                                                        <ScrollArea className="hidden lg:block lg:h-[calc(100vh-16rem)]">
                                                            {loadingTree ? (
                                                                <div className="flex justify-center items-center py-16">
                                                                    <Spinner variant="default" className="text-muted-foreground" />
                                                                </div>
                                                            ) : (
                                                                <Tree className="p-2 mt-1 overflow-auto" elements={tree}>
                                                                    {renderTree(tree)}
                                                                </Tree>
                                                            )}
                                                        </ScrollArea>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full lg:w-3/4 lg:pl-4">
                                                <div className="flex items-center justify-between">
                                                    <h2 className="text-lg font-semibold">Coverage</h2>
                                                    {coverage?.percentage != null && (
                                                        <ProgressCircle value={(coverage?.percentage || 0) * 100} className="size-7" />
                                                    )}
                                                </div>
                                                <div className="bg-background border rounded-md mt-2">
                                                    <div className="lg:hidden">
                                                        {loadingCoverage ? (
                                                            <div className="flex justify-center items-center py-16">
                                                                <Spinner variant="default" className="text-muted-foreground" />
                                                            </div>
                                                        ) : (
                                                            <div className="bg-background flex flex-col text-xs mt-2">
                                                                <style>{`
                                        code { 
                                            white-space: pre-wrap; 
                                            display: block; 
                                            background-color: bg-background; 
                                        }
                                        .executed { 
                                            background-color: #306B34; 
                                        }
                                        .reverted { 
                                            background-color: #FFD100; 
                                        }
                                        .unexecuted { 
                                            background-color: #8B0000; 
                                        }
                                        .neutral { 
                                            background-color: bg-background; 
                                        }
                                    `}</style>
                                                                {coverage?.content ? (
                                                                    <div dangerouslySetInnerHTML={{ __html: coverage?.content }}></div>
                                                                ) : (
                                                                    <div className="flex justify-center items-center py-16 text-muted-foreground text-base">No file selected.</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <ScrollArea className="hidden lg:block lg:h-[calc(100vh-16rem)]">
                                                        {loadingCoverage ? (
                                                            <div className="flex justify-center items-center py-16">
                                                                <Spinner variant="default" className="text-muted-foreground" />
                                                            </div>
                                                        ) : (
                                                            <div className="bg-background flex flex-col text-xs mt-2">
                                                                <style>{`
                                        code { 
                                            white-space: pre-wrap; 
                                            display: block; 
                                            background-color: bg-background; 
                                        }
                                        .executed { 
                                            background-color: #306B34; 
                                        }
                                        .reverted { 
                                            background-color: #FFD100; 
                                        }
                                        .unexecuted { 
                                            background-color: #8B0000; 
                                        }
                                        .neutral { 
                                            background-color: bg-background; 
                                        }
                                    `}</style>
                                                                {coverage?.content ? (
                                                                    <div dangerouslySetInnerHTML={{ __html: coverage?.content }}></div>
                                                                ) : (
                                                                    <div className="flex justify-center items-center py-16 text-muted-foreground text-base">No file selected.</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </ScrollArea>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                )}

                            {(campaign.attributes.state === "RUNNING" ||
                                campaign.attributes.state === "QUEUED") && (
                                    <div className="p-3">
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <div className="flex items-center gap-2">
                                                <h1 className="text-2xl font-bold">
                                                    {options.find(opt => opt.value === campaign.attributes.state)?.label ??
                                                        campaign.attributes.state}
                                                </h1>
                                            </div>
                                            <p className="text-sm mt-1 text-muted-foreground">
                                                Properties will be available once the campaign has finished.
                                            </p>
                                        </div>
                                    </div>
                                )}
                        </>
                    )}
                </>
            )}
        </>
    );
}