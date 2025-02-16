"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaLock, FaBolt, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: <FaLock className="text-blue-600 text-5xl" />,
    title: "Secure Storage",
    subheading: "Top-notch security for your Pi coins",
    description: "Your assets are protected with multi-layer encryption, ensuring maximum safety and reliability.",
  },
  {
    icon: <FaBolt className="text-yellow-500 text-5xl" />,
    title: "Instant Transactions",
    subheading: "Send and receive Pi in seconds",
    description: "With our optimized network, transactions are processed instantly, making it hassle-free.",
  },
  {
    icon: <FaUsers className="text-green-500 text-5xl" />,
    title: "Active Community",
    subheading: "Join thousands of Pi users",
    description: "Be part of a growing ecosystem where you can engage, learn, and trade securely.",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-slide effect for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="features">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>

        {/* Desktop Layout */}
        <div ref={ref} className="hidden md:grid grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
              whileHover={{
                y: [0, -10, -5, -12, -7, -15, -10], // Floating effect
                transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center transform cursor-pointer"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-blue-600 font-medium mt-1">{feature.subheading}</p>
              <p className="text-gray-600 mt-3 text-base">{feature.description}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-all">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Sliding Cards */}
        <div className="md:hidden flex overflow-hidden relative">
          <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {features.map((feature, index) => (
              <div key={index} className="min-w-full flex flex-col items-center text-center p-6">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                  whileHover={{
                    y: [0, -10, -5, -12, -7, -15, -10], // Floating effect
                    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-80"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-blue-600 font-medium mt-1">{feature.subheading}</p>
                  <p className="text-gray-600 mt-3 text-base">{feature.description}</p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-all">
                    Learn More
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
