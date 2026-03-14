// import { useColorScheme } from 'react-native';
// import { Colors } from '@/constants/theme';
// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export type ThemeType = 'light' | 'dark';

// export const useAppTheme = () => {
//   const systemColorScheme = useColorScheme();
//   const [theme, setThemeState] = useState<ThemeType>(systemColorScheme || 'light');
//   const [isLoading, setIsLoading] = useState(true);

//   // Charger le thème sauvegardé
//   useEffect(() => {
//     loadTheme();
//   }, []);

//   const loadTheme = async () => {
//     try {
//       const savedTheme = await AsyncStorage.getItem('@app_theme');
//       if (savedTheme === 'light' || savedTheme === 'dark') {
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
//       await AsyncStorage.setItem('@app_theme', newTheme);
//     } catch (error) {
//       console.error("Erreur sauvegarde thème:", error);
//     }
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
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

// src/hooks/useAppTheme.ts
import { Colors } from "@/constants/theme";
import { useState } from "react";
import { useColorScheme } from "react-native";

export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme || "light";
  const colors = Colors[theme];
  const [isLoading] = useState(true);

  return {
    theme,
    colors,
    toggleTheme: () => console.log("Toggle theme"),
    isLoading,
  };
};
