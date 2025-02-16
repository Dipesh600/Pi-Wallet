"use client";

import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-900 to-blue-800">
      {/* Floating Image Positioned Behind Text */}
      <img
        src="/secWallet.png"
        alt="Pi Network Illustration"
        className="absolute top-20 inset-0 w-full max-w-4xl mx-auto opacity-30 animate-float"
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Headline and Subheadline */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
          Your Gateway to the <span className="text-yellow-400">Pi Network</span> Ecosystem
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
          Store, manage, and grow your Pi coins securely with our cutting-edge wallet solution
        </p>

        {/* CTA Buttons */}
        <div className="flex space-x-4 justify-center">
          <Link
            href="/create-wallet"
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Create Wallet
          </Link>
          <Link
            href="/learn-more"
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Floating Animation (Tailwind CSS) */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;

