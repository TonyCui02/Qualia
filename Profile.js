import React from "react";
import AppLoading from "expo-app-loading";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function Profile() {
  const [loaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "Quicksand", fontSize: 30 }}>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F8",
    alignItems: "center",
    justifyContent: "center",
  },
});
