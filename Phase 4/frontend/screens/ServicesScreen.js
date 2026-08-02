// ==========================================
// ServicesScreen — Explore Local Services
// Premium Soft Minimalism: Gradient BG, 
// Floating blobs, Clean 2-Column Grid
// ==========================================

import React, { useEffect, useRef } from "react";
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
import { serviceCategories, mockProviders } from "../data/mockData";
import colors from "../styles/colors";

// Animated Card Component for Fade-Up
const AnimatedCategoryCard = ({ cat, index, onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const entranceScale = useRef(new Animated.Value(0.96)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const elevationAnim = useRef(new Animated.Value(3)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.timing(entranceScale, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1.02, friction: 5, useNativeDriver: true }),
      Animated.timing(elevationAnim, { toValue: 10, duration: 150, useNativeDriver: false })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
      Animated.timing(elevationAnim, { toValue: 3, duration: 150, useNativeDriver: false })
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: entranceScale }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }], elevation: elevationAnim }]}>
        <View style={[styles.iconCircle, { backgroundColor: cat.bgColor || colors.background }]}>
          <Ionicons name={cat.icon} size={28} color={cat.color || colors.primary} />
        </View>
        <Text style={styles.cardLabel}>{cat.label}</Text>
        <Text style={styles.cardAvailable}>{cat.providerCount}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ServicesScreen = ({ navigation }) => {
  const handleSelectCategory = (category) => {
    const categoryId = category.id.toLowerCase();
    const categoryLabel = category.label.toLowerCase();

    // Find all providers matching category
    let matchedProviders = mockProviders.filter(
      (p) =>
        p.service_type.toLowerCase().includes(categoryId) ||
        categoryLabel.includes(p.service_type.toLowerCase())
    );

    if (!matchedProviders.length) {
      matchedProviders = mockProviders;
    }

    navigation.navigate("Recommendations", {
      providers: matchedProviders,
      service: category.label,
      location: "Gulshan-e-Iqbal",
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.gradientStart} />

      {/* Premium Gradient Background */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {/* Subtle Floating Blobs */}
      <View style={[styles.blob, styles.blobTopRight]} />
      <View style={[styles.blob, styles.blobBottomLeft]} />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.brandBadge}>
          <View style={styles.brandIconWrapper}>
            <Ionicons name="sparkles" size={14} color="#FFFFFF" />
          </View>
        </View>

        <TouchableOpacity style={styles.emergencyBadge} activeOpacity={0.8}>
          <Ionicons name="warning" size={14} color="#FFF" />
          <Text style={styles.emergencyText}>Emergency</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Explore Local Services</Text>

        {/* 2-Column Grid */}
        <View style={styles.grid}>
          {serviceCategories.map((cat, index) => (
            <AnimatedCategoryCard
              key={cat.id}
              cat={cat}
              index={index}
              onPress={() => handleSelectCategory(cat)}
            />
          ))}
        </View>
        
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
  blobBottomLeft: {
    bottom: -50,
    left: -50,
    backgroundColor: colors.blobBlue,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  brandBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.primary,
    letterSpacing: 0.5,
  },
  emergencyBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.emergency,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "rgba(239, 68, 68, 0.3)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  emergencyText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 12,
    marginLeft: 6,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginVertical: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    alignItems: "center",
    shadowColor: "rgba(18, 38, 63, 0.06)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  cardAvailable: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
});

export default ServicesScreen;
