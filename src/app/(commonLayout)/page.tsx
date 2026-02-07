import HeroSection from "@/components/modules/homepage/HeroSection";
import FeaturedTutorsSection from "@/components/modules/homepage/FeaturedTutorsSection";
import CategoriesSection from "@/components/modules/homepage/CategoriesSection";
import HowItWorksSection from "@/components/modules/homepage/HowItWorksSection";
import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";

export default async function Home() {
  // Fetch featured tutors from backend
  const { data: tutorsResponse } = await tutorService.getFeaturedTutors({
    cache: "no-store",
  });
  const featuredTutors = tutorsResponse?.data || [];

  // Fetch categories from backend
  const { data: categoriesResponse } = await categoryService.getAllCategories({
    revalidate: 3600, // Revalidate every hour
  });
  const categories = categoriesResponse?.data || [];

  return (
    <main>
      <HeroSection />
      <FeaturedTutorsSection tutors={featuredTutors} />
      <CategoriesSection categories={categories} />
      <HowItWorksSection />
    </main>
  );
}
