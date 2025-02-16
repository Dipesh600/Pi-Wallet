import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootClientLayout from "../components/RootClientLayout";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero";
import Features from "../components/Features.jsx";
import Footer from "../components/Footer.jsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pi Wallet",
  description: "Secure Pi Network wallet application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <RootClientLayout>
          <AuthProvider>
            <Navbar />
            <Hero />
            <Features />
            {children}
            <Footer />
          </AuthProvider>
        </RootClientLayout>
      </body>
    </html>
  )
}
