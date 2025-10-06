interface FooterProps {
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
}

const Footer = ({
    copyright = "© 2025 Coverage Labs. All rights reserved.",
    bottomLinks = [],
}: FooterProps) => {
    return (
        <div className="w-full bg-background relative z-20">
            <section>
                <div className="w-full border-t">
                    <div className="container mx-auto p-5 pt-6 pb-6">
                        <footer>
                            <div className="text-muted-foreground flex flex-col justify-center text-xs font-medium md:flex-row md:justify-between md:items-center">
                                <p>{copyright}</p>
                                <ul className="flex gap-3">
                                    {bottomLinks.map((link, linkIdx) => (
                                        <li key={linkIdx} className="hover:text-primary underline">
                                            <a href={link.url}>{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </footer>
                    </div>
                </div>
            </section>
        </div>
    );
};

export { Footer };