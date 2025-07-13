"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, FileText, Settings, FolderOpen, Users, FlaskConical, ClipboardCheck, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewAuditModal } from "@/components/new-audit-modal"
import { AIConfigurationModal } from "@/components/ai-configuration-modal"
import { AIExplanationModal } from "@/components/ai-explanation-modal"
import { DocumentViewer } from "@/components/document-viewer"
import { SampleTestingWorkflow } from "@/components/sample-testing-workflow"
import { TeamCollaboration } from "@/components/team-collaboration"
import { ReportTemplates } from "@/components/report-templates"

export default function Component() {
  const [isNewAuditModalOpen, setIsNewAuditModalOpen] = useState(false)
  const [isAIConfigModalOpen, setIsAIConfigModalOpen] = useState(false)
  const [isAIExplanationModalOpen, setIsAIExplanationModalOpen] = useState(false)
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false)
  const [isSampleTestingOpen, setIsSampleTestingOpen] = useState(false)
  const [isTeamCollaborationOpen, setIsTeamCollaborationOpen] = useState(false)
  const [isReportTemplatesOpen, setIsReportTemplatesOpen] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            <FileText className="h-6 w-6" />
            <span className="sr-only">IntelliAudit Pro</span>
          </Link>
          <Link href="#" className="text-gray-900 transition-colors hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="#" className="text-gray-500 transition-colors hover:text-gray-900">
            Audits
          </Link>
          <Link href="#" className="text-gray-500 transition-colors hover:text-gray-900">
            Reports
          </Link>
          <Link href="#" className="text-gray-500 transition-colors hover:text-gray-900">
            Settings
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="outline" className="ml-auto bg-transparent" onClick={() => setIsNewAuditModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Audit
          </Button>
          <Button variant="outline" onClick={() => setIsAIConfigModalOpen(true)}>
            <Settings className="h-4 w-4 mr-2" />
            AI Configuration
          </Button>
          <Link href="/newflow">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Flow
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Audits</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-gray-500">Completed: 18, In Progress: 5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <ClipboardCheck className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <p className="text-xs text-gray-500">Avg. across all audits</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Explainability</CardTitle>
              <Lightbulb className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">High Transparency</div>
              <p className="text-xs text-gray-500">Detailed AI rationale available</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Audits</CardTitle>
              <CardDescription>Overview of your latest audit activities.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">NCQA Accreditation 2024</h3>
                    <p className="text-sm text-gray-500">Due: 2024-12-31</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Open Audit
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">HIPAA Compliance Review</h3>
                    <p className="text-sm text-gray-500">Due: 2024-08-15</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Open Audit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access key features quickly.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              <Button variant="outline" onClick={() => setIsAIExplanationModalOpen(true)}>
                <Lightbulb className="h-4 w-4 mr-2" />
                AI Explanations
              </Button>
              <Button variant="outline" onClick={() => setIsDocumentViewerOpen(true)}>
                <FolderOpen className="h-4 w-4 mr-2" />
                Document Viewer
              </Button>
              <Button variant="outline" onClick={() => setIsSampleTestingOpen(true)}>
                <FlaskConical className="h-4 w-4 mr-2" />
                Sample Testing
              </Button>
              <Button variant="outline" onClick={() => setIsTeamCollaborationOpen(true)}>
                <Users className="h-4 w-4 mr-2" />
                Team Collaboration
              </Button>
              <Button variant="outline" onClick={() => setIsReportTemplatesOpen(true)}>
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Report Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <NewAuditModal isOpen={isNewAuditModalOpen} onClose={() => setIsNewAuditModalOpen(false)} />
      <AIConfigurationModal isOpen={isAIConfigModalOpen} onClose={() => setIsAIConfigModalOpen(false)} />
      <AIExplanationModal isOpen={isAIExplanationModalOpen} onClose={() => setIsAIExplanationModalOpen(false)} />
      <DocumentViewer isOpen={isDocumentViewerOpen} onClose={() => setIsDocumentViewerOpen(false)} />
      <SampleTestingWorkflow isOpen={isSampleTestingOpen} onClose={() => setIsSampleTestingOpen(false)} />
      <TeamCollaboration isOpen={isTeamCollaborationOpen} onClose={() => setIsTeamCollaborationOpen(false)} />
      <ReportTemplates isOpen={isReportTemplatesOpen} onClose={() => setIsReportTemplatesOpen(false)} />
    </div>
  )
}
