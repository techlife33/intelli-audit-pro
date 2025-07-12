"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, CheckCircle, AlertCircle, Brain, X, FolderOpen } from "lucide-react"

interface DocumentUploadProps {
  isOpen: boolean
  onClose: () => void
}

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  status: "uploading" | "processing" | "complete" | "error"
  progress: number
  aiClassification?: string
  confidence?: number
}

export function DocumentUpload({ isOpen, onClose }: DocumentUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [selectedFolder, setSelectedFolder] = useState("")

  const auditFolders = [
    "Credentialing",
    "HEDIS Data Validation",
    "Quality Management",
    "Utilization Management",
    "Member Rights",
    "Provider Network",
    "General Documents",
  ]

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file, index) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + index,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        status: "uploading",
        progress: 0,
      }

      setUploadedFiles((prev) => [...prev, newFile])

      // Simulate upload and AI processing
      simulateUpload(newFile.id)
    })
  }

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    const uploadInterval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId && file.status === "uploading") {
            const newProgress = Math.min(file.progress + 10, 100)
            if (newProgress === 100) {
              clearInterval(uploadInterval)
              setTimeout(() => simulateAIProcessing(fileId), 500)
              return { ...file, progress: newProgress, status: "processing" }
            }
            return { ...file, progress: newProgress }
          }
          return file
        }),
      )
    }, 200)
  }

  const simulateAIProcessing = (fileId: string) => {
    // Simulate AI classification
    setTimeout(() => {
      const classifications = [
        { category: "Credentialing", confidence: 94 },
        { category: "HEDIS Data Validation", confidence: 87 },
        { category: "Quality Management", confidence: 91 },
        { category: "Provider Network", confidence: 89 },
      ]

      const randomClassification = classifications[Math.floor(Math.random() * classifications.length)]

      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            return {
              ...file,
              status: "complete",
              aiClassification: randomClassification.category,
              confidence: randomClassification.confidence,
              progress: 100,
            }
          }
          return file
        }),
      )
    }, 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "processing":
        return <Brain className="h-4 w-4 text-blue-600 animate-pulse" />
      default:
        return <Upload className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="h-5 w-5 mr-2 text-blue-600" />
            Document Upload & AI Classification
          </DialogTitle>
          <DialogDescription>Upload documents for automatic AI classification and organization</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Folder Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Target Folder (Optional)</label>
            <Select value={selectedFolder} onValueChange={setSelectedFolder}>
              <SelectTrigger>
                <SelectValue placeholder="Let AI classify automatically or select a folder" />
              </SelectTrigger>
              <SelectContent>
                {auditFolders.map((folder) => (
                  <SelectItem key={folder} value={folder}>
                    <div className="flex items-center">
                      <FolderOpen className="h-4 w-4 mr-2" />
                      {folder}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to upload</h3>
            <p className="text-sm text-gray-600 mb-4">
              Supports PDF, Word, Excel, PowerPoint, and image files up to 50MB each
            </p>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png"
            />
            <Button asChild>
              <label htmlFor="file-upload" className="cursor-pointer">
                Select Files
              </label>
            </Button>
          </div>

          {/* AI Processing Info */}
          {uploadedFiles.length > 0 && (
            <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-r-lg">
              <div className="flex items-center mb-2">
                <Brain className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">AI Processing Active</span>
              </div>
              <p className="text-sm text-blue-800">
                Documents are being automatically classified by audit area. You can review and adjust AI suggestions
                after processing completes.
              </p>
            </div>
          )}

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Uploaded Files</h3>
              {uploadedFiles.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <p className="text-sm text-gray-600">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {file.status === "complete" && file.aiClassification && (
                        <Badge className="bg-green-100 text-green-800">
                          <Brain className="h-3 w-3 mr-1" />
                          {file.aiClassification} ({file.confidence}%)
                        </Badge>
                      )}
                      <Badge className={getStatusColor(file.status)}>
                        {getStatusIcon(file.status)}
                        <span className="ml-1 capitalize">{file.status}</span>
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {file.status !== "complete" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{file.status === "uploading" ? "Uploading..." : "Processing with AI..."}</span>
                        <span>{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  )}

                  {file.status === "complete" && file.aiClassification && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <strong>AI Classification:</strong> {file.aiClassification}
                          <br />
                          <strong>Confidence:</strong> {file.confidence}%
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Review AI Logic
                          </Button>
                          <Button size="sm">Confirm Classification</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <div className="text-sm text-gray-600">
            {uploadedFiles.length > 0 && (
              <>
                {uploadedFiles.filter((f) => f.status === "complete").length} of {uploadedFiles.length} files processed
              </>
            )}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {uploadedFiles.some((f) => f.status === "complete") && (
              <Button onClick={onClose}>Continue to Document Management</Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
