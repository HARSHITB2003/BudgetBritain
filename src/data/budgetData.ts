export interface BudgetCategory {
  id: string;
  name: string;
  actual: number;
  icon: string;
  color: string;
  locked?: boolean;
  consequences: {
    increase: { threshold: number; text: string }[];
    decrease: { threshold: number; text: string }[];
  };
}

export const TOTAL_BUDGET = 1335;

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'health',
    name: 'Health (NHS)',
    actual: 192,
    icon: 'Heart',
    color: '#E74C3C',
    consequences: {
      increase: [
        { threshold: 10, text: 'Funds ~22,000 additional nurses or builds ~5 new hospitals' },
        { threshold: 20, text: 'Eliminates current A&E waiting time crisis. Average wait drops under 2 hours' },
        { threshold: 50, text: 'Funds universal dental care and mental health expansion' },
      ],
      decrease: [
        { threshold: 10, text: 'Equivalent to closing ~30 hospitals or cutting 25,000 nursing positions' },
        { threshold: 20, text: 'NHS waiting list increases by estimated 1.5 million' },
        { threshold: 50, text: 'Returns NHS to 2010 funding levels. Service collapse likely' },
      ],
    },
  },
  {
    id: 'social',
    name: 'Social Protection',
    actual: 379,
    icon: 'Shield',
    color: '#8E44AD',
    consequences: {
      increase: [
        { threshold: 20, text: 'Lifts estimated 400,000 children out of poverty' },
        { threshold: 50, text: 'Universal Credit rises to actual living cost level' },
      ],
      decrease: [
        { threshold: 20, text: '800,000 additional children fall below poverty line' },
        { threshold: 50, text: 'Homelessness doubles within 3 years' },
      ],
    },
  },
  {
    id: 'education',
    name: 'Education',
    actual: 115,
    icon: 'GraduationCap',
    color: '#2ECC71',
    consequences: {
      increase: [
        { threshold: 10, text: 'Restores per-pupil funding to 2010 levels. 50k more teachers' },
        { threshold: 20, text: 'Free school meals for all children' },
      ],
      decrease: [
        { threshold: 10, text: 'Average class sizes increase from 27 to 33' },
        { threshold: 20, text: 'School building maintenance programme cancelled' },
      ],
    },
  },
  {
    id: 'defence',
    name: 'Defence',
    actual: 78,
    icon: 'Swords',
    color: '#34495E',
    consequences: {
      increase: [
        { threshold: 10, text: 'Meets NATO 2.5% GDP target' },
        { threshold: 20, text: 'Full nuclear deterrent renewal accelerated' },
      ],
      decrease: [
        { threshold: 10, text: 'UK falls below NATO 2% GDP commitment' },
        { threshold: 20, text: 'Army personnel reduced to 60,000' },
      ],
    },
  },
  {
    id: 'order',
    name: 'Public Order & Safety',
    actual: 46,
    icon: 'Scale',
    color: '#E67E22',
    consequences: {
      increase: [
        { threshold: 5, text: 'Recruits 20,000 additional police officers' },
        { threshold: 10, text: 'Fully funds court backlog clearance' },
      ],
      decrease: [
        { threshold: 5, text: '10,000 police officers cut. 999 response times up 40%' },
        { threshold: 10, text: 'Prison capacity crisis. Courts backlog exceeds 100k' },
      ],
    },
  },
  {
    id: 'transport',
    name: 'Transport',
    actual: 28,
    icon: 'Train',
    color: '#3498DB',
    consequences: {
      increase: [
        { threshold: 10, text: 'HS2 northern extension funded. Bus services restored' },
        { threshold: 20, text: 'Free bus travel for under-25s' },
      ],
      decrease: [
        { threshold: 5, text: 'Rural bus routes cut by 40%. Maintenance halved' },
        { threshold: 10, text: 'HS2 cancelled entirely. Rail fares increase 30%' },
      ],
    },
  },
  {
    id: 'housing',
    name: 'Housing & Environment',
    actual: 30,
    icon: 'Home',
    color: '#1ABC9C',
    consequences: {
      increase: [
        { threshold: 10, text: 'Builds 60,000 social homes per year' },
        { threshold: 20, text: '120,000 new affordable homes per year' },
      ],
      decrease: [
        { threshold: 5, text: 'Social housing construction stops' },
        { threshold: 10, text: 'Environmental Agency defunded' },
      ],
    },
  },
  {
    id: 'debt',
    name: 'Debt Interest',
    actual: 114,
    icon: 'Lock',
    color: '#95A5A6',
    locked: true,
    consequences: {
      increase: [],
      decrease: [],
    },
  },
  {
    id: 'science',
    name: 'Science & Innovation',
    actual: 15,
    icon: 'Microscope',
    color: '#9B59B6',
    consequences: {
      increase: [
        { threshold: 5, text: 'Doubles UK research output. 10k PhD positions' },
        { threshold: 10, text: 'UK matches South Korean R&D spending ratio' },
      ],
      decrease: [
        { threshold: 5, text: 'University research funding halved' },
      ],
    },
  },
  {
    id: 'aid',
    name: 'International Aid',
    actual: 10,
    icon: 'Globe',
    color: '#F39C12',
    consequences: {
      increase: [
        { threshold: 5, text: 'Restores aid to 0.7% GNI commitment' },
      ],
      decrease: [
        { threshold: 5, text: 'Aid effectively eliminated' },
      ],
    },
  },
  {
    id: 'energy',
    name: 'Energy & Net Zero',
    actual: 12,
    icon: 'Zap',
    color: '#27AE60',
    consequences: {
      increase: [
        { threshold: 10, text: 'Accelerates net zero to 2040. Heat pump grants' },
        { threshold: 20, text: 'Full home insulation programme' },
      ],
      decrease: [
        { threshold: 5, text: 'Net zero target pushed to 2060' },
      ],
    },
  },
  {
    id: 'other',
    name: 'Other Government',
    actual: 316,
    icon: 'Building2',
    color: '#7F8C8D',
    consequences: {
      increase: [
        { threshold: 10, text: 'Increases council services and civil service capacity' },
      ],
      decrease: [
        { threshold: 10, text: 'Reduces local government grants and social care funding' },
      ],
    },
  },
];
