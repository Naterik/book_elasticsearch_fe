import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featuresForHome } from "@/features/client/seed";
const FeaturesSection = () => {
  return (
    <section className="container mx-auto py-7 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuresForHome.map((feature, index) => {
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
    </section>
  );
};

export default FeaturesSection;
