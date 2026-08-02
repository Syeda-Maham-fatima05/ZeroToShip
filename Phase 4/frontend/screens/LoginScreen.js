// ==========================================
// LoginScreen — Welcome Back UI
// Premium Soft Minimalism: Gradient BG, Floating Orbs
// Radius 18 buttons, Radius 22 cards
// ==========================================

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

const LoginScreen = ({ navigation }) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPassFocused, setIsPassFocused] = useState(false);

  // Animations
  const cardScale = useRef(new Animated.Value(0.92)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const eyeRot = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    navigation.replace("MainTabs");
  };

  const blobAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Background Blob
    Animated.loop(
      Animated.sequence([
        Animated.timing(blobAnim, { toValue: 15, duration: 3000, useNativeDriver: true }),
        Animated.timing(blobAnim, { toValue: 0, duration: 3000, useNativeDriver: true }),
      ])
    ).start();

    // Card Entrance
    Animated.parallel([
      Animated.timing(cardFade, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(cardScale, { toValue: 1, friction: 6, useNativeDriver: true })
    ]).start();
  }, []);

  const togglePassword = () => {
    setShowPassword(!showPassword);
    Animated.timing(eyeRot, {
      toValue: showPassword ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => Animated.spring(btnScale, { toValue: 0.96, useNativeDriver: true }).start();
  const handlePressOut = () => Animated.spring(btnScale, { toValue: 1, useNativeDriver: true }).start();
  
  const spin = eyeRot.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"]
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.gradientStart} />

      {/* Premium Gradient Background */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      {/* Subtle Floating Blobs */}
      <Animated.View
        style={[
          styles.blob,
          styles.blobTopRight,
          { transform: [{ translateY: blobAnim }] },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blobBottomLeft,
          { transform: [{ translateY: Animated.multiply(blobAnim, -1) }] },
        ]}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={{ flex: 1, opacity: cardFade, transform: [{ scale: cardScale }] }}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationCircle}>
                <Ionicons name="person" size={42} color={colors.accent} />
              </View>
              <View style={styles.illustrationBadge}>
                <Ionicons name="phone-portrait" size={16} color="#FFFFFF" />
              </View>
            </View>

            <Text style={styles.welcomeText}>Welcome Back! 👋</Text>
            <Text style={styles.subText}>Login to continue</Text>
          </View>

          {/* Input Form */}
          <View style={styles.form}>
            {/* Email or Phone */}
            <View style={[styles.inputContainer, isEmailFocused && styles.inputFocused]}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={isEmailFocused ? colors.primary : colors.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email or Phone Number"
                placeholderTextColor={colors.textMuted}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Password */}
            <View style={[styles.inputContainer, isPassFocused && styles.inputFocused]}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={isPassFocused ? colors.primary : colors.textMuted}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={colors.textMuted}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setIsPassFocused(true)}
                onBlur={() => setIsPassFocused(false)}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={togglePassword}
                style={styles.eyeButton}
              >
                <Animated.View style={{ transform: [{ rotate: spin }] }}>
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={colors.textMuted}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotRow}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <Animated.View style={{ transform: [{ scale: btnScale }] }}>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={1}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Or continue with */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="call" size={20} color={colors.primary} />
              <Text style={styles.socialButtonText}>Phone</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.linkText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // Fallback
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
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    maxWidth: 450,
    width: "100%",
    alignSelf: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  illustrationContainer: {
    position: "relative",
    marginBottom: 20,
  },
  illustrationCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: "rgba(18, 38, 63, 0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 4,
  },
  illustrationBadge: {
    position: "absolute",
    bottom: 0,
    right: -4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subText: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.75)",
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
    shadowColor: "rgba(18, 38, 63, 0.04)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  inputFocused: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
  },
  eyeButton: {
    padding: 6,
  },
  forgotRow: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.accent,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(23, 59, 94, 0.2)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerText: {
    marginHorizontal: 14,
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.75)",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginHorizontal: 8,
    minWidth: 130,
    shadowColor: "rgba(18, 38, 63, 0.04)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginLeft: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 24,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 14,
  },
  linkText: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default LoginScreen;
