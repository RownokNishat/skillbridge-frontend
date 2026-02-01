import HeroSection from "@/components/modules/homepage/HeroSection";
import FeaturedTutorsSection from "@/components/modules/homepage/FeaturedTutorsSection";
import CategoriesSection from "@/components/modules/homepage/CategoriesSection";
import HowItWorksSection from "@/components/modules/homepage/HowItWorksSection";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedTutorsSection />
      <CategoriesSection />
      <HowItWorksSection />
    </main>
  );
}
