interface DashboardFooterProps {
    copyright?: string;
    bottomLinks?: {
        text: string;
        url: string;
    }[];
}

const DashboardFooter = ({
    copyright = "© 2025 Coverage Labs. All rights reserved.",
    bottomLinks = [
        { text: "Terms and Conditions", url: "#" },
        { text: "Privacy Policy", url: "#" },
    ],
}: DashboardFooterProps) => {
    return (
        <div className="w-full">
            <section>
                <div className="w-full border-t">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6">
                        <footer>
                            <div className="text-muted-foreground flex flex-col justify-between gap-3 text-xs font-medium md:flex-row md:items-center">
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

export { DashboardFooter };
