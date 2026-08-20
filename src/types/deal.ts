export type RiskLevel = "Low" | "Medium" | "High";

export type FundingStage =
  | "Pre-Seed"
  | "Seed"
  | "Series A"
  | "Series B"
  | "Growth";

export type DealStatus =
  | "Active"
  | "Closing Soon"
  | "Fully Funded";

export interface Deal {
  id: string;
  companyName: string;
  industry: string;
  location: string;
  description: string;

  fundingStage: FundingStage;
  fundingRequired: number;
  minimumInvestment: number;

  expectedROI: number;
  riskLevel: RiskLevel;

  valuation: number;
  revenue: number;
  revenueGrowth: number;
  ebitdaMargin: number;

  employees: number;
  foundedYear: number;
  investorCount: number;

  status: DealStatus;
  fundingProgress: number;
  interest: number;

  createdAt: string;
}