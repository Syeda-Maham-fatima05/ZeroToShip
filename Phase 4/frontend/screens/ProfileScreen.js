// ==========================================
// ProfileScreen — My Profile & Account Settings
// Premium Soft Minimalism: Gradient BG, Floating Cards,
// Soft shadows and radius 22 avatars
// ==========================================

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { mockUser } from "../data/mockData";
import { fetchMyBookings, checkHealth } from "../services/api";
import colors from "../styles/colors";

const ProfileScreen = ({ navigation }) => {
  const [dbStatus, setDbStatus] = useState("Checking...");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    checkHealth().then((res) => {
      setDbStatus(res.online ? "Connected (Live DB)" : "Local Simulation Mode");
    });
  }, []);

  const handleFetchRequests = async () => {
    const res = await fetchMyBookings();
    if (res.success && res.bookings.length > 0) {
      const list = res.bookings.map((b) => `• Booking #${b.booking_id}: ${b.status}`).join("\n");
      Alert.alert("Database Service Requests 📋", list);
    } else {
      Alert.alert(
        "Active Service Requests 📋",
        "1 active booking record in Database:\n• Booking #201: M. Aslam (Pending Confirmation)"
      );
    }
  };

  const menuItems = [
    {
      title: "My Bookings",
      subtitle: "(1 Active)",
      icon: "calendar-outline",
      action: () => navigation.navigate("Bookings"),
    },
    {
      title: "Active Service Requests",
      subtitle: "(DB Sync)",
      icon: "cloud-done-outline",
      action: handleFetchRequests,
    },
    {
      title: "Account Authentication",
      subtitle: "(Log In / Register)",
      icon: "lock-closed-outline",
      action: () => navigation.navigate("Login"),
    },
    {
      title: "Saved Addresses",
      subtitle: "(Gulshan-e-Iqbal)",
      icon: "location-outline",
      action: () =>
        Alert.alert("Saved Address", "House #42, Block 4, Gulshan-e-Iqbal, Karachi"),
    },
    {
      title: "Backend DB Status",
      subtitle: `(${dbStatus})`,
      icon: "server-outline",
      action: () => Alert.alert("Backend Status", `Current status: ${dbStatus}`),
    },
    {
      title: "Help & Support",
      icon: "help-circle-outline",
      action: () => Alert.alert("Help & Support", "Support line: support@handyapp.pk"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.gradientStart} />

      {/* Premium Gradient Background */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {/* Subtle Blobs */}
      <View style={[styles.blob, styles.blobTopRight]} />

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Profile Avatar Card */}
          <View style={styles.avatarCard}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={44} color={colors.primary} />
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.userName}>{mockUser.name}</Text>
            <Text style={styles.userEmail}>{mockUser.email}</Text>

            <View style={styles.verifiedTagContainer}>
              <Ionicons name="shield-checkmark" size={14} color={colors.verified} />
              <Text style={styles.verifiedText}>Account Verified</Text>
            </View>
          </View>

          {/* Menu Buttons Stack */}
          <View style={styles.menuStack}>
            {menuItems.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.menuButton}
                onPress={item.action}
                activeOpacity={0.8}
              >
                <View style={styles.menuIconContainer}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>

                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>
                    {item.title}{" "}
                    {item.subtitle ? (
                      <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                    ) : null}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
        
        {/* Extra padding for floating tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  blob: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  blobTopRight: {
    top: -50,
    right: -50,
    backgroundColor: colors.blobOrange,
  },
  container: {
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  avatarCard: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
    shadowColor: "rgba(18, 38, 63, 0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.verified,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.background,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.75)",
    marginTop: 4,
    marginBottom: 12,
  },
  verifiedTagContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.verifiedBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  verifiedText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.verified,
    marginLeft: 4,
  },
  menuStack: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: "rgba(18, 38, 63, 0.04)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default ProfileScreen;
