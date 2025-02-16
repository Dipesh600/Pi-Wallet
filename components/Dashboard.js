"use client";
// components/Dashboard.js
import { useState, useEffect } from "react";
import { loadPiSDK } from "../utils/piSDK";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSend = async () => {
    try {
      const Pi = await loadPiSDK();
      const pi = new Pi.Network(user.id);
      const paymentData = {
        amount: 0, // Will be set by user
        memo: "Payment",
        metadata: {}
      };
      const payment = await pi.createPayment(paymentData);
      router.push(`/send/${payment.id}`);
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to initiate payment");
    }
  };

  const handleReceive = () => {
    router.push("/receive");
  };

  const handleBackup = async () => {
    try {
      const Pi = await loadPiSDK();
      const pi = new Pi.Network(user.id);
      const backupData = await pi.createBackup();
      const blob = new Blob([JSON.stringify(backupData)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `pi-wallet-backup-${Date.now()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      alert("Backup downloaded successfully");
    } catch (error) {
      console.error("Error creating backup:", error);
      alert("Failed to create backup");
    }
  };
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const Pi = await loadPiSDK();
      const pi = new Pi.Network(user.id);
        const walletData = await pi.getWallet();
        setBalance(walletData.balance);
        setTransactions(walletData.transactions);
      } catch (err) {
        setError("Failed to load wallet data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchWalletData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Wallet Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Wallet Balance</h2>
        <p className="text-4xl font-bold text-blue-900">{balance.toFixed(2)} Pi</p>
        <div className="mt-6 space-x-4">
          <button 
            className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
            onClick={() => handleSend()}
          >
            Send
          </button>
          <button 
            className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
            onClick={() => handleReceive()}
          >
            Receive
          </button>
          <button 
            className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500"
            onClick={() => handleBackup()}
          >
            Backup
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
        {transactions.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="px-6 py-4">{new Date(tx.timestamp).toLocaleDateString()}</td>
                    <td className="px-6 py-4">{tx.type}</td>
                    <td className="px-6 py-4">{tx.amount.toFixed(2)} Pi</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          tx.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
