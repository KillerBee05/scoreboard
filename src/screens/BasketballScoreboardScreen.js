import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
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
  const [gameStarted, setGameStarted] = useState(false);

  // Reset clock with confirmation
  const handleResetClock = () => {
    Alert.alert(
      'Reset Clock',
      'Are you sure you want to reset the clock?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            setTimeRemaining(timeMinutes * 60);
            setIsRunning(false);
          },
        },
      ]
    );
  };

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

  // Get initial shot clock value from settings
  const initialShotClock = parseInt(shotClockDuration) || 24;

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

  // Shot clock countdown effect
  useEffect(() => {
    let interval = null;

    if (shotClockEnabled && isRunning && shotClock > 0) {
      interval = setInterval(() => {
        setShotClock((prev) => prev - 1);
      }, 1000);
    }

    // Stop game when shot clock hits 0
    if (shotClockEnabled && shotClock === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, shotClock, shotClockEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {!gameStarted ? (
          <TouchableOpacity style={styles.titleButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color={SCREEN.text} style={styles.backIcon} />
            <Text style={styles.title}>Scoreboard</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.title}>Scoreboard</Text>
        )}
      </View>

      <ScrollView style={styles.content}>
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
            <Text style={[
              styles.shotClockValue,
              shotClock <= 5 && styles.shotClockWarning,
              shotClock === 0 && styles.shotClockExpired,
            ]}>
              {shotClock}
            </Text>
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
            onPress={() => {
              if (!gameStarted) setGameStarted(true);
              setIsRunning(!isRunning);
            }}
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
          {shotClockEnabled && (
            <TouchableOpacity
              style={styles.shotClockResetButton}
              onPress={() => setShotClock(initialShotClock)}
            >
              <Ionicons name="refresh" size={20} color="#FFFFFF" />
              <Text style={styles.shotClockResetText}>Reset Shot Clock</Text>
            </TouchableOpacity>
          )}
          {!shotClockEnabled && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetClock}
            >
              <Ionicons name="refresh" size={24} color="#FFFFFF" />
              <Text style={styles.timerButtonText}>Reset Clock</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Reset Clock - Separate row if shot clock enabled */}
        {shotClockEnabled && (
          <View style={styles.resetClockRow}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetClock}
            >
              <Ionicons name="refresh" size={24} color="#FFFFFF" />
              <Text style={styles.timerButtonText}>Reset Clock</Text>
            </TouchableOpacity>
          </View>
        )}

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
                  style={[styles.scoreButton, !gameStarted && styles.scoreButtonDisabled]}
                  onPress={() => setTeam1Score(team1Score + points)}
                  disabled={!gameStarted}
                >
                  <Text style={[styles.scoreButtonText, !gameStarted && styles.scoreButtonTextDisabled]}>+{points}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.scoreActionLabel}>Remove Points</Text>
            <TouchableOpacity
              style={[styles.scoreButton, styles.minusButton, !gameStarted && styles.scoreButtonDisabled]}
              onPress={() => setTeam1Score(Math.max(0, team1Score - 1))}
              disabled={!gameStarted}
            >
              <Text style={[styles.scoreButtonText, !gameStarted && styles.scoreButtonTextDisabled]}>-1</Text>
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
                  style={[styles.scoreButton, !gameStarted && styles.scoreButtonDisabled]}
                  onPress={() => setTeam2Score(team2Score + points)}
                  disabled={!gameStarted}
                >
                  <Text style={[styles.scoreButtonText, !gameStarted && styles.scoreButtonTextDisabled]}>+{points}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.scoreActionLabel}>Remove Points</Text>
            <TouchableOpacity
              style={[styles.scoreButton, styles.minusButton, !gameStarted && styles.scoreButtonDisabled]}
              onPress={() => setTeam2Score(Math.max(0, team2Score - 1))}
              disabled={!gameStarted}
            >
              <Text style={[styles.scoreButtonText, !gameStarted && styles.scoreButtonTextDisabled]}>-1</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fouls Controls - Only if enabled */}
        {foulsEnabled && (
          <View style={styles.foulsControlsSection}>
            <Text style={styles.controlsSectionTitle}>Fouls</Text>
            <View style={styles.foulsControlsRow}>
              <View style={styles.foulControlItem}>
                <Text style={styles.foulControlLabel}>{team1Name}</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam1Fouls(Math.max(0, team1Fouls - 1))}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{team1Fouls}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam1Fouls(team1Fouls + 1)}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.foulControlItem}>
                <Text style={styles.foulControlLabel}>{team2Name}</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam2Fouls(Math.max(0, team2Fouls - 1))}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{team2Fouls}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam2Fouls(team2Fouls + 1)}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Timeouts Controls - Only if enabled */}
        {timeoutsEnabled && (
          <View style={styles.timeoutsControlsSection}>
            <Text style={styles.controlsSectionTitle}>Timeouts</Text>
            <View style={styles.timeoutsControlsRow}>
              <View style={styles.timeoutControlItem}>
                <Text style={styles.timeoutControlLabel}>{team1Name}</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam1Timeouts(Math.max(0, team1Timeouts - 1))}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{team1Timeouts}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam1Timeouts(team1Timeouts + 1)}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.timeoutControlItem}>
                <Text style={styles.timeoutControlLabel}>{team2Name}</Text>
                <View style={styles.counterControls}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam2Timeouts(Math.max(0, team2Timeouts - 1))}
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterValue}>{team2Timeouts}</Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => setTeam2Timeouts(team2Timeouts + 1)}
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* End Game Button */}
        <TouchableOpacity
          style={[
            styles.endGameButton,
            !gameStarted && styles.endGameButtonDisabled,
          ]}
          onPress={() => navigation.navigate('Home')}
          disabled={!gameStarted}
        >
          <Text style={[
            styles.endGameText,
            !gameStarted && styles.endGameTextDisabled,
          ]}>
            END GAME
          </Text>
        </TouchableOpacity>

        {/* Bottom spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
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
  },
  endGameButton: {
    backgroundColor: BASKETBALL.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 50,
    marginHorizontal: 20,
  },
  endGameButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  endGameText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  endGameTextDisabled: {
    color: '#888888',
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
    color: BASKETBALL.primary,
    marginTop: 5,
  },
  shotClockWarning: {
    color: '#FF6B6B',
  },
  shotClockExpired: {
    color: '#FF0000',
  },
  shotClockControls: {
    alignItems: 'center',
    marginBottom: 20,
  },
  shotClockResetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BASKETBALL.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    gap: 8,
  },
  shotClockResetText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
    backgroundColor: '#333333',
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
  resetClockRow: {
    alignItems: 'center',
    marginBottom: 15,
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
  scoreButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  minusButton: {
    backgroundColor: '#CC4A10',
  },
  scoreButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  scoreButtonTextDisabled: {
    color: '#888888',
  },
  // Fouls & Timeouts Controls
  foulsControlsSection: {
    marginTop: 30,
  },
  timeoutsControlsSection: {
    marginTop: 30,
  },
  controlsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: SCREEN.text,
    textAlign: 'center',
    marginBottom: 15,
  },
  foulsControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeoutsControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  foulControlItem: {
    alignItems: 'center',
  },
  timeoutControlItem: {
    alignItems: 'center',
  },
  foulControlLabel: {
    fontSize: 14,
    color: SCREEN.textDim,
    marginBottom: 10,
  },
  timeoutControlLabel: {
    fontSize: 14,
    color: SCREEN.textDim,
    marginBottom: 10,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  counterButton: {
    backgroundColor: BASKETBALL.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: SCREEN.text,
    minWidth: 30,
    textAlign: 'center',
  },
});
