// import { Tabs } from "expo-router";
// import React from "react";

// import { HapticTab } from "@/components/haptic-tab";
// import { IconSymbol } from "@/components/ui/icon-symbol";
// import { Colors } from "@/constants/theme";
// import { useColorScheme } from "@/hooks/use-color-scheme";
// import { ThemeProvider } from "../../src/context/ThemeContext";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider>
//       <Tabs
//         screenOptions={{
//           tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//           headerShown: false,
//           tabBarButton: HapticTab,
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{
//             title: "Home",
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="ipod" color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="transView"
//           options={{
//             title: "Transactions",
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="signature.ja" color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="goalView"
//           options={{
//             title: "Goals",
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="binoculars" color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="wisdomView"
//           options={{
//             title: "Wisdom",
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="sparkles" color={color} />
//             ),
//           }}
//         />
//         <Tabs.Screen
//           name="systemView"
//           options={{
//             title: "System",
//             tabBarIcon: ({ color }) => (
//               <IconSymbol size={28} name="wand.and.outline" color={color} />
//             ),
//           }}
//         />
//       </Tabs>
//     </ThemeProvider>
//   );
// }

// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "../../src/context/ThemeContext"; // ← OK, mais attention à l'ordre

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const { colors, theme } = useTheme(); // ← Cette ligne est correcte

  console.log("Thème actuel:", theme);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.icon,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.icon + "20",
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

      <Tabs.Screen
        name="transView"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="list.bullet" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="goalView"
        options={{
          title: "Objectifs",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="star.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wisdomView"
        options={{
          title: "Sagesse",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="lightbulb.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="systemView"
        options={{
          title: "Système",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="gearshape.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
