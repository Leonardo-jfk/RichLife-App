// import { Image } from 'expo-image';
// import { Platform, StyleSheet } from 'react-native';

// import { Collapsible } from '@/components/ui/collapsible';
// import { ExternalLink } from '@/components/external-link';
// import ParallaxScrollView from '@/components/parallax-scroll-view';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { IconSymbol } from '@/components/ui/icon-symbol';
// import { Fonts } from '@/constants/theme';

// export default function TabTwoScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={
//         <IconSymbol
//           size={310}
//           color="#808080"
//           name="chevron.left.forwardslash.chevron.right"
//           style={styles.headerImage}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText
//           type="title"
//           style={{
//             fontFamily: Fonts.rounded,
//           }}>
//           Explore
//         </ThemedText>
//       </ThemedView>
//       <ThemedText>This app includes example code to help you get started.</ThemedText>
//       <Collapsible title="File-based routing">
//         <ThemedText>
//           This app has two screens:{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
//         </ThemedText>
//         <ThemedText>
//           The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
//           sets up the tab navigator.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/router/introduction">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Android, iOS, and web support">
//         <ThemedText>
//           You can open this project on Android, iOS, and the web. To open the web version, press{' '}
//           <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Images">
//         <ThemedText>
//           For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
//           different screen densities
//         </ThemedText>
//         <Image
//           source={require('@/assets/images/react-logo.png')}
//           style={{ width: 100, height: 100, alignSelf: 'center' }}
//         />
//         <ExternalLink href="https://reactnative.dev/docs/images">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Light and dark mode components">
//         <ThemedText>
//           This template has light and dark mode support. The{' '}
//           <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
//           what the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Animations">
//         <ThemedText>
//           This template includes an example of an animated component. The{' '}
//           <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
//           the powerful{' '}
//           <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
//             react-native-reanimated
//           </ThemedText>{' '}
//           library to create a waving hand animation.
//         </ThemedText>
//         {Platform.select({
//           ios: (
//             <ThemedText>
//               The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
//               component provides a parallax effect for the header image.
//             </ThemedText>
//           ),
//         })}
//       </Collapsible>
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
//   },
// });

import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from 'expo-router';
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../src/constants/colors";
import { formatCurrency } from "../../src/utils/formatters";

const DREAMS_STORAGE = "@finance_app_dreams";
const GOALS_STORAGE = "@finance_app_goals";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

// const DREAM_CATEGORIES = [
//   { id: "travel", name: "Voyage", icon: "airplane", color: "#3B82F6" },
//   { id: "car", name: "Voiture", icon: "car", color: "#EF4444" },
//   { id: "house", name: "Maison", icon: "home", color: "#10B981" },
//   { id: "retirement", name: "Retraite", icon: "umbrella", color: "#8B5CF6" },
//   { id: "education", name: "Éducation", icon: "school", color: "#F59E0B" },
//   { id: "wedding", name: "Mariage", icon: "heart", color: "#EC4899" },
//   { id: "business", name: "Entreprise", icon: "business", color: "#6366F1" },
//   { id: "other", name: "Autre", icon: "star", color: "#6B7280" },
// ];

// const GOAL_TYPES = [
//   { id: "retirement", name: "Retraite", icon: "umbrella", color: "#8B5CF6" },
//   { id: "house", name: "Achat Maison", icon: "home", color: "#10B981" },
//   { id: "car", name: "Achat Voiture", icon: "car", color: "#EF4444" },
//   { id: "education", name: "Éducation", icon: "school", color: "#F59E0B" },
//   {
//     id: "investment",
//     name: "Investissement",
//     icon: "trending-up",
//     color: "#6366F1",
//   },
// ];

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

// Même chose pour GOAL_TYPES
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
// Types pour les rêves et objectifs
interface Dream {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  createdAt: string;
}

interface Goal {
  id: string;
  title: string;
  type: string;
  targetAmount: number;
  currentAmount: number;
  monthlySavings: number;
  createdAt: string;
}

// interface DreamCategory {
//   id: string;
//   name: string;
//   icon: string;
//   color: string;
// }

// interface GoalType {
//   id: string;
//   name: string;
//   icon: string;
//   color: string;
// }
export default function ExploreScreen() {
  // const router = useRouter();
  const [activeTab, setActiveTab] = useState("dreams"); // 'dreams' ou 'goals'
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showAddDream, setShowAddDream] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newDream, setNewDream] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    category: "travel",
  });
  const [newGoal, setNewGoal] = useState({
    title: "",
    type: "retirement",
    targetAmount: "",
    currentAmount: "0",
    monthlySavings: "",
  });

  // Charger les données
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

  // Sauvegarder les rêves
  const saveDreams = async (newDreams: Dream[]) => {
    try {
      await AsyncStorage.setItem(DREAMS_STORAGE, JSON.stringify(newDreams));
      setDreams(newDreams);
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    }
  };

  // Sauvegarder les objectifs
  const saveGoals = async (newGoals: Goal[]) => {
    try {
      await AsyncStorage.setItem(GOALS_STORAGE, JSON.stringify(newGoals));
      setGoals(newGoals);
    } catch (error) {
      console.error("Erreur sauvegarde:", error);
    }
  };

  // Ajouter un rêve
  const handleAddDream = () => {
    if (!newDream.name || !newDream.targetAmount) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }

    const target = parseFloat(newDream.targetAmount);
    const current = parseFloat(newDream.currentAmount) || 0;

    if (isNaN(target) || target <= 0) {
      Alert.alert("Erreur", "Montant cible invalide");
      return;
    }

    const dream = {
      id: Date.now().toString(),
      ...newDream,
      targetAmount: target,
      currentAmount: current,
      createdAt: new Date().toISOString(),
    };

    saveDreams([...dreams, dream]);
    setNewDream({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      category: "travel",
    });
    setShowAddDream(false);
  };

  // Ajouter un objectif
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

    const goal = {
      id: Date.now().toString(),
      ...newGoal,
      targetAmount: target,
      currentAmount: current,
      monthlySavings: monthly,
      createdAt: new Date().toISOString(),
    };

    saveGoals([...goals, goal]);
    setNewGoal({
      title: "",
      type: "retirement",
      targetAmount: "",
      currentAmount: "0",
      monthlySavings: "",
    });
    setShowAddGoal(false);
  };

  // Supprimer un rêve
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

  // Supprimer un objectif
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

  // Contribution rapide à un rêve
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

  // Calculer la projection d'un objectif
  const calculateProjection = (goal: Goal) => {
    if (!goal.monthlySavings || goal.monthlySavings <= 0) return null;
    const remaining = goal.targetAmount - goal.currentAmount;
    const monthsNeeded = Math.ceil(remaining / goal.monthlySavings);
    const years = Math.floor(monthsNeeded / 12);
    const months = monthsNeeded % 12;
    return { years, months, monthsNeeded };
  };

  // Rendu d'un rêve
  const renderDream = ({ item }: { item: Dream }) => {
    const category =
      DREAM_CATEGORIES.find((c) => c.id === item.category) ||
      DREAM_CATEGORIES[0];
    const progress = (item.currentAmount / item.targetAmount) * 100;

    return (
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: category.color + "20" },
            ]}
          >
            <Ionicons name={category.icon} size={24} color={category.color} />
          </View>
          <View style={styles.cardInfo}>
            <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
            <ThemedText style={styles.categoryText}>{category.name}</ThemedText>
          </View>
          <TouchableOpacity onPress={() => handleDeleteDream(item.id)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
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
          <ThemedText style={styles.progressText}>
            {progress.toFixed(1)}%
          </ThemedText>
        </View>

        <View style={styles.amountRow}>
          <View>
            <ThemedText style={styles.amountLabel}>Objectif</ThemedText>
            <ThemedText type="defaultSemiBold">
              {formatCurrency(item.targetAmount)}
            </ThemedText>
          </View>
          <View>
            <ThemedText style={styles.amountLabel}>Épargné</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{ color: COLORS.success }}
            >
              {formatCurrency(item.currentAmount)}
            </ThemedText>
          </View>
        </View>

        <View style={styles.quickAdd}>
          <ThemedText style={styles.quickAddLabel}>Ajouter :</ThemedText>
          <View style={styles.quickAddButtons}>
            {[10, 50, 100].map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.quickAddButton,
                  { backgroundColor: category.color + "20" },
                ]}
                onPress={() => addContribution(item, amount)}
              >
                <Text
                  style={[styles.quickAddButtonText, { color: category.color }]}
                >
                  {amount}€
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ThemedView>
    );
  };

  // Rendu d'un objectif
  const renderGoal = ({ item }: { item: Goal }) => {
    const goalType =
      GOAL_TYPES.find((g) => g.id === item.type) || GOAL_TYPES[0];
    const progress = (item.currentAmount / item.targetAmount) * 100;
    const projection = calculateProjection(item);

    return (
      <ThemedView style={styles.card}>
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: goalType.color + "20" },
            ]}
          >
            <Ionicons name={goalType.icon} size={24} color={goalType.color} />
          </View>
          <View style={styles.cardInfo}>
            <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
            <ThemedText style={styles.categoryText}>{goalType.name}</ThemedText>
          </View>
          <TouchableOpacity onPress={() => handleDeleteGoal(item.id)}>
            <Ionicons name="trash-outline" size={20} color={COLORS.danger} />
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
          <ThemedText style={styles.progressText}>
            {progress.toFixed(1)}%
          </ThemedText>
        </View>

        <View style={styles.amountRow}>
          <View>
            <ThemedText style={styles.amountLabel}>Objectif</ThemedText>
            <ThemedText type="defaultSemiBold">
              {formatCurrency(item.targetAmount)}
            </ThemedText>
          </View>
          <View>
            <ThemedText style={styles.amountLabel}>Actuel</ThemedText>
            <ThemedText
              type="defaultSemiBold"
              style={{ color: COLORS.success }}
            >
              {formatCurrency(item.currentAmount)}
            </ThemedText>
          </View>
        </View>

        {projection && (
          <ThemedView style={styles.projectionCard}>
            <View style={styles.projectionRow}>
              <Ionicons name="calendar" size={16} color={COLORS.textLight} />
              <ThemedText style={styles.projectionText}>
                {projection.years > 0 ? `${projection.years} an(s) ` : ""}
                {projection.months > 0 ? `${projection.months} mois` : ""}
                {projection.monthsNeeded === 0 ? "Objectif atteint !" : ""}
              </ThemedText>
            </View>
            <View style={styles.projectionRow}>
              <Ionicons name="cash" size={16} color={COLORS.textLight} />
              <ThemedText style={styles.projectionText}>
                {formatCurrency(item.monthlySavings)}/mois
              </ThemedText>
            </View>
          </ThemedView>
        )}
      </ThemedView>
    );
  };

  // Calcul des stats
  const totalDreamsTarget: number = dreams.reduce(
    (sum, d) => sum + d.targetAmount,
    0,
  );
  const totalDreamsCurrent: number = dreams.reduce(
    (sum, d) => sum + d.currentAmount,
    0,
  );
  const totalGoalsTarget: number = goals.reduce(
    (sum, g) => sum + g.targetAmount,
    0,
  );
  const totalGoalsCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="star.circle.fill"
          style={styles.headerImage}
        />
      }
    >
      {/* Header avec titre */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.title}>
          🎯 Mes Objectifs
        </ThemedText>
      </ThemedView>

      {/* Statistiques globales */}
      {/* <ThemedView style={styles.statsContainer}>
        <View style={styles.statCard}>
          <ThemedText style={styles.statValue}>{dreams.length}</ThemedText>
          <ThemedText style={styles.statLabel}>Rêves</ThemedText>
        </View>
        <View style={styles.statCard}>
          <ThemedText style={styles.statValue}>{goals.length}</ThemedText>
          <ThemedText style={styles.statLabel}>Objectifs</ThemedText>
        </View>
        <View style={styles.statCard}>
          <ThemedText style={styles.statValue}>
            {formatCurrency(totalDreamsCurrent + totalGoalsCurrent)}
          </ThemedText>
          <ThemedText style={styles.statLabel}>Épargné</ThemedText>
        </View>
      </ThemedView> */}

      {/* Statistiques globales */}
      <ThemedView style={styles.statsContainer}>
        {/* Première ligne : compteurs */}
        <View style={styles.statCard}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>{dreams.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Rêves</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>{goals.length}</ThemedText>
            <ThemedText style={styles.statLabel}>Objectifs</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>
              {formatCurrency(totalDreamsCurrent + totalGoalsCurrent)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Épargné</ThemedText>
          </View>
        </View>

        {/* Deuxième ligne : objectifs */}
        <View style={styles.statCard}>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>
              {formatCurrency(totalDreamsTarget)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Objectif rêves</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>
              {formatCurrency(totalGoalsTarget)}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Objectif objectifs</ThemedText>
          </View>
          <View style={styles.statCard}>
            <ThemedText style={styles.statValue}>
              {(
                ((totalDreamsCurrent + totalGoalsCurrent) /
                  (totalDreamsTarget + totalGoalsTarget)) *
                  100 || 0
              ).toFixed(1)}
              %
            </ThemedText>
            <ThemedText style={styles.statLabel}>Progrès global</ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "dreams" && styles.activeTab]}
          onPress={() => setActiveTab("dreams")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "dreams" && styles.activeTabText,
            ]}
          >
            💭 Rêves
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "goals" && styles.activeTab]}
          onPress={() => setActiveTab("goals")}
        >
          <ThemedText
            style={[
              styles.tabText,
              activeTab === "goals" && styles.activeTabText,
            ]}
          >
            📊 Objectifs
          </ThemedText>
        </TouchableOpacity>
      </View>

      {/* Contenu selon l'onglet */}
      {activeTab === "dreams" ? (
        <>
          {/* Bouton ajout rêve */}
          {!showAddDream ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddDream(true)}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              <ThemedText style={styles.addButtonText}>
                Ajouter un rêve
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <ThemedView style={styles.formCard}>
              <ThemedText type="subtitle">Nouveau rêve</ThemedText>

              <TextInput
                style={styles.input}
                placeholder="Nom du rêve"
                value={newDream.name}
                onChangeText={(text) =>
                  setNewDream({ ...newDream, name: text })
                }
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Montant objectif (€)"
                value={newDream.targetAmount}
                onChangeText={(text) =>
                  setNewDream({ ...newDream, targetAmount: text })
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Déjà épargné (€)"
                value={newDream.currentAmount}
                onChangeText={(text) =>
                  setNewDream({ ...newDream, currentAmount: text })
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
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
                      newDream.category === cat.id && styles.categoryChipActive,
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
                  <ThemedText>Annuler</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton]}
                  onPress={handleAddDream}
                >
                  <ThemedText style={{ color: "white" }}>Ajouter</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          )}

          {/* Liste des rêves */}
          {/* <FlatList
            data={dreams}
            keyExtractor={(item) => item.id}
            renderItem={renderDream}
            scrollEnabled={false}
            ListEmptyComponent={
              !showAddDream && (
                <ThemedView style={styles.emptyContainer}>
                  <Ionicons
                    name="heart-outline"
                    size={50}
                    color={COLORS.textLight}
                  />
                  <ThemedText style={styles.emptyText}>
                    Aucun rêve pour le moment
                  </ThemedText>
                </ThemedView>
              )
            }
          /> */}

          <FlatList
            data={dreams}
            keyExtractor={(item) => item.id}
            renderItem={renderDream}
            scrollEnabled={false}
            ListEmptyComponent={
              !showAddDream ? (
                <ThemedView style={styles.emptyContainer}>
                  <Ionicons
                    name="heart-outline"
                    size={50}
                    color={COLORS.textLight}
                  />
                  <ThemedText style={styles.emptyText}>
                    Aucun rêve pour le moment
                  </ThemedText>
                </ThemedView>
              ) : null // 👈 Important: retourner null quand showAddDream est true
            }
          />
        </>
      ) : (
        <>
          {/* Bouton ajout objectif */}
          {!showAddGoal ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowAddGoal(true)}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              <ThemedText style={styles.addButtonText}>
                Ajouter un objectif
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <ThemedView style={styles.formCard}>
              <ThemedText type="subtitle">Nouvel objectif</ThemedText>

              <TextInput
                style={styles.input}
                placeholder="Titre"
                value={newGoal.title}
                onChangeText={(text) => setNewGoal({ ...newGoal, title: text })}
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Montant objectif (€)"
                value={newGoal.targetAmount}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, targetAmount: text })
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Déjà épargné (€)"
                value={newGoal.currentAmount}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, currentAmount: text })
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
              />

              <TextInput
                style={styles.input}
                placeholder="Épargne mensuelle (€)"
                value={newGoal.monthlySavings}
                onChangeText={(text) =>
                  setNewGoal({ ...newGoal, monthlySavings: text })
                }
                keyboardType="numeric"
                placeholderTextColor="#999"
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
                  <ThemedText>Annuler</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.formButton, styles.saveButton]}
                  onPress={handleAddGoal}
                >
                  <ThemedText style={{ color: "white" }}>Ajouter</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
          )}

          {/* Liste des objectifs */}
          {/* <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={renderGoal}
            scrollEnabled={false}
            ListEmptyComponent={
              !showAddGoal && (
                <ThemedView style={styles.emptyContainer}>
                  <Ionicons
                    name="flag-outline"
                    size={50}
                    color={COLORS.textLight}
                  />
                  <ThemedText style={styles.emptyText}>
                    Aucun objectif pour le moment
                  </ThemedText>
                </ThemedView>
              )
            }
          /> */}

          <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={renderGoal}
            scrollEnabled={false}
            ListEmptyComponent={
              !showAddGoal ? (
                <ThemedView style={styles.emptyContainer}>
                  <Ionicons
                    name="flag-outline"
                    size={50}
                    color={COLORS.textLight}
                  />
                  <ThemedText style={styles.emptyText}>
                    Aucun objectif pour le moment
                  </ThemedText>
                </ThemedView>
              ) : null // 👈 Important: retourner null quand showAddGoal est true
            }
          />
        </>
      )}
    </ParallaxScrollView>
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
  title: {
    fontSize: 32,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.03)",
    borderRadius: 12,
    marginBottom: 16,
  },
  statCard: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
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
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.primary + "40",
    borderStyle: "dashed",
  },
  addButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    marginLeft: 8,
    fontWeight: "500",
  },
  formCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
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
    borderColor: COLORS.primary,
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
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
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
  categoryText: {
    fontSize: 13,
    color: "#666",
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
    color: "#666",
    marginBottom: 2,
  },
  quickAdd: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
    paddingTop: 12,
  },
  quickAddLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  quickAddButtons: {
    flexDirection: "row",
  },
  quickAddButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  quickAddButtonText: {
    fontSize: 13,
    fontWeight: "500",
  },
  projectionCard: {
    marginTop: 12,
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
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 12,
  },
});
