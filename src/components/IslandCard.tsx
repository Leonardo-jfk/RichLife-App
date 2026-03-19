// import React from "react";
// import { StyleSheet, View, ViewStyle } from "react-native";
// import { useAppTheme } from "../hooks/useAppTheme";

// interface IslandCardProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
// }

// export default function IslandCard({ children, style }: IslandCardProps) {
//   const { theme } = useAppTheme();

//   // Couleurs adaptées au thème
//   const backgroundColor =
//     theme === "dark"
//       ? "rgba(0, 0, 0, 0.7)" // Sombre en mode sombre
//       : "rgba(255, 255, 255, 0.4)"; // Clair en mode clair

//   const borderColor =
//     theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.8)";

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

// import React from "react";
// import { StyleSheet, View, ViewStyle } from "react-native";
// import { useTheme } from "../context/ThemeContext"; // ← Changement ici

// interface IslandCardProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
// }

// export default function IslandCard({ children, style }: IslandCardProps) {
//   const { theme } = useTheme(); // ← Utilisez useTheme au lieu de useAppTheme

//   const backgroundColor =
//     theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.4)";

//   const borderColor =
//     theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.8)";

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

// import React, { useEffect, useState } from "react"; // ← Ajouter useEffect, useState
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface IslandCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

// export default function IslandCard({ children, style }: IslandCardProps) {
//   const { theme } = useTheme();

//   // Utiliser useState pour forcer le re-rendu
//   const [cardStyle, setCardStyle] = useState({
//     backgroundColor:
//       theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.4)",
//     borderColor:
//       theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.8)",
//   });

//   // Mettre à jour le style quand le thème change
//   useEffect(() => {
//     setCardStyle({
//       backgroundColor:
//         theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.4)",
//       borderColor:
//         theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.8)",
//     });
//   }, [theme]);

//   return <View style={[styles.card, cardStyle, style]}>{children}</View>;
// }

export default function IslandCard({ children, style }: IslandCardProps) {
  const { theme } = useTheme();

  // On calcule les couleurs à chaque rendu, c'est très rapide
  const backgroundColor =
    theme === "dark" ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.4)";

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
