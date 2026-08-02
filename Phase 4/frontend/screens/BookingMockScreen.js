// ==========================================
// BookingMockScreen — Booking Confirmation
// Premium Soft Minimalism: Uber-style flow
// ==========================================

import React, { useRef, useEffect } from "react";
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
import colors from "../styles/colors";

const BookingMockScreen = ({ route, navigation }) => {
  const {
    provider = {},
    service = "Electrician",
    location = "Gulshan-e-Iqbal",
  } = route.params || {};

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const [isBooking, setIsBooking] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const checkScale = useRef(new Animated.Value(0)).current;

  const handleConfirm = () => {
    // Button scale down -> show loading -> checkmark -> Alert
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.94, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start(() => {
      setIsBooking(true);
      setTimeout(() => {
        setIsBooking(false);
        setIsDone(true);
        Animated.spring(checkScale, {
          toValue: 1,
          friction: 4,
          tension: 40,
          useNativeDriver: true,
        }).start();

        setTimeout(() => {
          Alert.alert(
            "Booking Confirmed! ✅",
            `Your mock booking with ${provider.name || "Provider"} has been created successfully.`,
            [
              {
                text: "View My Bookings",
                onPress: () => navigation.navigate("MainTabs", { screen: "Bookings" }),
              },
              { text: "Close", onPress: () => navigation.popToTop() },
            ]
          );
        }, 400);
      }, 1000);
    });
  };

  const bookingDetails = [
    { label: "Provider", value: provider.name || "M. Aslam" },
    { label: "Service", value: service },
    { label: "Date", value: "Tomorrow, 8 May 2024" },
    { label: "Time", value: "8:00 AM" },
    { label: "Location", value: location },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.gradientStart} />

      {/* Premium Gradient Background */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirm Booking</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
          {/* Illustration */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationCircle}>
              <Ionicons name="calendar" size={48} color={colors.accent} />
            </View>
            <Animated.View style={[styles.illustrationCheckCircle, { transform: [{ scale: checkScale }] }]}>
              <Ionicons name="checkmark" size={18} color="#FFFFFF" />
            </Animated.View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Almost there!</Text>
          <Text style={styles.subtitle}>
            Please review your booking details below.
          </Text>

          {/* Booking Details Card */}
          <View style={styles.detailsCard}>
            {bookingDetails.map((detail, idx) => (
              <View
                key={idx}
                style={[
                  styles.detailRow,
                  idx < bookingDetails.length - 1 && styles.detailRowBorder,
                ]}
              >
                <Text style={styles.detailLabel}>{detail.label}</Text>
                <Text style={styles.detailValue}>{detail.value}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <Animated.View style={{ width: "100%", transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                isDone && { backgroundColor: colors.success },
              ]}
              onPress={handleConfirm}
              activeOpacity={0.85}
              disabled={isBooking || isDone}
            >
              <Text style={styles.confirmButtonText}>
                {isBooking ? "Booking..." : isDone ? "✓ Confirmed" : "Confirm Booking (Mock)"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    padding: 4,
    marginRight: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: "center",
  },
  illustrationContainer: {
    position: "relative",
    marginTop: 32,
    marginBottom: 24,
  },
  illustrationCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(18, 38, 63, 0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  illustrationCheckCircle: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: "center",
  },
  detailsCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    marginBottom: 32,
    shadowColor: "rgba(18, 38, 63, 0.06)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  confirmButton: {
    width: "100%",
    backgroundColor: colors.accent,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "rgba(249, 168, 38, 0.3)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  cancelButton: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookingMockScreen;
