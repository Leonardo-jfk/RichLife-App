// app/(tabs)/wisdomView.tsx
import { COLORS } from "@/src/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { useTheme } from "../../src/context/ThemeContext";

const QUOTES = [
  {
    id: "1",
    author: "Warren Buffett",
    text: "N'économisez pas ce qui reste après avoir dépensé, mais dépensez ce qui reste après avoir économisé.",
    category: "Économiser",
    icon: "wallet-outline",
  },
  {
    id: "2",
    author: "Alex Hormozi",
    text: "Le minimalisme n'est pas de ne rien posséder, c'est de ne rien posséder qui vous possède.",
    category: "Minimalisme",
    icon: "leaf-outline",
  },
  {
    id: "3",
    author: "Arnold Schwarzenegger",
    text: "L'argent ne fait pas le bonheur. Je suis maintenant aussi heureux avec 50 millions qu'avec 48 millions.",
    category: "Investir",
    icon: "trending-up-outline",
  },
  {
    id: "4",
    author: "Warren Buffett",
    text: "Le meilleur investissement que vous puissiez faire est de miser sur vous-même.",
    category: "Investir",
    icon: "person-outline",
  },
];

export default function WisdomView() {
  const { colors } = useTheme();

  return (
    <BackgroundImage imageTheme="wisdom" opacity={0.5} blurRadius={3}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Sagesse
        </Text>

        {QUOTES.map((item) => (
          <IslandCard key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={colors.primary}
              />
              <Text
                style={[styles.category, { color: colors.primary }]}
              >{`"${item.text}"`}</Text>
            </View>
            <Text style={[styles.quoteText, { color: colors.text }]}>
              {`"${item.text}"`}
            </Text>
            <Text style={[styles.author, { color: COLORS.textLight }]}>
              — {item.author}
            </Text>
          </IslandCard>
        ))}
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  card: { marginBottom: 15, padding: 20 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  category: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 12,
    textTransform: "uppercase",
  },
  quoteText: { fontSize: 18, fontStyle: "italic", lineHeight: 26 },
  author: { marginTop: 10, textAlign: "right", fontWeight: "bold" },
});
