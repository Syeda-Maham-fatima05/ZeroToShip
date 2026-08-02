// ==========================================
// CustomButton Component — Light Theme
// ==========================================

import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../styles/colors";

const CustomButton = ({
  title,
  onPress,
  variant = "primary",   // "primary" | "outline" | "accent" | "booking"
  icon,                   // Ionicons name
  loading = false,
  disabled = false,
  style,
}) => {

  const buttonStyles = [
    styles.base,
    variant === "primary" && styles.primary,
    variant === "outline" && styles.outline,
    variant === "accent" && styles.accent,
    variant === "booking" && styles.booking,
    disabled && styles.disabled,
    style,
  ];

  const textStyles = [
    styles.text,
    variant === "primary" && styles.textPrimary,
    variant === "outline" && styles.textOutline,
    variant === "accent" && styles.textAccent,
    variant === "booking" && styles.textBooking,
    disabled && styles.textDisabled,
  ];

  const iconColorMap = {
    primary: "#FFFFFF",
    outline: colors.primary,
    accent: "#FFFFFF",
    booking: "#FFFFFF",
  };
  const iconColor = iconColorMap[variant] || "#FFFFFF";

  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.85}
      >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? colors.primary : "#FFF"}
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={18}
              color={disabled ? colors.textMuted : iconColor}
              style={{ marginRight: 6 }}
            />
          )}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ==========================================
// Styles
// ==========================================

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minWidth: 120,
  },

  // Teal filled
  primary: {
    backgroundColor: colors.primary,
  },
  textPrimary: {
    color: "#FFFFFF",
  },

  // Teal outline
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  textOutline: {
    color: colors.primary,
  },

  // Gold filled
  accent: {
    backgroundColor: colors.accent,
  },
  textAccent: {
    color: "#FFFFFF",
  },

  // Warm coral booking (like "Proceed with Booking")
  booking: {
    backgroundColor: "#E07A53",
    borderRadius: 24,
    paddingVertical: 16,
  },
  textBooking: {
    color: "#FFFFFF",
  },

  disabled: {
    backgroundColor: colors.cardAlt,
    borderColor: colors.border,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
  },
  textDisabled: {
    color: colors.textMuted,
  },
});

export default CustomButton;
