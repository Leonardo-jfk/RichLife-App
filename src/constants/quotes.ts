// src/constants/quotes.ts
import { Language } from "./translations";

export interface Quote {
  id: string;
  author: string;
  text: string;
  category: string;
  icon: string;
  tags: string[];
}

// Fonction pour obtenir les citations traduites
export const getQuotes = (t: any): Quote[] => [
  {
    id: "1",
    author: t.wisdom.authorWarrenBuffett,
    text: t.wisdom.quote1,
    category: t.wisdom.categorySave,
    icon: "wallet",
    tags: [t.wisdom.tagSavings, t.wisdom.tagBudget],
  },
  {
    id: "2",
    author: t.wisdom.authorAlexHormozi,
    text: t.wisdom.quote2,
    category: t.wisdom.categoryMinimalism,
    icon: "leaf",
    tags: [t.wisdom.tagSimplicity, t.wisdom.tagFreedom],
  },
  {
    id: "3",
    author: t.wisdom.authorArnoldSchwarzenegger,
    text: t.wisdom.quote3,
    category: t.wisdom.categoryInvest,
    icon: "trending-up",
    tags: [t.wisdom.tagHappiness, t.wisdom.tagMoney],
  },
  {
    id: "4",
    author: t.wisdom.authorWarrenBuffett,
    text: t.wisdom.quote4,
    category: t.wisdom.categoryInvest,
    icon: "person",
    tags: [t.wisdom.tagDevelopment, t.wisdom.tagSkills],
  },
  {
    id: "5",
    author: t.wisdom.authorNavalRavikant,
    text: t.wisdom.quote5,
    category: t.wisdom.categorySkills,
    icon: "school",
    tags: [t.wisdom.tagSkills, t.wisdom.tagWealth],
  },
  {
    id: "6",
    author: t.wisdom.authorJimRohn,
    text: t.wisdom.quote6,
    category: t.wisdom.categoryGoals,
    icon: "checkbox",
    tags: [t.wisdom.tagObjectives, t.wisdom.tagTracking],
  },
  {
    id: "7",
    author: t.wisdom.authorPeterLynch,
    text: t.wisdom.quote7,
    category: t.wisdom.categoryInvest,
    icon: "trending-down",
    tags: [t.wisdom.tagInvestment, t.wisdom.tagStrategy],
  },
  {
    id: "8",
    author: t.wisdom.authorHenryFord,
    text: t.wisdom.quote8,
    category: t.wisdom.categoryMindset,
    icon: "bulb",
    tags: [t.wisdom.tagBelief, t.wisdom.tagConfidence],
  },
  {
    id: "9",
    author: t.wisdom.authorJohnLeBlanc,
    text: t.wisdom.quote9,
    category: t.wisdom.categoryAction,
    icon: "time",
    tags: [t.wisdom.tagProcrastination, t.wisdom.tagAction],
  },
  {
    id: "10",
    author: t.wisdom.authorKeanuReeves,
    text: t.wisdom.quote10,
    category: t.wisdom.categoryDiscipline,
    icon: "fitness",
    tags: [t.wisdom.tagDiscipline, t.wisdom.tagSelfControl],
  },
  {
    id: "11",
    author: t.wisdom.authorCharlieMunger,
    text: t.wisdom.quote11,
    category: t.wisdom.categorySkills,
    icon: "school",
    tags: [t.wisdom.tagSkills, t.wisdom.tagWealth],
  },
  {
    id: "12",
    author: t.wisdom.authorRayDalio,
    text: t.wisdom.quote12,
    category: t.wisdom.categoryGrowth,
    icon: "trending-up",
    tags: [t.wisdom.tagProgress, t.wisdom.tagLearning],
  },
];

// Catégories pour les boutons (traduites dynamiquement)
export const getCategories = (t: any) => [
  { id: "all", name: t.wisdom.allCategories, icon: "apps" },
  { id: t.wisdom.categorySkills, name: t.wisdom.categorySkills, icon: "school" },
  { id: t.wisdom.categoryInvest, name: t.wisdom.categoryInvest, icon: "trending-up" },
  { id: t.wisdom.categorySave, name: t.wisdom.categorySave, icon: "wallet" },
  { id: t.wisdom.categoryMindset, name: t.wisdom.categoryMindset, icon: "bulb" },
  { id: t.wisdom.categoryAction, name: t.wisdom.categoryAction, icon: "flash" },
  { id: t.wisdom.categoryDiscipline, name: t.wisdom.categoryDiscipline, icon: "fitness" },
  { id: t.wisdom.categoryMinimalism, name: t.wisdom.categoryMinimalism, icon: "leaf" },
];

// Tags populaires (traduits)
export const getTags = (t: any) => [
  t.wisdom.tagSkills,
  t.wisdom.tagInvestment,
  t.wisdom.tagSavings,
  t.wisdom.tagAction,
  t.wisdom.tagDiscipline,
  t.wisdom.tagObjectives,
];