# 3D Bharat Investor & Corporate Dashboard

A modern and interactive investment dashboard built as part of the **3D Bharat Full Stack Developer technical task**.

The application is designed for investors and corporates to explore investment opportunities, analyze deals, compare risk and ROI, discover suitable investments, and view investment-related analytics.

The project focuses mainly on **frontend architecture, simulated backend behavior, data visualization, state management, performance, and user experience**.

## Live Demo

**Vercel:**
https://3d-bharat-investor-dashboard-dun.vercel.app/

**GitHub:**
https://github.com/piyu54/3D-Bharat-

---

## Project Overview

The goal of this project was to build a scalable investment dashboard without using a real backend API.

Instead of connecting to external APIs, the application uses local JSON datasets and a service layer that simulates backend behavior.

The application includes:

- Investor Dashboard
- Corporate Dashboard
- Deal Explorer
- Deal Details
- Investor Explorer
- Investor Details
- Investment Tracking
- Interest Management
- Deal Recommendation Engine
- Risk and ROI analysis
- Interactive charts
- Filtering, sorting and pagination
- Simulated loading and error states

The application currently works with **80 investment deals and 15 investors** stored in local JSON files.

---

## Main Features

### Investor Dashboard

The investor dashboard provides an overview of investment-related information.

It includes:

- Total investments
- Active deals
- ROI overview
- Risk distribution
- Investment growth
- Industry distribution
- Risk vs ROI analysis

Charts are used to make the information easier to understand.

---

### Deal Explorer

The Deal Explorer allows investors to browse available investment opportunities.

Features include:

- Company search
- Industry filtering
- Risk filtering
- ROI filtering
- Investment range filtering
- Funding stage filtering
- Deal status filtering
- Sorting
- Pagination
- Loading states
- Error handling
- Empty states

Search is debounced to avoid unnecessary data processing while the user is typing.

---

### Deal Details

Each deal has its own details page.

The page provides information such as:

- Company information
- Industry
- Location
- Funding stage
- Investment requirement
- Expected ROI
- Risk level
- Financial information
- ROI projections
- Risk analysis

The deal details page also provides interactive sections for better user experience.

---

### Recommendation Engine

The project includes a frontend recommendation engine that ranks investment opportunities according to investor preferences.

Deals are scored using four main factors:

1. Risk Match
2. Industry Match
3. Budget Compatibility
4. ROI Attractiveness

Each deal receives a match score out of 100.

The system also explains why a particular deal was recommended.

For example:

- Matches the selected risk preference
- Matches the preferred industry
- Fits within the investment budget
- Expected ROI meets the minimum ROI requirement

The recommendation logic is separated from the UI so that it can be extended easily in the future.

---

### Investor Explorer

The investor section allows users to explore available investors.

It includes:

- Investor listing
- Investor information
- Investor details
- Investment preferences
- Investor-related data

The investor data is stored locally and accessed through the service layer.

---

### My Investments / Interests

The project includes sections for managing investment-related information.

User interests can be stored on the frontend and persisted using browser storage where required.

This allows the application to maintain user selections between sessions.

---

### Corporate Dashboard

The corporate dashboard provides analytics from the company/funding perspective.

It includes:

- Total funding raised
- Investor count
- Conversion information
- Funding trends
- Industry distribution
- Investor communication analytics

Charts are used to present the data in a simple and readable way.

---

## Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### State Management

- Redux Toolkit
- React Redux

### Data Visualization

- Recharts

### Data

- JSON mock datasets
- Local frontend data

### Deployment

- Vercel

### Development

- Node.js
- npm

---

## Project Architecture

The project follows a separation-of-concerns approach.

```text
src/
│
├── app/
│   ├── corporate/
│   ├── deals/
│   ├── interest/
│   ├── investments/
│   ├── investor/
│   ├── investors/
│   └── matching/
│
├── components/
│   ├── corporate/
│   ├── dashboard/
│   ├── deal/
│   ├── investors/
│   ├── layout/
│   └── providers/
│
├── data/
│   ├── deals.json
│   └── investors.json
│
├── hooks/
│   ├── Redux.ts
│   ├── useDealExplorer.tsx
│   ├── useDealRecommendations.tsx
│   ├── useDeals.tsx
│   ├── useInterests.ts
│   └── useInvestors.ts
│
├── services/
│   ├── dealService.ts
│   ├── investorsService.ts
│   └── recommendationService.ts
│
├── store/
│   ├── hooks.tsx
│   ├── index.tsx
│   └── slices/
│
├── types/
│   ├── deal.ts
│   └── investor.ts
│
└── utils/
    ├── analytics.ts
    ├── dealRecommendation.ts
    ├── investorDealMatching.ts
    ├── recommendation.ts
    ├── recommendationEngine.ts
    ├── serviceError.ts
    └── storage.ts
```

---

## Data Layer

Since no backend API was provided for the technical task, the application uses mock data.

### Deals

The project contains:

**80 investment deals**

Stored in:

```text
src/data/deals.json
```

### Investors

The project contains:

**15 investors**

Stored in:

```text
src/data/investors.json
```

The data structure is designed so that a real backend API can be connected later without requiring major changes to the UI.

---

## Service Layer

The service layer is responsible for simulating backend operations.

For example:

```text
services/dealService.ts
```

handles:

- Fetching deals
- Searching
- Filtering
- Sorting
- Pagination
- Fetching individual deals
- Simulated network delay
- Simulated service errors

Artificial delays between approximately **300–800ms** are used to simulate real asynchronous API behavior.

This makes the frontend handle realistic:

- Loading states
- Error states
- Retry behavior
- Async operations

---

## State Management

Redux Toolkit is used for application-level state management.

The project separates state into different slices, including:

- Deals
- Investors
- Investments
- Interests

Redux is used to manage data and application state while local component state is used for UI-specific behavior.

---

## Performance Optimizations

Several frontend optimization techniques have been implemented.

### Debounced Search

The Deal Explorer uses a debounce mechanism for search.

Instead of triggering a request for every keystroke, the application waits briefly before processing the search.

This reduces unnecessary service calls.

### Memoization

The project uses:

- `useMemo`
- `useCallback`

where appropriate to avoid unnecessary calculations and function recreation.

### Request Protection

The Deal Explorer tracks requests so that an older asynchronous request does not overwrite newer results.

### Pagination

Instead of rendering all 80 deals at once, the Deal Explorer displays a limited number of results per page.

This keeps the interface lightweight and easier to navigate.

### Component Separation

Reusable UI elements are separated into components instead of keeping all logic inside page files.

---

## User Experience

The dashboard follows a modern fintech-inspired design.

The interface includes:

- Dark dashboard theme
- Responsive layout
- Consistent spacing
- Cards
- Charts
- Interactive filters
- Hover effects
- Loading skeletons
- Empty states
- Error states
- Responsive navigation

The application is designed to work across desktop and smaller screen sizes.

---

## Error Handling

The application includes simulated service failures to demonstrate how a frontend application can handle backend failures.

When an error occurs, the UI provides:

- Error message
- Retry option
- Loading state recovery

This was implemented even though the project does not use a real backend API.

---

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/piyu54/3D-Bharat-.git
```

Move into the project:

```bash
cd 3D-Bharat-
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Production Build

To create a production build:

```bash
npm run build
```

The project currently builds successfully with Next.js.

---

## Deployment

The application is deployed using Vercel.

Live application:

https://3d-bharat-investor-dashboard-dun.vercel.app/

The project can be deployed again by connecting the GitHub repository to Vercel.

If this project were connected to a real backend, the next improvements would include:

- Authentication and authorization
- Real database integration
- REST/GraphQL APIs
- Real-time investment data
- User portfolios
- Actual investment transactions
- Notifications
- Advanced recommendation models
- Server-side caching
- Role-based access control
- Automated testing

---

## Disclaimer

This project was created as a technical demonstration for the Full Stack Developer task.

All investment data used in the application is mock/demo data and should not be considered real financial information or investment advice.

---

## Author

**Priya Kushwaha**

Full Stack / Java Developer

Built as part of the **3D Bharat Full Stack Developer Technical Task**.
