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
//             <SyncProvider>
//               <Stack>
//                 <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
import { Stack } from "expo-router";
import { CurrencyProvider } from "../src/context/CurrencyContext";
import { ThemeProvider } from "../src/context/ThemeContext";
import { LanguageProvider } from "../src/context/LanguageContext";
import { AuthProvider } from "../src/context/AuthContext";
import { SyncProvider } from "../src/context/SyncContext";
import { useFonts, Parisienne_400Regular } from "@expo-google-fonts/parisienne";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

// Empêcher le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

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
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen
                  name="add-transaction"
                  options={{ title: "Ajouter une transaction" }}
                />
                <Stack.Screen
                  name="transaction-details"
                  options={{ title: "Détails" }}
                />
              </Stack>
            </SyncProvider>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}