import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

export default function AppFooter() {
  return (
    <footer className=" bg-zinc-900 text-zinc-50">
      <div className="container mx-auto  md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">University Library</h3>
            <p className="mt-3 text-sm text-zinc-300 leading-6">
              A modern library management system powered by Elasticsearch
              technology, offering the best book search and borrowing
              experience.
            </p>
          </div>

          <nav aria-label="Quick Links">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm mx-3">
              <li>
                <a
                  href="/books"
                  className="text-zinc-300 hover:text-zinc-100 hover:underline"
                >
                  Book Catalog
                </a>
              </li>
              <li>
                <a
                  href="/loans"
                  className="text-zinc-300 hover:text-zinc-100 hover:underline"
                >
                  Borrowing & Returns
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-zinc-300 hover:text-zinc-100 hover:underline"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>
          <address className="not-italic">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href="mailto:library@university.edu.vn"
                  className="hover:text-zinc-100 hover:underline"
                >
                  library@university.edu.vn
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <a
                  href="tel:+842812345678"
                  className="hover:text-zinc-100 hover:underline"
                >
                  (028) 1234 5678
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>123 ABC Street, District 1, Ho Chi Minh City</span>
              </li>
            </ul>
          </address>
        </div>

        <Separator className="my-8 bg-zinc-700" />
        <p className="text-center text-md text-zinc-400">
          © 2025 University Library. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
