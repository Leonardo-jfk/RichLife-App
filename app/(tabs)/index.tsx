// // import ParallaxScrollView from "@/components/parallax-scroll-view";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// // import { IconSymbol } from "@/components/ui/icon-symbol";
// import { Ionicons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useFocusEffect } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import React, { useCallback, useState } from "react";
// import {
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
// import { useAppTheme } from "../../src/hooks/useAppTheme";
// import { useMonthlyStats } from "../../src/hooks/useMonthlyStats";
// import { Dream, Goal, STORAGE_KEYS } from "../../src/types/finance-types";
// import { formatCurrency } from "../../src/utils/formatters";

// // Types

// export default function HomeScreen() {
//   const router = useRouter();

//   // États pour les rêves et objectifs
//   const [dreams, setDreams] = useState<Dream[]>([]);
//   const [goals, setGoals] = useState<Goal[]>([]);

//   // États pour les transactions
//   // const [refreshing, setRefreshing] = useState(false);

//   // États pour les revenus/dépenses
//   const [monthlyIncome, setMonthlyIncome] = useState(2500);
//   const [monthlyExpenses, setMonthlyExpenses] = useState(1800);
//   const [showIncomeModal, setShowIncomeModal] = useState(false);
//   const [tempIncome, setTempIncome] = useState("2500");
//   const [tempExpenses, setTempExpenses] = useState("1800");

//   // Charger toutes les données
//   const loadAllData = async () => {
//     try {
//       // Charger rêves et objectifs
//       const [dreamsData, goalsData] = await Promise.all([
//         AsyncStorage.getItem(STORAGE_KEYS.DREAMS),
//         AsyncStorage.getItem(STORAGE_KEYS.GOALS),
//       ]);
//       setDreams(dreamsData ? JSON.parse(dreamsData) : []);
//       setGoals(goalsData ? JSON.parse(goalsData) : []);

//       // Charger transactions
//     } catch (error) {
//       console.error("Erreur chargement:", error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadAllData();
//     }, []),
//   );

//   // Stats mensuelles des rêves/objectifs
//   const stats = useMonthlyStats(dreams, goals, monthlyIncome, monthlyExpenses);

//   // Totaux combinés
//   const totalDreamsCurrent = dreams.reduce(
//     (sum, d) => sum + (d.currentAmount || 0),
//     0,
//   );
//   const totalGoalsCurrent = goals.reduce(
//     (sum, g) => sum + (g.currentAmount || 0),
//     0,
//   );

//   // Fonctions pour modifier les revenus/dépenses
//   const handleSaveIncome = () => {
//     const value = parseFloat(tempIncome);
//     if (!isNaN(value) && value >= 0) {
//       setMonthlyIncome(value);
//     }
//     setShowIncomeModal(false);
//   };

//   const handleSaveExpenses = () => {
//     const value = parseFloat(tempExpenses);
//     if (!isNaN(value) && value >= 0) {
//       setMonthlyExpenses(value);
//     }
//     setShowIncomeModal(false);
//   };

//    const { theme, colors, isLoading, toggleTheme } = useAppTheme();

//   //  const handleToggleTheme = () => {
//   //   toggleTheme();
//   //   setForceUpdate((prev) => prev + 1); // Force le re-rendu
//   // };
// const [forceUpdate, setForceUpdate] = useState(0);

//   return (
//     <BackgroundImage
//     key={`bg-loading-${forceUpdate}`}
//      opacity={0.6}
//       blurRadius={2}>
//       <ScrollView style={styles.scrollView}>
//         <ThemedView style={styles.titleContainer}>
//           <ThemedText type="title">📊 Résumé du Mois</ThemedText>
//         </ThemedView>

//         {/* Carte des revenus/dépenses avec bouton d'édition */}
//         {/* <ThemedView style={styles.card}> */}
//         <IslandCard key={`preferences-${forceUpdate}`}>
//           <View style={styles.cardHeader}>
//             <Text style={[styles.cardTitle, { color: colors.text }]}>
//               Flux mensuel
//             </Text>
//             <TouchableOpacity onPress={() => setShowIncomeModal(true)}>
//               <Ionicons name="pencil" size={20} color={COLORS.textLight} />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.row}>
//             <TouchableOpacity
//               style={styles.statItem}
//               onPress={() => setShowIncomeModal(true)}
//             >
//               <Ionicons name="arrow-down" size={20} color={COLORS.income} />

//               <Text style={styles.statLabel}>Revenus</Text>
//               <Text style={[styles.statValue, { color: COLORS.income }]}>
//                 {formatCurrency(monthlyIncome)}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.statItem}
//               onPress={() => setShowIncomeModal(true)}
//             >
//               <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
//               <Text style={styles.statLabel}>Dépenses</Text>
//               <Text style={[styles.statValue, { color: COLORS.expense }]}>
//                 {formatCurrency(monthlyExpenses)}
//               </Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.savingsContainer}>
//             <Text style={styles.savingsLabel}>Économies du mois</Text>
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
//             <Text style={styles.projectionText}>
//               Projection annuelle: {formatCurrency(stats.projectedSavings)}
//             </Text>
//           </View>
//         </IslandCard>

//         {/* Modal pour modifier les revenus/dépenses */}
//         <Modal
//           visible={showIncomeModal}
//           transparent
//           animationType="slide"
//           onRequestClose={() => setShowIncomeModal(false)}
//         >
//           <IslandCard key={`preferences-${forceUpdate}`}>
//             <View style={styles.modalOverlay}>
//               <Text style={styles.modalTitle}>Modifier les montants</Text>

//               <Text style={styles.modalLabel}>Revenus mensuels</Text>
//               <TextInput
//                 style={styles.modalInput}
//                 value={tempIncome}
//                 onChangeText={setTempIncome}
//                 keyboardType="numeric"
//                 placeholder="Montant"
//                 placeholderTextColor={COLORS.textLight}
//               />

//               <Text style={styles.modalLabel}>Dépenses mensuelles</Text>
//               <TextInput
//                 style={styles.modalInput}
//                 value={tempExpenses}
//                 onChangeText={setTempExpenses}
//                 keyboardType="numeric"
//                 placeholder="Montant"
//                 placeholderTextColor={COLORS.textLight}
//               />

//               <View style={styles.modalButtons}>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.modalCancel]}
//                   onPress={() => setShowIncomeModal(false)}
//                 >
//                   <Text style={styles.modalButtonText}>Annuler</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={[styles.modalButton, styles.modalSave]}
//                   onPress={() => {
//                     handleSaveIncome();
//                     handleSaveExpenses();
//                   }}
//                 >
//                   <Text style={[styles.modalButtonText, { color: "white" }]}>
//                     Enregistrer
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </IslandCard>
//         </Modal>

//         {/* Contributions aux projets */}
//         <IslandCard>
//           <Text style={styles.cardTitle}>Contributions mensuelles</Text>

//           <View style={styles.row}>
//             <View style={styles.statItem}>
//               <Ionicons name="heart" size={20} color="#EC4899" />
//               <Text style={styles.statLabel}>Rêves</Text>
//               <Text style={styles.statValue}>
//                 {formatCurrency(stats.monthlyContributions.dreams)}
//               </Text>
//             </View>

//             <View style={styles.statItem}>
//               <Ionicons name="flag" size={20} color="#8B5CF6" />
//               <Text style={styles.statLabel}>Objectifs</Text>
//               <Text style={styles.statValue}>
//                 {formatCurrency(stats.monthlyContributions.goals)}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.totalContributions}>
//             <Text style={styles.totalLabel}>
//               Total épargné pour les projets
//             </Text>
//             <Text style={styles.totalValue}>
//               {formatCurrency(stats.monthlyContributions.total)}
//             </Text>
//           </View>
//         </IslandCard>

//         {/* Progression des projets */}
//         <IslandCard>
//           <Text style={styles.cardTitle}>Progression des projets</Text>

//           <TouchableOpacity
//             style={styles.projectRow}
//             onPress={() => router.push("/(tabs)/goalView?tab=dreams")}
//           >
//             <View style={styles.projectHeader}>
//               <Ionicons name="heart" size={20} color="#EC4899" />
//               <Text style={styles.projectLabel}>Rêves</Text>
//               <Text style={styles.projectAmount}>
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
//             <Text style={styles.progressText}>
//               {stats.progress.dreams.toFixed(1)}%
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.projectRow}
//             onPress={() => router.push("/(tabs)/goalView?tab=goals")}
//           >
//             <View style={styles.projectHeader}>
//               <Ionicons name="flag" size={20} color="#8B5CF6" />
//               <Text style={styles.projectLabel}>Objectifs</Text>
//               <Text style={styles.projectAmount}>
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
//             <Text style={styles.progressText}>
//               {stats.progress.goals.toFixed(1)}%
//             </Text>
//           </TouchableOpacity>

//           <View style={styles.overallProgress}>
//             <Text style={styles.overallLabel}>Progrès global</Text>
//             <Text style={styles.overallValue}>
//               {stats.progress.overall.toFixed(1)}%
//             </Text>
//           </View>
//         </IslandCard>
//       </ScrollView>
//     </BackgroundImage>
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
//     backgroundColor: "rgba(255,255,255,0.01)",
//     // backgroundColor: "rgba(255,255,255,0.05)",
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: COLORS.text,
//   },
//   seeAll: {
//     fontSize: 14,
//     color: COLORS.primary,
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
//   // Styles pour le modal
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalContent: {
//     width: "80%",
//     padding: 20,
//     borderRadius: 12,
//     // backgroundColor: COLORS.surface,
//     backgroundColor: "rgba(255,255,255,0.9)",
//   },
//   totalContainer: {
//     // backgroundColor: COLORS.surface,  // ← À MODIFIER
//     backgroundColor: "transparent",
//     // ...
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: COLORS.text,
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   modalLabel: {
//     fontSize: 14,
//     color: COLORS.textLight,
//     marginBottom: 4,
//   },
//   modalInput: {
//     backgroundColor: "rgba(0,0,0,0.05)",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 16,
//     fontSize: 16,
//     color: COLORS.text,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   modalButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginHorizontal: 4,
//   },
//   modalCancel: {
//     backgroundColor: "rgba(0,0,0,0.05)",
//   },
//   modalSave: {
//     backgroundColor: COLORS.primary,
//   },
//   modalButtonText: {
//     fontSize: 14,
//     fontWeight: "500",
//   },
//   // Styles pour les transactions
//   monthNavigator: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   monthText: {
//     fontSize: 14,
//     fontWeight: "500",
//     color: COLORS.text,
//   },
//   transactionSummary: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginBottom: 16,
//     padding: 12,
//     backgroundColor: "rgba(0,0,0,0.02)",
//     borderRadius: 8,
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
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   emptyTransactions: {
//     textAlign: "center",
//     color: COLORS.textLight,
//     padding: 20,
//   },
//   addTransactionButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 12,
//     padding: 12,
//     backgroundColor: "rgba(99,102,241,0.1)",
//     borderRadius: 8,
//   },
//   addTransactionText: {
//     fontSize: 14,
//     color: COLORS.primary,
//     marginLeft: 8,
//   },
//   scrollView: {
//     flex: 1,
//   },
// });

// import ParallaxScrollView from "@/components/parallax-scroll-view";
// import { ThemedText } from "@/components/themed-text";
// import { ThemedView } from "@/components/themed-view";
// import { IconSymbol } from "@/components/ui/icon-symbol";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
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
import { useTheme } from "../../src/context/ThemeContext";
import { useMonthlyStats } from "../../src/hooks/useMonthlyStats";
import { Dream, Goal, STORAGE_KEYS } from "../../src/types/finance-types";
import { formatCurrency } from "../../src/utils/formatters";

// Types

export default function HomeScreen() {
  const router = useRouter();
  const { colors, isLoading, theme } = useTheme(); // ← Plus de toggleTheme ici
  const [forceUpdate, setForceUpdate] = useState(0);

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

  // Mettre à jour forceUpdate quand le thème change
  React.useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [theme]);

  if (isLoading) {
    return (
      <BackgroundImage
        key={`bg-loading-${forceUpdate}`}
        opacity={0.6}
        blurRadius={2}
      >
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Chargement...
          </Text>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage opacity={0.6} blurRadius={2}>
      <ScrollView style={styles.scrollView}>
        {/* Header sans bouton de thème */}
        <View
          style={[
            styles.titleContainer,
            { backgroundColor: colors.background },
          ]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            Résumé du Mois
          </Text>
        </View>

        {/* Carte des revenus/dépenses avec bouton d'édition */}
        <IslandCard>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Flux mensuel
            </Text>
            <TouchableOpacity onPress={() => setShowIncomeModal(true)}>
              <Ionicons name="pencil" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => setShowIncomeModal(true)}
            >
              <Ionicons name="arrow-down" size={20} color={COLORS.income} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Revenus
              </Text>
              <Text style={[styles.statValue, { color: COLORS.income }]}>
                {formatCurrency(monthlyIncome)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statItem}
              onPress={() => setShowIncomeModal(true)}
            >
              <Ionicons name="arrow-up" size={20} color={COLORS.expense} />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Dépenses
              </Text>
              <Text style={[styles.statValue, { color: COLORS.expense }]}>
                {formatCurrency(monthlyExpenses)}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.icon + "20" }]}
          />

          <View style={styles.savingsContainer}>
            <Text style={[styles.savingsLabel, { color: colors.text }]}>
              Économies du mois
            </Text>
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
            <Text style={[styles.projectionText, { color: colors.text }]}>
              Projection annuelle: {formatCurrency(stats.projectedSavings)}
            </Text>
          </View>
        </IslandCard>

        {/* Modal pour modifier les revenus/dépenses */}
        <Modal
          visible={showIncomeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowIncomeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <IslandCard>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Modifier les montants
              </Text>

              <Text style={[styles.modalLabel, { color: colors.text }]}>
                Revenus mensuels
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { color: colors.text, borderColor: colors.icon + "30" },
                ]}
                value={tempIncome}
                onChangeText={setTempIncome}
                keyboardType="numeric"
                placeholder="Montant"
                placeholderTextColor={colors.text}
              />

              <Text style={[styles.modalLabel, { color: colors.text }]}>
                Dépenses mensuelles
              </Text>
              <TextInput
                style={[
                  styles.modalInput,
                  { color: colors.text, borderColor: colors.icon + "30" },
                ]}
                value={tempExpenses}
                onChangeText={setTempExpenses}
                keyboardType="numeric"
                placeholder="Montant"
                placeholderTextColor={colors.text}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.modalCancel,
                    { backgroundColor: colors.icon + "20" },
                  ]}
                  onPress={() => setShowIncomeModal(false)}
                >
                  <Text
                    style={[styles.modalButtonText, { color: colors.text }]}
                  >
                    Annuler
                  </Text>
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
            </IslandCard>
          </View>
        </Modal>

        {/* Contributions aux projets */}
        <IslandCard>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Contributions mensuelles
          </Text>

          <View style={styles.row}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Rêves
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(stats.monthlyContributions.dreams)}
              </Text>
            </View>

            <View style={styles.statItem}>
              <Ionicons name="flag" size={20} color="#8B5CF6" />
              <Text style={[styles.statLabel, { color: colors.text }]}>
                Objectifs
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(stats.monthlyContributions.goals)}
              </Text>
            </View>
          </View>

          <View
            style={[styles.divider, { backgroundColor: colors.icon + "20" }]}
          />

          <View style={styles.totalContributions}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>
              Total épargné pour les projets
            </Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>
              {formatCurrency(stats.monthlyContributions.total)}
            </Text>
          </View>
        </IslandCard>

        {/* Progression des projets */}
        <IslandCard>
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Progression des projets
          </Text>

          <TouchableOpacity
            style={styles.projectRow}
            onPress={() => router.push("/(tabs)/goalView?tab=dreams")}
          >
            <View style={styles.projectHeader}>
              <Ionicons name="heart" size={20} color="#EC4899" />
              <Text style={[styles.projectLabel, { color: colors.text }]}>
                Rêves
              </Text>
              <Text style={[styles.projectAmount, { color: colors.text }]}>
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
            <Text style={[styles.progressText, { color: colors.text }]}>
              {stats.progress.dreams.toFixed(1)}%
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.projectRow}
            onPress={() => router.push("/(tabs)/goalView?tab=goals")}
          >
            <View style={styles.projectHeader}>
              <Ionicons name="flag" size={20} color="#8B5CF6" />
              <Text style={[styles.projectLabel, { color: colors.text }]}>
                Objectifs
              </Text>
              <Text style={[styles.projectAmount, { color: colors.text }]}>
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
            <Text style={[styles.progressText, { color: colors.text }]}>
              {stats.progress.goals.toFixed(1)}%
            </Text>
          </TouchableOpacity>

          <View style={styles.overallProgress}>
            <Text style={[styles.overallLabel, { color: colors.text }]}>
              Progrès global
            </Text>
            <Text style={[styles.overallValue, { color: colors.primary }]}>
              {stats.progress.overall.toFixed(1)}%
            </Text>
          </View>
        </IslandCard>
      </ScrollView>
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
    alignItems: "center", // ← Centre verticalement le contenu
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    // ← Défini ici
    fontSize: 28,
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
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
  // Styles pour le modal
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
  modalCancel: {
    // background color dynamique
  },
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
});
