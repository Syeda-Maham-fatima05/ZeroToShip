// ==========================================
// App Navigator — Floating Bottom Tabs + Stack
// Premium Soft Minimalism navigation
// Floating rounded white tab bar with orange indicator
// ==========================================

import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";
import ServicesScreen from "../screens/ServicesScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import ProviderDetailScreen from "../screens/ProviderDetailScreen";
import BookingMockScreen from "../screens/BookingMockScreen";
import BookingsScreen from "../screens/BookingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

import colors from "../styles/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ---- Custom Central AI FAB Button ----
const CustomTabButton = ({ onPress }) => (
  <TouchableOpacity
    style={styles.fabContainer}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={styles.fabButton}>
      <Ionicons name="sparkles" size={24} color="#FFFFFF" />
    </View>
  </TouchableOpacity>
);

// ---- Bottom Tab Navigator ----
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Services") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return (
            <View style={styles.tabIconWrapper}>
              <Ionicons name={iconName} size={22} color={color} />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesScreen}
        options={{ tabBarLabel: "Services" }}
      />
      <Tab.Screen
        name="AddAction"
        component={ChatScreen}
        options={{
          tabBarLabel: "",
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{ tabBarLabel: "Bookings" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}

// ---- Main Root Stack Navigator ----
const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="AIAssistant" component={ChatScreen} />
      <Stack.Screen name="Recommendations" component={RecommendationScreen} />
      <Stack.Screen name="ProviderDetails" component={ProviderDetailScreen} />
      <Stack.Screen name="BookingMock" component={BookingMockScreen} />
      <Stack.Screen name="Bookings" component={BookingsScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  // ---- Floating Tab Bar ----
  tabBar: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 20 : 12,
    left: 16,
    right: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    height: 68,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopWidth: 0,
    shadowColor: "rgba(18, 38, 63, 0.12)",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: "600",
    marginTop: -2,
  },
  tabIconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.tabActive,
    marginTop: 3,
  },
  // ---- Central FAB ----
  fabContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.fabBg,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(249, 168, 38, 0.35)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
  },
});

export default AppNavigator;
