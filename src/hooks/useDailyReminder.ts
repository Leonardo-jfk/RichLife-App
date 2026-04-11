// import { useEffect, useRef } from "react";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform, Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useCurrency } from "../context/CurrencyContext";
// import { useDailyBudget } from "./useDailyBudget";
// import { loadTransactions } from "../utils/storage";
//
// // Configuration de l'affichage des notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });
//
// const LAST_NOTIFICATION_DATE = "@daily_reminder_last_date";
// const NOTIFICATIONS_ENABLED = "@notifications_enabled";
//
// export function useDailyReminder(
//   monthlyIncome: number,
//   monthlyExpenses: number,
//   dreams: any[],
//   goals: any[]
// ) {
//   const { formatCurrency } = useCurrency();
//   const { dailyBudget, remainingMonthlyBudget, remainingDays } = useDailyBudget(
//     monthlyIncome,
//     monthlyExpenses,
//     dreams,
//     goals
//   );
//   const notificationListener = useRef<any>();
//   const responseListener = useRef<any>();
//
//   // Vérifier si les notifications sont activées
//   const areNotificationsEnabled = async () => {
//     try {
//       const enabled = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED);
//       return enabled === "true";
//     } catch {
//       return false;
//     }
//   };
//
//   // Sauvegarder la préférence
//   const setNotificationsEnabled = async (enabled: boolean) => {
//     await AsyncStorage.setItem(NOTIFICATIONS_ENABLED, enabled.toString());
//     if (enabled) {
//       await scheduleDailyReminder();
//     } else {
//       await Notifications.cancelAllScheduledNotificationsAsync();
//     }
//   };
//
//   // Vérifier si l'utilisateur a ajouté des transactions aujourd'hui
//   const hasTransactionsToday = async (): Promise<boolean> => {
//     const transactions = await loadTransactions();
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//
//     return transactions.some((t: any) => {
//       const transactionDate = new Date(t.date);
//       transactionDate.setHours(0, 0, 0, 0);
//       return transactionDate.getTime() === today.getTime();
//     });
//   };
//
//   // Vérifier si on a déjà envoyé une notification aujourd'hui
//   const hasSentToday = async (): Promise<boolean> => {
//     const lastDate = await AsyncStorage.getItem(LAST_NOTIFICATION_DATE);
//     const today = new Date().toDateString();
//     return lastDate === today;
//   };
//
//   // Marquer la notification comme envoyée aujourd'hui
//   const markSentToday = async () => {
//     await AsyncStorage.setItem(LAST_NOTIFICATION_DATE, new Date().toDateString());
//   };
//
//   // Envoyer la notification immédiatement
//   const sendReminder = async () => {
//     const enabled = await areNotificationsEnabled();
//     if (!enabled) return;
//
//     const alreadySent = await hasSentToday();
//     if (alreadySent) return;
//
//     const hasTransactions = await hasTransactionsToday();
//
//     let title = "";
//     let body = "";
//
//     if (!hasTransactions) {
//       title = "📝 Ajoutez vos transactions";
//       body = `Vous n'avez rien saisi aujourd'hui. Votre budget quotidien est de ${formatCurrency(dailyBudget)}. Prenez 2 minutes pour suivre vos dépenses !`;
//     } else {
//       // Message de suivi positif
//       const remainingBudgetFormatted = formatCurrency(remainingMonthlyBudget);
//       title = "💰 Suivi de votre budget";
//       body = `Budget mensuel restant : ${remainingBudgetFormatted} (${remainingDays} jours). Vous êtes sur la bonne voie !`;
//     }
//
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title,
//         body,
//         sound: true,
//         priority: Notifications.AndroidNotificationPriority.HIGH,
//         data: { screen: "transView" },
//       },
//       trigger: null, // envoi immédiat
//     });
//
//     await markSentToday();
//   };
//
//   // Planifier la notification quotidienne (19h par défaut)
//   const scheduleDailyReminder = async () => {
//     await Notifications.cancelAllScheduledNotificationsAsync();
//
//     // Planifier à 19h chaque jour
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "💡 Votre rappel financier",
//         body: "Ouvrez l'application pour voir votre budget et vos objectifs.",
//         sound: true,
//         priority: Notifications.AndroidNotificationPriority.HIGH,
//         data: { screen: "home" },
//       },
//       trigger: {
//         hour: 19,
//         minute: 0,
//         repeats: true,
//       },
//     });
//   };
//
//   // Envoyer une notification push immédiate (appelée manuellement)
//   const sendImmediateReminder = async () => {
//     await sendReminder();
//   };
//
//   // Demander la permission et initialiser
//   const registerForPushNotifications = async () => {
//     if (!Device.isDevice) {
//       Alert.alert("⚠️", "Les notifications ne fonctionnent que sur un appareil réel");
//       return false;
//     }
//
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//
//     if (finalStatus !== "granted") {
//       Alert.alert("❌", "Vous n'avez pas autorisé les notifications");
//       return false;
//     }
//
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("daily_reminder", {
//         name: "Rappel quotidien",
//         importance: Notifications.AndroidImportance.HIGH,
//         vibrationPattern: [0, 250, 250, 250],
//         sound: true,
//       });
//     }
//
//     return true;
//   };
//
//   useEffect(() => {
//     registerForPushNotifications();
//
//     notificationListener.current = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("🔔 Notification reçue", notification);
//       }
//     );
//
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         const screen = response.notification.request.content.data?.screen;
//         if (screen === "transView") {
//           // Navigation vers l'écran des transactions
//           // Vous pouvez implémenter la navigation ici
//         }
//       }
//     );
//
//     return () => {
//       if (notificationListener.current) {
//         Notifications.removeNotificationSubscription(notificationListener.current);
//       }
//       if (responseListener.current) {
//         Notifications.removeNotificationSubscription(responseListener.current);
//       }
//     };
//   }, []);
//
//   return {
//     registerForPushNotifications,
//     scheduleDailyReminder,
//     sendImmediateReminder,
//     areNotificationsEnabled,
//     setNotificationsEnabled,
//     sendReminder,
//   };
// }
//
// import { useEffect, useRef, useState } from "react";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform, Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useCurrency } from "../context/CurrencyContext";
// import { loadTransactions } from "../utils/storage";
//
// // Configuration de l'affichage des notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//       shouldShowBanner: true,      // ✅ AJOUTÉ
//     shouldShowList: true,
//   }),
// });
//
// const LAST_NOTIFICATION_DATE = "@daily_reminder_last_date";
// const NOTIFICATIONS_ENABLED = "@notifications_enabled";
//
// export function useDailyReminder() {
//   const { formatCurrency } = useCurrency();
//   const [dailyBudget, setDailyBudget] = useState(0);
//   const [remainingMonthlyBudget, setRemainingMonthlyBudget] = useState(0);
//   const [remainingDays, setRemainingDays] = useState(0);
//
//   const notificationListener = useRef<any>();
//   const responseListener = useRef<any>();
//
//   // Récupérer les données pour calculer le budget
//   const loadBudgetData = async () => {
//     try {
//       const [dreamsData, goalsData, transactionsData] = await Promise.all([
//         AsyncStorage.getItem("@finance_app_dreams"),
//         AsyncStorage.getItem("@finance_app_goals"),
//         loadTransactions(),
//       ]);
//
//       const dreams = dreamsData ? JSON.parse(dreamsData) : [];
//       const goals = goalsData ? JSON.parse(goalsData) : [];
//       const transactions = transactionsData;
//
//       // Calculer les revenus/dépenses du mois
//       const now = new Date();
//       const currentMonth = now.getMonth();
//       const currentYear = now.getFullYear();
//
//       const currentMonthTransactions = transactions.filter((t: any) => {
//         const date = new Date(t.date);
//         return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
//       });
//
//       const monthlyIncome = currentMonthTransactions
//         .filter((t: any) => t.type === "income")
//         .reduce((sum: number, t: any) => sum + t.amount, 0);
//
//       const monthlyExpenses = currentMonthTransactions
//         .filter((t: any) => t.type === "expense")
//         .reduce((sum: number, t: any) => sum + t.amount, 0);
//
//       // Calculer le budget quotidien
//       const remainingBudget = monthlyIncome - monthlyExpenses;
//       const daysLeft = new Date(currentYear, currentMonth + 1, 0).getDate() - now.getDate();
//       const daily = daysLeft > 0 ? remainingBudget / daysLeft : 0;
//
//       setDailyBudget(daily);
//       setRemainingMonthlyBudget(remainingBudget);
//       setRemainingDays(daysLeft);
//     } catch (error) {
//       console.error("Erreur chargement données budget:", error);
//     }
//   };
//
//   // Vérifier si les notifications sont activées
//   const areNotificationsEnabled = async () => {
//     try {
//       const enabled = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED);
//       return enabled === "true";
//     } catch {
//       return false;
//     }
//   };
//
//   // Sauvegarder la préférence
//   const setNotificationsEnabled = async (enabled: boolean) => {
//     await AsyncStorage.setItem(NOTIFICATIONS_ENABLED, enabled.toString());
//     if (enabled) {
//       await scheduleDailyReminder();
//     } else {
//       await Notifications.cancelAllScheduledNotificationsAsync();
//     }
//   };
//
//   // Vérifier si l'utilisateur a ajouté des transactions aujourd'hui
//   const hasTransactionsToday = async (): Promise<boolean> => {
//     const transactions = await loadTransactions();
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//
//     return transactions.some((t: any) => {
//       const transactionDate = new Date(t.date);
//       transactionDate.setHours(0, 0, 0, 0);
//       return transactionDate.getTime() === today.getTime();
//     });
//   };
//
//   // Vérifier si on a déjà envoyé une notification aujourd'hui
//   const hasSentToday = async (): Promise<boolean> => {
//     const lastDate = await AsyncStorage.getItem(LAST_NOTIFICATION_DATE);
//     const today = new Date().toDateString();
//     return lastDate === today;
//   };
//
//   // Marquer la notification comme envoyée aujourd'hui
//   const markSentToday = async () => {
//     await AsyncStorage.setItem(LAST_NOTIFICATION_DATE, new Date().toDateString());
//   };
//
//   // Envoyer la notification immédiatement
//   const sendReminder = async () => {
//     const enabled = await areNotificationsEnabled();
//     if (!enabled) return;
//
//     const alreadySent = await hasSentToday();
//     if (alreadySent) return;
//
//     const hasTransactions = await hasTransactionsToday();
//     await loadBudgetData(); // Recharger les données récentes
//
//     let title = "";
//     let body = "";
//
//     if (!hasTransactions) {
//       title = "📝 Ajoutez vos transactions";
//       body = `Vous n'avez rien saisi aujourd'hui. Votre budget quotidien est de ${formatCurrency(dailyBudget)}. Prenez 2 minutes pour suivre vos dépenses !`;
//     } else {
//       const remainingBudgetFormatted = formatCurrency(remainingMonthlyBudget);
//       title = "💰 Suivi de votre budget";
//       body = `Budget mensuel restant : ${remainingBudgetFormatted} (${remainingDays} jours). Vous êtes sur la bonne voie !`;
//     }
//
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title,
//         body,
//         sound: true,
//         priority: Notifications.AndroidNotificationPriority.HIGH,
//         data: { screen: "transView" },
//       },
//       trigger: null,
//     });
//
//     await markSentToday();
//   };
//
//   // Planifier la notification quotidienne (19h par défaut)
//   const scheduleDailyReminder = async () => {
//     await Notifications.cancelAllScheduledNotificationsAsync();
//
//
//     const trigger: Notifications.CalendarTriggerInput = {
//       type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
//       hour: 19,
//       minute: 0,
//       repeats: true,
//     };
//
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "💡 Votre rappel financier",
//         body: "Ouvrez l'application pour voir votre budget et vos objectifs.",
//         sound: true,
//         priority: Notifications.AndroidNotificationPriority.HIGH,
//         data: { screen: "home" },
//       },
//       // trigger: {
//       //   hour: 19,
//       //   minute: 0,
//       //   repeats: true,
//       // },
//         trigger: {
//   type: Notifications.SchedulableTriggerInputTypes.DAILY, // O SchedulableTriggerInputTypes.CALENDAR
//   hour: 18,
//   minute: 0,
// },
//     });
//   };
//
//   // Demander la permission et initialiser
//   const registerForPushNotifications = async () => {
//     if (!Device.isDevice) {
//       console.log("⚠️ Les notifications ne fonctionnent que sur un appareil réel");
//       return false;
//     }
//
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//
//     if (finalStatus !== "granted") {
//       console.log("❌ Permissions de notifications refusées");
//       return false;
//     }
//
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("daily_reminder", {
//         name: "Rappel quotidien",
//         importance: Notifications.AndroidImportance.HIGH,
//         vibrationPattern: [0, 250, 250, 250],
//         sound: true,
//       });
//     }
//
//     return true;
//   };
//
//   useEffect(() => {
//     registerForPushNotifications();
//     loadBudgetData();
//
//     notificationListener.current = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("🔔 Notification reçue", notification);
//       }
//     );
//
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         const screen = response.notification.request.content.data?.screen;
//         console.log("📱 Clic sur notification, screen:", screen);
//       }
//     );
//
//     // return () => {
//     //   if (notificationListener.current) {
//     //     Notifications.removeNotificationSubscription(notificationListener.current);
//     //   }
//     //   if (responseListener.current) {
//     //     Notifications.removeNotificationSubscription(responseListener.current);
//     //   }
//     // };
//       return () => {
//   // notificationListener.current?.remove();
//   // responseListener.current?.remove();
//
//           if (notificationListener.current) {
//       notificationListener.current.remove(); // Sin argumentos
//     }
//     if (responseListener.current) {
//       responseListener.current.remove(); // Sin argumentos
//     }
// };
//   }, []);
//
//   return {
//     registerForPushNotifications,
//     scheduleDailyReminder,
//     sendReminder,
//     areNotificationsEnabled,
//     setNotificationsEnabled,
//   };
// }

//
// import { useEffect, useRef, useState } from "react";
// import * as Notifications from "expo-notifications";
// import * as Device from "expo-device";
// import { Platform } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useCurrency } from "../context/CurrencyContext";
// import { loadTransactions } from "../utils/storage";
//
// // Configuration de l'affichage des notifications
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//     shouldShowBanner: true,
//     shouldShowList: true,
//   }),
// });
//
// const LAST_NOTIFICATION_DATE = "@daily_reminder_last_date";
// const NOTIFICATIONS_ENABLED = "@notifications_enabled";
//
// export function useDailyReminder() {
//   const { formatCurrency } = useCurrency();
//   const [dailyBudget, setDailyBudget] = useState(0);
//   const [remainingMonthlyBudget, setRemainingMonthlyBudget] = useState(0);
//   const [remainingDays, setRemainingDays] = useState(0);
//
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();
//
//   // Récupérer les données pour calculer le budget
//   const loadBudgetData = async () => {
//     try {
//       const [dreamsData, goalsData, transactionsData] = await Promise.all([
//         AsyncStorage.getItem("@finance_app_dreams"),
//         AsyncStorage.getItem("@finance_app_goals"),
//         loadTransactions(),
//       ]);
//
//       const dreams = dreamsData ? JSON.parse(dreamsData) : [];
//       const goals = goalsData ? JSON.parse(goalsData) : [];
//       const transactions = transactionsData;
//
//       const now = new Date();
//       const currentMonth = now.getMonth();
//       const currentYear = now.getFullYear();
//
//       const currentMonthTransactions = transactions.filter((t: any) => {
//         const date = new Date(t.date);
//         return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
//       });
//
//       const monthlyIncome = currentMonthTransactions
//         .filter((t: any) => t.type === "income")
//         .reduce((sum: number, t: any) => sum + t.amount, 0);
//
//       const monthlyExpenses = currentMonthTransactions
//         .filter((t: any) => t.type === "expense")
//         .reduce((sum: number, t: any) => sum + t.amount, 0);
//
//       const remainingBudget = monthlyIncome - monthlyExpenses;
//       const daysLeft = new Date(currentYear, currentMonth + 1, 0).getDate() - now.getDate();
//       const daily = daysLeft > 0 ? remainingBudget / daysLeft : 0;
//
//       setDailyBudget(daily);
//       setRemainingMonthlyBudget(remainingBudget);
//       setRemainingDays(daysLeft);
//     } catch (error) {
//       console.error("Erreur chargement données budget:", error);
//     }
//   };
//
//   const areNotificationsEnabled = async () => {
//     try {
//       const enabled = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED);
//       return enabled === "true";
//     } catch {
//       return false;
//     }
//   };
//
//   const setNotificationsEnabled = async (enabled: boolean) => {
//     await AsyncStorage.setItem(NOTIFICATIONS_ENABLED, enabled.toString());
//     if (enabled) {
//       await scheduleDailyReminder();
//     } else {
//       await Notifications.cancelAllScheduledNotificationsAsync();
//     }
//   };
//
//   const hasTransactionsToday = async (): Promise<boolean> => {
//     const transactions = await loadTransactions();
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//
//     return transactions.some((t: any) => {
//       const transactionDate = new Date(t.date);
//       transactionDate.setHours(0, 0, 0, 0);
//       return transactionDate.getTime() === today.getTime();
//     });
//   };
//
//   const hasSentToday = async (): Promise<boolean> => {
//     const lastDate = await AsyncStorage.getItem(LAST_NOTIFICATION_DATE);
//     const today = new Date().toDateString();
//     return lastDate === today;
//   };
//
//   const markSentToday = async () => {
//     await AsyncStorage.setItem(LAST_NOTIFICATION_DATE, new Date().toDateString());
//   };
//
//   const sendReminder = async () => {
//     const enabled = await areNotificationsEnabled();
//     if (!enabled) return;
//
//     const alreadySent = await hasSentToday();
//     if (alreadySent) return;
//
//     const hasTransactions = await hasTransactionsToday();
//     await loadBudgetData();
//
//     let title = "";
//     let body = "";
//
//     if (!hasTransactions) {
//       title = "📝 Ajoutez vos transactions";
//       body = `Vous n'avez rien saisi aujourd'hui. Votre budget quotidien est de ${formatCurrency(dailyBudget)}. Prenez 2 minutes pour suivre vos dépenses !`;
//     } else {
//       const remainingBudgetFormatted = formatCurrency(remainingMonthlyBudget);
//       title = "💰 Suivi de votre budget";
//       body = `Budget mensuel restant : ${remainingBudgetFormatted} (${remainingDays} jours). Vous êtes sur la bonne voie !`;
//     }
//
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title,
//         body,
//         sound: "default",  // ✅ string, pas boolean
//         priority: Notifications.AndroidNotificationPriority.HIGH,
//         data: { screen: "transView" },
//       },
//       trigger: null,
//     });
//
//     await markSentToday();
//   };
//
//   const scheduleDailyReminder = async () => {
//     await Notifications.cancelAllScheduledNotificationsAsync();
//
//     // ✅ Trigger correct avec type CALENDAR
//     const trigger: Notifications.CalendarTriggerInput = {
//       type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
//       hour: 19,
//       minute: 0,
//       repeats: true,
//     };
//
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "💡 Votre rappel financier",
//         body: "Ouvrez l'application pour voir votre budget et vos objectifs.",
//         sound: "default",  // ✅ string
//         priority: Notifications.AndroidNotificationPriority.HIGH,
//         data: { screen: "home" },
//       },
//       trigger,
//     });
//   };
//
//   const registerForPushNotifications = async () => {
//     if (!Device.isDevice) {
//       console.log("⚠️ Les notifications ne fonctionnent que sur un appareil réel");
//       return false;
//     }
//
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//
//     if (existingStatus !== "granted") {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//
//     if (finalStatus !== "granted") {
//       console.log("❌ Permissions de notifications refusées");
//       return false;
//     }
//
//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync("daily_reminder", {
//         name: "Rappel quotidien",
//         importance: Notifications.AndroidImportance.HIGH,
//         vibrationPattern: [0, 250, 250, 250],
//         sound: "default",  // ✅ string
//       });
//     }
//
//     return true;
//   };
//
//   useEffect(() => {
//     registerForPushNotifications();
//     loadBudgetData();
//
//     notificationListener.current = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("🔔 Notification reçue", notification);
//       }
//     );
//
//     responseListener.current = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         const screen = response.notification.request.content.data?.screen;
//         console.log("📱 Clic sur notification, screen:", screen);
//       }
//     );
//
//     return () => {
//       notificationListener.current?.remove();
//       responseListener.current?.remove();
//     };
//   }, []);
//
//   return {
//     registerForPushNotifications,
//     scheduleDailyReminder,
//     sendReminder,
//     areNotificationsEnabled,
//     setNotificationsEnabled,
//   };
// }









import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrency } from "../context/CurrencyContext";
import { loadTransactions } from "../utils/storage";

// Configuration de l'affichage des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const LAST_NOTIFICATION_DATE = "@daily_reminder_last_date";
const NOTIFICATIONS_ENABLED = "@notifications_enabled";

export function useDailyReminder() {
  const { formatCurrency } = useCurrency();
  //
  // const notificationListener = useRef<Notifications.Subscription> | null>(null) ;
  // const responseListener = useRef<Notifications.Subscription> | null>(null);
  const notificationListener = useRef<Notifications.Subscription | null>(null);
const responseListener = useRef<Notifications.Subscription | null>(null);

  // FIX: Calculer le budget directement et retourner les valeurs
  // au lieu de les stocker dans un state et les lire après setState (stale closure)
  const computeBudgetData = async () => {
    try {
      const [dreamsData, goalsData, transactionsData] = await Promise.all([
        AsyncStorage.getItem("@finance_app_dreams"),
        AsyncStorage.getItem("@finance_app_goals"),
        loadTransactions(),
      ]);

      const transactions = transactionsData;
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const currentMonthTransactions = transactions.filter((t: any) => {
        const date = new Date(t.date);
        return (
          date.getMonth() === currentMonth &&
          date.getFullYear() === currentYear
        );
      });

      const monthlyIncome = currentMonthTransactions
        .filter((t: any) => t.type === "income")
        .reduce((sum: number, t: any) => sum + t.amount, 0);

      const monthlyExpenses = currentMonthTransactions
        .filter((t: any) => t.type === "expense")
        .reduce((sum: number, t: any) => sum + t.amount, 0);

      const remainingBudget = monthlyIncome - monthlyExpenses;
      const daysLeft =
        new Date(currentYear, currentMonth + 1, 0).getDate() - now.getDate();
      const daily = daysLeft > 0 ? remainingBudget / daysLeft : 0;

      return {
        dailyBudget: daily > 0 ? daily : 0,
        remainingMonthlyBudget: remainingBudget > 0 ? remainingBudget : 0,
        remainingDays: daysLeft,
      };
    } catch (error) {
      console.error("Erreur chargement données budget:", error);
      return { dailyBudget: 0, remainingMonthlyBudget: 0, remainingDays: 0 };
    }
  };

  const areNotificationsEnabled = async () => {
    try {
      const enabled = await AsyncStorage.getItem(NOTIFICATIONS_ENABLED);
      return enabled === "true";
    } catch {
      return false;
    }
  };

  const setNotificationsEnabled = async (enabled: boolean) => {
    await AsyncStorage.setItem(NOTIFICATIONS_ENABLED, enabled.toString());
    if (enabled) {
      await scheduleDailyReminder();
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

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

  const hasSentToday = async (): Promise<boolean> => {
    const lastDate = await AsyncStorage.getItem(LAST_NOTIFICATION_DATE);
    const today = new Date().toDateString();
    return lastDate === today;
  };

  const markSentToday = async () => {
    await AsyncStorage.setItem(
      LAST_NOTIFICATION_DATE,
      new Date().toDateString()
    );
  };

  const sendReminder = async () => {
    const enabled = await areNotificationsEnabled();
    if (!enabled) return;

    const alreadySent = await hasSentToday();
    if (alreadySent) return;

    const [hasTransactions, budgetData] = await Promise.all([
      hasTransactionsToday(),
      computeBudgetData(), // FIX: valeurs fraîches, pas de stale state
    ]);

    let title = "";
    let body = "";

    if (!hasTransactions) {
      title = "📝 Ajoutez vos transactions";
      body = `Vous n'avez rien saisi aujourd'hui. Votre budget quotidien est de ${formatCurrency(budgetData.dailyBudget)}. Prenez 2 minutes pour suivre vos dépenses !`;
    } else {
      title = "💰 Suivi de votre budget";
      body = `Budget mensuel restant : ${formatCurrency(budgetData.remainingMonthlyBudget)} (${budgetData.remainingDays} jours). Vous êtes sur la bonne voie !`;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { screen: "transView" },
      },
      trigger: null,
    });

    await markSentToday();
  };

  const scheduleDailyReminder = async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const trigger: Notifications.CalendarTriggerInput = {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour: 19,
      minute: 0,
      repeats: true,
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "💡 Votre rappel financier",
        body: "Ouvrez l'application pour voir votre budget et vos objectifs.",
        sound: "default",
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { screen: "home" },
      },
      trigger,
    });
  };

  const registerForPushNotifications = async () => {
    if (!Device.isDevice) {
      console.log("⚠️ Les notifications ne fonctionnent que sur un appareil réel");
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("❌ Permissions de notifications refusées");
      return false;
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("daily_reminder", {
        name: "Rappel quotidien",
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        sound: "default",
      });
    }

    return true;
  };

  useEffect(() => {
    registerForPushNotifications();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification reçue", notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const screen = response.notification.request.content.data?.screen;
        console.log("📱 Clic sur notification, screen:", screen);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return {
    registerForPushNotifications,
    scheduleDailyReminder,
    sendReminder,
    areNotificationsEnabled,
    setNotificationsEnabled,
  };
}