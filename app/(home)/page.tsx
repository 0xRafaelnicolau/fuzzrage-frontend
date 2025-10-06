import { HomeHeader } from "@/components/home/sections/home-header";
import { Hero } from "@/components/home/sections/hero";
import { Logos } from "@/components/home/sections/logos";
import { UseCases } from "@/components/home/sections/use-cases";

export default function Home() {
  return (
    <main>
      <HomeHeader />
      <Hero />
      <Logos />
      <UseCases />
    </main>
  );
}
