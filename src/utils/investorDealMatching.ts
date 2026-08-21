import type { Deal } from "@/types/deal";
import type { Investor } from "@/types/investor";

export interface DealMatch {
  deal: Deal;
  score: number;
  reasons: string[];
}

export function calculateDealMatch(
  investor: Investor,
  deal: Deal
): DealMatch {
  let score = 0;
  const reasons: string[] = [];

  /*
   * Industry Match
   * 35 points
   */
  const industryMatch =
    investor.preferredIndustries.some(
      (industry) =>
        industry.toLowerCase() ===
        deal.industry.toLowerCase()
    );

  if (industryMatch) {
    score += 35;
    reasons.push("Preferred industry");
  }

  /*
   * Risk Match
   * 25 points
   */
  if (
    investor.riskPreference ===
    deal.riskLevel
  ) {
    score += 25;
    reasons.push("Risk preference matches");
  } else if (
    investor.riskPreference === "High" ||
    deal.riskLevel === "Medium"
  ) {
    score += 12;
    reasons.push("Acceptable risk range");
  }

  /*
   * Investment Ticket
   * 25 points
   */
  const investmentFits =
    deal.minimumInvestment >=
      investor.minimumTicket &&
    deal.minimumInvestment <=
      investor.maximumTicket;

  if (investmentFits) {
    score += 25;
    reasons.push("Investment size fits");
  } else if (
    deal.minimumInvestment <=
    investor.investmentCapacity
  ) {
    score += 12;
    reasons.push("Within investment capacity");
  }

  /*
   * ROI
   * 15 points
   */
  if (deal.expectedROI >= 20) {
    score += 15;
    reasons.push("Strong expected ROI");
  } else if (deal.expectedROI >= 12) {
    score += 10;
    reasons.push("Good expected ROI");
  } else {
    score += 5;
    reasons.push("Moderate expected ROI");
  }

  return {
    deal,
    score: Math.min(score, 100),
    reasons,
  };
}

export function getBestDealMatches(
  investor: Investor,
  deals: Deal[],
  limit = 5
): DealMatch[] {
  return deals
    .map((deal) =>
      calculateDealMatch(investor, deal)
    )
    .sort(
      (a, b) => b.score - a.score
    )
    .slice(0, limit);
}