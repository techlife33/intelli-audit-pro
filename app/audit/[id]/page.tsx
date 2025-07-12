"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, Brain, Eye, Download } from "lucide-react"
import { AIExplanationModal } from "@/components/ai-explanation-modal"
import { DocumentViewer } from "@/components/document-viewer"
import { SampleTestingWorkflow } from "@/components/sample-testing-workflow"
import { TeamCollaboration } from "@/components/team-collaboration"
import { ReportTemplates } from "@/components/report-templates"
import { DocumentUpload } from "@/components/document-upload"

export default function AuditDetail() {
  const [activeTab, setActiveTab] = useState("overview")

  // State management for modals and navigation
  const [showAIModal, setShowAIModal] = useState(false)
  const [showDocumentViewer, setShowDocumentViewer] = useState(false)
  const [showSampleTesting, setShowSampleTesting] = useState(false)
  const [showCollaboration, setShowCollaboration] = useState(false)
  const [showReportTemplate, setShowReportTemplate] = useState(false)
  const [showDocumentUpload, setShowDocumentUpload] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  // Mock data for NCQA audit
  const auditData = {
    id: "1",
    name: "NCQA Accreditation 2024",
    type: "NCQA",
    status: "In Progress",
    progress: 65,
    dueDate: "2024-03-15",
    framework: "NCQA Health Plan Accreditation",
    areas: [
      { name: "Credentialing", progress: 85, status: "Complete", documents: 23, evidence: 18 },
      { name: "HEDIS Data Validation", progress: 70, status: "In Progress", documents: 34, evidence: 25 },
      { name: "Quality Management", progress: 45, status: "In Progress", documents: 28, evidence: 15 },
      { name: "Utilization Management", progress: 30, status: "Pending", documents: 19, evidence: 8 },
      { name: "Member Rights", progress: 90, status: "Complete", documents: 15, evidence: 12 },
      { name: "Provider Network", progress: 55, status: "In Progress", documents: 31, evidence: 20 },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleBackToDashboard = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleBackToDashboard}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{auditData.name}</h1>
                <p className="text-sm text-gray-600">{auditData.framework}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={getStatusColor(auditData.status)}>{auditData.status}</Badge>
              <Button variant="outline" onClick={() => setShowReportTemplate(true)}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="evidence">Evidence</TabsTrigger>
            <TabsTrigger value="samples">Samples</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Progress</CardTitle>
                <CardDescription>Overall completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Overall Progress</span>
                    <span className="text-2xl font-bold text-blue-600">{auditData.progress}%</span>
                  </div>
                  <Progress value={auditData.progress} className="h-3" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">2</p>
                      <p className="text-sm text-gray-600">Complete</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-600">1</p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Audit Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Audit Areas</CardTitle>
                <CardDescription>Progress by NCQA accreditation area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditData.areas.map((area, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900">{area.name}</h3>
                        <Badge className={getStatusColor(area.status)}>{area.status}</Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress: {area.progress}%</span>
                        <span>
                          {area.documents} docs • {area.evidence} evidence
                        </span>
                      </div>
                      <Progress value={area.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Document Management</CardTitle>
                    <CardDescription>AI-powered document classification and organization</CardDescription>
                  </div>
                  <Button onClick={() => setShowDocumentUpload(true)}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* AI Classification Example */}
                  <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
                    <div className="flex items-center mb-2">
                      <Brain className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-semibold text-blue-900">AI Classification Active</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Documents are automatically classified by audit area using AI analysis. Review and confirm AI
                      suggestions below.
                    </p>
                  </div>

                  {/* Sample Documents */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Provider Credentialing Policy v2.1.pdf</h4>
                          <p className="text-sm text-gray-600">Uploaded 2 hours ago • 2.3 MB</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">
                          <Brain className="h-3 w-3 mr-1" />
                          Credentialing
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => setShowAIModal(true)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Review AI
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">HEDIS Data Collection Manual 2024.xlsx</h4>
                          <p className="text-sm text-gray-600">Uploaded 1 day ago • 5.7 MB</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          <Brain className="h-3 w-3 mr-1" />
                          HEDIS Data
                        </Badge>
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Confirmed
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-white">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Quality Committee Minutes Q4-2023.docx</h4>
                          <p className="text-sm text-gray-600">Uploaded 3 days ago • 1.2 MB</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-orange-100 text-orange-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Needs Review
                        </Badge>
                        <Button variant="outline" size="sm" onClick={() => setShowAIModal(true)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Review AI
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="evidence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evidence Management</CardTitle>
                <CardDescription>AI-extracted evidence with explainable reasoning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Evidence Items */}
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Provider License Verification</h4>
                        <p className="text-sm text-gray-600">Credentialing • Required Evidence</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center mb-2">
                        <Brain className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm font-medium text-blue-900">AI Extraction</span>
                      </div>
                      <p className="text-sm text-blue-800">
                        Found 23 provider license verifications with valid dates. Extracted from
                        "Provider_Credentials_2024.xlsx" - Column D (License Numbers) and Column E (Expiration Dates).
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowDocumentViewer(true)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Source & Logic
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Committee Meeting Minutes</h4>
                        <p className="text-sm text-gray-600">Quality Management • Required Evidence</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Needs Review
                      </Badge>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg mb-3">
                      <div className="flex items-center mb-2">
                        <Brain className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-sm font-medium text-orange-900">AI Analysis</span>
                      </div>
                      <p className="text-sm text-orange-800">
                        Found meeting minutes but missing required attendance signatures. Detected in
                        "QC_Minutes_Q4.docx" - Pages 3, 7, 12 lack signature blocks.
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setShowDocumentViewer(true)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Review Details
                      </Button>
                      <Button size="sm" onClick={() => setShowCollaboration(true)}>
                        Request Additional Evidence
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="samples" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sample Testing</CardTitle>
                <CardDescription>AI-selected samples for detailed review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded-r-lg">
                    <div className="flex items-center mb-2">
                      <Brain className="h-5 w-5 text-purple-600 mr-2" />
                      <span className="font-semibold text-purple-900">AI Sample Selection</span>
                    </div>
                    <p className="text-sm text-purple-800">
                      25 samples selected based on risk factors, materiality thresholds, and statistical requirements.
                    </p>
                  </div>

                  {/* Sample Items */}
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">Provider ID: PRV-2024-0156</h4>
                          <p className="text-sm text-gray-600">High-risk specialty provider</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                      <div className="text-sm text-gray-700 mb-3">
                        <strong>Selection Rationale:</strong> New provider with specialty credentials, high claim volume
                        ($2.3M), recent license renewal.
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setShowDocumentViewer(true)}>
                          Review Documents
                        </Button>
                        <Button size="sm" onClick={() => setShowSampleTesting(true)}>
                          Start Testing
                        </Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 bg-white">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">Member ID: MBR-2024-7891</h4>
                          <p className="text-sm text-gray-600">Complex care coordination case</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                      <div className="text-sm text-gray-700 mb-3">
                        <strong>Selection Rationale:</strong> Multiple chronic conditions, high utilization pattern,
                        care management involvement.
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setShowDocumentViewer(true)}>
                          Review Documents
                        </Button>
                        <Button size="sm" onClick={() => setShowSampleTesting(true)}>
                          Start Testing
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review & Validation</CardTitle>
                <CardDescription>Human oversight of AI findings and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Review Items */}
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Credentialing Compliance</h4>
                        <p className="text-sm text-gray-600">AI Summary • Requires Validation</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">85% Complete</Badge>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>AI Finding:</strong> 23 of 25 provider files contain complete credentialing
                        documentation. 2 files missing current malpractice insurance certificates.
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setShowCollaboration(true)}>
                        Add Annotation
                      </Button>
                      <Button size="sm" onClick={() => setShowCollaboration(true)}>
                        Approve Finding
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">HEDIS Data Accuracy</h4>
                        <p className="text-sm text-gray-600">AI Analysis • Flagged Issues</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>AI Finding:</strong> Data validation rules show 3.2% error rate in diabetes care
                        measures. Recommend additional sampling for HbA1c testing documentation.
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setShowAIModal(true)}>
                        Review Details
                      </Button>
                      <Button size="sm" onClick={() => setShowCollaboration(true)}>
                        Request Follow-up
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Reports</CardTitle>
                <CardDescription>Generated reports and executive summaries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">NCQA Readiness Assessment</h4>
                        <p className="text-sm text-gray-600">Executive Summary • Draft</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setShowReportTemplate(true)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" onClick={() => setShowReportTemplate(true)}>
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      Overall readiness: 85% • 2 critical findings • 5 recommendations
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Detailed Findings Report</h4>
                        <p className="text-sm text-gray-600">Complete Analysis • 47 pages</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => setShowReportTemplate(true)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" onClick={() => setShowReportTemplate(true)}>
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-700">
                      Includes all evidence, AI analysis, and human validations with full traceability
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* All Modals */}
      <AIExplanationModal isOpen={showAIModal} onClose={() => setShowAIModal(false)} />
      <DocumentViewer isOpen={showDocumentViewer} onClose={() => setShowDocumentViewer(false)} />
      <SampleTestingWorkflow isOpen={showSampleTesting} onClose={() => setShowSampleTesting(false)} />
      <TeamCollaboration isOpen={showCollaboration} onClose={() => setShowCollaboration(false)} />
      <ReportTemplates isOpen={showReportTemplate} onClose={() => setShowReportTemplate(false)} />
      <DocumentUpload isOpen={showDocumentUpload} onClose={() => setShowDocumentUpload(false)} />
    </div>
  )
}
