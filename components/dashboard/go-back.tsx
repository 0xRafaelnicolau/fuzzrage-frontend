import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoBack({ title, description, href }: { title: string, description: string, href: string }) {
    return (
        <div className="flex items-center gap-4">
            <Link href={href}>
                <Button variant="outline" size="sm" className="p-2 h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
            <div>
                <h1 className="text-xl font-semibold">{title}</h1>
                <p className="text-muted-foreground text-sm">
                    {description}
                </p>
            </div>
        </div>
    )
}       