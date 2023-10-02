import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const FavItem = ({ comment, index, del }) => {
  const topStyle = index === 0 ? { borderTopWidth: 1, borderTopColor: '#aaa' } : null;
  return (
    <View style={[styles.row, topStyle]}>
      <View style={styles.icon}>
        <Pressable onPress={() => del(comment)}>
          <FontAwesome name="remove" size={30} color="red" style={{ textAlign: 'center' }} />
          <Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>Remove</Text>
        </Pressable>
      </View>
      <View style={styles.info}>
        <Text style={styles.txtsm}>{comment.email}</Text>
        <Text style={styles.txt}>{comment.name}</Text>
      </View>
    </View>
  );
};

export default FavItem;

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
