// import React from "react";
// import { StyleSheet, View, ViewStyle } from "react-native";

// interface IslandCardProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
// }

// export default function IslandCard({ children, style }: IslandCardProps) {
//   return <View style={[styles.card, style]}>{children}</View>;
// }

// const styles = StyleSheet.create({
//   card: {
//     // L'effet "Glass" : fond blanc très transparent
//     backgroundColor: "rgba(255, 255, 255, 0.95)",
//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 16,
//     // Bordure fine pour l'effet brillant
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.9)",
//     // Ombre légère (boxShadow pour les versions récentes)
//     boxShadow: "0 8 32 rgba(0, 0, 0, 0.9)",
//   },
// });

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "rgba(0, 0, 0, 0.6)", // Noir transparent (plus sombre = plus lisible)
//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.15)", // Bordure "verre"
//     // Pour iOS (le shadow est hérité différemment)
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//   },
// });

// import React from "react";
// import { StyleSheet, View, ViewStyle } from "react-native";

// interface IslandCardProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
// }

// export default function IslandCard({ children, style }: IslandCardProps) {
//   return <View style={[styles.card, style]}>{children}</View>;
// }

// const styles = StyleSheet.create({
//   card: {
//     // Fond avec opacité SEULEMENT pour l'arrière-plan
//     backgroundColor: "rgba(0, 0, 0, 0.4)", // Fond sombre pour mode clair/foncé
//     // OU pour un fond clair :
//     // backgroundColor: "rgba(255, 255, 255, 0.2)",

//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 16,

//     // Bordure fine
//     borderWidth: 1,
//     borderColor: "rgba(255, 255, 255, 0.1)",

//     // Ombre (adaptée à React Native)
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 5,
//   },
// });

import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

interface IslandCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function IslandCard({ children, style }: IslandCardProps) {
  const { theme } = useAppTheme();

  // Couleurs adaptées au thème
  const backgroundColor =
    theme === "dark"
      ? "rgba(0, 0, 0, 0.7)" // Sombre en mode sombre
      : "rgba(255, 255, 255, 0.4)"; // Clair en mode clair

  const borderColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.8)";

  return (
    <View style={[styles.card, { backgroundColor, borderColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
});

// import React from "react";
// import { StyleSheet, View, ViewStyle } from "react-native";
// import { useAppTheme } from "../hooks/useAppTheme";

// interface IslandCardProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
// }

// export default function IslandCard({ children, style }: IslandCardProps) {
//   const { colors } = useAppTheme();

//   // Convertir une couleur hex en rgba avec opacité
//   const hexToRgba = (hex: string, opacity: number) => {
//     const r = parseInt(hex.slice(1, 3), 16);
//     const g = parseInt(hex.slice(3, 5), 16);
//     const b = parseInt(hex.slice(5, 7), 16);
//     return `rgba(${r}, ${g}, ${b}, ${opacity})`;
//   };

//   const backgroundColor = hexToRgba(colors.background, 0.8);
//   const borderColor = hexToRgba(colors.text, 0.1);

//   return (
//     <View style={[styles.card, { backgroundColor, borderColor }, style]}>
//       {children}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     borderRadius: 24,
//     padding: 20,
//     marginBottom: 16,
//     borderWidth: 1,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.3,
//     shadowRadius: 20,
//     elevation: 5,
//   },
// });
