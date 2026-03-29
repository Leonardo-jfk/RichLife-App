// // À créer : app/transactions.js
// import { Ionicons } from "@expo/vector-icons";
// import { useFocusEffect } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import { useCallback, useState } from "react";
// import {
//   Alert,
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import TransactionCard from "../src/components/TransactionCard.js";
// import { COLORS } from "../src/constants/colors";
// import { formatCurrency } from "../src/utils/formatters.js";
// import { loadTransactions, saveTransactions } from "../src/utils/storage";

// export default function TransactionsScreen() {
//   const router = useRouter();
//   const [transactions, setTransactions] = useState([]);

//   useFocusEffect(
//     useCallback(() => {
//       loadData();
//     }, []),
//   );

//   const loadData = async () => {
//     const data = await loadTransactions();
//     setTransactions(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
//   };

//   const handleDelete = (id) => {
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

//   const getTotal = () => {
//     const total = transactions.reduce((acc, t) => {
//       return t.type === "income" ? acc + t.amount : acc - t.amount;
//     }, 0);
//     return formatCurrency(total);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.totalContainer}>
//         <Text style={styles.totalLabel}>Solde total</Text>
//         <Text
//           style={[
//             styles.totalAmount,
//             {
//               color:
//                 parseFloat(getTotal()) >= 0 ? COLORS.income : COLORS.expense,
//             },
//           ]}
//         >
//           {getTotal()}
//         </Text>
//       </View>

//       <FlatList
//         data={transactions}
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
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons
//               name="receipt-outline"
//               size={60}
//               color={COLORS.textLight}
//             />
//             <Text style={styles.emptyText}>Aucune transaction</Text>
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={() => router.push("/add-transaction")}
//             >
//               <Text style={styles.addButtonText}>Ajouter une transaction</Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
//   totalContainer: {
//     backgroundColor: COLORS.surface,
//     padding: 20,
//     margin: 16,
//     borderRadius: 12,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   totalLabel: {
//     fontSize: 14,
//     color: COLORS.textLight,
//     marginBottom: 8,
//   },
//   totalAmount: {
//     fontSize: 32,
//     fontWeight: "bold",
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
// });
// export default TransactionsScreen;
