import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SCOREBOARD, SCREEN, BASKETBALL } from '../constants/colors';

// Consistent top padding for all screens
const TOP_PADDING = 50;

// Format seconds to MM:SS
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export default function BasketballScoreboardScreen({ navigation, route }) {
  // Get settings from navigation params
  const {
    gameType,
    timeMinutes,
    scoringMode,
    shotClockEnabled,
    shotClockDuration,
    foulsEnabled,
    foulLimit,
    timeoutsEnabled,
    timeoutsPerTeam,
    team1Name,
    team1Color,
    team2Name,
    team2Color,
  } = route.params;

  // Game state
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(1);

  // Optional feature states
  const [team1Fouls, setTeam1Fouls] = useState(0);
  const [team2Fouls, setTeam2Fouls] = useState(0);
  const [team1Timeouts, setTeam1Timeouts] = useState(parseInt(timeoutsPerTeam) || 0);
  const [team2Timeouts, setTeam2Timeouts] = useState(parseInt(timeoutsPerTeam) || 0);
  const [shotClock, setShotClock] = useState(parseInt(shotClockDuration) || 24);

  // Get score increment based on scoring mode
  const getScoreButtons = () => {
    if (scoringMode === '1s & 2s') {
      return [1, 2];
    }
    return [2, 3];
  };

  // Get total periods based on game type
  const getTotalPeriods = () => {
    if (gameType === 'Quarters') return 4;
    if (gameType === 'Halves') return 2;
    return 1; // Time Limit
  };

  // Get period label
  const getPeriodLabel = () => {
    if (gameType === 'Quarters') return `Q${currentPeriod}`;
    if (gameType === 'Halves') return `H${currentPeriod}`;
    return ''; // Time Limit has no period
  };

  const scoreButtons = getScoreButtons();

  // Timer countdown effect
  useEffect(() => {
    let interval = null;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    }

    // Stop timer when it reaches 0
    if (timeRemaining === 0) {
      setIsRunning(false);
    }

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeRemaining]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={SCREEN.text} />
        </TouchableOpacity>
      </View>

      {/* Scoreboard Card */}
      <View style={styles.scoreboardCard}>
        {/* Timer */}
        <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>

        {/* Period (if not Time Limit) */}
        {gameType !== 'Time Limit' && (
          <Text style={styles.period}>{getPeriodLabel()}</Text>
        )}

        {/* Teams and Scores */}
        <View style={styles.teamsContainer}>
          {/* Team 1 */}
          <View style={styles.teamSection}>
            <View style={[styles.teamColorDot, { backgroundColor: team1Color }]} />
            <Text style={styles.teamName}>{team1Name}</Text>
            <Text style={styles.score}>{team1Score}</Text>
          </View>

          {/* VS Divider */}
          <View style={styles.divider}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          {/* Team 2 */}
          <View style={styles.teamSection}>
            <View style={[styles.teamColorDot, { backgroundColor: team2Color }]} />
            <Text style={styles.teamName}>{team2Name}</Text>
            <Text style={styles.score}>{team2Score}</Text>
          </View>
        </View>

        {/* Optional: Shot Clock */}
        {shotClockEnabled && (
          <View style={styles.optionalSection}>
            <Text style={styles.optionalLabel}>SHOT CLOCK</Text>
            <Text style={styles.shotClockValue}>{shotClock}</Text>
          </View>
        )}

        {/* Optional: Fouls */}
        {foulsEnabled && (
          <View style={styles.foulsRow}>
            <View style={styles.foulSection}>
              <Text style={styles.optionalLabel}>FOULS</Text>
              <Text style={styles.foulValue}>{team1Fouls}</Text>
            </View>
            <View style={styles.foulSection}>
              <Text style={styles.optionalLabel}>FOULS</Text>
              <Text style={styles.foulValue}>{team2Fouls}</Text>
            </View>
          </View>
        )}

        {/* Optional: Timeouts */}
        {timeoutsEnabled && (
          <View style={styles.timeoutsRow}>
            <View style={styles.timeoutSection}>
              <Text style={styles.optionalLabel}>TIMEOUTS</Text>
              <Text style={styles.timeoutValue}>{team1Timeouts}</Text>
            </View>
            <View style={styles.timeoutSection}>
              <Text style={styles.optionalLabel}>TIMEOUTS</Text>
              <Text style={styles.timeoutValue}>{team2Timeouts}</Text>
            </View>
          </View>
        )}
      </View>

      {/* Controls Section - Below Scoreboard */}
      <View style={styles.controlsSection}>
        {/* Timer Controls */}
        <View style={styles.timerControls}>
          <TouchableOpacity
            style={[styles.timerButton, isRunning && styles.timerButtonActive]}
            onPress={() => setIsRunning(!isRunning)}
          >
            <Ionicons
              name={isRunning ? 'pause' : 'play'}
              size={24}
              color="#FFFFFF"
            />
            <Text style={styles.timerButtonText}>
              {isRunning ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setTimeRemaining(timeMinutes * 60);
              setIsRunning(false);
            }}
          >
            <Ionicons name="refresh" size={24} color="#FFFFFF" />
            <Text style={styles.timerButtonText}>Reset Clock</Text>
          </TouchableOpacity>
        </View>

        {/* Score Controls */}
        <View style={styles.scoreControlsRow}>
          {/* Team 1 Score Controls */}
          <View style={styles.teamScoreControls}>
            <Text style={styles.teamControlLabel}>{team1Name}</Text>
            <Text style={styles.scoreActionLabel}>Add Points</Text>
            <View style={styles.scoreButtons}>
              {scoreButtons.map((points) => (
                <TouchableOpacity
                  key={points}
                  style={styles.scoreButton}
                  onPress={() => setTeam1Score(team1Score + points)}
                >
                  <Text style={styles.scoreButtonText}>+{points}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.scoreActionLabel}>Remove Points</Text>
            <TouchableOpacity
              style={[styles.scoreButton, styles.minusButton]}
              onPress={() => setTeam1Score(Math.max(0, team1Score - 1))}
            >
              <Text style={styles.scoreButtonText}>-1</Text>
            </TouchableOpacity>
          </View>

          {/* Team 2 Score Controls */}
          <View style={styles.teamScoreControls}>
            <Text style={styles.teamControlLabel}>{team2Name}</Text>
            <Text style={styles.scoreActionLabel}>Add Points</Text>
            <View style={styles.scoreButtons}>
              {scoreButtons.map((points) => (
                <TouchableOpacity
                  key={points}
                  style={styles.scoreButton}
                  onPress={() => setTeam2Score(team2Score + points)}
                >
                  <Text style={styles.scoreButtonText}>+{points}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.scoreActionLabel}>Remove Points</Text>
            <TouchableOpacity
              style={[styles.scoreButton, styles.minusButton]}
              onPress={() => setTeam2Score(Math.max(0, team2Score - 1))}
            >
              <Text style={styles.scoreButtonText}>-1</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: TOP_PADDING,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  scoreboardCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: BASKETBALL.primary,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: SCREEN.text,
    textAlign: 'center',
  },
  period: {
    fontSize: 18,
    color: SCREEN.textDim,
    textAlign: 'center',
    marginTop: 5,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
  },
  teamColorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  teamName: {
    fontSize: 16,
    color: SCREEN.text,
    fontWeight: '600',
    marginBottom: 10,
  },
  score: {
    fontSize: 56,
    fontWeight: 'bold',
    color: SCREEN.text,
  },
  divider: {
    paddingHorizontal: 15,
  },
  vsText: {
    fontSize: 16,
    color: SCREEN.textDim,
    fontWeight: '600',
  },
  optionalSection: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  optionalLabel: {
    fontSize: 12,
    color: SCREEN.textDim,
    letterSpacing: 1,
  },
  shotClockValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 5,
  },
  foulsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  foulSection: {
    flex: 1,
    alignItems: 'center',
  },
  foulValue: {
    fontSize: 28,
    color: SCREEN.text,
    fontWeight: 'bold',
  },
  timeoutsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  timeoutSection: {
    flex: 1,
    alignItems: 'center',
  },
  timeoutValue: {
    fontSize: 28,
    color: SCREEN.text,
    fontWeight: 'bold',
    marginTop: 5,
  },
  // Controls Section (below scoreboard)
  controlsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 25,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASKETBALL.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    gap: 8,
  },
  timerButtonActive: {
    backgroundColor: '#CC4A10',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#888888',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    gap: 8,
  },
  timerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scoreControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  teamScoreControls: {
    alignItems: 'center',
  },
  teamControlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: SCREEN.text,
    marginBottom: 15,
  },
  scoreActionLabel: {
    fontSize: 12,
    color: SCREEN.textDim,
    marginBottom: 8,
    marginTop: 10,
  },
  scoreButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  scoreButton: {
    backgroundColor: BASKETBALL.primary,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  minusButton: {
    backgroundColor: '#CC4A10',
  },
  scoreButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
});
