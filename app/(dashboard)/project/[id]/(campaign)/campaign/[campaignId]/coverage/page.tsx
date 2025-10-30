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

export default function Page() {
    const params = useParams();
    const projectId = params.id as string;
    const campaignId = params.campaignId as string;

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
    }, []);

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
                    toast.error(result.error?.message || 'Failed to fetch coverage');
                };
            };

            setLoadingCoverage(false);
        }

        fetchCoverage();
    }, [filename]);

    const renderTree = (nodes: any[]) =>
        nodes.map((node) =>
            node.children && node.children.length > 0 ? (
                <Folder key={node.id} value={node.id} element={node.name} className="text-muted-foreground">
                    {renderTree(node.children)}
                </Folder>
            ) : (
                <File
                    key={node.id}
                    value={node.id}
                    className="text-muted-foreground"
                    handleSelect={() => setFilename(node.id)}
                >
                    <p>{node.name}</p>
                </File>
            )
        )

    return (
        <>
            <div className="p-3">
                <div className="flex flex-col lg:flex-row relative">
                    <div className="w-full lg:w-1/4 lg:pr-6 mb-6 lg:mb-0">
                        <div className="lg:sticky lg:top-0">
                            <div className="">
                                <h2 className="text-lg font-semibold">Tree</h2>
                            </div>
                            <div className="mt-2">
                                <div className="lg:hidden">
                                    {loadingTree ? (
                                        <div className="flex justify-center items-center py-16">
                                            <Spinner variant="default" className="text-muted-foreground" />
                                        </div>
                                    ) : (
                                        <Tree className="overflow-auto" elements={tree}>
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
                                        <Tree className="overflow-auto" elements={tree}>
                                            {renderTree(tree)}
                                        </Tree>
                                    )}
                                </ScrollArea>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/4 lg:pl-4">
                        <h2 className="text-lg font-semibold">Coverage</h2>
                        {loadingCoverage ? (
                            <div className="flex justify-center items-center py-16">
                                <Spinner variant="default" className="text-muted-foreground" />
                            </div>
                        ) : (
                            <div className="mt-2">
                                <div className="lg:hidden">
                                    <div className="bg-background flex flex-col text-xs">
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
                                        <div dangerouslySetInnerHTML={{ __html: coverage?.content || '' }}></div>
                                    </div>
                                </div>
                                <ScrollArea className="hidden lg:block lg:h-[calc(100vh-16rem)]">
                                    <div className="bg-background flex flex-col text-xs">
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
                                        <div dangerouslySetInnerHTML={{ __html: coverage?.content || '' }}></div>
                                    </div>
                                </ScrollArea>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}