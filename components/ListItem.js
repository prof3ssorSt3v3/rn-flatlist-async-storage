import { Pressable, StyleSheet, Text, View, Button } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const ListItem = ({ comment, index, fav, del }) => {
  const topStyle = index === 0 ? { borderTopWidth: 1, borderTopColor: '#aaa' } : null;

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.delbtn}>
        <Pressable onPress={() => del(comment)}>
          <View style={{ textAlign: 'right' }}>
            <FontAwesome name="remove" color="white" size={30} />
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions} rightOpenValue={-60}>
      <View style={[styles.row, topStyle]}>
        <View style={styles.icon}>
          <Pressable
            onPress={() => {
              fav(comment);
            }}
          >
            <FontAwesome name="heart" size={30} color="red" style={{ textAlign: 'center' }} />
            <Text style={{ color: 'red', fontSize: 12 }}>Save</Text>
          </Pressable>
        </View>
        <View style={styles.info}>
          <Text style={styles.txtsm}>{comment.email}</Text>
          <Text style={styles.txt}>{comment.name}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 4,
  },
  txt: {
    fontSize: 24,
    color: '#222',
  },
  txtsm: {
    fontSize: 16,
    color: '#444',
  },
  delbtn: {
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    color: 'white',
    paddingHorizontal: 20,
    width: 70,
  },
});
