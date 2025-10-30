import { TreeObject } from "@/lib/actions/tree";

export type TreeNode = {
    id: string
    name: string
    isSelectable?: boolean
    children?: TreeNode[]
}

export function buildTree(tree: TreeObject[]): TreeNode[] {
    const root: Record<string, TreeNode> = {};

    const allNodes: Record<string, TreeNode> = {};

    for (const item of tree) {
        const parts = item.path.split("/");
        let currentPath = "";
        let parentNode: TreeNode | undefined;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            currentPath = currentPath ? `${currentPath}/${part}` : part;

            if (!allNodes[currentPath]) {
                const node: TreeNode = {
                    id: currentPath,
                    name: part,
                    isSelectable: true,
                    children: [],
                };
                allNodes[currentPath] = node;

                if (i === 0) {
                    root[part] = root[part] || node;
                } else if (parentNode) {
                    parentNode.children = parentNode.children || [];
                    parentNode.children.push(node);
                }
            }

            parentNode = allNodes[currentPath];
        }
    }

    return Object.values(root);
}