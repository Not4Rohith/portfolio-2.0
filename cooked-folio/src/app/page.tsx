import { Container } from "@/components/common/Container";
import { Hero } from "@/components/layout/Hero";
import { ActivitySection } from "@/components/integrations/ActivitySection";
import { ExperienceList } from "@/components/sections/ExperienceList";
import { EducationList } from "@/components/sections/EducationList";
import { StackList } from "@/components/sections/StackList";
import { ProjectList } from "@/components/sections/ProjectList";
import { GithubActivityCard } from "@/components/integrations/GithubActivityCard";
import { Footer } from "@/components/layout/Footer";
import { AnimatedSection } from "@/lib/animations";
import { constructMetadata } from "@/lib/site-config";
//
import { LeetcodeActivityCard } from "@/components/integrations/LeetcodeActivityCard";

export const metadata = constructMetadata({
  title: "rohith.portfolio",
  description: "Aspiring software Engineer | Computer Science Student",
});

export const revalidate = 60;

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <Container>
        <Hero />
        <AnimatedSection delay={0.05}>
          <ActivitySection />
        </AnimatedSection>
        <hr />
        <br />
        <AnimatedSection delay={0}>
          <ExperienceList />
        </AnimatedSection>
        <hr />
        <br />
        <AnimatedSection delay={0}>
          <EducationList />
        </AnimatedSection>
        <hr />
        <br />
        <AnimatedSection delay={0}>
          <StackList />
        </AnimatedSection>
        <hr />
        <br />
        <AnimatedSection delay={0}>
          <ProjectList />
        </AnimatedSection>
        <hr />
        <br />
        <AnimatedSection delay={0}>
          <GithubActivityCard />
        </AnimatedSection>
        <br />
        <hr />
        <br />
        <AnimatedSection delay={0}>
          <LeetcodeActivityCard />
        </AnimatedSection>
        
        <AnimatedSection delay={0}>
          <Footer />
        </AnimatedSection>
      </Container>
    </div>
  );
}
