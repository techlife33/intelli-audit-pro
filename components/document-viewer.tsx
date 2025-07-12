"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Eye, Download, Highlighter, MessageSquare, ZoomIn, ZoomOut } from "lucide-react"

interface DocumentViewerProps {
  isOpen: boolean
  onClose: () => void
  document?: any
}

export function DocumentViewer({ isOpen, onClose, document }: DocumentViewerProps) {
  const [zoomLevel, setZoomLevel] = useState(100)
  const [showAnnotations, setShowAnnotations] = useState(true)

  const mockDocument = {
    name: "Provider Credentialing Policy v2.1.pdf",
    pages: 12,
    highlights: [
      { page: 1, text: "credentialing committee", reason: "Key governance structure" },
      { page: 2, text: "license verification", reason: "Required evidence type" },
      { page: 3, text: "background check requirements", reason: "Compliance requirement" },
    ],
    annotations: [
      { page: 1, author: "Sarah Johnson", text: "This section aligns with NCQA standards", timestamp: "2 hours ago" },
      { page: 2, author: "Mike Chen", text: "Need to verify this matches current process", timestamp: "1 day ago" },
    ],
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-blue-600" />
            {mockDocument.name}
          </DialogTitle>
          <DialogDescription>Document viewer with AI annotations and team comments</DialogDescription>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Document Viewer */}
          <div className="flex-1 border rounded-lg bg-gray-100 relative">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-3 border-b bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{zoomLevel}%</span>
                <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={showAnnotations ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowAnnotations(!showAnnotations)}
                >
                  <Highlighter className="h-4 w-4 mr-1" />
                  Annotations
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>

            {/* Document Content */}
            <ScrollArea className="h-full p-4">
              <div
                className="space-y-4"
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top left" }}
              >
                {/* Mock Document Pages */}
                {[1, 2, 3].map((pageNum) => (
                  <div key={pageNum} className="bg-white border shadow-sm p-8 relative">
                    <div className="text-xs text-gray-500 mb-4">
                      Page {pageNum} of {mockDocument.pages}
                    </div>

                    {/* Mock Document Content */}
                    <div className="space-y-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        {pageNum === 1 && "Provider Credentialing Policy"}
                        {pageNum === 2 && "Verification Requirements"}
                        {pageNum === 3 && "Background Check Procedures"}
                      </h2>

                      <div className="space-y-2 text-sm text-gray-700">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                          labore et dolore magna aliqua.{" "}
                          {showAnnotations && pageNum === 1 && (
                            <span
                              className="bg-yellow-200 px-1 rounded relative cursor-pointer"
                              title="Key governance structure"
                            >
                              credentialing committee
                            </span>
                          )}{" "}
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                        </p>
                        <p>
                          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur.{" "}
                          {showAnnotations && pageNum === 2 && (
                            <span
                              className="bg-blue-200 px-1 rounded relative cursor-pointer"
                              title="Required evidence type"
                            >
                              license verification
                            </span>
                          )}{" "}
                          Excepteur sint occaecat cupidatat non proident.
                        </p>
                        <p>
                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                          laudantium.{" "}
                          {showAnnotations && pageNum === 3 && (
                            <span
                              className="bg-green-200 px-1 rounded relative cursor-pointer"
                              title="Compliance requirement"
                            >
                              background check requirements
                            </span>
                          )}{" "}
                          Totam rem aperiam, eaque ipsa quae ab illo inventore.
                        </p>
                      </div>
                    </div>

                    {/* Annotations */}
                    {showAnnotations &&
                      mockDocument.annotations
                        .filter((ann) => ann.page === pageNum)
                        .map((annotation, index) => (
                          <div
                            key={index}
                            className="absolute right-4 top-20 w-48 bg-yellow-100 border border-yellow-300 rounded-lg p-2 text-xs"
                          >
                            <div className="font-medium text-yellow-900">{annotation.author}</div>
                            <div className="text-yellow-800 mt-1">{annotation.text}</div>
                            <div className="text-yellow-600 mt-1">{annotation.timestamp}</div>
                          </div>
                        ))}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Side Panel */}
          <div className="w-80 border-l">
            <Tabs defaultValue="highlights" className="h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="highlights">AI Highlights</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="highlights" className="p-4 space-y-3">
                <h3 className="font-semibold text-gray-900">AI-Identified Key Content</h3>
                {mockDocument.highlights.map((highlight, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Page {highlight.page}</Badge>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-sm font-medium text-gray-900 mb-1">"{highlight.text}"</div>
                    <div className="text-xs text-gray-600">{highlight.reason}</div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="comments" className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Team Comments</h3>
                  <Button size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Add Comment
                  </Button>
                </div>
                {mockDocument.annotations.map((comment, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                      <Badge variant="outline">Page {comment.page}</Badge>
                    </div>
                    <div className="text-sm text-gray-700 mb-1">{comment.text}</div>
                    <div className="text-xs text-gray-500">{comment.timestamp}</div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <MessageSquare className="h-4 w-4 mr-1" />
            Add Annotation
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
