import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FavItem from '../components/FavItem';
import { useFavList } from '../context/FavContext';

const FavScreen = () => {
  const insets = useSafeAreaInsets();
  const [favList, setFavList] = useFavList([]); //list of favourited comments

  function removeFromFav(item) {
    //remove from list and update in state and asyncstorage
    let newList = favList.filter((fav) => fav.id !== item.id && fav.email !== item.email);
    setFavList(newList);
  }

  return (
    <View style={[styles.container, { paddingTop: 10 }]}>
      <View style={{ padding: 10 }}></View>
      <FlatList
        data={favList}
        renderItem={({ item, index }) => <FavItem comment={item} index={index} del={removeFromFav} />}
        keyExtractor={(item, index) => {
          return Math.random().toString(16).substring(2);
          // return Crypto.randomUUID();
        }}
      />
    </View>
  );
};

export default FavScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});
