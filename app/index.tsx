//
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Alert,
//   Modal,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import BackgroundImage from "../../src/components/BackgroundImage";
// import IslandCard from "../../src/components/IslandCard";
// import { COLORS } from "../../src/constants/colors";
// import { useCurrency } from "../../src/context/CurrencyContext";
// import { useLanguage } from "../../src/context/LanguageContext";
// import { useTheme } from "../../src/context/ThemeContext";
// import { useDailyBudget } from "../../src/hooks/useDailyBudget";
// import { useMonthlyStats } from "../../src/hooks/useMonthlyStats";
// import { Dream, Goal, STORAGE_KEYS } from "../../src/types/finance-types";
// import { loadTransactions, saveTransactions } from "../../src/utils/storage";
// import { useDailyReminder } from "../../src/hooks/useDailyReminder";
//
// interface Transaction {
//   id: string;
//   type: "income" | "expense";
//   amount: number;
//   description: string;
//   category: string;
//   date: string;
// }
//
// export default function HomeScreen() {
//   const router = useRouter();
//   const { colors, isLoading, theme } = useTheme();
//   const { t } = useLanguage();
//   // const [forceUpdate, setForceUpdate] = useState(0);
//   const { formatCurrency } = useCurrency();
//
//   // États
//   // const [dreams, setDreams] = useState<Dream[]>([]);
//   // const [goals, setGoals] = useState<Goal[]>([]);
//   // const [transactions, setTransactions] = useState<Transaction[]>([]);
//
//   // États pour les revenus/dépenses (initialisés à 0)
//   // const [monthlyIncome, setMonthlyIncome] = useState(0);
//   // const [monthlyExpenses, setMonthlyExpenses] = useState(0);
//   // const [showIncomeModal, setShowIncomeModal] = useState(false);
//   // const [tempIncome, setTempIncome] = useState("0");
//   // const [tempExpenses, setTempExpenses] = useState("0");
//   //
//   // // État pour les crédits
//   // const [showCreditModal, setShowCreditModal] = useState(false);
//   // const [newCredit, setNewCredit] = useState({
//   //   title: "",
//   //   totalAmount: "",
//   //   remainingMonths: "12",
//   //   monthlyPayment: "",
//   //   description: "",
//   // });
//
//   // Fonction pour calculer les revenus/dépenses du mois courant
//   const calculateMonthlyTotals = useCallback(() => {
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
//
//     const currentMonthTransactions = transactions.filter((t) => {
//       const date = new Date(t.date);
//       return (
//         date.getMonth() === currentMonth && date.getFullYear() === currentYear
//       );
//     });
//
//     const income = currentMonthTransactions
//       .filter((t) => t.type === "income")
//       .reduce((sum, t) => sum + t.amount, 0);
//
//     const expenses = currentMonthTransactions
//       .filter((t) => t.type === "expense")
//       .reduce((sum, t) => sum + t.amount, 0);
//
//     return { income, expenses };
//   }, [transactions]);
//
//   // Mettre à jour les revenus/dépenses quand les transactions changent
//   // useEffect(() => {
//   //   const { income, expenses } = calculateMonthlyTotals();
//   //   setMonthlyIncome(income);
//   //   setMonthlyExpenses(expenses);
//   //   setTempIncome(income.toString());
//   //   setTempExpenses(expenses.toString());
//   // }, [transactions, calculateMonthlyTotals]);
//
//   // Charger toutes les données
//   const loadAllData = async () => {
//     try {
//       const [dreamsData, goalsData, transactionsData] = await Promise.all([
//         AsyncStorage.getItem(STORAGE_KEYS.DREAMS),
//         AsyncStorage.getItem(STORAGE_KEYS.GOALS),
//         loadTransactions(),
//       ]);
//       setDreams(dreamsData ? JSON.parse(dreamsData) : []);
//       setGoals(goalsData ? JSON.parse(goalsData) : []);
//       setTransactions(transactionsData);
//     } catch (error) {
//       console.error("Erreur chargement:", error);
//     }
//   };
//
// //   useCallback(() => {
// //     loadAllData();
// //     // Vérifie si une notification doit être envoyée (1x par jour)
// //   }, [])
// // );
//
// useFocusEffect(
//   useCallback(() => {
//     loadAllData();
//     sendReminder();
//   }, [])
// );
//
//   // Stats mensuelles des rêves/objectifs
//   // const stats = useMonthlyStats(dreams, goals, monthlyIncome, monthlyExpenses);
//
//   const { totalIncome, totalExpenses, totalSavings, monthlyContributions, projectedSavings, progress, loading: statsLoading } = useMonthlyStats();
// const { dailyBudget, remainingMonthlyBudget, remainingDays, credits, totalMonthlyCreditPayments, addCredit, deleteCredit, loading: budgetLoading } = useDailyBudget();
//
// if (statsLoading || budgetLoading) return <ActivityIndicator />;
//
//
//   // Totaux combinés
//   const totalDreamsCurrent = dreams.reduce(
//     (sum, d) => sum + (d.currentAmount || 0),
//     0,
//   );
//   const totalGoalsCurrent = goals.reduce(
//     (sum, g) => sum + (g.currentAmount || 0),
//     0,
//   );
//
//   // Budget quotidien
//   // const {
//   //   dailyBudget,
//   //   remainingMonthlyBudget,
//   //   remainingDays,
//   //   credits,
//   //   totalMonthlyCreditPayments,
//   //   addCredit,
//   //   deleteCredit,
//   // } = useDailyBudget(monthlyIncome, monthlyExpenses, dreams, goals);
//
//   // Fonctions pour modifier les revenus/dépenses
//   const handleSaveIncome = () => {
//     const value = parseFloat(tempIncome);
//     if (!isNaN(value) && value > 0) {
//       const newTransaction: Transaction = {
//         id: Date.now().toString(),
//         type: "income",
//         amount: value,
//         description: t.common.manualAdjustment,
//         category: "salary",
//         date: new Date().toISOString(),
//       };
//       const newTransactions = [newTransaction, ...transactions];
//       setTransactions(newTransactions);
//       saveTransactions(newTransactions);
//     }
//     setShowIncomeModal(false);
//   };
//
//   const handleSaveExpenses = () => {
//     const value = parseFloat(tempExpenses);
//     if (!isNaN(value) && value > 0) {
//       const newTransaction: Transaction = {
//         id: Date.now().toString(),
//         type: "expense",
//         amount: value,
//         description: t.common.manualAdjustment,
//         category: "other",
//         date: new Date().toISOString(),
//       };
//       const newTransactions = [newTransaction, ...transactions];
//       setTransactions(newTransactions);
//       saveTransactions(newTransactions);
//     }
//     setShowIncomeModal(false);
//   };
//
//   const { sendReminder } = useDailyReminder();
//
//
//   // Mettre à jour forceUpdate quand le thème change
//   useEffect(() => {
//     setForceUpdate((prev) => prev + 1);
//   }, [theme]);
//
//   if (isLoading) {
//     return (
//       <BackgroundImage
//         key={`bg-loading-${forceUpdate}`}
//         opacity={0.6}
//         blurRadius={2}
//       >
//         <View style={styles.loadingContainer}>
//           <Text style={[styles.loadingText, { color: colors.text }]}>
//             {t.common.loading}
//           </Text>
//         </View>
//       </BackgroundImage>
//     );
//   }
//
//   return (
//     <BackgroundImage imageTheme="default" opacity={0.6} blurRadius={2}>
//       <ScrollView style={styles.scrollView}>
//         {/* Header */}
//         <View style={styles.titleContainer}>
//           <Text
//             style={{
//               fontFamily: "FrenchScript",
//               fontSize: 40,
//               color: colors.text,
//               textAlign: "center",
//             }}
//           >
//             {t.home.monthlySummary}
//           </Text>
//         </View>
//
//         {/* Carte des revenus/dépenses */}
//         <IslandCard>
//           <View style={styles.cardHeader}>
//             <Text style={[styles.cardTitle, { color: colors.text }]}>
//               {t.home.monthlyFlow}
//             </Text>
//             <TouchableOpacity onPress={() => setShowIncomeModal(true)}>
//               <Ionicons name="pencil" size={20} color={colors.icon} />
//             </TouchableOpacity>
//           </View>
//
//           <View style={styles.row}>
//             <TouchableOpacity
//               style={styles.statItem}
//               onPress={() => setShowIncomeModal(true)}
//             >
//               <Ionicons name="arrow-down" size={20} color={COLORS.income} />
//               <Text style={[styles.statLabel, { color: colors.text }]}>
//                 {t.home.income}
//               </Text>
//               <Text style={[styles.statValue, { color: COLORS.income }]}>
//                 {formatCurrency(monthlyIncome)}
//               </Text>
//             </TouchableOpacity>
//
//             <TouchableOpacity
//               style={styles.statItem}
//               onPress={() => setShowIncomeModal(true)}
//             >
//               <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
//               <Text style={[styles.statLabel, { color: colors.text }]}>
//                 {t.home.expenses}
//               </Text>
//               <Text style={[styles.statValue, { color: COLORS.expense }]}>
//                 {formatCurrency(monthlyExpenses)}
//               </Text>
//             </TouchableOpacity>
//           </View>
//
//           <View
//             style={[styles.divider, { backgroundColor: colors.icon + "20" }]}
//           />
//
//           <View style={styles.savingsContainer}>
//             <Text style={[styles.savingsLabel, { color: colors.text }]}>
//               {t.home.monthlySavings}
//             </Text>
//             <Text
//               style={[
//                 styles.savingsValue,
//                 {
//                   color:
//                     stats.totalSavings >= 0 ? COLORS.success : COLORS.danger,
//                 },
//               ]}
//             >
//               {formatCurrency(stats.totalSavings)}
//             </Text>
//             <Text style={[styles.projectionText, { color: colors.text }]}>
//               {t.home.annualProjection}: {formatCurrency(stats.projectedSavings)}
//             </Text>
//           </View>
//         </IslandCard>
//
//         {/* Carte du budget journalier */}
//         <IslandCard>
//           <View style={styles.cardHeader}>
//             <Text style={[styles.cardTitle, { color: colors.text }]}>
//               {t.home.dailyBudgetTitle}
//             </Text>
//           </View>
//
//           <View style={styles.dailyBudgetContainer}>
//             <Text style={[styles.dailyBudgetValue, { color: colors.primary }]}>
//               {formatCurrency(dailyBudget)}
//             </Text>
//             <Text
//               style={[styles.dailyBudgetLabel, { color: colors.textLight }]}
//             >
//               {t.home.perDay} ({remainingDays} {t.home.remainingDays})
//             </Text>
//           </View>
//
//           <View style={styles.remainingBudgetContainer}>
//             <Text
//               style={[styles.remainingBudgetLabel, { color: colors.textLight }]}
//             >
//               {t.home.remainingBudget}
//             </Text>
//             <Text
//               style={[styles.remainingBudgetValue, { color: colors.success }]}
//             >
//               {formatCurrency(remainingMonthlyBudget)}
//             </Text>
//           </View>
//
//           {totalMonthlyCreditPayments > 0 && (
//             <View style={styles.creditPaymentContainer}>
//               <Text
//                 style={[styles.creditPaymentLabel, { color: colors.textLight }]}
//               >
//                 {t.home.monthlyPayments}
//               </Text>
//               <Text
//                 style={[styles.creditPaymentValue, { color: colors.warning }]}
//               >
//                 {formatCurrency(totalMonthlyCreditPayments)}
//               </Text>
//             </View>
//           )}
//
//           <TouchableOpacity
//             style={styles.creditButton}
//             onPress={() => setShowCreditModal(true)}
//           >
//             <Ionicons name="card-outline" size={20} color={colors.primary} />
//             <Text style={[styles.creditButtonText, { color: colors.primary }]}>
//               {t.home.manageCredits}
//             </Text>
//           </TouchableOpacity>
//         </IslandCard>
//
//         {/* Modal pour modifier les revenus/dépenses */}
//         <Modal
//           visible={showIncomeModal}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setShowIncomeModal(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View
//               style={[
//                 styles.modalContent,
//                 { backgroundColor: colors.background },
//               ]}
//             >
//               <Text style={[styles.modalTitle, { color: colors.text }]}>
//                 {t.common.editAmounts}
//               </Text>
//
//               <Text style={[styles.modalLabel, { color: colors.text }]}>
//                 {t.home.monthlyIncome}
//               </Text>
//               <TextInput
//                 style={[
//                   styles.modalInput,
//                   { color: colors.text, borderColor: colors.icon + "30" },
//                 ]}
//                 value={tempIncome}
//                 onChangeText={setTempIncome}
//                 keyboardType="numeric"
//                 placeholder={t.common.amount}
//                 placeholderTextColor={colors.textLight}
//               />
//
//               <Text style={[styles.modalLabel, { color: colors.text }]}>
//                 {t.home.totalExpenses}
//               </Text>
//               <TextInput
//                 style={[
//                   styles.modalInput,
//                   { color: colors.text, borderColor: colors.icon + "30" },
//                 ]}
//                 value={tempExpenses}
//                 onChangeText={setTempExpenses}
//                 keyboardType="numeric"
//                 placeholder={t.common.amount}
//                 placeholderTextColor={colors.textLight}
//               />
//
//               <View style={styles.modalButtons}>
//                 <TouchableOpacity
//                   style={[
//                     styles.modalButton,
//                     styles.modalCancel,
//                     { backgroundColor: colors.icon + "20" },
//                   ]}
//                   onPress={() => setShowIncomeModal(false)}
//                 >
//                   <Text
//                     style={[styles.modalButtonText, { color: colors.text }]}
//                   >
//                     {t.common.cancel}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.modalSave]}
//                   onPress={() => {
//                     handleSaveIncome();
//                     handleSaveExpenses();
//                   }}
//                 >
//                   <Text style={[styles.modalButtonText, { color: "white" }]}>
//                     {t.common.save}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </Modal>
//
//         {/* Modal pour gérer les crédits */}
//         <Modal
//           visible={showCreditModal}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setShowCreditModal(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View
//               style={[
//                 styles.modalContent,
//                 { backgroundColor: colors.background },
//               ]}
//             >
//               <View style={styles.modalHeader}>
//                 <Text style={[styles.modalTitle, { color: colors.text }]}>
//                   {t.home.manageCredits}
//                 </Text>
//                 <TouchableOpacity onPress={() => setShowCreditModal(false)}>
//                   <Ionicons name="close" size={24} color={colors.text} />
//                 </TouchableOpacity>
//               </View>
//
//               <ScrollView showsVerticalScrollIndicator={false}>
//                 {/* Ajouter un crédit */}
//                 <Text style={[styles.modalLabel, { color: colors.text }]}>
//                   {t.credits.newCredit}
//                 </Text>
//
//                 <TextInput
//                   style={[
//                     styles.modalInput,
//                     { color: colors.text, borderColor: colors.icon + "30" },
//                   ]}
//                   placeholder={t.credits.nameExample}
//                   value={newCredit.title}
//                   onChangeText={(text) =>
//                     setNewCredit({ ...newCredit, title: text })
//                   }
//                   placeholderTextColor={colors.textLight}
//                 />
//
//                 <TextInput
//                   style={[
//                     styles.modalInput,
//                     { color: colors.text, borderColor: colors.icon + "30" },
//                   ]}
//                   placeholder={t.credits.totalAmount}
//                   value={newCredit.totalAmount}
//                   onChangeText={(text) => {
//                     setNewCredit({ ...newCredit, totalAmount: text });
//                   }}
//                   keyboardType="numeric"
//                   placeholderTextColor={colors.textLight}
//                 />
//
//                 <TextInput
//                   style={[
//                     styles.modalInput,
//                     { color: colors.text, borderColor: colors.icon + "30" },
//                   ]}
//                   placeholder={t.credits.numberOfMonths}
//                   value={newCredit.remainingMonths}
//                   onChangeText={(text) => {
//                     setNewCredit({ ...newCredit, remainingMonths: text });
//                   }}
//                   keyboardType="numeric"
//                   placeholderTextColor={colors.textLight}
//                 />
//
//                 {/* Aperçu de la mensualité */}
//                 <Text
//                   style={[
//                     styles.monthlyPaymentPreview,
//                     { color: colors.primary },
//                   ]}
//                 >
//                   {t.credits.estimatedMonthly}:{" "}
//                   {(() => {
//                     const total = parseFloat(newCredit.totalAmount);
//                     const months = parseFloat(newCredit.remainingMonths);
//                     if (!isNaN(total) && !isNaN(months) && months > 0) {
//                       return formatCurrency(total / months);
//                     }
//                     return formatCurrency(0);
//                   })()}
//                 </Text>
//
//                 <TextInput
//                   style={[
//                     styles.modalInput,
//                     { color: colors.text, borderColor: colors.icon + "30" },
//                   ]}
//                   placeholder={t.credits.descriptionOptional}
//                   value={newCredit.description}
//                   onChangeText={(text) =>
//                     setNewCredit({ ...newCredit, description: text })
//                   }
//                   placeholderTextColor={colors.textLight}
//                 />
//
//                 <TouchableOpacity
//                   style={styles.saveButton}
//                   onPress={() => {
//                     const total = parseFloat(newCredit.totalAmount);
//                     const months = parseInt(newCredit.remainingMonths);
//
//                     if (!newCredit.title) {
//                       Alert.alert(t.common.error, t.credits.enterName);
//                       return;
//                     }
//                     if (isNaN(total) || total <= 0) {
//                       Alert.alert(t.common.error, t.credits.enterValidAmount);
//                       return;
//                     }
//                     if (isNaN(months) || months <= 0) {
//                       Alert.alert(t.common.error, t.credits.enterValidMonths);
//                       return;
//                     }
//
//                     addCredit({
//                       title: newCredit.title,
//                       totalAmount: total,
//                       remainingMonths: months,
//                       monthlyPayment: total / months,
//                       startDate: new Date().toISOString(),
//                       description: newCredit.description,
//                     });
//
//                     // Reset
//                     setNewCredit({
//                       title: "",
//                       totalAmount: "",
//                       remainingMonths: "12",
//                       monthlyPayment: "",
//                       description: "",
//                     });
//
//                     setShowCreditModal(false);
//                     Alert.alert(t.common.success, t.credits.creditAdded);
//                   }}
//                 >
//                   <Text style={{ color: "white", fontWeight: "600" }}>
//                     {t.credits.addCredit}
//                   </Text>
//                 </TouchableOpacity>
//
//                 {/* Liste des crédits existants */}
//                 <Text
//                   style={[
//                     styles.modalLabel,
//                     { color: colors.text, marginTop: 16 },
//                   ]}
//                 >
//                   {t.credits.myActiveCredits}
//                 </Text>
//
//                 {credits.length === 0 ? (
//                   <Text
//                     style={[
//                       styles.loadingText,
//                       {
//                         color: colors.textLight,
//                         textAlign: "center",
//                         padding: 20,
//                       },
//                     ]}
//                   >
//                     {t.credits.noCredits}
//                   </Text>
//                 ) : (
//                   credits.map((credit) => {
//                     const remaining = credit.totalAmount - credit.paidAmount;
//                     const progress =
//                       (credit.paidAmount / credit.totalAmount) * 100;
//                     return (
//                       <View key={credit.id} style={styles.creditItem}>
//                         <View style={styles.creditHeader}>
//                           <Text
//                             style={[styles.creditTitle, { color: colors.text }]}
//                           >
//                             {credit.title}
//                           </Text>
//                           <TouchableOpacity
//                             onPress={() => deleteCredit(credit.id)}
//                           >
//                             <Ionicons
//                               name="trash-outline"
//                               size={18}
//                               color={colors.danger}
//                             />
//                           </TouchableOpacity>
//                         </View>
//                         <Text
//                           style={[
//                             styles.creditDescription,
//                             { color: colors.textLight },
//                           ]}
//                         >
//                           {credit.description || t.credits.purchaseToAmortize}
//                         </Text>
//                         <View style={styles.creditProgressContainer}>
//                           <View style={styles.creditProgressBar}>
//                             <View
//                               style={[
//                                 styles.creditProgressFill,
//                                 {
//                                   width: `${progress}%`,
//                                   backgroundColor: colors.primary,
//                                 },
//                               ]}
//                             />
//                           </View>
//                           <Text
//                             style={[
//                               styles.creditProgressText,
//                               { color: colors.textLight },
//                             ]}
//                           >
//                             {progress.toFixed(0)}%
//                           </Text>
//                         </View>
//                         <View style={styles.creditDetails}>
//                           <Text
//                             style={[
//                               styles.creditAmount,
//                               { color: colors.text },
//                             ]}
//                           >
//                             {t.credits.remaining}: {formatCurrency(remaining)}
//                           </Text>
//                           <Text
//                             style={[
//                               styles.creditMonthly,
//                               { color: colors.primary },
//                             ]}
//                           >
//                             {formatCurrency(credit.monthlyPayment)}/mois
//                           </Text>
//                         </View>
//                       </View>
//                     );
//                   })
//                 )}
//               </ScrollView>
//             </View>
//           </View>
//         </Modal>
//
//         {/* Contributions aux projets */}
//         <IslandCard>
//           <Text style={[styles.cardTitle, { color: colors.text }]}>
//             {t.home.monthlyContributions}
//           </Text>
//
//           <View style={styles.row}>
//             <View style={styles.statItem}>
//               <Ionicons name="heart" size={20} color="#EC4899" />
//               <Text style={[styles.statLabel, { color: colors.text }]}>
//                 {t.home.dreams}
//               </Text>
//               <Text style={[styles.statValue, { color: colors.text }]}>
//                 {formatCurrency(stats.monthlyContributions.dreams)}
//               </Text>
//             </View>
//
//             <View style={styles.statItem}>
//               <Ionicons name="flag" size={20} color="#8B5CF6" />
//               <Text style={[styles.statLabel, { color: colors.text }]}>
//                 {t.home.goals}
//               </Text>
//               <Text style={[styles.statValue, { color: colors.text }]}>
//                 {formatCurrency(stats.monthlyContributions.goals)}
//               </Text>
//             </View>
//           </View>
//
//           <View
//             style={[styles.divider, { backgroundColor: colors.icon + "20" }]}
//           />
//
//           <View style={styles.totalContributions}>
//             <Text style={[styles.totalLabel, { color: colors.text }]}>
//               {t.home.totalSavedForProjects}
//             </Text>
//             <Text style={[styles.totalValue, { color: colors.primary }]}>
//               {formatCurrency(stats.monthlyContributions.total)}
//             </Text>
//           </View>
//         </IslandCard>
//
//         {/* Progression des projets */}
//         <IslandCard>
//           <Text style={[styles.cardTitle, { color: colors.text }]}>
//             {t.home.projectProgress}
//           </Text>
//
//           <TouchableOpacity
//             style={styles.projectRow}
//             onPress={() => router.push("./goalView.tsx?tab=dreams")}
//           >
//             <View style={styles.projectHeader}>
//               <Ionicons name="heart" size={20} color="#EC4899" />
//               <Text style={[styles.projectLabel, { color: colors.text }]}>
//                 {t.home.dreams}
//               </Text>
//               <Text style={[styles.projectAmount, { color: colors.text }]}>
//                 {formatCurrency(totalDreamsCurrent)}
//               </Text>
//             </View>
//             <View style={styles.progressBarContainer}>
//               <View
//                 style={[
//                   styles.progressBar,
//                   {
//                     width: `${stats.progress.dreams}%`,
//                     backgroundColor: "#EC4899",
//                   },
//                 ]}
//               />
//             </View>
//             <Text style={[styles.progressText, { color: colors.text }]}>
//               {stats.progress.dreams.toFixed(1)}%
//             </Text>
//           </TouchableOpacity>
//
//           <TouchableOpacity
//             style={styles.projectRow}
//             onPress={() => router.push("./goalView.tsx?tab=goals")}
//           >
//             <View style={styles.projectHeader}>
//               <Ionicons name="flag" size={20} color="#8B5CF6" />
//               <Text style={[styles.projectLabel, { color: colors.text }]}>
//                 {t.home.goals}
//               </Text>
//               <Text style={[styles.projectAmount, { color: colors.text }]}>
//                 {formatCurrency(totalGoalsCurrent)}
//               </Text>
//             </View>
//             <View style={styles.progressBarContainer}>
//               <View
//                 style={[
//                   styles.progressBar,
//                   {
//                     width: `${stats.progress.goals}%`,
//                     backgroundColor: "#8B5CF6",
//                   },
//                 ]}
//               />
//             </View>
//             <Text style={[styles.progressText, { color: colors.text }]}>
//               {stats.progress.goals.toFixed(1)}%
//             </Text>
//           </TouchableOpacity>
//
//           <View style={styles.overallProgress}>
//             <Text style={[styles.overallLabel, { color: colors.text }]}>
//               {t.home.overallProgress}
//             </Text>
//             <Text style={[styles.overallValue, { color: colors.primary }]}>
//               {stats.progress.overall.toFixed(1)}%
//             </Text>
//           </View>
//         </IslandCard>
//       </ScrollView>
//     </BackgroundImage>
//   );
// }
//
//
//







// app/(tabs)/index.tsx (ou app/index.tsx selon ta structure)
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { COLORS } from "../../src/constants/colors";
import { useCurrency } from "../../src/context/CurrencyContext";
import { useLanguage } from "../../src/context/LanguageContext";
import { useTheme } from "../../src/context/ThemeContext";
import { useDailyBudget } from "../../src/hooks/useDailyBudget";
import { useMonthlyStats } from "../../src/hooks/useMonthlyStats";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/context/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { colors, theme } = useTheme();
  const { t } = useLanguage();
  const { formatCurrency } = useCurrency();
  const { user } = useAuth();
  const [forceUpdate, setForceUpdate] = useState(0);

  // États pour les crédits (modal)
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [newCredit, setNewCredit] = useState({
    title: "",
    totalAmount: "",
    remainingMonths: "12",
    monthlyPayment: "",
    description: "",
  });

  // Totaux des rêves et objectifs (depuis Supabase)
  const [totalDreamsCurrent, setTotalDreamsCurrent] = useState(0);
  const [totalGoalsCurrent, setTotalGoalsCurrent] = useState(0);

  // Hooks Supabase
  const stats = useMonthlyStats();
  const {
    dailyBudget,
    remainingMonthlyBudget,
    remainingDays,
    credits,
    totalMonthlyCreditPayments,
    addCredit,
    deleteCredit,
    loading: budgetLoading,
  } = useDailyBudget();

  // Charger les totaux courants des rêves et objectifs
  const loadTotals = useCallback(async () => {
    if (!user) return;
    try {
      // Rêves
      const { data: dreams } = await supabase
        .from("dreams")
        .select("current_amount")
        .eq("user_id", user.id);
      const dreamsTotal = dreams?.reduce((sum, d) => sum + (d.current_amount || 0), 0) || 0;
      setTotalDreamsCurrent(dreamsTotal);

      // Objectifs
      const { data: goals } = await supabase
        .from("goals")
        .select("current_amount")
        .eq("user_id", user.id);
      const goalsTotal = goals?.reduce((sum, g) => sum + (g.current_amount || 0), 0) || 0;
      setTotalGoalsCurrent(goalsTotal);
    } catch (error) {
      console.error("Erreur chargement totaux:", error);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadTotals();
    }, [loadTotals])
  );

  // Mettre à jour forceUpdate quand le thème change
  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [theme]);

  if (stats.loading || budgetLoading) {
    return (
      <BackgroundImage opacity={0.6} blurRadius={2}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.text }]}>
            {t.common.loading}
          </Text>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage imageTheme="default" opacity={0.6} blurRadius={2}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontFamily: "FrenchScript",
              fontSize: 40,
              color: colors.text,
              textAlign: "center",
            }}
          >
            {t.home.monthlySummary}
          </Text>
        </View>

        {/* Carte des revenus/dépenses */}
        <IslandCard>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {t.home.monthlyFlow}
            </Text>
          </View>

          <View style={styles.row}>
            <View style={styles.statItem}>
              <Ionicons name="arrow-down" size={20} color={COLORS.income} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                {t.home.income}
              </Text>
              <Text style={[styles.statValue, { color: COLORS.income }]}>
                {formatCurrency(stats.totalIncome)}
              </Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                {t.home.expenses}
              </Text>
              <Text style={[styles.statValue, { color: COLORS.expense }]}>
                {formatCurrency(stats.totalExpenses)}
              </Text>
            </View>
          </View>

          <View style={[styles.divider, { backgroundColor: colors.icon + "20" }]} />

          <View style={styles.savingsContainer}>
            <Text style={[styles.savingsLabel, { color: colors.text }]}>
              {t.home.monthlySavings}
            </Text>
            <Text
              style={[
                styles.savingsValue,
                { color: stats.totalSavings >= 0 ? COLORS.success : COLORS.danger },
              ]}
            >
              {formatCurrency(stats.totalSavings)}
            </Text>
            <Text style={[styles.projectionText, { color: colors.text }]}>
              {t.home.annualProjection}: {formatCurrency(stats.projectedSavings)}
            </Text>
          </View>
        </IslandCard>

        {/* Carte du budget journalier */}
        <IslandCard>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              {t.home.dailyBudgetTitle}
            </Text>
          </View>

          <View style={styles.dailyBudgetContainer}>
            <Text style={[styles.dailyBudgetValue, { color: colors.primary }]}>
              {formatCurrency(dailyBudget)}
            </Text>
            <Text style={[styles.dailyBudgetLabel, { color: colors.textLight }]}>
              {t.home.perDay} ({remainingDays} {t.home.remainingDays})
            </Text>
          </View>

          <View style={styles.remainingBudgetContainer}>
            <Text style={[styles.remainingBudgetLabel, { color: colors.textLight }]}>
              {t.home.remainingBudget}
            </Text>
            <Text style={[styles.remainingBudgetValue, { color: colors.success }]}>
              {formatCurrency(remainingMonthlyBudget)}
            </Text>
          </View>

          {totalMonthlyCreditPayments > 0 && (
            <View style={styles.creditPaymentContainer}>
              <Text style={[styles.creditPaymentLabel, { color: colors.textLight }]}>
                {t.home.monthlyPayments}
              </Text>
              <Text style={[styles.creditPaymentValue, { color: colors.warning }]}>
                {formatCurrency(totalMonthlyCreditPayments)}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.creditButton}
            onPress={() => setShowCreditModal(true)}
          >
            <Ionicons name="card-outline" size={20} color={colors.primary} />
            <Text style={[styles.creditButtonText, { color: colors.primary }]}>
              {t.home.manageCredits}
            </Text>
          </TouchableOpacity>
        </IslandCard>

        {/* Modal des crédits */}
        <Modal
          visible={showCreditModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCreditModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  {t.home.manageCredits}
                </Text>
                <TouchableOpacity onPress={() => setShowCreditModal(false)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.modalLabel, { color: colors.text }]}>
                  {t.credits.newCredit}
                </Text>
                <TextInput
                  style={[styles.modalInput, { color: colors.text, borderColor: colors.icon + "30" }]}
                  placeholder={t.credits.nameExample}
                  value={newCredit.title}
                  onChangeText={(text) => setNewCredit({ ...newCredit, title: text })}
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[styles.modalInput, { color: colors.text, borderColor: colors.icon + "30" }]}
                  placeholder={t.credits.totalAmount}
                  value={newCredit.totalAmount}
                  onChangeText={(text) => setNewCredit({ ...newCredit, totalAmount: text })}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[styles.modalInput, { color: colors.text, borderColor: colors.icon + "30" }]}
                  placeholder={t.credits.numberOfMonths}
                  value={newCredit.remainingMonths}
                  onChangeText={(text) => setNewCredit({ ...newCredit, remainingMonths: text })}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <Text style={[styles.monthlyPaymentPreview, { color: colors.primary }]}>
                  {t.credits.estimatedMonthly}:{" "}
                  {(() => {
                    const total = parseFloat(newCredit.totalAmount);
                    const months = parseFloat(newCredit.remainingMonths);
                    if (!isNaN(total) && !isNaN(months) && months > 0)
                      return formatCurrency(total / months);
                    return formatCurrency(0);
                  })()}
                </Text>
                <TextInput
                  style={[styles.modalInput, { color: colors.text, borderColor: colors.icon + "30" }]}
                  placeholder={t.credits.descriptionOptional}
                  value={newCredit.description}
                  onChangeText={(text) => setNewCredit({ ...newCredit, description: text })}
                  placeholderTextColor={colors.textLight}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    const total = parseFloat(newCredit.totalAmount);
                    const months = parseInt(newCredit.remainingMonths);
                    if (!newCredit.title) {
                      Alert.alert(t.common.error, t.credits.enterName);
                      return;
                    }
                    if (isNaN(total) || total <= 0) {
                      Alert.alert(t.common.error, t.credits.enterValidAmount);
                      return;
                    }
                    if (isNaN(months) || months <= 0) {
                      Alert.alert(t.common.error, t.credits.enterValidMonths);
                      return;
                    }
                    addCredit({
                      title: newCredit.title,
                      totalAmount: total,
                      remainingMonths: months,
                      monthlyPayment: total / months,
                      startDate: new Date().toISOString(),
                      description: newCredit.description,
                    });
                    setNewCredit({
                      title: "",
                      totalAmount: "",
                      remainingMonths: "12",
                      monthlyPayment: "",
                      description: "",
                    });
                    setShowCreditModal(false);
                    Alert.alert(t.common.success, t.credits.creditAdded);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>{t.credits.addCredit}</Text>
                </TouchableOpacity>

                <Text style={[styles.modalLabel, { color: colors.text, marginTop: 16 }]}>
                  {t.credits.myActiveCredits}
                </Text>
                {credits.length === 0 ? (
                  <Text style={[styles.loadingText, { color: colors.textLight, textAlign: "center", padding: 20 }]}>
                    {t.credits.noCredits}
                  </Text>
                ) : (
                  credits.map((credit) => {
                    const remaining = credit.totalAmount - credit.paidAmount;
                    const progress = (credit.paidAmount / credit.totalAmount) * 100;
                    return (
                      <View key={credit.id} style={styles.creditItem}>
                        <View style={styles.creditHeader}>
                          <Text style={[styles.creditTitle, { color: colors.text }]}>{credit.title}</Text>
                          <TouchableOpacity onPress={() => deleteCredit(credit.id)}>
                            <Ionicons name="trash-outline" size={18} color={colors.danger} />
                          </TouchableOpacity>
                        </View>
                        <Text style={[styles.creditDescription, { color: colors.textLight }]}>
                          {credit.description || t.credits.purchaseToAmortize}
                        </Text>
                        <View style={styles.creditProgressContainer}>
                          <View style={styles.creditProgressBar}>
                            <View style={[styles.creditProgressFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
                          </View>
                          <Text style={[styles.creditProgressText, { color: colors.textLight }]}>{progress.toFixed(0)}%</Text>
                        </View>
                        <View style={styles.creditDetails}>
                          <Text style={[styles.creditAmount, { color: colors.text }]}>
                            {t.credits.remaining}: {formatCurrency(remaining)}
                          </Text>
                          <Text style={[styles.creditMonthly, { color: colors.primary }]}>
                            {formatCurrency(credit.monthlyPayment)}/mois
                          </Text>
                        </View>
                      </View>
                    );
                  })
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Contributions aux projets */}
        <IslandCard>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            {t.home.monthlyContributions}
          </Text>
          <View style={styles.row}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={[styles.statLabel, { color: colors.text }]}>{t.home.dreams}</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(stats.monthlyContributions.dreams)}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="flag" size={20} color="#8B5CF6" />
              <Text style={[styles.statLabel, { color: colors.text }]}>{t.home.goals}</Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(stats.monthlyContributions.goals)}
              </Text>
            </View>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.icon + "20" }]} />
          <View style={styles.totalContributions}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>{t.home.totalSavedForProjects}</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              {formatCurrency(stats.monthlyContributions.total)}
            </Text>
          </View>
        </IslandCard>

        {/* Progression des projets */}
        <IslandCard>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{t.home.projectProgress}</Text>

          <TouchableOpacity
            style={styles.projectRow}
            onPress={() => router.push("./goalView.tsx?tab=dreams")}
          >
            <View style={styles.projectHeader}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={[styles.projectLabel, { color: colors.text }]}>{t.home.dreams}</Text>
              <Text style={[styles.projectAmount, { color: colors.text }]}>
                {formatCurrency(totalDreamsCurrent)}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${stats.progress.dreams}%`, backgroundColor: "#EC4899" }]} />
            </View>
            <Text style={[styles.progressText, { color: colors.text }]}>{stats.progress.dreams.toFixed(1)}%</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.projectRow}
            onPress={() => router.push("./goalView.tsx?tab=goals")}
          >
            <View style={styles.projectHeader}>
              <Ionicons name="flag" size={20} color="#8B5CF6" />
              <Text style={[styles.projectLabel, { color: colors.text }]}>{t.home.goals}</Text>
              <Text style={[styles.projectAmount, { color: colors.text }]}>
                {formatCurrency(totalGoalsCurrent)}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${stats.progress.goals}%`, backgroundColor: "#8B5CF6" }]} />
            </View>
            <Text style={[styles.progressText, { color: colors.text }]}>{stats.progress.goals.toFixed(1)}%</Text>
          </TouchableOpacity>

          <View style={styles.overallProgress}>
            <Text style={[styles.overallLabel, { color: colors.text }]}>{t.home.overallProgress}</Text>
            <Text style={[styles.overallValue, { color: colors.primary }]}>{stats.progress.overall.toFixed(1)}%</Text>
          </View>
        </IslandCard>
      </ScrollView>
    </BackgroundImage>
  );
}

// Styles (tu peux garder tes styles existants, je ne les recopie pas ici pour la lisibilité)
// Assure-toi d'avoir toutes les définitions de styles qui étaient utilisées.
// Si besoin, reprends ton ancien objet styles en supprimant seulement les références aux composants supprimés.
// (Je ne les inclus pas pour ne pas surcharger, mais tu dois les garder)

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  savingsContainer: {
    alignItems: "center",
  },
  savingsLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  savingsValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  projectionText: {
    fontSize: 12,
  },
  totalContributions: {
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  totalLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  projectRow: {
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  projectLabel: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
  projectAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    textAlign: "right",
  },
  overallProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  overallLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  overallValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
  },
  modalCancel: {},
  modalSave: {
    backgroundColor: COLORS.primary,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  dailyBudgetContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  dailyBudgetValue: {
    fontSize: 48,
    fontWeight: "bold",
  },
  dailyBudgetLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  remainingBudgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  remainingBudgetLabel: {
    fontSize: 14,
  },
  remainingBudgetValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  creditPaymentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  creditPaymentLabel: {
    fontSize: 13,
  },
  creditPaymentValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  creditButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "rgba(99,102,241,0.1)",
  },
  creditButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  creditModalContainer: {
    maxHeight: "90%",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  creditItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  creditHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  creditTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  creditDescription: {
    fontSize: 12,
    marginBottom: 8,
  },
  creditProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  creditProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 3,
    marginRight: 8,
  },
  creditProgressFill: {
    height: 6,
    borderRadius: 3,
  },
  creditProgressText: {
    fontSize: 12,
  },
  creditDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  creditAmount: {
    fontSize: 14,
    fontWeight: "500",
  },
  creditMonthly: {
    fontSize: 14,
    fontWeight: "600",
  },
  monthlyPaymentPreview: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "right",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
});