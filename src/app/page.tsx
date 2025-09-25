import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl lg:text-6xl">
                Your Personal
                <span className="block text-blue-600">Legal AI Assistant</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 sm:max-w-xl sm:mx-auto lg:mx-0">
                Say goodbye to expensive legal consultation, long waits for
                appointments, and confusing legal texts. Summarize complex legal
                documents in seconds with AI-powered precision.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <a
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors shadow-lg text-center"
                >
                  Start Free Trial
                </a>
                <button className="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-lg font-medium text-lg transition-colors">
                  Watch Demo
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="text-green-500">✓</div>
                  <span className="text-sm text-gray-600">
                    5-second summaries
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-green-500">✓</div>
                  <span className="text-sm text-gray-600">75% time saved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-green-500">✓</div>
                  <span className="text-sm text-gray-600">
                    90% cost reduction
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className="bg-white rounded-lg shadow-xl p-6">
                  <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center">
                    <div className="text-4xl mb-4">📄</div>
                    <p className="text-gray-600 mb-4">
                      Drop your legal document here
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-700 font-medium">
                        contract_agreement.pdf
                      </p>
                      <p className="text-xs text-blue-500">
                        2.4MB • Processing...
                      </p>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Features of Legal AI
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Explore features that boost your productivity. From document
              automation to advanced research, we've got the hard work covered.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Summarize any legal document in just 5 seconds. No more hours of
                reading through complex legal jargon.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-green-600 text-3xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Document Handling
              </h3>
              <p className="text-gray-600">
                The fastest way to summarize agreements, convert images to text,
                translate documents, and more.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-3xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ask AI Lawyer
              </h3>
              <p className="text-gray-600">
                Legal research never been easier. Have a conversation with your
                virtual assistant in real-time.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-orange-600 text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Internet-Powered
              </h3>
              <p className="text-gray-600">
                Rapid web research, completing hours of analysis in seconds with
                up-to-date legal information.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-red-600 text-3xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multi-Platform
              </h3>
              <p className="text-gray-600">
                Access our platform with a simple tap – on the web, iOS, or
                Android. Work anywhere, anytime.
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="text-indigo-600 text-3xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalized for You
              </h3>
              <p className="text-gray-600">
                Customize and educate it to match your unique preferences and
                legal specialization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Our AI in Law is Better?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              In contrast to others, our LegalTech software is quick, easy, and
              wallet-friendly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Private
              </h3>
              <p className="text-gray-600">
                We stand firm on privacy, ensuring that users' conversations
                remain secure and anonymous.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast</h3>
              <p className="text-gray-600">
                The fastest online lawyer service, ideal for avoiding expenses
                and appointments.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl text-blue-600 font-bold">75%</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Time Saved
              </h3>
              <p className="text-gray-600">
                On routine tasks. Focus on what matters most while AI handles
                the heavy lifting.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl text-green-600 font-bold">90%</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cost Reduction
              </h3>
              <p className="text-gray-600">
                In legal services. Get professional-grade analysis at a fraction
                of traditional costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Who is Legal AI For?
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a consumer, a student, a solo lawyer, or a full law
              firm - Legal AI adapts to your legal needs and boosts your
              productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-blue-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                For Lawyers
              </h3>
              <p className="text-gray-600">
                Streamline research, draft documents faster, and analyze
                contracts with AI precision.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                For Law Firms
              </h3>
              <p className="text-gray-600">
                Scale your operations, reduce costs, and deliver faster results
                to your clients.
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                For Law Students
              </h3>
              <p className="text-gray-600">
                Accelerate your learning with AI-powered case analysis and legal
                research assistance.
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                For Consumers
              </h3>
              <p className="text-gray-600">
                Understand complex legal terms and documents without expensive
                consultations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              What Our Users Think
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Find out how our platform has changed the legal services
              experience for diverse users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">👩‍💼</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">
                    Sarah Mitchell
                  </h4>
                  <p className="text-gray-600 text-sm">Freelancer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Navigating through legal jargon was a maze until Legal AI came
                to the rescue. Now, I understand complex terms in simple
                language, making my life a lot easier."
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">👨‍⚖️</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Timothy Clark</h4>
                  <p className="text-gray-600 text-sm">Attorney</p>
                </div>
              </div>
              <p className="text-gray-600">
                "It's like having a personal assistant on standby. The AI-driven
                assistance in composing documents and analyzing contracts has
                freed up so much of my time."
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🎓</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Rebecca Adams</h4>
                  <p className="text-gray-600 text-sm">Law Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Legal AI has been a beacon, assisting me with research writing
                and case briefs, making my academic journey less daunting."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Legal AI Protects Your Rights and Wallet
          </h2>
          <p className="mt-4 text-xl text-blue-100">
            Join thousands of legal professionals who trust our AI to streamline
            their workflow and deliver better results.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg text-center"
            >
              Start Free Trial
            </a>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <span className="text-green-300 mr-2">✓</span>
              <span>Money back guarantee</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-300 mr-2">✓</span>
              <span>Free trial</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-300 mr-2">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
