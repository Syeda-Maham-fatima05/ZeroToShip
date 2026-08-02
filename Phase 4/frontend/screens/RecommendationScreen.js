// ==========================================
// RecommendationScreen — Provider Recommendations
// Premium Soft Minimalism: Gradient BG, Soft pills, Fade-up list
// ==========================================

import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ProviderCard from "../components/ProviderCard";
import { mockProviders } from "../data/mockData";
import colors from "../styles/colors";

const RecommendationScreen = ({ route, navigation }) => {
  const {
    providers = mockProviders,
    service = "Electricians",
    location = "Gulshan-e-Iqbal",
  } = route.params || {};

  const handleConfirmBooking = (provider) => {
    navigation.navigate("BookingMock", { provider, service, location });
  };

  const handleViewDetails = (provider) => {
    navigation.navigate("ProviderDetails", { provider });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.gradientStart} />

      {/* Premium Gradient Background */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {/* Subtle Map Elements in Background */}
      <Ionicons name="map-outline" size={300} color="rgba(23,59,94,0.02)" style={styles.bgMap} />
      <Ionicons name="location" size={80} color="rgba(249,168,38,0.03)" style={styles.bgPin} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Recommended Providers</Text>
          <Text style={styles.headerSubtitle}>Based on your request</Text>
        </View>
      </View>

      {/* Sort / Filter Bar */}
      <View style={styles.sortBar}>
        <TouchableOpacity style={styles.sortPill} activeOpacity={0.8}>
          <Text style={styles.sortPillText}>Sort: Rating</Text>
          <Ionicons name="chevron-down" size={14} color={colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.filterPill} activeOpacity={0.8}>
          <Ionicons name="funnel-outline" size={14} color={colors.textPrimary} />
          <Text style={styles.filterPillText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Provider List */}
      <FlatList
        data={providers}
        keyExtractor={(item) => item.provider_id.toString()}
        renderItem={({ item, index }) => (
          <ProviderCard
            provider={item}
            index={index} // pass index for staggered animation
            onBook={handleConfirmBooking}
            onViewDetails={handleViewDetails}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bgMap: {
    position: "absolute",
    top: 50,
    right: -100,
    transform: [{ rotate: "15deg" }],
  },
  bgPin: {
    position: "absolute",
    bottom: 100,
    left: -20,
    transform: [{ rotate: "-15deg" }],
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.75)",
    marginTop: 2,
  },
  sortBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  sortPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: "rgba(18, 38, 63, 0.05)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  sortPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    marginRight: 6,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "rgba(18, 38, 63, 0.05)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    marginLeft: 6,
  },
  listContainer: {
    paddingBottom: 40,
  },
});

export default RecommendationScreen;
