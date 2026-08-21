import type { Deal, RiskLevel } from "@/types/deal";

export interface RecommendationPreferences {
  riskLevel?: RiskLevel | "All";
  industry?: string | "All";
  budget?: number;
  minROI?: number;
}

export interface ScoreBreakdown {
  riskMatch: number;
  industryMatch: number;
  budgetCompatibility: number;
  roiAttractiveness: number;
}

export interface RecommendedDeal extends Deal {
  matchScore: number;
  matchReasons: string[];
  scoreBreakdown: ScoreBreakdown;
}

export function calculateDealScore(
  deal: Deal,
  preferences: RecommendationPreferences
): RecommendedDeal {
  let riskMatch = 0;
  let industryMatch = 0;
  let budgetCompatibility = 0;
  let roiAttractiveness = 0;

  const matchReasons: string[] = [];

  /*
   * Risk Match
   */
  if (
    preferences.riskLevel &&
    preferences.riskLevel !== "All"
  ) {
    if (deal.riskLevel === preferences.riskLevel) {
      riskMatch = 30;
      matchReasons.push(
        "Matches your preferred risk level"
      );
    }
  } else {
    riskMatch = 15;
  }

  /*
   * Industry Match
   */
  if (
    preferences.industry &&
    preferences.industry !== "All"
  ) {
    if (deal.industry === preferences.industry) {
      industryMatch = 25;
      matchReasons.push(
        "Matches your preferred industry"
      );
    }
  } else {
    industryMatch = 10;
  }

  /*
   * Budget Compatibility
   */
  if (
    typeof preferences.budget === "number" &&
    preferences.budget > 0
  ) {
    if (
      deal.minimumInvestment <= preferences.budget
    ) {
      budgetCompatibility = 25;

      matchReasons.push(
        "Fits your investment budget"
      );
    } else {
      budgetCompatibility = 5;
    }
  } else {
    budgetCompatibility = 10;
  }

  /*
   * ROI Attractiveness
   */
  if (
    typeof preferences.minROI === "number" &&
    preferences.minROI > 0
  ) {
    if (deal.expectedROI >= preferences.minROI) {
      roiAttractiveness = 20;

      matchReasons.push(
        "Meets your ROI target"
      );
    } else {
      roiAttractiveness = 5;
    }
  } else {
    if (deal.expectedROI >= 25) {
      roiAttractiveness = 20;

      matchReasons.push(
        "High expected ROI"
      );
    } else if (deal.expectedROI >= 15) {
      roiAttractiveness = 15;

      matchReasons.push(
        "Good expected ROI"
      );
    } else {
      roiAttractiveness = 10;
    }
  }

  /*
   * Final Score
   */
  const matchScore = Math.min(
    riskMatch +
      industryMatch +
      budgetCompatibility +
      roiAttractiveness,
    100
  );

  return {
    ...deal,

    matchScore,

    matchReasons,

    scoreBreakdown: {
      riskMatch,
      industryMatch,
      budgetCompatibility,
      roiAttractiveness,
    },
  };
}

export function getRecommendedDeals(
  deals: Deal[],
  preferences: RecommendationPreferences = {}
): RecommendedDeal[] {
  return deals
    .map((deal) =>
      calculateDealScore(
        deal,
        preferences
      )
    )
    .sort((a, b) => {
      if (b.matchScore !== a.matchScore) {
        return b.matchScore - a.matchScore;
      }

      return (
        Number(b.expectedROI || 0) -
        Number(a.expectedROI || 0)
      );
    });
}