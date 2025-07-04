// "use client";
// import { Button } from "@/components/ui/button";
// import { api } from "@/convex/_generated/api";
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import Image from "next/image";
// import { useEffect } from "react";

// export default function Home() {
//   const { user } = useUser();
//   const createUser = useMutation(api.user.createUser);

//   useEffect(() => {
//     user && checkUser();
//   }, [user]);

//   const checkUser = async () => {
//     const result = await createUser({
//       email: user?.primaryEmailAddress?.emailAddress,
//       userName: user?.fullName || "Anonymous",
//       imageUrl: user?.imageUrl || "https://via.placeholder.com/150",
//     });

//     console.log(result);
//   };
//   return (
//     <div>
//       <h1 className="text-3xl font-bold underline">
//         Welcome to AI PDF Note Taker
//       </h1>
//       <Button>Subscribe</Button>
//       <UserButton />
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { FileText, Zap, Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const createUser = useMutation(api.user.createUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user && checkUser();
  }, [user]);

  useEffect(() => {
    // Redirect to dashboard if user is signed in
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName || "Anonymous",
      imageUrl: user?.imageUrl || "https://via.placeholder.com/150",
    });

    console.log(result);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="relative w-full bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                NoteTakerAI
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 scroll-smooth">
              {/* <a
                href="#features"
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Features
              </a> */}
              {/* <a
                href="#solution"
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Solution
              </a>
              <a
                href="#testimonials"
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Testimonials
              </a>
              <a
                href="#blog"
                className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                Blog
              </a> */}
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <UserButton />
              ) : (
                <SignInButton mode="modal">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-full transition-colors duration-200">
                    Get Started
                  </Button>
                </SignInButton>
              )}

              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-slate-700 hover:text-blue-600 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200/50 shadow-lg">
              <nav className="flex flex-col space-y-4 px-4 py-6">
                {/* <a
                  href="#features"
                  className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Features
                </a> */}
                {/* <a
                  href="#solution"
                  className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Solution
                </a>
                <a
                  href="#testimonials"
                  className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Testimonials
                </a>
                <a
                  href="#blog"
                  className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Blog
                </a> */}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30"></div>
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Simplify{" "}
              <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                PDF
              </span>{" "}
              <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                Note-Taking
              </span>
              <br />
              with AI-Powered
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Elevate your note-taking experience with our AI-powered PDF app.
              Seamlessly extract key insights, summaries, and annotations from
              any PDF with just a few clicks.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              {!user ? (
                <SignInButton mode="modal">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Get started
                  </Button>
                </SignInButton>
              ) : (
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </Button>
              )}
              <Button
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 "
              >
                <a
                  href="#features"
                  className="text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  Features
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl font-bold text-white">$</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                The lowest price
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Get premium AI-powered PDF analysis at an unbeatable price
                point. No hidden fees, transparent pricing for all users.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                The fastest on the market
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Lightning-fast PDF processing and AI analysis. Get your notes
                and summaries in seconds, not minutes.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                The most loved
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Trusted by thousands of students, researchers, and
                professionals. Join our community of satisfied users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NoteTakerAI</span>
            </div>
            <div className="text-slate-400 text-sm">
              © 2025 NoteTakerAI. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
