import React from "react";
import { Heart, Github, Mail } from "lucide-react";

const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>© {currentYear} Library Admin Dashboard.</span>
            <span className="hidden sm:inline">All rights reserved.</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by the Admin Team</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:support@library.com"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Email Support"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-center text-xs text-gray-500">
            Library Management System v1.0.0 | Built with React, TypeScript &
            Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
