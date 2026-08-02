// ==========================================
// ProviderCard Component — Premium Soft Minimalism
// Radius 22, premium shadow, fade-up animation,
// press scale, AI badge, clean Airbnb-style layout
// ==========================================

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

const ProviderCard = ({ provider, onBook, onViewDetails, index = 0 }) => {
  if (!provider) return null;

  const [expanded, setExpanded] = React.useState(false);

  // ---- Fade-Up Animation ----
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const entranceScale = useRef(new Animated.Value(0.97)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const elevationAnim = useRef(new Animated.Value(4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.timing(entranceScale, {
        toValue: 1,
        duration: 400,
        delay: index * 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 0.97, friction: 5, useNativeDriver: true }),
      Animated.timing(elevationAnim, { toValue: 10, duration: 150, useNativeDriver: false })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
      Animated.timing(elevationAnim, { toValue: 4, duration: 150, useNativeDriver: false })
    ]).start();
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // ---- Avatar ----
  const renderAvatar = () => {
    const tints = ["#FFF8E8", "#EFF6FF", "#E6F9ED", "#F3E8FF", "#FCE7F3"];
    const bg = tints[(provider.provider_id || 1) % tints.length];

    return (
      <View style={[styles.avatar, { backgroundColor: bg }]}>
        <Text style={styles.avatarText}>
          {provider.initials || (provider.name ? provider.name.charAt(0) : "P")}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: entranceScale }],
      }}
    >
      <TouchableOpacity
        onPress={toggleExpand}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }], elevation: elevationAnim }]}>
        {/* Best Match Ribbon */}
        {provider.isBestMatch && (
          <View style={styles.bestMatchTag}>
            <Ionicons name="sparkles" size={11} color="#FFFFFF" />
            <Text style={styles.bestMatchText}>BEST MATCH</Text>
          </View>
        )}

        {/* Top Header Row */}
        <View style={styles.headerRow}>
          {renderAvatar()}

          <View style={styles.infoCol}>
            <View style={styles.nameRow}>
              <Text style={styles.name}>{provider.name}</Text>
              {provider.isVerified && (
                <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color={colors.verified}
                  style={{ marginLeft: 4 }}
                />
              )}
            </View>

            <Text style={styles.serviceType}>
              {provider.service_type || "Service Provider"} • {provider.location || "Karachi"}
            </Text>

            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color={colors.starFilled} />
              <Text style={styles.ratingText}>
                {provider.rating ? provider.rating.toFixed(1) : "4.8"}
              </Text>
              <Text style={styles.reviewCount}>
                ({provider.reviewCount || 100}+ reviews)
              </Text>
            </View>
          </View>

          {/* Price Tag */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{provider.service_price || "Rs. 2,000"}</Text>
            <Text style={styles.priceSub}>per service</Text>
          </View>
        </View>

        {/* Key Details Pills */}
        <View style={styles.detailsRow}>
          <View style={styles.detailPill}>
            <Ionicons name="briefcase-outline" size={12} color={colors.accent} />
            <Text style={styles.detailPillText}>{provider.experience || "5+ Years"}</Text>
          </View>

          <View style={styles.detailPill}>
            <Ionicons name="time-outline" size={12} color={colors.accent} />
            <Text style={styles.detailPillText}>{provider.responseTime || "15 mins"}</Text>
          </View>

          <View style={styles.detailPill}>
            <Ionicons name="location-outline" size={12} color={colors.accent} />
            <Text style={styles.detailPillText}>{provider.distance || "0.8 km"}</Text>
          </View>
        </View>

        {/* Inline Expandable Extra Information */}
        {expanded && (
          <View style={styles.expandedSection}>
            <View style={styles.expandedItem}>
              <Ionicons name="call-outline" size={14} color={colors.primary} />
              <Text style={styles.expandedItemText}>
                Phone: <Text style={{ fontWeight: "700" }}>{provider.phone_number || "0301-1234567"}</Text>
              </Text>
            </View>
            <View style={styles.expandedItem}>
              <Ionicons name="time" size={14} color={colors.primary} />
              <Text style={styles.expandedItemText}>
                Availability: <Text style={{ fontWeight: "700" }}>{provider.availability || "Full Day"}</Text>
              </Text>
            </View>
            {provider.about && (
              <Text style={styles.aboutText}>{provider.about}</Text>
            )}
          </View>
        )}

        {/* AI Explanation Snippet */}
        {provider.explanation && (
          <View style={styles.explanationBox}>
            <Ionicons name="sparkles" size={14} color={colors.accent} />
            <Text style={styles.explanationText}>{provider.explanation}</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.detailsBtn}
            onPress={() => onViewDetails ? onViewDetails(provider) : toggleExpand()}
            activeOpacity={0.8}
          >
            <Text style={styles.detailsBtnText}>{expanded ? "Collapse" : "View Details"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() => onBook && onBook(provider)}
            activeOpacity={0.85}
          >
            <Ionicons name="calendar-outline" size={14} color="#FFFFFF" />
            <Text style={styles.bookBtnText}>Book Now</Text>
          </TouchableOpacity>
        </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "rgba(18, 38, 63, 0.08)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4,
    position: "relative",
  },
  bestMatchTag: {
    position: "absolute",
    top: -10,
    right: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    elevation: 2,
  },
  bestMatchText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    marginLeft: 3,
    letterSpacing: 0.5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary,
  },
  infoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  serviceType: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    marginLeft: 3,
  },
  reviewCount: {
    fontSize: 11,
    color: colors.textMuted,
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: "flex-end",
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  priceSub: {
    fontSize: 9,
    color: colors.textOnPrimary,
  },
  detailsRow: {
    flexDirection: "row",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  detailPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 8,
  },
  detailPillText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.textPrimary,
    marginLeft: 4,
  },
  expandedSection: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  expandedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  expandedItemText: {
    fontSize: 12,
    color: colors.textPrimary,
    marginLeft: 6,
  },
  aboutText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 18,
    fontStyle: "italic",
  },
  explanationBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFF8E8",
    padding: 12,
    borderRadius: 14,
    marginTop: 12,
  },
  explanationText: {
    fontSize: 12,
    color: colors.primary,
    marginLeft: 6,
    flex: 1,
    lineHeight: 17,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  detailsBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 11,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: colors.primary,
    marginRight: 8,
  },
  detailsBtnText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  bookBtn: {
    flex: 1.2,
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 11,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  bookBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default ProviderCard;
