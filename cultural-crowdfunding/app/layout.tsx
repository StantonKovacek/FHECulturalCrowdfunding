"use client";

import { FhevmProvider } from "@fhevm-toolkit/sdk/react";
import "./globals.css";

const fhevmConfig = {
  gatewayUrl: process.env.NEXT_PUBLIC_GATEWAY_URL || "https://gateway.zama.ai",
  aclAddress: process.env.NEXT_PUBLIC_ACL_ADDRESS || "0x2Fb4341027eb1d2aD8B5D9708187df8633cAFA92",
  kmsVerifierAddress: process.env.NEXT_PUBLIC_KMS_ADDRESS || "0x12b064F3fC2e3FFC7A1C418652E9E95a3Cf26b04",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Cultural Crowdfunding Platform</title>
        <meta name="description" content="Privacy-preserving crowdfunding for cultural projects" />
      </head>
      <body>
        <FhevmProvider config={fhevmConfig}>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <div className="flex items-center">
                    <h1 className="text-xl font-bold text-gray-900">
                      🎨 Cultural Crowdfunding
                    </h1>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      Privacy-Preserving Platform
                    </span>
                  </div>
                </div>
              </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </FhevmProvider>
      </body>
    </html>
  );
}
