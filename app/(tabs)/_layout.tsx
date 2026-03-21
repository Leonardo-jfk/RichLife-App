// app/(tabs)/_layout.tsx
// import { Tabs } from "expo-router";
// import React from "react";
// import { useTheme, ThemeProvider } from "../../src/context/ThemeContext"; // ← OK, mais attention à l'ordre

// import { HapticTab } from "@/components/haptic-tab";
// import { IconSymbol } from "@/components/ui/icon-symbol";

// export default function TabLayout() {
//   const { colors, theme } = useTheme(); // ← Cette ligne est correcte

//   console.log("Thème actuel:", theme);

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: colors.icon,
//         tabBarStyle: {
//           backgroundColor: colors.background,
//           borderTopColor:
//             theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
//         },
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Accueil",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="house.fill" color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="transView"
//         options={{
//           title: "Transactions",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="list.bullet" color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="goalView"
//         options={{
//           title: "Objectifs",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="star.fill" color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="wisdomView"
//         options={{
//           title: "Sagesse",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="lightbulb.fill" color={color} />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="systemView"
//         options={{
//           title: "Système",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="gearshape.fill" color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// app/(tabs)/_layout.tsx
// import { Tabs } from "expo-router";
// import React from "react";
// import { useTheme } from "../../src/context/ThemeContext";

// import { HapticTab } from "@/components/haptic-tab";
// import { IconSymbol } from "@/components/ui/icon-symbol";

// export default function TabLayout() {
//   const { colors } = useTheme(); // ← Utiliser le thème

//   return (
//     <Tabs
//       screenOptions={{
//         // Couleurs des icônes actives/inactives
//         tabBarActiveTintColor: colors.text, // ← Blanc en mode sombre, noir en mode clair
//         tabBarInactiveTintColor: colors.icon, // ← Gris
//         // Style de la barre de tabs
//         tabBarStyle: {
//           backgroundColor: colors.background, // ← Fond blanc en mode clair, noir en mode sombre
//           borderTopColor: colors.icon + "20", // ← Bordure semi-transparente
//           height: 60, // ← Hauteur confortable
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//         // Style des labels
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "500",
//         },
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Accueil",
//           tabBarIcon: ({ color, focused }) => (
//             <IconSymbol
//               size={24}
//               name={focused ? "house.fill" : "house"}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="transView"
//         options={{
//           title: "Transactions",
//           tabBarIcon: ({ color, focused }) => (
//             <IconSymbol
//               size={24}
//               name={focused ? "list.bullet" : "list.bullet"}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="goalView"
//         options={{
//           title: "Objectifs",
//           tabBarIcon: ({ color, focused }) => (
//             <IconSymbol
//               size={24}
//               name={focused ? "star.fill" : "star"}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="wisdomView"
//         options={{
//           title: "Sagesse",
//           tabBarIcon: ({ color, focused }) => (
//             <IconSymbol
//               size={24}
//               name={focused ? "lightbulb.fill" : "lightbulb"}
//               color={color}
//             />
//           ),
//         }}
//       />

//       <Tabs.Screen
//         name="systemView"
//         options={{
//           title: "Système",
//           tabBarIcon: ({ color, focused }) => (
//             <IconSymbol
//               size={24}
//               name={focused ? "gearshape.fill" : "gearshape"}
//               color={color}
//             />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs } from "expo-router";
import React from "react";
import { ThemeProvider, useTheme } from "../../src/context/ThemeContext"; // Importe useTheme

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
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      {/* ... tes autres Tabs.Screen ... */}
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
              name={focused ? "list.bullet" : "list.bullet"}
              color={color}
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

export default function TabLayout() {
  return (
    <ThemeProvider>
      <TabNavigation />
    </ThemeProvider>
  );
}
