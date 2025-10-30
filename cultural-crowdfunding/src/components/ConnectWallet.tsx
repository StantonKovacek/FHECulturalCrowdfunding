"use client";

import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { useFhevmSigner } from "@fhevm-toolkit/sdk/react";

interface ConnectWalletProps {
  onConnect: (connected: boolean) => void;
}

export default function ConnectWallet({ onConnect }: ConnectWalletProps) {
  const [address, setAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const { setSigner } = useFhevmSigner();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts"
        });

        if (accounts.length > 0) {
          setAddress(accounts[0]);
          onConnect(true);

          // Set signer in FHEVM client
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          setSigner(signer);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    setIsConnecting(true);

    try {
      const provider = new BrowserProvider(window.ethereum);

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      setAddress(accounts[0]);
      onConnect(true);

      // Get signer and set in FHEVM client
      const signer = await provider.getSigner();
      setSigner(signer);

      // Check network
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111n) {
        alert("Please switch to Sepolia testnet");
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      alert(`Failed to connect: ${error.message}`);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress("");
    onConnect(false);
  };

  if (address) {
    return (
      <div className="flex items-center space-x-3">
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      disabled={isConnecting}
      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center space-x-2"
    >
      {isConnecting ? (
        <>
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Connecting...</span>
        </>
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>
  );
}
