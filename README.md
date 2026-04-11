# 💰 RichLife

**RichLife** is a personal finance app that helps users take control of their money, track expenses, set savings goals, and build lasting wealth — not by earning millions, but by living happily with 5-10% of their income.

This project is a cross-platform mobile application built with React Native (Expo), featuring a serene design inspired by French elegance and stoic financial wisdom.

---

## 📸 Screenshots

<p align="center">
  <img src="photo/readme/Collage2.png" width="300" alt="Dashboard View">
  <img src="photo/readme/Collage1.png" width="300" alt="Goals View">
  <img src="photo/readme/Collage3.png" width="300" alt="Transactions View">
</p>
<p align="center">
  <em>Dashboard &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Goals &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Transactions</em>
</p>

---

## 🏛️ Project Vision

> *"Being extremely rich is not spending millions — it's living happily with 5-10% of your income."*

The app helps users **bridge the gap** between earning money and living intentionally through daily budget tracking, goal setting, expense monitoring, and a curated library of financial wisdom.

---

## ✨ Features

Here's what you can do with RichLife:

- **Monthly Summary** – View your income, expenses, and savings at a glance with automatic calculations from your transactions.
- **Daily Budget** – Know exactly how much you can spend each day based on your remaining budget and active credits.
- **Credit Management** – Spread large purchases over multiple months with custom credit tracking and progress indicators.
- **Transaction History** – Add, edit, and delete transactions with date selection and category organization. View by month or all time.
- **Dreams & Goals** – Set personal dreams (travel, car, house) and financial goals with progress tracking and monthly contribution planning.
- **Projections** – See exactly when you'll reach your goals based on your monthly savings rate.
- **Wisdom Library** – Browse curated financial quotes from Warren Buffett, Naval Ravikant, Charlie Munger, and more. Filter by category and tags.
- **Situation Advice** – Get tailored financial advice based on your income level, investment strategies, and mindset.
- **Dark / Light Mode** – Fully supports both themes with elegant transitions and dynamic backgrounds.
- **Multilingual** – Available in French (primary) with support for multiple currencies (USD, EUR, GBP, JPY, etc.).

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React Native (Expo)** | Cross-platform mobile framework |
| **TypeScript** | Type-safe development |
| **AsyncStorage** | Local data persistence for transactions, dreams, and goals |
| **Expo Router** | File-based navigation |
| **Ionicons / MaterialIcons** | Cross-platform icons (SF Symbols on iOS, Material on Android) |
| **Context API** | Theme and currency management |
| **Custom Hooks** | Reusable logic for daily budget, monthly stats, and credits |
| **DateTimePicker** | Date selection for transactions |

---

## 📖 The Process

I started by designing the core navigation with a **TabView** containing five main screens: Home (Dashboard), Transactions, Goals, Wisdom, and System.

Next, I built the **transaction system**. Users can add income or expenses with categories, descriptions, and dates. Transactions are stored locally and can be viewed by month or all time. The monthly summary automatically calculates total income, expenses, and savings from actual transactions.

Then came the **dreams and goals system**. Each dream has a target amount, current savings, category, and monthly contribution. The app calculates progress percentages and projects when the goal will be reached. Users can add quick contributions with preset amounts.

For the **daily budget feature**, I implemented a credit system. Large purchases can be amortized over several months, and the app calculates how much the user can spend per day based on remaining budget and active credits. The formula is simple: `(income - expenses - credit payments) / remaining days in month`.

The **wisdom section** features a curated collection of financial quotes with filtering by category and tags. Users can explore advice based on their situation (low income, high income, investment strategies, mindset).

To make the experience elegant, I added a **French script font** (Parisienne) for titles and a sophisticated background system with dark/light mode support. The `IslandCard` component creates floating card effects with dynamic theming.

**Currency support** was implemented through a currency context, allowing users to select their preferred currency from a list of major world currencies.

Throughout development, I focused on creating a serene, non-stressful financial experience — one that encourages mindful spending rather than obsessive tracking.

---

## 🧠 What I Learned

During this project, I picked up important skills and gained a deeper understanding of cross-platform development:

### 🗂️ State Management with Context API
- Using `ThemeContext` and `CurrencyContext` to manage global app state
- Creating custom hooks like `useTheme()` and `useCurrency()` for clean component access
- Persisting user preferences across sessions

### 💾 Local Persistence
- Implementing `AsyncStorage` for reliable data storage across sessions
- Storing and retrieving complex objects like dreams, goals, and transactions
- Managing multiple storage keys for different data types

### 🎨 Cross-Platform Design
- Building components like `BackgroundImage` and `IslandCard` that adapt to both iOS and Android
- Handling icon compatibility between SF Symbols (iOS) and MaterialIcons (Android)
- Creating responsive layouts that work on different screen sizes

### 🌙 Theme Management
- Implementing dark/light mode with smooth transitions
- Creating dynamic colors that respond to theme changes
- Using overlays to improve text readability on background images

### 📊 Complex Calculations
- Calculating daily budgets based on remaining days in the month
- Projecting goal completion dates using monthly contribution rates
- Managing credit amortization over custom time periods
- Computing monthly statistics aggregating dreams, goals, and transactions

### 🧪 Custom Hooks
- Creating `useMonthlyStats` for aggregated financial data
- Building `useDailyBudget` for real-time spending calculations
- Implementing `useFocusEffect` to refresh data when screens appear

### 🎯 Form Handling
- Managing complex forms for adding dreams, goals, and credits
- Implementing auto-calculation of monthly payments based on total amount and duration
- Validating user input with helpful error messages

### 🖼️ Dynamic Backgrounds
- Using different background images for light and dark modes
- Adding blur and opacity effects for better text readability
- Creating overlay systems for theme-specific visual adjustments

---

## 🚀 How Can It Be Improved?

- Add Google/Apple login
- Add data export/import
- Add offline mode with automatic synchronization
- Add data sharing between family members
- Implement **data export** (CSV/PDF) for transactions and goals
- Add **recurring transactions** for monthly bills and subscriptions
- Create **charts and graphs** for visualizing spending patterns
- Implement **cloud sync** to backup user data across devices
- Create a **widget** for home screen showing daily budget
- Add **Apple Watch / Wear OS** companion app for quick expense logging
- Integrate **bank APIs** for automatic transaction import (Plaid, etc.)
- Add **biometric authentication** for enhanced security
- Add **family sharing** for joint budgets and goals

---

## 🏃‍♂️ Running the Project

To run the project in your local environment, follow these steps:

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/Leonardo-jfk/RichLife-App.git
   cd RichLife-App
