import {
  Search,
  Clock,
  UserCircle,
  CreditCard,
  BookCopy,
  Shield,
  Library,
  BookOpen,
  Users,
} from "lucide-react";

export const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Book Loan Management",
    description: `Our loan management system helps you keep track of your borrowed books. 
    Get notifications for due dates and manage your loans easily. View your borrowing history 
    and current loans in one place, making it simple to stay organized with your library activities.`,
    link: "/user/loan",
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

export const stats = [
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

export const featuresForHome = [
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
