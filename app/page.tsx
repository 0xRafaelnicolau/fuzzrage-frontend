import Link from "next/link";
import {
  Cloud,
  Brain,
  GitBranch,
  Share2,
  Bug,
  Database
} from "lucide-react";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { BentoCard, BentoGrid } from "@/components/ui/cards/bento-grid";
import { cookies } from "next/headers";

export default async function Page() {
  const store = await cookies();
  const token = store.get('jwt')?.value;

  const buttons = (
    <>
      {/* <ThemeToggle /> */}
      {token ? <Link href="/dashboard">
        <Button variant="outline" size="icon" className="w-26">Dashboard</Button>
      </Link> : (
        <Link href="/login">
          <Button variant="outline" size="icon" className="w-18">Log In</Button>
        </Link>
      )}
    </>
  );

  const features = [
    {
      Icon: Cloud,
      name: "Cloud Fuzzing",
      description: "Run continuous fuzz testing in the cloud with your Echidna powered codebase.",
      href: "#cloud-fuzzing",
      cta: "Learn more",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: Share2,
      name: "Shareable Reports",
      description: "Generate sharable fuzzing reports with key insights to streamline collaboration.",
      href: "#shareable-campaigns",
      cta: "Learn more",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3" />,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    },
    {
      Icon: Bug,
      name: "Interactive Debugging",
      description: "Quickly understand failed invariants through an interactive call stack.",
      href: "#interactive-debugging",
      cta: "Learn more",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3" />,
      className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    },
    {
      Icon: GitBranch,
      name: "CI/CD Integration",
      description: "Add invariant checks directly into your CI/CD pipeline and AI insights when properties fail.",
      href: "#cicd-testing",
      cta: "Learn more",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
    },
    {
      Icon: Brain,
      name: "AI-Powered Invariant Discovery",
      description: "Leverage AI to help you identify invariants in your smart contracts.",
      href: "#ai-invariants",
      cta: "Learn more",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3" />,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3",
    },
    {
      Icon: Database,
      name: "Corpus Management",
      description: "Reuse corpus data to reproduce bugs and verify that fixes remain effective over time.",
      href: "#corpus-management",
      cta: "Learn more",
      background: <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3" />,
      className: "lg:col-start-3 lg:col-end-4 lg:row-start-3 lg:row-end-4",
    }
  ];

  return (
    <main>
      {/* Navbar */}
      <Navbar buttons={buttons} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-48">
        <div className="absolute inset-0 w-full overflow-hidden rounded-lg bg-background">
          <FlickeringGrid
            className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#0B54C7"
            maxOpacity={0.5}
            flickerChance={1}
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight py-2">
            Welcome to Fuzzrage
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate smart contract security platform with AI-powered fuzz testing, interactive debugging, and seamless CI/CD integration for Solidity developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup">
              <Button variant="outline" size="lg" className="text-base px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-base px-8 py-3">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center justify-center h-full">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Advanced Fuzzing Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the complete toolkit for smart contract security testing with AI-powered insights and collaborative workflows.
            </p>
          </div>

          <BentoGrid>
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </div>
      </section>
    </main>
  );
}