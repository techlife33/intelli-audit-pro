"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Upload, CheckCircle, ClipboardCheck, CalendarIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

interface AuditFramework {
  value: string
  label: string
  description: string
}

interface AuditArea {
  value: string
  label: string
}

interface EvidenceItem {
  id: string
  criteriaCategory: string
  criteriaDefinition: string
  pageNumber: number
  evidenceExtract: string
  confidence: number
  aiExplanation: string
  status: "pending" | "approved" | "rejected"
  comment?: string
}

const auditFrameworks: AuditFramework[] = [
  { value: "ncqa", label: "NCQA Health Plan Accreditation", description: "Healthcare quality accreditation" },
  { value: "sox", label: "SOX Compliance", description: "Sarbanes-Oxley financial compliance" },
  { value: "hipaa", label: "HIPAA Security Assessment", description: "Healthcare privacy and security" },
  { value: "iso", label: "ISO 27001", description: "Information security management" },
  { value: "custom", label: "Custom Audit", description: "Define your own audit framework" },
]

const auditAreas: AuditArea[] = [
  { value: "credentialing", label: "Credentialing" },
  { value: "hedis", label: "HEDIS Data Validation" },
  { value: "quality_management", label: "Quality Management" },
  { value: "utilization_management", label: "Utilization Management" },
  { value: "member_rights", label: "Member Rights" },
  { value: "provider_network", label: "Provider Network" },
  { value: "general", label: "General Documents" },
]

const mockEvidence: EvidenceItem[] = [
  {
    id: "e1",
    criteriaCategory: "Credentialing",
    criteriaDefinition: "Verify physician's board certification.",
    pageNumber: 12,
    evidenceExtract: "Dr. Smith's board certification from ABMS, dated 2022.",
    confidence: 95,
    aiExplanation: "Identified board certification details matching criteria for physician credentialing.",
    status: "pending",
  },
  {
    id: "e2",
    criteriaCategory: "Quality Management",
    criteriaDefinition: "Review patient complaint resolution process.",
    pageNumber: 34,
    evidenceExtract: "Complaint log entry #2023-005, resolved within 7 days.",
    confidence: 88,
    aiExplanation: "Found a complaint resolution record with a timely resolution, aligning with QM process.",
    status: "pending",
  },
  {
    id: "e3",
    criteriaCategory: "HEDIS Data Validation",
    criteriaDefinition: "Confirm immunization records for pediatric patients.",
    pageNumber: 56,
    evidenceExtract: "Patient chart for Jane Doe, showing MMR vaccine administered on 01/15/2023.",
    confidence: 92,
    aiExplanation: "Extracted immunization date from patient chart, matching HEDIS criteria for pediatric vaccines.",
    status: "pending",
  },
  {
    id: "e4",
    criteriaCategory: "Provider Network",
    criteriaDefinition: "Ensure provider contracts are up-to-date.",
    pageNumber: 78,
    evidenceExtract: "Contract with ABC Clinic, valid until 12/31/2024.",
    confidence: 85,
    aiExplanation: "Identified contract validity period, indicating an active and current provider agreement.",
    status: "pending",
  },
]

const steps = [
  { label: "Create Audit" },
  { label: "Document Upload" },
  { label: "Review Document" },
  { label: "Review Summary" },
]

export default function NewFlowPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [auditName, setAuditName] = useState("")
  const [auditFramework, setAuditFramework] = useState("")
  const [selectedAuditAreas, setSelectedAuditAreas] = useState<string[]>([])
  const [dueDate, setDueDate] = useState<Date>()
  const [description, setDescription] = useState("")
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null)
  const [documentMeta, setDocumentMeta] = useState<{ name: string; size: string; type: string } | null>(null)
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(mockEvidence)
  const [finalComments, setFinalComments] = useState("")

  const totalSteps = steps.length

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setUploadedDocument(file)
      setDocumentMeta({
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleToggleAuditArea = (areaValue: string) => {
    setSelectedAuditAreas((prev) =>
      prev.includes(areaValue) ? prev.filter((a) => a !== areaValue) : [...prev, areaValue],
    )
  }

  const handleEvidenceAction = (id: string, status: "approved" | "rejected", comment?: string) => {
    setEvidenceItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status, comment: item.comment || comment } : item)),
    )
  }

  const allEvidenceReviewed = useMemo(() => {
    return evidenceItems.every((item) => item.status !== "pending")
  }, [evidenceItems])

  const compliancePercentage = useMemo(() => {
    if (evidenceItems.length === 0) return 0
    const approvedCount = evidenceItems.filter((item) => item.status === "approved").length
    return Math.round((approvedCount / evidenceItems.length) * 100)
  }, [evidenceItems])

  const overallRiskAssessment = useMemo(() => {
    if (compliancePercentage >= 90) return "Low Risk"
    if (compliancePercentage >= 70) return "Medium Risk"
    return "High Risk"
  }, [compliancePercentage])

  const isStep1Complete = auditName && auditFramework && selectedAuditAreas.length > 0 && dueDate
  const isStep2Complete = uploadedDocument !== null
  const isStep3Complete = allEvidenceReviewed

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-40 shrink-0 items-start justify-center gap-2 bg-white px-4 md:px-6 relative pt-4">
          <SidebarTrigger className="absolute left-4 top-4 z-10" />
          <div className="flex flex-col items-center w-full space-y-8">
            {/* Title Section */}
            <div className="text-center pt-2">
              <h1 className="text-2xl font-bold text-gray-900">New Audit Flow</h1>
            </div>

            {/* Progress Steps Section - Redesigned with more compact layout */}
            <div className="w-full max-w-4xl px-8">
              <div className="flex items-center justify-between relative">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col items-center relative z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-200 border-4 ${
                        currentStep === index + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : currentStep > index + 1
                            ? "bg-blue-100 text-blue-600 border-blue-600"
                            : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`text-xs mt-3 text-center max-w-20 leading-tight transition-colors duration-200 ${
                        currentStep === index + 1 ? "font-semibold text-blue-600" : "text-gray-600"
                      }`}
                    >
                      {step.label}
                    </div>
                  </div>
                ))}

                {/* Progress line behind the circles */}
                <div className="absolute top-6 left-6 right-6 h-1 bg-gray-200 -z-10">
                  <div
                    className="h-full bg-blue-600 transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 pt-8">
          {/* Step 1: Create a new Audit */}
          {currentStep === 1 && (
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 max-w-5xl mx-auto w-full">
              <h2 className="text-xl font-semibold mb-4">Step 1: Create New Audit</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="audit-name">Audit Name</Label>
                  <Input
                    id="audit-name"
                    placeholder="e.g., NCQA Accreditation 2024"
                    value={auditName}
                    onChange={(e) => setAuditName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="audit-framework">Audit Framework</Label>
                  <Select value={auditFramework} onValueChange={setAuditFramework}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audit framework" />
                    </SelectTrigger>
                    <SelectContent>
                      {auditFrameworks.map((framework) => (
                        <SelectItem key={framework.value} value={framework.value}>
                          <div>
                            <div className="font-medium">{framework.label}</div>
                            <div className="text-sm text-gray-500">{framework.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Audit Areas</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {auditAreas.map((area) => (
                      <div key={area.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`area-${area.value}`}
                          checked={selectedAuditAreas.includes(area.value)}
                          onCheckedChange={() => handleToggleAuditArea(area.value)}
                        />
                        <Label htmlFor={`area-${area.value}`}>{area.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the audit scope and objectives"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <Button onClick={handleNext} disabled={!isStep1Complete}>
                  Next: Document Upload
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {currentStep === 2 && (
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 max-w-5xl mx-auto w-full">
              <h2 className="text-xl font-semibold mb-4">Step 2: Document Upload</h2>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  uploadedDocument ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {uploadedDocument ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Document Uploaded Successfully!</h3>
                    {documentMeta && (
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <strong>Name:</strong> {documentMeta.name}
                        </p>
                        <p>
                          <strong>Size:</strong> {documentMeta.size}
                        </p>
                        <p>
                          <strong>Type:</strong> {documentMeta.type}
                        </p>
                      </div>
                    )}
                    <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setUploadedDocument(null)}>
                      <X className="h-4 w-4 mr-2" />
                      Remove Document
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Drop file here or click to upload</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Supports PDF, Word, Excel, PowerPoint, and image files up to 50MB
                    </p>
                    <input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
                    />
                    <Button asChild>
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Select File
                      </label>
                    </Button>
                  </>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isStep2Complete}>
                  Next: Review Document
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review Document */}
          {currentStep === 3 && (
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 max-w-5xl mx-auto w-full">
              <h2 className="text-xl font-semibold mb-4">Step 3: Review Document Evidence</h2>
              <p className="text-sm text-gray-600 mb-4">
                Review the AI-extracted evidence. All items must be approved or rejected to proceed.
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Definition</TableHead>
                      <TableHead>Page #</TableHead>
                      <TableHead>Evidence Extract</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>AI Explanation</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evidenceItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.criteriaCategory}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{item.criteriaDefinition}</TableCell>
                        <TableCell>{item.pageNumber}</TableCell>
                        <TableCell className="max-w-[250px] truncate">{item.evidenceExtract}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {item.confidence}%
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-[250px] truncate">{item.aiExplanation}</TableCell>
                        <TableCell className="text-center">
                          {item.status === "approved" && (
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" /> Approved
                            </Badge>
                          )}
                          {item.status === "rejected" && (
                            <Badge className="bg-red-100 text-red-800">
                              <X className="h-3 w-3 mr-1" /> Rejected
                            </Badge>
                          )}
                          {item.status === "pending" && <Badge className="bg-gray-100 text-gray-800">Pending</Badge>}
                        </TableCell>
                        <TableCell className="space-x-2">
                          {item.status === "pending" ? (
                            <>
                              <Button size="sm" onClick={() => handleEvidenceAction(item.id, "approved")}>
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEvidenceAction(item.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="ghost" onClick={() => handleEvidenceAction(item.id, "pending")}>
                              Reset
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext} disabled={!isStep3Complete}>
                  Next: Review Summary
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review of the summary of the audit */}
          {currentStep === 4 && (
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600 max-w-5xl mx-auto w-full">
              <h2 className="text-xl font-semibold mb-4">Step 4: Audit Summary & Final Review</h2>
              <div className="space-y-4">
                <div>
                  <Label>Compliance Percentage</Label>
                  <Progress value={compliancePercentage} className="h-4 mt-2" />
                  <div className="text-lg font-bold text-center mt-2">{compliancePercentage}% Compliant</div>
                </div>

                <div>
                  <Label>Overall Risk Assessment</Label>
                  <Badge
                    className={`mt-2 text-lg px-4 py-2 ${
                      overallRiskAssessment === "Low Risk"
                        ? "bg-green-100 text-green-800"
                        : overallRiskAssessment === "Medium Risk"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {overallRiskAssessment}
                  </Badge>
                </div>

                <div>
                  <Label htmlFor="final-comments">Final Comments</Label>
                  <Textarea
                    id="final-comments"
                    placeholder="Add any final comments or notes for this audit."
                    value={finalComments}
                    onChange={(e) => setFinalComments(e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={() => alert("Audit Review Completed!")}>
                  <ClipboardCheck className="h-4 w-4 mr-2" />
                  Complete Review
                </Button>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
