import { StyleSheet, Text, View } from 'react-native';

const Statistics = () => {
  return (
    <View style={styles.container}>
      <Text>This is the statistics tab!</Text>
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

export default Statistics