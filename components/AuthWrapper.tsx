"use client";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import PiAuth from "./PiAuth";

export default function AuthWrapper() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen p-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-bold text-blue-900 mb-6">
              Welcome to Pi Wallet
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Securely manage your Pi coins with our easy-to-use wallet.
              Register or login to get started.
            </p>
            <div className="flex gap-4 justify-center">
              <PiAuth />
              <a
                href="/auth/login"
                className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Login
              </a>
              <a
                href="/auth/register"
                className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
