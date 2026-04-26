// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import { useCallback, useState } from "react";
// import {
//   Alert,
//   FlatList,
//   SectionList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import TransactionCard from "../../src/components/TransactionCard";
// import { COLORS } from "../../src/constants/colors";
// import { useCurrency } from "../../src/context/CurrencyContext"; // ← AJOUTER
// import {
//   calculateTotals,
//   filterTransactionsByMonth,
// } from "../../src/utils/calculations";
// import { loadTransactions, saveTransactions } from "../../src/utils/storage";
//
// // Interface pour les transactions
// interface Transaction {
//   id: string;
//   type: "income" | "expense";
//   amount: number;
//   description: string;
//   category: string;
//   date: string;
// }
//
// // Interface pour les sections
// interface Section {
//   title: string;
//   data: Transaction[];
// }
//
// export default function TransactionsScreen() {
//   const router = useRouter();
//   const { formatCurrency } = useCurrency(); // ← AJOUTER
//
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [viewMode, setViewMode] = useState<"month" | "all">("month"); // 'month' ou 'all'
//
//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );
//
//   const loadData = async () => {
//     const data = await loadTransactions();
//     // Trier par date (plus récent d'abord)
//     setTransactions(
//       data.sort(
//         (a: any, b: any) =>
//           new Date(b.date).getTime() - new Date(a.date).getTime(),
//       ),
//     );
//   };
//
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
//
//   const getTotal = () => {
//     const total = transactions.reduce((acc, t) => {
//       return t.type === "income" ? acc + t.amount : acc - t.amount;
//     }, 0);
//     return formatCurrency(total);
//   };
//
//   // Filtrer les transactions du mois
//   const monthlyTransactions = filterTransactionsByMonth(
//     transactions,
//     currentMonth,
//   );
//   const { totalIncome, totalExpenses } = calculateTotals(monthlyTransactions);
//   const monthlyTotal = totalIncome - totalExpenses;
//
//   const changeMonth = (increment: number) => {
//     const newDate = new Date(currentMonth);
//     newDate.setMonth(currentMonth.getMonth() + increment);
//     setCurrentMonth(newDate);
//   };
//
//   const formatMonthYear = (date: Date) => {
//     return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
//   };
//
//   // Organiser les transactions en sections par mois pour la vue "all"
//   const getSections = (): Section[] => {
//     const sections: { [key: string]: Transaction[] } = {};
//
//     transactions.forEach((transaction) => {
//       const date = new Date(transaction.date);
//       const monthYear = date.toLocaleDateString("fr-FR", {
//         month: "long",
//         year: "numeric",
//       });
//
//       if (!sections[monthYear]) {
//         sections[monthYear] = [];
//       }
//       sections[monthYear].push(transaction);
//     });
//
//     return Object.keys(sections)
//       .sort((a, b) => {
//         // Trier les mois par ordre chronologique inverse
//         const dateA = new Date(sections[a][0].date);
//         const dateB = new Date(sections[b][0].date);
//         return dateB.getTime() - dateA.getTime();
//       })
//       .map((title) => ({
//         title,
//         data: sections[title],
//       }));
//   };
//
//   const sections = getSections();
//
//   return (
//     <View style={styles.container}>
//       {/* Header avec titre et bouton retour */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Transactions</Text>
//         <TouchableOpacity
//           onPress={() => setViewMode(viewMode === "month" ? "all" : "month")}
//         >
//           <Text style={styles.viewModeText}>
//             {viewMode === "month" ? "Voir tout mois" : "Voir mois"}
//           </Text>
//         </TouchableOpacity>
//       </View>
//
//       {/* Vue Mois */}
//       {viewMode === "month" ? (
//         <>
//           {/* Navigation mois */}
//           <View style={styles.monthNavigator}>
//             <TouchableOpacity onPress={() => changeMonth(-1)}>
//               <Ionicons name="chevron-back" size={24} color={COLORS.text} />
//             </TouchableOpacity>
//             <Text style={styles.monthText}>
//               {formatMonthYear(currentMonth)}
//             </Text>
//             <TouchableOpacity onPress={() => changeMonth(1)}>
//               <Ionicons name="chevron-forward" size={24} color={COLORS.text} />
//             </TouchableOpacity>
//           </View>
//
//           {/* Résumé du mois */}
//           <View style={styles.monthSummary}>
//             <View style={styles.summaryRow}>
//               <View style={styles.summaryItem}>
//                 <Text style={styles.summaryLabel}>Revenus</Text>
//                 <Text style={[styles.summaryValue, { color: COLORS.income }]}>
//                   {formatCurrency(totalIncome)}
//                 </Text>
//               </View>
//               <View style={styles.summaryItem}>
//                 <Text style={styles.summaryLabel}>Dépenses</Text>
//                 <Text style={[styles.summaryValue, { color: COLORS.expense }]}>
//                   {formatCurrency(totalExpenses)}
//                 </Text>
//               </View>
//             </View>
//             <View style={styles.totalRow}>
//               <Text style={styles.totalLabel}>Solde du mois</Text>
//               <Text
//                 style={[
//                   styles.totalValue,
//                   { color: monthlyTotal >= 0 ? COLORS.income : COLORS.expense },
//                 ]}
//               >
//                 {formatCurrency(monthlyTotal)}
//               </Text>
//             </View>
//           </View>
//
//           {/* Liste des transactions du mois */}
//           <FlatList
//             data={monthlyTransactions}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TransactionCard
//                 transaction={item}
//                 onDelete={() => handleDelete(item.id)}
//                 onPress={() =>
//                   router.push({
//                     pathname: "/transaction-details",
//                     params: { transaction: JSON.stringify(item) },
//                   })
//                 }
//               />
//             )}
//             contentContainerStyle={styles.listContent}
//             ListEmptyComponent={
//               <View style={styles.emptyContainer}>
//                 <Ionicons
//                   name="receipt-outline"
//                   size={60}
//                   color={COLORS.textLight}
//                 />
//                 <Text style={styles.emptyText}>
//                   Aucune transaction ce mois-ci
//                 </Text>
//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={() => router.push("/add-transaction")}
//                 >
//                   <Text style={styles.addButtonText}>
//                     Ajouter une transaction
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             }
//           />
//         </>
//       ) : (
//         <>
//           {/* Solde total (vue toutes transactions) */}
//           <View style={styles.totalContainer}>
//             <Text style={styles.totalLabel}>Solde total</Text>
//             <Text
//               style={[
//                 styles.totalAmount,
//                 {
//                   color:
//                     transactions.reduce(
//                       (acc, t) =>
//                         t.type === "income" ? acc + t.amount : acc - t.amount,
//                       0,
//                     ) >= 0
//                       ? COLORS.income
//                       : COLORS.expense,
//                 },
//               ]}
//             >
//               {getTotal()}
//             </Text>
//           </View>
//
//           {/* Liste de toutes les transactions par mois */}
//           <SectionList
//             sections={sections}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <TransactionCard
//                 transaction={item}
//                 onDelete={() => handleDelete(item.id)}
//                 onPress={() =>
//                   router.push({
//                     pathname: "/transaction-details",
//                     params: { transaction: JSON.stringify(item) },
//                   })
//                 }
//               />
//             )}
//             renderSectionHeader={({ section: { title } }) => (
//               <View style={styles.sectionHeader}>
//                 <Text style={styles.sectionHeaderText}>{title}</Text>
//               </View>
//             )}
//             contentContainerStyle={styles.listContent}
//             ListEmptyComponent={
//               <View style={styles.emptyContainer}>
//                 <Ionicons
//                   name="receipt-outline"
//                   size={60}
//                   color={COLORS.textLight}
//                 />
//                 <Text style={styles.emptyText}>Aucune transaction</Text>
//                 <TouchableOpacity
//                   style={styles.addButton}
//                   onPress={() => router.push("/add-transaction")}
//                 >
//                   <Text style={styles.addButtonText}>
//                     Ajouter une transaction
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             }
//           />
//         </>
//       )}
//
//       {/* Bouton flottant pour ajouter */}
//       <TouchableOpacity
//         style={styles.fab}
//         onPress={() => router.push("/add-transaction")}
//       >
//         <Ionicons name="add" size={30} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingTop: 60,
//     paddingBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: COLORS.text,
//   },
//   viewModeText: {
//     fontSize: 14,
//     color: COLORS.primary,
//     fontWeight: "500",
//   },
//   monthNavigator: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: COLORS.surface,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 8,
//   },
//   monthText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   monthSummary: {
//     backgroundColor: COLORS.surface,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 12,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   summaryRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//   },
//   summaryItem: {
//     alignItems: "center",
//   },
//   summaryLabel: {
//     fontSize: 12,
//     color: COLORS.textLight,
//     marginBottom: 4,
//   },
//   summaryValue: {
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   totalRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingTop: 12,
//     borderTopWidth: 1,
//     borderTopColor: "rgba(0,0,0,0.1)",
//   },
//   totalLabel: {
//     fontSize: 14,
//     color: COLORS.textLight,
//   },
//   totalValue: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   totalContainer: {
//     backgroundColor: COLORS.surface,
//     padding: 20,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   totalAmount: {
//     fontSize: 32,
//     fontWeight: "bold",
//   },
//   sectionHeader: {
//     backgroundColor: COLORS.background,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     marginTop: 8,
//   },
//   sectionHeaderText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: COLORS.textLight,
//     textTransform: "uppercase",
//   },
//   listContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 80,
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



import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TransactionCard from "../../src/components/TransactionCard";
import { COLORS } from "../../src/constants/colors";
import { useCurrency } from "../../src/context/CurrencyContext";
import { useLanguage } from "../../src/context/LanguageContext";
import { useTheme } from "../../src/context/ThemeContext";
import {
  calculateTotals,
  filterTransactionsByMonth,
} from "../../src/utils/calculations";
import { loadTransactions, saveTransactions } from "../../src/utils/storage";

// Interface pour les transactions
interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
}

// Interface pour les sections
interface Section {
  title: string;
  data: Transaction[];
}

export default function TransactionsScreen() {
  const router = useRouter();
  const { formatCurrency } = useCurrency();
  const { t } = useLanguage();
  const { colors, theme } = useTheme();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "all">("month");

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const loadData = async () => {
    const data = await loadTransactions();
    setTransactions(
      data.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert(t.common.delete, t.transactions.deleteConfirm, [
      { text: t.common.cancel, style: "cancel" },
      {
        text: t.common.delete,
        style: "destructive",
        onPress: async () => {
          const newTransactions = transactions.filter((t) => t.id !== id);
          setTransactions(newTransactions);
          await saveTransactions(newTransactions);
        },
      },
    ]);
  };

  const getTotal = () => {
    const total = transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.amount : acc - t.amount;
    }, 0);
    return formatCurrency(total);
  };

  const monthlyTransactions = filterTransactionsByMonth(
    transactions,
    currentMonth,
  );
  const { totalIncome, totalExpenses } = calculateTotals(monthlyTransactions);
  const monthlyTotal = totalIncome - totalExpenses;

  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newDate);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  };

  const getSections = (): Section[] => {
    const sections: { [key: string]: Transaction[] } = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthYear = date.toLocaleDateString("fr-FR", {
        month: "long",
        year: "numeric",
      });

      if (!sections[monthYear]) {
        sections[monthYear] = [];
      }
      sections[monthYear].push(transaction);
    });

    return Object.keys(sections)
      .sort((a, b) => {
        const dateA = new Date(sections[a][0].date);
        const dateB = new Date(sections[b][0].date);
        return dateB.getTime() - dateA.getTime();
      })
      .map((title) => ({
        title,
        data: sections[title],
      }));
  };

  const sections = getSections();
const buttonTextColor = theme === "dark" ? "#000000" : "#FFFFFF";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textLight }]}>
          {t.transactions.title}
        </Text>
        <TouchableOpacity
          onPress={() => setViewMode(viewMode === "month" ? "all" : "month")}
        >
          <Text style={[styles.viewModeText, { color: colors.primary }]}>
            {viewMode === "month" ? t.transactions.viewAllMonths : t.transactions.viewMonth}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vue Mois */}
      {viewMode === "month" ? (
        <>
          {/* Navigation mois */}
          <View style={[styles.monthNavigator, { backgroundColor: colors.background }]}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Ionicons name="chevron-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <Text style={[styles.monthText, { color: colors.text }]}>
              {formatMonthYear(currentMonth)}
            </Text>
            <TouchableOpacity onPress={() => changeMonth(1)}>
              <Ionicons name="chevron-forward" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Résumé du mois */}
          <View style={[styles.monthSummary, { backgroundColor: colors.background }]}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: colors.textLight }]}>
                  {t.transactions.income}
                </Text>
                <Text style={[styles.summaryValue, { color: COLORS.income }]}>
                  {formatCurrency(totalIncome)}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryLabel, { color: colors.textLight }]}>
                  {t.transactions.expenses}
                </Text>
                <Text style={[styles.summaryValue, { color: COLORS.expense }]}>
                  {formatCurrency(totalExpenses)}
                </Text>
              </View>
            </View>
            <View style={styles.totalRow}>
              <Text style={[styles.totalLabel, { color: colors.text }]}>
                {t.transactions.monthlyBalance}
              </Text>
              <Text
                style={[
                  styles.totalValue,
                  { color: monthlyTotal >= 0 ? COLORS.income : COLORS.expense },
                ]}
              >
                {formatCurrency(monthlyTotal)}
              </Text>
            </View>
          </View>

          {/* Liste des transactions du mois */}
          <FlatList
            data={monthlyTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionCard
                transaction={item}
                onDelete={() => handleDelete(item.id)}
                onPress={() =>
                  router.push({
                    pathname: "/transaction-details",
                    params: { transaction: JSON.stringify(item) },
                  })
                }
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="receipt-outline"
                  size={60}
                  color={colors.textLight}
                />
                <Text style={[styles.emptyText, { color: colors.textLight }]}>
                  {t.transactions.noTransactionsThisMonth}
                </Text>
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: colors.primary }]}
                  onPress={() => router.push("/add-transaction")}
                >
                  <Text style={[styles.addButtonText, { color: buttonTextColor }]}>
                    {t.transactions.addTransaction}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      ) : (
        <>
          {/* Solde total (vue toutes transactions) */}
          <View style={[styles.totalContainer, { backgroundColor: colors.background }]}>
            <Text style={[styles.addButtonText, { color: buttonTextColor }]}>
              {t.transactions.totalBalance}
            </Text>
            <Text
              style={[
                styles.totalAmount,
                {
                  color:
                    transactions.reduce(
                      (acc, t) =>
                        t.type === "income" ? acc + t.amount : acc - t.amount,
                      0,
                    ) >= 0
                      ? COLORS.income
                      : COLORS.expense,
                },
              ]}
            >
              {getTotal()}
            </Text>
          </View>

          {/* Liste de toutes les transactions par mois */}
          <SectionList
            sections={sections}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionCard
                transaction={item}
                onDelete={() => handleDelete(item.id)}
                onPress={() =>
                  router.push({
                    pathname: "/transaction-details",
                    params: { transaction: JSON.stringify(item) },
                  })
                }
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={[styles.sectionHeader, { backgroundColor: colors.background }]}>
                <Text style={[styles.sectionHeaderText, { color: colors.textLight }]}>
                  {title}
                </Text>
              </View>
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name="receipt-outline"
                  size={60}
                  color={colors.textLight}
                />
                <Text style={[styles.addButtonText, { color: buttonTextColor }]}>
                  {t.transactions.noTransactions}
                </Text>
                <TouchableOpacity
                  style={[styles.addButton, { backgroundColor: colors.primary }]}
                  onPress={() => router.push("/add-transaction")}
                >
                  {/*<Text style={styles.addButtonText}>*/}
                      <Text style={[styles.addButtonText, { color: buttonTextColor }]}>

                    {t.transactions.addTransaction}
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        </>
      )}

      {/* Bouton flottant pour ajouter */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push("/add-transaction")}
      >
        <Ionicons name="add" size={30} color={buttonTextColor } />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  monthNavigator: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "600",
  },
  monthSummary: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  totalLabel: {
    fontSize: 14,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  totalContainer: {
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  addButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    // color: theme == "dark":  "white" ?? "black",
    fontSize: 14,
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});