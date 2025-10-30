"use client";

import { useState } from "react";
import { Contract, parseEther } from "ethers";
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CROWDFUNDING_CONTRACT || "0x659b4d354550ADCf46cf1392148DE42C16E8E8Da";

const CONTRACT_ABI = [
  "function createProject(string calldata title, string calldata description, string calldata category, uint64 targetAmount, uint256 fundingPeriod, string calldata metadataHash) external returns (uint32)"
];

const CATEGORIES = [
  "Visual Arts",
  "Music",
  "Literature",
  "Film & Cinema",
  "Theater & Performance",
  "Dance",
  "Digital Art",
  "Photography",
  "Traditional Crafts",
  "Community Cultural Heritage"
];

export default function CreateProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetAmount: "",
    fundingDays: "30"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const { client } = useFhevmClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.category || !formData.targetAmount) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setStatus("Creating project...");

    try {
      const signer = client.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Convert funding days to seconds
      const fundingPeriod = parseInt(formData.fundingDays) * 24 * 60 * 60;

      // Convert target amount to wei
      const targetAmount = parseEther(formData.targetAmount);

      setStatus("Sending transaction...");

      const tx = await contract.createProject(
        formData.title,
        formData.description,
        formData.category,
        targetAmount,
        fundingPeriod,
        "" // metadataHash (optional IPFS hash)
      );

      setStatus("Waiting for confirmation...");
      const receipt = await tx.wait();

      setStatus("Project created successfully! ✅");

      // Reset form
      setTimeout(() => {
        setFormData({
          title: "",
          description: "",
          category: "",
          targetAmount: "",
          fundingDays: "30"
        });
        setStatus("");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating project:", error);
      setStatus("");
      alert(`Failed to create project: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g., Digital Art Exhibition 2025"
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your cultural project..."
          disabled={isSubmitting}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Funding Goal (ETH) *
          </label>
          <input
            type="number"
            step="0.1"
            min="0.1"
            value={formData.targetAmount}
            onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
            placeholder="5.0"
            disabled={isSubmitting}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Duration (Days)
        </label>
        <input
          type="number"
          min="7"
          max="90"
          value={formData.fundingDays}
          onChange={(e) => setFormData({ ...formData, fundingDays: e.target.value })}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Between 7 and 90 days
        </p>
      </div>

      {status && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">{status}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating Project..." : "Create Project"}
      </button>

      <div className="bg-yellow-50 rounded-lg p-4">
        <p className="text-sm text-yellow-900">
          💡 <strong>Note:</strong> Creating a project requires a transaction on the blockchain.
          Make sure you have enough Sepolia testnet ETH for gas fees.
        </p>
      </div>
    </form>
  );
}
