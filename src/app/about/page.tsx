import { AboutHero } from "@/src/components/about/about-hero";
import { TeamSection } from "@/src/components/about/team-section";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-16">
        <AboutHero />
        <TeamSection />
        </div>
  );
}