import FeaturedTutors from "@/components/modules/home/FeaturedTutors";
import { Hero } from "@/components/modules/home/Hero";
import HowItWorksWithImages from "@/components/modules/home/HowItWorks";

export default async function Home() {

  return (
    <div className="">
      <Hero />
      <FeaturedTutors />
      <HowItWorksWithImages />
    </div>
  );
}

