import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const URL = 'https://jsonplaceholder.typicode.com/comments'; //500 comments

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text>HomeScreen</Text>
    </View>
  );
};

/*
TODO:
- add state variable to hold list of comments
- add useEffect to fetch comments and place random 20 of the comments in state variable
- add FlatList to display ListItem for each of the items in state
- FlatList uses data, renderItem, keyExtractor, 
- add onRefresh attribute to add RefreshControl to FlatList to get 20 more items 
https://reactnative.dev/docs/next/refreshcontrol
- Add Save icon to each list item which will add them to async storage for "favorites"
- <FontAwesome name="heart || heart-o" size={} color={} />
- Build a FlatList that fetches and displays all the favourites
- Add ability to delete a favourite from the screen and the async storage
- Add saving of home screen state list to a second async storage array
- inside the useEffect check async storage before doing fetch.
- only fetch if fewer than 5 in async storage.
- combine values from fetch and async storage in state
*/

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
