"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Shield, TrendingUp, Users, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const featuredProjects = [
    {
      id: 1,
      title: "Clean Water Initiative - Rural Kenya",
      description:
        "Building sustainable water systems for 5 villages in rural Kenya",
      raised: 45000,
      goal: 75000,
      backers: 234,
      category: "humanitarian",
      milestones: 3,
      completedMilestones: 1,
      creator: "WaterForAll Foundation",
      image: "/placeholder.svg?height=200&width=300",
      verified: true,
    },
    {
      id: 2,
      title: "Student Innovation Lab - University of Zurich",
      description:
        "Establishing a blockchain research lab for computer science students",
      raised: 28000,
      goal: 50000,
      backers: 156,
      category: "education",
      milestones: 4,
      completedMilestones: 2,
      creator: "UZH Computer Science Dept",
      image: "/placeholder.svg?height=200&width=300",
      verified: true,
    },
    {
      id: 3,
      title: "Community Garden Network",
      description: "Creating sustainable food systems in urban communities",
      raised: 12500,
      goal: 25000,
      backers: 89,
      category: "community",
      milestones: 5,
      completedMilestones: 0,
      creator: "Green Cities Initiative",
      image: "/placeholder.svg?height=200&width=300",
      verified: false,
    },
  ];

  const stats = {
    totalFunded: 2450000,
    activeProjects: 127,
    successfulProjects: 89,
    totalDonors: 15420,
  };

  function connectWallet() {
    console.log("Connecting wallet...");
  }

  const router = useRouter();

  function handleCardSelection(projectId) {
    console.log("Card selected");
    if (projectId) {
      router.push(`/projects/${projectId}`);
    }
  }

  const filteredProjects = featuredProjects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
                <Link
                  href="#"
                  className="text-gray-700 hover:text-blue-600"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
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
              {!isConnected ? (
                <Button
                  onClick={connectWallet}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Connected
                  </Badge>
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transparent Aid Funding
              <span className="block text-blue-600">Powered by Blockchain</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Fund humanitarian projects, student initiatives, and community
              programs with complete transparency. Every milestone verified,
              every donation tracked, every impact measured.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push("/create")}
              >
                <Plus className="h-5 w-5 mr-2" />
                Start a Project
              </Button>
            </div>
          </div>
        </section>

        <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  ${stats.totalFunded.toLocaleString()}
                </h3>
                <p className="text-gray-600">Total Funded</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.activeProjects}
                </h3>
                <p className="text-gray-600">Active Projects</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.totalDonors.toLocaleString()}
                </h3>
                <p className="text-gray-600">Total Donors</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {stats.successfulProjects}
                </h3>
                <p className="text-gray-600">Completed Projects</p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">
                  Featured Projects
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="humanitarian">Humanitarian</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              {/* All Projects */}
              <TabsContent value="all" className="mt-8">
                <ProjectGrid
                  projects={filteredProjects}
                  handleCardSelection={handleCardSelection}
                />
              </TabsContent>

              {/* Humanitarian */}
              <TabsContent value="humanitarian" className="mt-8">
                <ProjectGrid
                  projects={filteredProjects.filter(
                    (project) => project.category === "humanitarian"
                  )}
                  handleCardSelection={handleCardSelection}
                />
              </TabsContent>

              {/* Education */}
              <TabsContent value="education" className="mt-8">
                <ProjectGrid
                  projects={filteredProjects.filter(
                    (project) => project.category === "education"
                  )}
                  handleCardSelection={handleCardSelection}
                />
              </TabsContent>

              {/* Community */}
              <TabsContent value="community" className="mt-8">
                <ProjectGrid
                  projects={filteredProjects.filter(
                    (project) => project.category === "community"
                  )}
                  handleCardSelection={handleCardSelection}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              How AidChain Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Plus className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Create Project</h3>
                <p className="text-gray-600">
                  Define your project goals, set milestones, and submit for
                  community verification.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Get Verified</h3>
                <p className="text-gray-600">
                  Stake-based verifiers review your milestones and validate
                  progress transparently.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Receive Funding</h3>
                <p className="text-gray-600">
                  Funds are released incrementally as milestones are completed
                  and verified.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-cols-1 md:flex-cols-4 gap-8 justify-between">
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

function ProjectGrid({ projects, handleCardSelection }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => handleCardSelection(project.id)}
        >
          <div className="relative">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            {project.verified && (
              <Badge className="absolute top-2 right-2 bg-green-600">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="capitalize">
                {project.category}
              </Badge>
              <span className="text-sm text-gray-500">
                {project.completedMilestones}/{project.milestones} milestones
              </span>
            </div>
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>${project.raised.toLocaleString()} raised</span>
                  <span>${project.goal.toLocaleString()} goal</span>
                </div>
                <Progress
                  value={(project.raised / project.goal) * 100}
                  className="h-2"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {project.backers} backers
                </span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Fund Project
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
