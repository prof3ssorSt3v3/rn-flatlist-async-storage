//FavContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavContext = createContext(); //create the context object

function FavProvider(props) {
  const FAV_LIST_KEY = 'fav_comment_list';
  const [favList, setFavList] = useState([]);

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

  const updateFavList = (newList) => {
    setFavList(newList);
    AsyncStorage.setItem(FAV_LIST_KEY, JSON.stringify(newList));
  };

  return <FavContext.Provider value={[favList, updateFavList]} {...props} />;
}

function useFavList() {
  //create a custom hook that can be called from components
  const context = useContext(FavContext);
  //we use the built-in useContext hook to access our own Context object.
  if (!context) throw new Error('Not inside the Provider');
  return context; // [fullList, setFullList]
  //we are returning our own state variable and function from UserContext Provider
}

//export the hook and the provider
export { useFavList, FavProvider };
