"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, TestTube, Eye, Save, X } from "lucide-react"

interface AddExtractionRuleModalProps {
  isOpen: boolean
  onClose: () => void
  auditAreas: Array<{
    id: string
    name: string
    enabled: boolean
    priority: string
    requirements: number
    description: string
  }>
}

export function AddExtractionRuleModal({ isOpen, onClose, auditAreas }: AddExtractionRuleModalProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [ruleName, setRuleName] = useState("")
  const [selectedAuditArea, setSelectedAuditArea] = useState("")
  const [fieldType, setFieldType] = useState("")
  const [extractionMethod, setExtractionMethod] = useState("")
  const [testResults, setTestResults] = useState<any>(null)

  const fieldTypes = [
    { value: "text", label: "Text", description: "Extract text values like names, IDs, descriptions" },
    { value: "number", label: "Number", description: "Extract numeric values like percentages, counts, amounts" },
    { value: "date", label: "Date", description: "Extract date values in various formats" },
    { value: "boolean", label: "Boolean", description: "Detect presence/absence of items like signatures, checkmarks" },
    { value: "email", label: "Email", description: "Extract email addresses" },
    { value: "phone", label: "Phone", description: "Extract phone numbers" },
    { value: "currency", label: "Currency", description: "Extract monetary values" },
    { value: "percentage", label: "Percentage", description: "Extract percentage values" },
  ]

  const extractionMethods = [
    { value: "regex", label: "Regular Expression", description: "Pattern-based text matching" },
    { value: "nlp", label: "Natural Language Processing", description: "AI-powered text understanding" },
    { value: "ocr", label: "Optical Character Recognition", description: "Extract text from images/scanned documents" },
    { value: "table", label: "Table Extraction", description: "Extract data from structured tables" },
    { value: "form", label: "Form Field Detection", description: "Identify and extract form field values" },
    { value: "signature", label: "Signature Detection", description: "Detect presence of signatures or stamps" },
  ]

  const documentTypes = [
    { id: "policy", label: "Policy Documents", checked: false },
    { id: "credential", label: "Credentialing Files", checked: true },
    { id: "meeting", label: "Meeting Minutes", checked: false },
    { id: "report", label: "Data Reports", checked: false },
    { id: "contract", label: "Contracts", checked: false },
    { id: "certificate", label: "Certificates", checked: true },
  ]

  const [selectedDocTypes, setSelectedDocTypes] = useState(
    documentTypes.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.checked }), {}),
  )

  const handleTest = () => {
    // Simulate testing the extraction rule
    setTestResults({
      totalDocuments: 156,
      matchedDocuments: 89,
      extractedFields: 127,
      confidence: 94,
      samples: [
        { document: "Provider_License_2024.pdf", extracted: "MD123456789", confidence: 98 },
        { document: "Credentialing_File_Dr_Smith.docx", extracted: "RN987654321", confidence: 92 },
        { document: "License_Verification_Report.xlsx", extracted: "PA555444333", confidence: 96 },
      ],
    })
  }

  const handleSave = () => {
    // Save the extraction rule
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            Create New Extraction Rule
          </DialogTitle>
          <DialogDescription>
            Configure AI to automatically extract specific data from documents in selected audit areas
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Setup</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rule Information</CardTitle>
                  <CardDescription>Basic details about the extraction rule</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="rule-name">Rule Name</Label>
                    <Input
                      id="rule-name"
                      placeholder="e.g., License Number Extraction"
                      value={ruleName}
                      onChange={(e) => setRuleName(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="audit-area">Target Audit Area</Label>
                    <Select value={selectedAuditArea} onValueChange={setSelectedAuditArea}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audit area" />
                      </SelectTrigger>
                      <SelectContent>
                        {auditAreas
                          .filter((area) => area.enabled)
                          .map((area) => (
                            <SelectItem key={area.id} value={area.id}>
                              <div>
                                <div className="font-medium">{area.name}</div>
                                <div className="text-sm text-gray-500">{area.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="field-type">Data Type to Extract</Label>
                    <Select value={fieldType} onValueChange={setFieldType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fieldTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-gray-500">{type.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this rule extracts and why it's important for the audit..."
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Extraction Method</CardTitle>
                  <CardDescription>Choose how AI will extract the data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="extraction-method">Method</Label>
                    <Select value={extractionMethod} onValueChange={setExtractionMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select extraction method" />
                      </SelectTrigger>
                      <SelectContent>
                        {extractionMethods.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            <div>
                              <div className="font-medium">{method.label}</div>
                              <div className="text-sm text-gray-500">{method.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {extractionMethod === "regex" && (
                    <div>
                      <Label htmlFor="regex-pattern">Regular Expression Pattern</Label>
                      <Input id="regex-pattern" placeholder="e.g., [A-Z]{2}\d{9}" className="font-mono" />
                      <p className="text-sm text-gray-600 mt-1">
                        Pattern for license numbers: 2 letters followed by 9 digits
                      </p>
                    </div>
                  )}

                  {extractionMethod === "nlp" && (
                    <div>
                      <Label htmlFor="nlp-keywords">Keywords/Phrases</Label>
                      <Input id="nlp-keywords" placeholder="license number, license #, medical license" />
                      <p className="text-sm text-gray-600 mt-1">
                        AI will look for these terms to identify relevant data
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label>Advanced Options</Label>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Case sensitive</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Multi-line extraction</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Validate extracted data</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Types</CardTitle>
                  <CardDescription>Select which document types this rule should process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {documentTypes.map((docType) => (
                      <div key={docType.id} className="flex items-center space-x-3">
                        <Checkbox
                          id={docType.id}
                          checked={selectedDocTypes[docType.id]}
                          onCheckedChange={(checked) =>
                            setSelectedDocTypes((prev) => ({ ...prev, [docType.id]: checked }))
                          }
                        />
                        <Label htmlFor={docType.id} className="cursor-pointer">
                          {docType.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Validation Rules</CardTitle>
                  <CardDescription>Configure data validation and quality checks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="min-confidence">Minimum Confidence Threshold</Label>
                    <Select defaultValue="85">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="70">70% - Low</SelectItem>
                        <SelectItem value="85">85% - Medium</SelectItem>
                        <SelectItem value="95">95% - High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="validation-pattern">Validation Pattern (Optional)</Label>
                    <Input id="validation-pattern" placeholder="Additional validation regex" className="font-mono" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Require human review for low confidence</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Flag duplicate extractions</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Auto-correct common errors</Label>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Output Configuration</CardTitle>
                <CardDescription>Configure how extracted data is stored and displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="output-field">Output Field Name</Label>
                    <Input
                      id="output-field"
                      placeholder="e.g., license_number"
                      value={ruleName.toLowerCase().replace(/\s+/g, "_")}
                    />
                  </div>
                  <div>
                    <Label htmlFor="output-format">Output Format</Label>
                    <Select defaultValue="raw">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="raw">Raw extracted text</SelectItem>
                        <SelectItem value="formatted">Apply formatting</SelectItem>
                        <SelectItem value="normalized">Normalize format</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TestTube className="h-5 w-5 mr-2" />
                  Test Extraction Rule
                </CardTitle>
                <CardDescription>Test your rule against existing documents to validate accuracy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50">
                  <div>
                    <h4 className="font-medium text-blue-900">Ready to Test</h4>
                    <p className="text-sm text-blue-800">
                      Rule will be tested against{" "}
                      {selectedDocTypes ? Object.values(selectedDocTypes).filter(Boolean).length : 0} document types in
                      the {auditAreas.find((area) => area.id === selectedAuditArea)?.name || "selected"} audit area
                    </p>
                  </div>
                  <Button onClick={handleTest} disabled={!ruleName || !selectedAuditArea || !fieldType}>
                    <TestTube className="h-4 w-4 mr-1" />
                    Run Test
                  </Button>
                </div>

                {testResults && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">{testResults.totalDocuments}</p>
                        <p className="text-sm text-gray-600">Total Documents</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-green-600">{testResults.matchedDocuments}</p>
                        <p className="text-sm text-gray-600">Matched</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">{testResults.extractedFields}</p>
                        <p className="text-sm text-gray-600">Extracted Fields</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-orange-600">{testResults.confidence}%</p>
                        <p className="text-sm text-gray-600">Avg Confidence</p>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle>Sample Extractions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {testResults.samples.map((sample, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium text-sm">{sample.document}</p>
                                <p className="text-sm text-gray-600">
                                  Extracted: <code className="bg-gray-100 px-1 rounded">{sample.extracted}</code>
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className="bg-green-100 text-green-800">{sample.confidence}%</Badge>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Rule Summary</CardTitle>
                <CardDescription>Review your extraction rule configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Rule Name</Label>
                    <p className="font-medium">{ruleName || "Untitled Rule"}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Audit Area</Label>
                    <p className="font-medium">
                      {auditAreas.find((area) => area.id === selectedAuditArea)?.name || "Not selected"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Data Type</Label>
                    <p className="font-medium">
                      {fieldTypes.find((type) => type.value === fieldType)?.label || "Not selected"}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Extraction Method</Label>
                    <p className="font-medium">
                      {extractionMethods.find((method) => method.value === extractionMethod)?.label || "Not selected"}
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">Target Document Types</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {Object.entries(selectedDocTypes)
                      .filter(([_, checked]) => checked)
                      .map(([docId, _]) => (
                        <Badge key={docId} variant="outline">
                          {documentTypes.find((doc) => doc.id === docId)?.label}
                        </Badge>
                      ))}
                  </div>
                </div>

                {testResults && (
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium text-gray-500">Test Results</Label>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm">
                        <strong>{testResults.extractedFields}</strong> fields extracted from{" "}
                        <strong>{testResults.matchedDocuments}</strong> documents
                      </span>
                      <Badge className="bg-green-100 text-green-800">{testResults.confidence}% confidence</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">AI Integration Ready</span>
              </div>
              <p className="text-sm text-blue-800">
                This rule will be automatically applied to new documents uploaded to the{" "}
                {auditAreas.find((area) => area.id === selectedAuditArea)?.name} audit area. Extracted data will be
                available for evidence management and reporting.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" disabled={!testResults}>
              Save as Draft
            </Button>
            <Button onClick={handleSave} disabled={!ruleName || !selectedAuditArea || !fieldType}>
              <Save className="h-4 w-4 mr-1" />
              Create Rule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
