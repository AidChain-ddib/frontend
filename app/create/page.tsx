"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, X, Upload, Target, FileText } from "lucide-react"

export default function CreateProject() {
  const [currentStep, setCurrentStep] = useState(1)
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    category: "",
    fundingGoal: "",
    duration: "",
    milestones: [],
  })
  const [milestones, setMilestones] = useState([
    { id: 1, title: "", description: "", amount: "", deliverables: [], deadline: "" },
  ])

  const categories = ["humanitarian", "education", "community", "healthcare", "environment", "technology"]

  const addMilestone = () => {
    const newMilestone = {
      id: milestones.length + 1,
      title: "",
      description: "",
      amount: "",
      deliverables: [],
      deadline: "",
    }
    setMilestones([...milestones, newMilestone])
  }

  const removeMilestone = (id) => {
    setMilestones(milestones.filter((m) => m.id !== id))
  }

  const updateMilestone = (id, field, value) => {
    setMilestones(milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const addDeliverable = (milestoneId) => {
    setMilestones(milestones.map((m) => (m.id === milestoneId ? { ...m, deliverables: [...m.deliverables, ""] } : m)))
  }

  const updateDeliverable = (milestoneId, index, value) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              deliverables: m.deliverables.map((d, i) => (i === index ? value : d)),
            }
          : m,
      ),
    )
  }

  const removeDeliverable = (milestoneId, index) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId
          ? {
              ...m,
              deliverables: m.deliverables.filter((_, i) => i !== index),
            }
          : m,
      ),
    )
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const submitProject = async () => {
    const finalProjectData = {
      ...projectData,
      milestones: milestones,
    }

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalProjectData),
      })

      if (response.ok) {
        window.location.href = "/dashboard"
      }
    } catch (error) {
      console.error("Project submission failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
          <p className="text-gray-600">Launch your humanitarian, educational, or community initiative</p>
        </div>

        <div className="mb-8">
          <Progress value={(currentStep / 4) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span className={currentStep >= 1 ? "text-blue-600 font-medium" : ""}>Basic Info</span>
            <span className={currentStep >= 2 ? "text-blue-600 font-medium" : ""}>Milestones</span>
            <span className={currentStep >= 3 ? "text-blue-600 font-medium" : ""}>Verification</span>
            <span className={currentStep >= 4 ? "text-blue-600 font-medium" : ""}>Review</span>
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Project Information
              </CardTitle>
              <CardDescription>Provide basic details about your project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your project title"
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project, its goals, and expected impact"
                  rows={4}
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setProjectData({ ...projectData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat} className="capitalize">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="goal">Funding Goal (HBAR)</Label>
                  <Input
                    id="goal"
                    type="number"
                    placeholder="0"
                    value={projectData.fundingGoal}
                    onChange={(e) => setProjectData({ ...projectData, fundingGoal: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="duration">Project Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="90"
                  value={projectData.duration}
                  onChange={(e) => setProjectData({ ...projectData, duration: e.target.value })}
                />
              </div>

              <div>
                <Label>Project Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Upload project images or drag and drop</p>
                  <Button variant="outline" className="mt-2 bg-transparent">
                    Choose Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Project Milestones
              </CardTitle>
              <CardDescription>Break down your project into verifiable milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Milestone {index + 1}</h3>
                    {milestones.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeMilestone(milestone.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Milestone Title</Label>
                      <Input
                        placeholder="e.g., Site preparation and permits"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, "title", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Funding Amount (HBAR)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={milestone.amount}
                        onChange={(e) => updateMilestone(milestone.id, "amount", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe what will be accomplished in this milestone"
                      value={milestone.description}
                      onChange={(e) => updateMilestone(milestone.id, "description", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={milestone.deadline}
                      onChange={(e) => updateMilestone(milestone.id, "deadline", e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Deliverables</Label>
                      <Button variant="outline" size="sm" onClick={() => addDeliverable(milestone.id)}>
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    {milestone.deliverables.map((deliverable, delIndex) => (
                      <div key={delIndex} className="flex items-center space-x-2 mb-2">
                        <Input
                          placeholder="e.g., Construction permits document"
                          value={deliverable}
                          onChange={(e) => updateDeliverable(milestone.id, delIndex, e.target.value)}
                        />
                        <Button variant="ghost" size="sm" onClick={() => removeDeliverable(milestone.id, delIndex)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Button onClick={addMilestone} variant="outline" className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Verification Requirements</CardTitle>
              <CardDescription>Set up verification criteria for your milestones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Verification Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select verification method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="community">Community Verification</SelectItem>
                    <SelectItem value="expert">Expert Panel</SelectItem>
                    <SelectItem value="hybrid">Hybrid Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Required Verifier Stake (HBAR)</Label>
                <Input type="number" placeholder="100" />
                <p className="text-sm text-gray-600 mt-1">Minimum stake required for verifiers to participate</p>
              </div>

              <div>
                <Label>Verification Threshold</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple Majority (51%)</SelectItem>
                    <SelectItem value="super">Super Majority (67%)</SelectItem>
                    <SelectItem value="consensus">Consensus (80%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Dispute Resolution</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="arbitration" />
                    <Label htmlFor="arbitration">Enable arbitration system</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="appeals" />
                    <Label htmlFor="appeals">Allow milestone appeals</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your project details before submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">{projectData.title}</h3>
                <p className="text-gray-600 mb-4">{projectData.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Category:</span>
                    <Badge variant="outline" className="ml-2 capitalize">
                      {projectData.category}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Goal:</span> {projectData.fundingGoal} HBAR
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {projectData.duration} days
                  </div>
                  <div>
                    <span className="font-medium">Milestones:</span> {milestones.length}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Milestones Summary</h4>
                <div className="space-y-2">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span>
                        {index + 1}. {milestone.title}
                      </span>
                      <span className="font-medium">{milestone.amount} HBAR</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Smart Contract Deployment</h4>
                <p className="text-blue-800 text-sm">
                  Your project will be deployed as a smart contract on Hedera Hashgraph. This ensures transparent fund
                  management and automated milestone verification.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={submitProject} className="bg-blue-600 hover:bg-blue-700">
              Submit Project
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
