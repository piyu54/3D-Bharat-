# 3D Bharat Investor & Corporate Dashboard

A modern full-stack style investment dashboard built with **Next.js, TypeScript, Redux Toolkit and Recharts**.

This project was created as part of a Full Stack Developer task for **3D Bharat**. Since no backend APIs were provided, I simulated the backend behavior using local JSON data, service functions, artificial delays, filtering, sorting, pagination and error handling.

The main goal of the project is to build a scalable and interactive dashboard for both investors and corporates.

---

## 🚀 Live Demo

Deployed application:

[Add your Vercel link here]

---

## 📌 Project Overview

The application provides two main experiences:

### Investor Dashboard

Investors can:

- View investment statistics
- Explore available investment deals
- Search and filter deals
- Sort deals based on ROI and investment amount
- View detailed company information
- Get personalized deal recommendations
- Manage interests
- View investments
- Analyze risk and ROI information

### Corporate Dashboard

Corporates can:

- View funding analytics
- Track total funding raised
- Analyze investor activity
- View industry distribution
- Monitor investor communication
- Understand funding trends through charts

---

## ✨ Main Features

### 1. Deal Explorer

The Deal Explorer allows investors to find suitable investment opportunities.

Features include:

- Search companies, industries and locations
- Industry filtering
- Risk-level filtering
- Funding-stage filtering
- Deal-status filtering
- Minimum and maximum ROI
- Minimum and maximum investment
- Sorting
- Pagination
- Loading states
- Error handling
- Empty states

Search is also debounced so that the application does not make a new request on every keystroke.

---

### 2. Deal Details

Each deal has its own details page.

The page contains information such as:

- Company name
- Industry
- Location
- Company description
- Funding stage
- Investment requirement
- Expected ROI
- Risk level
- Financial information
- ROI projections
- Risk analysis

The page is designed to give investors enough information before considering an investment opportunity.

---

### 3. Recommendation Engine

I implemented a frontend recommendation engine to match investors with suitable deals.

Each deal receives a score based on:

- Risk match
- Industry match
- Budget compatibility
- ROI attractiveness

The final score is calculated out of 100.

The recommendation engine also provides reasons explaining why a particular deal matches the investor's preferences.

Example:

```text
Risk Match: 25/25
Industry Match: 25/25
Budget Compatibility: 25/25
ROI Attractiveness: 22/25

Match Score: 97/100
```
