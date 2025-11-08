import { Brain, Users, Plug, Globe, Code, Database } from "lucide-react";
import { Icons } from "../ui/icons";

export const siteConfig = {
    name: "fuzzrage",
    description: "Discover vulnerabilities in your smart contracts with AI-powered Invariant Testing",
    cta: "Get Started",
    hero: {
        description: "Discover vulnerabilities in your smart contracts with AI-powered invariant testing, interactive debugging, and seamless CI/CD integration.",
        cta: "Get Started",
        docs: "Learn More",
        info: "Available for Echidna projects."
    },
    features: [
        {
            name: "AI-powered Invariants",
            description:
                "Leverage AI to easily identify invariants in your smart contracts.",
            icon: <Brain className="h-6 w-6" />,
        },
        {
            name: "Team Collaboration",
            description:
                "Collaborate with your team to identify and fix bugs in your smart contracts.",
            icon: <Users className="h-6 w-6" />,
        },
        {
            name: "CI/CD Integration",
            description:
                "Seamlessly integrate with your CI/CD pipeline to trigger fuzzing campaigns.",
            icon: <Plug className="h-6 w-6" />,
        },
        {
            name: "Cross-Framework Support",
            description:
                "Available for all major smart contract frameworks for maximum flexibility.",
            icon: <Globe className="h-6 w-6" />,
        },
        {
            name: "Interactive Debugging",
            description:
                "Debug your smart contracts with interactive tools to identify and fix bugs.",
            icon: <Code className="h-6 w-6" />,
        },
        {
            name: "Corpus Management",
            description:
                "Manage the corpus of fuzzing campaigns to reproduce historical test scenarios.",
            icon: <Database className="h-6 w-6" />,
        },
    ],
    pricing: [
        {
            name: "Basic",
            price: { monthly: "$0", yearly: "$0" },
            frequency: { monthly: "month", yearly: "year" },
            description: "Perfect for security researchers and small projects.",
            features: [
                "CI/CD integration",
                "500 fuzzing minutes per month",
                "Up to 1 campaign at a time",
                "1GB of corpus storage capacity",
                "1 collaborator",
                "1 repository",
            ],
            cta: "Get Started",
        },
        {
            name: "Pro",
            price: { monthly: "$99", yearly: "$899" },
            frequency: { monthly: "month", yearly: "year" },
            description: "Ideal for bug hunters and protocol developers.",
            features: [
                "CI/CD integration",
                "AI-powered invariant discovery",
                "10k fuzzing minutes per month",
                "Up to 2 campaigns at a time",
                "10GB of corpus storage capacity",
                "5 collaborators",
                "10 repositories",
            ],
            popular: true,
            cta: "Get Started",
        },
        {
            name: "Enterprise",
            price: { monthly: "$299", yearly: "$2699" },
            frequency: { monthly: "month", yearly: "year" },
            description: "Tailored solutions for large organizations.",
            features: [
                "CI/CD integration",
                "AI-powered invariant discovery",
                "50k fuzzing minutes per month",
                "Up to 5 campaigns at a time",
                "100GB of corpus storage capacity",
                "Unlimited collaborators",
                "Unlimited repositories",
            ],
            cta: "Get Started",
        },
    ],
    footer: {
        socialLinks: [
            {
                icon: <Icons.github className="h-5 w-5" />,
                url: "https://github.com/coveragelabs",
            },
            {
                icon: <Icons.twitter className="h-5 w-5" />,
                url: "https://x.com/coverage_labs",
            },
        ],
        links: [
            { text: "Learn More", url: "/docs" },
            { text: "Pricing", url: "/pricing" },
            { text: "Contact", url: "/contact" },
        ],
        bottomText: "© 2025 Coverage Labs. All rights reserved.",
    },
}