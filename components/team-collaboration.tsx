"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Users, Bell, Calendar, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TeamCollaborationProps {
  isOpen: boolean
  onClose: () => void
}

export function TeamCollaboration({ isOpen, onClose }: TeamCollaborationProps) {
  const [newComment, setNewComment] = useState("")
  const [selectedAssignee, setSelectedAssignee] = useState("")

  const teamMembers = [
    { id: "1", name: "Sarah Johnson", role: "Lead Auditor", avatar: "SJ", status: "online" },
    { id: "2", name: "Mike Chen", role: "Senior Auditor", avatar: "MC", status: "away" },
    { id: "3", name: "Lisa Rodriguez", role: "Compliance Specialist", avatar: "LR", status: "online" },
    { id: "4", name: "David Kim", role: "Quality Analyst", avatar: "DK", status: "offline" },
  ]

  const comments = [
    {
      id: "1",
      author: "Sarah Johnson",
      avatar: "SJ",
      content:
        "The credentialing documentation looks complete. I've verified all license numbers against the state database.",
      timestamp: "2 hours ago",
      type: "comment",
    },
    {
      id: "2",
      author: "Mike Chen",
      avatar: "MC",
      content: "Found an issue with Provider PRV-2024-0156 - malpractice insurance expired. Flagging for follow-up.",
      timestamp: "4 hours ago",
      type: "issue",
    },
    {
      id: "3",
      author: "Lisa Rodriguez",
      avatar: "LR",
      content:
        "HEDIS data validation is showing 3.2% error rate. This is within acceptable limits but worth monitoring.",
      timestamp: "1 day ago",
      type: "observation",
    },
  ]

  const assignments = [
    {
      id: "1",
      title: "Review Provider Credentialing Files",
      assignee: "Mike Chen",
      dueDate: "2024-01-15",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "2",
      title: "Validate HEDIS Data Accuracy",
      assignee: "Lisa Rodriguez",
      dueDate: "2024-01-18",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: "3",
      title: "Complete Quality Committee Review",
      assignee: "David Kim",
      dueDate: "2024-01-20",
      status: "Complete",
      priority: "Low",
    },
  ]

  const approvals = [
    {
      id: "1",
      item: "Credentialing Evidence Package",
      requester: "Sarah Johnson",
      status: "Pending",
      dueDate: "2024-01-16",
    },
    {
      id: "2",
      item: "HEDIS Data Validation Report",
      requester: "Mike Chen",
      status: "Approved",
      dueDate: "2024-01-14",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
      case "Approved":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
      case "Approved":
        return <CheckCircle className="h-4 w-4" />
      case "In Progress":
        return <Clock className="h-4 w-4" />
      case "Pending":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Team Collaboration
          </DialogTitle>
          <DialogDescription>Manage team communication, assignments, and approvals</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="space-y-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-semibold mb-3">Add Comment</h3>
              <div className="space-y-3">
                <Textarea
                  placeholder="Share updates, observations, or questions with your team..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-between items-center">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Comment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comment">General Comment</SelectItem>
                      <SelectItem value="issue">Issue/Finding</SelectItem>
                      <SelectItem value="observation">Observation</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Recent Activity</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 text-white text-xs">{comment.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {comment.type}
                        </Badge>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Task Assignments</h3>
              <Button>
                <Calendar className="h-4 w-4 mr-1" />
                New Assignment
              </Button>
            </div>

            <div className="space-y-3">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{assignment.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(assignment.priority)}>{assignment.priority}</Badge>
                      <Badge className={getStatusColor(assignment.status)}>
                        {getStatusIcon(assignment.status)}
                        <span className="ml-1">{assignment.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Assigned to: <strong>{assignment.assignee}</strong>
                    </span>
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-medium text-blue-900 mb-3">Create New Assignment</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input placeholder="Assignment title" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input type="date" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="mt-3">Create Assignment</Button>
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Approval Requests</h3>
              <Button>
                <Bell className="h-4 w-4 mr-1" />
                Request Approval
              </Button>
            </div>

            <div className="space-y-3">
              {approvals.map((approval) => (
                <div key={approval.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{approval.item}</h4>
                    <Badge className={getStatusColor(approval.status)}>
                      {getStatusIcon(approval.status)}
                      <span className="ml-1">{approval.status}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      Requested by: <strong>{approval.requester}</strong>
                    </span>
                    <span>Due: {approval.dueDate}</span>
                  </div>
                  {approval.status === "Pending" && (
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm">
                        Request Changes
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-4">
            <h3 className="font-semibold">Team Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-600 text-white">{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{member.name}</span>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            member.status === "online"
                              ? "bg-green-500"
                              : member.status === "away"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                          }`}
                        />
                      </div>
                      <p className="text-sm text-gray-600">{member.role}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
