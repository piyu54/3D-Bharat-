export type InvestorType =
  | "Individual"
  | "Angel Investor"
  | "VC Fund"
  | "Corporate Investor";

export interface Investor {
  id: string;
  name: string;
  company: string;
  type: InvestorType;
  location: string;
  investmentCapacity: number;
  preferredIndustries: string[];
  riskPreference: "Low" | "Medium" | "High";
  minimumTicket: number;
  maximumTicket: number;
}