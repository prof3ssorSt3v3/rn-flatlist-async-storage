import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import FavScreen from './screens/FavScreen';
import { withBadge } from '@rneui/themed';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tabs.Navigator initialRouteName="Home">
          <Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarLabelStyle: { fontSize: 15 }, tabBarIcon: ({ focused, color, size }) => <MyTabIcon size={size} icon={'list'} /> }} />
          <Tabs.Screen name="Favourites" component={FavScreen} options={{ tabBarLabelStyle: { fontSize: 15 }, tabBarIcon: ({ focused, color, size }) => <MyTabIcon size={size} icon={'heart'} /> }} />
        </Tabs.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

function MyTabIcon({ icon, size }) {
  //the number for the badge can come from a context provider
  const BadgedIcon = withBadge(15)(FontAwesome);
  //<FontAwesome name="list" size={20} color={'#333'} />

  return <BadgedIcon name="list" size={size} />;
}
