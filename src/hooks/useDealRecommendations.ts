"use client";

import { useMemo } from "react";

import type { Deal, RiskLevel } from "@/types/deal";

import {
  getRecommendedDeals,
  type RecommendedDeal,
} from "@/utils/recommendationEngine";

interface UseDealRecommendationsOptions {
  deals: Deal[];
  riskLevel?: RiskLevel;
  industry?: string;
  budget?: number;
  minimumROI?: number;
  limit?: number;
}

export function useDealRecommendations({
  deals,
  riskLevel,
  industry,
  budget,
  minimumROI,
  limit = 5,
}: UseDealRecommendationsOptions): RecommendedDeal[] {
  return useMemo(() => {
    const recommendations = getRecommendedDeals(
      deals,
      {
        riskLevel,
        industry,
        budget,
        minROI: minimumROI,
      }
    );

    return recommendations.slice(0, limit);
  }, [
    deals,
    riskLevel,
    industry,
    budget,
    minimumROI,
    limit,
  ]);
}