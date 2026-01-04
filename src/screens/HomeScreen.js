import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { SCREEN } from '../constants/colors';

// Sport images
const basketballImage = require('../../assets/images/basketball.png');

// List of implemented sports
// Add new sports here when they're ready
const SPORTS = [
  {
    id: 'basketball',
    name: 'Basketball',
    image: basketballImage,
    screen: 'BasketballSettings',
  },
];

export default function HomeScreen({ navigation }) {
  // Navigate to the sport's settings screen
  const handleSportPress = (sport) => {
    navigation.navigate(sport.screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>SCOREBOARD</Text>
        <Text style={styles.subtitle}>Select a Sport</Text>
      </View>

      {/* Sports Grid */}
      <View style={styles.grid}>
        {SPORTS.map((sport) => (
          <View key={sport.id} style={styles.sportContainer}>
            <Text style={styles.sportName}>{sport.name}</Text>
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSportPress(sport)}
              activeOpacity={0.7}
            >
              <Image source={sport.image} style={styles.sportImage} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// Consistent top padding for all screens
const TOP_PADDING = 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SCREEN.background,
  },
  header: {
    paddingTop: TOP_PADDING,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: SCREEN.text,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: SCREEN.textDim,
    marginTop: 8,
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    padding: 20,
    gap: 20,
  },
  sportContainer: {
    alignItems: 'center',
  },
  sportName: {
    fontSize: 18,
    fontWeight: '600',
    color: SCREEN.text,
    marginBottom: 10,
  },
  card: {
    width: 280,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sportImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
