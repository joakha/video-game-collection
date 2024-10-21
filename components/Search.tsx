import { Text, View } from 'react-native';
import { searchStyles } from '../styles/appStyles';

const Search = () => {
  return (
    <View style={searchStyles.container}>
      <Text style={searchStyles.text}>This is the search tab!</Text>
    </View>
  );
}

export default Search