import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { useCurrency } from "../../src/context/CurrencyContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function SystemView() {
  const { theme, colors, isLoading } = useTheme();
  // const { theme, colors, isLoading, toggleTheme } = useTheme();
  const { currency, setCurrency } = useCurrency(); // ← Ajoutez ceci

  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  // const [currency, setCurrency] = useState("EUR");
  // const [forceUpdate, setForceUpdate] = useState(0);

  // const handleToggleTheme = () => {
  //   toggleTheme();
  //   // setForceUpdate((prev) => prev + 1); // Force le re-rendu
  // };

  const clearAllData = () => {
    Alert.alert(
      "Effacer toutes les données",
      "Êtes-vous sûr de vouloir supprimer toutes vos transactions, rêves et objectifs ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Effacer",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                "@finance_app_dreams",
                "@finance_app_goals",
                "@finance_app_transactions",
              ]);
              Alert.alert("Succès", "Toutes les données ont été effacées.");
            } catch (error) {
              console.error("Erreur lors de l'effacement:", error);
              Alert.alert("Erreur", "Impossible d'effacer les données.");
            }
          },
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <BackgroundImage
        // key={`bg-loading-${forceUpdate}`}
        opacity={0.9}
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
    <BackgroundImage
      // key={`bg-loading-${forceUpdate}`}
      opacity={0.9}
      blurRadius={2}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Apparence */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="color-palette" size={20} color={colors.text} />{" "}
            Apparence
          </Text>

          <TouchableOpacity
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
            // onPress={handleToggleTheme}
            // onPress={toggleTheme}
            onPress={() => {
              const currencies = ["EUR", "USD", "GBP", "CHF", "ARS"];
              const currentIndex = currencies.indexOf(currency);
              const nextCurrency = currencies[
                (currentIndex + 1) % currencies.length
              ] as any;
              setCurrency(nextCurrency);
            }}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name={theme === "light" ? "sunny" : "moon"}
                size={22}
                color={theme === "light" ? "#FDB813" : "#F1C40F"}
              />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Mode {theme === "light" ? "Clair" : "Sombre"}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.icon }]}>
                {theme === "light" ? "Clair" : "Sombre"} {currency}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.icon} />
            </View>
          </TouchableOpacity>
        </IslandCard>

        {/* Préférences */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="settings" size={20} color={colors.text} />{" "}
            Préférences
          </Text>

          <View
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Notifications
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={notifications ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="finger-print" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Biométrie
              </Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={biometric ? "#fff" : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
            onPress={() => {
              // const currencies = ["EUR", "USD", "GBP", "CHF"];
              const currencies = ["EUR", "USD", "GBP", "CHF", "ARS"]; // ← Ajout de ARS
              const currentIndex = currencies.indexOf(currency);
              // const nextCurrency =
              //   currencies[(currentIndex + 1) % currencies.length];
              // setCurrency(nextCurrency);
              const nextCurrency = currencies[
                (currentIndex + 1) % currencies.length
              ] as "EUR" | "USD" | "GBP" | "CHF" | "ARS";
              setCurrency(nextCurrency);
            }}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="cash" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Devise
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.primary }]}>
                {currency}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.icon} />
            </View>
          </TouchableOpacity>
        </IslandCard>

        {/* Informations */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="information-circle" size={20} color={colors.text} />{" "}
            Informations
          </Text>

          <View
            style={[styles.infoRow, { borderBottomColor: colors.icon + "20" }]}
          >
            <Text style={[styles.infoLabel, { color: colors.icon }]}>
              Version
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              1.0.0
            </Text>
          </View>

          <View
            style={[styles.infoRow, { borderBottomColor: colors.icon + "20" }]}
          >
            <Text style={[styles.infoLabel, { color: colors.icon }]}>
              Build
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              2024.03.14
            </Text>
          </View>

          <View
            style={[styles.infoRow, { borderBottomColor: colors.icon + "20" }]}
          >
            <Text style={[styles.infoLabel, { color: colors.icon }]}>
              Développeur
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              Your Name
            </Text>
          </View>
        </IslandCard>

        {/* Actions */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="warning" size={20} color={colors.text} /> Actions
          </Text>

          <TouchableOpacity
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
            onPress={() => Alert.alert("Export", "Fonctionnalité à venir")}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="download" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Exporter les données
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
            onPress={() => Alert.alert("Import", "Fonctionnalité à venir")}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="warning" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Importer des données
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dangerButton]}
            onPress={clearAllData}
          >
            <Ionicons name="trash" size={22} color="#fff" />
            <Text style={styles.dangerButtonText}>
              Effacer toutes les données
            </Text>
          </TouchableOpacity>
        </IslandCard>

        {/* Espace en bas */}
        <View style={{ height: 20 }} />
      </ScrollView>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingValue: {
    fontSize: 14,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  dangerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
