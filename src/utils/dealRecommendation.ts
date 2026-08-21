import type { Deal, RiskLevel } from "@/types/deal";

export interface InvestorPreferences {
  preferredIndustries: string[];
  preferredRisk: RiskLevel;
  budget: number;
  minimumROI: number;
}

export interface ScoredDeal extends Deal {
  matchScore: number;
  matchReasons: string[];
}

function getRiskScore(
  dealRisk: RiskLevel,
  preferredRisk: RiskLevel
): number {
  if (dealRisk === preferredRisk) {
    return 25;
  }

  const compatiblePairs: Record<string, string[]> = {
    Low: ["Medium"],
    Medium: ["Low", "High"],
    High: ["Medium"],
  };

  if (
    compatiblePairs[preferredRisk]?.includes(dealRisk)
  ) {
    return 15;
  }

  return 5;
}

export function calculateDealScore(
  deal: Deal,
  preferences: InvestorPreferences
): ScoredDeal {
  let score = 0;
  const matchReasons: string[] = [];

  // Risk match — 25 points
  const riskScore = getRiskScore(
    deal.riskLevel,
    preferences.preferredRisk
  );

  score += riskScore;

  if (riskScore === 25) {
    matchReasons.push("Risk profile matches");
  }

  // Industry match — 25 points
  if (
    preferences.preferredIndustries.includes(
      deal.industry
    )
  ) {
    score += 25;
    matchReasons.push("Preferred industry");
  }

  // Budget compatibility — 25 points
  if (
    deal.minimumInvestment <= preferences.budget
  ) {
    score += 25;
    matchReasons.push("Within your budget");
  } else {
    const budgetDifference =
      deal.minimumInvestment -
      preferences.budget;

    if (
      budgetDifference <=
      preferences.budget * 0.2
    ) {
      score += 10;
      matchReasons.push("Slightly above budget");
    }
  }

  // ROI attractiveness — 25 points
  if (
    deal.expectedROI >=
    preferences.minimumROI
  ) {
    score += 25;
    matchReasons.push("Strong ROI potential");
  } else if (
    deal.expectedROI >=
    preferences.minimumROI * 0.8
  ) {
    score += 12;
    matchReasons.push("Moderate ROI potential");
  }

  return {
    ...deal,
    matchScore: score,
    matchReasons,
  };
}

export function getRecommendedDeals(
  deals: Deal[],
  preferences: InvestorPreferences
): ScoredDeal[] {
  return deals
    .map((deal) =>
      calculateDealScore(
        deal,
        preferences
      )
    )
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );
}