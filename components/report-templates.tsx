"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Download, Eye, Settings, BarChart3, FileCheck } from "lucide-react"

interface ReportTemplatesProps {
  isOpen: boolean
  onClose: () => void
}

export function ReportTemplates({ isOpen, onClose }: ReportTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("executive")
  const [customSections, setCustomSections] = useState<Record<string, boolean>>({
    overview: true,
    findings: true,
    recommendations: true,
    appendix: false,
  })

  const reportTemplates = [
    {
      id: "executive",
      name: "Executive Summary",
      description: "High-level overview for leadership",
      pages: "3-5 pages",
      audience: "C-Suite, Board",
      sections: ["Executive Overview", "Key Findings", "Risk Assessment", "Recommendations"],
    },
    {
      id: "detailed",
      name: "Detailed Audit Report",
      description: "Comprehensive findings and evidence",
      pages: "25-50 pages",
      audience: "Audit Committee, Compliance Team",
      sections: ["Methodology", "Detailed Findings", "Evidence", "Testing Results", "Appendices"],
    },
    {
      id: "regulatory",
      name: "Regulatory Submission",
      description: "NCQA-formatted submission package",
      pages: "Variable",
      audience: "NCQA, Regulators",
      sections: ["Compliance Matrix", "Evidence Package", "Corrective Actions", "Attestations"],
    },
    {
      id: "dashboard",
      name: "Management Dashboard",
      description: "Visual metrics and KPIs",
      pages: "1-2 pages",
      audience: "Management Team",
      sections: ["Key Metrics", "Progress Charts", "Risk Indicators", "Action Items"],
    },
  ]

  const sampleContent = {
    executive: {
      title: "NCQA Accreditation Readiness - Executive Summary",
      content: `
**Overall Assessment:** 85% Ready for NCQA Accreditation

**Key Findings:**
• Credentialing processes meet NCQA standards (95% compliance)
• HEDIS data validation shows acceptable error rates (3.2%)
• Quality management documentation requires minor updates
• Provider network adequacy meets all requirements

**Critical Actions Required:**
• Update 2 provider malpractice insurance certificates
• Complete continuing education documentation for 3 providers
• Enhance quality committee meeting documentation

**Timeline:** Estimated 30 days to full readiness
**Risk Level:** Low to Medium
      `,
    },
    detailed: {
      title: "NCQA Accreditation Audit - Detailed Findings Report",
      content: `
**1. CREDENTIALING (Score: 95%)**
Testing Results: 23 of 25 provider files complete
Issues Identified:
• PRV-2024-0156: Expired malpractice insurance
• PRV-2024-0203: Missing continuing education credits

**2. HEDIS DATA VALIDATION (Score: 87%)**
Data Accuracy: 96.8% overall accuracy rate
Sample Testing: 250 records reviewed
Findings: Minor discrepancies in diabetes care measures

**3. QUALITY MANAGEMENT (Score: 78%)**
Committee Structure: Compliant
Documentation: Needs improvement
Meeting Minutes: Missing required signatures on 3 occasions
      `,
    },
  }

  const handleSectionToggle = (section: string, checked: boolean) => {
    setCustomSections((prev) => ({ ...prev, [section]: checked }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            Report Templates & Generation
          </DialogTitle>
          <DialogDescription>Create customized audit reports for different audiences</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedTemplate === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <Badge variant="outline">{template.pages}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                  <div className="text-xs text-gray-500 mb-3">
                    <strong>Audience:</strong> {template.audience}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-700">Sections:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.sections.map((section, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Quick Actions</h3>
              <div className="flex space-x-2">
                <Button>
                  <FileCheck className="h-4 w-4 mr-1" />
                  Generate Selected Template
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-1" />
                  Customize Template
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview Report
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Report Configuration</h3>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Report Title</label>
                    <Input placeholder="Enter custom report title" className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Audit Period</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Input type="date" />
                      <Input type="date" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Report Format</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="word">Word Document</SelectItem>
                        <SelectItem value="excel">Excel Workbook</SelectItem>
                        <SelectItem value="powerpoint">PowerPoint Presentation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Include Logo</label>
                    <div className="mt-1">
                      <Button variant="outline" size="sm">
                        Upload Company Logo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Section Selection</h3>

                <div className="space-y-3">
                  {[
                    { id: "overview", label: "Executive Overview", required: true },
                    { id: "methodology", label: "Audit Methodology", required: false },
                    { id: "findings", label: "Detailed Findings", required: true },
                    { id: "evidence", label: "Evidence Summary", required: false },
                    { id: "recommendations", label: "Recommendations", required: true },
                    { id: "timeline", label: "Implementation Timeline", required: false },
                    { id: "appendix", label: "Supporting Appendices", required: false },
                  ].map((section) => (
                    <div key={section.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={section.id}
                        checked={customSections[section.id] || section.required}
                        onCheckedChange={(checked) => handleSectionToggle(section.id, checked as boolean)}
                        disabled={section.required}
                      />
                      <label htmlFor={section.id} className="text-sm font-medium cursor-pointer flex-1">
                        {section.label}
                        {section.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3">
                  <label className="text-sm font-medium text-gray-700">Custom Instructions</label>
                  <Textarea
                    placeholder="Add specific instructions for report generation..."
                    className="mt-1 min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">AI-Powered Customization</h4>
              <p className="text-sm text-blue-800 mb-3">
                Our AI will automatically populate sections with relevant findings, evidence, and recommendations based
                on your audit data.
              </p>
              <div className="flex space-x-2">
                <Button size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Generate Custom Report
                </Button>
                <Button variant="outline" size="sm">
                  Save Template
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Report Preview</h3>
              <div className="flex space-x-2">
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>

            <div className="border rounded-lg bg-white">
              {/* Report Header */}
              <div className="border-b p-6 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      {sampleContent[selectedTemplate as keyof typeof sampleContent]?.title || "Report Title"}
                    </h1>
                    <p className="text-gray-600 mt-1">Generated on {new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">IntelliAudit Pro</div>
                    <div className="text-sm text-gray-600">Confidential</div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="p-6">
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                    {sampleContent[selectedTemplate as keyof typeof sampleContent]?.content ||
                      "Report content will be generated based on your audit data and selected template."}
                  </pre>
                </div>
              </div>

              {/* Report Footer */}
              <div className="border-t p-4 bg-gray-50 text-center text-xs text-gray-500">
                Page 1 of {reportTemplates.find((t) => t.id === selectedTemplate)?.pages || "N/A"} • Generated by
                IntelliAudit Pro
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-1" />
              Save Configuration
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-1" />
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
