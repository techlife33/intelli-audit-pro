"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"

interface NewAuditModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NewAuditModal({ isOpen, onClose }: NewAuditModalProps) {
  const [auditName, setAuditName] = useState("")
  const [auditType, setAuditType] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [description, setDescription] = useState("")
  const [step, setStep] = useState(1)

  const auditTypes = [
    { value: "ncqa", label: "NCQA Health Plan Accreditation", description: "Healthcare quality accreditation" },
    { value: "sox", label: "SOX Compliance", description: "Sarbanes-Oxley financial compliance" },
    { value: "hipaa", label: "HIPAA Security Assessment", description: "Healthcare privacy and security" },
    { value: "iso", label: "ISO 27001", description: "Information security management" },
    { value: "custom", label: "Custom Audit", description: "Define your own audit framework" },
  ]

  const handleCreateAudit = () => {
    // Create new audit and navigate to it
    const newAuditId = Date.now().toString()
    window.location.href = `/audit/${newAuditId}`
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Create New Audit
          </DialogTitle>
          <DialogDescription>Set up a new audit with AI-powered configuration</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
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
                <Label htmlFor="audit-type">Audit Framework</Label>
                <Select value={auditType} onValueChange={setAuditType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audit framework" />
                  </SelectTrigger>
                  <SelectContent>
                    {auditTypes.map((type) => (
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

            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={() => setStep(2)} disabled={!auditName || !auditType}>
                Next: Configure
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">AI Configuration</h3>
              <p className="text-gray-600">
                IntelliAudit Pro will automatically configure your audit based on the selected framework
              </p>
            </div>

            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-2">Automatic Setup Includes:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Pre-configured audit areas and requirements</li>
                <li>• Document classification templates</li>
                <li>• Evidence extraction rules</li>
                <li>• Sample testing criteria</li>
                <li>• Report templates</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Audit Summary</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div>
                  <strong>Name:</strong> {auditName}
                </div>
                <div>
                  <strong>Framework:</strong> {auditTypes.find((t) => t.value === auditType)?.label}
                </div>
                <div>
                  <strong>Due Date:</strong> {dueDate ? format(dueDate, "PPP") : "Not set"}
                </div>
                {description && (
                  <div>
                    <strong>Description:</strong> {description}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleCreateAudit}>Create Audit</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
