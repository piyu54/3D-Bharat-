import dealsData from "@/data/deals.json";
import type { Deal, RiskLevel } from "@/types/deal";
import { simulateServiceError } from "@/utils/serviceError";

export interface DealFilters {
  search?: string;
  industry?: string;
  riskLevel?: RiskLevel | "All";
  minROI?: number;
  maxROI?: number;
  minInvestment?: number;
  maxInvestment?: number;
  fundingStage?: string;
  status?: string;
}

export type DealSortOption =
  | "newest"
  | "oldest"
  | "roi-high"
  | "roi-low"
  | "investment-high"
  | "investment-low";

export interface GetDealsParams {
  filters?: DealFilters;
  sortBy?: DealSortOption;
  page?: number;
  pageSize?: number;
}

export interface DealsResponse {
  data: Deal[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const deals = dealsData as Deal[];

const simulateDelay = () => {
  const delay = Math.floor(Math.random() * 501) + 300;

  return new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const getDeals = async ({
  filters = {},
  sortBy = "newest",
  page = 1,
  pageSize = 10,
}: GetDealsParams = {}): Promise<DealsResponse> => {
  await simulateDelay();

  simulateServiceError();

  const safePageSize = Math.max(1, pageSize);

  let filteredDeals = [...deals];

  const {
    search,
    industry,
    riskLevel,
    minROI,
    maxROI,
    minInvestment,
    maxInvestment,
    fundingStage,
    status,
  } = filters;

  // Search
  if (search?.trim()) {
    const searchTerm = search.toLowerCase().trim();

    filteredDeals = filteredDeals.filter((deal) =>
      [
        deal.companyName,
        deal.industry,
        deal.location,
        deal.description,
      ].some((value) =>
        value.toLowerCase().includes(searchTerm)
      )
    );
  }

  // Industry
  if (industry && industry !== "All") {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.industry === industry
    );
  }

  // Risk Level
  if (riskLevel && riskLevel !== "All") {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.riskLevel === riskLevel
    );
  }

  // ROI
  if (minROI !== undefined) {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.expectedROI >= minROI
    );
  }

  if (maxROI !== undefined) {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.expectedROI <= maxROI
    );
  }

  // Investment
  if (minInvestment !== undefined) {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.minimumInvestment >= minInvestment
    );
  }

  if (maxInvestment !== undefined) {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.minimumInvestment <= maxInvestment
    );
  }

  // Funding Stage
  if (fundingStage && fundingStage !== "All") {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.fundingStage === fundingStage
    );
  }

  // Status
  if (status && status !== "All") {
    filteredDeals = filteredDeals.filter(
      (deal) => deal.status === status
    );
  }

  // Sorting
  filteredDeals.sort((a, b) => {
    switch (sortBy) {
      case "roi-high":
        return b.expectedROI - a.expectedROI;

      case "roi-low":
        return a.expectedROI - b.expectedROI;

      case "investment-high":
        return b.minimumInvestment - a.minimumInvestment;

      case "investment-low":
        return a.minimumInvestment - b.minimumInvestment;

      case "oldest":
        return (
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime()
        );

      case "newest":
      default:
        return (
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime()
        );
    }
  });

  // Pagination
  const total = filteredDeals.length;

  const totalPages = Math.ceil(
    total / safePageSize
  );

  const safePage = Math.max(
    1,
    Math.min(page, totalPages || 1)
  );

  const startIndex =
    (safePage - 1) * safePageSize;

  const endIndex =
    startIndex + safePageSize;

  const paginatedDeals =
    filteredDeals.slice(
      startIndex,
      endIndex
    );

  return {
    data: paginatedDeals,
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
  };
};

export const getDealById = async (
  id: string
): Promise<Deal | null> => {
  await simulateDelay();

  simulateServiceError();

  const deal = deals.find(
    (item) => item.id === id
  );

  return deal ?? null;
};