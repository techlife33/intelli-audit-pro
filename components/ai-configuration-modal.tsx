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
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Settings, CheckCircle, Plus, Edit, Trash2, Save, RefreshCw } from "lucide-react"

interface AIConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AIConfigurationModal({ isOpen, onClose }: AIConfigurationModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedFramework, setSelectedFramework] = useState("ncqa")
  const [confidenceThreshold, setConfidenceThreshold] = useState([85])

  const frameworks = [
    { value: "ncqa", label: "NCQA Health Plan", areas: 6, templates: 12, rules: 45 },
    { value: "sox", label: "SOX Compliance", areas: 4, templates: 8, rules: 32 },
    { value: "hipaa", label: "HIPAA Security", areas: 5, templates: 10, rules: 28 },
    { value: "iso", label: "ISO 27001", areas: 7, templates: 15, rules: 52 },
  ]

  const auditAreas = [
    {
      id: "credentialing",
      name: "Credentialing",
      enabled: true,
      priority: "High",
      requirements: 15,
      description: "Provider credentialing and verification processes",
    },
    {
      id: "hedis",
      name: "HEDIS Data Validation",
      enabled: true,
      priority: "High",
      requirements: 22,
      description: "Healthcare effectiveness data and information set validation",
    },
    {
      id: "quality",
      name: "Quality Management",
      enabled: true,
      priority: "Medium",
      requirements: 18,
      description: "Quality assurance and improvement programs",
    },
    {
      id: "utilization",
      name: "Utilization Management",
      enabled: false,
      priority: "Medium",
      requirements: 12,
      description: "Medical necessity and utilization review processes",
    },
    {
      id: "member",
      name: "Member Rights",
      enabled: true,
      priority: "Low",
      requirements: 8,
      description: "Member rights and responsibilities compliance",
    },
  ]

  const classificationTemplates = [
    {
      id: "policy",
      name: "Policy Documents",
      keywords: ["policy", "procedure", "guideline", "standard"],
      confidence: 92,
      enabled: true,
    },
    {
      id: "credential",
      name: "Credentialing Files",
      keywords: ["license", "certification", "credential", "verification"],
      confidence: 95,
      enabled: true,
    },
    {
      id: "data",
      name: "Data Reports",
      keywords: ["report", "analysis", "data", "metrics", "hedis"],
      confidence: 88,
      enabled: true,
    },
    {
      id: "meeting",
      name: "Meeting Minutes",
      keywords: ["minutes", "meeting", "committee", "agenda"],
      confidence: 90,
      enabled: true,
    },
  ]

  const extractionRules = [
    {
      id: "dates",
      name: "Date Extraction",
      pattern: "MM/DD/YYYY, DD-MM-YYYY",
      confidence: 94,
      enabled: true,
      description: "Extract dates from documents for compliance tracking",
    },
    {
      id: "licenses",
      name: "License Numbers",
      pattern: "Alphanumeric patterns",
      confidence: 96,
      enabled: true,
      description: "Identify and extract professional license numbers",
    },
    {
      id: "signatures",
      name: "Signature Detection",
      pattern: "Image recognition",
      confidence: 87,
      enabled: true,
      description: "Detect presence of signatures in documents",
    },
    {
      id: "percentages",
      name: "Performance Metrics",
      pattern: "Percentage values",
      confidence: 91,
      enabled: true,
      description: "Extract performance percentages and metrics",
    },
  ]

  const sampleCriteria = [
    {
      id: "risk",
      name: "Risk-Based Sampling",
      weight: 40,
      enabled: true,
      description: "Prioritize high-risk items for testing",
    },
    {
      id: "monetary",
      name: "Monetary Threshold",
      weight: 30,
      enabled: true,
      description: "Sample based on financial materiality",
    },
    {
      id: "random",
      name: "Statistical Random",
      weight: 20,
      enabled: true,
      description: "Random statistical sampling for coverage",
    },
    {
      id: "judgmental",
      name: "Judgmental Selection",
      weight: 10,
      enabled: false,
      description: "Manual auditor selection criteria",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            AI Configuration Center
          </DialogTitle>
          <DialogDescription>
            Configure AI behavior, templates, and rules for intelligent audit processing
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="areas">Audit Areas</TabsTrigger>
            <TabsTrigger value="classification">Classification</TabsTrigger>
            <TabsTrigger value="extraction">Extraction</TabsTrigger>
            <TabsTrigger value="sampling">Sampling</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Framework Selection
                  </CardTitle>
                  <CardDescription>Choose your audit framework for AI configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frameworks.map((framework) => (
                        <SelectItem key={framework.value} value={framework.value}>
                          {framework.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">
                        {frameworks.find((f) => f.value === selectedFramework)?.areas}
                      </p>
                      <p className="text-sm text-gray-600">Audit Areas</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        {frameworks.find((f) => f.value === selectedFramework)?.templates}
                      </p>
                      <p className="text-sm text-gray-600">Templates</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">
                        {frameworks.find((f) => f.value === selectedFramework)?.rules}
                      </p>
                      <p className="text-sm text-gray-600">AI Rules</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    AI Confidence Settings
                  </CardTitle>
                  <CardDescription>Configure AI confidence thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Minimum Confidence Threshold: {confidenceThreshold[0]}%</Label>
                    <Slider
                      value={confidenceThreshold}
                      onValueChange={setConfidenceThreshold}
                      max={100}
                      min={50}
                      step={5}
                      className="mt-2"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      AI suggestions below this threshold will require human review
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Auto-approve high confidence items</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Enable continuous learning</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Real-time processing</Label>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Automatic Setup Includes</CardTitle>
                <CardDescription>AI will automatically configure these components</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Pre-configured audit areas and requirements
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Document classification templates
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Evidence extraction rules
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Sample testing criteria
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Report templates
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      Compliance validation rules
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Audit Areas Configuration</h3>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Add Custom Area
              </Button>
            </div>

            <div className="space-y-4">
              {auditAreas.map((area) => (
                <Card key={area.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Switch checked={area.enabled} />
                        <div>
                          <h4 className="font-medium">{area.name}</h4>
                          <p className="text-sm text-gray-600">{area.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            area.priority === "High"
                              ? "destructive"
                              : area.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {area.priority}
                        </Badge>
                        <Badge variant="outline">{area.requirements} requirements</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="classification" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Document Classification Templates</h3>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Template
              </Button>
            </div>

            <div className="space-y-4">
              {classificationTemplates.map((template) => (
                <Card key={template.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Switch checked={template.enabled} />
                        <div>
                          <h4 className="font-medium">{template.name}</h4>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {template.keywords.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-100 text-green-800">{template.confidence}% accuracy</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Create New Classification Template</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input placeholder="e.g., Contract Documents" />
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Policy Documents</SelectItem>
                        <SelectItem value="financial">Financial Records</SelectItem>
                        <SelectItem value="operational">Operational Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Keywords (comma-separated)</Label>
                  <Input placeholder="contract, agreement, terms, conditions" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Describe what this template identifies..." />
                </div>
                <Button>Create Template</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="extraction" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Evidence Extraction Rules</h3>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Add Rule
              </Button>
            </div>

            <div className="space-y-4">
              {extractionRules.map((rule) => (
                <Card key={rule.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Switch checked={rule.enabled} />
                        <div>
                          <h4 className="font-medium">{rule.name}</h4>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Pattern: {rule.pattern}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-blue-100 text-blue-800">{rule.confidence}% accuracy</Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sampling" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Sample Testing Criteria</h3>
              <Button>
                <RefreshCw className="h-4 w-4 mr-1" />
                Reset to Defaults
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Sampling Methodology</CardTitle>
                <CardDescription>Configure how AI selects samples for testing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleCriteria.map((criteria) => (
                  <div key={criteria.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Switch checked={criteria.enabled} />
                      <div>
                        <h4 className="font-medium">{criteria.name}</h4>
                        <p className="text-sm text-gray-600">{criteria.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{criteria.weight}%</span>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Size Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Minimum Sample Size</Label>
                    <Input type="number" defaultValue="25" />
                  </div>
                  <div>
                    <Label>Maximum Sample Size</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                </div>
                <div>
                  <Label>Confidence Level</Label>
                  <Select defaultValue="95">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="90">90%</SelectItem>
                      <SelectItem value="95">95%</SelectItem>
                      <SelectItem value="99">99%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Report Template Configuration</h3>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Template
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>High-level overview template</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Auto-generate findings summary</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Include risk assessment</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Add recommendations</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Customize Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detailed Report</CardTitle>
                  <CardDescription>Comprehensive findings template</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Include evidence links</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Add testing details</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Append source documents</Label>
                      <Switch />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Customize Template
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-1" />
              Reset All
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-1" />
              Save Configuration
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
