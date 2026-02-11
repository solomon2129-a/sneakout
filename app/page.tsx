import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { CultureSection } from "@/components/CultureSection";
import { ChaosSection } from "@/components/ChaosSection";
import { RoleSection } from "@/components/RoleSection";
import { ProvidersSection } from "@/components/ProvidersSection";
import { AttendeesSection } from "@/components/AttendeesSection";
import { ProofSection } from "@/components/ProofSection";
import { BelongingSection } from "@/components/BelongingSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-primary overflow-x-hidden">
      <Navbar />
      <Hero />
      <CultureSection />
      <ChaosSection />
      <RoleSection />
      <ProvidersSection />
      <AttendeesSection />
      <ProofSection />
      <BelongingSection />
      <Footer />
    </main>
  );
}
