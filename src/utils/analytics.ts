import type { Deal } from "@/types/deal";

export const calculateInvestmentGrowth = (
  deals: Deal[]
) => {
  const months = [
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
  ];

  return months.map((month, index) => {
    const baseValue = 12.5;

    const growth =
      index * 0.65 +
      deals.slice(0, index + 1).length * 0.08;

    return {
      month,
      value: Number(
        (baseValue + growth).toFixed(2)
      ),
    };
  });
};

export const calculateIndustryDistribution = (
  deals: Deal[]
) => {
  const distribution: Record<string, number> = {};

  deals.forEach((deal) => {
    distribution[deal.industry] =
      (distribution[deal.industry] || 0) + 1;
  });

  return Object.entries(distribution)
    .map(([industry, count]) => ({
      industry,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

export const calculateRiskDistribution = (
  deals: Deal[]
) => {
  const distribution: Record<string, number> = {};

  deals.forEach((deal) => {
    distribution[deal.riskLevel] =
      (distribution[deal.riskLevel] || 0) + 1;
  });

  return Object.entries(distribution).map(
    ([risk, count]) => ({
      risk,
      count,
    })
  );
};

export const calculateRiskVsROI = (
  deals: Deal[]
) => {
  return deals.map((deal) => ({
    company: deal.companyName,
    risk: deal.riskLevel,
    roi: deal.expectedROI,
    investment: deal.minimumInvestment,
  }));
};