// import { Ionicons } from "@expo/vector-icons";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createStackNavigator } from "@react-navigation/stack";
// import { COLORS } from "../constants/colors";
//
// import AddTransactionScreen from "../../screens/AddTransactionScreen";
// import HomeScreen from "../../screens/HomeScreen";
// import StatsScreen from "../../screens/StatsScreen";
// import TransactionDetailsScreen from "../../screens/transaction-details";
// import TransactionsScreen from "../../screens/TransactionsScreen";
//
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
//
// const HomeStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="HomeMain"
//       component={HomeScreen}
//       options={{ headerShown: false }}
//     />
//     <Stack.Screen
//       name="AddTransaction"
//       component={AddTransactionScreen}
//       options={{ title: "Nouvelle transaction" }}
//     />
//     <Stack.Screen
//       name="TransactionDetails"
//       component={TransactionDetailsScreen}
//       options={{ title: "Détails" }}
//     />
//   </Stack.Navigator>
// );
//
// const TransactionsStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="TransactionsList"
//       component={TransactionsScreen}
//       options={{ title: "Toutes les transactions" }}
//     />
//     <Stack.Screen
//       name="TransactionDetails"
//       component={TransactionDetailsScreen}
//       options={{ title: "Détails" }}
//     />
//   </Stack.Navigator>
// );
//
// const AppNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;
//           if (route.name === "Accueil") {
//             iconName = focused ? "home" : "home-outline";
//           } else if (route.name === "Transactions") {
//             iconName = focused ? "list" : "list-outline";
//           } else if (route.name === "Statistiques") {
//             iconName = focused ? "stats-chart" : "stats-chart-outline";
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: COLORS.primary,
//         tabBarInactiveTintColor: COLORS.textLight,
//         tabBarStyle: {
//           backgroundColor: COLORS.surface,
//           borderTopWidth: 1,
//           borderTopColor: COLORS.background,
//         },
//       })}
//     >
//       <Tab.Screen
//         name="Accueil"
//         component={HomeStack}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Transactions"
//         component={TransactionsStack}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen name="Statistiques" component={StatsScreen} />
//     </Tab.Navigator>
//   );
// };
//
// export default AppNavigator;
