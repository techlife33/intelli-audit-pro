"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, FileText, User, Activity } from "lucide-react"

interface SampleTestingWorkflowProps {
  isOpen: boolean
  onClose: () => void
}

export function SampleTestingWorkflow({ isOpen, onClose }: SampleTestingWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState("")

  const sampleData = {
    id: "PRV-2024-0156",
    name: "Dr. Sarah Martinez, MD",
    specialty: "Cardiology",
    riskLevel: "High",
    selectionReason: "New provider with specialty credentials, high claim volume ($2.3M), recent license renewal",
    testingAreas: [
      "License Verification",
      "Board Certification",
      "Malpractice Insurance",
      "Background Check",
      "Hospital Privileges",
      "Continuing Education",
    ],
  }

  const testingSteps = [
    {
      title: "Sample Overview",
      description: "Review sample selection and rationale",
    },
    {
      title: "Document Review",
      description: "Verify required documentation",
    },
    {
      title: "Compliance Testing",
      description: "Test against NCQA requirements",
    },
    {
      title: "Findings & Notes",
      description: "Document findings and recommendations",
    },
  ]

  const complianceChecklist = [
    { id: "license", label: "Current medical license on file", required: true, status: "complete" },
    { id: "board", label: "Board certification verification", required: true, status: "complete" },
    { id: "malpractice", label: "Current malpractice insurance", required: true, status: "issue" },
    { id: "background", label: "Background check completed", required: true, status: "complete" },
    { id: "privileges", label: "Hospital privileges verification", required: false, status: "complete" },
    { id: "education", label: "Continuing education credits", required: true, status: "pending" },
  ]

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "issue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800"
      case "issue":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sample Testing Workflow</DialogTitle>
          <DialogDescription>Detailed testing for selected audit sample</DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Testing Progress</span>
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {testingSteps.length}
            </span>
          </div>
          <Progress value={((currentStep + 1) / testingSteps.length) * 100} className="h-2" />
          <div className="flex justify-between mt-2">
            {testingSteps.map((step, index) => (
              <div
                key={index}
                className={`text-xs ${index <= currentStep ? "text-blue-600 font-medium" : "text-gray-400"}`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sample Overview</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center mb-3">
                    <User className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium">Provider Information</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>ID:</strong> {sampleData.id}
                    </div>
                    <div>
                      <strong>Name:</strong> {sampleData.name}
                    </div>
                    <div>
                      <strong>Specialty:</strong> {sampleData.specialty}
                    </div>
                    <div className="flex items-center">
                      <strong>Risk Level:</strong>
                      <Badge className="ml-2 bg-red-100 text-red-800">{sampleData.riskLevel}</Badge>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center mb-3">
                    <Activity className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium">Selection Rationale</h4>
                  </div>
                  <p className="text-sm text-gray-700">{sampleData.selectionReason}</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">Testing Areas</h4>
                <div className="grid grid-cols-2 gap-2">
                  {sampleData.testingAreas.map((area, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Document Review</h3>

              <div className="space-y-3">
                {complianceChecklist.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(item.status)}
                        <div>
                          <div className="font-medium text-gray-900">{item.label}</div>
                          {item.required && (
                            <Badge variant="outline" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          View Doc
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Compliance Testing</h3>

              <div className="border rounded-lg p-4 bg-yellow-50">
                <div className="flex items-center mb-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                  <h4 className="font-medium text-yellow-900">Issues Identified</h4>
                </div>
                <div className="space-y-2 text-sm text-yellow-800">
                  <div>• Malpractice insurance certificate expired 30 days ago</div>
                  <div>• Continuing education credits documentation pending</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Testing Checklist</h4>
                {complianceChecklist.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={item.id}
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
                    />
                    <label htmlFor={item.id} className="text-sm font-medium cursor-pointer flex-1">
                      {item.label}
                    </label>
                    {getStatusIcon(item.status)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Findings & Recommendations</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 bg-red-50">
                  <h4 className="font-medium text-red-900 mb-2">Critical Issues (2)</h4>
                  <div className="space-y-2 text-sm text-red-800">
                    <div>• Expired malpractice insurance</div>
                    <div>• Missing continuing education documentation</div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-green-50">
                  <h4 className="font-medium text-green-900 mb-2">Compliant Items (4)</h4>
                  <div className="space-y-2 text-sm text-green-800">
                    <div>• Current medical license</div>
                    <div>• Board certification verified</div>
                    <div>• Background check complete</div>
                    <div>• Hospital privileges current</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Testing Notes</h4>
                <Textarea
                  placeholder="Add detailed notes about findings, recommendations, and follow-up actions..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="border rounded-lg p-4 bg-blue-50">
                <h4 className="font-medium text-blue-900 mb-2">Recommended Actions</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div>• Request updated malpractice insurance certificate</div>
                  <div>• Obtain continuing education transcripts</div>
                  <div>• Schedule re-review in 30 days</div>
                  <div>• Flag for credentialing committee review</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            {currentStep === testingSteps.length - 1 ? (
              <>
                <Button variant="outline" onClick={onClose}>
                  Save Draft
                </Button>
                <Button onClick={onClose}>Complete Testing</Button>
              </>
            ) : (
              <Button onClick={() => setCurrentStep(Math.min(testingSteps.length - 1, currentStep + 1))}>Next</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
