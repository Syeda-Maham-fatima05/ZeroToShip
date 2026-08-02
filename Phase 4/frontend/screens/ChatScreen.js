// ==========================================
// ChatScreen — AI Service Assistant
// Premium Soft Minimalism: Navy Gradient Background
// Sequential AI Loading Animation, Sparkles
// ==========================================

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import { mockChatHistory, mockProviders } from "../data/mockData";
import { orchestrateQuery } from "../services/api";
import colors from "../styles/colors";

const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState(mockChatHistory);
  const [loadingLines, setLoadingLines] = useState([]);
  const flatListRef = useRef(null);
  const orbAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbAnim, { toValue: 1.2, duration: 800, useNativeDriver: true }),
        Animated.timing(orbAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleCallSupport = () => {
    Alert.alert(
      "AI Voice Support",
      "Connecting to ZeroToShip 24/7 Hotline: +92 (021) 111-SMART-AI",
      [{ text: "OK" }]
    );
  };

  const handleOptions = () => {
    Alert.alert(
      "Chat Options",
      "• Clear Chat History\n• Export Agent Transcript\n• Active Engine: Phase 1 Local Orchestrator",
      [{ text: "Close" }]
    );
  };

  // ------------------------------------------
  // Sequential AI Loading Animation
  // ------------------------------------------
  const runAiLoadingSequence = () => {
    return new Promise((resolve) => {
      setLoadingLines(["Understanding request... ✓"]);
      setTimeout(() => {
        setLoadingLines(prev => [...prev, "Finding providers... ✓"]);
        setTimeout(() => {
          setLoadingLines(prev => [...prev, "Ranking services... ✓"]);
          setTimeout(() => {
            setLoadingLines(prev => [...prev, "Generating recommendation... ✓"]);
            setTimeout(() => {
              setLoadingLines([]);
              resolve();
            }, 300);
          }, 500);
        }, 500);
      }, 500);
    });
  };

  // ------------------------------------------
  // Handle user prompt submit
  // ------------------------------------------
  const handleSend = async (text) => {
    const userMsg = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Show typing dots temporarily
    const typingMsg = { id: "typing", isTyping: true, sender: "bot" };
    setMessages((prev) => [...prev, typingMsg]);

    // Run custom loading sequence + actual API call concurrently
    const [apiResult] = await Promise.all([
      orchestrateQuery(text),
      runAiLoadingSequence()
    ]);

    const matchedProvider = apiResult.provider || mockProviders[0];
    const matchedProviders = apiResult.matchedProviders || mockProviders;

    // Create detailed AI Bot Response Message
    const botMsg = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: `I searched our Phase 1 database for "${text}".\n\n📌 **Top Match:** ${matchedProvider.name}\n⭐ Rating: ${matchedProvider.rating}/5.0 (${matchedProvider.reviewCount} reviews)\n💰 Price: ${matchedProvider.service_price}\n📍 Location: ${matchedProvider.location}`,
      provider: matchedProvider,
      matchedProviders: matchedProviders,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    // Remove typing indicator and add response
    setMessages((prev) => prev.filter(m => m.id !== "typing").concat(botMsg));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.chatGradientStart} />

      {/* Navy Gradient Background */}
      <LinearGradient
        colors={[colors.chatGradientStart, colors.chatGradientMid, colors.chatGradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {/* Subtle Tech Elements in Background */}
      <Ionicons name="git-network-outline" size={150} color="rgba(255,255,255,0.02)" style={styles.bgIcon1} />
      <Ionicons name="hardware-chip-outline" size={100} color="rgba(255,255,255,0.03)" style={styles.bgIcon2} />
      <Ionicons name="sparkles" size={40} color="rgba(255,255,255,0.04)" style={styles.bgIcon3} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Animated.View style={{ transform: [{ scale: orbAnim }], marginRight: 8 }}>
            <Ionicons name="sparkles" size={18} color={colors.accent} />
          </Animated.View>
          <Text style={styles.headerTitle}>AI Service Assistant</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Chat Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatBubble
              message={item}
              onNavigate={(providers, service, location) =>
                navigation.navigate("Recommendations", {
                  providers,
                  service,
                  location,
                })
              }
            />
          )}
          contentContainerStyle={styles.chatList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Dynamic Loading Text Overlay */}
        {loadingLines.length > 0 && (
          <View style={styles.loadingOverlay}>
            <Ionicons name="sparkles" size={14} color={colors.accent} style={{ marginRight: 6, alignSelf: "flex-start", marginTop: 2 }} />
            <View>
              {loadingLines.map((line, idx) => (
                <Animated.Text key={idx} style={[styles.loadingText, { marginBottom: 2 }]}>
                  {line}
                </Animated.Text>
              ))}
            </View>
          </View>
        )}

        {/* Input Bar */}
        <ChatInput onSend={handleSend} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.chatGradientStart,
  },
  flex: {
    flex: 1,
  },
  bgIcon1: {
    position: "absolute",
    top: 100,
    right: -20,
    transform: [{ rotate: "15deg" }],
  },
  bgIcon2: {
    position: "absolute",
    bottom: 250,
    left: -20,
    transform: [{ rotate: "-15deg" }],
  },
  bgIcon3: {
    position: "absolute",
    top: 300,
    right: 40,
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    padding: 6,
    marginLeft: 4,
  },
  chatList: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    paddingBottom: 120, // Increased to keep messages above footer
  },
  loadingOverlay: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 200,
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default ChatScreen;
