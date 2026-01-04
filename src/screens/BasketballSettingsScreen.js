import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN, BASKETBALL } from '../constants/colors';

// Consistent top padding for all screens
const TOP_PADDING = 50;

// Game type options
const GAME_TYPES = ['Quarters', 'Halves', 'Time Limit'];

// Scoring options
const SCORING_OPTIONS = ['1s & 2s', '2s & 3s'];

// Shot clock options
const SHOT_CLOCK_OPTIONS = ['24s', '30s'];

// Foul limit options
const FOUL_LIMIT_OPTIONS = ['5', '6'];

// Timeout options
const TIMEOUT_OPTIONS = ['3', '5', '7'];

export default function BasketballSettingsScreen({ navigation }) {
  // Game settings state
  const [gameType, setGameType] = useState('Quarters');
  const [timeMinutes, setTimeMinutes] = useState('12');
  const [scoringMode, setScoringMode] = useState('2s & 3s');

  // Optional features state
  const [shotClockEnabled, setShotClockEnabled] = useState(false);
  const [shotClockDuration, setShotClockDuration] = useState('24s');
  const [foulsEnabled, setFoulsEnabled] = useState(false);
  const [foulLimit, setFoulLimit] = useState('5');
  const [timeoutsEnabled, setTimeoutsEnabled] = useState(false);
  const [timeoutsPerTeam, setTimeoutsPerTeam] = useState('3');

  // Get the label for time input based on game type
  const getTimeLabel = () => {
    if (gameType === 'Quarters') {
      return 'Period Length';
    }
    if (gameType === 'Halves') {
      return 'Half Length';
    }
    return 'Game Time';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.titleButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color={SCREEN.text} style={styles.backIcon} />
          <Text style={styles.title}>🏀 Score Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Game Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GAME</Text>

          {/* Type - Chips */}
          <Text style={styles.label}>Type</Text>
          <View style={styles.chipsContainer}>
            {GAME_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.chip,
                  gameType === type && styles.chipSelected,
                ]}
                onPress={() => setGameType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    gameType === type && styles.chipTextSelected,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Input */}
          <Text style={styles.label}>{getTimeLabel()}</Text>
          <View style={styles.timeInputContainer}>
            <TextInput
              style={styles.timeInput}
              value={timeMinutes}
              onChangeText={setTimeMinutes}
              keyboardType="number-pad"
              maxLength={3}
            />
            <Text style={styles.timeUnit}>minutes</Text>
          </View>

          {/* Scoring - Rounded Buttons */}
          <Text style={styles.label}>Scoring</Text>
          <View style={styles.scoringContainer}>
            {SCORING_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.scoringButton,
                  scoringMode === option && styles.scoringButtonSelected,
                ]}
                onPress={() => setScoringMode(option)}
              >
                <Text
                  style={[
                    styles.scoringText,
                    scoringMode === option && styles.scoringTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Optional Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>OPTIONAL</Text>

          {/* Shot Clock */}
          <View style={styles.optionalRow}>
            <Text style={styles.label}>Shot Clock</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  shotClockEnabled && styles.toggleButtonSelected,
                ]}
                onPress={() => setShotClockEnabled(true)}
              >
                <Text style={[styles.toggleText, shotClockEnabled && styles.toggleTextSelected]}>On</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  !shotClockEnabled && styles.toggleButtonSelected,
                ]}
                onPress={() => setShotClockEnabled(false)}
              >
                <Text style={[styles.toggleText, !shotClockEnabled && styles.toggleTextSelected]}>Off</Text>
              </TouchableOpacity>
            </View>
          </View>
          {shotClockEnabled && (
            <View style={styles.subOptions}>
              <Text style={styles.subLabel}>Duration</Text>
              <View style={styles.chipsContainer}>
                {SHOT_CLOCK_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.chip,
                      shotClockDuration === option && styles.chipSelected,
                    ]}
                    onPress={() => setShotClockDuration(option)}
                  >
                    <Text style={[styles.chipText, shotClockDuration === option && styles.chipTextSelected]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Fouls */}
          <View style={styles.optionalRow}>
            <Text style={styles.label}>Fouls</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  foulsEnabled && styles.toggleButtonSelected,
                ]}
                onPress={() => setFoulsEnabled(true)}
              >
                <Text style={[styles.toggleText, foulsEnabled && styles.toggleTextSelected]}>On</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  !foulsEnabled && styles.toggleButtonSelected,
                ]}
                onPress={() => setFoulsEnabled(false)}
              >
                <Text style={[styles.toggleText, !foulsEnabled && styles.toggleTextSelected]}>Off</Text>
              </TouchableOpacity>
            </View>
          </View>
          {foulsEnabled && (
            <View style={styles.subOptions}>
              <Text style={styles.subLabel}>Limit</Text>
              <View style={styles.chipsContainer}>
                {FOUL_LIMIT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.chip,
                      foulLimit === option && styles.chipSelected,
                    ]}
                    onPress={() => setFoulLimit(option)}
                  >
                    <Text style={[styles.chipText, foulLimit === option && styles.chipTextSelected]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Timeouts */}
          <View style={styles.optionalRow}>
            <Text style={styles.label}>Timeouts</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  timeoutsEnabled && styles.toggleButtonSelected,
                ]}
                onPress={() => setTimeoutsEnabled(true)}
              >
                <Text style={[styles.toggleText, timeoutsEnabled && styles.toggleTextSelected]}>On</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  !timeoutsEnabled && styles.toggleButtonSelected,
                ]}
                onPress={() => setTimeoutsEnabled(false)}
              >
                <Text style={[styles.toggleText, !timeoutsEnabled && styles.toggleTextSelected]}>Off</Text>
              </TouchableOpacity>
            </View>
          </View>
          {timeoutsEnabled && (
            <View style={styles.subOptions}>
              <Text style={styles.subLabel}>Per Team</Text>
              <View style={styles.chipsContainer}>
                {TIMEOUT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.chip,
                      timeoutsPerTeam === option && styles.chipSelected,
                    ]}
                    onPress={() => setTimeoutsPerTeam(option)}
                  >
                    <Text style={[styles.chipText, timeoutsPerTeam === option && styles.chipTextSelected]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN.background,
  },
  header: {
    paddingTop: TOP_PADDING,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: SCREEN.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: SCREEN.textDim,
    marginBottom: 20,
    letterSpacing: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: SCREEN.text,
    marginBottom: 10,
  },
  // Chips for game type
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  chipSelected: {
    backgroundColor: BASKETBALL.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: SCREEN.text,
  },
  chipTextSelected: {
    color: SCREEN.background,
  },
  // Time input
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeInput: {
    width: 70,
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: SCREEN.text,
    backgroundColor: '#F9F9F9',
  },
  timeUnit: {
    fontSize: 16,
    color: SCREEN.textDim,
    marginLeft: 10,
  },
  // Scoring buttons
  scoringContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  scoringButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
  },
  scoringButtonSelected: {
    backgroundColor: BASKETBALL.primary,
  },
  scoringText: {
    fontSize: 16,
    fontWeight: '600',
    color: SCREEN.text,
  },
  scoringTextSelected: {
    color: '#FFFFFF',
  },
  // Optional features
  optionalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
  },
  toggleButtonSelected: {
    backgroundColor: BASKETBALL.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: SCREEN.text,
  },
  toggleTextSelected: {
    color: '#FFFFFF',
  },
  subOptions: {
    marginLeft: 20,
    marginBottom: 20,
  },
  subLabel: {
    fontSize: 14,
    color: SCREEN.textDim,
    marginBottom: 8,
  },
});
