import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { useCurrency } from "../../src/context/CurrencyContext"; // ← AJOUTER
import { useTheme } from "../../src/context/ThemeContext";

const DREAMS_STORAGE = "@finance_app_dreams";
const GOALS_STORAGE = "@finance_app_goals";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const DREAM_CATEGORIES: {
  id: string;
  name: string;
  icon: IconName;
  color: string;
}[] = [
  { id: "travel", name: "Voyage", icon: "airplane", color: "#3B82F6" },
  { id: "car", name: "Voiture", icon: "car", color: "#EF4444" },
  { id: "house", name: "Maison", icon: "home", color: "#10B981" },
  { id: "retirement", name: "Retraite", icon: "umbrella", color: "#8B5CF6" },
  { id: "education", name: "Éducation", icon: "school", color: "#F59E0B" },
  { id: "wedding", name: "Mariage", icon: "heart", color: "#EC4899" },
  { id: "business", name: "Entreprise", icon: "business", color: "#6366F1" },
  { id: "other", name: "Autre", icon: "star", color: "#6B7280" },
];

const GOAL_TYPES: {
  id: string;
  name: string;
  icon: IconName;
  color: string;
}[] = [
  { id: "retirement", name: "Retraite", icon: "umbrella", color: "#8B5CF6" },
  { id: "house", name: "Achat Maison", icon: "home", color: "#10B981" },
  { id: "car", name: "Achat Voiture", icon: "car", color: "#EF4444" },
  { id: "education", name: "Éducation", icon: "school", color: "#F59E0B" },
  {
    id: "investment",
    name: "Investissement",
    icon: "trending-up",
    color: "#6366F1",
  },
];

interface Dream {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  createdAt: string;
  monthlyContribution?: number;
  targetDate?: string;
}

interface Goal {
  id: string;
  title: string;
  type: string;
  targetAmount: number;
  currentAmount: number;
  monthlySavings: number;
  createdAt: string;
  monthlyContribution?: number;
  targetDate?: string;
}

export default function ExploreScreen() {
  const params = useLocalSearchParams();
  const initialTab = (params.tab as string) || "dreams";

  const [activeTab, setActiveTab] = useState(initialTab);

  const themeContext = useTheme();
  const colors = themeContext.colors as any;
  const { formatCurrency, currency } = useCurrency();
  colors.textLight = colors.textLight ?? colors.textDark ?? colors.text;
  // const [activeTab, setActiveTab] = useState("dreams");
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddDream, setShowAddDream] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newDream, setNewDream] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    category: "travel",
    monthlyContribution: "",
    targetDate: "",
  });
  const [newGoal, setNewGoal] = useState({
    title: "",
    type: "retirement",
    targetAmount: "",
    currentAmount: "0",
    monthlySavings: "",
    monthlyContribution: "",
    targetDate: "",
  });
  const [editingDreamId, setEditingDreamId] = useState<string | null>(null);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editMonthlyValue, setEditMonthlyValue] = useState("");

  const loadData = async () => {
    try {
      const dreamsData = await AsyncStorage.getItem(DREAMS_STORAGE);
      setDreams(dreamsData ? JSON.parse(dreamsData) : []);
      const goalsData = await AsyncStorage.getItem(GOALS_STORAGE);
      setGoals(goalsData ? JSON.parse(goalsData) : []);
    } catch (error) {
      console.error("Erreur chargement:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  const saveDreams = async (newDreams: Dream[]) => {
    try {
      await AsyncStorage.setItem(DREAMS_STORAGE, JSON.stringify(newDreams));
      setDreams(newDreams);
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    }
  };

  const saveGoals = async (newGoals: Goal[]) => {
    try {
      await AsyncStorage.setItem(GOALS_STORAGE, JSON.stringify(newGoals));
      setGoals(newGoals);
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    }
  };

  const handleAddDream = () => {
    if (!newDream.name || !newDream.targetAmount) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    const target = parseFloat(newDream.targetAmount);
    const current = parseFloat(newDream.currentAmount) || 0;
    const monthly = parseFloat(newDream.monthlyContribution) || 0;

    if (isNaN(target) || target <= 0) {
      Alert.alert("Erreur", "Montant cible invalide");
      return;
    }

    const dream: Dream = {
      id: Date.now().toString(),
      name: newDream.name,
      targetAmount: target,
      currentAmount: current,
      category: newDream.category,
      monthlyContribution: monthly > 0 ? monthly : undefined,
      targetDate: newDream.targetDate || undefined,
      createdAt: new Date().toISOString(),
    };

    saveDreams([...dreams, dream]);
    setNewDream({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      category: "travel",
      monthlyContribution: "",
      targetDate: "",
    });
    setShowAddDream(false);
  };

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetAmount) {
      Alert.alert("Erreur", "Veuillez remplir les champs obligatoires");
      return;
    }

    const target = parseFloat(newGoal.targetAmount);
    const current = parseFloat(newGoal.currentAmount) || 0;
    const monthly = parseFloat(newGoal.monthlySavings) || 0;

    if (isNaN(target) || target <= 0) {
      Alert.alert("Erreur", "Montant cible invalide");
      return;
    }

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      type: newGoal.type,
      targetAmount: target,
      currentAmount: current,
      monthlyContribution: monthly > 0 ? monthly : undefined,
      targetDate: newGoal.targetDate || undefined,
      createdAt: new Date().toISOString(),
      monthlySavings: monthly,
    };

    saveGoals([...goals, goal]);
    setNewGoal({
      title: "",
      type: "retirement",
      targetAmount: "",
      currentAmount: "0",
      monthlySavings: "",
      monthlyContribution: "",
      targetDate: "",
    });
    setShowAddGoal(false);
  };

  const handleDeleteDream = (id: string) => {
    Alert.alert("Supprimer", "Voulez-vous supprimer ce rêve ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => saveDreams(dreams.filter((d) => d.id !== id)),
      },
    ]);
  };

  const handleDeleteGoal = (id: string) => {
    Alert.alert("Supprimer", "Voulez-vous supprimer cet objectif ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => saveGoals(goals.filter((g) => g.id !== id)),
      },
    ]);
  };

  const updateMonthlyContribution = (
    item: Dream | Goal,
    value: string,
    isDream: boolean,
  ) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;

    if (isDream) {
      const updated = dreams.map((d) =>
        d.id === item.id
          ? { ...d, monthlyContribution: numValue || undefined }
          : d,
      );
      saveDreams(updated);
    } else {
      const updated = goals.map((g) =>
        g.id === item.id
          ? { ...g, monthlyContribution: numValue || undefined }
          : g,
      );
      saveGoals(updated);
    }
    setEditingDreamId(null);
    setEditingGoalId(null);
  };

  const formatProjection = (years: number, months: number): string => {
    const parts = [];
    if (years > 0) parts.push(`${years} an${years > 1 ? "s" : ""}`);
    if (months > 0) parts.push(`${months} mois`);
    return parts.length > 0 ? parts.join(" et ") : "moins d'un mois";
  };

  const addContribution = (dream: Dream, amount: number) => {
    const newAmount = dream.currentAmount + amount;
    if (newAmount > dream.targetAmount) {
      Alert.alert("Félicitations !", "Vous avez atteint votre objectif ! 🎉");
    }
    const updatedDreams = dreams.map((d) =>
      d.id === dream.id
        ? { ...d, currentAmount: Math.min(newAmount, d.targetAmount) }
        : d,
    );
    saveDreams(updatedDreams);
  };

  const addContributionToGoal = (goal: Goal, amount: number) => {
    const newAmount = goal.currentAmount + amount;
    if (newAmount >= goal.targetAmount) {
      Alert.alert(
        "Félicitations ! 🎉",
        `Vous avez atteint votre objectif "${goal.title}" !`,
      );
    }
    const updatedGoals = goals.map((g) =>
      g.id === goal.id
        ? { ...g, currentAmount: Math.min(newAmount, g.targetAmount) }
        : g,
    );
    saveGoals(updatedGoals);
  };

  const calculateProjection = (item: Dream | Goal, isDream: boolean) => {
    const remaining = item.targetAmount - item.currentAmount;
    if (remaining <= 0) return { achieved: true };

    const monthly = isDream
      ? (item as Dream).monthlyContribution
      : (item as Goal).monthlyContribution || (item as Goal).monthlySavings;

    if (!monthly || monthly <= 0) {
      return {
        needsMonthly: true,
        monthlyNeeded: remaining / 12,
      };
    }

    const monthsNeeded = Math.ceil(remaining / monthly);
    const years = Math.floor(monthsNeeded / 12);
    const months = monthsNeeded % 12;

    return {
      years,
      months,
      monthsNeeded,
      monthlyNeeded: monthly,
      achieved: false,
    };
  };

  const renderDream = ({ item }: { item: Dream }) => {
    const category =
      DREAM_CATEGORIES.find((c) => c.id === item.category) ||
      DREAM_CATEGORIES[0];
    const progress = (item.currentAmount / item.targetAmount) * 100;
    const remaining = item.targetAmount - item.currentAmount;
    const projection = calculateProjection(item, true);

    const { t } = useLanguage();

    return (
      <IslandCard>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: category.color + "20" },
            ]}
          >
            <Ionicons
              name={category.icon as any}
              size={24}
              color={category.color}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.dreamName, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text>{t.home.dailyBudget}</Text>
            <Text style={[styles.categoryText, { color: colors.textLight }]}>
              {category.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleDeleteDream(item.id)}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: category.color },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.text }]}>
            {progress.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.amountRow}>
          <View>
            <Text style={[styles.amountLabel, { color: colors.textLight }]}>
              Objectif
            </Text>
            <Text style={[styles.amountValue, { color: colors.text }]}>
              {formatCurrency(item.targetAmount)}
            </Text>
          </View>
          <View>
            <Text style={[styles.amountLabel, { color: colors.textLight }]}>
              Épargné
            </Text>
            <Text style={[styles.amountValue, { color: colors.income }]}>
              {formatCurrency(item.currentAmount)}
            </Text>
          </View>
          <View>
            <Text style={[styles.amountLabel, { color: colors.textLight }]}>
              Reste
            </Text>
            <Text style={[styles.amountValue, { color: colors.warning }]}>
              {formatCurrency(remaining)}
            </Text>
          </View>
        </View>

        {remaining > 0 && (
          <View style={styles.quickAdd}>
            <Text style={[styles.quickAddLabel, { color: colors.textLight }]}>
              Ajouter rapidement :
            </Text>
            <View style={styles.quickAddButtons}>
              {[10, 50, 100, Math.min(remaining, 500)].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.quickAddButton,
                    { backgroundColor: category.color + "20" },
                  ]}
                  onPress={() => addContribution(item, amount)}
                >
                  <Text
                    style={[
                      styles.quickAddButtonText,
                      { color: category.color },
                    ]}
                  >
                    {amount}€
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.monthlySection}>
          <Text style={[styles.sectionLabel, { color: colors.textLight }]}>
            Épargne mensuelle
          </Text>
          {editingDreamId === item.id ? (
            <View style={styles.monthlyEdit}>
              <TextInput
                style={[
                  styles.monthlyInput,
                  { color: colors.text, borderColor: colors.icon + "30" },
                ]}
                value={editMonthlyValue}
                onChangeText={setEditMonthlyValue}
                keyboardType="numeric"
                placeholder="Montant"
                placeholderTextColor={colors.textLight}
                autoFocus
              />
              <TouchableOpacity
                onPress={() =>
                  updateMonthlyContribution(item, editMonthlyValue, true)
                }
                style={styles.monthlySaveButton}
              >
                <Ionicons name="checkmark" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditingDreamId(null)}
                style={[
                  styles.monthlySaveButton,
                  { backgroundColor: colors.danger },
                ]}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.monthlyDisplay}
              onPress={() => {
                setEditingDreamId(item.id);
                setEditMonthlyValue(item.monthlyContribution?.toString() || "");
              }}
            >
              <Text style={[styles.monthlyAmount, { color: colors.primary }]}>
                {item.monthlyContribution
                  ? formatCurrency(item.monthlyContribution)
                  : "—"}
              </Text>
              <Text style={[styles.monthlyLabel, { color: colors.textLight }]}>
                /mois
              </Text>
              <Ionicons
                name="pencil"
                size={16}
                color={colors.textLight}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {projection && !projection.achieved && (
          <View style={styles.projectionCard}>
            {projection.needsMonthly ? (
              <View style={styles.projectionRow}>
                <Ionicons name="bulb" size={16} color={colors.warning} />
                <Text
                  style={[styles.projectionText, { color: colors.textLight }]}
                >
                  Définissez une épargne mensuelle pour voir la projection
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.projectionRow}>
                  <Ionicons
                    name="calendar"
                    size={16}
                    color={colors.textLight}
                  />
                  <Text style={[styles.projectionText, { color: colors.text }]}>
                    Objectif atteint dans{" "}
                    {formatProjection(
                      projection.years || 0,
                      projection.months || 0,
                    )}
                  </Text>
                </View>
                <View style={styles.projectionRow}>
                  <Ionicons name="cash" size={16} color={colors.textLight} />
                  <Text style={[styles.projectionText, { color: colors.text }]}>
                    {formatCurrency(projection.monthlyNeeded || 0)}/mois
                  </Text>
                </View>
              </>
            )}
          </View>
        )}
      </IslandCard>
    );
  };

  const renderGoal = ({ item }: { item: Goal }) => {
    const goalType =
      GOAL_TYPES.find((g) => g.id === item.type) || GOAL_TYPES[0];
    const progress = (item.currentAmount / item.targetAmount) * 100;
    const remaining = item.targetAmount - item.currentAmount;
    const projection = calculateProjection(item, false);

    return (
      <IslandCard>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: goalType.color + "20" },
            ]}
          >
            <Ionicons
              name={goalType.icon as any}
              size={24}
              color={goalType.color}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={[styles.dreamName, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.categoryText, { color: colors.textLight }]}>
              {goalType.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => handleDeleteGoal(item.id)}>
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%`, backgroundColor: goalType.color },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: colors.text }]}>
            {progress.toFixed(1)}%
          </Text>
        </View>

        <View style={styles.amountRow}>
          <View>
            <Text style={[styles.amountLabel, { color: colors.textLight }]}>
              Objectif
            </Text>
            <Text style={[styles.amountValue, { color: colors.text }]}>
              {formatCurrency(item.targetAmount)}
            </Text>
          </View>
          <View>
            <Text style={[styles.amountLabel, { color: colors.textLight }]}>
              Actuel
            </Text>
            <Text style={[styles.amountValue, { color: colors.income }]}>
              {formatCurrency(item.currentAmount)} {currency}
            </Text>
          </View>
          <View>
            <Text style={[styles.amountLabel, { color: colors.textLight }]}>
              Reste
            </Text>
            <Text style={[styles.amountValue, { color: colors.warning }]}>
              {formatCurrency(remaining)}
            </Text>
          </View>
        </View>

        {remaining > 0 && (
          <View style={styles.quickAdd}>
            <Text style={[styles.quickAddLabel, { color: colors.textLight }]}>
              Ajouter rapidement :
            </Text>
            <View style={styles.quickAddButtons}>
              {[10, 50, 100, Math.min(remaining, 500)].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.quickAddButton,
                    { backgroundColor: goalType.color + "20" },
                  ]}
                  onPress={() => addContributionToGoal(item, amount)}
                >
                  <Text
                    style={[
                      styles.quickAddButtonText,
                      { color: goalType.color },
                    ]}
                  >
                    {amount}€
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.monthlySection}>
          <Text style={[styles.sectionLabel, { color: colors.textLight }]}>
            Épargne mensuelle
          </Text>
          {editingGoalId === item.id ? (
            <View style={styles.monthlyEdit}>
              <TextInput
                style={[
                  styles.monthlyInput,
                  { color: colors.text, borderColor: colors.icon + "30" },
                ]}
                value={editMonthlyValue}
                onChangeText={setEditMonthlyValue}
                keyboardType="numeric"
                placeholder="Montant"
                placeholderTextColor={colors.textLight}
                autoFocus
              />
              <TouchableOpacity
                onPress={() =>
                  updateMonthlyContribution(item, editMonthlyValue, false)
                }
                style={styles.monthlySaveButton}
              >
                <Ionicons name="checkmark" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditingGoalId(null)}
                style={[
                  styles.monthlySaveButton,
                  { backgroundColor: colors.danger },
                ]}
              >
                <Ionicons name="close" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.monthlyDisplay}
              onPress={() => {
                setEditingGoalId(item.id);
                setEditMonthlyValue(item.monthlyContribution?.toString() || "");
              }}
            >
              <Text style={[styles.monthlyAmount, { color: colors.primary }]}>
                {item.monthlyContribution
                  ? formatCurrency(item.monthlyContribution)
                  : "—"}
              </Text>
              <Text style={[styles.monthlyLabel, { color: colors.textLight }]}>
                /mois
              </Text>
              <Ionicons
                name="pencil"
                size={16}
                color={colors.textLight}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        {projection && !projection.achieved && (
          <View style={styles.projectionCard}>
            {projection.needsMonthly ? (
              <View style={styles.projectionRow}>
                <Ionicons name="bulb" size={16} color={colors.warning} />
                <Text
                  style={[styles.projectionText, { color: colors.textLight }]}
                >
                  Définissez une épargne mensuelle pour voir la projection
                </Text>
              </View>
            ) : (
              <>
                <View style={styles.projectionRow}>
                  <Ionicons
                    name="calendar"
                    size={16}
                    color={colors.textLight}
                  />
                  <Text style={[styles.projectionText, { color: colors.text }]}>
                    Objectif atteint dans{" "}
                    {formatProjection(
                      projection.years || 0,
                      projection.months || 0,
                    )}
                  </Text>
                </View>
                <View style={styles.projectionRow}>
                  <Ionicons name="cash" size={16} color={colors.textLight} />
                  <Text style={[styles.projectionText, { color: colors.text }]}>
                    {formatCurrency(projection.monthlyNeeded || 0)}/mois
                  </Text>
                </View>
              </>
            )}
          </View>
        )}
      </IslandCard>
    );
  };

  const totalDreamsTarget = dreams.reduce((sum, d) => sum + d.targetAmount, 0);
  const totalDreamsCurrent = dreams.reduce(
    (sum, d) => sum + d.currentAmount,
    0,
  );
  const totalGoalsTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalGoalsCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);

  // Define imageSize used for the Image dimensions
  const imageSize = 120;
  const theme = (themeContext as any)?.theme ?? "light";
  const imageSource =
    theme === "dark"
      ? require("../../assets/images/NeedDark.jpg")
      : require("../../assets/images/NeedLight.jpeg");

  return (
    <BackgroundImage imageTheme="default" opacity={0.6} blurRadius={2}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontFamily: "FrenchScript",
              fontSize: 40,
              color: colors.text,
              textAlign: "center",
            }}
          >
            Mes Objectifs
          </Text>
        </View>
        <View style={styles.imageWrapper}>
          <Image
            source={imageSource} // Remplacez par votre chemin d'image
            style={{
              width: imageSize,
              height: imageSize,
              borderRadius: 12,
            }}
          />
        </View>

        {/* Statistiques globales */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {dreams.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>
                Rêves
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {goals.length}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>
                Objectifs
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(totalDreamsCurrent + totalGoalsCurrent)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>
                Épargné
              </Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(totalDreamsTarget)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>
                Objectif rêves
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {formatCurrency(totalGoalsTarget)}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>
                Objectif objectifs
              </Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {(
                  ((totalDreamsCurrent + totalGoalsCurrent) /
                    (totalDreamsTarget + totalGoalsTarget)) *
                    100 || 0
                ).toFixed(1)}
                %
              </Text>
              <Text style={[styles.statLabel, { color: colors.textLight }]}>
                Progrès global
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "dreams" && styles.activeTab]}
            onPress={() => setActiveTab("dreams")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "dreams" && styles.activeTabText,
                {
                  color: activeTab === "dreams" ? colors.primary : colors.text,
                },
              ]}
            >
              💭 Rêves
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "goals" && styles.activeTab]}
            onPress={() => setActiveTab("goals")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "goals" && styles.activeTabText,
                { color: activeTab === "goals" ? colors.primary : colors.text },
              ]}
            >
              📊 Objectifs
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contenu */}
        {activeTab === "dreams" ? (
          <>
            {!showAddDream ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddDream(true)}
              >
                <Ionicons name="add-circle" size={24} color={colors.primary} />
                <Text style={[styles.addButtonText, { color: colors.primary }]}>
                  Ajouter un rêve
                </Text>
              </TouchableOpacity>
            ) : (
              <IslandCard>
                <Text style={[styles.formTitle, { color: colors.text }]}>
                  Nouveau rêve
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Nom du rêve"
                  value={newDream.name}
                  onChangeText={(text) =>
                    setNewDream({ ...newDream, name: text })
                  }
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Montant objectif (€)"
                  value={newDream.targetAmount}
                  onChangeText={(text) =>
                    setNewDream({ ...newDream, targetAmount: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Déjà épargné (€)"
                  value={newDream.currentAmount}
                  onChangeText={(text) =>
                    setNewDream({ ...newDream, currentAmount: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryScroll}
                >
                  {DREAM_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoryChip,
                        { backgroundColor: cat.color + "20" },
                        newDream.category === cat.id &&
                          styles.categoryChipActive,
                      ]}
                      onPress={() =>
                        setNewDream({ ...newDream, category: cat.id })
                      }
                    >
                      <Ionicons name={cat.icon} size={20} color={cat.color} />
                      <Text
                        style={[styles.categoryChipText, { color: cat.color }]}
                      >
                        {cat.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.formButtons}>
                  <TouchableOpacity
                    style={[styles.formButton, styles.cancelButton]}
                    onPress={() => setShowAddDream(false)}
                  >
                    <Text style={{ color: colors.text }}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.formButton, styles.saveButton]}
                    onPress={handleAddDream}
                  >
                    <Text style={{ color: "white" }}>Ajouter</Text>
                  </TouchableOpacity>
                </View>
              </IslandCard>
            )}
            <FlatList
              data={dreams}
              keyExtractor={(item) => item.id}
              renderItem={renderDream}
              scrollEnabled={false}
              ListEmptyComponent={
                !showAddDream ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons
                      name="heart-outline"
                      size={50}
                      color={colors.textLight}
                    />
                    <Text
                      style={[styles.emptyText, { color: colors.textLight }]}
                    >
                      Aucun rêve pour le moment
                    </Text>
                  </View>
                ) : null
              }
            />
          </>
        ) : (
          <>
            {!showAddGoal ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowAddGoal(true)}
              >
                <Ionicons name="add-circle" size={24} color={colors.primary} />
                <Text style={[styles.addButtonText, { color: colors.primary }]}>
                  Ajouter un objectif
                </Text>
              </TouchableOpacity>
            ) : (
              <IslandCard>
                <Text style={[styles.formTitle, { color: colors.text }]}>
                  Nouvel objectif
                </Text>
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Titre"
                  value={newGoal.title}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, title: text })
                  }
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Montant objectif (€)"
                  value={newGoal.targetAmount}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, targetAmount: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Déjà épargné (€)"
                  value={newGoal.currentAmount}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, currentAmount: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <TextInput
                  style={[
                    styles.input,
                    { color: colors.text, borderColor: colors.icon + "30" },
                  ]}
                  placeholder="Épargne mensuelle (€) - optionnel"
                  value={newGoal.monthlyContribution}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, monthlyContribution: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor={colors.textLight}
                />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.categoryScroll}
                >
                  {GOAL_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.categoryChip,
                        { backgroundColor: type.color + "20" },
                        newGoal.type === type.id && styles.categoryChipActive,
                      ]}
                      onPress={() => setNewGoal({ ...newGoal, type: type.id })}
                    >
                      <Ionicons name={type.icon} size={20} color={type.color} />
                      <Text
                        style={[styles.categoryChipText, { color: type.color }]}
                      >
                        {type.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <View style={styles.formButtons}>
                  <TouchableOpacity
                    style={[styles.formButton, styles.cancelButton]}
                    onPress={() => setShowAddGoal(false)}
                  >
                    <Text style={{ color: colors.text }}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.formButton, styles.saveButton]}
                    onPress={handleAddGoal}
                  >
                    <Text style={{ color: "white" }}>Ajouter</Text>
                  </TouchableOpacity>
                </View>
              </IslandCard>
            )}
            <FlatList
              data={goals}
              keyExtractor={(item) => item.id}
              renderItem={renderGoal}
              scrollEnabled={false}
              ListEmptyComponent={
                !showAddGoal ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons
                      name="flag-outline"
                      size={50}
                      color={colors.textLight}
                    />
                    <Text
                      style={[styles.emptyText, { color: colors.textLight }]}
                    >
                      Aucun objectif pour le moment
                    </Text>
                  </View>
                ) : null
              }
            />
          </>
        )}
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  imageSize: {
    width: 120,
    height: 120,
  },
  imageWrapper: {
    alignItems: "center", // Centre l'image horizontalement
    justifyContent: "center", // Centre verticalement si nécessaire
    marginVertical: 20, // Ajoute de l'espace au dessus et en dessous
    width: "100%", // Prend toute la largeur pour permettre le centrage
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  statsContainer: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    fontWeight: "600",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "rgba(99,102,241,0.1)",
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#6366F140",
    borderStyle: "dashed",
  },
  addButtonText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  categoryScroll: {
    flexDirection: "row",
    marginBottom: 12,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: {
    borderWidth: 2,
    borderColor: "#6366F1",
  },
  categoryChipText: {
    fontSize: 14,
    marginLeft: 6,
  },
  formButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  formButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "rgba(0,0,0,0.05)",
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: "#6366F1",
    marginLeft: 8,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  dreamName: {
    fontSize: 16,
    fontWeight: "600",
  },
  categoryText: {
    fontSize: 13,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  amountLabel: {
    fontSize: 11,
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  quickAdd: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 12,
  },
  quickAddLabel: {
    fontSize: 13,
    marginBottom: 8,
  },
  quickAddButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  quickAddButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 4,
  },
  quickAddButtonText: {
    fontSize: 13,
    fontWeight: "500",
  },
  monthlySection: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  monthlyDisplay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.02)",
    padding: 10,
    borderRadius: 8,
  },
  monthlyAmount: {
    fontSize: 15,
    fontWeight: "600",
  },
  monthlyLabel: {
    fontSize: 13,
    marginLeft: 4,
  },
  editIcon: {
    marginLeft: "auto",
  },
  monthlyEdit: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthlyInput: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 10,
    borderRadius: 8,
    fontSize: 15,
    marginRight: 8,
    borderWidth: 1,
  },
  monthlySaveButton: {
    backgroundColor: "#6366F1",
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  projectionCard: {
    marginTop: 8,
    marginBottom: 12,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 8,
  },
  projectionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  projectionText: {
    fontSize: 13,
    marginLeft: 6,
    flex: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
//check
