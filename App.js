import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import FavScreen from './screens/FavScreen';
import { Badge } from '@rneui/themed';
import { View } from 'react-native';
import { ListProvider, useList } from './context/ListContext.js';
import { FavProvider, useFavList } from './context/FavContext.js';

const Tabs = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ListProvider>
        <FavProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <Tabs.Navigator initialRouteName="Home">
                <Tabs.Screen name="Home" component={HomeScreen} options={{ tabBarLabelStyle: { fontSize: 15 }, tabBarIcon: ({ focused, color, size }) => <ListIcon icon={'list'} size={size} /> }} />
                <Tabs.Screen
                  name="Favourites"
                  component={FavScreen}
                  options={{ tabBarLabelStyle: { fontSize: 15 }, tabBarIcon: ({ focused, color, size }) => <FavIcon icon={'heart'} size={size} /> }}
                />
              </Tabs.Navigator>
            </NavigationContainer>
          </GestureHandlerRootView>
        </FavProvider>
      </ListProvider>
    </SafeAreaProvider>
  );
}

function FavIcon({ icon, size }) {
  const [favList, setFavList] = useFavList();
  let len = favList.length;
  return (
    <View>
      <FontAwesome name={icon} size={size} />
      <Badge status="error" value={len} containerStyle={{ position: 'absolute', top: 0, right: -10 }} />
    </View>
  );
}

function ListIcon({ icon, size }) {
  const [fullList, setFullList] = useList();
  let len = fullList.length;
  return (
    <View>
      <FontAwesome name={icon} size={30} />
      <Badge status="error" value={len} containerStyle={{ position: 'absolute', top: 0, right: -10 }} />
    </View>
  );
}
