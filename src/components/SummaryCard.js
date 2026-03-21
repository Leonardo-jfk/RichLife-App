import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import { formatCurrency } from "../utils/formatters";

const SummaryCard = ({ income, expenses, savings }) => {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface || "rgba(255,255,255,0.1)" },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Résumé du mois
        </Text>
      </View>

      <View style={styles.row}>
        <View
          style={[
            styles.item,
            styles.incomeBorder,
            { borderColor: colors.income || "#10B981" },
          ]}
        >
          <Text style={[styles.label, { color: colors.textLight }]}>
            Revenus
          </Text>
          <Text style={[styles.amount, { color: colors.income || "#10B981" }]}>
            {formatCurrency(income)}
          </Text>
        </View>

        <View
          style={[
            styles.item,
            styles.expenseBorder,
            { borderColor: colors.expense || "#EF4444" },
          ]}
        >
          <Text style={[styles.label, { color: colors.textLight }]}>
            Dépenses
          </Text>
          <Text style={[styles.amount, { color: colors.expense || "#EF4444" }]}>
            {formatCurrency(expenses)}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.savingsContainer,
          { backgroundColor: colors.background || "rgba(0,0,0,0.05)" },
        ]}
      >
        <Text style={[styles.savingsLabel, { color: colors.textLight }]}>
          Économies potentielles
        </Text>
        <Text
          style={[
            styles.savingsAmount,
            {
              color:
                savings >= 0
                  ? colors.savings || "#10B981"
                  : colors.danger || "#EF4444",
            },
          ]}
        >
          {formatCurrency(savings)}
        </Text>
        {savings < 0 && (
          <Text style={[styles.warning, { color: colors.danger || "#EF4444" }]}>
            ⚠️ Vous dépensez plus que vos revenus
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  item: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  incomeBorder: {
    marginRight: 8,
  },
  expenseBorder: {
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  savingsContainer: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  savingsLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  savingsAmount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  warning: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
});

export default SummaryCard;
