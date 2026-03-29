// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { CATEGORIES } from "../constants/categories";
// import { COLORS } from "../constants/colors";
// import { loadTransactions, saveTransactions } from "../utils/storage";

// const AddTransactionScreen = ({ navigation }) => {
//   const [type, setType] = useState("expense");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState(null);
//   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

//   const handleSave = async () => {
//     if (!amount || !description || !category) {
//       Alert.alert("Erreur", "Veuillez remplir tous les champs");
//       return;
//     }

//     const numAmount = parseFloat(amount);
//     if (isNaN(numAmount) || numAmount <= 0) {
//       Alert.alert("Erreur", "Montant invalide");
//       return;
//     }

//     const transactions = await loadTransactions();

//     const newTransaction = {
//       id: Date.now().toString(),
//       type,
//       amount: numAmount,
//       description,
//       category: category.id,
//       date: new Date().toISOString(),
//     };

//     await saveTransactions([newTransaction, ...transactions]);
//     navigation.goBack();
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {/* Type selector */}
//         <View style={styles.typeContainer}>
//           <TouchableOpacity
//             style={[
//               styles.typeButton,
//               type === "income" && styles.typeButtonActive,
//               { borderColor: COLORS.income },
//             ]}
//             onPress={() => setType("income")}
//           >
//             <Ionicons
//               name="arrow-down"
//               size={24}
//               color={type === "income" ? COLORS.income : COLORS.textLight}
//             />
//             <Text
//               style={[
//                 styles.typeText,
//                 { color: type === "income" ? COLORS.income : COLORS.textLight },
//               ]}
//             >
//               Revenu
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               styles.typeButton,
//               type === "expense" && styles.typeButtonActive,
//               { borderColor: COLORS.expense },
//             ]}
//             onPress={() => setType("expense")}
//           >
//             <Ionicons
//               name="arrow-up"
//               size={24}
//               color={type === "expense" ? COLORS.expense : COLORS.textLight}
//             />
//             <Text
//               style={[
//                 styles.typeText,
//                 {
//                   color: type === "expense" ? COLORS.expense : COLORS.textLight,
//                 },
//               ]}
//             >
//               Dépense
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Montant */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Montant (€)</Text>
//           <TextInput
//             style={styles.input}
//             value={amount}
//             onChangeText={setAmount}
//             keyboardType="numeric"
//             placeholder="0.00"
//             placeholderTextColor={COLORS.textLight}
//           />
//         </View>

//         {/* Description */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Description</Text>
//           <TextInput
//             style={styles.input}
//             value={description}
//             onChangeText={setDescription}
//             placeholder="Ex: Courses, Salaire..."
//             placeholderTextColor={COLORS.textLight}
//           />
//         </View>

//         {/* Catégories */}
//         <View style={styles.inputContainer}>
//           <Text style={styles.label}>Catégorie</Text>
//           <View style={styles.categoriesGrid}>
//             {CATEGORIES.filter((c) =>
//               type === "income" ? c.id === "salary" : c.id !== "salary",
//             ).map((cat) => (
//               <TouchableOpacity
//                 key={cat.id}
//                 style={[
//                   styles.categoryItem,
//                   { backgroundColor: cat.color + "20" },
//                   category?.id === cat.id && styles.categoryItemActive,
//                 ]}
//                 onPress={() => setCategory(cat)}
//               >
//                 <Ionicons name={cat.icon} size={24} color={cat.color} />
//                 <Text style={[styles.categoryText, { color: cat.color }]}>
//                   {cat.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Bouton sauvegarder */}
//         <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//           <Text style={styles.saveButtonText}>Ajouter</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//     padding: 20,
//   },
//   typeContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   typeButton: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 16,
//     borderRadius: 12,
//     borderWidth: 2,
//     marginHorizontal: 4,
//     backgroundColor: COLORS.surface,
//   },
//   typeButtonActive: {
//     backgroundColor: COLORS.surface,
//     borderWidth: 2,
//   },
//   typeText: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginLeft: 8,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: COLORS.text,
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: COLORS.surface,
//     padding: 16,
//     borderRadius: 12,
//     fontSize: 16,
//     color: COLORS.text,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   categoriesGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 8,
//   },
//   categoryItem: {
//     width: "48%",
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 12,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   categoryItemActive: {
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//   },
//   categoryText: {
//     fontSize: 14,
//     fontWeight: "500",
//     marginLeft: 8,
//   },
//   saveButton: {
//     backgroundColor: COLORS.primary,
//     padding: 18,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   saveButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default AddTransactionScreen;
