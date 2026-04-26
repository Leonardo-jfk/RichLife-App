// // app/_layout.tsx
// import { Stack } from "expo-router";
// import { CurrencyProvider } from "../src/context/CurrencyContext";
// import { ThemeProvider } from "../src/context/ThemeContext";
//
// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <CurrencyProvider>
//         <Stack>
//           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//           <Stack.Screen
//             name="add-transaction"
//             options={{ title: "Ajouter une transaction" }}
//           />
//           <Stack.Screen
//             name="transaction-details"
//             options={{ title: "Détails" }}
//           />
//         </Stack>
//       </CurrencyProvider>
//     </ThemeProvider>
//   );
// }
//



// // app/_layout.tsx
// import { Stack } from "expo-router";
// import { ThemeProvider } from "../src/context/ThemeContext";
// import { LanguageProvider } from "../src/context/LanguageContext";
// import { CurrencyProvider } from "../src/context/CurrencyContext";
// import { AuthProvider } from "../src/context/AuthContext";
// // import { SyncProvider } from "../src/context/SyncContext";
//
// SplashScreen.preventAutoHideAsync();
//
// function AppTabs() {
//   const { colors, theme } = useTheme();
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: colors.icon,
//         tabBarStyle: {
//           backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//           borderTopColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
//           height: 60,
//           paddingBottom: 10,
//         },
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}
//     >
//       <Tabs.Screen name="index" options={{ title: "Accueil", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "house.fill" : "house"} color={color} /> }} />
//       <Tabs.Screen name="transView" options={{ title: "Transactions", tabBarIcon: ({ color }) => <IconSymbol size={24} name="brain" color={color} /> }} />
//       <Tabs.Screen name="goalView" options={{ title: "Objectifs", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "star.fill" : "star"} color={color} /> }} />
//       <Tabs.Screen name="wisdomView" options={{ title: "Sagesse", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "lightbulb.fill" : "lightbulb"} color={color} /> }} />
//       <Tabs.Screen name="systemView" options={{ title: "Système", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "gearshape.fill" : "gearshape"} color={color} /> }} />
//     </Tabs>
//   );
// }
//
// export default function RootLayout() {
//   const { session, isLoading } = useAuth();
//   const [fontsLoaded] = useFonts({ FrenchScript: Parisienne_400Regular });
//
//   useEffect(() => {
//     if (fontsLoaded) SplashScreen.hideAsync();
//   }, [fontsLoaded]);
//
//   if (!fontsLoaded || isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }
//
//   if (!session) {
//     return <Redirect href="/login" />;
//   }
//
//   return (
//     <ThemeProvider>
//       <LanguageProvider>
//         <CurrencyProvider>
//           <AuthProvider>   {/* ← AuthProvider DOIT englober les écrans qui utilisent useAuth */}
//             {/*<SyncProvider>*/}
//               <Stack>
//                 <Stack.Screen name="login" options={{ headerShown: false }} />
//                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                 <Stack.Screen name="add-transaction" options={{ title: "Ajouter une transaction" }} />
//                 <Stack.Screen name="transaction-details" options={{ title: "Détails" }} />
//               </Stack>
//             {/*</SyncProvider>*/}
//           </AuthProvider>
//         </CurrencyProvider>
//       </LanguageProvider>
//     </ThemeProvider>
//   );
// }



import { Stack, Tabs, Redirect } from "expo-router";
import { useTheme } from "../src/context/ThemeContext";
import { useAuth } from "../src/context/AuthContext";
import { useFonts, Parisienne_400Regular } from "@expo-google-fonts/parisienne";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemeProvider } from "../src/context/ThemeContext";
import { LanguageProvider } from "../src/context/LanguageContext";
import { CurrencyProvider } from "../src/context/CurrencyContext";
import { AuthProvider } from "../src/context/AuthContext";

// Empêcher le splash screen de se fermer automatiquement
SplashScreen.preventAutoHideAsync();

// Composant des onglets (utilisé après authentification)
function AppTabs() {
  const { colors, theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.icon,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
          borderTopColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          height: 60,
          paddingBottom: 10,
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "house.fill" : "house"} color={color} /> }} />
      <Tabs.Screen name="transView" options={{ title: "Transactions", tabBarIcon: ({ color }) => <IconSymbol size={24} name="brain" color={color} /> }} />
      <Tabs.Screen name="goalView" options={{ title: "Objectifs", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "star.fill" : "star"} color={color} /> }} />
      <Tabs.Screen name="wisdomView" options={{ title: "Sagesse", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "lightbulb.fill" : "lightbulb"} color={color} /> }} />
      <Tabs.Screen name="systemView" options={{ title: "Système", tabBarIcon: ({ color, focused }) => <IconSymbol size={24} name={focused ? "gearshape.fill" : "gearshape"} color={color} /> }} />
    </Tabs>
  );
}

// Layout principal
export default function RootLayout() {
  const [fontsLoaded] = useFonts({ FrenchScript: Parisienne_400Regular });
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="add-transaction" options={{ title: "Ajouter une transaction" }} />
              <Stack.Screen name="transaction-details" options={{ title: "Détails" }} />
            </Stack>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}