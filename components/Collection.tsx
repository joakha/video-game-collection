import { Text, View } from 'react-native';
import { collectionStyles } from '../styles/appStyles';

const Collection = () => {
  return (
    <View style={collectionStyles.container}>
      <Text>This is the collection tab!</Text>
    </View>
  );
}

export default Collection