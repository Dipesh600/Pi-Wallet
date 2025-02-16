"use client";

import { useState } from "react";
import { getSession } from "next-auth/react";
import { QRCodeSVG } from "qrcode.react";

export default function SettingsPage() {
  const [twoFactorSecret, setTwoFactorSecret] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const enable2FA = async () => {
    try {
      const response = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "enable" })
      });

      const data = await response.json();
      if (response.ok) {
        setTwoFactorSecret(data);
      } else {
        throw new Error(data.error || "Failed to enable 2FA");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const verify2FA = async () => {
    try {
      const response = await fetch("/api/auth/2fa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          action: "verify",
          token: verificationCode
        })
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("2FA successfully enabled!");
        setTwoFactorSecret(null);
      } else {
        throw new Error(data.error || "Invalid verification code");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {twoFactorSecret ? (
            <div className="space-y-4">
              <p className="text-gray-600">
                Scan this QR code with your authenticator app:
              </p>
              <div className="flex justify-center">
                <QRCodeSVG value={twoFactorSecret.qrCodeUrl} />
              </div>
              <input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={verify2FA}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Verify and Enable 2FA
              </button>
            </div>
          ) : (
            <button
              onClick={enable2FA}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Enable Two-Factor Authentication
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
