import React, { useState, useEffect } from "react";
import BottomTabs from "./BottomTabs";
import { ThemeProvider, Button } from "react-native-elements";
import { useFonts } from "expo-font";

const theme = {
  colors: {
    primary: "#FA4A0C",
  },
};

export default function App() {
  const [loaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <BottomTabs />
    </ThemeProvider>
  );
}
