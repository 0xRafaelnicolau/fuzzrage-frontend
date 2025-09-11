import Link from "next/link";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Navbar } from "@/components/ui/navigation/navbar";
import { Button } from "@/components/ui/button";
import { getToken } from "@/lib/actions/helpers";

export default async function Page() {
  const token = await getToken();

  const buttons = (
    <>
      {token ? <Link href="/dashboard">
        <Button variant="outline" size="icon" className="w-26">Dashboard</Button>
      </Link> : (
        <Link href="/login">
          <Button variant="outline" size="icon" className="w-18">Log In</Button>
        </Link>
      )}
    </>
  );

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
              <Button variant="default" size="lg" className="text-base px-8 py-3">
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

      </section>
    </main >
  );
}