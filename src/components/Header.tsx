import { LoginCard } from "@/app/components/Login";
import Image from "next/image";

export function Header() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Image
                src={"/app-logo.png"}
                width={300}
                height={300}
                alt="logo"
              />
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <LoginCard />
          </div>
        </div>
      </div>
    </nav>
  );
}
