import {
  UserButton,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/nextjs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white">
      <SignedIn>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-2">
                  Welcome to your Legal AI Assistant
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Document Upload Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-2xl mb-4">📄</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Document
              </h3>
              <p className="text-gray-600 mb-4">
                Upload legal documents for AI-powered analysis and
                summarization.
              </p>
              <a
                href="/upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full"
              >
                Upload Document
              </a>
            </div>

            {/* Recent Summaries Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-green-600 text-2xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Recent Summaries
              </h3>
              <p className="text-gray-600 mb-4">
                View and manage your recent document summaries and analyses.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full">
                View Summaries
              </button>
            </div>

            {/* AI Chat Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-2xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ask AI Lawyer
              </h3>
              <p className="text-gray-600 mb-4">
                Chat with your AI legal assistant for instant legal guidance.
              </p>
              <a
                href="/chat"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full text-center block"
              >
                Start Chat
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">12</div>
              <div className="text-gray-600">Documents Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">45min</div>
              <div className="text-gray-600">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">8</div>
              <div className="text-gray-600">AI Consultations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">98%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
          </div>
        </main>
        <Footer />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
