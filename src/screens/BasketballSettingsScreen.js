import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN } from '../constants/colors';

// Consistent top padding for all screens
const TOP_PADDING = 50;

export default function BasketballSettingsScreen({ navigation }) {
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

      {/* Settings will be built here */}
      <View style={styles.content}>
        <Text style={styles.placeholder}>Settings coming next...</Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: SCREEN.textDim,
    fontSize: 18,
  },
});
