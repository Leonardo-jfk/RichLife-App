// IslandCard.tsx
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface IslandCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
  compact?: boolean;
  paddingTop?: number; // ← Padding seulement en haut
  paddingBottom?: number; // ← Padding seulement en bas
  paddingLeft?: number; // ← Padding seulement à gauche
  paddingRight?: number; // ← Padding seulement à droite
}

export default function IslandCard({
  children,
  style,
  noPadding = false,
  compact = false,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
}: IslandCardProps) {
  const { theme } = useTheme();

  const backgroundColor =
    theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.4)";

  const borderColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.8)";

  // Style par défaut
  let paddingStyle = {};

  if (noPadding) {
    paddingStyle = { padding: 0, paddingVertical: 0, paddingHorizontal: 0 };
  } else if (compact) {
    paddingStyle = { paddingVertical: 8, paddingHorizontal: 12 };
  } else if (
    paddingTop !== undefined ||
    paddingBottom !== undefined ||
    paddingLeft !== undefined ||
    paddingRight !== undefined
  ) {
    // Padding personnalisé
    paddingStyle = {
      paddingTop: paddingTop ?? 20,
      paddingBottom: paddingBottom ?? 20,
      paddingLeft: paddingLeft ?? 16,
      paddingRight: paddingRight ?? 16,
    };
  } else {
    // Padding par défaut
    paddingStyle = { padding: 20, paddingVertical: 20, paddingHorizontal: 16 };
  }

  return (
    <View
      style={[
        styles.card,
        paddingStyle,
        { backgroundColor, borderColor },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    marginBottom: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
});
