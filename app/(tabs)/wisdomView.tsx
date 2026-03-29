import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { COLORS } from "../../src/constants/colors";
import { useTheme } from "../../src/context/ThemeContext";

// Nouvelles citations enrichies avec des icônes valides
const QUOTES = [
  {
    id: "1",
    author: "Warren Buffett",
    text: "N'économisez pas ce qui reste après avoir dépensé, mais dépensez ce qui reste après avoir économisé.",
    category: "Économiser",
    icon: "wallet", // ← changé de wallet-outline à wallet
    tags: ["épargne", "budget"],
  },
  {
    id: "2",
    author: "Alex Hormozi",
    text: "Le minimalisme n'est pas de ne rien posséder, c'est de ne rien posséder qui vous possède.",
    category: "Minimalisme",
    icon: "leaf",
    tags: ["simplicité", "liberté"],
  },
  {
    id: "3",
    author: "Arnold Schwarzenegger",
    text: "L'argent ne fait pas le bonheur. Je suis maintenant aussi heureux avec 50 millions qu'avec 48 millions.",
    category: "Investir",
    icon: "trending-up",
    tags: ["bonheur", "argent"],
  },
  {
    id: "4",
    author: "Warren Buffett",
    text: "Le meilleur investissement que vous puissiez faire est de miser sur vous-même.",
    category: "Investir",
    icon: "person",
    tags: ["développement", "compétences"],
  },
  {
    id: "5",
    author: "Naval Ravikant",
    text: "Skills make you rich, not money. Le vrai capital, c'est ce que vous savez faire.",
    category: "Compétences",
    icon: "school",
    tags: ["compétences", "richesse"],
  },
  {
    id: "6",
    author: "Jim Rohn",
    text: "Keep track of your achievements. This week, this month, quarter, year.",
    category: "Objectifs",
    icon: "checkbox",
    tags: ["objectifs", "suivi"],
  },
  {
    id: "7",
    author: "Peter Lynch",
    text: "Always Sell Your Worst Stock First. Coupez vos pertes, laissez courir vos gains.",
    category: "Investir",
    icon: "trending-down",
    tags: ["investissement", "stratégie"],
  },
  {
    id: "8",
    author: "Henry Ford",
    text: "Whether you believe you can do a thing or not, you are right.",
    category: "Mentalité",
    icon: "bulb",
    tags: ["croyance", "confiance"],
  },
  {
    id: "9",
    author: "John LeBlanc",
    text: "Later equals never. Si ce n'est pas maintenant, ce ne sera jamais.",
    category: "Action",
    icon: "time",
    tags: ["procrastination", "action"],
  },
  {
    id: "10",
    author: "Keanu Reeves",
    text: "A man who controls his stomach, penis and tongue has solved 99% of life's problems.",
    category: "Discipline",
    icon: "fitness",
    tags: ["discipline", "maîtrise de soi"],
  },
  {
    id: "11",
    author: "Charlie Munger",
    text: "Le secret pour être riche ? Arrêtez d'essayer d'être riche et devenez compétent.",
    category: "Compétences",
    icon: "school",
    tags: ["compétences", "richesse"],
  },
  {
    id: "12",
    author: "Ray Dalio",
    text: "La douleur + la réflexion = progrès. Acceptez la douleur comme un signal de croissance.",
    category: "Croissance",
    icon: "trending-up",
    tags: ["progrès", "apprentissage"],
  },
];

// Catégories pour les boutons
const CATEGORIES = [
  { id: "all", name: "Tous", icon: "apps" },
  { id: "Compétences", name: "Compétences", icon: "school" },
  { id: "Investir", name: "Investir", icon: "trending-up" },
  { id: "Économiser", name: "Économiser", icon: "wallet" },
  { id: "Mentalité", name: "Mentalité", icon: "bulb" },
  { id: "Action", name: "Action", icon: "flash" },
  { id: "Discipline", name: "Discipline", icon: "fitness" },
  { id: "Minimalisme", name: "Minimalisme", icon: "leaf" },
];

// Tags populaires
const TAGS = [
  "compétences",
  "investissement",
  "épargne",
  "action",
  "discipline",
  "objectifs",
];

// Conseils par situation
const situationAdvice = {
  lowIncome: {
    title: "💰 Quand tu gagnes moins de 100k/an",
    advice: [
      "Focus sur l'augmentation de tes compétences (Skills make you rich)",
      "Épargne 10-20% même si c'est difficile",
      "Investis dans ta formation (livres, cours)",
      "Crée des sources de revenus additionnelles",
      "Vérifie tes dépenses mensuelles",
    ],
    icon: "trending-down",
  },
  highIncome: {
    title: "📈 Quand tu gagnes plus de 100k/an",
    advice: [
      "Ne pas augmenter ton train de vie proportionnellement",
      "Investis 50-70% de ton surplus",
      "Diversifie tes investissements",
      "Pense à l'immobilier et aux actions",
      "Prépare ta retraite tôt",
    ],
    icon: "trending-up",
  },
  investment: {
    title: "📊 Stratégies d'investissement",
    advice: [
      "Always Sell Your Worst Stock First",
      "Diversifie ton portefeuille",
      "Investis dans ce que tu comprends",
      "La patience est ta meilleure amie",
      "Les intérêts composés sont magiques",
    ],
    icon: "stats-chart",
  },
  mindset: {
    title: "🧠 Mentalité gagnante",
    advice: [
      "Whether you believe you can or not, you're right",
      "Later equals never - agis maintenant",
      "Contrôle ton esprit et tes émotions",
      "Keep track of your achievements",
      "La douleur + réflexion = progrès",
    ],
    icon: "bulb",
  },
};

const AdviceCard = ({ advice, colors }: { advice: any; colors: any }) => (
  <IslandCard compact style={styles.adviceCardWrapper}>
    <TouchableOpacity style={styles.adviceCard} onPress={() => {}}>
      <Ionicons name={advice.icon as any} size={28} color={colors.primary} />
      <Text style={[styles.adviceTitle, { color: colors.text }]}>
        {advice.title}
      </Text>
      <View style={styles.adviceList}>
        {advice.advice.slice(0, 3).map((item: string, i: number) => (
          <Text
            key={i}
            style={[styles.adviceText, { color: colors.textLight }]}
          >
            • {item}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  </IslandCard>
);

export default function WisdomView() {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filtrer les citations
  const filteredQuotes = QUOTES.filter((quote) => {
    if (selectedCategory !== "all" && quote.category !== selectedCategory)
      return false;
    if (selectedTag && !quote.tags.includes(selectedTag)) return false;
    return true;
  });

  return (
    // <BackgroundImage imageTheme="wisdom" opacity={0.92} blurRadius={2}>
    <BackgroundImage
      imageTheme="wisdom"
      opacity={0.9}
      blurRadius={2}
      overlayColor="#000000"
      overlayOpacity={0.4}
    >
      <ScrollView
        // contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
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
            Sagesse Financière
          </Text>
        </View>
        {/* <IslandCard noPadding > */}
        {/* <IslandCard compact style={styles.tagsCard}> */}
        <IslandCard paddingBottom={2}>
          <Text style={[styles.headerSubtitle, { color: colors.textLight }]}>
            La vraie richesse ne est pas de dépenser des millions, mais de vivre
            heureux avec 5 à 10 % de ses revenus.
          </Text>
        </IslandCard>

        {/* Conseils par situation */}
        <View style={styles.sectionHeader}>
          <Ionicons name="bulb" size={20} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Conseils par situation
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.adviceScroll}
          contentContainerStyle={styles.adviceScrollContent}
        >
          <AdviceCard advice={situationAdvice.lowIncome} colors={colors} />
          <AdviceCard advice={situationAdvice.highIncome} colors={colors} />
          <AdviceCard advice={situationAdvice.investment} colors={colors} />
          <AdviceCard advice={situationAdvice.mindset} colors={colors} />
        </ScrollView>

        {/* Catégories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.id && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Ionicons
                name={cat.icon as any}
                size={16}
                color={selectedCategory === cat.id ? "#000000ff" : colors.text}
              />
              <Text
                style={[
                  styles.categoryChipText,
                  {
                    color:
                      selectedCategory === cat.id ? "#000000ff" : colors.text,
                  },
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tags */}
        <IslandCard paddingBottom={1}>
          <View style={styles.tagsContainer}>
            {TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagChip,
                  selectedTag === tag && {
                    backgroundColor: colors.primary + "20",
                  },
                ]}
                onPress={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color:
                        selectedTag === tag ? colors.primary : colors.textLight,
                    },
                  ]}
                >
                  #{tag}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </IslandCard>

        {/* Liste des citations */}
        {filteredQuotes.map((item) => (
          <IslandCard key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={colors.primary}
              />
              <Text style={[styles.category, { color: colors.primary }]}>
                {item.category}
              </Text>
            </View>
            <Text style={[styles.quoteText, { color: colors.text }]}>
              {`"${item.text}"`}
            </Text>
            <Text style={[styles.author, { color: COLORS.textLight }]}>
              — {item.author}
            </Text>
            <View style={styles.tagRow}>
              {item.tags.map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.quoteTag}
                  onPress={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                >
                  <Text
                    style={[styles.quoteTagText, { color: colors.textLight }]}
                  >
                    #{tag}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </IslandCard>
        ))}

        {filteredQuotes.length === 0 && (
          <IslandCard noPadding style={styles.tagIslandCard}>
            <Text style={[styles.emptyText, { color: colors.textLight }]}>
              Aucune citation trouvée
            </Text>
          </IslandCard>
        )}
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  headerTitle: { fontSize: 32, fontWeight: "bold", marginBottom: 8 },
  headerSubtitle: {
    fontSize: 14,
    marginBottom: 24,
    marginHorizontal: 16,
    textAlign: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600" },
  adviceScroll: { flexDirection: "row", marginBottom: 24 },
  adviceCard: { width: 280, padding: 16, borderRadius: 16, marginRight: 12 },
  adviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 12,
  },
  adviceText: { fontSize: 13, marginBottom: 6, lineHeight: 18 },
  categoriesScroll: { flexDirection: "row", marginBottom: 16 },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
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
  categoryChipText: { fontSize: 14, fontWeight: "500" },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 20 },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { fontSize: 12 },
  card: { marginBottom: 15, padding: 20 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  category: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
  },
  quoteText: { fontSize: 18, fontStyle: "italic", lineHeight: 26 },
  author: { marginTop: 12, textAlign: "right", fontWeight: "bold" },
  tagRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
  quoteTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  quoteTagText: { fontSize: 10 },
  emptyCard: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 16 },

  tagIslandCard: {
    borderRadius: 10, // ← Bord arrondi pour les tags
    overflow: "hidden",
  },

  tagsCard: {
    paddingVertical: 1, // ← Réduit l'espace interne haut/bas
    paddingHorizontal: 12, // ← Peut aussi réduire l'espace latéral
  },

  adviceScrollContent: {
    paddingHorizontal: 16,
  },
  adviceCardWrapper: {
    marginRight: 12,
    width: 280,
  },

  adviceList: {
    gap: 6,
  },
});
