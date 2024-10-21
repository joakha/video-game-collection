import { StyleSheet, Text, View } from 'react-native';

const Collection = () => {
  return (
    <View style={styles.container}>
      <Text>This is the collection tab!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Collection