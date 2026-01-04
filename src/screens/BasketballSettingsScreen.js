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

export default function BasketballSettingsScreen({ navigation }) {
  // Game settings state
  const [gameType, setGameType] = useState('Quarters');
  const [timeMinutes, setTimeMinutes] = useState('12');
  const [scoringMode, setScoringMode] = useState('2s & 3s');

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
});
