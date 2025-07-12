"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, FileText, Users, AlertCircle, CheckCircle, Clock, Brain } from "lucide-react"
import { NewAuditModal } from "@/components/new-audit-modal"

interface Audit {
  id: string
  name: string
  type: string
  status: "In Progress" | "Completed" | "Pending Review" | "Draft"
  progress: number
  dueDate: string
  documentsCount: number
  evidenceCount: number
  assignedTo: string[]
}

const mockAudits: Audit[] = [
  {
    id: "1",
    name: "NCQA Accreditation 2024",
    type: "NCQA",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-03-15",
    documentsCount: 127,
    evidenceCount: 89,
    assignedTo: ["Sarah Johnson", "Mike Chen", "Lisa Rodriguez"],
  },
  {
    id: "2",
    name: "SOX Compliance Q4",
    type: "SOX",
    status: "Pending Review",
    progress: 90,
    dueDate: "2024-02-28",
    documentsCount: 203,
    evidenceCount: 156,
    assignedTo: ["David Kim", "Anna Martinez"],
  },
  {
    id: "3",
    name: "HIPAA Security Assessment",
    type: "HIPAA",
    status: "Draft",
    progress: 25,
    dueDate: "2024-04-10",
    documentsCount: 45,
    evidenceCount: 23,
    assignedTo: ["Robert Taylor"],
  },
]

export default function Dashboard() {
  const [selectedAudit, setSelectedAudit] = useState<string | null>(null)
  const [showNewAuditModal, setShowNewAuditModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending Review":
        return "bg-yellow-100 text-yellow-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Pending Review":
        return <AlertCircle className="h-4 w-4" />
      case "Draft":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleOpenAudit = (auditId: string) => {
    window.location.href = `/audit/${auditId}`
  }

  const handleAIConfiguration = () => {
    window.location.href = `/ai-configuration`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">IntelliAudit Pro</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowNewAuditModal(true)}>
                <FileText className="h-4 w-4 mr-2" />
                New Audit
              </Button>
              <Button variant="outline" onClick={handleAIConfiguration}>
                <Brain className="h-4 w-4 mr-2" />
                AI Configuration
              </Button>
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">SJ</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Audits</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Team Members</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Due This Month</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Audits List */}
        <Card>
          <CardHeader>
            <CardTitle>Current Audits</CardTitle>
            <CardDescription>Manage and track your ongoing audit processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAudits.map((audit) => (
                <div
                  key={audit.id}
                  className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedAudit(audit.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold text-gray-900">{audit.name}</h3>
                      <Badge variant="secondary">{audit.type}</Badge>
                      <Badge className={getStatusColor(audit.status)}>
                        {getStatusIcon(audit.status)}
                        <span className="ml-1">{audit.status}</span>
                      </Badge>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenAudit(audit.id)
                      }}
                    >
                      Open Audit
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Due: {audit.dueDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      {audit.documentsCount} Documents
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {audit.evidenceCount} Evidence Items
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{audit.progress}%</span>
                    </div>
                    <Progress value={audit.progress} className="h-2" />
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Assigned to:</span>
                    <div className="flex space-x-1">
                      {audit.assignedTo.map((person, index) => (
                        <div
                          key={index}
                          className="h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white"
                          title={person}
                        >
                          {person
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Audit Modal */}
      <NewAuditModal isOpen={showNewAuditModal} onClose={() => setShowNewAuditModal(false)} />
    </div>
  )
}
