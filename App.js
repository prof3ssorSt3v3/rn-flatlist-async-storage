import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import FavScreen from './screens/FavScreen';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator initialRouteName="Home">
          <Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarLabelStyle: { fontSize: 20 }, tabBarIcon: () => <FontAwesome name="list" size={20} color={'#333'} /> }} />
          <Tabs.Screen name="Favourites" component={FavScreen} options={{ tabBarLabelStyle: { fontSize: 20 }, tabBarIcon: () => <FontAwesome name="heart" size={20} color={'#333'} /> }} />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
