// // src/hooks/useDailyBudget.ts
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
//
// const CREDITS_STORAGE = "@finance_app_credits";
//
// export interface Credit {
//   id: string;
//   title: string;
//   totalAmount: number;
//   paidAmount: number;
//   remainingMonths: number;
//   startDate: string;
//   monthlyPayment: number;
//   description?: string;
// }
//
// export function useDailyBudget(
//   monthlyIncome: number,
//   monthlyExpenses: number,
//   dreams: any[],
//   goals: any[],
// ) {
//   const [credits, setCredits] = useState<Credit[]>([]);
//
//   // Charger les crédits
//   useEffect(() => {
//     loadCredits();
//   }, []);
//
//   const loadCredits = async () => {
//     try {
//       const data = await AsyncStorage.getItem(CREDITS_STORAGE);
//       setCredits(data ? JSON.parse(data) : []);
//     } catch (error) {
//       console.error("Erreur chargement crédits:", error);
//     }
//   };
//
//   const saveCredits = async (newCredits: Credit[]) => {
//     try {
//       await AsyncStorage.setItem(CREDITS_STORAGE, JSON.stringify(newCredits));
//       setCredits(newCredits);
//     } catch (error) {
//       console.error("Erreur sauvegarde crédits:", error);
//     }
//   };
//
//   const addCredit = async (credit: Omit<Credit, "id" | "paidAmount">) => {
//     const newCredit: Credit = {
//       ...credit,
//       id: Date.now().toString(),
//       paidAmount: 0,
//     };
//     await saveCredits([...credits, newCredit]);
//   };
//
//   const payCredit = async (creditId: string, amount: number) => {
//     const updated = credits.map((credit) => {
//       if (credit.id === creditId) {
//         const newPaid = Math.min(
//           credit.paidAmount + amount,
//           credit.totalAmount,
//         );
//         return { ...credit, paidAmount: newPaid };
//       }
//       return credit;
//     });
//     await saveCredits(updated);
//   };
//
//   const deleteCredit = async (creditId: string) => {
//     await saveCredits(credits.filter((c) => c.id !== creditId));
//   };
//
//   // Calculer les paiements mensuels des crédits
//   const totalMonthlyCreditPayments = credits.reduce((sum, credit) => {
//     const remaining = credit.totalAmount - credit.paidAmount;
//     // Si le crédit est actif, calculer le paiement mensuel
//     if (remaining > 0 && credit.remainingMonths > 0) {
//       return sum + credit.monthlyPayment;
//     }
//     return sum;
//   }, 0);
//
//   // Calculer le budget disponible après tous les engagements
//   const totalCommitments = monthlyExpenses + totalMonthlyCreditPayments;
//
//   // Récupérer le nombre de jours restants dans le mois
//   const getRemainingDays = () => {
//     const today = new Date();
//     const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
//     return lastDay.getDate() - today.getDate();
//   };
//
//   const remainingDays = getRemainingDays();
//
//   // Budget quotidien
//   const dailyBudget = (monthlyIncome - totalCommitments) / remainingDays;
//
//   // Budget total restant pour le mois
//   const remainingMonthlyBudget = monthlyIncome - totalCommitments;
//
//   return {
//     credits,
//     totalMonthlyCreditPayments,
//     dailyBudget: dailyBudget > 0 ? dailyBudget : 0,
//     remainingMonthlyBudget:
//       remainingMonthlyBudget > 0 ? remainingMonthlyBudget : 0,
//     remainingDays,
//     addCredit,
//     payCredit,
//     deleteCredit,
//   };
// }





// src/hooks/useDailyBudget.ts
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";

export interface Credit {
  id: string;
  title: string;
  totalAmount: number;
  paidAmount: number;
  remainingMonths: number;
  startDate: string;
  monthlyPayment: number;
  description?: string;
}

export function useDailyBudget() {
  const { user } = useAuth();
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);

  // Charger les transactions du mois en cours et les crédits
  const loadData = async () => {
    if (!user) return;

    try {
      // 1. Récupérer les transactions du mois
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const { data: transactions, error: txError } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .gte("date", startOfMonth.toISOString())
        .lte("date", endOfMonth.toISOString());

      if (txError) throw txError;

      const income = transactions
        ?.filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0) || 0;

      const expenses = transactions
        ?.filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0) || 0;

      setMonthlyIncome(income);
      setMonthlyExpenses(expenses);

      // 2. Récupérer les crédits
      const { data: creditsData, error: creditsError } = await supabase
        .from("credits")
        .select("*")
        .eq("user_id", user.id);

      if (creditsError) throw creditsError;
      setCredits(creditsData || []);
    } catch (error) {
      console.error("Erreur chargement données budget:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const addCredit = async (credit: Omit<Credit, "id" | "paidAmount">) => {
    if (!user) return;
    const newCredit = {
      ...credit,
      user_id: user.id,
      paid_amount: 0,
      start_date: credit.startDate || new Date().toISOString(),
    };
    const { data, error } = await supabase
      .from("credits")
      .insert(newCredit)
      .select()
      .single();
    if (error) {
      console.error(error);
      return;
    }
    setCredits((prev) => [...prev, data as Credit]);
  };

  const deleteCredit = async (creditId: string) => {
    const { error } = await supabase
      .from("credits")
      .delete()
      .eq("id", creditId)
      .eq("user_id", user?.id);
    if (error) {
      console.error(error);
      return;
    }
    setCredits((prev) => prev.filter((c) => c.id !== creditId));
  };

  // Calculs
  const totalMonthlyCreditPayments = credits.reduce((sum, credit) => {
    const remaining = credit.totalAmount - credit.paidAmount;
    if (remaining > 0 && credit.remainingMonths > 0) {
      return sum + credit.monthlyPayment;
    }
    return sum;
  }, 0);

  const totalCommitments = monthlyExpenses + totalMonthlyCreditPayments;

  const getRemainingDays = () => {
    const today = new Date();
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDay.getDate() - today.getDate();
  };

  const remainingDays = getRemainingDays();
  const dailyBudget = (monthlyIncome - totalCommitments) / remainingDays;
  const remainingMonthlyBudget = monthlyIncome - totalCommitments;

  return {
    credits,
    totalMonthlyCreditPayments,
    dailyBudget: dailyBudget > 0 ? dailyBudget : 0,
    remainingMonthlyBudget: remainingMonthlyBudget > 0 ? remainingMonthlyBudget : 0,
    remainingDays,
    addCredit,
    deleteCredit,
    loading,
    refresh: loadData,
  };
}