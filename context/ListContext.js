//ListContext.js
import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListContext = createContext(); //create the context object

function ListProvider(props) {
  const FULL_LIST_KEY = 'full_comment_list';
  const [fullList, setFullList] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(FULL_LIST_KEY).then((list) => {
      list = list === null ? [] : JSON.parse(list);
      setFullList(list);
    });
  }, []);

  async function updateStorageList(newlist) {
    setFullList(newlist);
    await AsyncStorage.setItem(FULL_LIST_KEY, JSON.stringify(newlist));
  }

  return <ListContext.Provider value={[fullList, updateStorageList]} {...props} />;
}

function useList() {
  //create a custom hook that can be called from components
  const context = useContext(ListContext);
  //we use the built-in useContext hook to access our own Context object.
  if (!context) throw new Error('Not inside the Provider');
  return context; // [fullList, setFullList]
  //we are returning our own state variable and function from UserContext Provider
}

//export the hook and the provider
export { useList, ListProvider };

// const clearFullList = async () => {
//   await AsyncStorage.setItem(FULL_LIST_KEY, JSON.stringify([]));
// };
