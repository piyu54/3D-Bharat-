import type { Deal, RiskLevel } from "@/types/deal";

/*
 * Investor preferences
 */
export interface RecommendationPreferences {
  riskLevel: RiskLevel | "All";
  industry: string;
  budget: number;
  minROI: number;
}

/*
 * Score breakdown
 */
export interface ScoreBreakdown {
  riskMatch: number;
  industryMatch: number;
  budgetCompatibility: number;
  roiAttractiveness: number;
}

/*
 * Recommended deal
 */
export interface ScoredDeal {
  deal: Deal;
  matchScore: number;
  scoreBreakdown: ScoreBreakdown;
  matchReasons: string[];
}

/*
 * Get recommended deals
 */
export function getRecommendedDeals(
  deals: Deal[],
  preferences: RecommendationPreferences,
  limit = 5
): ScoredDeal[] {
  if (!Array.isArray(deals)) {
    return [];
  }

  const scoredDeals: ScoredDeal[] = deals.map(
    (deal) => {
      /*
       * -------------------------
       * Risk score
       * -------------------------
       */
      let riskMatch = 0;

      if (
        preferences.riskLevel === "All"
      ) {
        riskMatch = 25;
      } else if (
        deal.riskLevel ===
        preferences.riskLevel
      ) {
        riskMatch = 25;
      } else {
        riskMatch = 5;
      }

      /*
       * -------------------------
       * Industry score
       * -------------------------
       */
      let industryMatch = 0;

      if (
        preferences.industry === "All"
      ) {
        industryMatch = 25;
      } else if (
        deal.industry ===
        preferences.industry
      ) {
        industryMatch = 25;
      } else {
        industryMatch = 5;
      }

      /*
       * -------------------------
       * Budget score
       * -------------------------
       */
      const minimumInvestment = Number(
        deal.minimumInvestment || 0
      );

      let budgetCompatibility = 0;

      if (preferences.budget <= 0) {
        budgetCompatibility = 25;
      } else if (
        minimumInvestment <=
        preferences.budget
      ) {
        budgetCompatibility = 25;
      } else if (
        minimumInvestment <=
        preferences.budget * 1.25
      ) {
        budgetCompatibility = 15;
      } else if (
        minimumInvestment <=
        preferences.budget * 1.5
      ) {
        budgetCompatibility = 5;
      } else {
        budgetCompatibility = 0;
      }

      /*
       * -------------------------
       * ROI score
       * -------------------------
       */
      const roi = Number(
        deal.expectedROI || 0
      );

      let roiAttractiveness = 0;

      if (preferences.minROI <= 0) {
        if (roi >= 25) {
          roiAttractiveness = 25;
        } else if (roi >= 20) {
          roiAttractiveness = 22;
        } else if (roi >= 15) {
          roiAttractiveness = 18;
        } else if (roi >= 10) {
          roiAttractiveness = 12;
        } else {
          roiAttractiveness = 5;
        }
      } else if (
        roi >= preferences.minROI
      ) {
        roiAttractiveness = 25;
      } else if (
        roi >= preferences.minROI * 0.8
      ) {
        roiAttractiveness = 15;
      } else if (
        roi >= preferences.minROI * 0.6
      ) {
        roiAttractiveness = 8;
      } else {
        roiAttractiveness = 0;
      }

      /*
       * -------------------------
       * Total score
       * -------------------------
       */
      const matchScore =
        riskMatch +
        industryMatch +
        budgetCompatibility +
        roiAttractiveness;

      /*
       * -------------------------
       * Match reasons
       * -------------------------
       */
      const matchReasons: string[] = [];

      if (
        preferences.riskLevel === "All"
      ) {
        matchReasons.push(
          "Suitable across your risk preferences"
        );
      } else if (
        deal.riskLevel ===
        preferences.riskLevel
      ) {
        matchReasons.push(
          `Matches your ${preferences.riskLevel} risk preference`
        );
      } else {
        matchReasons.push(
          `Risk level is ${deal.riskLevel}`
        );
      }

      if (
        preferences.industry === "All"
      ) {
        matchReasons.push(
          `Operates in ${deal.industry}`
        );
      } else if (
        deal.industry ===
        preferences.industry
      ) {
        matchReasons.push(
          `Matches your preferred ${deal.industry} industry`
        );
      }

      if (preferences.budget <= 0) {
        matchReasons.push(
          `Minimum investment is ₹${minimumInvestment.toLocaleString(
            "en-IN"
          )}`
        );
      } else if (
        minimumInvestment <=
        preferences.budget
      ) {
        matchReasons.push(
          "Fits within your investment budget"
        );
      } else if (
        minimumInvestment <=
        preferences.budget * 1.25
      ) {
        matchReasons.push(
          "Slightly above your preferred budget"
        );
      } else {
        matchReasons.push(
          "Investment requirement is above your budget"
        );
      }

      if (preferences.minROI <= 0) {
        matchReasons.push(
          `Expected ROI is ${roi}%`
        );
      } else if (
        roi >= preferences.minROI
      ) {
        matchReasons.push(
          `Expected ROI of ${roi}% meets your minimum ROI`
        );
      } else {
        matchReasons.push(
          `Expected ROI of ${roi}% is below your minimum ROI`
        );
      }

      return {
        deal,
        matchScore,
        scoreBreakdown: {
          riskMatch,
          industryMatch,
          budgetCompatibility,
          roiAttractiveness,
        },
        matchReasons,
      };
    }
  );

  /*
   * Highest score first
   */
  return scoredDeals
    .sort(
      (a, b) =>
        b.matchScore - a.matchScore
    )
    .slice(0, limit);
}