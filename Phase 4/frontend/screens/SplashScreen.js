import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

const { width, height } = Dimensions.get("window");

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  // New animations
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.6)).current;
  const btnScale = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  // Particles
  const particles = Array.from({ length: 8 }).map(() => ({
    x: Math.random() * width,
    yAnim: useRef(new Animated.Value(height)).current,
    opAnim: useRef(new Animated.Value(0)).current,
    delay: Math.random() * 2000,
  }));

  useEffect(() => {
    // Initial entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Infinite Float
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 1750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 6,
          duration: 1750,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Logo Glow
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // BG Movement
    Animated.loop(
      Animated.sequence([
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(bgAnim, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Particles loop
    particles.forEach(p => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(p.delay),
          Animated.parallel([
            Animated.timing(p.yAnim, {
              toValue: -100,
              duration: 4000 + Math.random() * 3000,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(p.opAnim, { toValue: Math.random() * 0.4 + 0.2, duration: 1500, useNativeDriver: true }),
              Animated.timing(p.opAnim, { toValue: 0, duration: 1500, useNativeDriver: true })
            ])
          ]),
          Animated.timing(p.yAnim, { toValue: height, duration: 0, useNativeDriver: true })
        ])
      ).start();
    });
  }, []);

  const handleGetStarted = () => {
    Animated.sequence([
      Animated.timing(btnScale, { toValue: 0.96, duration: 100, useNativeDriver: true }),
      Animated.timing(btnScale, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start(() => {
      navigation.replace("Login");
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Background Image with Gradient Overlay */}
      <ImageBackground
        source={require("../assets/splash_bg.png")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["rgba(15, 32, 39, 0.75)", "rgba(32, 58, 67, 0.65)", "rgba(44, 83, 100, 0.85)"]}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgAnim }]}>
          <LinearGradient
            colors={["rgba(28, 78, 110, 0.75)", "rgba(26, 54, 93, 0.65)", "rgba(15, 32, 39, 0.85)"]}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </ImageBackground>

      {/* Blurred Blobs */}
      <Animated.View style={[styles.blob, styles.blob1, { transform: [{ translateX: floatAnim }, { translateY: floatAnim }] }]} />
      <Animated.View style={[styles.blob, styles.blob2, { transform: [{ translateX: Animated.multiply(floatAnim, -1) }, { translateY: Animated.multiply(floatAnim, -1) }] }]} />

      {/* Particles */}
      {particles.map((p, i) => (
        <Animated.View key={i} style={[styles.particle, { left: p.x, opacity: p.opAnim, transform: [{ translateY: p.yAnim }] }]} />
      ))}

      <View style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Logo Glow */}
          <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
            <Animated.View style={[styles.glowAura, { opacity: glowAnim, transform: [{ scale: glowAnim }] }]} />
            <View style={styles.logoCircle}>
              <Ionicons name="sparkles" size={40} color={colors.accent} />
            </View>
            <View style={styles.logoSmallCircle}>
              <Ionicons name="home" size={16} color="#FFFFFF" />
            </View>
          </Animated.View>

          {/* App Name */}
          <Text style={styles.appName}>Smart Local</Text>
          <Text style={styles.appNameAccent}>Service Orchestrator</Text>
          <Text style={styles.subtitle}>AI-powered local services,{"\n"}just a message away.</Text>
        </Animated.View>

        <View style={styles.bottomArea}>
          <Animated.View
            style={{
              width: "100%",
              transform: [{ scale: btnScale }],
            }}
          >
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={handleGetStarted}
              activeOpacity={0.9}
            >
              <Text style={styles.getStartedText}>Get Started</Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={colors.primary}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, zIndex: 10 },
  blob: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.1,
  },
  blob1: { top: "10%", left: "-20%", backgroundColor: "#00F0FF" },
  blob2: { bottom: "30%", right: "-20%", backgroundColor: "#0055FF" },
  particle: {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0FFFF",
    shadowColor: "#E0FFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    marginTop: 40,
  },
  logoContainer: { position: "relative", marginBottom: 24, alignItems: "center", justifyContent: "center" },
  glowAura: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(249, 168, 38, 0.2)",
  },
  logoCircle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center", justifyContent: "center",
    borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.15)",
  },
  logoSmallCircle: {
    position: "absolute", bottom: -2, right: -2,
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: "center", justifyContent: "center",
    borderWidth: 2, borderColor: colors.primary,
  },
  appName: { fontSize: 32, fontWeight: "700", color: "#FFFFFF", textAlign: "center", letterSpacing: 0.5 },
  appNameAccent: { fontSize: 28, fontWeight: "600", color: colors.accent, textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 15, color: "rgba(255, 255, 255, 0.7)", textAlign: "center", lineHeight: 22, marginBottom: 24 },
  bottomArea: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    alignItems: "center",
  },
  illustrationContainer: {
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  getStartedButton: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    backgroundColor: "#FFFFFF", borderRadius: 18,
    paddingVertical: 16, paddingHorizontal: 32, width: "100%",
    shadowColor: "rgba(0, 0, 0, 0.3)", shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1, shadowRadius: 12, elevation: 4,
  },
  getStartedText: { fontSize: 16, fontWeight: "700", color: colors.primary, marginRight: 8 },
});

export default SplashScreen;
