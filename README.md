# BudgetBritain - You Are The Chancellor

An interactive zero-sum budget allocation simulator where users redistribute the UK's real £1,335 billion annual budget across 12 government spending categories using live sliders.

## Core Features

- **Zero-Sum Constraint:** Every increase requires a decrease elsewhere. The total must stay at £1,335B.
- **3D Budget Sphere:** A real-time hero visual showing budget proportions as a dynamic 3D globe.
- **Consequence Engine:** Live impact analysis based on real-world unit costs for each category.
- **Locked Debt Interest:** £114B is legally obligated and cannot be reallocated, teaching users about national debt.
- **Whitehall Glass Design:** A premium, institutional aesthetic with glass surfaces and British racing green accents.
- **Community Aggregates:** Compare your budget with the actual government allocation and the community average.

## Tech Stack

- **React 19**
- **Tailwind CSS v4**
- **Framer Motion**
- **Recharts**
- **Lucide React**
- **Vite**

## Getting Started

1. `npm install`
2. `npm run dev`
3. Visit `http://localhost:5173`

## Methodology

Data is based on HM Treasury PESA 2025/26 actuals. Consequence estimates are illustrative approximations based on published per-unit costs from government sources.
