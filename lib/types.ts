export type LeadStatus =
  | "New Lead"
  | "AI Researched"
  | "Email Drafted"
  | "Email Sent"
  | "Replied"
  | "Quoted"
  | "Sample Requested"
  | "Meeting Scheduled"
  | "Closed Won"
  | "Closed Lost";

export type Priority = "High" | "Medium" | "Low";

export interface Company {
  id: string;
  name: string;
  country: string;
  city: string;
  region: string;
  website?: string;
  businessType: string;
  size: "Small" | "Medium" | "Large" | "Enterprise";
}

export interface Contact {
  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  title: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
}

export interface ImportRecord {
  id: string;
  companyName: string;
  country: string;
  city: string;
  importerName: string;
  productDescription: string;
  hsCode: string;
  shipmentCount: number;
  shipmentValue: number;
  supplierCountry: string;
  website?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  source: string;
}

export interface FollowUpTask {
  id: string;
  leadId: string;
  dueAt: string;
  type: "Email" | "WhatsApp" | "Call" | "Meeting" | "Research";
  title: string;
  completed: boolean;
}

export interface EmailDraft {
  id: string;
  leadId: string;
  sequenceDay: 1 | 3 | 7 | 14 | 30;
  subject: string;
  body: string;
  status: "Draft" | "Approved" | "Sent";
}

export interface EmailLog {
  id: string;
  leadId: string;
  sentAt: string;
  subject: string;
  opened?: boolean;
  replied?: boolean;
}

export interface WhatsAppLog {
  id: string;
  leadId: string;
  sentAt: string;
  message: string;
  replied?: boolean;
}

export interface Meeting {
  id: string;
  leadId: string;
  scheduledAt: string;
  topic: string;
  status: "Scheduled" | "Completed" | "Canceled";
}

export interface SalesUser {
  id: string;
  name: string;
  email: string;
  role: "Sales Rep" | "Sales Manager" | "Admin";
  timezone: string;
}

export interface Lead {
  id: string;
  company: Company;
  contact: Contact;
  importRecord: ImportRecord;
  productInterest: string;
  matchedAxdProduct: string;
  status: LeadStatus;
  priority: Priority;
  lastContactAt?: string;
  nextFollowUpAt: string;
  aiBackgroundSummary: string;
  recommendedProducts: string[];
  notes: string[];
  ownerId: string;
}
