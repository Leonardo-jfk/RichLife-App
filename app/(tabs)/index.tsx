// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import React, { useCallback, useState } from "react";
// import {
//   Alert,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import SummaryCard from "../../src/components/SummaryCard";
// import TransactionCard from "../../src/components/TransactionCard.js";
// import { COLORS } from "../../src/constants/colors";
// import {
//   calculateSavings,
//   calculateTotals,
//   filterTransactionsByMonth,
// } from "../../src/utils/calculations";
// import { formatMonth } from "../../src/utils/formatters";
// import { loadTransactions, saveTransactions } from "../../src/utils/storage";

// // En haut du fichier, après les imports
// interface Transaction {
//   id: string;
//   type: 'income' | 'expense';
//   amount: number;
//   description: string;
//   category: string;
//   date: string;
// }

// export default function HomeScreen() {
//   const router = useRouter();
//   const [transactions, setTransactions] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const loadData = async () => {
//     const data = await loadTransactions();
//     setTransactions(data);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   const handleDelete = (id: number) => {
//     Alert.alert("Supprimer", "Voulez-vous supprimer cette transaction ?", [
//       { text: "Annuler", style: "cancel" },
//       {
//         text: "Supprimer",
//         style: "destructive",
//         onPress: async () => {
//           const newTransactions = transactions.filter((t) => t.id !== id);
//           setTransactions(newTransactions);
//           await saveTransactions(newTransactions);
//         },
//       },
//     ]);
//   };

//   const monthlyTransactions = filterTransactionsByMonth(
//     transactions,
//     currentMonth,
//   );
//   const { totalIncome, totalExpenses } = calculateTotals(monthlyTransactions);
//   const savings = calculateSavings(totalIncome, totalExpenses);

//   const changeMonth = (increment: number) => {
//     const newDate = new Date(currentMonth);
//     newDate.setMonth(currentMonth.getMonth() + increment);
//     setCurrentMonth(newDate);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => changeMonth(-1)}>
//           <Ionicons name="chevron-back" size={24} color={COLORS.text} />
//         </TouchableOpacity>

//         <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>

//         <TouchableOpacity onPress={() => changeMonth(1)}>
//           <Ionicons name="chevron-forward" size={24} color={COLORS.text} />
//         </TouchableOpacity>
//       </View>

//       <SummaryCard
//         income={totalIncome}
//         expenses={totalExpenses}
//         savings={savings}
//       />

//       <View style={styles.transactionsHeader}>
//         <Text style={styles.transactionsTitle}>Transactions récentes</Text>
//         <TouchableOpacity onPress={() => router.push("/transactions")}>
//           <Text style={styles.seeAll}>Voir tout</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={monthlyTransactions.slice(0, 5)}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TransactionCard
//             transaction={item}
//             onDelete={() => handleDelete(item.id)}
//             onPress={() =>
//               router.push({
//                 pathname: "/transaction-details",
//                 params: { transaction: JSON.stringify(item) },
//               })
//             }
//           />
//         )}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons
//               name="receipt-outline"
//               size={60}
//               color={COLORS.textLight}
//             />
//             <Text style={styles.emptyText}>Aucune transaction ce mois-ci</Text>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => router.push("/add-transaction")}
//             >
//               <Text style={styles.addButtonText}>Ajouter une transaction</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />

//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-transaction")}
//       >
//         <Ionicons name="add" size={30} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 10,
//   },
//   monthText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   transactionsHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   transactionsTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   seeAll: {
//     fontSize: 14,
//     color: COLORS.primary,
//   },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 60,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: COLORS.textLight,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   addButton: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   fab: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: COLORS.primary,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 8,
//   },
// });

// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import React, { useCallback, useState } from "react";
// import {
//   Alert,
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import SummaryCard from "../../src/components/SummaryCard";
// import TransactionCard from "../../src/components/TransactionCard.js";
// import { COLORS } from "../../src/constants/colors";
// import {
//   calculateSavings,
//   calculateTotals,
//   filterTransactionsByMonth,
// } from "../../src/utils/calculations";
// import { formatMonth } from "../../src/utils/formatters";
// import { loadTransactions, saveTransactions } from "../../src/utils/storage";

// // Interface pour typer les transactions
// interface Transaction {
//   id: string;
//   type: "income" | "expense";
//   amount: number;
//   description: string;
//   category: string;
//   date: string;
// }

// export default function HomeScreen() {
//   const router = useRouter();
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [refreshing, setRefreshing] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const loadData = async () => {
//     const data = await loadTransactions();
//     setTransactions(data);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadData();
//     setRefreshing(false);
//   };

//   const handleDelete = (id: string) => {
//     Alert.alert("Supprimer", "Voulez-vous supprimer cette transaction ?", [
//       { text: "Annuler", style: "cancel" },
//       {
//         text: "Supprimer",
//         style: "destructive",
//         onPress: async () => {
//           const newTransactions = transactions.filter((t) => t.id !== id);
//           setTransactions(newTransactions);
//           await saveTransactions(newTransactions);
//         },
//       },
//     ]);
//   };

//   const monthlyTransactions = filterTransactionsByMonth(
//     transactions,
//     currentMonth,
//   );
//   const { totalIncome, totalExpenses } = calculateTotals(monthlyTransactions);
//   const savings = calculateSavings(totalIncome, totalExpenses);

//   const changeMonth = (increment: number) => {
//     const newDate = new Date(currentMonth);
//     newDate.setMonth(currentMonth.getMonth() + increment);
//     setCurrentMonth(newDate);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => changeMonth(-1)}>
//           <Ionicons name="chevron-back" size={24} color={COLORS.text} />
//         </TouchableOpacity>

//         <Text style={styles.monthText}>{formatMonth(currentMonth)}</Text>

//         <TouchableOpacity onPress={() => changeMonth(1)}>
//           <Ionicons name="chevron-forward" size={24} color={COLORS.text} />
//         </TouchableOpacity>
//       </View>

//       <SummaryCard
//         income={totalIncome}
//         expenses={totalExpenses}
//         savings={savings}
//       />

//       <View style={styles.transactionsHeader}>
//         <Text style={styles.transactionsTitle}>Transactions récentes</Text>
//         <TouchableOpacity onPress={() => router.push("/transactions")}>
//           <Text style={styles.seeAll}>Voir tout</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={monthlyTransactions.slice(0, 5)}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TransactionCard
//             transaction={item}
//             onDelete={() => handleDelete(item.id)}
//             onPress={() => {
//               // Option 1: Vers la page de détails (si vous avez créé le fichier)
//               router.push({
//                 pathname: "../app/transaction-details.js",
//                 params: { transaction: JSON.stringify(item) },
//               });

//               // Option 2: Si vous n'avez pas créé la page, utilisez:
//               // Alert.alert('Détails', `${item.description}: ${formatCurrency(item.amount)}`);
//             }}
//           />
//         )}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons
//               name="receipt-outline"
//               size={60}
//               color={COLORS.textLight}
//             />
//             <Text style={styles.emptyText}>Aucune transaction ce mois-ci</Text>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => router.push("/add-transaction")}
//             >
//               <Text style={styles.addButtonText}>Ajouter une transaction</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />

//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-transaction")}
//       >
//         <Ionicons name="add" size={30} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 60,
//     paddingBottom: 10,
//   },
//   monthText: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   transactionsHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   transactionsTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   seeAll: {
//     fontSize: 14,
//     color: COLORS.primary,
//   },
//   emptyContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 60,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: COLORS.textLight,
//     marginTop: 10,
//     marginBottom: 20,
//   },
//   addButton: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   fab: {
//     position: "absolute",
//     bottom: 20,
//     right: 20,
//     backgroundColor: COLORS.primary,
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 8,
//   },
// });
//ggg

// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   // ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Ionicons } from '@expo/vector-icons';
// import { ThemedView } from '@/components/themed-view';
// import { ThemedText } from '@/components/themed-text';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { COLORS } from '../../src/constants/colors';
// import { formatCurrency } from '../../src/utils/formatters';
// import { useMonthlyStats } from '../../src/hooks/useMonthlyStats';

// const DREAMS_STORAGE = '@finance_app_dreams';
// const GOALS_STORAGE = '@finance_app_goals';

// export default function HomeScreen() {
//   const router = useRouter();
//   const [dreams, setDreams] = useState<Dream[]>([]);  // ← Ajouter le type
//   const [goals, setGoals] = useState<Goal[]>([]);
//   const [monthlyIncome, setMonthlyIncome] = useState(2500); // À connecter avec vos données
//   const [monthlyExpenses, setMonthlyExpenses] = useState(1800); // À connecter avec vos données

//   const loadData = async () => {
//     try {
//       const [dreamsData, goalsData] = await Promise.all([
//         AsyncStorage.getItem(DREAMS_STORAGE),
//         AsyncStorage.getItem(GOALS_STORAGE),
//       ]);
//       setDreams(dreamsData ? JSON.parse(dreamsData) : []);
//       setGoals(goalsData ? JSON.parse(goalsData) : []);
//     } catch (error) {
//       console.error('Erreur chargement:', error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, [])
//   );

//   const stats = useMonthlyStats(dreams, goals, monthlyIncome, monthlyExpenses);

//   const totalDreamsCurrent = dreams.reduce((sum, d) => sum + d.currentAmount, 0);
//   const totalGoalsCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="chart.line.uptrend.xyaxis"
//           style={styles.headerImage}
//         />
//       }>

//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">📊 Résumé du Mois</ThemedText>
//       </ThemedView>

//       {/* Carte des revenus/dépenses */}
//       <ThemedView style={styles.card}>
//         <Text style={styles.cardTitle}>Flux mensuel</Text>

//         <View style={styles.row}>
//           <View style={styles.statItem}>
//             <Ionicons name="arrow-down" size={20} color={COLORS.income} />
//             <Text style={styles.statLabel}>Revenus</Text>
//             <Text style={[styles.statValue, { color: COLORS.income }]}>
//               {formatCurrency(monthlyIncome)}
//             </Text>
//           </View>

//           <View style={styles.statItem}>
//             <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
//             <Text style={styles.statLabel}>Dépenses</Text>
//             <Text style={[styles.statValue, { color: COLORS.expense }]}>
//               {formatCurrency(monthlyExpenses)}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.savingsContainer}>
//           <Text style={styles.savingsLabel}>Économies du mois</Text>
//           <Text style={[styles.savingsValue, { color: stats.totalSavings >= 0 ? COLORS.success : COLORS.danger }]}>
//             {formatCurrency(stats.totalSavings)}
//           </Text>
//           <Text style={styles.projectionText}>
//             Projection annuelle: {formatCurrency(stats.projectedSavings)}
//           </Text>
//         </View>
//       </ThemedView>

//       {/* Contributions aux projets */}
//       <ThemedView style={styles.card}>
//         <Text style={styles.cardTitle}>Contributions mensuelles</Text>

//         <View style={styles.row}>
//           <View style={styles.statItem}>
//             <Ionicons name="heart" size={20} color="#EC4899" />
//             <Text style={styles.statLabel}>Rêves</Text>
//             <Text style={styles.statValue}>
//               {formatCurrency(stats.monthlyContributions.dreams)}
//             </Text>
//           </View>

//           <View style={styles.statItem}>
//             <Ionicons name="flag" size={20} color="#8B5CF6" />
//             <Text style={styles.statLabel}>Objectifs</Text>
//             <Text style={styles.statValue}>
//               {formatCurrency(stats.monthlyContributions.goals)}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.totalContributions}>
//           <Text style={styles.totalLabel}>Total épargné pour les projets</Text>
//           <Text style={styles.totalValue}>
//             {formatCurrency(stats.monthlyContributions.total)}
//           </Text>
//         </View>
//       </ThemedView>

//       {/* Progression des projets */}
//       <ThemedView style={styles.card}>
//         <Text style={styles.cardTitle}>Progression des projets</Text>

//         <TouchableOpacity
//           style={styles.projectRow}
//           onPress={() => router.push('/(tabs)/explore?tab=dreams')}
//         >
//           <View style={styles.projectHeader}>
//             <Ionicons name="heart" size={20} color="#EC4899" />
//             <Text style={styles.projectLabel}>Rêves</Text>
//             <Text style={styles.projectAmount}>
//               {formatCurrency(totalDreamsCurrent)}
//             </Text>
//           </View>
//           <View style={styles.progressBarContainer}>
//             <View style={[styles.progressBar, { width: `${stats.progress.dreams}%`, backgroundColor: '#EC4899' }]} />
//           </View>
//           <Text style={styles.progressText}>{stats.progress.dreams.toFixed(1)}%</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.projectRow}
//           onPress={() => router.push('/(tabs)/explore?tab=goals')}
//         >
//           <View style={styles.projectHeader}>
//             <Ionicons name="flag" size={20} color="#8B5CF6" />
//             <Text style={styles.projectLabel}>Objectifs</Text>
//             <Text style={styles.projectAmount}>
//               {formatCurrency(totalGoalsCurrent)}
//             </Text>
//           </View>
//           <View style={styles.progressBarContainer}>
//             <View style={[styles.progressBar, { width: `${stats.progress.goals}%`, backgroundColor: '#8B5CF6' }]} />
//           </View>
//           <Text style={styles.progressText}>{stats.progress.goals.toFixed(1)}%</Text>
//         </TouchableOpacity>

//         <View style={styles.overallProgress}>
//           <Text style={styles.overallLabel}>Progrès global</Text>
//           <Text style={styles.overallValue}>{stats.progress.overall.toFixed(1)}%</Text>
//         </View>
//       </ThemedView>

//       {/* Boutons rapides */}
//       <View style={styles.quickActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => router.push('/(tabs)/explore?tab=dreams&action=add')}
//         >
//           <Ionicons name="add-circle" size={24} color={COLORS.primary} />
//           <Text style={styles.actionText}>Nouveau rêve</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => router.push('/(tabs)/explore?tab=goals&action=add')}
//         >
//           <Ionicons name="add-circle" size={24} color={COLORS.primary} />
//           <Text style={styles.actionText}>Nouvel objectif</Text>
//         </TouchableOpacity>
//       </View>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 16,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 16,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 16,
//     color: COLORS.text,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 16,
//   },
//   statItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: COLORS.textLight,
//     marginTop: 4,
//     marginBottom: 2,
//   },
//   statValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: COLORS.text,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: 'rgba(0,0,0,0.1)',
//     marginVertical: 12,
//   },
//   savingsContainer: {
//     alignItems: 'center',
//   },
//   savingsLabel: {
//     fontSize: 14,
//     color: COLORS.textLight,
//     marginBottom: 4,
//   },
//   savingsValue: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   projectionText: {
//     fontSize: 12,
//     color: COLORS.textLight,
//   },
//   totalContributions: {
//     alignItems: 'center',
//     marginTop: 12,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(0,0,0,0.1)',
//   },
//   totalLabel: {
//     fontSize: 13,
//     color: COLORS.textLight,
//     marginBottom: 4,
//   },
//   totalValue: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//   },
//   projectRow: {
//     marginBottom: 16,
//   },
//   projectHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   projectLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: COLORS.text,
//     marginLeft: 8,
//   },
//   projectAmount: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: COLORS.text,
//   },
//   progressBarContainer: {
//     height: 8,
//     backgroundColor: 'rgba(0,0,0,0.1)',
//     borderRadius: 4,
//     marginBottom: 4,
//   },
//   progressBar: {
//     height: 8,
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 11,
//     color: COLORS.textLight,
//     textAlign: 'right',
//   },
//   overallProgress: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 8,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(0,0,0,0.1)',
//   },
//   overallLabel: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: COLORS.text,
//   },
//   overallValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.primary,
//   },
//   quickActions: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 8,
//     marginBottom: 20,
//   },
//   actionButton: {
//     alignItems: 'center',
//     padding: 12,
//   },
//   actionText: {
//     fontSize: 12,
//     color: COLORS.primary,
//     marginTop: 4,
//   },
// });

// import ParallaxScrollView from "@/components/parallax-scroll-view";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { IconSymbol } from "@/components/ui/icon-symbol";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import React, { useCallback, useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { COLORS } from "../../src/constants/colors";
// import { useMonthlyStats } from "../../src/hooks/useMonthlyStats";
// import { Dream, Goal, STORAGE_KEYS } from "../../src/types/finance-types";
// import { formatCurrency } from "../../src/utils/formatters";

// export default function HomeScreen() {
//   const router = useRouter();
//   const [dreams, setDreams] = useState<Dream[]>([]);
//   const [goals, setGoals] = useState<Goal[]>([]);
//   // const [monthlyIncome, setMonthlyIncome] = useState(2500);
//   // const [monthlyExpenses, setMonthlyExpenses] = useState(1800);
//   const [monthlyIncome] = useState(2500); // Enlever setMonthlyIncome
//   const [monthlyExpenses] = useState(1800);

//   const loadData = async () => {
//     try {
//       const [dreamsData, goalsData] = await Promise.all([
//         AsyncStorage.getItem(STORAGE_KEYS.DREAMS),
//         AsyncStorage.getItem(STORAGE_KEYS.GOALS),
//       ]);
//       setDreams(dreamsData ? JSON.parse(dreamsData) : []);
//       setGoals(goalsData ? JSON.parse(goalsData) : []);
//     } catch (error) {
//       console.error("Erreur chargement:", error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const stats = useMonthlyStats(dreams, goals, monthlyIncome, monthlyExpenses);

//   const totalDreamsCurrent = dreams.reduce(
//     (sum, d) => sum + (d.currentAmount || 0),
//     0,
//   );
//   const totalGoalsCurrent = goals.reduce(
//     (sum, g) => sum + (g.currentAmount || 0),
//     0,
//   );

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="chart.line.uptrend.xyaxis"
//           style={styles.headerImage}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">📊 Résumé du Mois</ThemedText>
//       </ThemedView>

//       {/* Carte des revenus/dépenses */}
//       <ThemedView style={styles.card}>
//         <Text style={styles.cardTitle}>Flux mensuel</Text>

//         <View style={styles.row}>
//           <View style={styles.statItem}>
//             <Ionicons name="arrow-down" size={20} color={COLORS.income} />
//             <Text style={styles.statLabel}>Revenus</Text>
//             <Text style={[styles.statValue, { color: COLORS.income }]}>
//               {formatCurrency(monthlyIncome)}
//             </Text>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => router.push("/add-transaction")}
//             >
//               <Text style={styles.addButtonText}>Ajouter une transaction</Text>
//              </TouchableOpacity>
//           </View>

//           <View style={styles.statItem}>
//             <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
//             <Text style={styles.statLabel}>Dépenses</Text>
//             <Text style={[styles.statValue, { color: COLORS.expense }]}>
//               {formatCurrency(monthlyExpenses)}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.savingsContainer}>
//           <Text style={styles.savingsLabel}>Économies du mois</Text>
//           <Text
//             style={[
//               styles.savingsValue,
//               {
//                 color: stats.totalSavings >= 0 ? COLORS.success : COLORS.danger,
//               },
//             ]}
//           >
//             {formatCurrency(stats.totalSavings)}
//           </Text>
//           <Text style={styles.projectionText}>
//             Projection annuelle: {formatCurrency(stats.projectedSavings)}
//           </Text>
//         </View>
//       </ThemedView>

//       {/* Contributions aux projets */}
//       <ThemedView style={styles.card}>
//         <Text style={styles.cardTitle}>Contributions mensuelles</Text>

//         <View style={styles.row}>
//           <View style={styles.statItem}>
//             <Ionicons name="heart" size={20} color="#EC4899" />
//             <Text style={styles.statLabel}>Rêves</Text>
//             <Text style={styles.statValue}>
//               {formatCurrency(stats.monthlyContributions.dreams)}
//             </Text>
//           </View>

//           <View style={styles.statItem}>
//             <Ionicons name="flag" size={20} color="#8B5CF6" />
//             <Text style={styles.statLabel}>Objectifs</Text>
//             <Text style={styles.statValue}>
//               {formatCurrency(stats.monthlyContributions.goals)}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.totalContributions}>
//           <Text style={styles.totalLabel}>Total épargné pour les projets</Text>
//           <Text style={styles.totalValue}>
//             {formatCurrency(stats.monthlyContributions.total)}
//           </Text>
//         </View>
//       </ThemedView>

//       {/* Progression des projets */}
//       <ThemedView style={styles.card}>
//         <Text style={styles.cardTitle}>Progression des projets</Text>

//         <TouchableOpacity
//           style={styles.projectRow}
//           onPress={() => router.push("/(tabs)/explore?tab=dreams")}
//         >
//           <View style={styles.projectHeader}>
//             <Ionicons name="heart" size={20} color="#EC4899" />
//             <Text style={styles.projectLabel}>Rêves</Text>
//             <Text style={styles.projectAmount}>
//               {formatCurrency(totalDreamsCurrent)}
//             </Text>
//           </View>
//           <View style={styles.progressBarContainer}>
//             <View
//               style={[
//                 styles.progressBar,
//                 {
//                   width: `${stats.progress.dreams}%`,
//                   backgroundColor: "#EC4899",
//                 },
//               ]}
//             />
//           </View>
//           <Text style={styles.progressText}>
//             {stats.progress.dreams.toFixed(1)}%
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.projectRow}
//           onPress={() => router.push("/(tabs)/explore?tab=goals")}
//         >
//           <View style={styles.projectHeader}>
//             <Ionicons name="flag" size={20} color="#8B5CF6" />
//             <Text style={styles.projectLabel}>Objectifs</Text>
//             <Text style={styles.projectAmount}>
//               {formatCurrency(totalGoalsCurrent)}
//             </Text>
//           </View>
//           <View style={styles.progressBarContainer}>
//             <View
//               style={[
//                 styles.progressBar,
//                 {
//                   width: `${stats.progress.goals}%`,
//                   backgroundColor: "#8B5CF6",
//                 },
//               ]}
//             />
//           </View>
//           <Text style={styles.progressText}>
//             {stats.progress.goals.toFixed(1)}%
//           </Text>
//         </TouchableOpacity>

//         <View style={styles.overallProgress}>
//           <Text style={styles.overallLabel}>Progrès global</Text>
//           <Text style={styles.overallValue}>
//             {stats.progress.overall.toFixed(1)}%
//           </Text>
//         </View>
//       </ThemedView>

//       {/* Boutons rapides */}
//       <View style={styles.quickActions}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => router.push("/(tabs)/explore?tab=dreams")}
//         >
//           <Ionicons name="add-circle" size={24} color={COLORS.primary} />
//           <Text style={styles.actionText}>Nouveau rêve</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => router.push("/(tabs)/explore?tab=goals")}
//         >
//           <Ionicons name="add-circle" size={24} color={COLORS.primary} />
//           <Text style={styles.actionText}>Nouvel objectif</Text>
//         </TouchableOpacity>
//       </View>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: "#808080",
//     bottom: -90,
//     left: -35,
//     position: "absolute",
//   },
//   titleContainer: {
//     flexDirection: "row",
//     gap: 8,
//     marginBottom: 16,
//   },
//   card: {
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 16,
//     backgroundColor: "rgba(255,255,255,0.05)",
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 16,
//     color: COLORS.text,
//   },
//   row: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   statItem: {
//     alignItems: "center",
//     flex: 1,
//   },
//   statLabel: {
//     fontSize: 12,
//     color: COLORS.textLight,
//     marginTop: 4,
//     marginBottom: 2,
//   },
//   statValue: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "rgba(0,0,0,0.1)",
//     marginVertical: 12,
//   },
//   addButton: {
//     backgroundColor: COLORS.primary,
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 8,
//   },
//   addButtonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   savingsContainer: {
//     alignItems: "center",
//   },
//   savingsLabel: {
//     fontSize: 14,
//     color: COLORS.textLight,
//     marginBottom: 4,
//   },
//   savingsValue: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   projectionText: {
//     fontSize: 12,
//     color: COLORS.textLight,
//   },
//   totalContributions: {
//     alignItems: "center",
//     marginTop: 12,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(0,0,0,0.1)",
//   },
//   totalLabel: {
//     fontSize: 13,
//     color: COLORS.textLight,
//     marginBottom: 4,
//   },
//   totalValue: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: COLORS.primary,
//   },
//   projectRow: {
//     marginBottom: 16,
//   },
//   projectHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   projectLabel: {
//     flex: 1,
//     fontSize: 14,
//     color: COLORS.text,
//     marginLeft: 8,
//   },
//   projectAmount: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   progressBarContainer: {
//     height: 8,
//     backgroundColor: "rgba(0,0,0,0.1)",
//     borderRadius: 4,
//     marginBottom: 4,
//   },
//   progressBar: {
//     height: 8,
//     borderRadius: 4,
//   },
//   progressText: {
//     fontSize: 11,
//     color: COLORS.textLight,
//     textAlign: "right",
//   },
//   overallProgress: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 8,
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(0,0,0,0.1)",
//   },
//   overallLabel: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: COLORS.text,
//   },
//   overallValue: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: COLORS.primary,
//   },
//   quickActions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 8,
//     marginBottom: 20,
//   },
//   actionButton: {
//     alignItems: "center",
//     padding: 12,
//   },
//   actionText: {
//     fontSize: 12,
//     color: COLORS.primary,
//     marginTop: 4,
//   },
// });

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import { COLORS } from "../../src/constants/colors";
import { useMonthlyStats } from "../../src/hooks/useMonthlyStats";
import { Dream, Goal, STORAGE_KEYS } from "../../src/types/finance-types";
import { formatCurrency } from "../../src/utils/formatters";
// import SummaryCard from "../../src/components/SummaryCard";

// Types

export default function HomeScreen() {
  const router = useRouter();

  // États pour les rêves et objectifs
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  // États pour les transactions
  // const [refreshing, setRefreshing] = useState(false);

  // États pour les revenus/dépenses
  const [monthlyIncome, setMonthlyIncome] = useState(2500);
  const [monthlyExpenses, setMonthlyExpenses] = useState(1800);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [tempIncome, setTempIncome] = useState("2500");
  const [tempExpenses, setTempExpenses] = useState("1800");

  // Charger toutes les données
  const loadAllData = async () => {
    try {
      // Charger rêves et objectifs
      const [dreamsData, goalsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.DREAMS),
        AsyncStorage.getItem(STORAGE_KEYS.GOALS),
      ]);
      setDreams(dreamsData ? JSON.parse(dreamsData) : []);
      setGoals(goalsData ? JSON.parse(goalsData) : []);

      // Charger transactions
    } catch (error) {
      console.error("Erreur chargement:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAllData();
    }, []),
  );

  // Stats mensuelles des rêves/objectifs
  const stats = useMonthlyStats(dreams, goals, monthlyIncome, monthlyExpenses);

  // Totaux combinés
  const totalDreamsCurrent = dreams.reduce(
    (sum, d) => sum + (d.currentAmount || 0),
    0,
  );
  const totalGoalsCurrent = goals.reduce(
    (sum, g) => sum + (g.currentAmount || 0),
    0,
  );

  // Fonctions pour modifier les revenus/dépenses
  const handleSaveIncome = () => {
    const value = parseFloat(tempIncome);
    if (!isNaN(value) && value >= 0) {
      setMonthlyIncome(value);
    }
    setShowIncomeModal(false);
  };

  const handleSaveExpenses = () => {
    const value = parseFloat(tempExpenses);
    if (!isNaN(value) && value >= 0) {
      setMonthlyExpenses(value);
    }
    setShowIncomeModal(false);
  };

  return (
    <BackgroundImage opacity={0.3} blurRadius={2}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chart.line.uptrend.xyaxis"
            style={styles.headerImage}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">📊 Résumé du Mois</ThemedText>
        </ThemedView>

        {/* Carte des revenus/dépenses avec bouton d'édition */}
        <ThemedView style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Flux mensuel</Text>
            <TouchableOpacity onPress={() => setShowIncomeModal(true)}>
              <Ionicons name="pencil" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => setShowIncomeModal(true)}
            >
              <Ionicons name="arrow-down" size={20} color={COLORS.income} />
              <Text style={styles.statLabel}>Revenus</Text>
              <Text style={[styles.statValue, { color: COLORS.income }]}>
                {formatCurrency(monthlyIncome)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statItem}
              onPress={() => setShowIncomeModal(true)}
            >
              <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
              <Text style={styles.statLabel}>Dépenses</Text>
              <Text style={[styles.statValue, { color: COLORS.expense }]}>
                {formatCurrency(monthlyExpenses)}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.savingsContainer}>
            <Text style={styles.savingsLabel}>Économies du mois</Text>
            <Text
              style={[
                styles.savingsValue,
                {
                  color:
                    stats.totalSavings >= 0 ? COLORS.success : COLORS.danger,
                },
              ]}
            >
              {formatCurrency(stats.totalSavings)}
            </Text>
            <Text style={styles.projectionText}>
              Projection annuelle: {formatCurrency(stats.projectedSavings)}
            </Text>
          </View>
        </ThemedView>

        {/* Modal pour modifier les revenus/dépenses */}
        <Modal
          visible={showIncomeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowIncomeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContent}>
              <Text style={styles.modalTitle}>Modifier les montants</Text>

              <Text style={styles.modalLabel}>Revenus mensuels</Text>
              <TextInput
                style={styles.modalInput}
                value={tempIncome}
                onChangeText={setTempIncome}
                keyboardType="numeric"
                placeholder="Montant"
                placeholderTextColor={COLORS.textLight}
              />

              <Text style={styles.modalLabel}>Dépenses mensuelles</Text>
              <TextInput
                style={styles.modalInput}
                value={tempExpenses}
                onChangeText={setTempExpenses}
                keyboardType="numeric"
                placeholder="Montant"
                placeholderTextColor={COLORS.textLight}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancel]}
                  onPress={() => setShowIncomeModal(false)}
                >
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalSave]}
                  onPress={() => {
                    handleSaveIncome();
                    handleSaveExpenses();
                  }}
                >
                  <Text style={[styles.modalButtonText, { color: "white" }]}>
                    Enregistrer
                  </Text>
                </TouchableOpacity>
              </View>
            </ThemedView>
          </View>
        </Modal>

        {/* Contributions aux projets */}
        <ThemedView style={styles.card}>
          <Text style={styles.cardTitle}>Contributions mensuelles</Text>

          <View style={styles.row}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={styles.statLabel}>Rêves</Text>
              <Text style={styles.statValue}>
                {formatCurrency(stats.monthlyContributions.dreams)}
              </Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="flag" size={20} color="#8B5CF6" />
              <Text style={styles.statLabel}>Objectifs</Text>
              <Text style={styles.statValue}>
                {formatCurrency(stats.monthlyContributions.goals)}
              </Text>
            </View>
          </View>

          <View style={styles.totalContributions}>
            <Text style={styles.totalLabel}>
              Total épargné pour les projets
            </Text>
            <Text style={styles.totalValue}>
              {formatCurrency(stats.monthlyContributions.total)}
            </Text>
          </View>
        </ThemedView>

        {/* Progression des projets */}
        <ThemedView style={styles.card}>
          <Text style={styles.cardTitle}>Progression des projets</Text>

          <TouchableOpacity
            style={styles.projectRow}
            onPress={() => router.push("/(tabs)/explore?tab=dreams")}
          >
            <View style={styles.projectHeader}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={styles.projectLabel}>Rêves</Text>
              <Text style={styles.projectAmount}>
                {formatCurrency(totalDreamsCurrent)}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${stats.progress.dreams}%`,
                    backgroundColor: "#EC4899",
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {stats.progress.dreams.toFixed(1)}%
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.projectRow}
            onPress={() => router.push("/(tabs)/explore?tab=goals")}
          >
            <View style={styles.projectHeader}>
              <Ionicons name="flag" size={20} color="#8B5CF6" />
              <Text style={styles.projectLabel}>Objectifs</Text>
              <Text style={styles.projectAmount}>
                {formatCurrency(totalGoalsCurrent)}
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${stats.progress.goals}%`,
                    backgroundColor: "#8B5CF6",
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {stats.progress.goals.toFixed(1)}%
            </Text>
          </TouchableOpacity>

          <View style={styles.overallProgress}>
            <Text style={styles.overallLabel}>Progrès global</Text>
            <Text style={styles.overallValue}>
              {stats.progress.overall.toFixed(1)}%
            </Text>
          </View>
        </ThemedView>
      </ParallaxScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
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
    color: COLORS.text,
  },
  seeAll: {
    fontSize: 14,
    color: COLORS.primary,
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
    color: COLORS.textLight,
    marginTop: 4,
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginVertical: 12,
  },
  savingsContainer: {
    alignItems: "center",
  },
  savingsLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  savingsValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  projectionText: {
    fontSize: 12,
    color: COLORS.textLight,
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
    color: COLORS.textLight,
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
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
    color: COLORS.text,
    marginLeft: 8,
  },
  projectAmount: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
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
    color: COLORS.textLight,
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
    color: COLORS.text,
  },
  overallValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: "center",
    padding: 12,
  },
  actionText: {
    fontSize: 12,
    color: COLORS.primary,
    marginTop: 4,
  },
  // Styles pour le modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 16,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.text,
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
  modalCancel: {
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  modalSave: {
    backgroundColor: COLORS.primary,
  },
  modalButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  // Styles pour les transactions
  monthNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  monthText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.text,
  },
  transactionSummary: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 8,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyTransactions: {
    textAlign: "center",
    color: COLORS.textLight,
    padding: 20,
  },
  addTransactionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    padding: 12,
    backgroundColor: "rgba(99,102,241,0.1)",
    borderRadius: 8,
  },
  addTransactionText: {
    fontSize: 14,
    color: COLORS.primary,
    marginLeft: 8,
  },
});
