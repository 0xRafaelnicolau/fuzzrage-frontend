import { siteConfig } from "@/components/home/config";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Footer() {
    return (
        <footer className="flex flex-col gap-y-5 rounded-lg p-5 container max-w-[var(--container-max-width)] mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center -ml-3">
                    <Link
                        href="/"
                        title="brand-logo"
                        className="relative flex items-center"
                    >
                        <Logo className="w-auto" />
                    </Link>
                </div>

                <div className="flex gap-x-2">
                    {siteConfig.footer.socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            className="flex h-4 w-4 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex flex-col justify-between gap-y-5 md:flex-row md:items-center">
                <ul className="flex flex-col gap-x-5 gap-y-2 text-muted-foreground md:flex-row md:items-center">
                    {siteConfig.footer.links.map((link, index) => (
                        <li
                            key={index}
                            className="text-xs font-medium text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
                        >
                            <a href={link.url}>{link.text}</a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center justify-between text-xs font-medium tracking-tight text-muted-foreground">
                    <p>{siteConfig.footer.bottomText}</p>
                </div>
            </div>
        </footer>
    );
}
