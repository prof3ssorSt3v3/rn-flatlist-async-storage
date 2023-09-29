import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';

//TODO: add a Badge with the total number of items on each of the tabs

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const URL = 'https://jsonplaceholder.typicode.com/comments'; //500 comments
  const FULL_LIST_KEY = 'full_comment_list';
  const FAV_LIST_KEY = 'fav_comment_list';
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [fullList, setFullList] = useState([]); //list of all comments on HomeScreen
  const [favList, setFavList] = useState([]); //list of favourited comments
  //favList could be a Ref instead of State because it is not rendered on screen here

  useEffect(() => {
    //if favList is null set as empty array
    AsyncStorage.getItem(FAV_LIST_KEY)
      .then((list) => {
        if (list === null) {
          // console.log('save [] as favlist in async storage');
          return AsyncStorage.setItem(FAV_LIST_KEY, JSON.stringify([]));
        } else {
          // console.log('save favlist in state');
          setFavList(JSON.parse(list));
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    //on initial render read Async Storage for full list
    //if fullList is null or less than 5 items, then do a fetch(URL)
    readFullStorageList()
      .then(async (list) => {
        if (list === null || list.length < 5) {
          //need to fetch new data
          let resp = await fetch(URL);
          let fetchedData = await resp.json();
          setIsRefreshing(false);
          const start = Math.floor(Math.random() * 495);
          list = [...fetchedData.splice(start, 5), ...fullList];
        }
        //save the list in state
        setFullList(list);
        updateFullStorageList(list);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const fetchMoreData = () => {
    console.log('called fetchMoreData');
    fetch(URL)
      .then((resp) => resp.json())
      .then((commentdata) => {
        setIsRefreshing(false);
        const start = Math.floor(Math.random() * 495);
        let newlist = [...commentdata.splice(start, 5), ...fullList];
        //update state
        setFullList(newlist);
        //update async storage
        updateFullStorageList(newlist);
      });
  };
  const updateFullStorageList = async (newlist) => {
    //replace full list in async storage
    await AsyncStorage.setItem(FULL_LIST_KEY, JSON.stringify(newlist));
  };
  const addToFavStorageList = async (comment) => {
    //add one item to fav list in async storage
    let newlist = [...favList, comment];
    await AsyncStorage.setItem(FAV_LIST_KEY, JSON.stringify(newlist));
    setFavList(newlist);
  };
  const readFullStorageList = async () => {
    //read full list from async storage
    let list = await AsyncStorage.getItem(FULL_LIST_KEY);
    return list === null ? [] : JSON.parse(list);
  };
  const clearFullList = async () => {
    await AsyncStorage.setItem(FULL_LIST_KEY, JSON.stringify([]));
  };

  return (
    <View style={[styles.container, { paddingTop: 10 }]}>
      <View style={{ padding: 10 }}>
        <Text>Pull down to fetch more comments</Text>
      </View>
      <FlatList
        data={fullList}
        refreshing={false}
        onRefresh={() => {
          setIsRefreshing(true);
          fetchMoreData();
        }}
        renderItem={({ item, index }) => <ListItem comment={item} index={index} fav={addToFavStorageList} />}
        keyExtractor={(item, index) => {
          return Math.random().toString(16).substring(2);
          // return Crypto.randomUUID();
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});

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
