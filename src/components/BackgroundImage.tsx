// import React from "react";
// import { ImageBackground, StyleSheet, ViewStyle } from "react-native";
// import { useAppTheme } from "../hooks/useAppTheme";

// interface BackgroundImageProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
//   opacity?: number;
//   blurRadius?: number;
// }

// export default function BackgroundImage({
//   children,
//   style,
//   opacity = 0.3,
//   blurRadius = 5,
// }: BackgroundImageProps) {
//   const { theme } = useAppTheme();

//   const backgroundImage =
//     theme === "dark"
//       ? require("../../assets/images/RichBackDark.jpg")
//       : require("../../assets/images/RichBackLight.jpg");

//   return (
//     <ImageBackground
//       source={backgroundImage}
//       style={[styles.container, style]}
//       imageStyle={{ opacity }}
//       blurRadius={blurRadius}
//     >
//       {children}
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// // import React from "react";
// import React, { useEffect, useState } from "react";
// import { ImageBackground, StyleSheet, ViewStyle } from "react-native";
// import { useTheme } from "../context/ThemeContext"; // ← Changement ici

// interface BackgroundImageProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
//   opacity?: number;
//   blurRadius?: number;
// }

// // export default function BackgroundImage({
// //   children,
// //   style,
// //   opacity = 0.6,
// //   blurRadius = 2,
// // }: BackgroundImageProps) {
// //   const { theme } = useTheme(); // ← Utilisez useTheme

// //   const backgroundImage =
// //     theme === "dark"
// //       ? require("../../assets/images/RichBackDark.jpg")
// //       : require("../../assets/images/RichBackLight.jpg");

// //   return (
// //     <ImageBackground
// //       source={backgroundImage}
// //       style={[styles.container, style]}
// //       imageStyle={{ opacity }}
// //       blurRadius={blurRadius}
// //     >
// //       {children}
// //     </ImageBackground>
// //   );
// // }

// export default function BackgroundImage({
//   children,
//   style,
//   opacity = 0.6,
//   blurRadius = 2,
// }: BackgroundImageProps) {
//   const { theme } = useTheme();
//   const [imageSource, setImageSource] = useState(
//     theme === "dark"
//       ? require("../../assets/images/RichBackDark.jpg")
//       : require("../../assets/images/RichBackLight.jpg"),
//   );

//   // FORCER le re-rendu quand le thème change
//   useEffect(() => {
//     setImageSource(
//       theme === "dark"
//         ? require("../../assets/images/RichBackDark.jpg")
//         : require("../../assets/images/RichBackLight.jpg"),
//     );
//   }, [theme]); // ← Dépendance sur theme

//   return (
//     <ImageBackground
//       source={imageSource}
//       style={[styles.container, style]}
//       imageStyle={{ opacity }}
//       blurRadius={blurRadius}
//     >
//       {children}
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

import React, { useCallback, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

// Définition des thèmes d'images disponibles
export type ImageTheme =
  | "default"
  | "wisdom"
  | "transactions"
  | "goals"
  | "system";

interface BackgroundImageProps {
  children: React.ReactNode;
  style?: ViewStyle;
  opacity?: number;
  blurRadius?: number;
  imageTheme?: ImageTheme; // ← Nouvelle prop pour choisir le thème d'image
}

// Configuration des images par thème et par mode
const IMAGE_CONFIG = {
  default: {
    dark: require("../../assets/images/RichBackDark.jpg"),
    light: require("../../assets/images/RichBackLight.jpg"),
  },
  wisdom: {
    dark: require("../../assets/images/Mates.jpg"),
    light: require("../../assets/images/ArgSticker.jpg"),
  },
  transactions: {
    dark: require("../../assets/images/100FR.jpg"),
    light: require("../../assets/images/50FR.jpg"),
  },
  goals: {
    dark: require("../../assets/images/RichBackDark.jpg"),
    light: require("../../assets/images/RichBackLight.jpg"),
  },
  system: {
    dark: require("../../assets/images/100FR.jpg"),
    light: require("../../assets/images/10FR.jpg"),
  },
};

interface BackgroundImageProps {
  children: React.ReactNode;
  style?: ViewStyle;
  opacity?: number;
  blurRadius?: number;
  imageTheme?: ImageTheme;
  overlayColor?: string; // Nouvelle prop
  overlayOpacity?: number; // Nouvelle prop
}

// export default function BackgroundImage({
//   children,
//   style,
//   opacity = 0.6,
//   blurRadius = 2,
//   imageTheme = "default", // ← Par défaut, utilise l'image par défaut
// }: BackgroundImageProps) {
//   const { theme } = useTheme();

//   // const getImageSource = () => {
//   //   const config = IMAGE_CONFIG[imageTheme];
//   //   return theme === "dark" ? config.dark : config.light;
//   // };
//   const getImageSource = useCallback(() => {
//     const config = IMAGE_CONFIG[imageTheme];
//     return theme === "dark" ? config.dark : config.light;
//   }, [theme, imageTheme]);

//   const [imageSource, setImageSource] = useState(getImageSource());

//   useEffect(() => {
//     setImageSource(getImageSource());
//   }, [getImageSource]);

//   return (
//     <ImageBackground
//       source={imageSource}
//       style={[styles.container, style]}
//       imageStyle={{ opacity }}
//       blurRadius={blurRadius}
//     >
//       {children}
//     </ImageBackground>
//   );
// }

export default function BackgroundImage({
  children,
  style,
  opacity = 0.6,
  blurRadius = 2,
  imageTheme = "default",
  overlayColor = "#000000", // Noir par défaut
  overlayOpacity = 0.3, // 30% d'opacité
}: BackgroundImageProps) {
  const { theme } = useTheme();

  const getImageSource = useCallback(() => {
    const config = IMAGE_CONFIG[imageTheme];
    return theme === "dark" ? config.dark : config.light;
  }, [theme, imageTheme]);

  const [imageSource, setImageSource] = useState(getImageSource());

  useEffect(() => {
    setImageSource(getImageSource());
  }, [getImageSource]);

  return (
    <ImageBackground
      source={imageSource}
      style={[styles.container, style]}
      imageStyle={{ opacity }}
      blurRadius={blurRadius}
    >
      {/* Overlay de couleur */}
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: overlayColor, opacity: overlayOpacity },
        ]}
      />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
