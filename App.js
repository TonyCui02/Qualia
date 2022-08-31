import React, { useState, useEffect } from "react";
import { Appearance } from "react-native";
import BottomTabs from "./BottomTabs";
import { ThemeProvider } from "react-native-elements";
import { useFonts } from "expo-font";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";
import keys from "./src/config/keys";

const Stack = createStackNavigator();

const colorScheme = Appearance.getColorScheme();
if (colorScheme === "dark") {
  // Use dark color scheme
}

const theme = {
  colors: {
    red: "green",
  },
};

export default function App() {
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(keys.firebaseConfig);
  }

  const [isSignedIn, setSignedIn] = useState(true);

  const [loaded] = useFonts({
    Quicksand: require("./assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf"),
    Quicksand_Bold: require("./assets/fonts/Quicksand/Quicksand-Bold.ttf"),
    Quicksand_Regular: require("./assets/fonts/Quicksand/Quicksand-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider useDark={colorScheme === "dark"}>
      <NavigationContainer>
        <Stack.Navigator
          // screenOptions={{
          //   headerShown: false,
          // }}
          // headerMode="none"
          screenOptions={{
            headerStyle: {
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
              // height: 4,
            },
            headerTitle: "",
          }}
          
        >
          {isSignedIn ? (
            <>
              <Stack.Screen name="BottomTabs" component={BottomTabs} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                  title: "Sign in",
                }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: "Sign up" }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    // <ThemeProvider theme={theme}>
    //   <NavigationContainer>
    //     <Stack.Navigator initialRouteName="Home" headerMode="none">
    //       <Stack.Screen name="Home" component={HomeScreen} />
    //     </Stack.Navigator>
    //   </NavigationContainer>
    // </ThemeProvider>
  );
}
