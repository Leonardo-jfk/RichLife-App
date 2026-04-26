/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';
//
// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? 'light';
//   const colorFromProps = props[theme];
//
//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }

// use-theme-color.ts
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  // Normalisation : 'unspecified' -> 'light' (ou 'dark' selon préférence)
  const normalizedTheme = theme === 'dark' ? 'dark' : 'light';
  const colorFromProps = props[normalizedTheme] as string | undefined;

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[normalizedTheme][colorName];
  }
}