// import { useMemo } from 'react';
// import { Dream, Goal } from '../types/finance-types';

// interface MonthlyStats {
//   totalIncome: number;
//   totalExpenses: number;
//   totalSavings: number;
//   monthlyContributions: {
//     dreams: number;
//     goals: number;
//     total: number;
//   };
//   projectedSavings: number;
//   progress: {
//     dreams: number;
//     goals: number;
//     overall: number;
//   };
// }

// export const useMonthlyStats = (
//   dreams: Dream[],
//   goals: Goal[],
//   monthlyIncome: number = 0,
//   monthlyExpenses: number = 0
// ) => {
//   return useMemo(() => {
//     // Total des contributions mensuelles aux rêves
//     const dreamsMonthlyTotal = dreams.reduce(
//       (sum, dream) => sum + (dream.monthlyContribution || 0),
//       0
//     );

//     // Total des contributions mensuelles aux objectifs
//     const goalsMonthlyTotal = goals.reduce(
//       (sum, goal) => sum + (goal.monthlyContribution || 0),
//       0
//     );

//     // Économies mensuelles totales
//     const totalMonthlySavings = monthlyIncome - monthlyExpenses;

//     // Projection d'épargne annuelle
//     const projectedYearlySavings = totalMonthlySavings * 12;

//     // Progression globale
//     const totalDreamsTarget = dreams.reduce((sum, d) => sum + d.targetAmount, 0);
//     const totalDreamsCurrent = dreams.reduce((sum, d) => sum + d.currentAmount, 0);
//     const totalGoalsTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
//     const totalGoalsCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);

//     const dreamsProgress = totalDreamsTarget > 0
//       ? (totalDreamsCurrent / totalDreamsTarget) * 100
//       : 0;

//     const goalsProgress = totalGoalsTarget > 0
//       ? (totalGoalsCurrent / totalGoalsTarget) * 100
//       : 0;

//     const overallProgress = (totalDreamsTarget + totalGoalsTarget) > 0
//       ? ((totalDreamsCurrent + totalGoalsCurrent) / (totalDreamsTarget + totalGoalsTarget)) * 100
//       : 0;

//     return {
//       totalIncome: monthlyIncome,
//       totalExpenses: monthlyExpenses,
//       totalSavings: totalMonthlySavings,
//       monthlyContributions: {
//         dreams: dreamsMonthlyTotal,
//         goals: goalsMonthlyTotal,
//         total: dreamsMonthlyTotal + goalsMonthlyTotal,
//       },
//       projectedSavings: projectedYearlySavings,
//       progress: {
//         dreams: dreamsProgress,
//         goals: goalsProgress,
//         overall: overallProgress,
//       },
//     };
//   }, [dreams, goals, monthlyIncome, monthlyExpenses]);
// };

// src/hooks/useMonthlyStats.ts
import { useMemo } from "react";
import { useCurrency } from "../context/CurrencyContext";
import { Dream, Goal } from "../types/finance-types";

export const useMonthlyStats = (
  dreams: Dream[],
  goals: Goal[],
  monthlyIncome: number,
  monthlyExpenses: number,
) => {
  const { formatCurrency } = useCurrency();

  // export const useMonthlyStats = (
  //   dreams: Dream[],
  //   goals: Goal[],
  //   monthlyIncome: number = 0,
  //   monthlyExpenses: number = 0,
  // ): MonthlyStats => {
  return useMemo(() => {
    // Total des contributions mensuelles aux rêves
    const dreamsMonthlyTotal = dreams.reduce(
      (sum, dream) => sum + (dream.monthlyContribution || 0),
      0,
    );

    // Total des contributions mensuelles aux objectifs
    const goalsMonthlyTotal = goals.reduce(
      (sum, goal) => sum + (goal.monthlyContribution || 0),
      0,
    );

    // Économies mensuelles totales
    const totalMonthlySavings = monthlyIncome - monthlyExpenses;

    // Projection d'épargne annuelle
    const projectedYearlySavings = totalMonthlySavings * 12;

    // Progression globale
    const totalDreamsTarget = dreams.reduce(
      (sum, d) => sum + (d.targetAmount || 0),
      0,
    );
    const totalDreamsCurrent = dreams.reduce(
      (sum, d) => sum + (d.currentAmount || 0),
      0,
    );
    const totalGoalsTarget = goals.reduce(
      (sum, g) => sum + (g.targetAmount || 0),
      0,
    );
    const totalGoalsCurrent = goals.reduce(
      (sum, g) => sum + (g.currentAmount || 0),
      0,
    );

    const dreamsProgress =
      totalDreamsTarget > 0
        ? (totalDreamsCurrent / totalDreamsTarget) * 100
        : 0;

    const goalsProgress =
      totalGoalsTarget > 0 ? (totalGoalsCurrent / totalGoalsTarget) * 100 : 0;

    const overallProgress =
      totalDreamsTarget + totalGoalsTarget > 0
        ? ((totalDreamsCurrent + totalGoalsCurrent) /
            (totalDreamsTarget + totalGoalsTarget)) *
          100
        : 0;

    return {
      totalIncome: monthlyIncome,
      totalExpenses: monthlyExpenses,
      totalSavings: totalMonthlySavings,
      monthlyContributions: {
        dreams: dreamsMonthlyTotal,
        goals: goalsMonthlyTotal,
        total: dreamsMonthlyTotal + goalsMonthlyTotal,
      },
      projectedSavings: projectedYearlySavings,
      progress: {
        dreams: dreamsProgress,
        goals: goalsProgress,
        overall: overallProgress,
      },
      formatCurrency,
    };
  }, [dreams, goals, monthlyIncome, monthlyExpenses, formatCurrency]);
};
