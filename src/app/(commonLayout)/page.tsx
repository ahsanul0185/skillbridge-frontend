import FeaturedTutors from "@/components/modules/home/FeaturedTutors";
import { Hero } from "@/components/modules/home/Hero";

export default async function Home() {

  return (
    <div className="">
      <Hero />
      <FeaturedTutors />
    </div>
  );
}

