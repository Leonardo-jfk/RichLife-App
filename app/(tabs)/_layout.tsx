import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
import { ThemeProvider, useTheme } from "../../src/context/ThemeContext"; // Importe useTheme

import { Parisienne_400Regular, useFonts } from "@expo-google-fonts/parisienne";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";

function TabNavigation() {
  const { colors, theme } = useTheme(); // Récupère les couleurs dynamiques

  return (
    <Tabs
      screenOptions={{
        // Utilise les couleurs de ton thème
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.icon,
        tabBarStyle: {
          // Fond noir si dark, blanc si light
          backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
          borderTopColor:
            theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={24}
              name={focused ? "house.fill" : "house"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="transView"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={24}
              name={"brain"}
              color={color}
              // type={focused ? "palette" : "monochrome"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="goalView"
        options={{
          title: "Objectifs",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={24}
              name={focused ? "star.fill" : "star"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wisdomView"
        options={{
          title: "Sagesse",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={24}
              name={focused ? "lightbulb.fill" : "lightbulb"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="systemView"
        options={{
          title: "Système",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol
              size={24}
              name={focused ? "gearshape.fill" : "gearshape"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

// export default function TabLayout() {
//   return (
//     <ThemeProvider>
//       <TabNavigation />
//     </ThemeProvider>
//   );
// }

export default function TabLayout() {
  // Chargement des polices manuscrites
  const [loaded, error] = useFonts({
    FrenchScript: Parisienne_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Si les polices ne sont pas chargées, on n'affiche rien (ou un écran de chargement)
  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <TabNavigation />
    </ThemeProvider>
  );
}
