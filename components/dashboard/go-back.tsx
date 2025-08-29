import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GoBack({
    title,
    description,
    href,
    buttons
}: {
    title: string,
    description: string,
    href: string,
    buttons?: React.ReactNode[]
}) {
    return (
        <div className="flex items-center justify-between">
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
            {buttons && buttons.length > 0 && (
                <div className="flex items-center gap-2">
                    {buttons.map((button, index) => (
                        <div key={index}>
                            {button}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}       