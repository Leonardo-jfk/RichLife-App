// import { StyleSheet, Text, type TextProps } from 'react-native';

// import { useThemeColor } from '@/hooks/use-theme-color';

// export type ThemedTextProps = TextProps & {
//   lightColor?: string;
//   darkColor?: string;
//   type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
// };

// export function ThemedText({
//   style,
//   lightColor,
//   darkColor,
//   type = 'default',
//   ...rest
// }: ThemedTextProps) {
//   const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

//   return (
//     <Text
//       style={[
//         { color },
//         type === 'default' ? styles.default : undefined,
//         type === 'title' ? styles.title : undefined,
//         type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
//         type === 'subtitle' ? styles.subtitle : undefined,
//         type === 'link' ? styles.link : undefined,
//         style,
//       ]}
//       {...rest}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   default: {
//     fontSize: 16,
//     lineHeight: 24,
//   },
//   defaultSemiBold: {
//     fontSize: 16,
//     lineHeight: 24,
//     fontWeight: '600',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     lineHeight: 32,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   link: {
//     lineHeight: 30,
//     fontSize: 16,
//     color: '#0a7ea4',
//   },
// });

import { StyleSheet, Text, type TextProps, useColorScheme } from "react-native";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  forceOpaque?: boolean; // Option pour forcer l'opacité
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  forceOpaque = true, // Par défaut, on force l'opacité
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();

  // Détermine la couleur de base selon le thème
  let textColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

  // Si des couleurs spécifiques sont fournies, on les utilise
  if (lightColor && colorScheme === "light") {
    textColor = lightColor;
  } else if (darkColor && colorScheme === "dark") {
    textColor = darkColor;
  }

  // Si on force l'opacité et que la couleur est en rgba, on la convertit
  if (forceOpaque && textColor.startsWith("rgba")) {
    const matches = textColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (matches) {
      const [r, g, b] = matches;
      textColor = `rgb(${r}, ${g}, ${b})`;
    }
  }

  return (
    <Text
      style={[
        { color: textColor },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4", // Cette couleur reste pour les liens
  },
});
