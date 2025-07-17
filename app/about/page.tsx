"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Globe, Shield, TrendingUp, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Blockchain Developer",
      bio: "Specializes in smart contracts and decentralized applications on Hedera Hashgraph.",
    },
    {
      name: "Maria Chen",
      role: "Frontend Engineer",
      bio: "Passionate about creating intuitive user experiences for Web3 applications.",
    },
    {
      name: "David Müller",
      role: "Project Lead",
      bio: "Coordinates between academic partners and technical teams to ensure project success.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Reuse the same header from your homepage */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Image
                  src="/aid-chain-logo.png"
                  alt="AidChain Logo"
                  width={200}
                  height={32}
                />
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link
                  href="/create"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Create
                </Link>
                <Link href="/" className="text-gray-700 hover:text-blue-600">
                  Donate
                </Link>
                <Link
                  href="/verify"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Verify
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-blue-600"
                >
                  About
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About AidChain
              <span className="block text-blue-600">
                Transparent Humanitarian Funding
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're revolutionizing humanitarian funding through blockchain
              technology, ensuring every donation is traceable and every project
              milestone is verifiable.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                To create a transparent, accountable platform where donors can
                fund humanitarian projects with confidence, and organizations
                can access funding efficiently while demonstrating real impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Global Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We support projects worldwide, from clean water initiatives
                    in Africa to educational programs in Europe, all verified on
                    the blockchain.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Transparent Funding</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Every donation is recorded on Hedera Hashgraph, with smart
                    contracts ensuring funds are only released when verified
                    milestones are met.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Community Powered</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our decentralized verification system allows community
                    members to stake tokens and participate in project
                    validation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-blue-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Technology
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Built on Hedera Hashgraph for fast, secure, and sustainable
                blockchain operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Hedera Hashgraph?
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>
                      Energy-efficient consensus algorithm (0.0002 kWh per
                      transaction)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>
                      High throughput (10,000+ transactions per second)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Fair, secure, and stable transaction ordering</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>
                      Predictable low fees (perfect for micro-donations)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <Image
                  src="/hedera-hashgraph-logo.png"
                  alt="Hedera Hashgraph Logo"
                  width={400}
                  height={200}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Make an Impact?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our platform as a donor, project creator, or verifier and be
              part of the transparent humanitarian funding revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Start a Project
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Learn How to Donate
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Reuse the same footer from your homepage */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Image
                  src="/aid-chain-logo.png"
                  alt="AidChain Logo"
                  width={200}
                  height={32}
                />
              </div>
              <p className="text-gray-400">
                Transparent blockchain-powered crowdfunding for humanitarian
                projects.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/compliance">Compliance</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; 2024 AidChain. Built on Hedera Hashgraph. <br />
              Deep dive into blockchain <br />
              Summer School - University of Zurich.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
