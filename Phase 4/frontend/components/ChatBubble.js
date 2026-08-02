// ==========================================
// ChatBubble Component — Premium Soft Minimalism
// Orange user bubbles, white bot bubbles (ChatGPT-style)
// Typing indicator with animated dots
// ==========================================

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

// ---- Typing Dots Animation ----
const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDot = (dot, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0.3, duration: 300, useNativeDriver: true }),
        ])
      );
    animateDot(dot1, 0).start();
    animateDot(dot2, 200).start();
    animateDot(dot3, 400).start();
  }, []);

  return (
    <View style={styles.typingRow}>
      <View style={styles.typingBubble}>
        {[dot1, dot2, dot3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[styles.typingDot, { opacity: dot }]}
          />
        ))}
      </View>
    </View>
  );
};

// ---- Chat Bubble ----
const ChatBubble = ({ message, onNavigate }) => {
  const isUser = message.sender === "user";
  const isTyping = message.isTyping;
  
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const slideAnim = useRef(new Animated.Value(15)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isTyping) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]).start();
    }
  }, [isTyping]);

  if (isTyping) return <TypingDots />;

  return (
    <Animated.View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowBot,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] }
      ]}
    >
      {/* Bot avatar */}
      {!isUser && (
        <View style={styles.botAvatar}>
          <Ionicons name="sparkles" size={14} color={colors.accent} />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.botBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.botText,
          ]}
        >
          {message.text}
        </Text>

        {/* Timestamp */}
        {message.timestamp && (
          <Text style={[styles.timestamp, isUser ? styles.timestampUser : styles.timestampBot]}>
            {message.timestamp}
          </Text>
        )}

        {/* Inline Provider Card Action in Chat */}
        {message.provider && (
          <TouchableOpacity
            style={styles.providerCardCta}
            onPress={() =>
              onNavigate &&
              onNavigate(
                message.matchedProviders,
                message.provider.service_type,
                message.provider.location
              )
            }
            activeOpacity={0.85}
          >
            <View style={styles.ctaHeader}>
              <Ionicons name="sparkles" size={14} color={colors.accent} />
              <Text style={styles.ctaTitle}>
                {message.provider.name} ({message.provider.service_type})
              </Text>
            </View>
            <Text style={styles.ctaSub}>
              {message.provider.rating} ⭐ • {message.provider.service_price} • {message.provider.location}
            </Text>

            <View style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>View All Recommendations →</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 16,
    alignItems: "flex-end",
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  rowBot: {
    justifyContent: "flex-start",
  },
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 2,
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  userBubble: {
    backgroundColor: colors.userBubble,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    backgroundColor: colors.botBubble,
    borderBottomLeftRadius: 4,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    lineHeight: 21,
  },
  userText: {
    color: colors.userBubbleText,
  },
  botText: {
    color: colors.botBubbleText,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 6,
  },
  timestampUser: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "right",
  },
  timestampBot: {
    color: colors.textMuted,
  },
  // ---- Typing Dots ----
  typingRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginVertical: 4,
    justifyContent: "flex-start",
  },
  typingBubble: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginLeft: 36,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 3,
  },
  // ---- Provider CTA ----
  providerCardCta: {
    backgroundColor: "rgba(23,59,94,0.06)",
    borderRadius: 14,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(23,59,94,0.12)",
  },
  ctaHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    marginLeft: 6,
  },
  ctaSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 8,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});

export default ChatBubble;
