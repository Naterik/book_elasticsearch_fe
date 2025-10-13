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
  TypographyList,
} from "@/components/ui/typography";
import {
  Search,
  Clock,
  UserCircle,
  CreditCard,
  BookCopy,
  Shield,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

/** Note: we no longer rely on Unsplash for images. */

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Book Loan Management",
    description: `Our loan management system helps you keep track of your borrowed books. 
    Get notifications for due dates and manage your loans easily. View your borrowing history 
    and current loans in one place, making it simple to stay organized with your library activities.`,
    link: "/loan",
    stats: { number: "Easy", label: "Tracking" },
    imageUrl:
      "https://images.pexels.com/photos/12170723/pexels-photo-12170723.jpeg",
    imageAlt: "A vintage alarm clock sits atop a stack of books",
  },
  {
    icon: <UserCircle className="h-6 w-6" />,
    title: "User Profile",
    description: `Manage your library account through your personal profile. 
    Keep track of your borrowed books, reservations, and reading history. 
    Receive notifications about due dates and available books you've reserved.`,
    link: "/info",
    stats: { number: "24/7", label: "Access" },
    imageUrl:
      "https://images.pexels.com/photos/9780867/pexels-photo-9780867.jpeg",
    imageAlt: "Person using a smartphone with a music app indoors",
  },
  {
    icon: <Search className="h-6 w-6" />,
    title: "Book Search",
    description: `Find books easily with our search system. Filter books by title, 
    author, genre, or availability status. Our search helps you quickly locate the 
    books you need in our collection.`,
    link: "/book",
    stats: { number: "Simple", label: "Search" },
    imageUrl:
      "https://images.pexels.com/photos/4494642/pexels-photo-4494642.jpeg",
    imageAlt: "Magnifying glass highlighting a book index",
  },
  {
    icon: <BookCopy className="h-6 w-6" />,
    title: "Digital Catalog",
    description: `Browse our comprehensive collection of books online. 
    View detailed information about each book, including availability status, 
    location, and descriptions. Reserve books directly through the system.`,
    link: "/book",
    stats: { number: "Full", label: "Catalog" },
    imageUrl:
      "https://images.pexels.com/photos/8036340/pexels-photo-8036340.jpeg",
    imageAlt: "Laptop surrounded by books and scripts on a wooden desk",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Secure Account",
    description: `Your account security is important to us. We protect your personal 
    information and library activities with secure login and data protection measures. 
    Manage your account settings and privacy preferences easily.`,
    link: "/info",
    stats: { number: "Safe", label: "& Secure" },
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/04/19/23/13/security-2244006_1280.jpg",
    imageAlt: "Close-up of a padlock on a computer keyboard",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Online Payments",
    description: `Handle library payments conveniently online. Pay membership fees 
    and any late return fines through our secure payment system. View your payment 
    history and receive digital receipts for your records.`,
    link: "/payment",
    stats: { number: "Easy", label: "Payments" },
    imageUrl:
      "https://images.pexels.com/photos/29205862/pexels-photo-29205862.jpeg",
    imageAlt: "Hand holding a credit card in front of a laptop",
  },
];

const stats = [
  {
    number: "24/7",
    label: "Online Access",
    description: "Access the library catalog anytime",
  },
  {
    number: "Simple",
    label: "Interface",
    description: "Easy to use library management system",
  },
  {
    number: "Secure",
    label: "System",
    description: "Protected user data and transactions",
  },
  {
    number: "Full",
    label: "Features",
    description: "Complete library management solution",
  },
];

const AboutPage = () => {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16">
      {/* Hero Section */}
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

      {/* Main Features */}
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

      {/* Statistics */}
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

      {/* Get Started Section */}
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
