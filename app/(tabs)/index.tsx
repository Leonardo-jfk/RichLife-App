import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
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
import { useTheme } from "../../src/context/ThemeContext";
import { useMonthlyStats } from "../../src/hooks/useMonthlyStats";
import { Dream, Goal, STORAGE_KEYS } from "../../src/types/finance-types";
// import { formatCurrency } from "../../src/utils/formatters";
import { useCurrency } from "../../src/context/CurrencyContext";

// Dans index.tsx, ajoutez après les imports :
import { useDailyBudget } from "../../src/hooks/useDailyBudget";
// / Types

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
  const [newCreditAmount, setNewCreditAmount] = useState("");
  const [newCreditTitle, setNewCreditTitle] = useState("");
  const [newCreditMonths, setNewCreditMonths] = useState("12");

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

  // Dans le composant, après les stats :
  const {
    dailyBudget,
    remainingMonthlyBudget,
    remainingDays,
    credits,
    totalMonthlyCreditPayments,
    addCredit,

    deleteCredit,
  } = useDailyBudget(monthlyIncome, monthlyExpenses, dreams, goals);

  // Ajoutez un état pour le modal des crédits
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [newCredit, setNewCredit] = useState({
    title: "",
    totalAmount: "",
    remainingMonths: "12",
    monthlyPayment: "",
    description: "",
  });

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

  const { formatCurrency } = useCurrency();

  const handleAddCredit = () => {
    if (!newCreditAmount || !newCreditTitle) return;

    addCredit({
      title: newCreditTitle,
      totalAmount: parseFloat(newCreditAmount),
      remainingMonths: parseInt(newCreditMonths),
      monthlyPayment: parseFloat(newCreditAmount) / parseInt(newCreditMonths),
      startDate: new Date().toISOString(),
      description: "Achat exceptionnel à amortir",
    });

    // Reset
    setNewCreditAmount("");
    setNewCreditTitle("");
    setShowCreditModal(false);
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
            Résumé du Mois
          </Text>
        </View>

        {/* Carte des revenus/dépenses */}
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

        {/* Carte du budget journalier */}
        <IslandCard>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Budget journalier
            </Text>
          </View>

          <View style={styles.dailyBudgetContainer}>
            <Text style={[styles.dailyBudgetValue, { color: colors.primary }]}>
              {formatCurrency(dailyBudget)}
            </Text>
            <Text
              style={[styles.dailyBudgetLabel, { color: colors.textLight }]}
            >
              par jour ({remainingDays} jours restants)
            </Text>
          </View>

          <View style={styles.remainingBudgetContainer}>
            <Text
              style={[styles.remainingBudgetLabel, { color: colors.textLight }]}
            >
              Budget restant du mois
            </Text>
            <Text
              style={[styles.remainingBudgetValue, { color: colors.success }]}
            >
              {formatCurrency(remainingMonthlyBudget)}
            </Text>
          </View>

          {totalMonthlyCreditPayments > 0 && (
            <View style={styles.creditPaymentContainer}>
              <Text
                style={[styles.creditPaymentLabel, { color: colors.textLight }]}
              >
                Mensualités crédits
              </Text>
              <Text
                style={[styles.creditPaymentValue, { color: colors.warning }]}
              >
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
              Gérer mes crédits
            </Text>
          </TouchableOpacity>
        </IslandCard>

        {/* Modal pour modifier les revenus/dépenses */}
        <Modal
          visible={showIncomeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowIncomeModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: colors.background },
              ]}
            >
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
                placeholderTextColor={colors.textLight}
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
                placeholderTextColor={colors.textLight}
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
            </View>
          </View>
        </Modal>

        {/* Modal pour gérer les crédits - UN SEUL */}
        <Modal
          visible={showCreditModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCreditModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modalContent,
                { backgroundColor: colors.background },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Gérer mes crédits
                </Text>
                <TouchableOpacity onPress={() => setShowCreditModal(false)}>
                  <Ionicons name="close" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Ajouter un crédit */}
                <Text style={[styles.modalLabel, { color: colors.text }]}>
                  Nouveau crédit
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Nom (ex: Vélo)"
                  value={newCredit.title}
                  onChangeText={(text) =>
                    setNewCredit({ ...newCredit, title: text })
                  }
                  placeholderTextColor={colors.textLight}
                />
                <Text style={[styles.modalLabel, { color: colors.text }]}>
                  Montant total
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      color: colors.text,
                      borderColor: colors.icon + "30",
                      borderWidth: 1,
                    },
                  ]}
                  placeholder="Montant total (€)"
                  // placeholder="Ex: 500"
                  placeholderTextColor={colors.textLight}
                  keyboardType="numeric"
                  value={newCreditAmount}
                  onChangeText={(text) => setNewCreditAmount(text)} // Assure-toi que c'est bien setNewCreditAmount
                />

                <Text style={[styles.modalLabel, { color: colors.text }]}>
                  Nombre de mois pour rembourser
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    {
                      color: colors.text,
                      borderColor: colors.icon + "30",
                      borderWidth: 1,
                    },
                  ]}
                  placeholder="Ex: 12"
                  placeholderTextColor={colors.textLight}
                  keyboardType="numeric"
                  value={newCreditMonths} // S'assurer que la valeur est liée
                  onChangeText={setNewCreditMonths} // <--- C'EST CETTE LIGNE QUI MANQUAIT
                />

                {/* <TextInput
                  style={[
                    styles.modalInput,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Montant total (€)"
                  value={newCredit.totalAmount}
                  onChangeText={(text) => {
                    setNewCredit({ ...newCredit, totalAmount: text });
                    const total = parseFloat(text);
                    const months = parseFloat(newCredit.remainingMonths);
                    if (!isNaN(total) && !isNaN(months) && months > 0) {
                      setNewCredit({
                        ...newCredit,
                        monthlyPayment: (total / months).toFixed(2),
                      });
                    }
                  }}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                /> */}
                <TextInput
                  style={[
                    styles.modalInput,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Nombre de mois"
                  value={newCredit.remainingMonths}
                  onChangeText={(text) => {
                    setNewCredit({ ...newCredit, remainingMonths: text });
                    const total = parseFloat(newCredit.totalAmount);
                    const months = parseFloat(text);
                    if (!isNaN(total) && !isNaN(months) && months > 0) {
                      setNewCredit({
                        ...newCredit,
                        monthlyPayment: (total / months).toFixed(2),
                      });
                    }
                  }}
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <Text
                  style={[
                    styles.monthlyPaymentPreview,
                    { color: colors.primary },
                  ]}
                >
                  Mensualité:{" "}
                  {formatCurrency(parseFloat(newCredit.monthlyPayment) || 0)}
                </Text>
                <TextInput
                  style={[
                    styles.modalInput,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Description (optionnel)"
                  value={newCredit.description}
                  onChangeText={(text) =>
                    setNewCredit({ ...newCredit, description: text })
                  }
                  placeholderTextColor={colors.textLight}
                />

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => {
                    if (!newCredit.title || !newCredit.totalAmount) {
                      Alert.alert("Erreur", "Veuillez remplir tous les champs");
                      return;
                    }
                    addCredit({
                      title: newCredit.title,
                      totalAmount: parseFloat(newCredit.totalAmount),
                      remainingMonths: parseInt(newCredit.remainingMonths),
                      monthlyPayment: parseFloat(newCredit.monthlyPayment),
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
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Ajouter un crédit
                  </Text>

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleAddCredit} // <--- UTILISE LA FONCTION ICI
                  >
                    <Text style={styles.creditTitle}>
                      Sauvegarder le crédit
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>

                {/* Liste des crédits existants */}
                <Text
                  style={[
                    styles.modalLabel,
                    { color: colors.text, marginTop: 16 },
                  ]}
                >
                  Mes crédits en cours
                </Text>
                {credits.map((credit) => {
                  const remaining = credit.totalAmount - credit.paidAmount;
                  const progress =
                    (credit.paidAmount / credit.totalAmount) * 100;
                  return (
                    <View key={credit.id} style={styles.creditItem}>
                      <View style={styles.creditHeader}>
                        <Text
                          style={[styles.creditTitle, { color: colors.text }]}
                        >
                          {credit.title}
                        </Text>
                        <TouchableOpacity
                          onPress={() => deleteCredit(credit.id)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color={colors.danger}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[
                          styles.creditDescription,
                          { color: colors.textLight },
                        ]}
                      >
                        {credit.description}
                      </Text>
                      <View style={styles.creditProgressContainer}>
                        <View style={styles.creditProgressBar}>
                          <View
                            style={[
                              styles.creditProgressFill,
                              {
                                width: `${progress}%`,
                                backgroundColor: colors.primary,
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={[
                            styles.creditProgressText,
                            { color: colors.textLight },
                          ]}
                        >
                          {progress.toFixed(0)}%
                        </Text>
                      </View>
                      <View style={styles.creditDetails}>
                        <Text
                          style={[styles.creditAmount, { color: colors.text }]}
                        >
                          Reste: {formatCurrency(remaining)}
                        </Text>
                        <Text
                          style={[
                            styles.creditMonthly,
                            { color: colors.primary },
                          ]}
                        >
                          {formatCurrency(credit.monthlyPayment)}/mois
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
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
    paddingTop: 80,
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

  // Ajoutez dans StyleSheet :
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

  // Dans StyleSheet
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
  // À ajouter à l'intérieur de StyleSheet.create
  // Styles pour les modals
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
