import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Library, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Library,
      title: "Diverse Collection",
      description:
        "Over 10,000 books from various genres: literature, science, economics, arts and much more.",
    },
    {
      icon: BookOpen,
      title: "Easy Borrowing",
      description:
        "Fast and convenient online borrowing system. Reserve books and pick them up the same day.",
    },
    {
      icon: Users,
      title: "Reader Community",
      description:
        "Connect with thousands of other readers, share reviews and discover great books.",
    },
  ];

  return (
    <section className="container mx-auto py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
