// app/_layout.tsx
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



// app/_layout.tsx
// import { Stack } from "expo-router";
// import { CurrencyProvider } from "../src/context/CurrencyContext";
// import { ThemeProvider } from "../src/context/ThemeContext";
// import { LanguageProvider } from "../src/context/LanguageContext";
// import { AuthProvider } from "../src/context/AuthContext";
// import { SyncProvider } from "../src/context/SyncContext";
//
// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//       <LanguageProvider>
//         <CurrencyProvider>
//           <AuthProvider>
// //             <SyncProvider>
// //               <Stack>
// //                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// //                 <Stack.Screen
// //                   name="add-transaction"
// //                   options={{ title: "Ajouter une transaction" }}
// //                 />
// //                 <Stack.Screen
// //                   name="transaction-details"
// //                   options={{ title: "Détails" }}
// //                 />
// //               </Stack>
// //             </SyncProvider>
// //           </AuthProvider>
// //         </CurrencyProvider>
// //       </LanguageProvider>
// //     </ThemeProvider>
// //   );
// // }
//
//
//
// // app/_layout.tsx
// import { Stack } from "expo-router";
// import { CurrencyProvider } from "../src/context/CurrencyContext";
// import { ThemeProvider } from "../src/context/ThemeContext";
// import { LanguageProvider } from "../src/context/LanguageContext";
// import { AuthProvider } from "../src/context/AuthContext";
// import { SyncProvider } from "../src/context/SyncContext";
// import { useFonts, Parisienne_400Regular } from "@expo-google-fonts/parisienne";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect } from "react";
// import { View, ActivityIndicator } from "react-native";
//
// // Empêcher le splash screen de se cacher automatiquement
// SplashScreen.preventAutoHideAsync();
//
// export default function RootLayout() {
//   const [fontsLoaded, fontsError] = useFonts({
//     FrenchScript: Parisienne_400Regular,
//   });
//
//   useEffect(() => {
//     if (fontsLoaded || fontsError) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, fontsError]);
//
//   if (!fontsLoaded && !fontsError) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }
//
//   return (
//     <ThemeProvider>
//       <LanguageProvider>
//         <CurrencyProvider>
//           <AuthProvider>
//             <SyncProvider>
//               <Stack>
//                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                 <Stack.Screen name="login" options={{ headerShown: false }} />
//                 <Stack.Screen
//                   name="add-transaction"
//                   options={{ title: "Ajouter une transaction" }}
//                 />
//                 <Stack.Screen
//                   name="transaction-details"
//                   options={{ title: "Détails" }}
//                 />
//               </Stack>
//             </SyncProvider>
//           </AuthProvider>
//         </CurrencyProvider>
//       </LanguageProvider>
//     </ThemeProvider>
//   );
// }


// app/_layout.tsx
import { Tabs } from "expo-router";
import { CurrencyProvider } from "../src/context/CurrencyContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import { LanguageProvider } from "../src/context/LanguageContext";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { SyncProvider } from "../src/context/SyncContext";
import { useFonts, Parisienne_400Regular } from "@expo-google-fonts/parisienne";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useTheme } from "../src/context/ThemeContext";
import { Redirect, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

// Composant pour les onglets (protégé par auth)
function TabNavigation() {
  const { colors, theme } = useTheme();
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  // kk
  // if (!session) {
  //   return <Redirect href="/login" />;
  // }
   if (!session) {
    return null; // Ne rien afficher pendant la redirection
  }

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
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "house.fill" : "house"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transView"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={24} name={"brain"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="goalView"
        options={{
          title: "Objectifs",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "star.fill" : "star"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wisdomView"
        options={{
          title: "Sagesse",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "lightbulb.fill" : "lightbulb"} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="systemView"
        options={{
          title: "Système",
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol size={24} name={focused ? "gearshape.fill" : "gearshape"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

// Composant principal
export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    FrenchScript: Parisienne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            <SyncProvider>
              <Stack>
                {/* Écran de connexion (sans onglets) */}
                <Stack.Screen name="login" options={{ headerShown: false }} />
                {/* Écran des onglets (protégé par auth à l'intérieur) */}
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="transView" options={{ headerShown: false }} />
                <Stack.Screen name="goalView" options={{ headerShown: false }} />
                <Stack.Screen name="wisdomView" options={{ headerShown: false }} />
                <Stack.Screen name="systemView" options={{ headerShown: false }} />
                {/* Autres écrans */}
                <Stack.Screen name="add-transaction" options={{ title: "Ajouter une transaction" }} />
                <Stack.Screen name="transaction-details" options={{ title: "Détails" }} />
              </Stack>
            </SyncProvider>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}