import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ListItem = ({ comment, index, fav }) => {
  const topStyle = index === 0 ? { borderTopWidth: 1, borderTopColor: '#aaa' } : null;
  return (
    <View style={[styles.row, topStyle]}>
      <View style={styles.icon}>
        <Pressable
          onPress={() => {
            fav(comment);
          }}
        >
          <FontAwesome name="heart" size={30} color="red" />
        </Pressable>
      </View>
      <View style={styles.info}>
        <Text style={styles.txtsm}>{comment.email}</Text>
        <Text style={styles.txt}>{comment.name}</Text>
      </View>
    </View>
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
});
