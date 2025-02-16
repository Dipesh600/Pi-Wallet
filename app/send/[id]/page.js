"use client";

import { useParams } from "next/navigation";
import { loadPiSDK } from "../../../utils/piSDK";
import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";

export default function SendPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [transactionStatus, setTransactionStatus] = useState("");

  useEffect(() => {
    // Fetch transaction details if needed
  }, [id]);

  const handleSend = async () => {
    try {
      const Pi = await loadPiSDK();
      const tx = await Pi.createPayment({
        amount: amount,
        memo: "Payment to " + id,
        metadata: { userId: user.id }
      });
      setTransactionStatus("Transaction initiated");
      // Handle transaction confirmation
    } catch (err) {
      console.error("Transaction failed:", err);
      setTransactionStatus("Transaction failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Send Pi</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Amount (π)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button
          onClick={handleSend}
          className="w-full bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
        >
          Send Pi
        </button>

        {transactionStatus && (
          <p className="mt-4 text-center text-gray-600">{transactionStatus}</p>
        )}
      </div>
    </div>
  );
}
