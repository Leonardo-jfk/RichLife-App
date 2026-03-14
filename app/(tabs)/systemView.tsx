import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { useAppTheme } from "../../src/hooks/useAppTheme";

export default function SystemView() {
  const { theme, colors, isLoading, toggleTheme } = useAppTheme();

  if (isLoading) {
    return (
      <BackgroundImage opacity={0.6} blurRadius={2}>
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
      <View style={styles.container}>
        <IslandCard>
          <Text style={[styles.title, { color: colors.text }]}>
            Paramètres Système
          </Text>

          {/* Bouton de changement de thème */}
          <TouchableOpacity
            style={[
              styles.themeButton,
              { backgroundColor: colors.icon + "20" },
            ]}
            onPress={toggleTheme}
          >
            <View style={styles.themeButtonContent}>
              <Ionicons
                name={theme === "light" ? "sunny" : "moon"}
                size={24}
                color={theme === "light" ? "#FDB813" : "#F1C40F"}
              />
              <Text style={[styles.themeButtonText, { color: colors.text }]}>
                Mode {theme === "light" ? "Clair" : "Sombre"}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </View>
          </TouchableOpacity>

          {/* Informations système */}
          <View style={styles.infoContainer}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Informations
            </Text>
            <View
              style={[
                styles.infoRow,
                { borderBottomColor: colors.icon + "20" },
              ]}
            >
              <Text style={[styles.infoLabel, { color: colors.icon }]}>
                Thème actuel
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {theme === "light" ? "Clair" : "Sombre"}
              </Text>
            </View>
            <View
              style={[
                styles.infoRow,
                { borderBottomColor: colors.icon + "20" },
              ]}
            >
              <Text style={[styles.infoLabel, { color: colors.icon }]}>
                Version
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                1.0.0
              </Text>
            </View>
          </View>
        </IslandCard>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  themeButton: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  themeButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeButtonText: {
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  infoContainer: {
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
});
