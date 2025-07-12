"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, CheckCircle, AlertTriangle, FileText, Target, Zap } from "lucide-react"

interface AIExplanationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AIExplanationModal({ isOpen, onClose }: AIExplanationModalProps) {
  const [selectedEvidence, setSelectedEvidence] = useState("classification")

  const aiAnalysis = {
    classification: {
      confidence: 94,
      reasoning: "Document contains multiple credentialing-specific keywords and follows standard policy format",
      keywords: ["credentialing", "provider verification", "license validation", "committee approval"],
      structure: "Standard policy document with sections for procedures, requirements, and compliance",
      similarDocs: 12,
    },
    extraction: {
      confidence: 87,
      dataPoints: [
        { field: "License Numbers", location: "Column D, Rows 15-37", confidence: 95 },
        { field: "Expiration Dates", location: "Column E, Rows 15-37", confidence: 92 },
        { field: "Provider Names", location: "Column B, Rows 15-37", confidence: 98 },
        { field: "Specialty Codes", location: "Column F, Rows 15-37", confidence: 85 },
      ],
    },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-blue-600" />
            AI Analysis Explanation
          </DialogTitle>
          <DialogDescription>Detailed breakdown of AI reasoning and confidence levels</DialogDescription>
        </DialogHeader>

        <Tabs value={selectedEvidence} onValueChange={setSelectedEvidence} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="classification">Document Classification</TabsTrigger>
            <TabsTrigger value="extraction">Data Extraction</TabsTrigger>
          </TabsList>

          <TabsContent value="classification" className="space-y-4">
            <div className="border rounded-lg p-4 bg-blue-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900">Classification: Credentialing Policy</h3>
                <Badge className="bg-green-100 text-green-800">
                  {aiAnalysis.classification.confidence}% Confidence
                </Badge>
              </div>
              <p className="text-sm text-blue-800 mb-4">{aiAnalysis.classification.reasoning}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Key Indicators
                  </h4>
                  <div className="space-y-2">
                    {aiAnalysis.classification.keywords.map((keyword, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 text-green-600 mr-2" />
                        <span className="bg-yellow-100 px-2 py-1 rounded">{keyword}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Document Structure
                  </h4>
                  <p className="text-sm text-gray-700">{aiAnalysis.classification.structure}</p>
                  <div className="text-sm text-gray-600">
                    <strong>Similar Documents:</strong> {aiAnalysis.classification.similarDocs} in database
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Validation Required</h4>
              <p className="text-sm text-gray-700 mb-3">
                Please review the AI classification and confirm or adjust as needed. Your feedback helps improve future
                classifications.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Confirm Classification
                </Button>
                <Button variant="outline" size="sm">
                  Suggest Different Category
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="extraction" className="space-y-4">
            <div className="border rounded-lg p-4 bg-green-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-green-900">Data Extraction Results</h3>
                <Badge className="bg-blue-100 text-blue-800">
                  {aiAnalysis.extraction.confidence}% Overall Confidence
                </Badge>
              </div>

              <div className="space-y-3">
                {aiAnalysis.extraction.dataPoints.map((point, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{point.field}</span>
                      <Badge
                        className={
                          point.confidence >= 90
                            ? "bg-green-100 text-green-800"
                            : point.confidence >= 80
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {point.confidence}% Confidence
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Location:</strong> {point.location}
                    </div>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        View in Document
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                <h4 className="font-medium text-yellow-900">Attention Required</h4>
              </div>
              <p className="text-sm text-yellow-800 mb-3">
                2 data points have confidence below 90%. Please review and validate these extractions.
              </p>
              <Button size="sm" variant="outline">
                Review Low-Confidence Items
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Zap className="h-4 w-4 mr-1" />
            Apply Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
