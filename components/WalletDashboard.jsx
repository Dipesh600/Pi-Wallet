"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const WalletDashboard = () => {
  const [wallets, setWallets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [isCreatingWallet, setIsCreatingWallet] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateWallet = async () => {
    if (!newWalletAddress) {
      setError("Please enter a wallet address");
      return;
    }

    try {
      setIsCreatingWallet(true);
      const response = await fetch("/api/wallet/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: newWalletAddress }),
      });

      if (!response.ok) {
        throw new Error("Failed to create wallet");
      }

      const data = await response.json();
      setWallets([...wallets, data.wallet]);
      setNewWalletAddress("");
      setError(null);
      toast.success("Wallet created successfully");
    } catch (error) {
      console.error("Error creating wallet:", error);
      setError(error.message);
      toast.error("Failed to create wallet");
    } finally {
      setIsCreatingWallet(false);
    }
  };

  const handleGenerateWallet = async () => {
    try {
      const response = await fetch("/api/wallet/generate", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate wallet");
      }

      const data = await response.json();
      setWallets([...wallets, data.wallet]);
      setError(null);
      toast.success("Wallet generated successfully");
    } catch (error) {
      console.error("Error generating wallet:", error);
      setError(error.message);
      toast.error("Failed to generate wallet");
    }
  };

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await fetch("/api/wallet/list");
        if (!response.ok) {
          throw new Error("Failed to fetch wallets");
        }
        const data = await response.json();
        setWallets(data.wallets);
      } catch (error) {
        console.error("Error fetching wallets:", error);
        toast.error("Failed to load wallets");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWallets();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading wallets...</div>;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Wallet Dashboard</h2>
        
        {/* Wallet List */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">Your Wallets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallets.map((wallet) => (
              <div key={wallet.id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Wallet Address</p>
                    <p className="text-sm text-gray-600 break-all">{wallet.address}</p>
                  </div>
                  <div>
                    <p className="font-medium text-right">Balance</p>
                    <p className="text-sm text-gray-600">{wallet.balance} Pi</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Management */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-2 justify-center">
            <input
              type="text"
              value={newWalletAddress}
              onChange={(e) => setNewWalletAddress(e.target.value)}
              placeholder="Enter wallet address"
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateWallet}
              disabled={isCreatingWallet}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isCreatingWallet ? "Creating..." : "Add Wallet"}
            </button>
          </div>
          
          <div className="flex justify-center">
            <button
              onClick={handleGenerateWallet}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Generate New Wallet
            </button>
          </div>

          {error && (
            <div className="mt-2 text-center text-red-500">
              {error}
            </div>
          )}
        </div>

        {/* Wallet Balance */}
        <div className="text-center mb-8">
          <h3 className="text-4xl font-semibold">Total Balance</h3>
          <p className="text-2xl text-gray-700">
            {wallets.reduce((sum, wallet) => sum + wallet.balance, 0)} Pi Coins
          </p>
        </div>
      </div>
    </section>
  );
};

export default WalletDashboard;
