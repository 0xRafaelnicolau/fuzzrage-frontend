// team-list-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/cards/card";

export function TeamListSkeleton() {
    return (
        <Card className="w-full mt-6">
            <CardHeader>
                <CardTitle>
                    <Skeleton className="h-5 w-28" />
                </CardTitle>
                <CardDescription>
                    <Skeleton className="h-4 w-72" />
                </CardDescription>
            </CardHeader>
            <div className="-mb-6">
                <Table>
                    <TableBody>
                        <TableRow className="hover:bg-muted/50 border-t">
                            <TableCell className="w-16 pl-5 border-t">
                                <Skeleton className="h-7 w-7 rounded-full" />
                            </TableCell>
                            <TableCell className="font-medium pl-0 border-t">
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-4 w-28" />
                                    <Skeleton className="h-3 w-14" />
                                </div>
                            </TableCell>
                            <TableCell className="w-24 text-right border-t">
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}