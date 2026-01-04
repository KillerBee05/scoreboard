import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import BasketballSettingsScreen from './src/screens/BasketballSettingsScreen';
import BasketballScoreboardScreen from './src/screens/BasketballScoreboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BasketballSettings" component={BasketballSettingsScreen} />
        <Stack.Screen name="BasketballScoreboard" component={BasketballScoreboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
