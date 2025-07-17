"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Shield,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Heart,
  Share2,
  Flag,
  FileText,
  ImageIcon,
  Video,
} from "lucide-react"

export default function ProjectDetail({ params }) {
  const [project, setProject] = useState(null)
  const [donationAmount, setDonationAmount] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const mockProject = {
    id: 1,
    title: "Clean Water Initiative - Rural Kenya",
    description:
      "Building sustainable water systems for 5 villages in rural Kenya. This comprehensive project aims to provide clean, accessible water to over 2,000 residents through the construction of solar-powered water pumps, distribution networks, and community training programs.",
    longDescription:
      "Access to clean water remains one of the most pressing challenges in rural Kenya. Our initiative focuses on implementing sustainable water solutions that will serve five villages in the Machakos County region. The project combines modern technology with community-driven approaches to ensure long-term success and maintenance.",
    raised: 45000,
    goal: 75000,
    backers: 234,
    category: "humanitarian",
    creator: {
      name: "WaterForAll Foundation",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      description: "Non-profit organization focused on water access solutions in East Africa",
    },
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    milestones: [
      {
        id: 1,
        title: "Site Survey and Community Engagement",
        description: "Complete geological surveys and establish community partnerships",
        amount: 15000,
        deadline: "2024-02-15",
        status: "completed",
        completedDate: "2024-02-10",
        deliverables: [
          { type: "document", title: "Geological Survey Report", verified: true },
          { type: "document", title: "Community Agreement Letters", verified: true },
          { type: "image", title: "Site Photos", verified: true },
        ],
        verifiers: 12,
        verificationScore: 95,
      },
      {
        id: 2,
        title: "Equipment Procurement and Permits",
        description: "Purchase solar pumps, pipes, and obtain necessary permits",
        amount: 25000,
        deadline: "2024-03-30",
        status: "in_progress",
        deliverables: [
          { type: "document", title: "Equipment Purchase Orders", verified: false },
          { type: "document", title: "Government Permits", verified: false },
          { type: "image", title: "Equipment Delivery Photos", verified: false },
        ],
        verifiers: 8,
        verificationScore: 0,
      },
      {
        id: 3,
        title: "Installation and Testing",
        description: "Install water systems and conduct comprehensive testing",
        amount: 20000,
        deadline: "2024-05-15",
        status: "pending",
        deliverables: [
          { type: "document", title: "Installation Report", verified: false },
          { type: "video", title: "System Testing Video", verified: false },
          { type: "document", title: "Water Quality Test Results", verified: false },
        ],
        verifiers: 0,
        verificationScore: 0,
      },
      {
        id: 4,
        title: "Community Training and Handover",
        description: "Train local technicians and hand over systems to communities",
        amount: 15000,
        deadline: "2024-06-30",
        status: "pending",
        deliverables: [
          { type: "document", title: "Training Completion Certificates", verified: false },
          { type: "video", title: "Community Handover Ceremony", verified: false },
          { type: "document", title: "Maintenance Manual", verified: false },
        ],
        verifiers: 0,
        verificationScore: 0,
      },
    ],
    updates: [
      {
        id: 1,
        date: "2024-02-12",
        title: "Milestone 1 Completed Successfully!",
        content:
          "We're excited to announce that our site survey and community engagement phase has been completed ahead of schedule. The geological surveys confirmed excellent water table conditions, and all five communities have signed partnership agreements.",
        author: "Sarah Johnson, Project Manager",
        images: ["/placeholder.svg?height=200&width=300"],
      },
      {
        id: 2,
        date: "2024-01-28",
        title: "Community Leaders Meeting",
        content:
          "Met with village elders and water committee representatives to discuss project implementation timeline and community responsibilities.",
        author: "David Kimani, Community Liaison",
        images: [],
      },
    ],
    comments: [
      {
        id: 1,
        author: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        date: "2024-02-14",
        content: "Amazing project! I've donated and shared with my network. Keep up the great work!",
        donation: 500,
      },
      {
        id: 2,
        author: "Emma Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        date: "2024-02-13",
        content: "Can you provide more details about the maintenance training program?",
        donation: 0,
      },
    ],
  }

  useEffect(() => {
    setProject(mockProject)
  }, [])

  const handleDonate = async () => {
    if (!donationAmount || Number.parseFloat(donationAmount) <= 0) return

    try {
      const response = await fetch(`/api/projects/${params.id}/donate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number.parseFloat(donationAmount) }),
      })

      if (response.ok) {
        setDonationAmount("")
        // Refresh project data
      }
    } catch (error) {
      console.error("Donation failed")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  if (!project) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0">
                <img
                  src={project.images[0] || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="capitalize">
                      {project.category}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h1>

                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar>
                      <AvatarImage src={project.creator.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{project.creator.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{project.creator.name}</span>
                        {project.creator.verified && <Shield className="h-4 w-4 text-green-600" />}
                      </div>
                      <p className="text-sm text-gray-600">{project.creator.description}</p>
                    </div>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="milestones">Milestones</TabsTrigger>
                      <TabsTrigger value="updates">Updates</TabsTrigger>
                      <TabsTrigger value="comments">Comments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">About This Project</h3>
                          <p className="text-gray-700 leading-relaxed">{project.longDescription}</p>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold mb-3">Project Images</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.images.slice(1).map((image, index) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Project image ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="milestones" className="mt-6">
                      <div className="space-y-4">
                        {project.milestones.map((milestone, index) => (
                          <Card key={milestone.id}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg flex items-center">
                                  <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">
                                    {index + 1}
                                  </span>
                                  {milestone.title}
                                </CardTitle>
                                <Badge className={getStatusColor(milestone.status)}>
                                  {getStatusIcon(milestone.status)}
                                  <span className="ml-1 capitalize">{milestone.status.replace("_", " ")}</span>
                                </Badge>
                              </div>
                              <CardDescription>{milestone.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="font-medium">{milestone.amount.toLocaleString()} HBAR</span>
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                                  <span>{new Date(milestone.deadline).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 text-gray-500 mr-2" />
                                  <span>{milestone.verifiers} verifiers</span>
                                </div>
                              </div>

                              {milestone.status === "completed" && (
                                <div className="bg-green-50 p-3 rounded-lg mb-4">
                                  <div className="flex items-center text-green-800">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    <span className="font-medium">
                                      Completed on {new Date(milestone.completedDate).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="mt-2">
                                    <span className="text-sm text-green-700">
                                      Verification Score: {milestone.verificationScore}%
                                    </span>
                                  </div>
                                </div>
                              )}

                              <div>
                                <h4 className="font-medium mb-2">Deliverables</h4>
                                <div className="space-y-2">
                                  {milestone.deliverables.map((deliverable, delIndex) => (
                                    <div
                                      key={delIndex}
                                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                    >
                                      <div className="flex items-center">
                                        {deliverable.type === "document" && (
                                          <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                        )}
                                        {deliverable.type === "image" && (
                                          <ImageIcon className="h-4 w-4 mr-2 text-gray-500" />
                                        )}
                                        {deliverable.type === "video" && (
                                          <Video className="h-4 w-4 mr-2 text-gray-500" />
                                        )}
                                        <span className="text-sm">{deliverable.title}</span>
                                      </div>
                                      {deliverable.verified ? (
                                        <Badge className="bg-green-100 text-green-800">
                                          <CheckCircle className="h-3 w-3 mr-1" />
                                          Verified
                                        </Badge>
                                      ) : (
                                        <Badge variant="outline">Pending</Badge>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="updates" className="mt-6">
                      <div className="space-y-6">
                        {project.updates.map((update) => (
                          <Card key={update.id}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{update.title}</CardTitle>
                                <span className="text-sm text-gray-500">
                                  {new Date(update.date).toLocaleDateString()}
                                </span>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-700 mb-4">{update.content}</p>
                              <div className="text-sm text-gray-600 mb-4">By {update.author}</div>
                              {update.images.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {update.images.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image || "/placeholder.svg"}
                                      alt={`Update image ${index + 1}`}
                                      className="w-full h-32 object-cover rounded-lg"
                                    />
                                  ))}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="comments" className="mt-6">
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Leave a Comment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Textarea placeholder="Share your thoughts or ask questions..." className="mb-4" />
                            <Button>Post Comment</Button>
                          </CardContent>
                        </Card>

                        <div className="space-y-4">
                          {project.comments.map((comment) => (
                            <Card key={comment.id}>
                              <CardContent className="pt-4">
                                <div className="flex items-start space-x-3">
                                  <Avatar>
                                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className="font-medium">{comment.author}</span>
                                      <span className="text-sm text-gray-500">
                                        {new Date(comment.date).toLocaleDateString()}
                                      </span>
                                      {comment.donation > 0 && (
                                        <Badge className="bg-blue-100 text-blue-800">
                                          Donated {comment.donation} HBAR
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-gray-700">{comment.content}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fund This Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{project.raised.toLocaleString()} HBAR raised</span>
                    <span>{project.goal.toLocaleString()} HBAR goal</span>
                  </div>
                  <Progress value={(project.raised / project.goal) * 100} className="h-3" />
                  <div className="flex justify-between text-sm mt-2 text-gray-600">
                    <span>{Math.round((project.raised / project.goal) * 100)}% funded</span>
                    <span>{project.backers} backers</span>
                  </div>
                </div>

                <div>
                  <Input
                    type="number"
                    placeholder="Enter amount in HBAR"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleDonate}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={!donationAmount || Number.parseFloat(donationAmount) <= 0}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Fund Project
                </Button>

                <div className="text-xs text-gray-600 text-center">
                  Funds are held in smart contract and released upon milestone verification
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Milestones</span>
                  <span className="font-medium">{project.milestones.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium text-green-600">
                    {project.milestones.filter((m) => m.status === "completed").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">In Progress</span>
                  <span className="font-medium text-blue-600">
                    {project.milestones.filter((m) => m.status === "in_progress").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium">95%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Backers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Anonymous", amount: 1000, time: "2 hours ago" },
                    { name: "Sarah M.", amount: 500, time: "5 hours ago" },
                    { name: "John D.", amount: 250, time: "1 day ago" },
                  ].map((backer, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-sm">{backer.name}</div>
                        <div className="text-xs text-gray-600">{backer.time}</div>
                      </div>
                      <div className="font-medium">{backer.amount} HBAR</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
