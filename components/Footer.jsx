"use client";

import Link from "next/link";

const Footer = () => {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Wallet", href: "/wallet" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "Telegram", href: "#", icon: "📨" },
    { name: "Discord", href: "#", icon: "💬" },
    { name: "GitHub", href: "#", icon: "💻" }
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" }
  ];

  return (
    <footer className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-gray-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-2xl hover:text-gray-300 transition-all duration-300 transform hover:scale-110"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <form className="flex animate-fade-in-up">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-lg text-gray-900 flex-grow focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors duration-300 transform hover:scale-105"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Pi Wallet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
