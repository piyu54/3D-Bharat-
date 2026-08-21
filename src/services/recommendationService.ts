import type { Deal } from "@/types/deal";

import {
  getRecommendedDeals as calculateRecommendedDeals,
  type RecommendationPreferences,
  type ScoredDeal,
} from "@/utils/recommendation";

export type {
  RecommendationPreferences,
  ScoredDeal,
};

export function getRecommendedDeals(
  deals: Deal[],
  preferences: RecommendationPreferences,
  limit = 5
): ScoredDeal[] {
  return calculateRecommendedDeals(
    deals,
    preferences,
    limit
  );
}