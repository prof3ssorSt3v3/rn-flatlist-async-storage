// import AsyncStorage from '@react-native-async-storage/async-storage'; //moved to context object
import { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ListItem from '../components/ListItem';
import { useList } from '../context/ListContext';
import { useFavList } from '../context/FavContext';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const URL = 'https://jsonplaceholder.typicode.com/comments'; //500 comments
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fullList, setFullList] = useList([]); //list of all comments on HomeScreen from the context object
  const [favList, setFavList] = useFavList([]); //list of favourited comments
  const row = [];

  useEffect(() => {
    //on initial render read Async Storage for full list
    //if fullList is null or less than 5 items, then do a fetch(URL)
    (async () => {
      if (fullList === null || fullList.length < 5) {
        //need to fetch new data
        let resp = await fetch(URL);
        let fetchedData = await resp.json();
        setIsRefreshing(false);
        const start = Math.floor(Math.random() * 495);
        list = [...fetchedData.splice(start, 5), ...fullList];
        //save the list in state and async storage
        setFullList(list);
      }
    })();
  }, []);

  const fetchMoreData = () => {
    // console.log('called fetchMoreData');
    fetch(URL)
      .then((resp) => resp.json())
      .then((commentdata) => {
        setIsRefreshing(false);
        const start = Math.floor(Math.random() * 495);
        let newlist = [...commentdata.splice(start, 5), ...fullList];
        //update state and async storage
        setFullList(newlist);
      });
  };

  const addFavourite = (comment) => {
    let newList = [...favList, comment];
    setFavList(newList);
  };

  const deleteComment = (comment) => {
    //remove the comment from the list via the context object
    let newList = fullList.filter((item) => item.id !== comment.id && item.email !== comment.email);
    setFullList(newList);
    if (newList.length < 1) {
      fetchMoreData();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: 10 }]}>
      <View style={{ padding: 10 }}>
        <Text>Pull down to fetch more comments</Text>
      </View>
      <FlatList
        data={fullList}
        refreshing={isRefreshing}
        onRefresh={() => {
          setIsRefreshing(true);
          fetchMoreData();
        }}
        renderItem={({ item, index }) => <ListItem comment={item} index={index} fav={addFavourite} del={deleteComment} />}
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
