import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./Searchbar";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types";


const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Expert Tutors",
  },
  {
    icon: BookOpen,
    value: "10,000+",
    label: "Sessions Completed",
  },
  {
    icon: GraduationCap,
    value: "50+",
    label: "Subjects Available",
  },
];

export async function Hero() {

    const {data : categoryData} = await categoryService.getAllCategories();
    const popularCategories = categoryData?.data?.slice(0,4) ?? [];

  return (
    <div className="relative">
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover flip-video"
          >
            <source src="https://res.cloudinary.com/dw8bzha3e/video/upload/v1770012595/Adobe_Express_-_87592-602317646_small_1_nfdkdy.mp4" type="video/mp4" />
            <div className="w-full h-full bg-linear-to-br from-slate-900 via-primary-900 to-primary-900" />
          </video>
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-0% from-black/80 via-25% via-black/80 to-black/50 z-10" />

        <div className="relative z-20 w-full container mx-auto px-8">
          <div className="max-w-2xl">
            <h1 className="text-white text-5xl lg:text-6xl leading-tight mb-10">
              Connect with Expert
              <br />
               Tutors, Learn Anything
            </h1>
            <div className="mb-6">
              <SearchBar />
            </div>

            <div className="flex flex-wrap gap-3">
              {popularCategories.length > 0 && popularCategories.map((category : Category) => (
                <Link key={category.id} href={`/tutors?categoryId=${category.id}`}>
                  <Button
                    variant="outline"
                    className="bg-transparent border-white/40 text-white/90 hover:bg-white/10 hover:border-white/60 hover:text-white rounded-full px-7 cursor-pointer h-9 text-sm font-medium transition-all"
                  >
                    {category.name}
                    <ArrowRight className="ml-2 h-3.5 w-3.5" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

        <section className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className=" border shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
      </section>
    </div>
  );
}