import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface IslandCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function IslandCard({ children, style }: IslandCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    // L'effet "Glass" : fond blanc très transparent
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    // Bordure fine pour l'effet brillant
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    // Ombre légère (boxShadow pour les versions récentes)
    boxShadow: "0 8 32 rgba(0, 0, 0, 0.3)",
  },
});
