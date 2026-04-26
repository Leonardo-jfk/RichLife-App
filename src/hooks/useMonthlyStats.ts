// // src/hooks/useMonthlyStats.ts
// import { useMemo } from "react";
// import { useCurrency } from "../context/CurrencyContext";
// import { Dream, Goal } from "../types/finance-types";
//
// export const useMonthlyStats = (
//   dreams: Dream[],
//   goals: Goal[],
//   monthlyIncome: number,
//   monthlyExpenses: number,
// ) => {
//   const { formatCurrency } = useCurrency();
//
//   // export const useMonthlyStats = (
//   //   dreams: Dream[],
//   //   goals: Goal[],
//   //   monthlyIncome: number = 0,
//   //   monthlyExpenses: number = 0,
//   // ): MonthlyStats => {
//   return useMemo(() => {
//     // Total des contributions mensuelles aux rêves
//     const dreamsMonthlyTotal = dreams.reduce(
//       (sum, dream) => sum + (dream.monthlyContribution || 0),
//       0,
//     );
//
//     // Total des contributions mensuelles aux objectifs
//     const goalsMonthlyTotal = goals.reduce(
//       (sum, goal) => sum + (goal.monthlyContribution || 0),
//       0,
//     );
//
//     // Économies mensuelles totales
//     const totalMonthlySavings = monthlyIncome - monthlyExpenses;
//
//     // Projection d'épargne annuelle
//     const projectedYearlySavings = totalMonthlySavings * 12;
//
//     // Progression globale
//     const totalDreamsTarget = dreams.reduce(
//       (sum, d) => sum + (d.targetAmount || 0),
//       0,
//     );
//     const totalDreamsCurrent = dreams.reduce(
//       (sum, d) => sum + (d.currentAmount || 0),
//       0,
//     );
//     const totalGoalsTarget = goals.reduce(
//       (sum, g) => sum + (g.targetAmount || 0),
//       0,
//     );
//     const totalGoalsCurrent = goals.reduce(
//       (sum, g) => sum + (g.currentAmount || 0),
//       0,
//     );
//
//     const dreamsProgress =
//       totalDreamsTarget > 0
//         ? (totalDreamsCurrent / totalDreamsTarget) * 100
//         : 0;
//
//     const goalsProgress =
//       totalGoalsTarget > 0 ? (totalGoalsCurrent / totalGoalsTarget) * 100 : 0;
//
//     const overallProgress =
//       totalDreamsTarget + totalGoalsTarget > 0
//         ? ((totalDreamsCurrent + totalGoalsCurrent) /
//             (totalDreamsTarget + totalGoalsTarget)) *
//           100
//         : 0;
//
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
//       formatCurrency,
//     };
//   }, [dreams, goals, monthlyIncome, monthlyExpenses, formatCurrency]);
// };



// src/hooks/useMonthlyStats.ts
import { useEffect, useState } from "react";
import { supabase } from "../library/supabase";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";

export function useMonthlyStats() {
  const { user } = useAuth();
  const { formatCurrency } = useCurrency();
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
    monthlyContributions: { dreams: 0, goals: 0, total: 0 },
    projectedSavings: 0,
    progress: { dreams: 0, goals: 0, overall: 0 },
    loading: true,
  });

  const loadStats = async () => {
    if (!user) return;

    try {
      // 1. Transactions du mois
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const { data: transactions } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", startOfMonth.toISOString())
        .lte("date", endOfMonth.toISOString());

      // const income = transactions?.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0) || 0;

      const income = transactions?.filter(t => t.type === "income").reduce((sum: number, t: any) => sum + t.amount, 0) || 0;
      const expenses = transactions?.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0) || 0;
      const totalSavings = income - expenses;

      // 2. Contributions mensuelles (depuis dreams et goals)
      const { data: dreams } = await supabase
        .from("dreams")
        .select("monthly_contribution")
        .eq("user_id", user.id);
      const dreamsMonthlyTotal = dreams?.reduce((s, d) => s + (d.monthly_contribution || 0), 0) || 0;

      const { data: goals } = await supabase
        .from("goals")
        .select("monthly_contribution")
        .eq("user_id", user.id);
      const goalsMonthlyTotal = goals?.reduce((s, g) => s + (g.monthly_contribution || 0), 0) || 0;

      // 3. Progression
      const { data: allDreams } = await supabase
        .from("dreams")
        .select("target_amount, current_amount")
        .eq("user_id", user.id);
      const totalDreamsTarget = allDreams?.reduce((s, d) => s + (d.target_amount || 0), 0) || 0;
      const totalDreamsCurrent = allDreams?.reduce((s, d) => s + (d.current_amount || 0), 0) || 0;
      const dreamsProgress = totalDreamsTarget ? (totalDreamsCurrent / totalDreamsTarget) * 100 : 0;

      const { data: allGoals } = await supabase
        .from("goals")
        .select("target_amount, current_amount")
        .eq("user_id", user.id);
      const totalGoalsTarget = allGoals?.reduce((s, g) => s + (g.target_amount || 0), 0) || 0;
      const totalGoalsCurrent = allGoals?.reduce((s, g) => s + (g.current_amount || 0), 0) || 0;
      const goalsProgress = totalGoalsTarget ? (totalGoalsCurrent / totalGoalsTarget) * 100 : 0;

      const overallProgress = (totalDreamsTarget + totalGoalsTarget) > 0
        ? ((totalDreamsCurrent + totalGoalsCurrent) / (totalDreamsTarget + totalGoalsTarget)) * 100
        : 0;

      setStats({
        totalIncome: income,
        totalExpenses: expenses,
        totalSavings,
        monthlyContributions: {
          dreams: dreamsMonthlyTotal,
          goals: goalsMonthlyTotal,
          total: dreamsMonthlyTotal + goalsMonthlyTotal,
        },
        projectedSavings: totalSavings * 12,
        progress: {
          dreams: dreamsProgress,
          goals: goalsProgress,
          overall: overallProgress,
        },
        loading: false,
      });
    } catch (error) {
      console.error("Erreur chargement statistiques:", error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    loadStats();
  }, [user]);

  return { ...stats, formatCurrency, refresh: loadStats };
}