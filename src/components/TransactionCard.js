import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import { CATEGORIES } from "../constants/categories";
import { formatCurrency, formatDate } from "../utils/formatters";

const TransactionCard = ({ transaction, onDelete, onPress }) => {
  const { colors } = useTheme();

  // Trouver la catégorie correspondante
  const category =
    CATEGORIES.find((c) => c.id === transaction.category) || CATEGORIES[8];

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.surface || "rgba(255,255,255,0.1)" },
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: category.color + "20" },
        ]}
      >
        <Ionicons name={category.icon} size={24} color={category.color} />
      </View>

      <View style={styles.details}>
        <Text style={[styles.description, { color: colors.text }]}>
          {transaction.description}
        </Text>
        <Text style={[styles.category, { color: colors.textLight }]}>
          {category.name}
        </Text>
        <Text style={[styles.date, { color: colors.textLight }]}>
          {formatDate(transaction.date)}
        </Text>
      </View>

      <View style={styles.rightContainer}>
        <Text
          style={[
            styles.amount,
            {
              color:
                transaction.type === "income"
                  ? colors.income || "#10B981"
                  : colors.expense || "#EF4444",
            },
          ]}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </Text>

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Ionicons
            name="trash-outline"
            size={20}
            color={colors.danger || "#EF4444"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  category: {
    fontSize: 13,
    marginBottom: 2,
  },
  date: {
    fontSize: 11,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  deleteButton: {
    padding: 4,
  },
});

export default TransactionCard;
