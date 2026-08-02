// ==========================================
// ProviderDetailScreen — Provider Details
// Premium Soft Minimalism: Gradient BG, Soft Cards,
// Radius 18 buttons
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
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

const ProviderDetailScreen = ({ route, navigation }) => {
  const { provider } = route.params || {};

  // Simple fade-up for content
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  if (!provider) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ padding: 20 }}>No provider data.</Text>
      </SafeAreaView>
    );
  }

  const statTiles = [
    { label: "Experience", value: provider.experience || "3+ Years", icon: "briefcase-outline" },
    { label: "Response Time", value: provider.responseTime || "15 mins", icon: "time-outline" },
    { label: "Jobs", value: `${provider.completedJobs || 100}+`, icon: "checkmark-done-outline" },
    { label: "Location", value: provider.location || "Karachi", icon: "location-outline" },
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
        <Text style={styles.headerTitle}>Provider Profile</Text>
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        >
          {/* Provider Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={36} color={colors.primary} />
              </View>
              {provider.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                </View>
              )}
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.providerName}>{provider.name}</Text>
              <Text style={styles.serviceType}>{provider.service_type}</Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color={colors.starFilled} />
                <Text style={styles.ratingValue}>{provider.rating ? provider.rating.toFixed(1) : "4.8"}</Text>
                <Text style={styles.reviewCount}>({provider.reviewCount || 0} reviews)</Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            {statTiles.map((stat, idx) => (
              <View key={idx} style={styles.statTile}>
                <Ionicons name={stat.icon} size={20} color={colors.accent} />
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>

          {/* About Section */}
          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>
              {provider.about ||
                "Professional service provider with years of experience in residential and commercial work. Dedicated to high-quality results and excellent customer service."}
            </Text>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() =>
              navigation.navigate("BookingMock", {
                provider,
                service: provider.service_type,
                location: provider.location,
              })
            }
            activeOpacity={0.85}
          >
            <Text style={styles.confirmButtonText}>Book Appointment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reviewsButton} activeOpacity={0.8}>
            <Text style={styles.reviewsButtonText}>View All Reviews</Text>
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
    textAlign: "center",
    marginRight: 24, // balance back button
  },
  heartButton: {
    position: "absolute",
    right: 16,
    padding: 6,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginTop: 20,
    shadowColor: "rgba(18, 38, 63, 0.08)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F0F4FA",
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.verified,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  serviceType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 6,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 24,
  },
  statTile: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: "rgba(18, 38, 63, 0.04)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  statLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 8,
  },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 2,
  },
  aboutSection: {
    marginTop: 8,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "rgba(23, 59, 94, 0.2)",
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
  reviewsButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  reviewsButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ProviderDetailScreen;
