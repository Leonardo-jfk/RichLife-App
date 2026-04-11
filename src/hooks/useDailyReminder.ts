import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrency } from "../context/CurrencyContext";
import { useDailyBudget } from "./useDailyBudget";
import { loadTransactions } from "../utils/storage";

// Configuration de l'affichage des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const LAST_NOTIFICATION_DATE = "@daily_reminder_last_date";
const NOTIFICATIONS_ENABLED = "@notifications_enabled";

export function useDailyReminder(
  monthlyIncome: number,
  monthlyExpenses: number,
  dreams: any[],
  goals: any[]
) {
  const { formatCurrency } = useCurrency();
  const { dailyBudget, remainingMonthlyBudget, remainingDays } = useDailyBudget(
    monthlyIncome,
    monthlyExpenses,
    dreams,
    goals
  );
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  // Vérifier si les notifications sont activées
  const areNotificationsEnabled = async () => {
    try {
      const enabled = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED);
      return enabled === "true";
    } catch {
      return false;
    }
  };

  // Sauvegarder la préférence
  const setNotificationsEnabled = async (enabled: boolean) => {
    await AsyncStorage.setItem(NOTIFICATIONS_ENABLED, enabled.toString());
    if (enabled) {
      await scheduleDailyReminder();
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  // Vérifier si l'utilisateur a ajouté des transactions aujourd'hui
  const hasTransactionsToday = async (): Promise<boolean> => {
    const transactions = await loadTransactions();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return transactions.some((t: any) => {
      const transactionDate = new Date(t.date);
      transactionDate.setHours(0, 0, 0, 0);
      return transactionDate.getTime() === today.getTime();
    });
  };

  // Vérifier si on a déjà envoyé une notification aujourd'hui
  const hasSentToday = async (): Promise<boolean> => {
    const lastDate = await AsyncStorage.getItem(LAST_NOTIFICATION_DATE);
    const today = new Date().toDateString();
    return lastDate === today;
  };

  // Marquer la notification comme envoyée aujourd'hui
  const markSentToday = async () => {
    await AsyncStorage.setItem(LAST_NOTIFICATION_DATE, new Date().toDateString());
  };

  // Envoyer la notification immédiatement
  const sendReminder = async () => {
    const enabled = await areNotificationsEnabled();
    if (!enabled) return;

    const alreadySent = await hasSentToday();
    if (alreadySent) return;

    const hasTransactions = await hasTransactionsToday();

    let title = "";
    let body = "";

    if (!hasTransactions) {
      title = "📝 Ajoutez vos transactions";
      body = `Vous n'avez rien saisi aujourd'hui. Votre budget quotidien est de ${formatCurrency(dailyBudget)}. Prenez 2 minutes pour suivre vos dépenses !`;
    } else {
      // Message de suivi positif
      const remainingBudgetFormatted = formatCurrency(remainingMonthlyBudget);
      title = "💰 Suivi de votre budget";
      body = `Budget mensuel restant : ${remainingBudgetFormatted} (${remainingDays} jours). Vous êtes sur la bonne voie !`;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { screen: "transView" },
      },
      trigger: null, // envoi immédiat
    });

    await markSentToday();
  };

  // Planifier la notification quotidienne (19h par défaut)
  const scheduleDailyReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Planifier à 19h chaque jour
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💡 Votre rappel financier",
        body: "Ouvrez l'application pour voir votre budget et vos objectifs.",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { screen: "home" },
      },
      trigger: {
        hour: 19,
        minute: 0,
        repeats: true,
      },
    });
  };

  // Envoyer une notification push immédiate (appelée manuellement)
  const sendImmediateReminder = async () => {
    await sendReminder();
  };

  // Demander la permission et initialiser
  const registerForPushNotifications = async () => {
    if (!Device.isDevice) {
      Alert.alert("⚠️", "Les notifications ne fonctionnent que sur un appareil réel");
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("❌", "Vous n'avez pas autorisé les notifications");
      return false;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("daily_reminder", {
        name: "Rappel quotidien",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
      });
    }

    return true;
  };

  useEffect(() => {
    registerForPushNotifications();

    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("🔔 Notification reçue", notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const screen = response.notification.request.content.data?.screen;
        if (screen === "transView") {
          // Navigation vers l'écran des transactions
          // Vous pouvez implémenter la navigation ici
        }
      }
    );

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return {
    registerForPushNotifications,
    scheduleDailyReminder,
    sendImmediateReminder,
    areNotificationsEnabled,
    setNotificationsEnabled,
    sendReminder,
  };
}