import investorsData from "@/data/investors.json";
import type { Investor } from "@/types/investor";

const investors = investorsData as Investor[];

const simulateDelay = () => {
  const delay = Math.floor(Math.random() * 501) + 300;

  return new Promise<void>((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const getInvestors = async (): Promise<
  Investor[]
> => {
  await simulateDelay();

  return [...investors];
};

export const getInvestorById = async (
  investorId: string
): Promise<Investor | null> => {
  await simulateDelay();

  const investor = investors.find(
    (item) => item.id === investorId
  );

  return investor ?? null;
};