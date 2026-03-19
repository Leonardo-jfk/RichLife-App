// import { Colors } from "@/constants/theme";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import { useColorScheme } from "react-native";
//   import { useTheme } from '../context/ThemeContext';
// export type ThemeType = "light" | "dark";

// export const useAppTheme = () => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setThemeState] = useState<ThemeType>(
//     systemColorScheme || "light",
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   // Charger le thème sauvegardé
//   useEffect(() => {
//     loadTheme();
//   }, []);

//   const loadTheme = async () => {
//     try {
//       const savedTheme = await AsyncStorage.getItem("@app_theme");
//       if (savedTheme === "light" || savedTheme === "dark") {
//         setThemeState(savedTheme);
//       }
//     } catch (error) {
//       console.error("Erreur chargement thème:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setTheme = async (newTheme: ThemeType) => {
//     setThemeState(newTheme);
//     try {
//       await AsyncStorage.setItem("@app_theme", newTheme);
//     } catch (error) {
//       console.error("Erreur sauvegarde thème:", error);
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//   };

//   const colors = Colors[theme];

//   return {
//     theme,
//     colors,
//     isLoading,
//     toggleTheme,
//     setTheme,
//   };
// };

// export default useAppTheme;

// export const useAppTheme = () => {
//   return useTheme();
// };
// src/hooks/useAppTheme.ts
// import { Colors } from "@/constants/theme";
// import { useState } from "react";
// import { useColorScheme } from "react-native";

// export const useAppTheme = () => {
//   const colorScheme = useColorScheme();
//   const theme = colorScheme || "light";
//   const colors = Colors[theme];
//   const [isLoading] = useState(true);

//   return {
//     theme,
//     colors,
//     toggleTheme: () => console.log("Toggle theme"),
//     isLoading,
//   };
// };

// import { Colors } from "@/constants/theme";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useEffect, useState } from "react";
// import { useColorScheme } from "react-native";
// // import { useTheme } from '../context/ThemeContext';

// export type ThemeType = "light" | "dark";

// // Version 1: Hook complet avec sa propre gestion du thème
// export const useAppTheme = () => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setThemeState] = useState<ThemeType>(
//     systemColorScheme || "light",
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   // Charger le thème sauvegardé
//   useEffect(() => {
//     loadTheme();
//   }, []);

//   const loadTheme = async () => {
//     try {
//       const savedTheme = await AsyncStorage.getItem("@app_theme");
//       if (savedTheme === "light" || savedTheme === "dark") {
//         setThemeState(savedTheme);
//       }
//     } catch (error) {
//       console.error("Erreur chargement thème:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const setTheme = async (newTheme: ThemeType) => {
//     setThemeState(newTheme);
//     try {
//       await AsyncStorage.setItem("@app_theme", newTheme);
//     } catch (error) {
//       console.error("Erreur sauvegarde thème:", error);
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//   };

//   const colors = Colors[theme];

//   return {
//     theme,
//     colors,
//     isLoading,
//     toggleTheme,
//     setTheme,
//   };
// };

// Version 2: Hook qui utilise le contexte (COMMENTEZ LA SI VOUS UTILISEZ LA VERSION 1)
// export const useAppTheme = () => {
//   return useTheme();
// };
