import { HomeHeader } from "@/components/home/sections/home-header";
import { Hero } from "@/components/home/sections/hero";
import { Logos } from "@/components/home/sections/logos";
import { UseCases } from "@/components/home/sections/use-cases";
import { Features } from "@/components/home/sections/features";
import { Pricing } from "@/components/home/sections/pricing";
import { CTA } from "@/components/home/sections/cta";
import { Footer } from "@/components/home/sections/footer";

export default function Home() {
  return (
    <main>
      <HomeHeader />
      <Hero />
      {/* <Logos /> */}
      <UseCases />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
