import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
  TypographyLead,
} from "@/components/ui/typography";
import { Search, UserCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { features, stats } from "@/features/client/seed";
import { useCurrentApp } from "@/app/providers/app.context";

const AboutPage = () => {
  const { setIsLoading } = useCurrentApp();

  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      <div className="relative text-center mb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 blur-3xl -z-10 animate-pulse" />
        <Badge variant="secondary" className="mb-4">
          Online Library Management System
        </Badge>
        <TypographyH1 className="mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
          Welcome to Our Digital Library
        </TypographyH1>
        <TypographyLead className="max-w-3xl mx-auto mb-12 text-lg text-muted-foreground">
          A simple and efficient way to manage your library activities online.
          Browse our collection, borrow books, and manage your account all in
          one place.
        </TypographyLead>
        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <Button size="lg" className="group" asChild>
            <Link to="/book" className="flex items-center gap-2">
              Explore Our Library
              <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group" asChild>
            <Link to="/register" className="flex items-center gap-2">
              Join Our Community
              <UserCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-20">
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          return (
            <article key={index} className="scroll-m-20 relative">
              <div
                className="absolute top-0 left-[-1000px] right-[-1000px] h-[200px] bg-gradient-to-r from-transparent via-primary/5 to-transparent -z-10"
                style={{ transform: `translateY(${index * 20}px)` }}
              />
              <Card className="border-none shadow-none bg-transparent">
                <div
                  className={`flex flex-col md:flex-row gap-12 items-stretch ${
                    !isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="p-8 rounded-2xl bg-secondary/5 backdrop-blur-sm border border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between">
                      <div className="text-primary w-12 h-12 mb-6 bg-primary/10 rounded-lg p-2 transition-transform transform hover:scale-110 mx-auto md:mx-0">
                        {React.cloneElement(feature.icon, {
                          className: "w-full h-full",
                        })}
                      </div>
                      <div>
                        <TypographyH2 className="border-none text-2xl font-semibold mb-4 text-center md:text-left">
                          {feature.title}
                        </TypographyH2>
                        <TypographyP className="text-base leading-relaxed text-muted-foreground mb-6">
                          {feature.description}
                        </TypographyP>
                        <div className="flex flex-col items-center gap-1 bg-primary/5 rounded-xl p-4 mb-8 shadow-sm">
                          <div className="text-3xl font-extrabold text-primary">
                            {feature.stats.number}
                          </div>
                          <div className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">
                            {feature.stats.label}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="group self-start"
                        asChild
                      >
                        <Link
                          to={feature.link}
                          className="flex items-center gap-2"
                        >
                          Learn more
                          <span className="group-hover:translate-x-1 transition-transform">
                            →
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col h-full justify-center">
                    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="aspect-[4/3] relative group">
                        <img
                          src={feature.imageUrl}
                          alt={feature.imageAlt}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {[
                        "Easy to use",
                        "Real-time updates",
                        "Secure access",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-secondary/5 border border-secondary/20 text-center text-sm font-medium text-primary"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
              {index < features.length - 1 && <Separator className="my-20" />}
            </article>
          );
        })}
      </div>

      <div className="my-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl animate-pulse" />
        <Card className="border border-secondary/20 bg-background/95 backdrop-blur-xl shadow-xl">
          <div className="p-12">
            <TypographyH2 className="text-center border-none mb-12 text-3xl font-bold">
              Library System Features
            </TypographyH2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-secondary/20 bg-secondary/5 backdrop-blur-sm hover:bg-background/80 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center"
                >
                  <div className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    {stat.number}
                  </div>
                  <TypographyH3 className="mb-3 text-xl font-semibold">
                    {stat.label}
                  </TypographyH3>
                  <TypographyP className="text-base text-muted-foreground leading-relaxed">
                    {stat.description}
                  </TypographyP>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="my-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 blur-3xl -z-10" />
        <Card className="border-none bg-background/50 backdrop-blur-sm">
          <div className="p-12 text-center max-w-3xl mx-auto">
            <TypographyH2 className="border-none text-3xl font-bold mb-6">
              Join Our Online Library
            </TypographyH2>
            <TypographyLead className="mb-8 text-lg text-muted-foreground">
              Start using our online library system today. Create an account to
              access our collection and enjoy the convenience of managing your
              library activities online.
            </TypographyLead>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="group" asChild>
                <Link to="/register" className="flex items-center gap-2">
                  Create Free Account
                  <UserCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group" asChild>
                <Link to="/login" className="flex items-center gap-2">
                  Member Login
                  <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
