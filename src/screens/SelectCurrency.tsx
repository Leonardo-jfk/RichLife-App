// app/(tabs)/currency-select.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import BackgroundImage from "../../src/components/BackgroundImage";
import IslandCard from "../../src/components/IslandCard";
import { COLORS } from "../../src/constants/colors";
import { CURRENCIES, useCurrency } from "../../src/context/CurrencyContext";
import { useTheme } from "../../src/context/ThemeContext";

export default function CurrencySelectScreen() {
  const { colors } = useTheme();
  const { currency, setCurrency, getCurrencyInfo } = useCurrency();
  const [searchText, setSearchText] = useState("");

  const filteredCurrencies = CURRENCIES.filter(
    (c) =>
      c.code.toLowerCase().includes(searchText.toLowerCase()) ||
      c.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const currentCurrencyInfo = getCurrencyInfo(currency);

  return (
    <BackgroundImage opacity={0.6} blurRadius={2}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Sélectionnez votre devise
          </Text>
        </View>

        {/* Devise actuelle */}
        <IslandCard>
          <View style={styles.currentContainer}>
            <Text style={[styles.currentLabel, { color: COLORS.textLight }]}>
              Devise actuelle
            </Text>
            <View style={styles.currentCurrency}>
              <Text style={[styles.currentFlag, { fontSize: 40 }]}>
                {currentCurrencyInfo.flag}
              </Text>
              <Text style={[styles.currentCode, { color: colors.primary }]}>
                {currentCurrencyInfo.code}
              </Text>
              <Text style={[styles.currentName, { color: colors.text }]}>
                {currentCurrencyInfo.name}
              </Text>
            </View>
          </View>
        </IslandCard>

        {/* Recherche */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={colors.icon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Rechercher une devise..."
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
                currency === item.code && styles.selectedCurrency,
                { borderBottomColor: colors.icon + "20" },
                currency === item.code && {
                  backgroundColor: colors.primary + "20",
                },
              ]}
              onPress={() => setCurrency(item.code)}
            >
              <View style={styles.currencyInfo}>
                <Text style={styles.flag}>{item.flag}</Text>
                <View style={styles.currencyDetails}>
                  <Text style={[styles.currencyCode, { color: colors.text }]}>
                    {item.code}
                  </Text>
                  <Text
                    style={[styles.currencyName, { color: COLORS.textLight }]}
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
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search" size={50} color={COLORS.textLight} />
              <Text style={[styles.emptyText, { color: COLORS.textLight }]}>
                Aucune devise trouvée
              </Text>
            </View>
          }
        />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  currentContainer: {
    alignItems: "center",
  },
  currentLabel: {
    fontSize: 14,
    marginBottom: 12,
  },
  currentCurrency: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  currentFlag: {
    fontSize: 40,
  },
  currentCode: {
    fontSize: 28,
    fontWeight: "bold",
  },
  currentName: {
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginVertical: 16,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  selectedCurrency: {
    borderRadius: 8,
  },
  currencyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  flag: {
    fontSize: 28,
  },
  currencyDetails: {
    marginLeft: 8,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: "600",
  },
  currencyName: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});
