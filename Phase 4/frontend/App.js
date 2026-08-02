// ==========================================
// App.js — Root Entry Point
// ==========================================

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import colors from "./styles/colors";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.background}
      />
      <AppNavigator />
    </NavigationContainer>
  );
}
