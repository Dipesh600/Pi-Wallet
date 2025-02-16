"use client";

import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { loadPiSDK } from "../../utils/piSDK";

export default function ReceivePage() {
  const { user } = useAuth();
  const [paymentLink, setPaymentLink] = useState("");

  const generatePaymentLink = async () => {
    try {
      const Pi = await loadPiSDK();
      const link = await Pi.createPaymentLink({
        amount: 0, // Set appropriate amount
        memo: "Payment request",
        metadata: { userId: user.id }
      });
      setPaymentLink(link);
    } catch (err) {
      console.error("Failed to generate payment link:", err);
      alert("Failed to generate payment link");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(paymentLink);
    alert("Payment link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Receive Pi</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <button
          onClick={generatePaymentLink}
          className="w-full bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors mb-6"
        >
          Generate Payment Link
        </button>
        
        {paymentLink && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-gray-700 break-all mb-4">{paymentLink}</p>
            <button
              onClick={copyToClipboard}
              className="w-full bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
