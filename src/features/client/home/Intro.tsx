import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { features, stats } from "@/features/seed";
import { useCurrentApp } from "@/app/providers/app.context";

const IntroPage = ({ user }: { user: IUser | null }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <Badge variant="secondary" className="mb-4">
          Welcome to Our Library
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Online Library Management System
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A straightforward digital library system that helps you find, borrow,
          and manage books easily. Access our collection and manage your library
          activities online.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 text-primary">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Statistics */}
      <div className="bg-secondary rounded-lg p-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Access */}

      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Start Using Our System</h2>
        {user?.status !== "ACTIVE" ? (
          <p className="text-muted-foreground mb-3">
            Be your member and experience borrowing books and managing your
            library activities online with many advice feature.
          </p>
        ) : (
          <p className="text-muted-foreground mb-3">
            Start borrowing books and managing your library activities online.
          </p>
        )}

        {user?.status === "ACTIVE" && (
          <a
            href="/member"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Be a Member
          </a>
        )}
        {!user && (
          <div className="flex justify-center gap-4">
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              Create Account
            </a>
            <a
              href="/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroPage;
