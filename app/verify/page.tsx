"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  TrendingUp,
  AlertTriangle,
  FileText,
  ImageIcon,
  Video,
  Download,
  Eye,
} from "lucide-react"

export default function VerifyPage() {
  const [activeTab, setActiveTab] = useState("pending")
  const [stakeAmount, setStakeAmount] = useState("")
  const [verifierStats, setVerifierStats] = useState({
    totalStaked: 5000,
    verificationCount: 47,
    successRate: 94,
    reputation: 4.8,
    earnings: 2340,
  })

  const pendingVerifications = [
    {
      id: 1,
      projectTitle: "Clean Water Initiative - Rural Kenya",
      milestoneTitle: "Equipment Procurement and Permits",
      creator: "WaterForAll Foundation",
      deadline: "2024-03-30",
      stakeRequired: 100,
      reward: 50,
      deliverables: [
        { type: "document", title: "Equipment Purchase Orders", url: "#" },
        { type: "document", title: "Government Permits", url: "#" },
        { type: "image", title: "Equipment Delivery Photos", url: "#" },
      ],
      description:
        "Verify that all required equipment has been purchased and necessary permits obtained for the water system installation.",
      submittedDate: "2024-03-25",
      verifiersNeeded: 3,
      currentVerifiers: 1,
    },
    {
      id: 2,
      projectTitle: "Student Innovation Lab - University of Zurich",
      milestoneTitle: "Lab Space Setup and Equipment Installation",
      creator: "UZH Computer Science Dept",
      deadline: "2024-04-15",
      stakeRequired: 150,
      reward: 75,
      deliverables: [
        { type: "video", title: "Lab Tour Video", url: "#" },
        { type: "document", title: "Equipment Inventory List", url: "#" },
        { type: "image", title: "Setup Progress Photos", url: "#" },
      ],
      description: "Verify the completion of lab space preparation and installation of blockchain research equipment.",
      submittedDate: "2024-03-28",
      verifiersNeeded: 5,
      currentVerifiers: 2,
    },
  ]

  const myVerifications = [
    {
      id: 1,
      projectTitle: "Community Garden Network",
      milestoneTitle: "Site Preparation and Soil Testing",
      status: "approved",
      submittedDate: "2024-03-20",
      completedDate: "2024-03-22",
      reward: 25,
      consensusReached: true,
    },
    {
      id: 2,
      projectTitle: "Solar Panel Installation - School",
      milestoneTitle: "Panel Installation and Grid Connection",
      status: "disputed",
      submittedDate: "2024-03-18",
      completedDate: "2024-03-21",
      reward: 0,
      consensusReached: false,
      disputeReason: "Insufficient evidence of grid connection",
    },
  ]

  const handleStakeTokens = async () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) <= 0) return

    try {
      const response = await fetch("/api/verifier/stake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: Number.parseFloat(stakeAmount) }),
      })

      if (response.ok) {
        setStakeAmount("")
        // Update verifier stats
      }
    } catch (error) {
      console.error("Staking failed")
    }
  }

  const handleVerification = async (verificationId, decision, feedback) => {
    try {
      const response = await fetch(`/api/verifications/${verificationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ decision, feedback }),
      })

      if (response.ok) {
        // Refresh verification data
      }
    } catch (error) {
      console.error("Verification submission failed")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "disputed":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "disputed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Dashboard</h1>
          <p className="text-gray-600">Participate in milestone verification and earn rewards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pending">Pending Verifications</TabsTrigger>
                <TabsTrigger value="my-verifications">My Verifications</TabsTrigger>
                <TabsTrigger value="disputes">Dispute Resolution</TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="mt-6">
                <div className="space-y-6">
                  {pendingVerifications.map((verification) => (
                    <Card key={verification.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{verification.milestoneTitle}</CardTitle>
                            <CardDescription>{verification.projectTitle}</CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Reward</div>
                            <div className="font-bold text-green-600">{verification.reward} HBAR</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-gray-700">{verification.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">
                                Due: {new Date(verification.deadline).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">Stake: {verification.stakeRequired} HBAR</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-sm">
                                {verification.currentVerifiers}/{verification.verifiersNeeded} verifiers
                              </span>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Deliverables to Review</h4>
                            <div className="space-y-2">
                              {verification.deliverables.map((deliverable, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center">
                                    {deliverable.type === "document" && (
                                      <FileText className="h-4 w-4 mr-2 text-gray-500" />
                                    )}
                                    {deliverable.type === "image" && (
                                      <ImageIcon className="h-4 w-4 mr-2 text-gray-500" />
                                    )}
                                    {deliverable.type === "video" && <Video className="h-4 w-4 mr-2 text-gray-500" />}
                                    <span className="text-sm font-medium">{deliverable.title}</span>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button variant="outline" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Verification Decision</h4>
                            <div className="space-y-3">
                              <Textarea placeholder="Provide detailed feedback on your verification decision..." />
                              <div className="flex space-x-2">
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleVerification(verification.id, "approve", "")}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleVerification(verification.id, "reject", "")}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject
                                </Button>
                                <Button variant="outline">Request More Info</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my-verifications" className="mt-6">
                <div className="space-y-4">
                  {myVerifications.map((verification) => (
                    <Card key={verification.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{verification.milestoneTitle}</CardTitle>
                            <CardDescription>{verification.projectTitle}</CardDescription>
                          </div>
                          <Badge className={getStatusColor(verification.status)}>
                            {getStatusIcon(verification.status)}
                            <span className="ml-1 capitalize">{verification.status}</span>
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">Submitted</div>
                            <div className="font-medium">
                              {new Date(verification.submittedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Completed</div>
                            <div className="font-medium">
                              {new Date(verification.completedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Reward</div>
                            <div className="font-medium text-green-600">{verification.reward} HBAR</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Consensus</div>
                            <div className="font-medium">
                              {verification.consensusReached ? "Reached" : "Not Reached"}
                            </div>
                          </div>
                        </div>

                        {verification.status === "disputed" && (
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                            <div className="flex items-center text-yellow-800">
                              <AlertTriangle className="h-4 w-4 mr-2" />
                              <span className="font-medium">Dispute Reason</span>
                            </div>
                            <p className="text-yellow-700 mt-1">{verification.disputeReason}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="disputes" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dispute Resolution</CardTitle>
                    <CardDescription>High-tier verifiers can participate in dispute resolution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Disputes</h3>
                      <p className="text-gray-600">
                        Dispute resolution cases will appear here when consensus cannot be reached
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verifier Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Staked</span>
                  <span className="font-bold">{verifierStats.totalStaked} HBAR</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verifications</span>
                  <span className="font-medium">{verifierStats.verificationCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium text-green-600">{verifierStats.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reputation</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{verifierStats.reputation}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-bold text-green-600">{verifierStats.earnings} HBAR</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stake Management</CardTitle>
                <CardDescription>Increase your stake to access higher-value verifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    type="number"
                    placeholder="Amount to stake (HBAR)"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleStakeTokens}
                  className="w-full"
                  disabled={!stakeAmount || Number.parseFloat(stakeAmount) <= 0}
                >
                  Stake Tokens
                </Button>
                <div className="text-xs text-gray-600">
                  Higher stakes unlock premium verification opportunities with better rewards
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Tiers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Bronze</div>
                    <div className="text-sm text-gray-600">100+ HBAR staked</div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">Current</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Silver</div>
                    <div className="text-sm text-gray-600">500+ HBAR staked</div>
                  </div>
                  <Badge variant="outline">Locked</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Gold</div>
                    <div className="text-sm text-gray-600">1000+ HBAR staked</div>
                  </div>
                  <Badge variant="outline">Locked</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Arbitrator</div>
                    <div className="text-sm text-gray-600">5000+ HBAR staked</div>
                  </div>
                  <Badge variant="outline">Locked</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 rounded-full p-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Verification approved</div>
                      <div className="text-xs text-gray-600">Community Garden - Site Prep</div>
                    </div>
                    <div className="text-sm text-green-600">+25 HBAR</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 rounded-full p-1">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Stake increased</div>
                      <div className="text-xs text-gray-600">Added 1000 HBAR to stake</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-yellow-100 rounded-full p-1">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">Dispute initiated</div>
                      <div className="text-xs text-gray-600">Solar Panel - Grid Connection</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
