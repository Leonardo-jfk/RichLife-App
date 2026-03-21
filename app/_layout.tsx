// app/_layout.tsx
import { Stack } from "expo-router";
import { CurrencyProvider } from "../src/context/CurrencyContext";
import { ThemeProvider } from "../src/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="add-transaction"
            options={{ title: "Ajouter une transaction" }}
          />
          <Stack.Screen
            name="transaction-details"
            options={{ title: "Détails" }}
          />
        </Stack>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
