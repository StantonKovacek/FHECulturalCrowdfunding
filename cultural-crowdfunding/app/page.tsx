"use client";

import { useState, useEffect } from "react";
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";
import { BrowserProvider } from "ethers";
import ConnectWallet from "../src/components/ConnectWallet";
import ProjectList from "../src/components/ProjectList";
import CreateProject from "../src/components/CreateProject";
import ContributeForm from "../src/components/ContributeForm";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [activeTab, setActiveTab] = useState<"browse" | "create">("browse");
  const { initialize, isInitialized } = useFhevmClient();

  useEffect(() => {
    const init = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          await initialize(provider);

          // Check if already connected
          const accounts = await window.ethereum.request({
            method: "eth_accounts"
          });
          setIsConnected(accounts.length > 0);
        } catch (error) {
          console.error("Failed to initialize FHEVM:", error);
        }
      }
    };

    init();
  }, [initialize]);

  const handleConnect = (connected: boolean) => {
    setIsConnected(connected);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome to Cultural Crowdfunding
            </h2>
            <p className="mt-2 text-gray-600">
              Support cultural projects with privacy-preserving contributions using FHE technology
            </p>
          </div>
          <ConnectWallet onConnect={handleConnect} />
        </div>

        {/* FHEVM Status */}
        <div className="mt-4 flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isInitialized ? "bg-green-500" : "bg-yellow-500"}`} />
          <span className="text-sm text-gray-600">
            FHEVM Status: {isInitialized ? "✅ Ready" : "⏳ Initializing..."}
          </span>
        </div>
      </div>

      {/* Tabs */}
      {isConnected && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("browse")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "browse"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Browse Projects
              </button>
              <button
                onClick={() => setActiveTab("create")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "create"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Create Project
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "browse" ? (
              <ProjectList />
            ) : (
              <CreateProject />
            )}
          </div>
        </div>
      )}

      {/* Not Connected State */}
      {!isConnected && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Connect Your Wallet
            </h3>
            <p className="text-gray-600 mb-6">
              Connect your wallet to start creating or supporting cultural projects
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                💡 All contributions are encrypted using FHE technology, ensuring complete privacy
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl mb-3">🔐</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Private Contributions
          </h3>
          <p className="text-sm text-gray-600">
            Your donation amounts are encrypted end-to-end using FHE technology
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl mb-3">🎨</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Cultural Projects
          </h3>
          <p className="text-sm text-gray-600">
            Support arts, music, literature, film, and more cultural initiatives
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="text-3xl mb-3">✅</div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Automatic Refunds
          </h3>
          <p className="text-sm text-gray-600">
            Failed projects automatically return funds to all contributors
          </p>
        </div>
      </div>
    </div>
  );
}
