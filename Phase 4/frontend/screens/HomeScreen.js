// ==========================================
// HomeScreen — Main Dashboard
// Premium Soft Minimalism: Gradient BG, Glass Search,
// Clean 6-grid cards, Floating blobs
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
  Animated,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { serviceCategories, mockProviders, mockUser } from "../data/mockData";
import { orchestrateQuery } from "../services/api";
import colors from "../styles/colors";

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
        styles.categoryCardWrapper,
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
        <Animated.View style={[styles.categoryCard, { transform: [{ scale: scaleAnim }], elevation: elevationAnim }]}>
          <View style={[styles.categoryIcon, { backgroundColor: cat.bgColor }]}>
            <Ionicons name={cat.icon} size={28} color={cat.color} />
          </View>
          <Text style={styles.categoryLabel}>{cat.label}</Text>
          <Text style={styles.categoryCount}>{cat.providerCount}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const HomeScreen = ({ navigation }) => {
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      icon: "checkmark-circle",
      color: "#2ED573",
      title: "Booking Confirmed",
      message: "Ali Electric Works has confirmed your appointment for tomorrow at 10:00 AM.",
      time: "10 mins ago",
      read: false,
    },
    {
      id: "2",
      icon: "pricetag",
      color: "#F9A826",
      title: "Special Weekend Offer",
      message: "Get 15% discount on all AC Repair & Plumbing services in Gulshan-e-Iqbal!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      icon: "sparkles",
      color: "#173B5E",
      title: "AI Orchestrator Active",
      message: "Phase 1 local seed database loaded with 50 verified service providers.",
      time: "1 day ago",
      read: true,
    },
  ]);

  const handleMarkAllRead = () => {
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleCategoryPress = async (category) => {
    const queryText = `Need ${category.label} in Gulshan-e-Iqbal`;
    const apiResult = await orchestrateQuery(queryText);

    let matchedProviders = [];
    if (apiResult.provider) {
      matchedProviders = [apiResult.provider];
      const more = mockProviders.filter(
        (p) =>
          p.service_type.toLowerCase().includes(category.id.toLowerCase()) &&
          p.provider_id !== apiResult.provider.provider_id
      );
      matchedProviders = [...matchedProviders, ...more];
    } else {
      matchedProviders = mockProviders.filter(
        (p) =>
          p.service_type.toLowerCase().includes(category.id) ||
          category.id.includes(p.service_type.toLowerCase())
      );
      if (!matchedProviders.length) matchedProviders = mockProviders;
    }

    navigation.navigate("Recommendations", {
      providers: matchedProviders,
      service: category.label,
      location: apiResult.intent?.location || "Gulshan-e-Iqbal",
      isLiveDB: apiResult.isLiveDB,
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

      {/* Subtle Background Elements */}
      <View style={[styles.blob, styles.blobTopRight]} />
      <View style={[styles.blob, styles.blobBottomLeft]} />
      <Ionicons name="location" size={120} color="rgba(23,59,94,0.02)" style={styles.bgIcon1} />
      <Ionicons name="sparkles" size={80} color="rgba(249,168,38,0.03)" style={styles.bgIcon2} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandBadge}>
          <View style={styles.brandIconWrapper}>
            <Ionicons name="sparkles" size={14} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.topBarRight}>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => setShowNotifModal(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color="#FFFFFF" />
            {unreadCount > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.avatarSmall}
            onPress={() => navigation.navigate("Profile")}
            activeOpacity={0.8}
          >
            <Ionicons name="person" size={16} color={colors.accent} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <Text style={styles.greeting}>Good Morning, {mockUser.name.split(" ")[0]}! 👋</Text>
        <Text style={styles.greetingSub}>What service do you need today?</Text>

        {/* Glassmorphism Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("AIAssistant")}
        >
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <Text style={styles.searchPlaceholder}>Search services or ask AI...</Text>
          <View style={styles.searchMic}>
            <Ionicons name="mic" size={16} color={colors.primary} />
          </View>
        </TouchableOpacity>

        {/* Service Category Grid */}
        <View style={styles.grid}>
          {serviceCategories.map((cat, index) => (
            <AnimatedCategoryCard
              key={cat.id}
              cat={cat}
              index={index}
              onPress={() => handleCategoryPress(cat)}
            />
          ))}
        </View>

        {/* Need Help Deciding Banner */}
        <View style={styles.helpBanner}>
          <View style={styles.helpContent}>
            <Text style={styles.helpTitle}>Need help deciding?</Text>
            <Text style={styles.helpSub}>
              Ask our AI assistant to find the best{"\n"}service for you.
            </Text>
            <TouchableOpacity
              style={styles.askAIButton}
              onPress={() => navigation.navigate("AIAssistant")}
              activeOpacity={0.85}
            >
              <Ionicons name="sparkles" size={14} color={colors.accent} />
              <Text style={styles.askAIText}>Ask AI Assistant</Text>
            </TouchableOpacity>
          </View>
          <Ionicons name="chatbubbles" size={80} color="rgba(255,255,255,0.1)" style={styles.bannerIcon} />
        </View>
        
        {/* Extra padding for floating tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Interactive Notification Modal */}
      <Modal
        visible={showNotifModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowNotifModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="notifications" size={22} color={colors.primary} />
                <Text style={styles.modalTitle}>Notifications</Text>
              </View>
              <TouchableOpacity onPress={() => setShowNotifModal(false)} style={styles.modalCloseBtn}>
                <Ionicons name="close" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Sub-header / Mark Read */}
            {unreadCount > 0 ? (
              <View style={styles.modalSubHeader}>
                <Text style={styles.unreadText}>{unreadCount} unread notification{unreadCount > 1 ? "s" : ""}</Text>
                <TouchableOpacity onPress={handleMarkAllRead}>
                  <Text style={styles.markReadBtn}>Mark all as read</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.modalSubHeader}>
                <Text style={styles.unreadText}>All caught up! 🎉</Text>
              </View>
            )}

            {/* Notifications List */}
            <ScrollView style={styles.notifList} showsVerticalScrollIndicator={false}>
              {notifications.map((item) => (
                <View key={item.id} style={[styles.notifItem, !item.read && styles.notifItemUnread]}>
                  <View style={[styles.notifIconWrapper, { backgroundColor: item.color + "1A" }]}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={styles.notifTextContent}>
                    <View style={styles.notifItemHeader}>
                      <Text style={styles.notifItemTitle}>{item.title}</Text>
                      <Text style={styles.notifItemTime}>{item.time}</Text>
                    </View>
                    <Text style={styles.notifItemMsg}>{item.message}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={styles.doneBtn} onPress={() => setShowNotifModal(false)} activeOpacity={0.85}>
              <Text style={styles.doneBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
  blob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  blobTopRight: {
    top: -100,
    right: -100,
    backgroundColor: colors.blobOrange,
  },
  blobBottomLeft: {
    bottom: 100,
    left: -150,
    backgroundColor: colors.blobBlue,
  },
  bgIcon1: {
    position: "absolute",
    top: 150,
    right: -20,
    transform: [{ rotate: "15deg" }],
  },
  bgIcon2: {
    position: "absolute",
    bottom: 200,
    left: 20,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBtn: {
    position: "relative",
    padding: 4,
    marginRight: 16,
  },
  notifBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.emergency,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  notifBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(18, 38, 63, 0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  greetingSub: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.75)",
    marginTop: 4,
    marginBottom: 24,
  },
  // ---- Glassmorphism Search Bar ----
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // 80% opacity for glass effect
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#FFFFFF", // White border for glass highlight
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 28,
    shadowColor: "rgba(18, 38, 63, 0.05)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
    color: colors.textMuted,
    marginLeft: 10,
  },
  searchMic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(23, 59, 94, 0.05)",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCardWrapper: {
    width: "31%",
    marginBottom: 16,
  },
  categoryCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 16,
    alignItems: "center",
    shadowColor: "rgba(18, 38, 63, 0.06)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  categoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: "center",
  },
  helpBanner: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 24,
    marginTop: 12,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "rgba(23, 59, 94, 0.2)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 6,
  },
  helpContent: {
    flex: 1,
    zIndex: 2,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  helpSub: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 20,
    marginBottom: 18,
  },
  askAIButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  askAIText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  bannerIcon: {
    position: "absolute",
    right: -10,
    bottom: -10,
    transform: [{ rotate: "-15deg" }],
    zIndex: 1,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 32, 39, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginLeft: 8,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  unreadText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  markReadBtn: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.accent,
  },
  notifList: {
    marginBottom: 16,
  },
  notifItem: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    marginBottom: 10,
  },
  notifItemUnread: {
    backgroundColor: "rgba(249, 168, 38, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(249, 168, 38, 0.2)",
  },
  notifIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  notifTextContent: {
    flex: 1,
  },
  notifItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notifItemTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  notifItemTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  notifItemMsg: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  doneBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  doneBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default HomeScreen;
