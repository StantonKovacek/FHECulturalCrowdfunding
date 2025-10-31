"use client";

import { useState, useEffect } from "react";
import { Contract } from "ethers";
import { useFhevmClient } from "@fhevm-toolkit/sdk/react";
import ContributeForm from "./ContributeForm";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CROWDFUNDING_CONTRACT || "0x659b4d354550ADCf46cf1392148DE42C16E8E8Da";

// Simplified ABI for reading
const CONTRACT_ABI = [
  "function projectCounter() view returns (uint32)",
  "function getProject(uint32) view returns (string title, string description, string category, address creator, uint256 deadline, uint8 status, uint256 createdAt, uint32 backerCount, string metadataHash)",
  "function getPlatformStats() view returns (uint32 totalProjects, uint32 activeProjects, uint32 successfulProjects, uint32 failedProjects)"
];

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  creator: string;
  deadline: bigint;
  status: number;
  backerCount: number;
}

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const { client } = useFhevmClient();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const provider = client.getProvider();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

      const projectCount = await contract.projectCounter();
      const loadedProjects: Project[] = [];

      for (let i = 1; i <= Number(projectCount); i++) {
        try {
          const project = await contract.getProject(i);
          loadedProjects.push({
            id: i,
            title: project.title,
            description: project.description,
            category: project.category,
            creator: project.creator,
            deadline: project.deadline,
            status: project.status,
            backerCount: Number(project.backerCount)
          });
        } catch (error) {
          console.error(`Error loading project ${i}:`, error);
        }
      }

      setProjects(loadedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: number) => {
    const statuses = [
      { name: "Active", color: "bg-green-100 text-green-800" },
      { name: "Successful", color: "bg-blue-100 text-blue-800" },
      { name: "Failed", color: "bg-red-100 text-red-800" },
      { name: "Withdrawn", color: "bg-gray-100 text-gray-800" }
    ];

    const statusInfo = statuses[status] || statuses[0];

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
        {statusInfo.name}
      </span>
    );
  };

  const formatDeadline = (deadline: bigint) => {
    const date = new Date(Number(deadline) * 1000);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return "Ended";
    if (days === 0) return "Ends today";
    if (days === 1) return "1 day left";
    return `${days} days left`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🎨</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Projects Yet
        </h3>
        <p className="text-gray-600">
          Be the first to create a cultural project!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Active Projects ({projects.length})
        </h3>
        <button
          onClick={loadProjects}
          className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h4>
                  {getStatusBadge(project.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {project.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    🎨 {project.category}
                  </span>
                  <span className="flex items-center">
                    👥 {project.backerCount} backers
                  </span>
                  <span className="flex items-center">
                    ⏰ {formatDeadline(project.deadline)}
                  </span>
                </div>
              </div>
            </div>

            {project.status === 0 && ( // Active status
              <div className="mt-4 pt-4 border-t border-gray-200">
                {selectedProject === project.id ? (
                  <div>
                    <ContributeForm
                      projectId={project.id}
                      projectTitle={project.title}
                      onClose={() => setSelectedProject(null)}
                      onSuccess={() => {
                        setSelectedProject(null);
                        loadProjects();
                      }}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedProject(project.id)}
                    className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                  >
                    Contribute Anonymously
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
