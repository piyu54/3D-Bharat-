import type { Investment } from "@/store/slices/investmentsSlice";

const INTERESTS_KEY = "bharat-investor-interests";
const INVESTMENTS_KEY = "bharat-investor-investments";

export function loadInterests(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(INTERESTS_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is string =>
            typeof item === "string"
        )
      : [];
  } catch {
    return [];
  }
}

export function saveInterests(
  dealIds: string[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      INTERESTS_KEY,
      JSON.stringify(dealIds)
    );
  } catch {
    // Ignore localStorage failures.
  }
}

export function loadInvestments(): Investment[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored =
      localStorage.getItem(INVESTMENTS_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed)
      ? (parsed as Investment[])
      : [];
  } catch {
    return [];
  }
}

export function saveInvestments(
  investments: Investment[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      INVESTMENTS_KEY,
      JSON.stringify(investments)
    );
  } catch {
    // Ignore localStorage failures.
  }
}