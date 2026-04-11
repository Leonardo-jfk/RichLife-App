


import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
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
import BackgroundImage from "../src/components/BackgroundImage";
import IslandCard from "../src/components/IslandCard";
import { COLORS } from "../src/constants/colors";
import { CURRENCIES, useCurrency } from "../src/context/CurrencyContext";
import { useLanguage, AVAILABLE_LANGUAGES } from "../src/context/LanguageContext";
import { useTheme } from "../src/context/ThemeContext";
import { useDailyReminder } from "../src/hooks/useDailyReminder";
import WeeklySummarySettings from "../src/components/WeeklySummarySettings";




export default function SystemView() {

  const { theme, colors, isLoading, toggleTheme } = useTheme();
  const { currency, setCurrency, getCurrencyInfo } = useCurrency();
  const { language, setLanguage, t } = useLanguage();

  const [biometric, setBiometric] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const currentCurrencyInfo = getCurrencyInfo(currency);
  const filteredCurrencies = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(searchText.toLowerCase()) ||
      c.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  // const {
  //   areNotificationsEnabled,
  //   setNotificationsEnabled,
  //   sendReminder,
  // } = useDailyReminder();

  // FIX: une seule variable d'état pour les notifications
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);

  useEffect(() => {
    const loadNotificationPref = async () => {
      const enabled = await areNotificationsEnabled();
      setNotificationsEnabledState(enabled);
    };
    loadNotificationPref();
  }, []);

  const handleToggleNotifications = async (value: boolean) => {
    setNotificationsEnabledState(value);
    await setNotificationsEnabled(value);
    if (value) {
      Alert.alert("✅", "Notifications activées ! Vous recevrez un rappel chaque jour à 19h.");
      await sendReminder();
    } else {
      Alert.alert("🔕", "Notifications désactivées.");
    }
  };

  const clearAllData = () => {
    Alert.alert(
      t.system.clearAllData,
      t.system.clearDataConfirm,
      [
        { text: t.common.cancel, style: "cancel" },
        {
          text: t.common.delete,
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove([
                "@finance_app_dreams",
                "@finance_app_goals",
                "@finance_app_transactions",
              ]);
              Alert.alert(t.common.success, t.system.clearDataSuccess);
            } catch (error) {
              console.error("Erreur lors de l'effacement:", error);
              Alert.alert(t.common.error, t.system.clearDataError);
            }
          },
        },
      ],
    );
  };

   const {
  areNotificationsEnabled,
  setNotificationsEnabled,
  sendReminder,
  getWeeklySummaryEnabled,
  setWeeklySummaryEnabled,
  getWeeklySummarySchedule,
  setWeeklySummarySchedule,
  sendWeeklySummaryNow,
} = useDailyReminder();

  const LANGUAGES = AVAILABLE_LANGUAGES;

  if (isLoading) {
    return (
      <BackgroundImage imageTheme="system" opacity={0.9} blurRadius={2}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.text }]}>
            {t.common.loading}
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
            {t.system.title}
          </Text>
        </View>

        {/* Apparence */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="color-palette" size={20} color={colors.text} />{" "}
            {t.system.appearance}
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
                {theme === "light" ? t.system.lightMode : t.system.darkMode}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.icon }]}>
                {theme === "light" ? t.system.lightMode : t.system.darkMode}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.icon} />
            </View>
          </TouchableOpacity>
        </IslandCard>

        {/* Langue */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="language" size={20} color={colors.text} />{" "}
            {t.system.language}
          </Text>

          <TouchableOpacity
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
            onPress={() => setShowLanguageModal(true)}
          >
            <View style={styles.settingLeft}>
              <Text style={{ fontSize: 24, marginRight: 8 }}>
                {LANGUAGES.find(l => l.code === language)?.flag || "🇫🇷"}
              </Text>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {LANGUAGES.find(l => l.code === language)?.name || "Français"}
              </Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={[styles.settingValue, { color: colors.textLight }]}>
                {language.toUpperCase()}
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.icon} />
            </View>
          </TouchableOpacity>
        </IslandCard>

        {/* Préférences */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="settings" size={20} color={colors.text} />{" "}
            {t.system.preferences}
          </Text>

          {/* FIX: utilise notificationsEnabled (plus de variable "notifications" inexistante) */}
          <View
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t.system.notifications}
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleToggleNotifications}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={notificationsEnabled ? "#b49b9b" : "#f4f3f4"}
            />

          </View>

<WeeklySummarySettings
  getEnabled={getWeeklySummaryEnabled}
  setEnabled={setWeeklySummaryEnabled}
  getSchedule={getWeeklySummarySchedule}
  setSchedule={setWeeklySummarySchedule}
  sendTestSummary={sendWeeklySummaryNow}
/>

          {/* FIX: biométrie a son propre handler (setBiometric) */}
          <View
            style={[
              styles.settingRow,
              { borderBottomColor: colors.icon + "20" },
            ]}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="finger-print" size={22} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t.system.biometrics}
              </Text>
            </View>
            <Switch
              value={biometric}
              onValueChange={setBiometric}
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={biometric ? "#b49b9b" : "#fffbff"}
            />
          </View>

          {/* Devise */}
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
                {t.system.currency}
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

        {/* Actions */}
        <IslandCard>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Ionicons name="warning" size={20} color={colors.text} />{" "}
            {t.system.actions}
          </Text>

          <TouchableOpacity
            style={[styles.dangerButton]}
            onPress={clearAllData}
          >
            <Ionicons name="trash" size={22} color="#fff" />
            <Text style={styles.dangerButtonText}>
              {t.system.clearAllData}
            </Text>
          </TouchableOpacity>
        </IslandCard>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Modal de Langue */}
      <Modal
        visible={showLanguageModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLanguageModal(false)}
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
                {t.system.language}
              </Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.currencyItem,
                  { borderBottomColor: colors.icon + "20" },
                  language === lang.code && {
                    backgroundColor: colors.primary + "20",
                  },
                ]}
                onPress={() => {
                  setLanguage(lang.code as any);
                  setShowLanguageModal(false);
                }}
              >
                <View style={styles.currencyInfo}>
                  <Text style={{ fontSize: 24 }}>{lang.flag}</Text>
                  <Text style={[styles.currencyCode, { color: colors.text }]}>
                    {lang.name}
                  </Text>
                </View>
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
                {t.system.selectCurrency}
              </Text>
              <TouchableOpacity onPress={() => setShowCurrencyModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View
              style={[
                styles.searchContainer,
                { backgroundColor: colors.icon + "20" },
              ]}
            >
              <Ionicons name="search" size={20} color={colors.icon} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder={t.system.search}
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 80,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
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
