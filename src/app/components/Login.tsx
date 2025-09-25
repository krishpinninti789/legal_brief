"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function LoginCard() {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-blue-600 px-3 sm:px-4 py-2 text-sm font-medium"
          >
            Login
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium text-sm">
            Try for Free
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <a
          href="/dashboard"
          className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
        >
          Dashboard
        </a>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-8 h-8",
            },
          }}
        />
      </SignedIn>
    </div>
  );
}
