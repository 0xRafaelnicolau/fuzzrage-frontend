import { acceptInvite } from "@/lib/actions/team";
import { notFound, redirect } from "next/navigation";

export default async function Page({
    searchParams
}: {
    searchParams: { project_id?: string, code?: string };
}) {
    const { project_id, code } = await searchParams;
    if (!project_id || !code) {
        notFound();
    }

    const result = await acceptInvite({
        project_id: project_id,
        invite_code: code
    });

    if (result.success) {
        redirect(`/project/${project_id}`);
    } else {
        throw new Error("Failed to accept invite");
    }
}