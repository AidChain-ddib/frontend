"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, Users, DollarSign, CheckCircle, Clock, Eye, Edit, Share2, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [userStats, setUserStats] = useState({
    totalFunded: 15000,
    totalDonated: 3500,
    projectsCreated: 2,
    projectsBacked: 12,
    verificationRewards: 450,
  })

  const myProjects = [
    {
      id: 1,
      title: "Community Solar Panel Installation",
      description: "Installing solar panels for community center",
      raised: 8500,
      goal: 15000,
      backers: 34,
      status: "active",
      milestones: 4,
      completedMilestones: 2,
      createdDate: "2024-02-01",
      category: "environment",
    },
    {
      id: 2,
      title: "Student Coding Bootcamp",
      description: "Free coding bootcamp for underprivileged students",
      raised: 6500,
      goal: 10000,
      backers: 28,
      status: "active",
      milestones: 3,
      completedMilestones: 1,
      createdDate: "2024-01-15",
      category: "education",
    },
  ]

  const backedProjects = [
    {
      id: 3,
      title: "Clean Water Initiative - Rural Kenya",
      amount: 1000,
      date: "2024-03-10",
      status: "active",
      progress: 60,
    },
    {
      id: 4,
      title: "Student Innovation Lab - University of Zurich",
      amount: 500,
      date: "2024-03-05",
      status: "active",
      progress: 56,
    },
    {
      id: 5,
      title: "Community Garden Network",
      amount: 250,
      date: "2024-02-28",
      status: "completed",
      progress: 100,
    },
  ]

  const recentActivity = [
    {
      type: "donation",
      description: "Donated 500 HBAR to Clean Water Initiative",
      date: "2024-03-10",
      amount: 500,
    },
    {
      type: "milestone",
      description: "Milestone 2 completed for Community Solar Panel",
      date: "2024-03-08",
      amount: 0,
    },
    {
      type: "verification",
      description: "Earned 25 HBAR for verification",
      date: "2024-03-05",
      amount: 25,
    },
    {
      type: "project",
      description: "Created new project: Student Coding Bootcamp",
      date: "2024-01-15",
      amount: 0,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "donation":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "milestone":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "verification":
        return <TrendingUp className="h-4 w-4 text-purple-600" />
      case "project":
        return <Plus className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your projects, donations, and verification activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Funded</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalFunded.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">HBAR</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-3">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Donated</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.totalDonated.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">HBAR</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 rounded-full p-3">
                  <Plus className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Projects Created</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.projectsCreated}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-3">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Projects Backed</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.projectsBacked}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-full p-3">
                  <BarChart3 className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Verification Rewards</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats.verificationRewards}</p>
                  <p className="text-xs text-gray-500">HBAR</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="backed-projects">Backed Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="bg-gray-100 rounded-full p-2">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                        {activity.amount > 0 && (
                          <div className="text-sm font-medium text-green-600">+{activity.amount} HBAR</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/create">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Project
                    </Button>
                  </Link>
                  <Link href="/projects">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Projects
                    </Button>
                  </Link>
                  <Link href="/verify">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify Milestones
                    </Button>
                  </Link>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-projects" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Projects</h2>
              <Link href="/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="capitalize">
                        {project.category}
                      </Badge>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>{project.raised.toLocaleString()} HBAR raised</span>
                          <span>{project.goal.toLocaleString()} HBAR goal</span>
                        </div>
                        <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                        <div className="flex justify-between text-sm mt-2 text-gray-600">
                          <span>{Math.round((project.raised / project.goal) * 100)}% funded</span>
                          <span>{project.backers} backers</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>
                          Milestones: {project.completedMilestones}/{project.milestones}
                        </span>
                        <span>Created: {new Date(project.createdDate).toLocaleDateString()}</span>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backed-projects" className="mt-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Projects You've Backed</h2>

              {backedProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{project.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Donated: {project.amount} HBAR</span>
                          <span>Date: {new Date(project.date).toLocaleDateString()}</span>
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        </div>
                      </div>
                      <div className="text-right min-w-32">
                        <div className="text-sm text-gray-600 mb-1">Progress</div>
                        <div className="flex items-center space-x-2">
                          <Progress value={project.progress} className="w-20 h-2" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Activity</CardTitle>
                <CardDescription>Complete history of your AidChain activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="bg-gray-100 rounded-full p-2">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                      </div>
                      {activity.amount > 0 && (
                        <div className="text-lg font-medium text-green-600">+{activity.amount} HBAR</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
