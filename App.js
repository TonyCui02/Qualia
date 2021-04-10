import React, { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import BottomTabs from './BottomTabs';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>estet!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      primary: "#FA4A0C",
      accent: "#f1c40f",
    },
  };

  return (

    <BottomTabs/>
  );
}