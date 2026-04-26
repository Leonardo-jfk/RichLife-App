import { Colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  colors: typeof Colors.light | typeof Colors.dark;
  toggleTheme: () => void;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  // const [theme, setTheme] = useState<ThemeType>(systemColorScheme || "light");
  // const initialTheme: ThemeType = systemColorScheme === 'dark' ? 'dark' : 'light';
const [theme, setTheme] = useState<ThemeType>(useColorScheme() === 'dark' ? 'dark' : 'light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("@app_theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.error("Erreur chargement thème:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("@app_theme", newTheme);
    } catch (error) {
      console.error("Erreur sauvegarde thème:", error);
    }
  };

  const colors = Colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
