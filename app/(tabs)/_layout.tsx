// import { HapticTab } from "@/components/haptic-tab";
// import { IconSymbol } from "@/components/ui/icon-symbol";
// import { Tabs } from "expo-router";
// import { ThemeProvider, useTheme } from "../../src/context/ThemeContext"; // Importe useTheme
//
// import { Parisienne_400Regular, useFonts } from "@expo-google-fonts/parisienne";
// import * as SplashScreen from "expo-splash-screen";
// import React, { useEffect } from "react";
//
// import { LanguageProvider } from "../../src/context/LanguageContext";
// import { CurrencyProvider } from "../../src/context/CurrencyContext";
// import { AuthProvider } from '../src/context/AuthContext';
// import { SyncProvider } from '../src/context/SyncContext';
//
// function TabNavigation() {
//   const { colors, theme } = useTheme(); // Récupère les couleurs dynamiques
//
//   return (
//     <Tabs
//       screenOptions={{
//         // Utilise les couleurs de ton thème
//         tabBarActiveTintColor: colors.primary,
//         tabBarInactiveTintColor: colors.icon,
//         tabBarStyle: {
//           // Fond noir si dark, blanc si light
//           backgroundColor: theme === "dark" ? "#000000" : "#FFFFFF",
//           borderTopColor:
//             theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
//           height: 60,
//           paddingBottom: 10,
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
//
//       <Tabs.Screen
//         name="transView"
//         options={{
//           title: "Transactions",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol
//               size={24}
//               name={"brain"}
//               color={color}
//               // type={focused ? "palette" : "monochrome"}
//             />
//           ),
//         }}
//       />
//
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
//
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
//
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
//
// // export default function TabLayout() {
// //   return (
// //     <ThemeProvider>
// //       <TabNavigation />
// //     </ThemeProvider>
// //   );
// // }
//
// export default function TabLayout() {
//   // Chargement des polices manuscrites
//   const [loaded, error] = useFonts({
//     FrenchScript: Parisienne_400Regular,
//   });
//
//   useEffect(() => {
//     if (loaded || error) {
//      void SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);
//
//   // Si les polices ne sont pas chargées, on n'affiche rien (ou un écran de chargement)
//   if (!loaded && !error) {
//     return null;
//   }

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Tabs, Redirect } from "expo-router";
import { useTheme } from "../../src/context/ThemeContext";
import { useAuth } from "../../src/context/AuthContext";
import { ActivityIndicator, View } from "react-native";
import { useFonts, Parisienne_400Regular } from "@expo-google-fonts/parisienne";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

function TabNavigation() {
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

export default function TabLayout() {
  const { session, isLoading: authLoading } = useAuth();

  // Chargement de la police Parisienne
  const [fontsLoaded, fontsError] = useFonts({
    FrenchScript: Parisienne_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  // Attendre le chargement de la police ET de l'auth
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <TabNavigation />;
}


  return (
    // <ThemeProvider>
    //   <TabNavigation />
    // </ThemeProvider>
      <ThemeProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <AuthProvider>
            <SyncProvider>
              <TabNavigation />
            </SyncProvider>
          </AuthProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}










// src/constants/translations.ts

export type Language = "fr" | "en" | "es" | "de" | "ru";

export const translations = {
  fr: {
    tabs: {
      home: "Accueil",
      trans: "Flux",
      goals: "Objectifs",
      wisdom: "Sagesse",
      system: "Système",
    },
    home: {
      dailyBudget: "Budget Quotidien",
      remainingDays: "jours restants",
      monthlyIncome: "Revenu mensuel",
      totalExpenses: "Dépenses totales",
      creditTitle: "Tes Crédits",
      monthlySummary: "Résumé du Mois",
      monthlyFlow: "Flux mensuel",
      income: "Revenus",
      expenses: "Dépenses",
      monthlySavings: "Économies du mois",
      annualProjection: "Projection annuelle",
      dailyBudgetTitle: "Budget journalier",
      perDay: "par jour",
      remainingBudget: "Budget restant du mois",
      monthlyPayments: "Mensualités crédits",
      manageCredits: "Gérer mes crédits",
      monthlyContributions: "Contributions mensuelles",
      dreams: "Rêves",
      goals: "Objectifs",
      totalSavedForProjects: "Total épargné pour les projets",
      projectProgress: "Progression des projets",
      overallProgress: "Progrès global",
    },
    transactions: {
      title: "Transactions",
      viewAllMonths: "Voir tout mois",
      viewMonth: "Voir mois",
      income: "Revenus",
      expenses: "Dépenses",
      monthlyBalance: "Solde du mois",
      totalBalance: "Solde total",
      noTransactions: "Aucune transaction",
      noTransactionsThisMonth: "Aucune transaction ce mois-ci",
      addTransaction: "Ajouter une transaction",
    },
    goals: {
      dreams: "Rêves",
      objectives: "Objectifs",
      addDream: "Ajouter un rêve",
      addGoal: "Ajouter un objectif",
      newDream: "Nouveau rêve",
      newGoal: "Nouvel objectif",
      dreamName: "Nom du rêve",
      goalTitle: "Titre",
      targetAmount: "Montant objectif",
      alreadySaved: "Déjà épargné",
      monthlySaving: "Épargne mensuelle",
      optional: "optionnel",
      category: "Catégorie",
      type: "Type",
      remaining: "Reste",
      target: "Objectif",
      saved: "Épargné",
      current: "Actuel",
      quickAdd: "Ajouter rapidement",
      monthlySavings: "Épargne mensuelle",
      perMonth: "/mois",
      setMonthlyToSeeProjection: "Définissez une épargne mensuelle pour voir la projection",
      goalReachedIn: "Objectif atteint dans",
      noDreams: "Aucun rêve pour le moment",
      noGoals: "Aucun objectif pour le moment",
      deleteConfirm: "Voulez-vous supprimer",
      congratulations: "Félicitations !",
      goalAchieved: "Vous avez atteint votre objectif",
    },
    wisdom: {
      title: "Sagesse Financière",
      subtitle: "La vraie richesse n'est pas de dépenser des millions, mais de vivre heureux avec 5 à 10 % de ses revenus.",
      adviceBySituation: "Conseils par situation",
      lowIncome: "Quand tu gagnes moins de 100k/an",
      highIncome: "Quand tu gagnes plus de 100k/an",
      investmentStrategies: "Stratégies d'investissement",
      winningMindset: "Mentalité gagnante",
      focusOnSkills: "Focus sur l'augmentation de tes compétences",
      saveEvenIfDifficult: "Épargne 10-20% même si c'est difficile",
      investInEducation: "Investis dans ta formation (livres, cours)",
      createAdditionalIncome: "Crée des sources de revenus additionnelles",
      checkMonthlyExpenses: "Vérifie tes dépenses mensuelles",
      dontIncreaseLifestyle: "Ne pas augmenter ton train de vie proportionnellement",
      investSurplus: "Investis 50-70% de ton surplus",
      diversifyInvestments: "Diversifie tes investissements",
      thinkRealEstate: "Pense à l'immobilier et aux actions",
      prepareRetirement: "Prépare ta retraite tôt",
      sellWorstFirst: "Always Sell Your Worst Stock First",
      diversifyPortfolio: "Diversifie ton portefeuille",
      investInWhatYouKnow: "Investis dans ce que tu comprends",
      patienceIsKey: "La patience est ta meilleure amie",
      compoundInterest: "Les intérêts composés sont magiques",
      believeYouCan: "Whether you believe you can or not, you're right",
      laterEqualsNever: "Later equals never - agis maintenant",
      controlMind: "Contrôle ton esprit et tes émotions",
      trackAchievements: "Keep track of your achievements",
      painPlusReflection: "La douleur + réflexion = progrès",
      noQuotesFound: "Aucune citation trouvée",
      all: "Tous",
      skills: "Compétences",
      invest: "Investir",
      save: "Économiser",
      mindset: "Mentalité",
      action: "Action",
      discipline: "Discipline",
      minimalism: "Minimalisme",
    },
    system: {
      title: "Time is limited",
      appearance: "Apparence",
      lightMode: "Mode Clair",
      darkMode: "Mode Sombre",
      language: "Langue",
      preferences: "Préférences",
      notifications: "Notifications",
      biometrics: "Biométrie",
      currency: "Devise",
      information: "Informations",
      version: "Version",
      build: "Build",
      developer: "Développeur",
      actions: "Actions",
      exportData: "Exporter les données",
      importData: "Importer des données",
      clearAllData: "Effacer toutes les données",
      clearDataConfirm: "Êtes-vous sûr de vouloir supprimer toutes vos transactions, rêves et objectifs ? Cette action est irréversible.",
      clearDataSuccess: "Toutes les données ont été effacées.",
      clearDataError: "Impossible d'effacer les données.",
      selectCurrency: "Sélectionner une devise",
      search: "Rechercher...",
      comingSoon: "Fonctionnalité à venir",
    },
    common: {
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      add: "Ajouter",
      edit: "Modifier",
      close: "Fermer",
      confirm: "Confirmer",
      loading: "Chargement...",
      success: "Succès",
      error: "Erreur",
    },
    categories: {
      travel: "Voyage",
      car: "Voiture",
      house: "Maison",
      retirement: "Retraite",
      education: "Éducation",
      wedding: "Mariage",
      business: "Entreprise",
      other: "Autre",
      investment: "Investissement",
    },
  },
  en: {
    tabs: {
      home: "Home",
      trans: "Cashflow",
      goals: "Goals",
      wisdom: "Wisdom",
      system: "System",
    },
    home: {
      dailyBudget: "Daily Budget",
      remainingDays: "days left",
      monthlyIncome: "Monthly Income",
      totalExpenses: "Total Expenses",
      creditTitle: "Your Credits",
      monthlySummary: "Monthly Summary",
      monthlyFlow: "Monthly Flow",
      income: "Income",
      expenses: "Expenses",
      monthlySavings: "Monthly Savings",
      annualProjection: "Annual Projection",
      dailyBudgetTitle: "Daily Budget",
      perDay: "per day",
      remainingBudget: "Remaining monthly budget",
      monthlyPayments: "Monthly credit payments",
      manageCredits: "Manage my credits",
      monthlyContributions: "Monthly contributions",
      dreams: "Dreams",
      goals: "Goals",
      totalSavedForProjects: "Total saved for projects",
      projectProgress: "Project progress",
      overallProgress: "Overall progress",
    },
    transactions: {
      title: "Transactions",
      viewAllMonths: "View all months",
      viewMonth: "View month",
      income: "Income",
      expenses: "Expenses",
      monthlyBalance: "Monthly balance",
      totalBalance: "Total balance",
      noTransactions: "No transactions",
      noTransactionsThisMonth: "No transactions this month",
      addTransaction: "Add a transaction",
    },
    goals: {
      dreams: "Dreams",
      objectives: "Goals",
      addDream: "Add a dream",
      addGoal: "Add a goal",
      newDream: "New dream",
      newGoal: "New goal",
      dreamName: "Dream name",
      goalTitle: "Title",
      targetAmount: "Target amount",
      alreadySaved: "Already saved",
      monthlySaving: "Monthly savings",
      optional: "optional",
      category: "Category",
      type: "Type",
      remaining: "Remaining",
      target: "Target",
      saved: "Saved",
      current: "Current",
      quickAdd: "Quick add",
      monthlySavings: "Monthly savings",
      perMonth: "/month",
      setMonthlyToSeeProjection: "Set monthly savings to see projection",
      goalReachedIn: "Goal reached in",
      noDreams: "No dreams yet",
      noGoals: "No goals yet",
      deleteConfirm: "Do you want to delete",
      congratulations: "Congratulations!",
      goalAchieved: "You have reached your goal",
    },
    wisdom: {
      title: "Financial Wisdom",
      subtitle: "True wealth is not spending millions, but living happily on 5-10% of your income.",
      adviceBySituation: "Advice by situation",
      lowIncome: "When you earn less than 100k/year",
      highIncome: "When you earn more than 100k/year",
      investmentStrategies: "Investment strategies",
      winningMindset: "Winning mindset",
      focusOnSkills: "Focus on increasing your skills",
      saveEvenIfDifficult: "Save 10-20% even if it's difficult",
      investInEducation: "Invest in your education (books, courses)",
      createAdditionalIncome: "Create additional income sources",
      checkMonthlyExpenses: "Check your monthly expenses",
      dontIncreaseLifestyle: "Don't increase your lifestyle proportionally",
      investSurplus: "Invest 50-70% of your surplus",
      diversifyInvestments: "Diversify your investments",
      thinkRealEstate: "Think about real estate and stocks",
      prepareRetirement: "Prepare for retirement early",
      sellWorstFirst: "Always Sell Your Worst Stock First",
      diversifyPortfolio: "Diversify your portfolio",
      investInWhatYouKnow: "Invest in what you understand",
      patienceIsKey: "Patience is your best friend",
      compoundInterest: "Compound interest is magical",
      believeYouCan: "Whether you believe you can or not, you're right",
      laterEqualsNever: "Later equals never - act now",
      controlMind: "Control your mind and emotions",
      trackAchievements: "Keep track of your achievements",
      painPlusReflection: "Pain + reflection = progress",
      noQuotesFound: "No quotes found",
      all: "All",
      skills: "Skills",
      invest: "Invest",
      save: "Save",
      mindset: "Mindset",
      action: "Action",
      discipline: "Discipline",
      minimalism: "Minimalism",
    },
    system: {
      title: "Time is limited",
      appearance: "Appearance",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      language: "Language",
      preferences: "Preferences",
      notifications: "Notifications",
      biometrics: "Biometrics",
      currency: "Currency",
      information: "Information",
      version: "Version",
      build: "Build",
      developer: "Developer",
      actions: "Actions",
      exportData: "Export data",
      importData: "Import data",
      clearAllData: "Clear all data",
      clearDataConfirm: "Are you sure you want to delete all your transactions, dreams and goals? This action is irreversible.",
      clearDataSuccess: "All data has been deleted.",
      clearDataError: "Unable to delete data.",
      selectCurrency: "Select currency",
      search: "Search...",
      comingSoon: "Feature coming soon",
    },
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      add: "Add",
      edit: "Edit",
      close: "Close",
      confirm: "Confirm",
      loading: "Loading...",
      success: "Success",
      error: "Error",
    },
    categories: {
      travel: "Travel",
      car: "Car",
      house: "House",
      retirement: "Retirement",
      education: "Education",
      wedding: "Wedding",
      business: "Business",
      other: "Other",
      investment: "Investment",
    },
  },
  es: {
    tabs: {
      home: "Inicio",
      trans: "Flujo",
      goals: "Objetivos",
      wisdom: "Sabiduría",
      system: "Sistema",
    },
    home: {
      dailyBudget: "Presupuesto Diario",
      remainingDays: "días restantes",
      monthlyIncome: "Ingresos mensuales",
      totalExpenses: "Gastos totales",
      creditTitle: "Tus Créditos",
      monthlySummary: "Resumen del Mes",
      monthlyFlow: "Flujo mensual",
      income: "Ingresos",
      expenses: "Gastos",
      monthlySavings: "Ahorros del mes",
      annualProjection: "Proyección anual",
      dailyBudgetTitle: "Presupuesto diario",
      perDay: "por día",
      remainingBudget: "Presupuesto restante del mes",
      monthlyPayments: "Pagos mensuales de créditos",
      manageCredits: "Gestionar mis créditos",
      monthlyContributions: "Contribuciones mensuales",
      dreams: "Sueños",
      goals: "Objetivos",
      totalSavedForProjects: "Total ahorrado para proyectos",
      projectProgress: "Progreso de proyectos",
      overallProgress: "Progreso general",
    },
    transactions: {
      title: "Transacciones",
      viewAllMonths: "Ver todos los meses",
      viewMonth: "Ver mes",
      income: "Ingresos",
      expenses: "Gastos",
      monthlyBalance: "Saldo del mes",
      totalBalance: "Saldo total",
      noTransactions: "Sin transacciones",
      noTransactionsThisMonth: "Sin transacciones este mes",
      addTransaction: "Añadir transacción",
    },
    goals: {
      dreams: "Sueños",
      objectives: "Objetivos",
      addDream: "Añadir sueño",
      addGoal: "Añadir objetivo",
      newDream: "Nuevo sueño",
      newGoal: "Nuevo objetivo",
      dreamName: "Nombre del sueño",
      goalTitle: "Título",
      targetAmount: "Monto objetivo",
      alreadySaved: "Ya ahorrado",
      monthlySaving: "Ahorro mensual",
      optional: "opcional",
      category: "Categoría",
      type: "Tipo",
      remaining: "Restante",
      target: "Objetivo",
      saved: "Ahorrado",
      current: "Actual",
      quickAdd: "Añadir rápido",
      monthlySavings: "Ahorro mensual",
      perMonth: "/mes",
      setMonthlyToSeeProjection: "Define un ahorro mensual para ver la proyección",
      goalReachedIn: "Objetivo alcanzado en",
      noDreams: "Sin sueños por ahora",
      noGoals: "Sin objetivos por ahora",
      deleteConfirm: "¿Quieres eliminar",
      congratulations: "¡Felicidades!",
      goalAchieved: "Has alcanzado tu objetivo",
    },
    wisdom: {
      title: "Sabiduría Financiera",
      subtitle: "La verdadera riqueza no es gastar millones, sino vivir feliz con el 5-10% de tus ingresos.",
      adviceBySituation: "Consejos por situación",
      lowIncome: "Cuando ganas menos de 100k/año",
      highIncome: "Cuando ganas más de 100k/año",
      investmentStrategies: "Estrategias de inversión",
      winningMindset: "Mentalidad ganadora",
      focusOnSkills: "Enfócate en aumentar tus habilidades",
      saveEvenIfDifficult: "Ahorra 10-20% aunque sea difícil",
      investInEducation: "Invierte en tu educación (libros, cursos)",
      createAdditionalIncome: "Crea fuentes de ingresos adicionales",
      checkMonthlyExpenses: "Revisa tus gastos mensuales",
      dontIncreaseLifestyle: "No aumentes tu estilo de vida proporcionalmente",
      investSurplus: "Invierte 50-70% de tu excedente",
      diversifyInvestments: "Diversifica tus inversiones",
      thinkRealEstate: "Piensa en bienes raíces y acciones",
      prepareRetirement: "Prepárate para la jubilación temprano",
      sellWorstFirst: "Siempre vende tu peor acción primero",
      diversifyPortfolio: "Diversifica tu cartera",
      investInWhatYouKnow: "Invierte en lo que entiendes",
      patienceIsKey: "La paciencia es tu mejor amiga",
      compoundInterest: "El interés compuesto es mágico",
      believeYouCan: "Tanto si crees que puedes como si no, tienes razón",
      laterEqualsNever: "Después es nunca - actúa ahora",
      controlMind: "Controla tu mente y emociones",
      trackAchievements: "Sigue tus logros",
      painPlusReflection: "Dolor + reflexión = progreso",
      noQuotesFound: "No se encontraron citas",
      all: "Todos",
      skills: "Habilidades",
      invest: "Invertir",
      save: "Ahorrar",
      mindset: "Mentalidad",
      action: "Acción",
      discipline: "Disciplina",
      minimalism: "Minimalismo",
    },
    system: {
      title: "El tiempo es limitado",
      appearance: "Apariencia",
      lightMode: "Modo Claro",
      darkMode: "Modo Oscuro",
      language: "Idioma",
      preferences: "Preferencias",
      notifications: "Notificaciones",
      biometrics: "Biometría",
      currency: "Moneda",
      information: "Información",
      version: "Versión",
      build: "Build",
      developer: "Desarrollador",
      actions: "Acciones",
      exportData: "Exportar datos",
      importData: "Importar datos",
      clearAllData: "Borrar todos los datos",
      clearDataConfirm: "¿Estás seguro de que quieres borrar todas tus transacciones, sueños y objetivos? Esta acción es irreversible.",
      clearDataSuccess: "Todos los datos han sido borrados.",
      clearDataError: "No se pudieron borrar los datos.",
      selectCurrency: "Seleccionar moneda",
      search: "Buscar...",
      comingSoon: "Próximamente",
    },
    common: {
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      add: "Añadir",
      edit: "Editar",
      close: "Cerrar",
      confirm: "Confirmar",
      loading: "Cargando...",
      success: "Éxito",
      error: "Error",
    },
    categories: {
      travel: "Viaje",
      car: "Coche",
      house: "Casa",
      retirement: "Jubilación",
      education: "Educación",
      wedding: "Boda",
      business: "Negocio",
      other: "Otro",
      investment: "Inversión",
    },
  },
  de: {
    tabs: {
      home: "Start",
      trans: "Fluss",
      goals: "Ziele",
      wisdom: "Weisheit",
      system: "System",
    },
    home: {
      dailyBudget: "Tagesbudget",
      remainingDays: "Tage übrig",
      monthlyIncome: "Monatliches Einkommen",
      totalExpenses: "Gesamtausgaben",
      creditTitle: "Ihre Kredite",
      monthlySummary: "Monatsübersicht",
      monthlyFlow: "Monatlicher Fluss",
      income: "Einnahmen",
      expenses: "Ausgaben",
      monthlySavings: "Monatliche Ersparnisse",
      annualProjection: "Jahresprojektion",
      dailyBudgetTitle: "Tagesbudget",
      perDay: "pro Tag",
      remainingBudget: "Verbleibendes Monatsbudget",
      monthlyPayments: "Monatliche Kreditzahlungen",
      manageCredits: "Kredite verwalten",
      monthlyContributions: "Monatliche Beiträge",
      dreams: "Träume",
      goals: "Ziele",
      totalSavedForProjects: "Gespart für Projekte",
      projectProgress: "Projektfortschritt",
      overallProgress: "Gesamtfortschritt",
    },
    transactions: {
      title: "Transaktionen",
      viewAllMonths: "Alle Monate anzeigen",
      viewMonth: "Monat anzeigen",
      income: "Einnahmen",
      expenses: "Ausgaben",
      monthlyBalance: "Monatssaldo",
      totalBalance: "Gesamtsaldo",
      noTransactions: "Keine Transaktionen",
      noTransactionsThisMonth: "Keine Transaktionen in diesem Monat",
      addTransaction: "Transaktion hinzufügen",
    },
    goals: {
      dreams: "Träume",
      objectives: "Ziele",
      addDream: "Traum hinzufügen",
      addGoal: "Ziel hinzufügen",
      newDream: "Neuer Traum",
      newGoal: "Neues Ziel",
      dreamName: "Traumname",
      goalTitle: "Titel",
      targetAmount: "Zielbetrag",
      alreadySaved: "Bereits gespart",
      monthlySaving: "Monatliche Sparrate",
      optional: "optional",
      category: "Kategorie",
      type: "Typ",
      remaining: "Verbleibend",
      target: "Ziel",
      saved: "Gespart",
      current: "Aktuell",
      quickAdd: "Schnell hinzufügen",
      monthlySavings: "Monatliche Sparrate",
      perMonth: "/Monat",
      setMonthlyToSeeProjection: "Monatliche Sparrate festlegen für Projektion",
      goalReachedIn: "Ziel erreicht in",
      noDreams: "Keine Träume vorhanden",
      noGoals: "Keine Ziele vorhanden",
      deleteConfirm: "Möchten Sie löschen",
      congratulations: "Glückwunsch!",
      goalAchieved: "Sie haben Ihr Ziel erreicht",
    },
    wisdom: {
      title: "Finanzielle Weisheit",
      subtitle: "Wahrer Reichtum bedeutet nicht, Millionen auszugeben, sondern glücklich mit 5-10 % Ihres Einkommens zu leben.",
      adviceBySituation: "Ratschläge nach Situation",
      lowIncome: "Wenn Sie weniger als 100k/Jahr verdienen",
      highIncome: "Wenn Sie mehr als 100k/Jahr verdienen",
      investmentStrategies: "Anlagestrategien",
      winningMindset: "Gewinner-Mindset",
      focusOnSkills: "Konzentrieren Sie sich auf Ihre Fähigkeiten",
      saveEvenIfDifficult: "Sparen Sie 10-20%, auch wenn es schwer fällt",
      investInEducation: "Investieren Sie in Ihre Ausbildung (Bücher, Kurse)",
      createAdditionalIncome: "Schaffen Sie zusätzliche Einkommensquellen",
      checkMonthlyExpenses: "Überprüfen Sie Ihre monatlichen Ausgaben",
      dontIncreaseLifestyle: "Steigern Sie Ihren Lebensstil nicht proportional",
      investSurplus: "Investieren Sie 50-70% Ihres Überschusses",
      diversifyInvestments: "Diversifizieren Sie Ihre Investitionen",
      thinkRealEstate: "Denken Sie an Immobilien und Aktien",
      prepareRetirement: "Bereiten Sie sich früh auf den Ruhestand vor",
      sellWorstFirst: "Verkaufen Sie immer Ihre schlechteste Aktie zuerst",
      diversifyPortfolio: "Diversifizieren Sie Ihr Portfolio",
      investInWhatYouKnow: "Investieren Sie in das, was Sie verstehen",
      patienceIsKey: "Geduld ist Ihr bester Freund",
      compoundInterest: "Zinseszins ist magisch",
      believeYouCan: "Ob Sie glauben, dass Sie können oder nicht, Sie haben recht",
      laterEqualsNever: "Später ist nie - handeln Sie jetzt",
      controlMind: "Kontrollieren Sie Ihren Geist und Ihre Emotionen",
      trackAchievements: "Verfolgen Sie Ihre Erfolge",
      painPlusReflection: "Schmerz + Reflexion = Fortschritt",
      noQuotesFound: "Keine Zitate gefunden",
      all: "Alle",
      skills: "Fähigkeiten",
      invest: "Investieren",
      save: "Sparen",
      mindset: "Mindset",
      action: "Aktion",
      discipline: "Disziplin",
      minimalism: "Minimalismus",
    },
    system: {
      title: "Zeit ist begrenzt",
      appearance: "Erscheinungsbild",
      lightMode: "Hellmodus",
      darkMode: "Dunkelmodus",
      language: "Sprache",
      preferences: "Einstellungen",
      notifications: "Benachrichtigungen",
      biometrics: "Biometrie",
      currency: "Währung",
      information: "Informationen",
      version: "Version",
      build: "Build",
      developer: "Entwickler",
      actions: "Aktionen",
      exportData: "Daten exportieren",
      importData: "Daten importieren",
      clearAllData: "Alle Daten löschen",
      clearDataConfirm: "Sind Sie sicher, dass Sie alle Transaktionen, Träume und Ziele löschen möchten? Diese Aktion ist unwiderruflich.",
      clearDataSuccess: "Alle Daten wurden gelöscht.",
      clearDataError: "Daten konnten nicht gelöscht werden.",
      selectCurrency: "Währung auswählen",
      search: "Suchen...",
      comingSoon: "Demnächst verfügbar",
    },
    common: {
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      add: "Hinzufügen",
      edit: "Bearbeiten",
      close: "Schließen",
      confirm: "Bestätigen",
      loading: "Laden...",
      success: "Erfolg",
      error: "Fehler",
    },
    categories: {
      travel: "Reise",
      car: "Auto",
      house: "Haus",
      retirement: "Ruhestand",
      education: "Bildung",
      wedding: "Hochzeit",
      business: "Geschäft",
      other: "Andere",
      investment: "Investition",
    },
  },
  ru: {
    tabs: {
      home: "Главная",
      trans: "Движение",
      goals: "Цели",
      wisdom: "Мудрость",
      system: "Система",
    },
    home: {
      dailyBudget: "Ежедневный бюджет",
      remainingDays: "дней осталось",
      monthlyIncome: "Месячный доход",
      totalExpenses: "Общие расходы",
      creditTitle: "Ваши кредиты",
      monthlySummary: "Итоги месяца",
      monthlyFlow: "Месячный поток",
      income: "Доходы",
      expenses: "Расходы",
      monthlySavings: "Месячные сбережения",
      annualProjection: "Годовой прогноз",
      dailyBudgetTitle: "Ежедневный бюджет",
      perDay: "в день",
      remainingBudget: "Оставшийся бюджет на месяц",
      monthlyPayments: "Месячные платежи по кредитам",
      manageCredits: "Управление кредитами",
      monthlyContributions: "Месячные взносы",
      dreams: "Мечты",
      goals: "Цели",
      totalSavedForProjects: "Всего накоплено на проекты",
      projectProgress: "Прогресс проектов",
      overallProgress: "Общий прогресс",
    },
    transactions: {
      title: "Транзакции",
      viewAllMonths: "Показать все месяцы",
      viewMonth: "Показать месяц",
      income: "Доходы",
      expenses: "Расходы",
      monthlyBalance: "Баланс за месяц",
      totalBalance: "Общий баланс",
      noTransactions: "Нет транзакций",
      noTransactionsThisMonth: "Нет транзакций в этом месяце",
      addTransaction: "Добавить транзакцию",
    },
    goals: {
      dreams: "Мечты",
      objectives: "Цели",
      addDream: "Добавить мечту",
      addGoal: "Добавить цель",
      newDream: "Новая мечта",
      newGoal: "Новая цель",
      dreamName: "Название мечты",
      goalTitle: "Название",
      targetAmount: "Целевая сумма",
      alreadySaved: "Уже накоплено",
      monthlySaving: "Ежемесячные сбережения",
      optional: "необязательно",
      category: "Категория",
      type: "Тип",
      remaining: "Осталось",
      target: "Цель",
      saved: "Накоплено",
      current: "Текущее",
      quickAdd: "Быстрое добавление",
      monthlySavings: "Ежемесячные сбережения",
      perMonth: "/месяц",
      setMonthlyToSeeProjection: "Установите ежемесячные сбережения для просмотра прогноза",
      goalReachedIn: "Цель будет достигнута через",
      noDreams: "Пока нет мечт",
      noGoals: "Пока нет целей",
      deleteConfirm: "Вы хотите удалить",
      congratulations: "Поздравляем!",
      goalAchieved: "Вы достигли своей цели",
    },
    wisdom: {
      title: "Финансовая мудрость",
      subtitle: "Истинное богатство — не тратить миллионы, а жить счастливо на 5-10% своего дохода.",
      adviceBySituation: "Советы по ситуации",
      lowIncome: "Когда вы зарабатываете менее 100k/год",
      highIncome: "Когда вы зарабатываете более 100k/год",
      investmentStrategies: "Инвестиционные стратегии",
      winningMindset: "Мышление победителя",
      focusOnSkills: "Сосредоточьтесь на развитии навыков",
      saveEvenIfDifficult: "Откладывайте 10-20%, даже если это трудно",
      investInEducation: "Инвестируйте в образование (книги, курсы)",
      createAdditionalIncome: "Создавайте дополнительные источники дохода",
      checkMonthlyExpenses: "Проверяйте ежемесячные расходы",
      dontIncreaseLifestyle: "Не увеличивайте образ жизни пропорционально",
      investSurplus: "Инвестируйте 50-70% избытка",
      diversifyInvestments: "Диверсифицируйте инвестиции",
      thinkRealEstate: "Думайте о недвижимости и акциях",
      prepareRetirement: "Готовьтесь к пенсии заранее",
      sellWorstFirst: "Всегда продавайте худшую акцию первой",
      diversifyPortfolio: "Диверсифицируйте портфель",
      investInWhatYouKnow: "Инвестируйте в то, что понимаете",
      patienceIsKey: "Терпение — ваш лучший друг",
      compoundInterest: "Сложный процент — это магия",
      believeYouCan: "Верите ли вы, что можете, или нет — вы правы",
      laterEqualsNever: "Потом равно никогда — действуйте сейчас",
      controlMind: "Контролируйте свой разум и эмоции",
      trackAchievements: "Отслеживайте свои достижения",
      painPlusReflection: "Боль + размышление = прогресс",
      noQuotesFound: "Цитаты не найдены",
      all: "Все",
      skills: "Навыки",
      invest: "Инвестировать",
      save: "Экономить",
      mindset: "Мышление",
      action: "Действие",
      discipline: "Дисциплина",
      minimalism: "Минимализм",
    },
    system: {
      title: "Время ограничено",
      appearance: "Внешний вид",
      lightMode: "Светлый режим",
      darkMode: "Тёмный режим",
      language: "Язык",
      preferences: "Настройки",
      notifications: "Уведомления",
      biometrics: "Биометрия",
      currency: "Валюта",
      information: "Информация",
      version: "Версия",
      build: "Сборка",
      developer: "Разработчик",
      actions: "Действия",
      exportData: "Экспорт данных",
      importData: "Импорт данных",
      clearAllData: "Удалить все данные",
      clearDataConfirm: "Вы уверены, что хотите удалить все транзакции, мечты и цели? Это действие необратимо.",
      clearDataSuccess: "Все данные удалены.",
      clearDataError: "Не удалось удалить данные.",
      selectCurrency: "Выберите валюту",
      search: "Поиск...",
      comingSoon: "Скоро будет доступно",
    },
    common: {
      save: "Сохранить",
      cancel: "Отмена",
      delete: "Удалить",
      add: "Добавить",
      edit: "Редактировать",
      close: "Закрыть",
      confirm: "Подтвердить",
      loading: "Загрузка...",
      success: "Успешно",
      error: "Ошибка",
    },
    categories: {
      travel: "Путешествие",
      car: "Автомобиль",
      house: "Дом",
      retirement: "Пенсия",
      education: "Образование",
      wedding: "Свадьба",
      business: "Бизнес",
      other: "Другое",
      investment: "Инвестиции",
    },
  },
};
