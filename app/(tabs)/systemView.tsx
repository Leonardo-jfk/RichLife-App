import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { COLORS } from "../../src/constants/colors";
import { CURRENCIES, useCurrency } from "../../src/context/CurrencyContext";
import { useLanguage } from "../../src/context/LanguageContext"; // Vérifie le nombre de ../
import { useTheme } from "../../src/context/ThemeContext";

import { useLanguage, AVAILABLE_LANGUAGES } from "../../src/context/LanguageContext";


export default function SystemView() {
  const { theme, colors, isLoading, toggleTheme } = useTheme();
  const { currency, setCurrency, getCurrencyInfo } = useCurrency();
  const [notifications, setNotifications] = useState(true);
  const [biometric, setBiometric] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const currentCurrencyInfo = getCurrencyInfo(currency);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const filteredCurrencies = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(searchText.toLowerCase()) ||
      c.name.toLowerCase().includes(searchText.toLowerCase()),
  );

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

  const { language, setLanguage, t } = useLanguage();

  // const LANGUAGES = [
  //   { code: "fr", name: "Français", flag: "🇫🇷" },
  //   { code: "en", name: "English", flag: "🇬🇧" },
  //   { code: "es", name: "Español", flag: "🇪🇸" },
  //   { code: "de", name: "Deutsch", flag: "🇩🇪" },
  // ];
  const LANGUAGES = AVAILABLE_LANGUAGES;

  if (isLoading) {
    return (
      <BackgroundImage imageTheme="system" opacity={0.9} blurRadius={2}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>
            Chargement...
          </Text>
        </View>
      </BackgroundImage>
    );
  }

  return (
    <BackgroundImage imageTheme="default" opacity={0.9} blurRadius={2}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontFamily: "FrenchScript",
              fontSize: 40,
              color: colors.text,
              textAlign: "center",
            }}
          >
            Time is limited
          </Text>
          {/* <Text style={[styles.title, { color: colors.text }]}>
            Résumé du Mois
          </Text> */}
        </View>

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
            onPress={toggleTheme}
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
                {theme === "light" ? "Clair" : "Sombre"}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.icon} />
            </View>
          </TouchableOpacity>
        </IslandCard>

        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t.system.language}
          </Text>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={styles.settingRow}
              onPress={() => setLanguage(lang.code as any)}
            >
              <Text style={{ color: colors.text }}>
                {lang.flag} {lang.name}
              </Text>
              {language === lang.code && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
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

          {/* Devise - Bouton qui ouvre le modal */}
          <TouchableOpacity
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
            onPress={() => setShowCurrencyModal(true)}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.currencyFlag}>
                {currentCurrencyInfo.flag}
              </Text>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Devise
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.primary }]}>
                {currency} - {currentCurrencyInfo.name}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.icon} />
            </View>
          </TouchableOpacity>
        </IslandCard>

        <TouchableOpacity
          style={[
            styles.titleContainer,
            { backgroundColor: colors.icon + "20" },
          ]}
          onPress={() => setShowLanguageModal(true)}
        >
          <View style={styles.settingLeft}>
            <View
              style={[styles.titleContainer, { backgroundColor: "#8B5CF620" }]}
            >
              <Ionicons name="language" size={22} color="#8B5CF6" />
            </View>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t.system.language}{" "}
                {/* On utilise 'language' au lieu de 'languageLabel' */}
              </Text>

              <Text style={[styles.infoLabel, { color: colors.textLight }]}>
                {language.toUpperCase()}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textLight} />
        </TouchableOpacity>

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
              <Ionicons name="download-outline" size={22} color={colors.text} />
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
              <Ionicons
                name="cloud-upload-outline"
                size={22}
                color={colors.text}
              />
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

      {/* Modal de Langue */}
      <Modal
        visible={showLanguageModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: theme === "dark" ? "#1A1A1A" : "#FFF" },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Choisir la langue
              </Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {[
              { code: "fr", name: "Français", flag: "🇫🇷" },
              { code: "en", name: "English", flag: "🇬🇧" },
              { code: "es", name: "Español", flag: "🇪🇸" },
              { code: "de", name: "Deutsch", flag: "🇩🇪" },
            ].map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.currencyItem,
                  language === lang.code && {
                    backgroundColor: colors.primary + "20",
                  },
                ]}
                onPress={() => {
                  setLanguage(lang.code as any);
                  setShowLanguageModal(false);
                }}
              >
                <Text style={{ fontSize: 24, marginRight: 12 }}>
                  {lang.flag}
                </Text>
                <Text style={[styles.currencyName, { color: colors.text }]}>
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <Ionicons
                    name="checkmark-circle"
                    size={20}
                    color={colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Modal pour sélectionner la devise */}
      <Modal
        visible={showCurrencyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCurrencyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.background },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Sélectionner une devise
              </Text>
              <TouchableOpacity onPress={() => setShowCurrencyModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {/* Recherche */}
            <View
              style={[
                styles.searchContainer,
                { backgroundColor: colors.icon + "20" },
              ]}
            >
              <Ionicons name="search" size={20} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Rechercher..."
                placeholderTextColor={COLORS.textLight}
                value={searchText}
                onChangeText={setSearchText}
              />
              {searchText !== "" && (
                <TouchableOpacity onPress={() => setSearchText("")}>
                  <Ionicons name="close-circle" size={20} color={colors.icon} />
                </TouchableOpacity>
              )}
            </View>

            {/* Liste des devises */}
            <FlatList
              data={filteredCurrencies}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.currencyItem,
                    { borderBottomColor: colors.icon + "20" },
                    currency === item.code && {
                      backgroundColor: colors.primary + "20",
                    },
                  ]}
                  onPress={() => {
                    setCurrency(item.code);
                    setShowCurrencyModal(false);
                    setSearchText("");
                  }}
                >
                  <View style={styles.currencyInfo}>
                    <Text style={styles.flag}>{item.flag}</Text>
                    <View>
                      <Text
                        style={[styles.currencyCode, { color: colors.text }]}
                      >
                        {item.code}
                      </Text>
                      <Text
                        style={[
                          styles.currencyName,
                          { color: COLORS.textLight },
                        ]}
                      >
                        {item.name}
                      </Text>
                    </View>
                  </View>
                  {currency === item.code && (
                    <Ionicons
                      name="checkmark-circle"
                      size={24}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalListContent}
            />
          </View>
        </View>
      </Modal>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
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
  title: {
    // ← Défini ici
    fontSize: 28,
    fontWeight: "bold",
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
  currencyFlag: {
    fontSize: 22,
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  modalListContent: {
    paddingBottom: 30,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  currencyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flag: {
    fontSize: 28,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "600",
  },
  currencyName: {
    fontSize: 12,
    marginTop: 2,
  },
});
