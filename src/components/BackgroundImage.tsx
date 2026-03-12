// src/components/BackgroundImage.tsx
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
  opacity = 0.5,
  blurRadius = 0,
}: BackgroundImageProps) {
  const colorScheme = useColorScheme();

  const backgroundImage =
    colorScheme === "dark"
      ? require("../../assets/images/RichBackDark.jpg")
      : require("../../assets/images/RichBackLight.jpg");

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.container, style]}
      imageStyle={[styles.image, { opacity }]}
      blurRadius={blurRadius}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
