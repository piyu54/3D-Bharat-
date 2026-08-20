const fs = require("fs");
const path = require("path");

const industries = [
  "AI & ML",
  "FinTech",
  "HealthTech",
  "EdTech",
  "SaaS",
  "Aerospace",
  "EV & Mobility",
  "CleanTech",
  "AgriTech",
  "Cybersecurity",
  "Robotics",
  "Semiconductors",
];

const locations = [
  "Bengaluru, India",
  "Mumbai, India",
  "Pune, India",
  "Hyderabad, India",
  "Delhi, India",
  "Chennai, India",
  "Ahmedabad, India",
  "Gurugram, India",
];

const fundingStages = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Growth",
];

const riskLevels = ["Low", "Medium", "High"];

const statuses = ["Active", "Closing Soon", "Fully Funded"];

const companyPrefixes = [
  "Nova",
  "Aero",
  "Quantum",
  "Vertex",
  "BluePeak",
  "GreenGrid",
  "Fin",
  "Tech",
  "Next",
  "Prime",
  "Cloud",
  "Smart",
  "Urban",
  "Core",
  "Vision",
];

const companySuffixes = [
  "Labs",
  "Technologies",
  "Systems",
  "Solutions",
  "Innovations",
  "Dynamics",
  "Ventures",
  "Networks",
];

const descriptions = [
  "Building technology solutions for India's rapidly growing digital economy.",
  "Developing scalable products focused on solving real-world business problems.",
  "Using data and technology to improve operational efficiency and customer experience.",
  "Creating innovative products for emerging markets with a focus on sustainable growth.",
  "Developing next-generation technology infrastructure for businesses.",
];

const randomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

const randomNumber = (min, max, decimals = 0) => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};

const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomDate = () => {
  const start = new Date("2025-01-01");
  const end = new Date("2026-08-01");

  const date = new Date(
    start.getTime() +
      Math.random() * (end.getTime() - start.getTime())
  );

  return date.toISOString().split("T")[0];
};

const generateCompanyName = () => {
  return `${randomItem(companyPrefixes)} ${randomItem(companySuffixes)}`;
};

const generateDeals = (count = 80) => {
  return Array.from({ length: count }, (_, index) => {
    const riskLevel = randomItem(riskLevels);
    const fundingStage = randomItem(fundingStages);

    const expectedROI =
      riskLevel === "Low"
        ? randomNumber(8, 20, 1)
        : riskLevel === "Medium"
          ? randomNumber(15, 32, 1)
          : randomNumber(25, 55, 1);

    const fundingRequired = randomNumber(
      5000000,
      250000000,
      0
    );

    const minimumInvestment = randomNumber(
      500000,
      10000000,
      0
    );

    const valuation = randomNumber(
      30000000,
      1500000000,
      0
    );

    const revenue = randomNumber(
      5000000,
      300000000,
      0
    );

    const revenueGrowth = randomNumber(5, 55, 1);

    const ebitdaMargin = randomNumber(5, 35, 1);

    const fundingProgress = randomInteger(20, 95);

    const status =
      fundingProgress >= 90
        ? "Closing Soon"
        : randomItem(statuses);

    return {
      id: `DL-${1001 + index}`,
      companyName: generateCompanyName(),
      industry: randomItem(industries),
      location: randomItem(locations),

      description: randomItem(descriptions),

      fundingStage,
      fundingRequired,
      minimumInvestment,

      expectedROI,
      riskLevel,

      valuation,
      revenue,
      revenueGrowth,
      ebitdaMargin,

      employees: randomInteger(12, 850),

      foundedYear: randomInteger(2014, 2025),

      investorCount: randomInteger(2, 25),

      status,
      fundingProgress,

      interest: randomInteger(20, 500),

      createdAt: randomDate(),
    };
  });
};

const generateInvestors = (count = 15) => {
  const investorNames = [
    "Arjun Mehta",
    "Riya Sharma",
    "Karan Patel",
    "Neha Kapoor",
    "Rahul Verma",
    "Ananya Iyer",
    "Aditya Shah",
    "Meera Joshi",
    "Vikram Rao",
    "Sneha Kulkarni",
    "Aman Gupta",
    "Ishita Singh",
    "Rohan Malhotra",
    "Pooja Nair",
    "Dev Khanna",
  ];

  const investorTypes = [
    "Individual",
    "Angel Investor",
    "VC Fund",
    "Corporate Investor",
  ];

  return Array.from({ length: count }, (_, index) => {
    const riskPreference = randomItem(riskLevels);

    const preferredIndustries = [
      randomItem(industries),
      randomItem(industries),
      randomItem(industries),
    ].filter(
      (industry, position, array) =>
        array.indexOf(industry) === position
    );

    const minimumTicket = randomNumber(
      500000,
      5000000,
      0
    );

    const maximumTicket = randomNumber(
      minimumTicket,
      50000000,
      0
    );

    return {
      id: `INV-${String(index + 1).padStart(3, "0")}`,

      name: investorNames[index],

      company:
        index % 2 === 0
          ? `${randomItem([
              "Vertex",
              "Summit",
              "Horizon",
              "Pioneer",
              "Elevate",
            ])} Capital`
          : `${randomItem([
              "Mehta",
              "Sharma",
              "Patel",
              "Verma",
              "Rao",
            ])} Ventures`,

      type: randomItem(investorTypes),

      location: randomItem(locations),

      investmentCapacity: randomNumber(
        10000000,
        250000000,
        0
      ),

      preferredIndustries,

      riskPreference,

      minimumTicket,
      maximumTicket,
    };
  });
};

const deals = generateDeals(80);
const investors = generateInvestors(15);

const dataDirectory = path.join(
  __dirname,
  "..",
  "src",
  "data"
);

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, {
    recursive: true,
  });
}

fs.writeFileSync(
  path.join(dataDirectory, "deals.json"),
  JSON.stringify(deals, null, 2)
);

fs.writeFileSync(
  path.join(dataDirectory, "investors.json"),
  JSON.stringify(investors, null, 2)
);

console.log("Mock data generated successfully.");
console.log(`Deals: ${deals.length}`);
console.log(`Investors: ${investors.length}`);