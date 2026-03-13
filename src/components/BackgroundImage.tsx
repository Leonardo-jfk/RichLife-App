// // src/components/BackgroundImage.tsx
// import { useColorScheme } from "@/hooks/use-color-scheme";
// import React from "react";
// import { ImageBackground, StyleSheet, ViewStyle } from "react-native";

// interface BackgroundImageProps {
//   children: React.ReactNode;
//   style?: ViewStyle;
//   opacity?: number;
//   blurRadius?: number;
// }

// export default function BackgroundImage({
//   children,
//   style,
//   opacity = 0.1,
//   blurRadius = 0.1,
// }: BackgroundImageProps) {
//   const colorScheme = useColorScheme();

//   const backgroundImage =
//     colorScheme === "dark"
//       ? require("../../assets/images/RichBackDark.jpg")
//       : require("../../assets/images/RichBackLight.jpg");

//   return (
//     <ImageBackground
//       source={backgroundImage}
//       style={[
//         styles.container,
//         style,
//         { borderWidth: 20, borderColor: "red", opacity: 0.1 },
//       ]}
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
//   // image: {
//   //   flex: 1,
//   //   resizeMode: "cover",
//   // },
// });

import { useColorScheme } from "@/hooks/use-color-scheme";
import React from "react";
import { ImageBackground, StyleSheet, ViewStyle } from "react-native";

interface BackgroundImageProps {
  children: React.ReactNode;
  style?: ViewStyle;
  opacity?: number;
  blurRadius?: number;
}

export default function BackgroundImage({
  children,
  style,
  opacity = 0.3, // Opacité de l'IMAGE seulement
  blurRadius = 5,
}: BackgroundImageProps) {
  const colorScheme = useColorScheme();
  const backgroundImage =
    colorScheme === "dark"
      ? require("../../assets/images/RichBackDark.jpg")
      : require("../../assets/images/RichBackLight.jpg");

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.container, style]} // On enlève l'opacité ici !
      imageStyle={{ opacity }} // L'opacité ne s'applique QU'À L'IMAGE
      blurRadius={blurRadius}
    >
      {children}
    </ImageBackground>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Fond noir pour que l'opacité 0.3 de l'image donne un look sombre
  },
  overlay: {
    flex: 1,
  },
});
