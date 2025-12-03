interface FooterProps {
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
    socialLinks?: {
        icon: React.ReactNode;
        url: string;
    }[];
}

const Footer = ({
    copyright = "© 2025 Coverage Labs. All rights reserved.",
    bottomLinks = [],
    socialLinks = [],
}: FooterProps) => {
    return (
        <div className="w-full bg-background relative z-20">
            <section>
                <div className="w-full border-t">
                    <div className="container mx-auto p-5 pt-6 pb-6">
                        <footer>
                            <div className="text-muted-foreground flex flex-col justify-center text-xs font-medium md:flex-row md:justify-between md:items-center gap-4">
                                <p>{copyright}</p>
                                <div className="flex items-center gap-4">
                                    {socialLinks.length > 0 && (
                                        <div className="flex gap-x-2">
                                            {socialLinks.map((link, index) => (
                                                <a
                                                    key={index}
                                                    href={link.url}
                                                    className="flex h-4 w-4 items-center justify-center text-muted-foreground transition-all duration-100 ease-linear hover:text-foreground hover:underline hover:underline-offset-4"
                                                >
                                                    {link.icon}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                    <ul className="flex gap-3">
                                        {bottomLinks.map((link, linkIdx) => (
                                            <li key={linkIdx} className="hover:text-primary underline">
                                                <a href={link.url}>{link.text}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </section>
        </div>
    );
};

export { Footer };