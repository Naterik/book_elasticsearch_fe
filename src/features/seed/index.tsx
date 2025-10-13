import {
  BookOpen,
  Clock,
  Search,
  BookMarked,
  Bookmark,
  Shield,
} from "lucide-react";
export const features = [
  {
    icon: <Search className="h-6 w-6" />,
    title: "Easy Book Search",
    description:
      "Find books quickly using our Elasticsearch-powered search system with filters for titles, authors, and genres.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Book Management",
    description:
      "Browse our digital catalog with detailed book information, availability status, and book copies tracking.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Loan Tracking",
    description:
      "Keep track of your borrowed books, return dates, and loan history in one organized place.",
  },
  {
    icon: <BookMarked className="h-6 w-6" />,
    title: "Simple Borrowing",
    description:
      "Clear borrowing process with straightforward steps and automatic status updates.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Member Management",
    description:
      "Manage your member profile, view activity history, and handle payments securely.",
  },
  {
    icon: <Bookmark className="h-6 w-6" />,
    title: "Online Access",
    description:
      "Access the library system anytime through our web-based interface.",
  },
];

export const stats = [
  { number: "Simple", label: "Book Search" },
  { number: "Secure", label: "Member System" },
  { number: "24/7", label: "Online Access" },
  { number: "Easy", label: "Management" },
];
