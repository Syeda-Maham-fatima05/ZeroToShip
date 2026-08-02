// ==========================================
// AgentLogsScreen — Agent Trace Log & Timeline
// Step-by-step agent reasoning pipeline, Proceed with Booking action,
// and chronological execution log
// ==========================================

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import { agentTraceSteps, agentTraceTimeline } from "../data/mockData";
import colors from "../styles/colors";

const AgentLogsScreen = () => {
  const handleProceedBooking = () => {
    Alert.alert(
      "Proceed with Booking 🚀",
      "Mock action executed: Selected provider Asif Plumber confirmed.",
      [{ text: "OK" }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Dark Card Container */}
        <View style={styles.darkCard}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={22} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.cardTitle}>Agent Trace Log</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={22} color="#FFF" />
            </TouchableOpacity>
          </View>

          {/* Stepper Pipeline */}
          <Text style={styles.stepTitle}>Step 3:</Text>

          <View style={styles.stepperRow}>
            {agentTraceSteps.map((step, idx) => (
              <React.Fragment key={step.id}>
                {/* Step Node */}
                <View style={styles.stepNodeContainer}>
                  <View
                    style={[
                      styles.stepDot,
                      step.status === "active" && styles.stepDotActive,
                      step.status === "complete" && styles.stepDotComplete,
                      step.status === "pending" && styles.stepDotPending,
                    ]}
                  >
                    {step.status === "complete" && (
                      <Ionicons name="checkmark" size={10} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.stepLabel}>
                    Step {step.id}:{"\n"}
                    {step.label}
                  </Text>
                </View>

                {/* Line separator */}
                {idx < agentTraceSteps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      step.status === "complete" && styles.stepLineComplete,
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Action Button */}
          <CustomButton
            title="Proceed with Booking"
            variant="booking"
            onPress={handleProceedBooking}
            style={styles.actionBtn}
          />
        </View>

        {/* Timeline Log Section */}
        <View style={styles.timelineSection}>
          <Text style={styles.dateHeading}>Friday, 24th</Text>

          {agentTraceTimeline.map((item, idx) => (
            <View key={idx} style={styles.timelineRow}>
              <Text style={styles.timeText}>{item.time}</Text>
              <View style={styles.timelineLineContainer}>
                <View style={styles.timelineDot} />
                {idx < agentTraceTimeline.length - 1 && (
                  <View style={styles.timelineVerticalLine} />
                )}
              </View>
              <View style={styles.timelineBox}>
                <Text style={styles.boxTitle}>{item.title}</Text>
                <Text style={styles.boxSubtitle}>{item.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingBottom: 24,
  },

  // Dark Card
  darkCard: {
    backgroundColor: colors.primaryDark,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.accent,
    textAlign: "center",
    marginBottom: 12,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 6,
  },
  stepNodeContainer: {
    alignItems: "center",
    flex: 1,
  },
  stepDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  stepDotActive: {
    backgroundColor: colors.accent,
    borderWidth: 3,
    borderColor: "#FFF",
  },
  stepDotComplete: {
    backgroundColor: colors.success,
  },
  stepDotPending: {
    backgroundColor: colors.cardAlt,
  },
  stepLabel: {
    fontSize: 10,
    color: "#E0E0E0",
    textAlign: "center",
    lineHeight: 13,
  },
  stepLine: {
    height: 2,
    flex: 1,
    backgroundColor: colors.cardAlt,
    marginTop: -18,
  },
  stepLineComplete: {
    backgroundColor: colors.success,
  },
  actionBtn: {
    marginTop: 20,
  },

  // Timeline
  timelineSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dateHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 16,
  },
  timelineRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  timeText: {
    fontSize: 12,
    color: colors.textSecondary,
    width: 45,
    paddingTop: 12,
  },
  timelineLineContainer: {
    alignItems: "center",
    marginHorizontal: 8,
    paddingTop: 14,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
  },
  timelineVerticalLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.border,
    marginTop: 4,
  },
  timelineBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  boxTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  boxSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default AgentLogsScreen;
