export const dynamic = "force-dynamic";

import CTA from "@/components/modules/home/CTA";
import FeaturedTutors from "@/components/modules/home/FeaturedTutors";
import { Hero } from "@/components/modules/home/Hero";
import HowItWorksWithImages from "@/components/modules/home/HowItWorks";

export default async function Home() {

  return (
    <div>
      <Hero />
      <FeaturedTutors />
      <HowItWorksWithImages />
      <CTA />
    </div>
  );
}

